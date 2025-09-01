"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { RoomInterface } from "@/components/room/room-interface"
import { useAuth } from "@/lib/auth/auth-context"
import type { Room, User } from "@/lib/types"
import { ROOM_PLANS } from "@/lib/types"

// بيانات تجريبية للغرفة
const mockRoom: Room = {
  id: "1",
  name: "غرفة الثقافة العربية",
  description: "مناقشات ثقافية وأدبية من جميع أنحاء العالم العربي",
  plan: "gold",
  ownerId: "owner1",
  isActive: true,
  isPrivate: false,
  maxUsers: 500,
  currentUsers: 245,
  createdAt: new Date(),
  settings: {
    allowGuests: true,
    requireApproval: false,
    allowVoiceChat: true,
    allowVideoChat: true,
    allowFileSharing: true,
    moderationEnabled: true,
    welcomeMessage: "أهلاً وسهلاً بكم في غرفة الثقافة العربية"
  },
  participants: []
}

export default function RoomPage() {
  const params = useParams()
  const roomId = params.id as string
  const { user } = useAuth()
  const [room, setRoom] = useState<Room | null>(null)
  const [guestUser, setGuestUser] = useState<User | null>(null)

  useEffect(() => {
    // تحميل بيانات الغرفة
    setRoom({ ...mockRoom, id: roomId })
  }, [roomId])

  const handleGuestJoin = (guestData: { displayName: string; country: string }) => {
    const guest: User = {
      id: `guest_${Date.now()}`,
      username: guestData.displayName.toLowerCase().replace(/\s+/g, '_'),
      displayName: guestData.displayName,
      country: guestData.country,
      role: "guest",
      isOnline: true,
      joinedAt: new Date(),
      lastSeen: new Date(),
      isGuest: true
    }
    setGuestUser(guest)
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="font-arabic">جاري تحميل الغرفة...</p>
        </div>
      </div>
    )
  }

  return (
    <RoomInterface 
      room={room} 
      user={user || guestUser} 
      onUserJoin={handleGuestJoin}
    />
  )
}