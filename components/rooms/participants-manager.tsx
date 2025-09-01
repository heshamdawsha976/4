"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RoleBadge } from "@/components/ui/role-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ROLE_DEFINITIONS, type Room, type UserRole } from "@/lib/types"
import { Search, UserPlus, Crown, Trash2 } from "lucide-react"

interface ParticipantsManagerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  room: Room
  onUpdateRoom: (room: Room) => void
}

export function ParticipantsManager({ open, onOpenChange, room, onUpdateRoom }: ParticipantsManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("")

  // استخدام المشاركين من الغرفة مباشرة
  const allParticipants = room.participants || []

  const filteredParticipants = allParticipants.filter(
    (participant) => {
      const matchesSearch = participant.user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           participant.user.username?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = selectedRole === "" || participant.role === selectedRole
      return matchesSearch && matchesRole
    }
  )

  const handleRoleChange = (participantId: string, newRoleId: string) => {
    const updatedParticipants = room.participants.map((part) =>
      part.user.id === participantId ? { ...part, role: newRoleId as UserRole } : part,
    )

    const updatedRoom: Room = {
      ...room,
      participants: updatedParticipants,
    }

    onUpdateRoom(updatedRoom)
  }

  const handleRemoveParticipant = (participantId: string) => {
    if (participantId === room.ownerId) return // لا يمكن حذف المالك

    const updatedRoom: Room = {
      ...room,
      participants: room.participants.filter((part) => part.user.id !== participantId),
    }

    onUpdateRoom(updatedRoom)
  }

  const getParticipantActions = (participant: RoomParticipant) => {
    const isOwner = participant.user.id === room.ownerId
    const canEdit = !isOwner
    const canRemove = !isOwner

    return { canEdit, canRemove }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-arabic text-2xl">إدارة المشاركين</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث عن مشارك..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 font-arabic"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48 font-arabic">
                <SelectValue placeholder="تصفية حسب الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="" className="font-arabic">
                  جميع الأدوار
                </SelectItem>
                {Object.entries(ROLE_DEFINITIONS).map(([roleKey, role]) => (
                  <SelectItem key={roleKey} value={roleKey} className="font-arabic">
                    {role.nameAr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Add Participant */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <UserPlus className="w-5 h-5 text-primary" />
              <Label className="font-arabic font-medium">إضافة مشارك جديد</Label>
            </div>
            <div className="flex gap-3">
              <Input placeholder="اسم المستخدم أو البريد الإلكتروني" className="font-arabic" />
              <Select>
                <SelectTrigger className="w-48 font-arabic">
                  <SelectValue placeholder="اختر الدور" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_DEFINITIONS)
                    .filter(([roleKey]) => roleKey !== "master") // استثناء دور Master
                    .map(([roleKey, role]) => (
                      <SelectItem key={roleKey} value={roleKey} className="font-arabic">
                        {role.nameAr}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button className="font-arabic">إضافة</Button>
            </div>
          </div>

          {/* Participants List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="font-arabic text-lg font-medium">المشاركون ({filteredParticipants.length})</Label>
            </div>

            <div className="space-y-3">
              {filteredParticipants.map((participant) => {
                const actions = getParticipantActions(participant)
                return (
                  <div
                    key={participant.user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="font-arabic">{participant.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium font-arabic">{participant.user.displayName}</span>
                          {participant.user.id === room.ownerId && <Crown className="w-4 h-4 text-yellow-500" />}
                          {participant.user.country && (
                            <Badge variant="outline" className="text-xs font-arabic">
                              {participant.user.country}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <RoleBadge role={participant.role} size="sm" />
                          <span className="text-xs text-muted-foreground font-arabic">
                            انضم في {participant.joinedAt.toLocaleDateString("ar")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {actions.canEdit && (
                        <Select
                          value={participant.role}
                          onValueChange={(value) => handleRoleChange(participant.user.id, value)}
                        >
                          <SelectTrigger className="w-32 h-8 font-arabic">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(ROLE_DEFINITIONS)
                              .filter(([roleKey]) => roleKey !== "master")
                              .map(([roleKey, role]) => (
                              <SelectItem key={roleKey} value={roleKey} className="font-arabic">
                                {role.nameAr}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {actions.canRemove && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveParticipant(participant.user.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredParticipants.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground font-arabic">لا توجد مشاركين يطابقون البحث</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="font-arabic">
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
