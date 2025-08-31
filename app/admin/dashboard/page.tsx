import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Shield,
  Activity,
  Crown,
  Home,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  UserCheck,
  Ban,
} from "lucide-react"
import Link from "next/link"

// بيانات وهمية للعرض التوضيحي
const dashboardStats = {
  totalUsers: 12547,
  activeUsers: 8932,
  totalRooms: 1247,
  activeRooms: 892,
  totalRevenue: 45780,
  monthlyRevenue: 12340,
  totalMessages: 2847392,
  todayMessages: 23847,
}

const recentActivities = [
  {
    id: 1,
    type: "user_joined",
    message: "انضم مستخدم جديد: أحمد محمد",
    timestamp: "5 دقائق",
    severity: "info",
  },
  {
    id: 2,
    type: "room_created",
    message: "تم إنشاء غرفة جديدة: غرفة الشعر العربي",
    timestamp: "12 دقيقة",
    severity: "success",
  },
  {
    id: 3,
    type: "violation_reported",
    message: "تم الإبلاغ عن مخالفة في غرفة الثقافة",
    timestamp: "25 دقيقة",
    severity: "warning",
  },
  {
    id: 4,
    type: "subscription_upgraded",
    message: "ترقية اشتراك إلى الخطة الذهبية",
    timestamp: "1 ساعة",
    severity: "success",
  },
  {
    id: 5,
    type: "user_banned",
    message: "تم حظر مستخدم لمخالفة القوانين",
    timestamp: "2 ساعة",
    severity: "error",
  },
]

const topRooms = [
  { name: "غرفة الثقافة العربية", members: 1247, plan: "premium", activity: 95 },
  { name: "منتدى الشعر والأدب", members: 892, plan: "gold", activity: 87 },
  { name: "نقاشات تقنية", members: 654, plan: "silver", activity: 78 },
  { name: "غرفة الطبخ العربي", members: 543, plan: "gold", activity: 72 },
  { name: "مناقشات رياضية", members: 432, plan: "silver", activity: 65 },
]

