"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import { RoleBadge } from "@/components/ui/role-badge"
import { CreateRoomDialog } from "@/components/rooms/create-room-dialog"
import { RoomSettingsDialog } from "@/components/rooms/room-settings-dialog"
import { ParticipantsManager } from "@/components/rooms/participants-manager"
import { ROOM_PLANS, DEFAULT_ROLES, type Room } from "@/lib/types"
import { Plus, Search, Settings, Users, Eye, Trash2, Crown, MessageCircle, Mic, Video, Globe } from "lucide-react"

// بيانات تجريبية للغرف
const mockRooms: Room[] = [
  {
    id: "1",
    name: "غرفة الثقافة العربية",
    description: "مناقشات ثقافية وأدبية",
    plan: ROOM_PLANS[0], // Premium
    owner: { id: "1", name: "أحمد محمد", country: "مصر" },
    moderators: [
      {
        user: { id: "2", name: "فاطمة أحمد", country: "المغرب" },
        role: DEFAULT_ROLES[1], // Super Admin
        assignedAt: new Date(),
        assignedBy: "1",
      },
    ],
    participants: [
      {
        user: { id: "3", name: "محمد علي", country: "السعودية" },
        role: DEFAULT_ROLES[4], // Member
        assignedAt: new Date(),
        assignedBy: "1",
      },
      {
        user: { id: "4", name: "ليلى حسن", country: "لبنان" },
        role: DEFAULT_ROLES[3], // Moderator
        assignedAt: new Date(),
        assignedBy: "1",
      },
    ],
    isActive: true,
    createdAt: new Date(),
    settings: {
      allowGuests: true,
      requireApproval: false,
      maxParticipants: 1000,
      allowPrivateMessages: true,
      allowVoiceChat: true,
      allowVideoChat: true,
      allowFileSharing: true,
    },
  },
  {
    id: "2",
    name: "غرفة الشعر والأدب",
    description: "منصة لمحبي الشعر والأدب العربي",
    plan: ROOM_PLANS[1], // Gold
    owner: { id: "5", name: "عمر الشاعر", country: "الأردن" },
    moderators: [],
    participants: [
      {
        user: { id: "6", name: "نور الدين", country: "تونس" },
        role: DEFAULT_ROLES[4], // Member
        assignedAt: new Date(),
        assignedBy: "5",
      },
    ],
    isActive: true,
    createdAt: new Date(),
    settings: {
      allowGuests: false,
      requireApproval: true,
      maxParticipants: 500,
      allowPrivateMessages: true,
      allowVoiceChat: true,
      allowVideoChat: false,
      allowFileSharing: false,
    },
  },
]

export default function RoomsAdminPage() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [showParticipantsDialog, setShowParticipantsDialog] = useState(false)

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateRoom = (roomData: Partial<Room>) => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: roomData.name!,
      description: roomData.description,
      plan: roomData.plan!,
      owner: { id: "current-user", name: "المستخدم الحالي" },
      moderators: [],
      participants: [],
      isActive: true,
      createdAt: new Date(),
      settings: roomData.settings!,
    }
    setRooms([...rooms, newRoom])
    setShowCreateDialog(false)
  }

  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter((room) => room.id !== roomId))
  }

  const getRoomStats = (room: Room) => {
    const totalParticipants = room.participants.length + room.moderators.length + 1 // +1 for owner
    const activeUsers = Math.floor(totalParticipants * 0.7) // تقدير المستخدمين النشطين
    return { totalParticipants, activeUsers }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-arabic">إدارة الغرف</h1>
          <p className="text-muted-foreground font-arabic">إدارة وتنظيم غرف الدردشة</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="font-arabic">
          <Plus className="w-4 h-4 ml-2" />
          إنشاء غرفة جديدة
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث في الغرف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 font-arabic"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid gap-6">
        {filteredRooms.map((room) => {
          const stats = getRoomStats(room)
          return (
            <Card key={room.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Room Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-arabic">{room.name}</h3>
                        <p className="text-sm text-muted-foreground font-arabic">{room.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <RoomPlanBadge plan={room.plan} />
                      <Badge variant={room.isActive ? "default" : "secondary"} className="font-arabic">
                        {room.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="font-arabic">{stats.totalParticipants} مشارك</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        <span className="font-arabic">{stats.activeUsers} نشط</span>
                      </div>
                    </div>

                    {/* Owner and Moderators */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-arabic">المالك:</span>
                        <span className="text-sm font-medium font-arabic">{room.owner.name}</span>
                        {room.owner.country && (
                          <Badge variant="outline" className="text-xs font-arabic">
                            {room.owner.country}
                          </Badge>
                        )}
                      </div>

                      {room.moderators.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-arabic">المشرفون:</span>
                          {room.moderators.slice(0, 3).map((moderator) => (
                            <div key={moderator.user.id} className="flex items-center gap-1">
                              <RoleBadge role={moderator.role} size="sm" showIcon={false} />
                              <span className="text-sm font-arabic">{moderator.user.name}</span>
                            </div>
                          ))}
                          {room.moderators.length > 3 && (
                            <Badge variant="outline" className="text-xs font-arabic">
                              +{room.moderators.length - 3} آخرين
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Room Features */}
                    <div className="flex items-center gap-3 mt-4">
                      {room.settings.allowVoiceChat && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mic className="w-3 h-3" />
                          <span className="font-arabic">صوتي</span>
                        </div>
                      )}
                      {room.settings.allowVideoChat && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Video className="w-3 h-3" />
                          <span className="font-arabic">مرئي</span>
                        </div>
                      )}
                      {room.settings.allowGuests && (
                        <Badge variant="outline" className="text-xs font-arabic">
                          يسمح بالضيوف
                        </Badge>
                      )}
                      {room.settings.requireApproval && (
                        <Badge variant="outline" className="text-xs font-arabic">
                          يتطلب موافقة
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-auto w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRoom(room)
                        setShowParticipantsDialog(true)
                      }}
                      className="font-arabic bg-transparent"
                    >
                      <Users className="w-4 h-4 ml-2" />
                      إدارة المشاركين
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRoom(room)
                        setShowSettingsDialog(true)
                      }}
                      className="font-arabic bg-transparent"
                    >
                      <Settings className="w-4 h-4 ml-2" />
                      الإعدادات
                    </Button>
                    <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                      <Eye className="w-4 h-4 ml-2" />
                      عرض الغرفة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRoom(room.id)}
                      className="text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="w-4 h-4 ml-2" />
                      حذف
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium font-arabic mb-2">لا توجد غرف</h3>
            <p className="text-muted-foreground font-arabic mb-4">لم يتم العثور على غرف تطابق البحث</p>
            <Button onClick={() => setShowCreateDialog(true)} className="font-arabic">
              إنشاء غرفة جديدة
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <CreateRoomDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} onCreateRoom={handleCreateRoom} />

      {selectedRoom && (
        <>
          <RoomSettingsDialog
            open={showSettingsDialog}
            onOpenChange={setShowSettingsDialog}
            room={selectedRoom}
            onUpdateRoom={(updatedRoom) => {
              setRooms(rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)))
              setShowSettingsDialog(false)
            }}
          />

          <ParticipantsManager
            open={showParticipantsDialog}
            onOpenChange={setShowParticipantsDialog}
            room={selectedRoom}
            onUpdateRoom={(updatedRoom) => {
              setRooms(rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)))
            }}
          />
        </>
      )}
    </div>
  )
}
