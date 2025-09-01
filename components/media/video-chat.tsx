"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useMediaStream } from "@/hooks/use-media-stream"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  PhoneOff,
  Maximize2,
  Minimize2,
  Settings,
  Loader2,
} from "lucide-react"

interface VideoChatProps {
  roomId: string
  userId: string
  participants: Array<{
    id: string
    name: string
    avatar?: string
    role: string
  }>
  onParticipantUpdate?: (participants: any[]) => void
}

export function VideoChat({ roomId, userId, participants, onParticipantUpdate }: VideoChatProps) {
  const [mediaState, mediaControls] = useMediaStream()
  const [isInCall, setIsInCall] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // ربط المسار المحلي بعنصر الفيديو
  useEffect(() => {
    if (localVideoRef.current && mediaState.stream) {
      localVideoRef.current.srcObject = mediaState.stream
    }
  }, [mediaState.stream])

  // الانضمام للمكالمة المرئية
  const joinVideoCall = async () => {
    try {
      setIsInCall(true)
      await mediaControls.startVideo()
    } catch (error) {
      console.error("[v0] Error joining video call:", error)
      setIsInCall(false)
    }
  }

  // مغادرة المكالمة
  const leaveCall = () => {
    setIsInCall(false)
    mediaControls.cleanup()
  }

  // تبديل الكاميرا
  const toggleCamera = async () => {
    await mediaControls.toggleVideo()
  }

  // تبديل الميكروفون
  const toggleMicrophone = async () => {
    await mediaControls.toggleAudio()
  }

  // تبديل مشاركة الشاشة
  const toggleScreenShare = async () => {
    if (mediaState.isScreenSharing) {
      await mediaControls.stopScreenShare()
    } else {
      await mediaControls.startScreenShare()
    }
  }

  // تبديل وضع ملء الشاشة
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "master":
        return "border-yellow-500 bg-yellow-50"
      case "super_admin":
        return "border-red-500 bg-red-50"
      case "admin":
        return "border-blue-500 bg-blue-50"
      case "moderator":
        return "border-green-500 bg-green-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getParticipantVideo = (participantId: string) => {
    return null // مبسط للآن
  }

  return (
    <div ref={containerRef} className="w-full">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* أدوات التحكم العلوية */}
          <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold font-arabic">المكالمة المرئية</h3>
              {isInCall && (
                <Badge variant="outline" className="font-arabic bg-green-50 text-green-700 border-green-200">
                  متصل • {participants.length} مشارك
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isInCall && (
                <>
                  <Button onClick={toggleFullscreen} variant="ghost" size="sm" className="hover:bg-gray-200">
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-200">
                    <Settings className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          {!isInCall ? (
            /* شاشة الانضمام */
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold font-arabic mb-2">انضم للمكالمة المرئية</h3>
                <p className="text-gray-600 font-arabic">شارك في محادثة مرئية مع المشاركين الآخرين</p>
              </div>

              {/* معاينة الكاميرا */}
              <div className="mb-6">
                <div className="relative w-64 h-48 mx-auto bg-gray-900 rounded-lg overflow-hidden">
                  {mediaState.stream && mediaState.isVideoEnabled ? (
                    <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <VideoOff className="w-12 h-12 text-gray-400" />
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-2">
                    <Button
                      onClick={toggleCamera}
                      variant={mediaState.isVideoEnabled ? "default" : "secondary"}
                      size="sm"
                    >
                      {mediaState.isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={toggleMicrophone}
                      variant={mediaState.isAudioEnabled ? "default" : "secondary"}
                      size="sm"
                    >
                      {mediaState.isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={joinVideoCall}
                className="bg-green-500 hover:bg-green-600 text-white font-arabic px-8 py-3"
                disabled={webrtcState.isConnecting || mediaState.isLoading}
              >
                {webrtcState.isConnecting || mediaState.isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                ) : (
                  <Video className="w-4 h-4 ml-2" />
                )}
                {webrtcState.isConnecting ? "جاري الاتصال..." : "انضمام للمكالمة"}
              </Button>
            </div>
          ) : (
            /* واجهة المكالمة */
            <div className="relative">
              {/* الفيديو الرئيسي */}
              <div className="relative bg-gray-900" style={{ aspectRatio: "16/9" }}>
                {selectedParticipant ? (
                  /* فيديو المشارك المحدد */
                  <div className="w-full h-full">
                    <VideoParticipant
                      participantId={selectedParticipant}
                      participant={participants.find((p) => p.id === selectedParticipant)!}
                      videoElement={getParticipantVideo(selectedParticipant)}
                      isMain={true}
                    />
                  </div>
                ) : (
                  /* الفيديو المحلي */
                  <div className="w-full h-full relative">
                    {mediaState.isVideoEnabled ? (
                      <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white">
                          <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="font-arabic">الكاميرا مغلقة</p>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-black/50 text-white font-arabic">أنت</Badge>
                    </div>
                  </div>
                )}
              </div>

                {participants.slice(0, 3).map((participant) => {
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {/* الفيديو المحلي المصغر */}
                  <div
                    className={`relative flex-shrink-0 w-32 h-24 bg-gray-900 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      key={participant.id}
                    }`}
                        selectedParticipant === participant.id ? "border-white" : "border-transparent"
                  >
                      onClick={() => setSelectedParticipant(participant.id)}
                      <video
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-2xl mb-1">{participant.name.charAt(0)}</div>
                          <div className="text-xs">{participant.name}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <VideoOff className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1">
                      <Badge className="bg-black/70 text-white text-xs font-arabic">أنت</Badge>
                    </div>
                  </div>

                  {/* فيديوهات المشاركين */}
                  {Array.from(webrtcState.remoteStreams.entries()).map(([participantId, stream]) => {
                    const participant = participants.find((p) => p.id === participantId)
                    if (!participant) return null

                    return (
                      <div
                        key={participantId}
                        className={`relative flex-shrink-0 w-32 h-24 bg-gray-900 rounded-lg overflow-hidden cursor-pointer border-2 ${
                          selectedParticipant === participantId ? "border-white" : "border-transparent"
                        }`}
                        onClick={() => setSelectedParticipant(participantId)}
                      >
                        <VideoParticipant
                          participantId={participantId}
                          participant={participant}
                          videoElement={getParticipantVideo(participantId)}
                          isMain={false}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* أدوات التحكم */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-3 bg-black/70 rounded-full px-6 py-3">
                  <Button
                    onClick={toggleMicrophone}
                    variant={mediaState.isAudioEnabled ? "secondary" : "destructive"}
                    size="sm"
                    className="rounded-full"
                  >
                    {mediaState.isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>

                  <Button
                    onClick={toggleCamera}
                    variant={mediaState.isVideoEnabled ? "secondary" : "destructive"}
                    size="sm"
                    className="rounded-full"
                  >
                    {mediaState.isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </Button>

                  <Button
                    onClick={toggleScreenShare}
                    variant={mediaState.isScreenSharing ? "default" : "secondary"}
                    size="sm"
                    className="rounded-full"
                  >
                    {mediaState.isScreenSharing ? <MonitorOff className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                  </Button>

                  <Button onClick={leaveCall} variant="destructive" size="sm" className="rounded-full">
                    <PhoneOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* رسائل الخطأ */}
          {mediaState.error && (
            <div className="p-4 bg-red-50 border-t border-red-200">
              <p className="text-red-700 font-arabic text-sm">{mediaState.error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

