"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export interface MediaStreamState {
  stream: MediaStream | null
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isScreenSharing: boolean
  error: string | null
  isLoading: boolean
}

export interface MediaStreamControls {
  startAudio: () => Promise<void>
  stopAudio: () => void
  startVideo: () => Promise<void>
  stopVideo: () => void
  startScreenShare: () => Promise<void>
  stopScreenShare: () => void
  toggleAudio: () => Promise<void>
  toggleVideo: () => Promise<void>
  cleanup: () => void
}

export function useMediaStream(): [MediaStreamState, MediaStreamControls] {
  const [state, setState] = useState<MediaStreamState>({
    stream: null,
    isAudioEnabled: false,
    isVideoEnabled: false,
    isScreenSharing: false,
    error: null,
    isLoading: false,
  })

  const streamRef = useRef<MediaStream | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)

  const updateState = useCallback((updates: Partial<MediaStreamState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const startAudio = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: null })

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      streamRef.current = stream
      updateState({
        stream,
        isAudioEnabled: true,
        isLoading: false,
      })
    } catch (error) {
      console.error("[v0] Error starting audio:", error)
      updateState({
        error: "فشل في تشغيل الميكروفون",
        isLoading: false,
      })
    }
  }, [updateState])

  const stopAudio = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.stop()
      })
    }
    updateState({ isAudioEnabled: false })
  }, [updateState])

  const startVideo = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: null })

      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: state.isAudioEnabled
          ? {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            }
          : false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (streamRef.current) {
        // إضافة المسارات الجديدة للتدفق الموجود
        stream.getTracks().forEach((track) => {
          streamRef.current?.addTrack(track)
        })
      } else {
        streamRef.current = stream
      }

      updateState({
        stream: streamRef.current,
        isVideoEnabled: true,
        isLoading: false,
      })
    } catch (error) {
      console.error("[v0] Error starting video:", error)
      updateState({
        error: "فشل في تشغيل الكاميرا",
        isLoading: false,
      })
    }
  }, [state.isAudioEnabled, updateState])

  const stopVideo = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.stop()
      })
    }
    updateState({ isVideoEnabled: false })
  }, [updateState])

  const startScreenShare = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: null })

      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
        },
        audio: true,
      })

      screenStreamRef.current = screenStream

      // إيقاف مشاركة الشاشة عند إغلاق النافذة
      screenStream.getVideoTracks()[0].addEventListener("ended", () => {
        stopScreenShare()
      })

      updateState({
        isScreenSharing: true,
        isLoading: false,
      })
    } catch (error) {
      console.error("[v0] Error starting screen share:", error)
      updateState({
        error: "فشل في مشاركة الشاشة",
        isLoading: false,
      })
    }
  }, [updateState])

  const stopScreenShare = useCallback(() => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => {
        track.stop()
      })
      screenStreamRef.current = null
    }
    updateState({ isScreenSharing: false })
  }, [updateState])

  const toggleAudio = useCallback(async () => {
    if (state.isAudioEnabled) {
      stopAudio()
    } else {
      await startAudio()
    }
  }, [state.isAudioEnabled, startAudio, stopAudio])

  const toggleVideo = useCallback(async () => {
    if (state.isVideoEnabled) {
      stopVideo()
    } else {
      await startVideo()
    }
  }, [state.isVideoEnabled, startVideo, stopVideo])

  const cleanup = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop())
      screenStreamRef.current = null
    }
    updateState({
      stream: null,
      isAudioEnabled: false,
      isVideoEnabled: false,
      isScreenSharing: false,
      error: null,
      isLoading: false,
    })
  }, [updateState])

  // تنظيف الموارد عند إلغاء تحميل المكون
  useEffect(() => {
    return cleanup
  }, [cleanup])

  const controls: MediaStreamControls = {
    startAudio,
    stopAudio,
    startVideo,
    stopVideo,
    startScreenShare,
    stopScreenShare,
    toggleAudio,
    toggleVideo,
    cleanup,
  }

  return [state, controls]
}
