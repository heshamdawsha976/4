"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  Phone,
  PhoneOff,
  Volume2,
  VolumeX,
  Settings,
  Users,
  MessageCircle,
  Hand,
  Gift,
} from "lucide-react"

interface MediaControlsProps {
  isInCall: boolean
  isAudioEnabled: boolean
  isVideoEnabled: boolean
  isScreenSharing: boolean
  participantCount: number
  onJoinCall: () => void
  onLeaveCall: () => void
  onToggleAudio: () => void
  onToggleVideo: () => void
  onToggleScreenShare: () => void
  onRaiseHand: () => void
  onSendReaction: (reaction: string) => void
  className?: string
}

export function MediaControls({
  isInCall,
  isAudioEnabled,
  isVideoEnabled,
  isScreenSharing,
  participantCount,
  onJoinCall,
  onLeaveCall,
  onToggleAudio,
  onToggleVideo,
  onToggleScreenShare,
  onRaiseHand,
  onSendReaction,
  className = "",
}: MediaControlsProps) {
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)

  const reactions = [
    { emoji: "❤️", label: "حب" },
    { emoji: "👏", label: "تصفيق" },
    { emoji: "😍", label: "إعجاب" },
    { emoji: "🔥", label: "رائع" },
    { emoji: "✨", label: "مميز" },
    { emoji: "👍", label: "موافق" },
  ]

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-4">
        {/* معلومات الحالة */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-arabic text-sm">{participantCount} مشارك</span>
            </div>

            {isInCall && (
              <Badge variant="outline" className="font-arabic bg-green-50 text-green-700 border-green-200">
                متصل
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Separator className="mb-4" />

        {!isInCall ? (
          /* أزرار الانضمام */
          <div className="text-center">
            <Button onClick={onJoinCall} className="bg-green-500 hover:bg-green-600 text-white font-arabic px-8 py-3">
              <Phone className="w-4 h-4 ml-2" />
              انضمام للمكالمة
            </Button>
          </div>
        ) : (
          /* أدوات التحكم الرئيسية */
          <div className="space-y-4">
            {/* أدوات التحكم الأساسية */}
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={onToggleAudio}
                variant={isAudioEnabled ? "default" : "destructive"}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                title={isAudioEnabled ? "كتم الميكروفون" : "تشغيل الميكروفون"}
              >
                {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>

              <Button
                onClick={onToggleVideo}
                variant={isVideoEnabled ? "default" : "destructive"}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                title={isVideoEnabled ? "إيقاف الكاميرا" : "تشغيل الكاميرا"}
              >
                {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>

              <Button
                onClick={onToggleScreenShare}
                variant={isScreenSharing ? "default" : "outline"}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                title={isScreenSharing ? "إيقاف مشاركة الشاشة" : "مشاركة الشاشة"}
              >
                {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
              </Button>

              <Button
                onClick={toggleMute}
                variant={isMuted ? "destructive" : "outline"}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                title={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <Button
                onClick={onLeaveCall}
                variant="destructive"
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                title="مغادرة المكالمة"
              >
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>

            <Separator />

            {/* أدوات إضافية */}
            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={onRaiseHand}
                variant="outline"
                size="sm"
                className="font-arabic hover:bg-primary/10 bg-transparent"
              >
                <Hand className="w-4 h-4 ml-2" />
                رفع اليد
              </Button>

              <Button variant="outline" size="sm" className="font-arabic hover:bg-primary/10 bg-transparent">
                <Gift className="w-4 h-4 ml-2" />
                هدية
              </Button>
            </div>

            {/* ردود الفعل السريعة */}
            <div className="flex items-center justify-center gap-1">
              {reactions.map((reaction) => (
                <Button
                  key={reaction.emoji}
                  onClick={() => onSendReaction(reaction.emoji)}
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-primary/10 rounded-full"
                  title={reaction.label}
                >
                  <span className="text-lg">{reaction.emoji}</span>
                </Button>
              ))}
            </div>

            {/* شريط التحكم في مستوى الصوت */}
            {!isMuted && (
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-500 font-arabic w-8">{volume}%</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
