"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMediaStream } from "@/hooks/use-media-stream"
import { Mic, MicOff, Volume2, Phone, PhoneOff, Loader2 } from "lucide-react"

interface VoiceChatProps {
  roomId: string
  userId: string
  participants: Array<{
    id: string
    name: string
    avatar?: string
    role: string
    isSpeaking?: boolean
  }>
  onParticipantUpdate?: (participants: any[]) => void
}

export function VoiceChat({ roomId, userId, participants, onParticipantUpdate }: VoiceChatProps) {
  const [mediaState, mediaControls] = useMediaStream()
  const [isInCall, setIsInCall] = useState(false)
  const [audioLevels, setAudioLevels] = useState<Map<string, number>>(new Map())

  const localAudioRef = useRef<HTMLAudioElement>(null)
  const remoteAudioRefs = useRef<Map<string, HTMLAudioElement>>(new Map())
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  // تحليل مستوى الصوت
  useEffect(() => {
    if (mediaState.stream && mediaState.isAudioEnabled) {
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const source = audioContext.createMediaStreamSource(mediaState.stream)

      analyser.fftSize = 256
      source.connect(analyser)

      audioContextRef.current = audioContext
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const updateAudioLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          const normalizedLevel = Math.min(average / 128, 1)

          setAudioLevels((prev) => new Map(prev.set(userId, normalizedLevel)))

          if (isInCall) {
            requestAnimationFrame(updateAudioLevel)
          }
        }
      }

      updateAudioLevel()
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [mediaState.stream, mediaState.isAudioEnabled, userId, isInCall])

  // الانضمام للمكالمة
  const joinCall = async () => {
    try {
      setIsInCall(true)
      await mediaControls.startAudio()
    } catch (error) {
      console.error("[v0] Error joining call:", error)
      setIsInCall(false)
    }
  }

  // مغادرة المكالمة
  const leaveCall = () => {
    setIsInCall(false)
    mediaControls.cleanup()
    setAudioLevels(new Map())
  }

  // تبديل الميكروفون
  const toggleMicrophone = async () => {
    await mediaControls.toggleAudio()
  }

  const getAudioLevel = (participantId: string) => {
    return audioLevels.get(participantId) || 0
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "master":
        return "bg-yellow-500"
      case "super_admin":
        return "bg-red-500"
      case "admin":
        return "bg-blue-500"
      case "moderator":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* أدوات التحكم */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {!isInCall ? (
            <Button
              onClick={joinCall}
              className="bg-green-500 hover:bg-green-600 text-white font-arabic"
              disabled={mediaState.isLoading}
            >
              {mediaState.isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
              ) : (
                <Phone className="w-4 h-4 ml-2" />
              )}
              {mediaState.isLoading ? "جاري الاتصال..." : "انضمام للمكالمة"}
            </Button>
          ) : (
            <>
              <Button
                onClick={toggleMicrophone}
                variant={mediaState.isAudioEnabled ? "default" : "destructive"}
                className="font-arabic"
              >
                {mediaState.isAudioEnabled ? <Mic className="w-4 h-4 ml-2" /> : <MicOff className="w-4 h-4 ml-2" />}
                {mediaState.isAudioEnabled ? "كتم الميكروفون" : "تشغيل الميكروفون"}
              </Button>

              <Button onClick={leaveCall} variant="destructive" className="font-arabic">
                <PhoneOff className="w-4 h-4 ml-2" />
                مغادرة المكالمة
              </Button>
            </>
          )}
        </div>

        {/* رسائل الحالة */}
        {mediaState.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 font-arabic text-sm">{mediaState.error}</p>
          </div>
        )}

        {/* المشاركون في المكالمة */}
        {isInCall && (
          <div>
            <h3 className="font-bold font-arabic mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" />
              المشاركون في المكالمة ({participants.length})
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {participants.map((participant) => {
                const audioLevel = getAudioLevel(participant.userId)
                const isSpeaking = audioLevel > 0.1

                return (
                  <div
                    key={participant.userId}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                      isSpeaking ? "border-green-500 bg-green-50 shadow-lg scale-105" : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="text-center">
                      <div className="relative mb-3">
                        <Avatar className="w-16 h-16 mx-auto">
                          <AvatarImage src={participant.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="font-arabic">{participant.user.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>

                        {/* مؤشر التحدث */}
                        {isSpeaking && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <Mic className="w-3 h-3 text-white" />
                          </div>
                        )}

                        {/* مؤشر الدور */}
                        <div
                          className={`absolute -top-1 -left-1 w-4 h-4 ${getRoleColor(participant.role)} rounded-full`}
                        />
                      </div>

                      <h4 className="font-medium font-arabic text-sm mb-1">{participant.user.displayName}</h4>

                      <Badge variant="outline" className="text-xs font-arabic">
                        {participant.role === "master" 
                          ? "ماستر"
                          : participant.role === "super_admin"
                            ? "سوبر أدمن"
                            : participant.role === "admin"
                              ? "أدمن"
                              : participant.role === "moderator"
                                ? "مشرف"
                                : "عضو"}
                      </Badge>

                      {/* مؤشر مستوى الصوت */}
                      <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-100"
                          style={{ width: `${audioLevel * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* معلومات الاتصال */}
        {isInCall && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm text-gray-600 font-arabic">
              <span>
                حالة الاتصال: متصل
              </span>
              <span>المشاركون المتصلون: {participants.length}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}