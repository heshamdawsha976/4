"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRoomConnection } from "@/hooks/use-room-connection"
import type { User, Room } from "@/lib/types"
import {
  Mic, MicOff, Video, VideoOff, Phone, PhoneOff, Send, Users, 
  Crown, Shield, Star, Settings, Heart, Gift, Hand, Volume2
} from "lucide-react"

interface RoomInterfaceProps {
  room: Room
  user: User | null
  onUserJoin?: (userData: { displayName: string; country: string }) => void
}

export function RoomInterface({ room, user, onUserJoin }: RoomInterfaceProps) {
  const [newMessage, setNewMessage] = useState("")
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)

  // بيانات تجريبية
  const [participants, setParticipants] = useState([
    {
      userId: "1",
      user: { id: "1", username: "ahmed", displayName: "أحمد محمد", role: "master" as UserRole, isOnline: true, joinedAt: new Date(), lastSeen: new Date() },
      role: "master" as UserRole,
      joinedAt: new Date(),
      isMuted: false,
      isSpeaking: false,
      permissions: { canSpeak: true, canVideo: true, canChat: true, canInvite: true, canKick: true, canMute: true, canManageRoom: true }
    }
  ])
  
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "مرحباً بالجميع!",
      senderId: "1",
      senderName: "أحمد محمد",
      senderRole: "master" as UserRole,
      roomId: room.id,
      timestamp: new Date(),
      type: "text" as const
    }
  ])

  // التمرير التلقائي للرسائل
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        content: newMessage.trim(),
        senderId: user?.id || "guest",
        senderName: user?.displayName || "ضيف",
        senderRole: user?.role || "guest" as UserRole,
        roomId: room.id,
        timestamp: new Date(),
        type: "text" as const
      }
      setMessages(prev => [...prev, message])
      setNewMessage("")
    }
  }

  const handleToggleAudio = async () => {
    setIsAudioEnabled(!isAudioEnabled)
  }

  const handleToggleVideo = async () => {
    setIsVideoEnabled(!isVideoEnabled)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "master": return <Crown className="w-4 h-4 text-yellow-500" />
      case "super_admin": return <Shield className="w-4 h-4 text-red-500" />
      case "admin": return <Star className="w-4 h-4 text-blue-500" />
      default: return null
    }
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      master: "bg-yellow-500 text-white",
      super_admin: "bg-red-500 text-white", 
      admin: "bg-blue-500 text-white",
      moderator: "bg-green-500 text-white",
      member: "bg-gray-500 text-white",
      guest: "bg-purple-500 text-white"
    }
    
    const names = {
      master: "ماستر",
      super_admin: "سوبر أدمن",
      admin: "أدمن", 
      moderator: "مشرف",
      member: "عضو",
      guest: "ضيف"
    }

    return (
      <Badge className={`text-xs font-arabic ${colors[role as keyof typeof colors] || colors.guest}`}>
        {names[role as keyof typeof names] || "ضيف"}
      </Badge>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold font-arabic mb-2">انضم إلى {room.name}</h2>
              <p className="text-muted-foreground font-arabic">يمكنك الانضمام كزائر أو تسجيل الدخول</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Input 
                  placeholder="اسمك المعروض"
                  className="font-arabic text-right"
                  dir="rtl"
                />
              </div>
              <div>
                <select className="w-full p-2 border rounded-md font-arabic">
                  <option value="">اختر بلدك</option>
                  <option value="SA">السعودية</option>
                  <option value="EG">مصر</option>
                  <option value="AE">الإمارات</option>
                  <option value="JO">الأردن</option>
                </select>
              </div>
              <Button className="w-full font-arabic">
                انضمام كزائر
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-arabic">{room.name}</h1>
              <div className="flex items-center gap-3">
                <Badge className="bg-red-500 text-white font-arabic animate-pulse">
                  🔴 مباشر
                </Badge>
                <span className="text-sm text-muted-foreground font-arabic">
                  {participants.length} مشارك
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleToggleAudio}
              variant={isAudioEnabled ? "default" : "outline"}
              size="sm"
            >
              {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            <Button
              onClick={handleToggleVideo}
              variant={isVideoEnabled ? "default" : "outline"}
              size="sm"
            >
              {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </Button>
            <Button variant="destructive" size="sm" onClick={leaveRoom}>
            <Button variant="destructive" size="sm">
              <PhoneOff className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* منطقة البث الرئيسية */}
        <div className="flex-1 flex flex-col">
          {/* منطقة الفيديو */}
          <div className="bg-gray-900 p-6 border-b" style={{ minHeight: "300px" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
              {/* الفيديو المحلي */}
              {localStream && (
              {isVideoEnabled && (
                <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-2xl mb-2">📹</div>
                      <div className="text-sm">الكاميرا المحلية</div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-black/70 text-white font-arabic">أنت</Badge>
                  </div>
                </div>
              )}

              {/* فيديوهات المشاركين */}
              {participants.slice(0, 3).map((participant) => {
                return (
                  <div key={userId} className="relative bg-gray-800 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-2xl mb-2">{participant.user.displayName.charAt(0)}</div>
                        <div className="text-sm">{participant.user.displayName}</div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-black/70 text-white font-arabic">
                        {participant.user.displayName}
                      </Badge>
                    </div>
                  </div>
                )
              })}

              {/* المتحدثون الصوتيون */}
              {participants
                .filter(p => p.isSpeaking)
                .map(participant => (
                  <div key={participant.userId} className="relative bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Avatar className="w-16 h-16 mx-auto mb-2">
                        <AvatarImage src={participant.user.avatar} />
                        <AvatarFallback className="font-arabic">
                          {participant.user.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-arabic text-sm">{participant.user.displayName}</p>
                      {getRoleBadge(participant.role)}
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <Mic className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* منطقة الدردشة */}
          <div className="flex-1 flex flex-col bg-white">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map(message => (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="font-arabic">
                        {message.senderName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold font-arabic text-sm">{message.senderName}</span>
                        {getRoleBadge(message.senderRole)}
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString("ar")}
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-arabic text-right">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* إدخال الرسائل */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="اكتب رسالتك..."
                  className="font-arabic text-right"
                  dir="rtl"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* قائمة المشاركين */}
        <div className="w-80 bg-white border-l">
          <div className="p-4 border-b">
            <h3 className="font-bold font-arabic flex items-center gap-2">
              <Users className="w-5 h-5" />
              المشاركون ({participants.length})
            </h3>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {participants.map(participant => (
                <div key={participant.userId} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={participant.user.avatar} />
                    <AvatarFallback className="font-arabic">
                      {participant.user.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium font-arabic text-sm">{participant.user.displayName}</span>
                      {getRoleIcon(participant.role)}
                    </div>
                    <div className="flex items-center gap-2">
                      {getRoleBadge(participant.role)}
                      {participant.isSpeaking && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* أدوات التفاعل */}
          <div className="p-4 border-t">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {["❤️", "👏", "🔥", "✨", "👍", "😍"].map(emoji => (
                  <Button key={emoji} variant="outline" size="sm" className="text-lg">
                    {emoji}
                  </Button>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 font-arabic">
                  <Hand className="w-4 h-4 ml-1" />
                  رفع اليد
                </Button>
                <Button variant="outline" size="sm" className="flex-1 font-arabic">
                  <Gift className="w-4 h-4 ml-1" />
                  هدية
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* رسائل الخطأ */}
      {false && (
        <div className="absolute bottom-4 left-4 right-4">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-3">
              <p className="text-red-700 font-arabic text-sm">خطأ في الاتصال</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}