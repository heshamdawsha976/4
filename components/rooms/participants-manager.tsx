"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleBadge } from "@/components/ui/role-badge"
import { 
  Users, 
  Search, 
  Crown, 
  Shield, 
  Star, 
  UserCheck,
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  Hand,
  Volume2,
  VolumeX,
  UserX,
  UserPlus,
  Settings,
  MoreVertical,
  Eye,
  EyeOff
} from "lucide-react"
import type { User, RoomParticipant } from "@/lib/types/user"

interface ParticipantsManagerProps {
  participants: RoomParticipant[]
  currentUserId: string
  roomOwnerId: string
  onKickUser?: (userId: string) => void
  onMuteUser?: (userId: string) => void
  onChangeRole?: (userId: string, newRole: string) => void
  onInviteUser?: () => void
  canManage?: boolean
  className?: string
}

export function ParticipantsManager({
  participants,
  currentUserId,
  roomOwnerId,
  onKickUser,
  onMuteUser,
  onChangeRole,
  onInviteUser,
  canManage = false,
  className = ""
}: ParticipantsManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [showOffline, setShowOffline] = useState(false)

  const currentUser = participants.find(p => p.userId === currentUserId)
  const isOwner = currentUserId === roomOwnerId
  const isAdmin = currentUser?.role === "master" || currentUser?.role === "super_admin" || currentUser?.role === "admin"

  // تصفية المشاركين
  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "online" && participant.user.isOnline) ||
                      (selectedTab === "speaking" && participant.isHandRaised) ||
                      (selectedTab === "admins" && ["master", "super_admin", "admin"].includes(participant.role))
    
    const showUser = showOffline || participant.user.isOnline
    
    return matchesSearch && matchesTab && showUser
  })

  // إحصائيات سريعة
  const stats = {
    total: participants.length,
    online: participants.filter(p => p.user.isOnline).length,
    speaking: participants.filter(p => p.isHandRaised).length,
    admins: participants.filter(p => ["master", "super_admin", "admin"].includes(p.role)).length
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "master": return <Crown className="w-4 h-4 text-yellow-500" />
      case "super_admin": return <Shield className="w-4 h-4 text-red-500" />
      case "admin": return <Star className="w-4 h-4 text-blue-500" />
      case "guest": return <UserCheck className="w-4 h-4 text-orange-500" />
      default: return null
    }
  }

  const ParticipantCard = ({ participant }: { participant: RoomParticipant }) => {
    const canManageUser = (isOwner || isAdmin) && participant.userId !== currentUserId
    
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
        {/* Avatar مع مؤشرات الحالة */}
        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={participant.user.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-arabic">
              {participant.user.firstName[0]}
            </AvatarFallback>
          </Avatar>
          
          {/* مؤشر الاتصال */}
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
            participant.user.isOnline ? "bg-green-500" : "bg-gray-400"
          }`}></div>
          
          {/* مؤشرات إضافية */}
          {participant.isHandRaised && (
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center border border-white">
              <Hand className="w-2 h-2 text-white" />
            </div>
          )}
        </div>

        {/* معلومات المستخدم */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-arabic font-medium text-sm">
              {participant.user.firstName} {participant.user.lastName}
            </span>
            {participant.userId === roomOwnerId && (
              <Badge className="bg-yellow-100 text-yellow-800 text-xs font-arabic">
                <Crown className="w-3 h-3 ml-1" />
                مالك الغرفة
              </Badge>
            )}
            <RoleBadge role={participant.role} size="sm" />
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-arabic">@{participant.user.username}</span>
            {participant.user.country && (
              <span className="font-arabic">• {participant.user.country}</span>
            )}
            <span className="font-arabic">
              • انضم {new Intl.RelativeTimeFormat("ar").format(
                Math.floor((participant.joinedAt.getTime() - Date.now()) / (1000 * 60 * 60)), 
                "hour"
              )}
            </span>
          </div>

          {/* مؤشرات الوسائط */}
          <div className="flex items-center gap-1 mt-1">
            {participant.isMuted && (
              <div className="flex items-center gap-1 bg-red-100 text-red-700 px-1 py-0.5 rounded text-xs">
                <MicOff className="w-3 h-3" />
                <span className="font-arabic">مكتوم</span>
              </div>
            )}
            {participant.isHandRaised && (
              <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-1 py-0.5 rounded text-xs">
                <Hand className="w-3 h-3" />
                <span className="font-arabic">يد مرفوعة</span>
              </div>
            )}
          </div>
        </div>

        {/* أزرار التحكم */}
        {canManageUser && (
          <div className="flex items-center gap-1">
            {!participant.isMuted ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMuteUser?.(participant.userId)}
                className="text-orange-600 hover:bg-orange-50"
                title="كتم الصوت"
              >
                <MicOff className="w-3 h-3" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMuteUser?.(participant.userId)}
                className="text-green-600 hover:bg-green-50"
                title="إلغاء كتم الصوت"
              >
                <Mic className="w-3 h-3" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onKickUser?.(participant.userId)}
              className="text-red-600 hover:bg-red-50"
              title="طرد من الغرفة"
            >
              <UserX className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-arabic">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-pink-600" />
            <span>إدارة المشاركين</span>
            <Badge variant="secondary" className="font-arabic">
              {stats.total} مشارك
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOffline(!showOffline)}
              className="font-arabic"
            >
              {showOffline ? <EyeOff className="w-4 h-4 ml-1" /> : <Eye className="w-4 h-4 ml-1" />}
              {showOffline ? "إخفاء غير المتصلين" : "عرض الكل"}
            </Button>
            
            {canManage && (
              <Button
                variant="outline"
                size="sm"
                onClick={onInviteUser}
                className="font-arabic border-green-200 text-green-700 hover:bg-green-50"
              >
                <UserPlus className="w-4 h-4 ml-1" />
                دعوة
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* شريط البحث */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث عن مشارك..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="font-arabic pr-10"
          />
        </div>

        {/* الإحصائيات السريعة */}
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-600 font-arabic">إجمالي</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{stats.online}</div>
            <div className="text-xs text-gray-600 font-arabic">متصل</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded-lg">
            <div className="text-lg font-bold text-yellow-600">{stats.speaking}</div>
            <div className="text-xs text-gray-600 font-arabic">يتحدث</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">{stats.admins}</div>
            <div className="text-xs text-gray-600 font-arabic">مدراء</div>
          </div>
        </div>

        {/* تبويبات التصفية */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="font-arabic text-xs">الكل</TabsTrigger>
            <TabsTrigger value="online" className="font-arabic text-xs">متصل</TabsTrigger>
            <TabsTrigger value="speaking" className="font-arabic text-xs">يتحدث</TabsTrigger>
            <TabsTrigger value="admins" className="font-arabic text-xs">مدراء</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* قائمة المشاركين */}
        <ScrollArea className="h-96">
          <div className="space-y-2">
            {filteredParticipants.length > 0 ? (
              filteredParticipants.map(participant => (
                <ParticipantCard key={participant.userId} participant={participant} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="font-arabic">لا توجد نتائج للبحث</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ParticipantsManager
