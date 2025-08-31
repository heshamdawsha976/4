"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { RoleBadge } from "@/components/roles/role-badge"
import { ROOM_PLAN_LIMITS, canAssignRole, getRoleLimit } from "@/lib/types/room-roles"
import type { RoomPlan, RoomMember } from "@/lib/types/room-roles"
import type { UserRole } from "@/lib/types/roles"
import { Users, Crown, Shield, Star, Wrench, User, UserCheck } from "lucide-react"

interface RoomRoleManagerProps {
  roomId: string
  roomPlan: RoomPlan
  members: RoomMember[]
  currentUserRole: UserRole
  onRoleChange: (memberId: string, newRole: UserRole) => void
  onRemoveMember: (memberId: string) => void
}

const roleIcons = {
  room_owner: Crown,
  super_admin: Shield,
  admin: Star,
  moderator: Wrench,
  member: User,
  guest: UserCheck,
}

export function RoomRoleManager({
  roomId,
  roomPlan,
  members,
  currentUserRole,
  onRoleChange,
  onRemoveMember,
}: RoomRoleManagerProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all")

  const planLimits = ROOM_PLAN_LIMITS[roomPlan]

  // حساب عدد الأعضاء لكل دور
  const roleCounts = members.reduce(
    (acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1
      return acc
    },
    {} as Record<UserRole, number>,
  )

  // تصفية الأعضاء حسب الدور المحدد
  const filteredMembers = selectedRole === "all" ? members : members.filter((member) => member.role === selectedRole)

  // التحقق من إمكانية تعيين دور معين
  const canAssignRoleToMember = (targetRole: UserRole) => {
    return canAssignRole(currentUserRole, targetRole, roomPlan)
  }

  // الحصول على الأدوار المتاحة للتعيين
  const getAvailableRoles = (): UserRole[] => {
    const roles: UserRole[] = ["super_admin", "admin", "moderator", "member", "guest"]
    return roles.filter((role) => {
      // التحقق من الصلاحية
      if (!canAssignRoleToMember(role)) return false

      // التحقق من الحد الأقصى
      const currentCount = roleCounts[role] || 0
      const limit = getRoleLimit(roomPlan, role)

      return currentCount < limit
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-arabic">إدارة أدوار الغرفة</h3>
        <Badge variant="outline" className="font-arabic">
          خطة {roomPlan === "silver" ? "فضية" : roomPlan === "gold" ? "ذهبية" : "مميزة"}
        </Badge>
      </div>

      {/* إحصائيات الأدوار */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(planLimits.roles).map(([role, limit]) => {
          if (role === "app_owner" || limit === 0) return null

          const count = roleCounts[role as UserRole] || 0
          const percentage = limit > 0 ? (count / limit) * 100 : 0
          const Icon = roleIcons[role as UserRole] || User

          return (
            <Card key={role} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-arabic font-medium">
                    {role === "room_owner"
                      ? "مالك"
                      : role === "super_admin"
                        ? "سوبر أدمن"
                        : role === "admin"
                          ? "أدمن"
                          : role === "moderator"
                            ? "مشرف"
                            : role === "member"
                              ? "عضو"
                              : "ضيف"}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-arabic">{count}</span>
                    <span className="text-muted-foreground font-arabic">من {limit}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* تصفية الأعضاء */}
      <div className="flex items-center gap-4">
        <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole | "all")}>
          <SelectTrigger className="w-48 font-arabic">
            <SelectValue placeholder="تصفية حسب الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-arabic">
              جميع الأدوار
            </SelectItem>
            <SelectItem value="room_owner" className="font-arabic">
              مالك الغرفة
            </SelectItem>
            <SelectItem value="super_admin" className="font-arabic">
              سوبر أدمن
            </SelectItem>
            <SelectItem value="admin" className="font-arabic">
              أدمن
            </SelectItem>
            <SelectItem value="moderator" className="font-arabic">
              مشرف
            </SelectItem>
            <SelectItem value="member" className="font-arabic">
              عضو
            </SelectItem>
            <SelectItem value="guest" className="font-arabic">
              ضيف
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="text-sm text-muted-foreground font-arabic">
          {filteredMembers.length} من {members.length} عضو
        </div>
      </div>

      {/* قائمة الأعضاء */}
      <div className="space-y-3">
        {filteredMembers.map((member) => {
          const canEditThisMember = canAssignRole(currentUserRole, member.role, roomPlan)
          const availableRoles = getAvailableRoles()

          return (
            <Card key={member.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-arabic font-bold text-primary">{member.displayName.charAt(0)}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium font-arabic">{member.displayName}</span>
                        {member.isGuest && (
                          <Badge variant="secondary" className="text-xs font-arabic">
                            ضيف
                          </Badge>
                        )}
                        {member.country && (
                          <Badge variant="outline" className="text-xs">
                            {member.country}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <RoleBadge role={member.role} size="sm" />
                        <span className="text-xs text-muted-foreground font-arabic">
                          انضم {member.joinedAt.toLocaleDateString("ar")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {canEditThisMember && member.role !== "room_owner" && (
                      <Select
                        value={member.role}
                        onValueChange={(newRole) => onRoleChange(member.id, newRole as UserRole)}
                      >
                        <SelectTrigger className="w-32 h-8 font-arabic">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles.map((role) => (
                            <SelectItem key={role} value={role} className="font-arabic">
                              {role === "super_admin"
                                ? "سوبر أدمن"
                                : role === "admin"
                                  ? "أدمن"
                                  : role === "moderator"
                                    ? "مشرف"
                                    : role === "member"
                                      ? "عضو"
                                      : "ضيف"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {canEditThisMember && member.role !== "room_owner" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoveMember(member.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        إزالة
                      </Button>
                    )}
                  </div>
                </div>

                {/* معلومات إضافية للأعضاء المميزين */}
                {(member.roomSpecificData.isMuted || member.roomSpecificData.warnings > 0) && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-arabic">
                      {member.roomSpecificData.isMuted && (
                        <Badge variant="destructive" className="text-xs">
                          مكتوم
                        </Badge>
                      )}
                      {member.roomSpecificData.warnings > 0 && <span>تحذيرات: {member.roomSpecificData.warnings}</span>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground font-arabic">لا توجد أعضاء بهذا الدور</p>
        </div>
      )}
    </div>
  )
}
