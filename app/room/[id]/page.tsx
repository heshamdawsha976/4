"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth/auth-context"
import { VoiceChat } from "@/components/media/voice-chat"
import { 
  Radio,
  Users,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Hand,
  ArrowRight,
  Crown,
  Settings,
  UserX
} from "lucide-react"
import Link from "next/link"

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

export default function VoiceRoomPage() {
  const params = useParams()
  const roomId = params.id as string
  const { user, isGuest } = useAuth()
  
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [participants, setParticipants] = useState<VoiceParticipant[]>([])

  // بيانات الغرفة المحاكاة
  const roomData = {
    id: roomId,
    name: "صالون الخليج العربي",
    description: "تجمع أهل الخليج للحديث عن التراث والثقافة",
    region: "الخليج العربي",
    country: "🇸🇦",
    plan: "gold",
    owner: "عبدالله الخليجي",
    isLive: true,
    participants: 45,
    maxParticipants: 100
  }

  // محاكاة المشاركين
  useEffect(() => {
    const mockParticipants: VoiceParticipant[] = [
      {
        id: "1",
        name: "عبدالله الخليجي",
        role: "master",
        isAudioEnabled: true,
        isSpeaking: true,
        audioLevel: 75,
        isHandRaised: false,
        isMuted: false,
        joinedAt: new Date(Date.now() - 3600000)
      },
      {
        id: "2", 
        name: "فاطمة الكويتية",
        role: "admin",
        isAudioEnabled: true,
        isSpeaking: false,
        audioLevel: 0,
        isHandRaised: false,
        isMuted: false,
        joinedAt: new Date(Date.now() - 1800000)
      },
      {
        id: "3",
        name: "محمد السعودي", 
        role: "member",
        isAudioEnabled: false,
        isSpeaking: false,
        audioLevel: 0,
        isHandRaised: true,
        isMuted: true,
        joinedAt: new Date(Date.now() - 900000)
      }
    ]

    if (user) {
      mockParticipants.push({
        id: user.id,
        name: user.firstName,
        role: user.role,
        isAudioEnabled: !isMuted,
        isSpeaking: false,
        audioLevel: 0,
        isHandRaised: false,
        isMuted: isMuted,
        joinedAt: new Date()
      })
    }

    setParticipants(mockParticipants)
  }, [user, isMuted])

  const handleJoinRoom = () => {
    setIsConnected(true)
  }

  const handleLeaveRoom = () => {
    setIsConnected(false)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleDeafenToggle = () => {
    setIsDeafened(!isDeafened)
  }

  const handleHandRaise = () => {
    // تنفيذ رفع اليد
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Radio className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-arabic mb-4">مطلوب تسجيل دخول</h2>
            <p className="text-gray-600 font-arabic mb-6">
              يجب تسجيل الدخول أولاً للانضمام إلى الغرفة
            </p>
            <Link href="/rooms">
              <Button className="font-arabic bg-red-600 hover:bg-red-700">
                العودة للغرف
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/rooms">
              <Button variant="outline" size="sm" className="font-arabic border-gray-300">
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة للغرف
              </Button>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="text-lg">{roomData.country}</div>
              <div>
                <h1 className="font-arabic font-bold text-lg">{roomData.name}</h1>
                <p className="text-sm text-gray-600 font-arabic">{roomData.region}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800 font-arabic">
              <div className="w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse"></div>
              مباشر
            </Badge>
            <Badge variant="secondary" className="font-arabic">
              <Users className="w-3 h-3 ml-1" />
              {roomData.participants}/{roomData.maxParticipants}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isConnected ? (
          /* شاشة الدخول للغرفة */
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white shadow-xl">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Radio className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="font-arabic text-2xl">{roomData.name}</CardTitle>
                <p className="text-gray-600 font-arabic">{roomData.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* معلومات الغرفة */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{roomData.participants}</div>
                    <div className="text-sm text-gray-600 font-arabic">مشارك حالياً</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{roomData.maxParticipants}</div>
                    <div className="text-sm text-gray-600 font-arabic">الحد الأقصى</div>
                  </div>
                </div>

                {/* نبذة عن المشاركين */}
                <div>
                  <h3 className="font-arabic font-semibold mb-3">المتحدثون النشطون</h3>
                  <div className="space-y-2">
                    {participants.slice(0, 3).map((participant) => (
                      <div key={participant.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-red-100 text-red-700 font-arabic">
                            {participant.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-arabic text-sm font-medium">{participant.name}</span>
                            {participant.role === "master" && <Crown className="w-3 h-3 text-yellow-500" />}
                            {participant.isSpeaking && (
                              <Badge className="bg-green-100 text-green-700 text-xs">يتحدث</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* أزرار الدخول */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleJoinRoom}
                    className="w-full font-arabic text-lg py-6 bg-red-600 hover:bg-red-700"
                  >
                    <Radio className="w-5 h-5 ml-2" />
                    انضم للدردشة الصوتية
                  </Button>
                  
                  <p className="text-xs text-gray-500 font-arabic text-center">
                    بالانضمام، أنت توافق على قوانين الغرفة ومجتمع لقاء
                  </p>
                </div>

                {/* معلومات مالك الغرفة */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-yellow-100 text-yellow-700 font-arabic">
                        {roomData.owner[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="font-arabic font-medium">مالك الغرفة</span>
                      </div>
                      <p className="text-sm text-gray-600 font-arabic">{roomData.owner}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* واجهة الدردشة الصوتية */
          <div className="max-w-4xl mx-auto">
            <VoiceChat
              participants={participants}
              currentUserId={user.id}
              isConnected={isConnected}
              isMuted={isMuted}
              isDeafened={isDeafened}
              onMuteToggle={handleMuteToggle}
              onDeafenToggle={handleDeafenToggle}
              onHandRaise={handleHandRaise}
              roomName={roomData.name}
            />
            
            {/* أزرار التحكم السفلية */}
            <div className="mt-6 text-center">
              <Button 
                onClick={handleLeaveRoom}
                variant="destructive"
                className="font-arabic"
              >
                <UserX className="w-4 h-4 ml-2" />
                مغادرة الغرفة
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
