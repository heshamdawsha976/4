"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleBadge } from "./role-badge"
import { SYSTEM_ROLES, type UserRole, type Permission } from "@/lib/types/roles"
import {
  ROLE_TEMPLATES,
  type RoleTemplate,
  type TemporaryRoleAssignment,
  type RoleChangeLog,
} from "@/lib/types/advanced-roles"
import { Clock, History, Settings, Users, TrendingUp, AlertTriangle, CheckCircle, Timer } from "lucide-react"

interface AdvancedRoleManagerProps {
  roomId: string
  currentUserRole: UserRole
  onRoleChange: (userId: string, newRole: UserRole, isTemporary?: boolean, duration?: number) => void
  onPermissionOverride: (userId: string, permission: Permission, granted: boolean) => void
}

export function AdvancedRoleManager({
  roomId,
  currentUserRole,
  onRoleChange,
  onPermissionOverride,
}: AdvancedRoleManagerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<RoleTemplate | null>(null)
  const [temporaryAssignments, setTemporaryAssignments] = useState<TemporaryRoleAssignment[]>([])
  const [roleChangeLogs, setRoleChangeLogs] = useState<RoleChangeLog[]>([])
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false)

  // بيانات تجريبية للتعيينات المؤقتة
  useEffect(() => {
    const mockTemporaryAssignments: TemporaryRoleAssignment[] = [
      {
        id: "1",
        userId: "user1",
        roomId: roomId,
        role: "moderator",
        assignedBy: "admin1",
        assignedAt: new Date(Date.now() - 3600000),
        expiresAt: new Date(Date.now() + 7200000),
        reason: "إدارة فعالية خاصة",
        isActive: true,
        autoRevoke: true,
      },
      {
        id: "2",
        userId: "user2",
        roomId: roomId,
        role: "admin",
        assignedBy: "owner1",
        assignedAt: new Date(Date.now() - 1800000),
        expiresAt: new Date(Date.now() + 86400000),
        reason: "تغطية غياب الأدمن الرئيسي",
        isActive: true,
        autoRevoke: true,
      },
    ]

    const mockRoleChangeLogs: RoleChangeLog[] = [
      {
        id: "1",
        userId: "user1",
        roomId: roomId,
        previousRole: "member",
        newRole: "moderator",
        changedBy: "admin1",
        changedAt: new Date(Date.now() - 3600000),
        reason: "أداء ممتاز في إدارة المحتوى",
        duration: 120,
        isTemporary: true,
      },
      {
        id: "2",
        userId: "user3",
        roomId: roomId,
        previousRole: "admin",
        newRole: "member",
        changedBy: "owner1",
        changedAt: new Date(Date.now() - 7200000),
        reason: "مخالفة قوانين الغرفة",
        isTemporary: false,
      },
    ]

    setTemporaryAssignments(mockTemporaryAssignments)
    setRoleChangeLogs(mockRoleChangeLogs)
  }, [roomId])

  const handleTemporaryRoleAssignment = (userId: string, role: UserRole, duration: number, reason: string) => {
    onRoleChange(userId, role, true, duration)

    // إضافة التعيين المؤقت للقائمة
    const newAssignment: TemporaryRoleAssignment = {
      id: Date.now().toString(),
      userId,
      roomId,
      role,
      assignedBy: "current-user",
      assignedAt: new Date(),
      expiresAt: new Date(Date.now() + duration * 60000),
      reason,
      isActive: true,
      autoRevoke: true,
    }

    setTemporaryAssignments((prev) => [...prev, newAssignment])
  }

  const formatTimeRemaining = (expiresAt: Date): string => {
    const now = new Date()
    const diff = expiresAt.getTime() - now.getTime()

    if (diff <= 0) return "منتهي الصلاحية"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours} ساعة و ${minutes} دقيقة`
    }
    return `${minutes} دقيقة`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-arabic">إدارة الأدوار المتقدمة</h2>
        <Button onClick={() => setIsCreatingTemplate(true)} className="font-arabic">
          <Settings className="w-4 h-4 ml-2" />
          إنشاء قالب دور
        </Button>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates" className="font-arabic">
            قوالب الأدوار
          </TabsTrigger>
          <TabsTrigger value="temporary" className="font-arabic">
            التعيينات المؤقتة
          </TabsTrigger>
          <TabsTrigger value="logs" className="font-arabic">
            سجل التغييرات
          </TabsTrigger>
          <TabsTrigger value="analytics" className="font-arabic">
            التحليلات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLE_TEMPLATES.map((template) => (
              <Card key={template.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-arabic">{template.nameArabic}</CardTitle>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: template.bgColor }}
                    >
                      {template.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground font-arabic">{template.descriptionArabic}</p>

                  <div className="flex flex-wrap gap-1">
                    {template.permissions.slice(0, 3).map((permission) => (
                      <Badge key={permission} variant="secondary" className="text-xs">
                        {permission.replace(/_/g, " ")}
                      </Badge>
                    ))}
                    {template.permissions.length > 3 && (
                      <Badge variant="outline" className="text-xs font-arabic">
                        +{template.permissions.length - 3} المزيد
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-arabic">استخدم {template.usageCount} مرة</span>
                    <Badge variant={template.isPublic ? "default" : "secondary"} className="text-xs font-arabic">
                      {template.isPublic ? "عام" : "خاص"}
                    </Badge>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full font-arabic bg-transparent"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    استخدام القالب
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="temporary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-arabic">
                <Timer className="w-5 h-5" />
                التعيينات المؤقتة النشطة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {temporaryAssignments
                .filter((a) => a.isActive)
                .map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium font-arabic">المستخدم {assignment.userId}</span>
                          <RoleBadge role={assignment.role} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground font-arabic">{assignment.reason}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-arabic">{formatTimeRemaining(assignment.expiresAt)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                          تمديد
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive bg-transparent"
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

              {temporaryAssignments.filter((a) => a.isActive).length === 0 && (
                <div className="text-center py-8">
                  <Timer className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-arabic">لا توجد تعيينات مؤقتة نشطة</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-arabic">
                <History className="w-5 h-5" />
                سجل تغييرات الأدوار
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {roleChangeLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {log.previousRole === "member" && log.newRole !== "member" ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium font-arabic">المستخدم {log.userId}</span>
                        <div className="flex items-center gap-1">
                          <RoleBadge role={log.previousRole} size="sm" />
                          <span className="text-muted-foreground">←</span>
                          <RoleBadge role={log.newRole} size="sm" />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground font-arabic">{log.reason}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground font-arabic mb-1">
                      {log.changedAt.toLocaleDateString("ar")}
                    </div>
                    {log.isTemporary && (
                      <Badge variant="outline" className="text-xs font-arabic">
                        مؤقت - {log.duration} دقيقة
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-arabic">إحصائيات الأدوار</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(SYSTEM_ROLES).map(([roleKey, role]) => (
                    <div key={roleKey} className="flex items-center justify-between">
                      <RoleBadge role={roleKey as UserRole} size="sm" />
                      <span className="text-sm font-arabic">{Math.floor(Math.random() * 20)} عضو</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-arabic">النشاط الأخير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-arabic">5 ترقيات هذا الأسبوع</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-arabic">2 تخفيض رتبة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-arabic">3 تعيينات مؤقتة</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-arabic">الأداء العام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-arabic">رضا الأعضاء</span>
                    <span className="text-sm font-bold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-arabic">كفاءة الإدارة</span>
                    <span className="text-sm font-bold text-blue-600">88%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-arabic">معدل الترقيات</span>
                    <span className="text-sm font-bold text-purple-600">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
