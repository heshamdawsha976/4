"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { getWebSocketClient } from "@/lib/websocket/client"
import { PeerConnectionManager } from "@/lib/webrtc/peer-connection"
import type { User, Message, RoomParticipant } from "@/lib/types"

interface RoomConnectionState {
  isConnected: boolean
  isConnecting: boolean
  participants: RoomParticipant[]
  messages: Message[]
  localStream: MediaStream | null
  remoteStreams: Map<string, MediaStream>
  error: string | null
}

export function useRoomConnection(roomId: string, user: User | null) {
  const [state, setState] = useState<RoomConnectionState>({
    isConnected: false,
    isConnecting: false,
    participants: [],
    messages: [],
    localStream: null,
    remoteStreams: new Map(),
    error: null
  })

  const wsClient = useRef(getWebSocketClient())
  const peerManager = useRef<PeerConnectionManager | null>(null)

  const updateState = useCallback((updates: Partial<RoomConnectionState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  // إعداد PeerConnectionManager
  useEffect(() => {
    peerManager.current = new PeerConnectionManager(
      (userId, stream) => {
        setState(prev => ({
          ...prev,
          remoteStreams: new Map(prev.remoteStreams.set(userId, stream))
        }))
      },
      (userId, candidate) => {
        wsClient.current.send('ice-candidate', {
          roomId,
          targetUserId: userId,
          candidate
        })
      }
    )

    return () => {
      peerManager.current?.cleanup()
    }
  }, [roomId])

  // الاتصال بالغرفة
  const connectToRoom = useCallback(async () => {
    if (!user) return

    try {
      updateState({ isConnecting: true, error: null })

      await wsClient.current.connect()

      // تسجيل event listeners
      wsClient.current.on('user-joined', (data: any) => {
        setState(prev => ({
          ...prev,
          participants: [...prev.participants, data.user]
        }))

        // إنشاء اتصال WebRTC مع المستخدم الجديد
        if (peerManager.current && data.user.id !== user.id) {
          peerManager.current.createOffer(data.user.id).then(offer => {
            wsClient.current.send('webrtc-offer', {
              roomId,
              targetUserId: data.user.id,
              offer
            })
          })
        }
      })

      wsClient.current.on('user-left', (data: any) => {
        setState(prev => ({
          ...prev,
          participants: prev.participants.filter(p => p.userId !== data.userId),
          remoteStreams: new Map([...prev.remoteStreams].filter(([id]) => id !== data.userId))
        }))

        peerManager.current?.removePeerConnection(data.userId)
      })

      wsClient.current.on('new-message', (message: Message) => {
        setState(prev => ({
          ...prev,
          messages: [...prev.messages, message]
        }))
      })

      wsClient.current.on('webrtc-offer', async (data: any) => {
        if (peerManager.current) {
          const answer = await peerManager.current.createAnswer(data.fromUserId, data.offer)
          wsClient.current.send('webrtc-answer', {
            roomId,
            targetUserId: data.fromUserId,
            answer
          })
        }
      })

      wsClient.current.on('webrtc-answer', (data: any) => {
        peerManager.current?.handleAnswer(data.fromUserId, data.answer)
      })

      wsClient.current.on('ice-candidate', (data: any) => {
        peerManager.current?.handleIceCandidate(data.fromUserId, data.candidate)
      })

      // الانضمام للغرفة
      wsClient.current.send('join-room', {
        roomId,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          role: user.role,
          isGuest: user.isGuest
        }
      })

      updateState({ isConnected: true, isConnecting: false })

    } catch (error) {
      console.error('[Leqaa] Error connecting to room:', error)
      updateState({
        error: 'فشل في الاتصال بالغرفة',
        isConnecting: false
      })
    }
  }, [user, roomId, updateState])

  // إرسال رسالة
  const sendMessage = useCallback((content: string) => {
    if (!user || !state.isConnected) return

    const message: Message = {
      id: Date.now().toString(),
      content,
      senderId: user.id,
      senderName: user.displayName,
      senderRole: user.role,
      roomId,
      timestamp: new Date(),
      type: "text"
    }

    wsClient.current.send('send-message', { roomId, message })
  }, [user, roomId, state.isConnected])

  // بدء البث الصوتي/المرئي
  const startMediaStream = useCallback(async (video: boolean = false) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: video ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        } : false
      })

      updateState({ localStream: stream })
      await peerManager.current?.setLocalStream(stream)

      wsClient.current.send('media-state-changed', {
        roomId,
        userId: user?.id,
        hasAudio: true,
        hasVideo: video
      })

    } catch (error) {
      console.error('[Leqaa] Error starting media stream:', error)
      updateState({ error: 'فشل في تشغيل الميكروفون/الكاميرا' })
    }
  }, [user?.id, roomId, updateState])

  // إيقاف البث
  const stopMediaStream = useCallback(() => {
    if (state.localStream) {
      state.localStream.getTracks().forEach(track => track.stop())
      updateState({ localStream: null })
    }

    wsClient.current.send('media-state-changed', {
      roomId,
      userId: user?.id,
      hasAudio: false,
      hasVideo: false
    })
  }, [state.localStream, user?.id, roomId, updateState])

  // مغادرة الغرفة
  const leaveRoom = useCallback(() => {
    wsClient.current.send('leave-room', { roomId, userId: user?.id })
    peerManager.current?.cleanup()
    updateState({
      isConnected: false,
      participants: [],
      messages: [],
      localStream: null,
      remoteStreams: new Map()
    })
  }, [roomId, user?.id, updateState])

  return {
    ...state,
    connectToRoom,
    sendMessage,
    startMediaStream,
    stopMediaStream,
    leaveRoom
  }
}