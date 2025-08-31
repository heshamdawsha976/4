"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export interface WebRTCState {
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  remoteStreams: Map<string, MediaStream>
  connectionState: RTCPeerConnectionState
}

export interface WebRTCControls {
  connect: (roomId: string, userId: string) => Promise<void>
  disconnect: () => void
  addLocalStream: (stream: MediaStream) => void
  removeLocalStream: () => void
  sendMessage: (message: any) => void
}

interface PeerConnection {
  pc: RTCPeerConnection
  userId: string
  dataChannel?: RTCDataChannel
}

export function useWebRTC(): [WebRTCState, WebRTCControls] {
  const [state, setState] = useState<WebRTCState>({
    isConnected: false,
    isConnecting: false,
    error: null,
    remoteStreams: new Map(),
    connectionState: "new",
  })

  const peerConnectionsRef = useRef<Map<string, PeerConnection>>(new Map())
  const localStreamRef = useRef<MediaStream | null>(null)
  const signalingRef = useRef<WebSocket | null>(null)

  const updateState = useCallback((updates: Partial<WebRTCState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  // إعداد اتصال WebRTC
  const createPeerConnection = useCallback(
    (userId: string): RTCPeerConnection => {
      const configuration: RTCConfiguration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:stun1.l.google.com:19302" }],
      }

      const pc = new RTCPeerConnection(configuration)

      // إضافة المسار المحلي إذا كان متاحاً
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStreamRef.current!)
        })
      }

      // معالجة المسارات البعيدة
      pc.ontrack = (event) => {
        console.log("[v0] Received remote track from:", userId)
        const [remoteStream] = event.streams
        setState((prev) => ({
          ...prev,
          remoteStreams: new Map(prev.remoteStreams.set(userId, remoteStream)),
        }))
      }

      // معالجة حالة الاتصال
      pc.onconnectionstatechange = () => {
        console.log("[v0] Connection state changed:", pc.connectionState)
        updateState({ connectionState: pc.connectionState })

        if (pc.connectionState === "connected") {
          updateState({ isConnected: true, isConnecting: false })
        } else if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
          updateState({
            isConnected: false,
            isConnecting: false,
            error: "انقطع الاتصال",
          })
        }
      }

      // معالجة ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate && signalingRef.current) {
          signalingRef.current.send(
            JSON.stringify({
              type: "ice-candidate",
              candidate: event.candidate,
              targetUserId: userId,
            }),
          )
        }
      }

      // إنشاء قناة البيانات
      const dataChannel = pc.createDataChannel("chat", {
        ordered: true,
      })

      dataChannel.onopen = () => {
        console.log("[v0] Data channel opened with:", userId)
      }

      dataChannel.onmessage = (event) => {
        console.log("[v0] Received message:", event.data)
        // يمكن إضافة معالج للرسائل هنا
      }

      peerConnectionsRef.current.set(userId, { pc, userId, dataChannel })
      return pc
    },
    [updateState],
  )

  // الاتصال بالغرفة
  const connect = useCallback(
    async (roomId: string, userId: string) => {
      try {
        updateState({ isConnecting: true, error: null })

        // إنشاء اتصال WebSocket للإشارات
        const wsUrl = process.env.NEXT_PUBLIC_SIGNALING_SERVER || "ws://localhost:8080"
        const ws = new WebSocket(wsUrl)
        signalingRef.current = ws

        ws.onopen = () => {
          console.log("[v0] Signaling server connected")
          ws.send(
            JSON.stringify({
              type: "join-room",
              roomId,
              userId,
            }),
          )
        }

        ws.onmessage = async (event) => {
          const message = JSON.parse(event.data)
          console.log("[v0] Received signaling message:", message)

          switch (message.type) {
            case "user-joined":
              // إنشاء اتصال جديد مع المستخدم الجديد
              const pc = createPeerConnection(message.userId)
              const offer = await pc.createOffer()
              await pc.setLocalDescription(offer)

              ws.send(
                JSON.stringify({
                  type: "offer",
                  offer,
                  targetUserId: message.userId,
                }),
              )
              break

            case "offer":
              const answerPc = createPeerConnection(message.fromUserId)
              await answerPc.setRemoteDescription(message.offer)
              const answer = await answerPc.createAnswer()
              await answerPc.setLocalDescription(answer)

              ws.send(
                JSON.stringify({
                  type: "answer",
                  answer,
                  targetUserId: message.fromUserId,
                }),
              )
              break

            case "answer":
              const offerPc = peerConnectionsRef.current.get(message.fromUserId)?.pc
              if (offerPc) {
                await offerPc.setRemoteDescription(message.answer)
              }
              break

            case "ice-candidate":
              const candidatePc = peerConnectionsRef.current.get(message.fromUserId)?.pc
              if (candidatePc) {
                await candidatePc.addIceCandidate(message.candidate)
              }
              break

            case "user-left":
              const leftPeerConnection = peerConnectionsRef.current.get(message.userId)
              if (leftPeerConnection) {
                leftPeerConnection.pc.close()
                peerConnectionsRef.current.delete(message.userId)
                setState((prev) => {
                  const newRemoteStreams = new Map(prev.remoteStreams)
                  newRemoteStreams.delete(message.userId)
                  return { ...prev, remoteStreams: newRemoteStreams }
                })
              }
              break
          }
        }

        ws.onerror = (error) => {
          console.error("[v0] WebSocket error:", error)
          updateState({
            error: "فشل في الاتصال بالخادم",
            isConnecting: false,
          })
        }

        ws.onclose = () => {
          console.log("[v0] WebSocket connection closed")
          updateState({
            isConnected: false,
            isConnecting: false,
          })
        }
      } catch (error) {
        console.error("[v0] Error connecting to room:", error)
        updateState({
          error: "فشل في الاتصال بالغرفة",
          isConnecting: false,
        })
      }
    },
    [createPeerConnection, updateState],
  )

  // قطع الاتصال
  const disconnect = useCallback(() => {
    // إغلاق جميع اتصالات الأقران
    peerConnectionsRef.current.forEach(({ pc }) => {
      pc.close()
    })
    peerConnectionsRef.current.clear()

    // إغلاق WebSocket
    if (signalingRef.current) {
      signalingRef.current.close()
      signalingRef.current = null
    }

    updateState({
      isConnected: false,
      isConnecting: false,
      remoteStreams: new Map(),
      connectionState: "closed",
    })
  }, [updateState])

  // إضافة المسار المحلي
  const addLocalStream = useCallback((stream: MediaStream) => {
    localStreamRef.current = stream

    // إضافة المسارات لجميع الاتصالات الموجودة
    peerConnectionsRef.current.forEach(({ pc }) => {
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream)
      })
    })
  }, [])

  // إزالة المسار المحلي
  const removeLocalStream = useCallback(() => {
    if (localStreamRef.current) {
      peerConnectionsRef.current.forEach(({ pc }) => {
        pc.getSenders().forEach((sender) => {
          if (sender.track) {
            pc.removeTrack(sender)
          }
        })
      })
      localStreamRef.current = null
    }
  }, [])

  // إرسال رسالة عبر قناة البيانات
  const sendMessage = useCallback((message: any) => {
    peerConnectionsRef.current.forEach(({ dataChannel }) => {
      if (dataChannel && dataChannel.readyState === "open") {
        dataChannel.send(JSON.stringify(message))
      }
    })
  }, [])

  // تنظيف الموارد عند إلغاء تحميل المكون
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  const controls: WebRTCControls = {
    connect,
    disconnect,
    addLocalStream,
    removeLocalStream,
    sendMessage,
  }

  return [state, controls]
}