const systemHealth = {
  serverStatus: "healthy",
  databaseStatus: "healthy",
  apiStatus: "healthy",
  cdnStatus: "warning",
  uptime: 99.8,
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-arabic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              لوحة تحكم مالك التطبيق
            </h1>
            <p className="text-muted-foreground font-arabic mt-1">إدارة شاملة لتطبيق لقاء ومراقبة الأداء</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-arabic">
              <Crown className="w-4 h-4 ml-1" />
              مالك التطبيق
            </Badge>
            <Button className="font-arabic">
              <Settings className="w-4 h-4 ml-2" />
              الإعدادات
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 font-arabic">إجمالي المستخدمين</p>
                  <p className="text-3xl font-bold text-blue-700">{dashboardStats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-blue-500 font-arabic">{dashboardStats.activeUsers.toLocaleString()} نشط</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 font-arabic">إجمالي الغرف</p>
                  <p className="text-3xl font-bold text-green-700">{dashboardStats.totalRooms.toLocaleString()}</p>
                  <p className="text-xs text-green-500 font-arabic">
                    {dashboardStats.activeRooms.toLocaleString()} نشطة
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 font-arabic">الإيرادات الشهرية</p>
                  <p className="text-3xl font-bold text-purple-700">
                    ${dashboardStats.monthlyRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-purple-500 font-arabic">+12% من الشهر الماضي</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 font-arabic">الرسائل اليوم</p>
                  <p className="text-3xl font-bold text-orange-700">{dashboardStats.todayMessages.toLocaleString()}</p>
                  <p className="text-xs text-orange-500 font-arabic">
                    {dashboardStats.totalMessages.toLocaleString()} إجمالي
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 font-arabic">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="users">إدارة المستخدمين</TabsTrigger>
            <TabsTrigger value="rooms">إدارة الغرف</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="system">حالة النظام</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-arabic">
                    <Activity className="w-5 h-5 text-primary" />
                    الأنشطة الأخيرة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.severity === "success"
                            ? "bg-green-500"
                            : activity.severity === "warning"
                              ? "bg-yellow-500"
                              : activity.severity === "error"
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-arabic">{activity.message}</p>
                        <p className="text-xs text-muted-foreground font-arabic">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full font-arabic bg-transparent">
                    عرض جميع الأنشطة
                  </Button>
                </CardContent>
              </Card>

              {/* Top Rooms */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-arabic">
                    <Star className="w-5 h-5 text-primary" />
                    أفضل الغرف
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topRooms.map((room, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium font-arabic text-sm">{room.name}</p>
                          <p className="text-xs text-muted-foreground font-arabic">{room.members} عضو</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={room.plan === "premium" ? "default" : "secondary"}
                          className="text-xs font-arabic"
                        >
                          {room.plan === "premium" ? "مميز" : room.plan === "gold" ? "ذهبي" : "فضي"}
                        </Badge>
                        <div className="text-right">
                          <p className="text-xs font-bold">{room.activity}%</p>
                          <Progress value={room.activity} className="w-16 h-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-arabic text-green-600">
                    <UserCheck className="w-5 h-5" />
                    المستخدمون النشطون
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">8,932</div>
                  <p className="text-sm text-muted-foreground font-arabic">متصل الآن</p>
                  <div className="mt-4">
                    <Button className="w-full font-arabic bg-transparent" variant="outline">
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-arabic text-yellow-600">
                    <Clock className="w-5 h-5" />
                    في انتظار الموافقة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">47</div>
                  <p className="text-sm text-muted-foreground font-arabic">طلب انضمام</p>
                  <div className="mt-4">
                    <Button className="w-full font-arabic bg-transparent" variant="outline">
                      مراجعة الطلبات
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-arabic text-red-600">
                    <Ban className="w-5 h-5" />
                    المستخدمون المحظورون
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-2">23</div>
                  <p className="text-sm text-muted-foreground font-arabic">محظور مؤقتاً أو دائماً</p>
                  <div className="mt-4">
                    <Button className="w-full font-arabic bg-transparent" variant="outline">
                      إدارة المحظورين
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="font-arabic h-20 flex-col gap-2">
                    <Users className="w-6 h-6" />
                    إضافة مستخدم
                  </Button>
                  <Button variant="outline" className="font-arabic h-20 flex-col gap-2 bg-transparent">
                    <Shield className="w-6 h-6" />
                    تعيين أدوار
                  </Button>
                  <Button variant="outline" className="font-arabic h-20 flex-col gap-2 bg-transparent">
                    <Ban className="w-6 h-6" />
                    حظر مستخدم
                  </Button>
                  <Button variant="outline" className="font-arabic h-20 flex-col gap-2 bg-transparent">
                    <BarChart3 className="w-6 h-6" />
                    تقرير المستخدمين
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">1,247</div>
                  <p className="text-sm text-blue-600 font-arabic">إجمالي الغرف</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">892</div>
                  <p className="text-sm text-green-600 font-arabic">غرف نشطة</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-700">15</div>
                  <p className="text-sm text-yellow-600 font-arabic">في انتظار المراجعة</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-700">8</div>
                  <p className="text-sm text-red-600 font-arabic">تحتاج مراجعة</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">إدارة الغرف</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Link href="/admin/rooms/create">
                    <Button className="font-arabic h-16 w-full flex-col gap-2">
                      <Home className="w-6 h-6" />
                      إنشاء غرفة جديدة
                    </Button>
                  </Link>
                  <Link href="/admin/rooms">
                    <Button variant="outline" className="font-arabic h-16 w-full flex-col gap-2 bg-transparent">
                      <Settings className="w-6 h-6" />
                      إدارة الغرف
                    </Button>
                  </Link>
                  <Button variant="outline" className="font-arabic h-16 flex-col gap-2 bg-transparent">
                    <BarChart3 className="w-6 h-6" />
                    تقارير الغرف
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-arabic">نمو المستخدمين</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground font-arabic">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                      <p>رسم بياني لنمو المستخدمين</p>
                      <p className="text-sm">سيتم إضافته قريباً</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-arabic">الإيرادات الشهرية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground font-arabic">
                    <div className="text-center">
                      <DollarSign className="w-12 h-12 mx-auto mb-4" />
                      <p>رسم بياني للإيرادات</p>
                      <p className="text-sm">سيتم إضافته قريباً</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold font-arabic mb-1">الخادم</h3>
                  <p className="text-sm text-green-600 font-arabic">يعمل بشكل طبيعي</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold font-arabic mb-1">قاعدة البيانات</h3>
                  <p className="text-sm text-green-600 font-arabic">يعمل بشكل طبيعي</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold font-arabic mb-1">API</h3>
                  <p className="text-sm text-green-600 font-arabic">يعمل بشكل طبيعي</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold font-arabic mb-1">CDN</h3>
                  <p className="text-sm text-yellow-600 font-arabic">بطء طفيف</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">معلومات النظام</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-arabic">وقت التشغيل</span>
                  <div className="flex items-center gap-2">
                    <Progress value={systemHealth.uptime} className="w-32" />
                    <span className="text-sm font-bold">{systemHealth.uptime}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-arabic">استخدام الذاكرة</span>
                  <div className="flex items-center gap-2">
                    <Progress value={67} className="w-32" />
                    <span className="text-sm font-bold">67%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-arabic">استخدام المعالج</span>
                  <div className="flex items-center gap-2">
                    <Progress value={34} className="w-32" />
                    <span className="text-sm font-bold">34%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-arabic">مساحة التخزين</span>
                  <div className="flex items-center gap-2">
                    <Progress value={78} className="w-32" />
                    <span className="text-sm font-bold">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
