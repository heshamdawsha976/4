// خادم WebSocket للاتصال المباشر - مبسط ومحسن
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
    this.wss = new WebSocket.Server({ 
      server: this.server,
      perMessageDeflate: false
    })

    this.wss.on('connection', (ws) => {
      console.log('[Leqaa] اتصال WebSocket جديد')
      
      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString())
          this.handleMessage(ws, message)
        } catch (error) {
          console.error('[Leqaa] خطأ في تحليل الرسالة:', error)
          ws.send(JSON.stringify({
            type: 'error',
            payload: { message: 'رسالة غير صحيحة' }
          }))
        }
      })

      ws.on('close', () => {
        this.handleDisconnection(ws)
      })

      ws.on('error', (error) => {
        console.error('[Leqaa] خطأ WebSocket:', error)
      })

      // إرسال رسالة ترحيب
      ws.send(JSON.stringify({
        type: 'connected',
        payload: { message: 'مرحباً بك في لقاء' }
      }))
    })

    this.server.listen(this.port, () => {
      console.log(`[Leqaa] خادم WebSocket يعمل على المنفذ ${this.port}`)
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
      
      case 'media-state-changed':
        this.handleMediaStateChange(ws, payload)
        break

      case 'ping':
        ws.send(JSON.stringify({ type: 'pong', payload: {} }))
        break
      
      default:
        console.log('[Leqaa] نوع رسالة غير معروف:', type)
    }
  }

  handleJoinRoom(ws, { roomId, user }) {
    if (!roomId || !user) {
      ws.send(JSON.stringify({
        type: 'error',
        payload: { message: 'بيانات غير مكتملة' }
      }))
      return
    }

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

    console.log(`[Leqaa] المستخدم ${user.displayName} انضم للغرفة ${roomId}`)
  }

  handleLeaveRoom(ws, { roomId, userId }) {
    const roomConnections = this.rooms.get(roomId)
    if (roomConnections) {
      roomConnections.delete(ws)
      
      if (roomConnections.size === 0) {
        this.rooms.delete(roomId)
        console.log(`[Leqaa] تم حذف الغرفة الفارغة ${roomId}`)
      }
    }

    this.users.delete(userId)

    // إشعار المشاركين الآخرين
    this.broadcastToRoom(roomId, {
      type: 'user-left',
      payload: { userId }
    })

    console.log(`[Leqaa] المستخدم ${userId} غادر الغرفة ${roomId}`)
  }

  handleSendMessage(ws, { roomId, message }) {
    if (!message || !message.content) {
      return
    }

    // التحقق من طول الرسالة
    if (message.content.length > 500) {
      ws.send(JSON.stringify({
        type: 'error',
        payload: { message: 'الرسالة طويلة جداً' }
      }))
      return
    }

    // بث الرسالة لجميع المشاركين في الغرفة
    this.broadcastToRoom(roomId, {
      type: 'new-message',
      payload: message
    })

    console.log(`[Leqaa] رسالة أُرسلت في الغرفة ${roomId}`)
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
          try {
            connection.send(JSON.stringify(message))
          } catch (error) {
            console.error('[Leqaa] خطأ في إرسال الرسالة:', error)
          }
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

  stop() {
    if (this.wss) {
      this.wss.close()
    }
    if (this.server) {
      this.server.close()
    }
    console.log('[Leqaa] تم إيقاف الخادم')
  }
}

// تشغيل الخادم
if (require.main === module) {
  const server = new LeqaaWebSocketServer(8080)
  server.start()

  // إيقاف نظيف عند إنهاء العملية
  process.on('SIGINT', () => {
    console.log('\n[Leqaa] إيقاف الخادم...')
    server.stop()
    process.exit(0)
  })
}

module.exports = LeqaaWebSocketServer