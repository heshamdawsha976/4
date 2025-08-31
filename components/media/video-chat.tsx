"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MediaControls } from "./media-controls"
import { 
  Maximize2, 
  Minimize2, 
  Pin, 
  PinOff,
  Users,
  Grid3X3,
  Monitor,
  Mic,
  MicOff,
  Video,
  VideoOff
} from "lucide-react"

interface Participant {
  id: string
  name: string
  avatar?: string
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isScreenSharing: boolean
  isSpeaking: boolean
  role?: string
}

interface VideoChatProps {
  participants: Participant[]
  currentUserId: string
  isInCall: boolean
  onCallToggle: () => void
  onVoiceToggle: () => void
  onVideoToggle: () => void
  onScreenShareToggle: () => void
  className?: string
}

export function VideoChat({
  participants,
  currentUserId,
  isInCall,
  onCallToggle,
  onVoiceToggle,
  onVideoToggle,
  onScreenShareToggle,
  className = ""
}: VideoChatProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "speaker" | "sidebar">("grid")
  const [pinnedParticipant, setPinnedParticipant] = useState<string | null>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  const currentUser = participants.find(p => p.id === currentUserId)
  const otherParticipants = participants.filter(p => p.id !== currentUserId)
  const speakingParticipant = participants.find(p => p.isSpeaking && p.id !== currentUserId)
  const screenSharingParticipant = participants.find(p => p.isScreenSharing)

  useEffect(() => {
    if (screenSharingParticipant) {
      setViewMode("speaker")
      setPinnedParticipant(screenSharingParticipant.id)
    }
  }, [screenSharingParticipant])

  const VideoFrame = ({ participant, isMain = false, className = "" }: { 
    participant: Participant
    isMain?: boolean
    className?: string 
  }) => (
    <div 
      className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden ${className}`}
      onClick={() => !isMain && setPinnedParticipant(participant.id)}
    >
      {/* فيديو الخلفية */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20"></div>
      
      {/* محتوى الفيديو */}
      {participant.isVideoEnabled ? (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <span className="text-white/70 text-sm font-arabic">فيديو {participant.name}</span>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Avatar className={isMain ? "w-20 h-20" : "w-12 h-12"}>
            <AvatarImage src={participant.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-arabic">
              {participant.name[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* معلومات المشارك */}
      <div className="absolute bottom-2 left-2 right-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-arabic bg-black/50 px-2 py-1 rounded">
              {participant.name}
            </span>
            {participant.role && (
              <Badge className="text-xs">
                {participant.role}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {participant.isSpeaking && (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
            {!participant.isAudioEnabled && (
              <div className="bg-red-500 rounded-full p-1">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            )}
            {participant.isScreenSharing && (
              <div className="bg-blue-500 rounded-full p-1">
                <Monitor className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* تأثير التحدث */}
      {participant.isSpeaking && (
        <div className="absolute inset-0 border-2 border-green-400 rounded-lg animate-pulse"></div>
      )}
    </div>
  )

  if (!isInCall) {
    return (
      <Card className={`${className} bg-gray-100 border-dashed border-2 border-gray-300`}>
        <CardContent className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Users className="w-12 h-12 mb-4" />
          <p className="font-arabic text-lg mb-4">لا توجد مكالمة نشطة</p>
          <Button 
            onClick={onCallToggle}
            className="font-arabic bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            بدء مكالمة فيديو
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${className} relative bg-gray-900 text-white overflow-hidden`}>
      {/* شريط التحكم العلوي */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-red-500 text-white font-arabic">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-1"></div>
            مباشر
          </Badge>
          <Badge variant="secondary" className="font-arabic">
            {participants.length} مشارك
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* أزرار ��بديل العرض */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "speaker" : "grid")}
            className="text-white hover:bg-white/10"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>

          {/* زر تثبيت */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPinned(!isPinned)}
            className="text-white hover:bg-white/10"
          >
            {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
          </Button>

          {/* زر ملء الشاشة */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-white hover:bg-white/10"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <CardContent className="p-4 h-full" ref={videoContainerRef}>
        {/* عرض الشبكة */}
        {viewMode === "grid" && (
          <div className={`grid gap-2 h-full ${
            participants.length === 1 ? "grid-cols-1" :
            participants.length === 2 ? "grid-cols-2" :
            participants.length <= 4 ? "grid-cols-2 grid-rows-2" :
            "grid-cols-3 grid-rows-2"
          }`}>
            {participants.map((participant) => (
              <VideoFrame 
                key={participant.id} 
                participant={participant}
                className="cursor-pointer hover:ring-2 hover:ring-pink-400 transition-all"
              />
            ))}
          </div>
        )}

        {/* عرض المتحدث الرئيسي */}
        {viewMode === "speaker" && (
          <div className="flex h-full gap-4">
            {/* المتحدث الرئيسي */}
            <div className="flex-1">
              <VideoFrame 
                participant={pinnedParticipant ? 
                  participants.find(p => p.id === pinnedParticipant)! :
                  speakingParticipant || currentUser!
                }
                isMain={true}
                className="h-full"
              />
            </div>

            {/* الشريط الجانبي للمشاركين */}
            <div className="w-48 flex flex-col gap-2">
              {otherParticipants
                .filter(p => p.id !== pinnedParticipant)
                .map((participant) => (
                <VideoFrame 
                  key={participant.id} 
                  participant={participant}
                  className="h-24 cursor-pointer hover:ring-2 hover:ring-pink-400 transition-all"
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {/* أدوات التحكم السفلية */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3">
          <MediaControls
            isInCall={isInCall}
            isVoiceEnabled={currentUser?.isAudioEnabled}
            isVideoEnabled={currentUser?.isVideoEnabled}
            isScreenSharing={currentUser?.isScreenSharing}
            onCallToggle={onCallToggle}
            onVoiceToggle={onVoiceToggle}
            onVideoToggle={onVideoToggle}
            onScreenShareToggle={onScreenShareToggle}
            layout="compact"
            showLabels={false}
            showStatus={false}
          />
        </div>
      </div>
    </Card>
  )
}

export default VideoChat
