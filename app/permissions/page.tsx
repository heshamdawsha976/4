import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Crown,
  Shield,
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  Ban,
  UserCheck,
  ArrowLeft,
  CheckCircle,
  XCircle,
  MoreVertical,
} from "lucide-react"
import Link from "next/link"

export default function PermissionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/room-management">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    إدارة الصلاحيات المتقدمة
                  </h1>
                  <p className="text-sm text-muted-foreground font-arabic">تحكم دقيق في أدوار وصلاحيات المستخدمين</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="font-arabic gradient-primary shadow-md hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة دور مخصص
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-arabic">إنشاء دور مخصص</DialogTitle>
                    <DialogDescription className="font-arabic">
                      قم بإنشاء دور جديد مع صلاحيات محددة حسب احتياجاتك
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-arabic">اسم الدور</Label>
                        <Input placeholder="مثال: مشرف المحتوى" className="font-arabic text-right" dir="rtl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-arabic">لون الدور</Label>
                        <Select>
                          <SelectTrigger className="font-arabic">
                            <SelectValue placeholder="اختر اللون" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="red" className="font-arabic">
                              أحمر
                            </SelectItem>
                            <SelectItem value="purple" className="font-arabic">
                              بنفسجي
                            </SelectItem>
                            <SelectItem value="blue" className="font-arabic">
                              أزرق
                            </SelectItem>
                            <SelectItem value="green" className="font-arabic">
                              أخضر
                            </SelectItem>
                            <SelectItem value="orange" className="font-arabic">
                              برتقالي
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="font-arabic text-base font-bold">الصلاحيات</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: "كتم المستخدمين", key: "mute_users" },
                          { name: "طرد المستخدمين", key: "kick_users" },
                          { name: "حذف الرسائل", key: "delete_messages" },
                          { name: "إدارة المتحدثين", key: "manage_speakers" },
                          { name: "تعديل موضوع الغرفة", key: "edit_topic" },
                          { name: "دعوة مستخدمين", key: "invite_users" },
                          { name: "عرض الإحصائيات", key: "view_analytics" },
                          { name: "إدارة الأدوار", key: "manage_roles" },
                        ].map((permission) => (
                          <div key={permission.key} className="flex items-center space-x-2">
                            <Switch id={permission.key} />
                            <Label htmlFor={permission.key} className="font-arabic text-sm">
                              {permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button className="flex-1 font-arabic gradient-primary">إنشاء الدور</Button>
                      <Button variant="outline" className="font-arabic bg-transparent">
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="roles"
              className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              الأدوار
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              الصلاحيات
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              المستخدمون
            </TabsTrigger>
            <TabsTrigger
              value="audit"
              className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              سجل الأنشطة
            </TabsTrigger>
          </TabsList>

          {/* Roles Management */}
          <TabsContent value="roles" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                إدارة الأدوار والمستويات
              </h2>
              <p className="text-muted-foreground font-arabic">تخصيص الأدوار مع ألوان مميزة وصلاحيات محددة</p>
            </div>

            {/* Default Roles */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: "ماستر",
                  nameEn: "master",
                  color: "red",
                  icon: Crown,
                  description: "السيطرة الكاملة على الغرفة",
                  userCount: 1,
                  permissions: [
                    "إدارة جميع المستخدمين",
                    "تعديل إعدادات الغرفة",
                    "حذف الغرفة",
                    "إدارة الإيرادات",
                    "تعيين وإزالة المشرفين",
                    "الوصول للإحصائيات المتقدمة",
                    "إنشاء أدوار مخصصة",
                  ],
                  isDefault: true,
                },
                {
                  name: "سوبر أدمن",
                  nameEn: "super-admin",
                  color: "purple",
                  icon: Shield,
                  description: "صلاحيات إدارية متقدمة",
                  userCount: 2,
                  permissions: [
                    "كتم وطرد المستخدمين",
                    "إدارة قائمة المتحدثين",
                    "تعديل موضوع الغرفة",
                    "إدارة الرسائل",
                    "تعيين أدمن عادي",
                    "الوصول للإحصائيات الأساسية",
                  ],
                  isDefault: true,
                },
                {
                  name: "أدمن",
                  nameEn: "admin",
                  color: "blue",
                  icon: Star,
                  description: "صلاحيات إشراف أساسية",
                  userCount: 3,
                  permissions: [
                    "كتم المستخدمين مؤقتاً",
                    "إدارة طلبات الكلام",
                    "حذف الرسائل المخالفة",
                    "إرسال تحذيرات",
                    "رفع التقارير",
                  ],
                  isDefault: true,
                },
              ].map((role, index) => (
                <Card
                  key={index}
                  className="gradient-card border-primary/10 hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform ${
                        role.color === "red" ? "bg-red-500" : role.color === "purple" ? "bg-purple-500" : "bg-blue-500"
                      }`}
                    >
                      <role.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CardTitle className="text-xl font-arabic">{role.name}</CardTitle>
                      {role.isDefault && (
                        <Badge variant="outline" className="text-xs font-arabic border-primary/30">
                          افتراضي
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="font-arabic">{role.description}</CardDescription>
                    <div className="flex items-center justify-center gap-4 mt-3">
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{role.userCount}</p>
                        <p className="text-xs text-muted-foreground font-arabic">مستخدم</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-secondary">{role.permissions.length}</p>
                        <p className="text-xs text-muted-foreground font-arabic">صلاحية</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <h4 className="font-bold font-arabic text-sm">الصلاحيات الرئيسية:</h4>
                      <ul className="space-y-1">
                        {role.permissions.slice(0, 3).map((permission, permIndex) => (
                          <li key={permIndex} className="flex items-center gap-2 text-xs font-arabic">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            {permission}
                          </li>
                        ))}
                        {role.permissions.length > 3 && (
                          <li className="text-xs text-muted-foreground font-arabic">
                            +{role.permissions.length - 3} صلاحيات أخرى
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 font-arabic gradient-primary shadow-md">
                        <Edit className="w-3 h-3 ml-1" />
                        تعديل
                      </Button>
                      <Button size="sm" variant="outline" className="bg-background/80 border-primary/30">
                        <Eye className="w-3 h-3" />
                      </Button>
                      {!role.isDefault && (
                        <Button size="sm" variant="outline" className="bg-background/80 border-red-300 text-red-600">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Roles */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold font-arabic">الأدوار المخصصة</h3>
                <Badge className="font-arabic bg-blue-500 hover:bg-blue-600">2 أدوار مخصصة</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    name: "مشرف المحتوى",
                    color: "green",
                    icon: Eye,
                    userCount: 5,
                    permissions: ["مراجعة المحتوى", "حذف الرسائل المخالفة", "إرسال تحذيرات"],
                  },
                  {
                    name: "منسق الفعاليات",
                    color: "orange",
                    icon: Calendar,
                    userCount: 2,
                    permissions: ["إنشاء الفعاليات", "إدارة الجدولة", "دعوة المتحدثين"],
                  },
                ].map((role, index) => (
                  <Card key={index} className="gradient-card border-primary/10 hover:shadow-lg transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                            role.color === "green" ? "bg-green-500" : "bg-orange-500"
                          }`}
                        >
                          <role.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold font-arabic mb-1">{role.name}</h4>
                          <p className="text-sm text-muted-foreground font-arabic mb-2">
                            {role.userCount} مستخدم • {role.permissions.length} صلاحيات
                          </p>
                          <div className="space-y-1">
                            {role.permissions.map((permission, permIndex) => (
                              <div key={permIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span className="text-xs font-arabic">{permission}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 font-arabic">
                          تعديل
                        </Button>
                        <Button size="sm" variant="outline" className="bg-background/80">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Permissions Matrix */}
          <TabsContent value="permissions" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                مصفوفة الصلاحيات
              </h2>
              <p className="text-muted-foreground font-arabic">عرض تفصيلي لجميع الصلاحيات حسب الأدوار</p>
            </div>

            <Card className="gradient-card border-primary/10">
              <CardHeader>
                <CardTitle className="font-arabic">جدول الصلاحيات</CardTitle>
                <CardDescription className="font-arabic">مقارنة الصلاحيات بين الأدوار المختلفة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-3 font-arabic">الصلاحية</th>
                        <th className="text-center p-3 font-arabic">
                          <div className="flex items-center justify-center gap-1">
                            <Crown className="w-4 h-4 text-red-500" />
                            ماستر
                          </div>
                        </th>
                        <th className="text-center p-3 font-arabic">
                          <div className="flex items-center justify-center gap-1">
                            <Shield className="w-4 h-4 text-purple-500" />
                            سوبر أدمن
                          </div>
                        </th>
                        <th className="text-center p-3 font-arabic">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-blue-500" />
                            أدمن
                          </div>
                        </th>
                        <th className="text-center p-3 font-arabic">مشارك</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "إدارة الغرفة", master: true, superAdmin: false, admin: false, participant: false },
                        { name: "كتم المستخدمين", master: true, superAdmin: true, admin: true, participant: false },
                        { name: "طرد المستخدمين", master: true, superAdmin: true, admin: false, participant: false },
                        { name: "حذف الرسائل", master: true, superAdmin: true, admin: true, participant: false },
                        { name: "إدارة المتحدثين", master: true, superAdmin: true, admin: false, participant: false },
                        {
                          name: "تعديل موضوع الغرفة",
                          master: true,
                          superAdmin: true,
                          admin: false,
                          participant: false,
                        },
                        { name: "دعوة مستخدمين", master: true, superAdmin: false, admin: false, participant: false },
                        { name: "عرض الإحصائيات", master: true, superAdmin: true, admin: false, participant: false },
                        { name: "إرسال رسائل", master: true, superAdmin: true, admin: true, participant: true },
                        { name: "رفع اليد للكلام", master: true, superAdmin: true, admin: true, participant: true },
                      ].map((permission, index) => (
                        <tr key={index} className="border-b hover:bg-muted/30">
                          <td className="p-3 font-arabic text-sm">{permission.name}</td>
                          <td className="p-3 text-center">
                            {permission.master ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                          <td className="p-3 text-center">
                            {permission.superAdmin ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                          <td className="p-3 text-center">
                            {permission.admin ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                          <td className="p-3 text-center">
                            {permission.participant ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-arabic">إدارة المستخدمين</h2>
              <div className="flex gap-2">
                <Input placeholder="البحث عن مستخدم..." className="w-64 font-arabic text-right" dir="rtl" />
                <Select>
                  <SelectTrigger className="w-48 font-arabic">
                    <SelectValue placeholder="فلترة حسب الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="font-arabic">
                      جميع الأدوار
                    </SelectItem>
                    <SelectItem value="master" className="font-arabic">
                      ماستر
                    </SelectItem>
                    <SelectItem value="super-admin" className="font-arabic">
                      سوبر أدمن
                    </SelectItem>
                    <SelectItem value="admin" className="font-arabic">
                      أدمن
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "د. أحمد الثقافي",
                  email: "ahmed@example.com",
                  role: "master",
                  roleArabic: "ماستر",
                  country: "مصر",
                  joinDate: "2024-01-15",
                  status: "نشط",
                },
                {
                  name: "فاطمة محمد",
                  email: "fatima@example.com",
                  role: "super-admin",
                  roleArabic: "سوبر أدمن",
                  country: "السعودية",
                  joinDate: "2024-02-20",
                  status: "نشط",
                },
                {
                  name: "محمد علي",
                  email: "mohammed@example.com",
                  role: "admin",
                  roleArabic: "أدمن",
                  country: "الأردن",
                  joinDate: "2024-03-10",
                  status: "نشط",
                },
                {
                  name: "ليلى حسن",
                  email: "layla@example.com",
                  role: "admin",
                  roleArabic: "أدمن",
                  country: "لبنان",
                  joinDate: "2024-03-15",
                  status: "معلق",
                },
                {
                  name: "عمر خالد",
                  email: "omar@example.com",
                  role: "admin",
                  roleArabic: "أدمن",
                  country: "المغرب",
                  joinDate: "2024-04-01",
                  status: "نشط",
                },
              ].map((user, index) => (
                <Card key={index} className="gradient-card border-primary/10 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                            <AvatarImage src={`/user-${index + 1}.png?height=48&width=48&query=user ${index + 1}`} />
                            <AvatarFallback className="font-arabic gradient-primary text-primary-foreground">
                              {user.name.split(" ")[0].charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {user.role === "master" && (
                            <Crown className="absolute -top-1 -right-1 w-4 h-4 text-red-500" />
                          )}
                          {user.role === "super-admin" && (
                            <Shield className="absolute -top-1 -right-1 w-4 h-4 text-purple-500" />
                          )}
                          {user.role === "admin" && <Star className="absolute -top-1 -right-1 w-4 h-4 text-blue-500" />}
                        </div>
                        <div>
                          <h3 className="font-bold font-arabic">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              className={`text-xs font-arabic ${
                                user.role === "master"
                                  ? "bg-red-500 hover:bg-red-600"
                                  : user.role === "super-admin"
                                    ? "bg-purple-500 hover:bg-purple-600"
                                    : "bg-blue-500 hover:bg-blue-600"
                              }`}
                            >
                              {user.roleArabic}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-arabic">{user.country}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-arabic">انضم في</p>
                          <p className="text-xs text-muted-foreground">{user.joinDate}</p>
                          <Badge
                            variant={user.status === "نشط" ? "default" : "secondary"}
                            className="text-xs font-arabic mt-1"
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Select defaultValue={user.role}>
                            <SelectTrigger className="w-32 font-arabic">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="master" className="font-arabic">
                                ماستر
                              </SelectItem>
                              <SelectItem value="super-admin" className="font-arabic">
                                سوبر أدمن
                              </SelectItem>
                              <SelectItem value="admin" className="font-arabic">
                                أدمن
                              </SelectItem>
                              <SelectItem value="participant" className="font-arabic">
                                مشارك
                              </SelectItem>
                              <SelectItem value="remove" className="font-arabic text-red-600">
                                إزالة
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" variant="outline" className="bg-background/80">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Audit Log */}
          <TabsContent value="audit" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                سجل الأنشطة والتدقيق
              </h2>
              <p className="text-muted-foreground font-arabic">تتبع جميع التغييرات والأنشطة في النظام</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  action: "تعيين دور",
                  user: "د. أحمد الثقافي",
                  target: "فاطمة محمد",
                  details: "تم تعيين دور سوبر أدمن",
                  time: "منذ 5 دقائق",
                  type: "role_assignment",
                },
                {
                  action: "كتم مستخدم",
                  user: "فاطمة محمد",
                  target: "مستخدم مجهول",
                  details: "كتم لمدة 30 دقيقة - سبب: مخالفة القوانين",
                  time: "منذ 15 دقيقة",
                  type: "moderation",
                },
                {
                  action: "إنشاء دور مخصص",
                  user: "د. أحمد الثقافي",
                  target: "مشرف المحتوى",
                  details: "تم إنشاء دور جديد مع 5 صلاحيات",
                  time: "منذ ساعة",
                  type: "role_creation",
                },
                {
                  action: "تعديل صلاحيات",
                  user: "د. أحمد الثقافي",
                  target: "دور الأدمن",
                  details: "تم إضافة صلاحية حذف الرسائل",
                  time: "منذ ساعتين",
                  type: "permission_change",
                },
              ].map((log, index) => (
                <Card key={index} className="gradient-card border-primary/10 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                          log.type === "role_assignment"
                            ? "bg-blue-500"
                            : log.type === "moderation"
                              ? "bg-red-500"
                              : log.type === "role_creation"
                                ? "bg-green-500"
                                : "bg-purple-500"
                        }`}
                      >
                        {log.type === "role_assignment" && <UserCheck className="w-5 h-5 text-white" />}
                        {log.type === "moderation" && <Ban className="w-5 h-5 text-white" />}
                        {log.type === "role_creation" && <Plus className="w-5 h-5 text-white" />}
                        {log.type === "permission_change" && <Edit className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold font-arabic">{log.action}</h4>
                          <Badge variant="outline" className="text-xs font-arabic">
                            {log.time}
                          </Badge>
                        </div>
                        <p className="text-sm font-arabic mb-1">
                          <span className="font-medium">{log.user}</span>
                          {log.target && (
                            <>
                              {" → "}
                              <span className="font-medium">{log.target}</span>
                            </>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground font-arabic">{log.details}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="hover:bg-primary/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
