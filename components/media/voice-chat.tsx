"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Radio,
  Users,
  Crown,
  Star,
  Shield,
  UserCheck,
  Headphones,
  Speaker,
  Hand
} from "lucide-react"

interface VoiceParticipant {
  id: string
  name: string
  avatar?: string
  role: string
  isAudioEnabled: boolean
  isSpeaking: boolean
  audioLevel: number
  isHandRaised: boolean
  isMuted: boolean
  joinedAt: Date
}

interface VoiceChatProps {
  participants: VoiceParticipant[]
  currentUserId: string
  isConnected: boolean
  isMuted: boolean
  isDeafened: boolean
  onMuteToggle: () => void
  onDeafenToggle: () => void
  onHandRaise: () => void
  onParticipantMute?: (participantId: string) => void
  onParticipantKick?: (participantId: string) => void
  roomName: string
  className?: string
}

export function VoiceChat({
  participants,
  currentUserId,
  isConnected,
  isMuted,
  isDeafened,
  onMuteToggle,
  onDeafenToggle,
  onHandRaise,
  onParticipantMute,
  onParticipantKick,
  roomName,
  className = ""
}: VoiceChatProps) {
  const [audioLevels, setAudioLevels] = useState<Record<string, number>>({})
  
  const currentUser = participants.find(p => p.id === currentUserId)
  const speakingParticipants = participants.filter(p => p.isSpeaking)
  const raisedHands = participants.filter(p => p.isHandRaised).length

  // محاكاة مستويات الصوت
  useEffect(() => {
    if (!isConnected) return

    const interval = setInterval(() => {
      const newLevels: Record<string, number> = {}
      participants.forEach(participant => {
        if (participant.isSpeaking && participant.isAudioEnabled) {
          newLevels[participant.id] = Math.random() * 100
        } else {
          newLevels[participant.id] = 0
        }
      })
      setAudioLevels(newLevels)
    }, 100)

    return () => clearInterval(interval)
  }, [isConnected, participants])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "master": return <Crown className="w-4 h-4 text-yellow-500" />
      case "super_admin": return <Shield className="w-4 h-4 text-red-500" />
      case "admin": return <Star className="w-4 h-4 text-blue-500" />
      case "guest": return <UserCheck className="w-4 h-4 text-orange-500" />
      default: return null
    }
  }

  const VoiceParticipantCard = ({ participant }: { participant: VoiceParticipant }) => (
    <div className={`
      flex items-center gap-3 p-3 rounded-lg transition-all duration-200 
      ${participant.isSpeaking 
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-md' 
        : 'bg-white hover:bg-gray-50 border border-gray-200'
      }
    `}>
      {/* Avatar مع مؤشر الصوت */}
      <div className="relative">
        <Avatar className="w-10 h-10">
          <AvatarImage src={participant.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-arabic">
            {participant.name[0]}
          </AvatarFallback>
        </Avatar>
        
        {/* مؤشر التحدث */}
        {participant.isSpeaking && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
        
        {/* مؤشر كتم الصوت */}
        {!participant.isAudioEnabled && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <MicOff className="w-2 h-2 text-white" />
          </div>
        )}
      </div>

      {/* معلومات المشارك */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-arabic font-medium text-sm">{participant.name}</span>
          {getRoleIcon(participant.role)}
          {participant.isHandRaised && (
            <Hand className="w-4 h-4 text-yellow-500 animate-bounce" />
          )}
        </div>
        
        {/* شريط مستوى الصوت */}
        {participant.isAudioEnabled && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <Progress 
              value={audioLevels[participant.id] || 0} 
              className="h-2"
            />
          </div>
        )}
        
        {!participant.isAudioEnabled && (
          <div className="text-xs text-gray-500 font-arabic">الميكروفون مُتوقف</div>
        )}
      </div>

      {/* أزرار التحكم (للمدراء) */}
      {currentUser?.role === "master" && participant.id !== currentUserId && (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onParticipantMute?.(participant.id)}
            className="text-red-600 hover:bg-red-50"
          >
            <MicOff className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  )

  if (!isConnected) {
    return (
      <Card className={`${className} bg-gray-100 border-dashed border-2 border-gray-300`}>
        <CardContent className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Radio className="w-12 h-12 mb-4" />
          <p className="font-arabic text-lg mb-4">غير متصل بالدردشة الصوتية</p>
          <Button className="font-arabic bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            الاتصال بالدردشة الصوتية
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-arabic">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-green-500" />
            <span>الدردشة الصوتية - {roomName}</span>
          </div>
          <div className="flex items-center gap-2">
            {raisedHands > 0 && (
              <Badge className="bg-yellow-100 text-yellow-800 font-arabic">
                <Hand className="w-3 h-3 ml-1" />
                {raisedHands} يد مرفوعة
              </Badge>
            )}
            <Badge variant="secondary" className="font-arabic">
              <Users className="w-3 h-3 ml-1" />
              {participants.length} مشارك
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* أدوات التحكم الشخصية */}
        <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
          <Button
            variant={isMuted ? "destructive" : "default"}
            onClick={onMuteToggle}
            className={`font-arabic ${
              isMuted 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isMuted ? <MicOff className="w-4 h-4 ml-2" /> : <Mic className="w-4 h-4 ml-2" />}
            {isMuted ? "إلغاء الكتم" : "كتم الميكروفون"}
          </Button>

          <Button
            variant={isDeafened ? "destructive" : "outline"}
            onClick={onDeafenToggle}
            className="font-arabic"
          >
            {isDeafened ? <VolumeX className="w-4 h-4 ml-2" /> : <Volume2 className="w-4 h-4 ml-2" />}
            {isDeafened ? "تشغيل الصوت" : "كتم الصوت"}
          </Button>

          <Button
            variant="outline"
            onClick={onHandRaise}
            className={`font-arabic ${
              currentUser?.isHandRaised ? "bg-yellow-100 text-yellow-800 border-yellow-300" : ""
            }`}
          >
            <Hand className="w-4 h-4 ml-2" />
            {currentUser?.isHandRaised ? "إنزال اليد" : "رفع اليد"}
          </Button>
        </div>

        {/* قائمة المشاركين */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <h3 className="font-arabic font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            المشاركون في الدردشة الصوتية
          </h3>
          
          {/* المشاركون النشطون (يتحدثون) */}
          {speakingParticipants.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-green-600 font-arabic mb-2 flex items-center gap-1">
                <Mic className="w-3 h-3" />
                يتحدثون الآن
              </p>
              {speakingParticipants.map(participant => (
                <VoiceParticipantCard key={participant.id} participant={participant} />
              ))}
            </div>
          )}

          {/* باقي المشاركين */}
          <div>
            <p className="text-xs text-gray-500 font-arabic mb-2 flex items-center gap-1">
              <Headphones className="w-3 h-3" />
              المستمعون
            </p>
            {participants
              .filter(p => !p.isSpeaking)
              .map(participant => (
                <VoiceParticipantCard key={participant.id} participant={participant} />
              ))}
          </div>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {speakingParticipants.length}
            </div>
            <div className="text-xs text-gray-500 font-arabic">يتحدثون</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {participants.filter(p => p.isAudioEnabled).length}
            </div>
            <div className="text-xs text-gray-500 font-arabic">ميكروفون مفعل</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">
              {raisedHands}
            </div>
            <div className="text-xs text-gray-500 font-arabic">يد مرفوعة</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VoiceChat
