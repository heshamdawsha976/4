"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { type Permission, type UserRole, SYSTEM_ROLES } from "@/lib/types/roles"
import { RoleBadge } from "./role-badge"
import { Shield, Users, MessageSquare, Settings, BarChart3 } from "lucide-react"

interface PermissionsManagerProps {
  role: UserRole
  roomId?: string
  onPermissionChange?: (permission: Permission, enabled: boolean) => void
  readOnly?: boolean
}

const permissionCategories = {
  app_management: {
    name: "إدارة التطبيق",
    icon: Settings,
    permissions: [
      "manage_all_rooms",
      "manage_users",
      "manage_subscriptions",
      "view_analytics",
      "manage_app_settings",
      "create_room_plans",
      "ban_users_globally",
    ] as Permission[],
  },
  room_management: {
    name: "إدارة الغرفة",
    icon: Shield,
    permissions: [
      "manage_room_settings",
      "assign_room_roles",
      "customize_room_theme",
      "manage_room_members",
      "delete_room",
      "transfer_room_ownership",
    ] as Permission[],
  },
  moderation: {
    name: "الإشراف والإدارة",
    icon: Users,
    permissions: [
      "kick_members",
      "ban_members",
      "mute_members",
      "delete_messages",
      "manage_room_events",
      "moderate_content",
    ] as Permission[],
  },
  communication: {
    name: "التواصل والمشاركة",
    icon: MessageSquare,
    permissions: [
      "send_messages",
      "send_voice_messages",
      "join_voice_chat",
      "join_video_chat",
      "share_screen",
      "upload_files",
      "create_polls",
      "react_to_messages",
    ] as Permission[],
  },
}

const permissionLabels: Record<Permission, string> = {
  // صلاحيات مالك التطبيق
  manage_all_rooms: "إدارة جميع الغرف",
  manage_users: "إدارة المستخدمين",
  manage_subscriptions: "إدارة الاشتراكات",
  view_analytics: "عرض التحليلات",
  manage_app_settings: "إدارة إعدادات التطبيق",
  create_room_plans: "إنشاء خطط الغرف",
  ban_users_globally: "حظر المستخدمين عالمياً",

  // صلاحيات مالك الغرفة
  manage_room_settings: "إدارة إعدادات الغرفة",
  assign_room_roles: "تعيين أدوار الغرفة",
  customize_room_theme: "تخصيص مظهر الغرفة",
  manage_room_members: "إدارة أعضاء الغرفة",
  delete_room: "حذف الغرفة",
  transfer_room_ownership: "نقل ملكية الغرفة",

  // صلاحيات إدارية
  kick_members: "طرد الأعضاء",
  ban_members: "حظر الأعضاء",
  mute_members: "كتم الأعضاء",
  delete_messages: "حذف الرسائل",
  manage_room_events: "إدارة فعاليات الغرفة",
  moderate_content: "إدارة المحتوى",

  // صلاحيات أساسية
  send_messages: "إرسال الرسائل",
  send_voice_messages: "إرسال الرسائل الصوتية",
  join_voice_chat: "الانضمام للدردشة الصوتية",
  join_video_chat: "الانضمام للدردشة المرئية",
  share_screen: "مشاركة الشاشة",
  upload_files: "رفع الملفات",
  create_polls: "إنشاء استطلاعات",
  react_to_messages: "التفاعل مع الرسائل",
}

export function PermissionsManager({ role, roomId, onPermissionChange, readOnly = false }: PermissionsManagerProps) {
  const [permissions, setPermissions] = useState<Permission[]>(SYSTEM_ROLES[role].permissions)
  const roleDefinition = SYSTEM_ROLES[role]

  const handlePermissionToggle = (permission: Permission, enabled: boolean) => {
    if (readOnly) return

    const newPermissions = enabled ? [...permissions, permission] : permissions.filter((p) => p !== permission)

    setPermissions(newPermissions)
    onPermissionChange?.(permission, enabled)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold font-arabic">صلاحيات الدور</h3>
          <RoleBadge role={role} />
        </div>
        {!readOnly && (
          <Button variant="outline" size="sm" className="font-arabic bg-transparent">
            حفظ التغييرات
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        {Object.entries(permissionCategories).map(([categoryKey, category]) => {
          const Icon = category.icon
          const categoryPermissions = category.permissions.filter(
            (permission) => roleDefinition.permissions.includes(permission) || permissions.includes(permission),
          )

          if (categoryPermissions.length === 0) return null

          return (
            <Card key={categoryKey} className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-arabic">
                  <Icon className="w-5 h-5 text-primary" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryPermissions.map((permission) => {
                  const hasThisPermission = permissions.includes(permission)
                  const isSystemPermission = roleDefinition.permissions.includes(permission)

                  return (
                    <div key={permission} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="font-arabic text-sm">{permissionLabels[permission]}</span>
                        {isSystemPermission && (
                          <Badge variant="secondary" className="text-xs font-arabic">
                            افتراضي
                          </Badge>
                        )}
                      </div>
                      <Switch
                        checked={hasThisPermission}
                        onCheckedChange={(enabled) => handlePermissionToggle(permission, enabled)}
                        disabled={readOnly || isSystemPermission}
                      />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-bold font-arabic text-sm mb-1">معلومات الدور</h4>
              <p className="text-sm text-muted-foreground font-arabic mb-2">{roleDefinition.descriptionArabic}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-arabic">
                <span>مستوى الصلاحية: {roleDefinition.hierarchy}</span>
                <Separator orientation="vertical" className="h-3" />
                <span>عدد الصلاحيات: {permissions.length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
