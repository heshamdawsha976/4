"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { RoleBadge } from "@/components/ui/role-badge"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import { Send, ArrowRight, Users, Mic, MicOff, Video, VideoOff, Phone, PhoneOff } from "lucide-react"
import Link from "next/link"
import type { Message, User, Room } from "@/lib/types"

export default function RoomChatPage() {
  const params = useParams()
  const roomId = params.roomId as string
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [participants, setParticipants] = useState<User[]>([])
  const [room, setRoom] = useState<Room | null>(null)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [isInCall, setIsInCall] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // محاكاة تحميل بيانات الغرفة
    const mockRoom: Room = {
      id: roomId,
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
    }

    const mockMessages: Message[] = [
      {
        id: "1",
        content: "مرحباً بالجميع في هذه الغرفة!",
        senderId: "user1",
        senderName: "أحمد محمد",
        senderRole: "master",
        roomId: roomId,
        timestamp: new Date(Date.now() - 300000),
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
    ]

    setRoom(mockRoom)
    setMessages(mockMessages)
    setParticipants(mockParticipants)
  }, [roomId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: "current-user",
      senderName: "أنت",
      senderRole: "member",
      roomId: roomId,
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

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p>جاري تحميل الغرفة...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* شريط التنقل العلوي المحسن */}
        <div className="mb-6">
          <Card className="bg-white/90 backdrop-blur-md border-pink-100 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* أدوات الوسائط المحسنة */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                    <Button
                      variant={isInCall ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsInCall(!isInCall)}
                      className={`font-arabic transition-all duration-200 ${isInCall ? 'shadow-lg' : ''}`}
                    >
                      {isInCall ? <PhoneOff className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                      {isInCall ? "إنهاء المكالمة" : "بدء مكالمة"}
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
                  <div className="flex items-center gap-2 text-xs">
                    {isInCall && (
                      <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="font-arabic">في مكالمة</span>
                      </div>
                    )}
                    {isVoiceEnabled && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        <Mic className="w-3 h-3" />
                        <span className="font-arabic">الميكروفون مفعل</span>
                      </div>
                    )}
                    {isVideoEnabled && (
                      <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        <Video className="w-3 h-3" />
                        <span className="font-arabic">الكاميرا مفعلة</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* معلومات الغرفة */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <RoomPlanBadge plan={room.plan} />
                      <h1 className="text-xl font-bold font-arabic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {room.name}
                      </h1>
                    </div>
                    <p className="text-sm text-gray-600 font-arabic">{room.description}</p>
                  </div>
                  <Link href="/rooms">
                    <Button variant="outline" size="sm" className="font-arabic border-pink-200 hover:bg-pink-50">
                      <ArrowRight className="h-4 w-4 ml-2" />
                      العودة للغرف
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* منطقة الدردشة */}
          <Card className="lg:col-span-3">
            <CardContent className="p-0 h-full flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {room.settings.welcomeMessage && (
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center">
                      <p className="text-pink-800">{room.settings.welcomeMessage}</p>
                    </div>
                  )}

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
              <ScrollArea className="h-[calc(100vh-20rem)]">
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
