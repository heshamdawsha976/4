"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { RoleBadge } from "@/components/ui/role-badge"
import { DEFAULT_ROLES, type Role, type Permission } from "@/lib/types"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface RoleManagerProps {
  roomId: string
  onRoleUpdate?: (roles: Role[]) => void
}

export function RoleManager({ roomId, onRoleUpdate }: RoleManagerProps) {
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: "",
    nameAr: "",
    color: "#6366f1",
    priority: 30,
    permissions: [],
  })

  const availablePermissions: Permission[] = [
    { id: "all", name: "All Permissions", nameAr: "جميع الصلاحيات", description: "Full control over the room" },
    {
      id: "manage-users",
      name: "Manage Users",
      nameAr: "إدارة المستخدمين",
      description: "Add/remove users and assign roles",
    },
    { id: "manage-room", name: "Manage Room", nameAr: "إدارة الغرفة", description: "Change room settings" },
    {
      id: "moderate-chat",
      name: "Moderate Chat",
      nameAr: "إدارة الدردشة",
      description: "Delete messages and mute users",
    },
    {
      id: "manage-participants",
      name: "Manage Participants",
      nameAr: "إدارة المشاركين",
      description: "Invite and remove participants",
    },
    { id: "send-messages", name: "Send Messages", nameAr: "إرسال الرسائل", description: "Send messages in chat" },
    { id: "voice-chat", name: "Voice Chat", nameAr: "الدردشة الصوتية", description: "Participate in voice chat" },
    { id: "video-chat", name: "Video Chat", nameAr: "الدردشة المرئية", description: "Participate in video chat" },
    { id: "send-gifts", name: "Send Gifts", nameAr: "إرسال الهدايا", description: "Send virtual gifts" },
  ]

  const handleCreateRole = () => {
    if (newRole.name && newRole.nameAr) {
      const role: Role = {
        id: `custom-${Date.now()}`,
        name: newRole.name!,
        nameAr: newRole.nameAr!,
        color: newRole.color!,
        priority: newRole.priority!,
        permissions: newRole.permissions!,
      }

      const updatedRoles = [...roles, role]
      setRoles(updatedRoles)
      onRoleUpdate?.(updatedRoles)

      setNewRole({
        name: "",
        nameAr: "",
        color: "#6366f1",
        priority: 30,
        permissions: [],
      })
      setIsCreating(false)
    }
  }

  const handleDeleteRole = (roleId: string) => {
    const updatedRoles = roles.filter((role) => role.id !== roleId)
    setRoles(updatedRoles)
    onRoleUpdate?.(updatedRoles)
  }

  const togglePermission = (permissionId: string, roleData: Partial<Role>) => {
    const currentPermissions = roleData.permissions || []
    const hasPermission = currentPermissions.some((p) => p.id === permissionId)

    if (hasPermission) {
      return currentPermissions.filter((p) => p.id !== permissionId)
    } else {
      const permission = availablePermissions.find((p) => p.id === permissionId)
      return permission ? [...currentPermissions, permission] : currentPermissions
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-arabic">إدارة الأدوار والصلاحيات</h2>
        <Button onClick={() => setIsCreating(true)} className="font-arabic">
          <Plus className="w-4 h-4 ml-2" />
          إضافة دور جديد
        </Button>
      </div>

      {/* إنشاء دور جديد */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle className="font-arabic">إنشاء دور جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-arabic">اسم الدور (إنجليزي)</Label>
                <Input
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Role Name"
                />
              </div>
              <div>
                <Label className="font-arabic">اسم الدور (عربي)</Label>
                <Input
                  value={newRole.nameAr}
                  onChange={(e) => setNewRole({ ...newRole, nameAr: e.target.value })}
                  placeholder="اسم الدور"
                  className="font-arabic"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-arabic">لون الدور</Label>
                <Input
                  type="color"
                  value={newRole.color}
                  onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
                />
              </div>
              <div>
                <Label className="font-arabic">أولوية الدور</Label>
                <Input
                  type="number"
                  value={newRole.priority}
                  onChange={(e) => setNewRole({ ...newRole, priority: Number.parseInt(e.target.value) })}
                  min="1"
                  max="99"
                />
              </div>
            </div>

            <div>
              <Label className="font-arabic mb-3 block">الصلاحيات</Label>
              <div className="grid grid-cols-2 gap-3">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      checked={newRole.permissions?.some((p) => p.id === permission.id) || false}
                      onCheckedChange={() => {
                        const updatedPermissions = togglePermission(permission.id, newRole)
                        setNewRole({ ...newRole, permissions: updatedPermissions })
                      }}
                    />
                    <div>
                      <Label className="font-arabic text-sm">{permission.nameAr}</Label>
                      <p className="text-xs text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateRole} className="font-arabic">
                <Save className="w-4 h-4 ml-2" />
                حفظ الدور
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)} className="font-arabic">
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* قائمة الأدوار الحالية */}
      <div className="grid gap-4">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <RoleBadge role={role} size="lg" />
                  <div>
                    <p className="text-sm text-muted-foreground">الأولوية: {role.priority}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {!["master", "super-admin", "admin"].includes(role.id) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label className="font-arabic text-sm font-medium mb-2 block">الصلاحيات:</Label>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <Badge key={permission.id} variant="secondary" className="font-arabic text-xs">
                      {permission.nameAr}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
