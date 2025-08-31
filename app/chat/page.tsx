"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { RoleBadge } from "@/components/ui/role-badge"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import { Send, Users, Crown, Shield, Star, Mic, MicOff, Video, VideoOff, Phone, PhoneOff } from "lucide-react"
import type { Room, User, Message, UserRole } from "@/lib/types"

// Mock data
const mockRooms: Room[] = [
  {
    id: "1",
    name: "غرفة الأصدقاء",
    description: "مكان للدردشة مع الأصدقاء",
    plan: "gold",
    maxParticipants: 100,
    isPrivate: false,
    ownerId: "user1",
    createdAt: new Date(),
    updatedAt: new Date(),
    participants: [],
    customRoles: [],
    settings: {
      allowVoiceChat: true,
      allowVideoChat: true,
      allowFileSharing: true,
      moderationEnabled: true,
      welcomeMessage: "أهلاً وسهلاً بكم في غرفة الأصدقاء",
    },
  },
  {
    id: "2",
    name: "غرفة العمل",
    description: "للمناقشات المهنية",
    plan: "premium",
    maxParticipants: 50,
    isPrivate: true,
    ownerId: "user2",
    createdAt: new Date(),
    updatedAt: new Date(),
    participants: [],
    customRoles: [],
    settings: {
      allowVoiceChat: true,
      allowVideoChat: true,
      allowFileSharing: true,
      moderationEnabled: true,
      welcomeMessage: "مرحباً بكم في غرفة العمل",
    },
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    content: "مرحباً بالجميع!",
    senderId: "user1",
    senderName: "أحمد محمد",
    senderRole: "master",
    roomId: "1",
    timestamp: new Date(Date.now() - 300000),
    type: "text",
  },
  {
    id: "2",
    content: "أهلاً وسهلاً",
    senderId: "user2",
    senderName: "فاطمة علي",
    senderRole: "admin",
    roomId: "1",
    timestamp: new Date(Date.now() - 240000),
    type: "text",
  },
  {
    id: "3",
    content: "كيف حالكم اليوم؟",
    senderId: "user3",
    senderName: "محمد سالم",
    senderRole: "member",
    roomId: "1",
    timestamp: new Date(Date.now() - 180000),
    type: "text",
  },
]

const mockParticipants: User[] = [
  {
    id: "user1",
    name: "أحمد محمد",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "master",
    isOnline: true,
    joinedAt: new Date(Date.now() - 3600000),
  },
  {
    id: "user2",
    name: "فاطمة علي",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "admin",
    isOnline: true,
    joinedAt: new Date(Date.now() - 1800000),
  },
  {
    id: "user3",
    name: "محمد سالم",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "member",
    isOnline: true,
    joinedAt: new Date(Date.now() - 900000),
  },
  {
    id: "user4",
    name: "سارة أحمد",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "moderator",
    isOnline: false,
    joinedAt: new Date(Date.now() - 7200000),
  },
]

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(mockRooms[0])
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [participants, setParticipants] = useState<User[]>(mockParticipants)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isInCall, setIsInCall] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: "current-user",
      senderName: "أنت",
      senderRole: "member",
      roomId: selectedRoom.id,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "master":
        return <Crown className="h-4 w-4" />
      case "super_admin":
        return <Shield className="h-4 w-4" />
      case "admin":
        return <Star className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-2rem)]">
          {/* قائمة الغرف */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-right">الغرف المتاحة</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-3">
                  {mockRooms.map((room) => (
                    <div
                      key={room.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedRoom?.id === room.id
                          ? "bg-pink-100 border-2 border-pink-300"
                          : "bg-white hover:bg-gray-50 border border-gray-200"
                      }`}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-right">{room.name}</h3>
                        <RoomPlanBadge plan={room.plan} />
                      </div>
                      <p className="text-sm text-gray-600 text-right mb-2">{room.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{room.participants?.length || 0} مشارك</span>
                        <span>{room.isPrivate ? "خاصة" : "عامة"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* منطقة الدردشة */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                {/* أدوات الوسائط المحسنة */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                    <Button
                      variant={isInCall ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsInCall(!isInCall)}
                      className={`font-arabic transition-all duration-200 ${isInCall ? 'shadow-lg animate-pulse' : ''}`}
                    >
                      {isInCall ? <PhoneOff className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                      {isInCall ? "إنهاء" : "مكالمة"}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                    <Button
                      variant={isVoiceEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                      className={`transition-all duration-200 hover:scale-105 ${
                        isVoiceEnabled
                          ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                          : 'border-green-200 text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {isVoiceEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>

                    <Button
                      variant={isVideoEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                      className={`transition-all duration-200 hover:scale-105 ${
                        isVideoEnabled
                          ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                          : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* مؤشرات الحالة */}
                  <div className="flex flex-col gap-1">
                    {isInCall && (
                      <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="font-arabic">مباشر</span>
                      </div>
                    )}
                    <div className="flex gap-1">
                      {isVoiceEnabled && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                      {isVideoEnabled && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <CardTitle className="flex items-center gap-2 font-arabic">
                    {selectedRoom && <RoomPlanBadge plan={selectedRoom.plan} />}
                    {selectedRoom?.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 font-arabic">{selectedRoom?.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                        <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{message.senderName}</span>
                          <RoleBadge role={message.senderRole} />
                          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm border">
                          <p className="text-right">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <Separator />

              <div className="p-4">
                <div className="flex gap-2">
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="اكتب رسالتك هنا..."
                    className="text-right"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* قائمة المشاركين */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Users className="h-5 w-5" />
                المشاركين ({participants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                            participant.isOnline ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <RoleBadge role={participant.role} />
                          {getRoleIcon(participant.role)}
                          <span className="font-medium text-sm">{participant.name}</span>
                        </div>
                        <p className="text-xs text-gray-500">{participant.isOnline ? "متصل الآن" : "غير متصل"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
