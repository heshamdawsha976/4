// خادم WebSocket للاتصال المباشر
const WebSocket = require('ws')
const http = require('http')

class LeqaaWebSocketServer {
  constructor(port = 8080) {
    this.port = port
    this.rooms = new Map() // roomId -> Set of connections
    this.users = new Map() // userId -> connection info
    this.server = null
    this.wss = null
  }

  start() {
    this.server = http.createServer()
    this.wss = new WebSocket.Server({ server: this.server })

    this.wss.on('connection', (ws) => {
      console.log('[Leqaa] New WebSocket connection')
      
      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString())
          this.handleMessage(ws, message)
        } catch (error) {
          console.error('[Leqaa] Error parsing message:', error)
        }
      })

      ws.on('close', () => {
        this.handleDisconnection(ws)
      })

      ws.on('error', (error) => {
        console.error('[Leqaa] WebSocket error:', error)
      })
    })

    this.server.listen(this.port, () => {
      console.log(`[Leqaa] WebSocket server running on port ${this.port}`)
    })
  }

  handleMessage(ws, message) {
    const { type, payload } = message

    switch (type) {
      case 'join-room':
        this.handleJoinRoom(ws, payload)
        break
      
      case 'leave-room':
        this.handleLeaveRoom(ws, payload)
        break
      
      case 'send-message':
        this.handleSendMessage(ws, payload)
        break
      
      case 'webrtc-offer':
      case 'webrtc-answer':
      case 'ice-candidate':
        this.handleWebRTCSignaling(ws, message)
        break
      
      case 'media-state-changed':
        this.handleMediaStateChange(ws, payload)
        break
      
      default:
        console.log('[Leqaa] Unknown message type:', type)
    }
  }

  handleJoinRoom(ws, { roomId, user }) {
    // إضافة المستخدم للغرفة
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set())
    }

    const roomConnections = this.rooms.get(roomId)
    roomConnections.add(ws)

    // حفظ معلومات المستخدم
    ws.userId = user.id
    ws.roomId = roomId
    ws.userInfo = user

    this.users.set(user.id, {
      connection: ws,
      roomId,
      user,
      joinedAt: new Date()
    })

    // إشعار المشاركين الآخرين
    this.broadcastToRoom(roomId, {
      type: 'user-joined',
      payload: { user }
    }, ws)

    // إرسال قائمة المشاركين الحاليين للمستخدم الجديد
    const currentParticipants = Array.from(roomConnections)
      .filter(conn => conn !== ws && conn.userInfo)
      .map(conn => conn.userInfo)

    ws.send(JSON.stringify({
      type: 'room-joined',
      payload: {
        roomId,
        participants: currentParticipants
      }
    }))

    console.log(`[Leqaa] User ${user.displayName} joined room ${roomId}`)
  }

  handleLeaveRoom(ws, { roomId, userId }) {
    const roomConnections = this.rooms.get(roomId)
    if (roomConnections) {
      roomConnections.delete(ws)
      
      if (roomConnections.size === 0) {
        this.rooms.delete(roomId)
      }
    }

    this.users.delete(userId)

    // إشعار المشاركين الآخرين
    this.broadcastToRoom(roomId, {
      type: 'user-left',
      payload: { userId }
    })

    console.log(`[Leqaa] User ${userId} left room ${roomId}`)
  }

  handleSendMessage(ws, { roomId, message }) {
    // بث الرسالة لجميع المشاركين في الغرفة
    this.broadcastToRoom(roomId, {
      type: 'new-message',
      payload: message
    })

    console.log(`[Leqaa] Message sent in room ${roomId}`)
  }

  handleWebRTCSignaling(ws, message) {
    const { type, payload } = message
    const { roomId, targetUserId } = payload

    // إرسال إشارة WebRTC للمستخدم المستهدف
    const targetUser = this.users.get(targetUserId)
    if (targetUser) {
      targetUser.connection.send(JSON.stringify({
        type,
        payload: {
          ...payload,
          fromUserId: ws.userId
        }
      }))
    }
  }

  handleMediaStateChange(ws, { roomId, userId, hasAudio, hasVideo }) {
    // إشعار المشاركين بتغيير حالة الوسائط
    this.broadcastToRoom(roomId, {
      type: 'media-state-updated',
      payload: { userId, hasAudio, hasVideo }
    }, ws)
  }

  handleDisconnection(ws) {
    if (ws.roomId && ws.userId) {
      this.handleLeaveRoom(ws, { 
        roomId: ws.roomId, 
        userId: ws.userId 
      })
    }
  }

  broadcastToRoom(roomId, message, excludeConnection = null) {
    const roomConnections = this.rooms.get(roomId)
    if (roomConnections) {
      roomConnections.forEach(connection => {
        if (connection !== excludeConnection && connection.readyState === WebSocket.OPEN) {
          connection.send(JSON.stringify(message))
        }
      })
    }
  }

  getRoomStats() {
    const stats = {
      totalRooms: this.rooms.size,
      totalUsers: this.users.size,
      roomDetails: {}
    }

    this.rooms.forEach((connections, roomId) => {
      stats.roomDetails[roomId] = {
        participants: connections.size,
        users: Array.from(connections)
          .filter(conn => conn.userInfo)
          .map(conn => ({
            id: conn.userInfo.id,
            displayName: conn.userInfo.displayName,
            role: conn.userInfo.role
          }))
      }
    })

    return stats
  }
}

// تشغيل الخادم
if (require.main === module) {
  const server = new LeqaaWebSocketServer(8080)
  server.start()
}

module.exports = LeqaaWebSocketServer