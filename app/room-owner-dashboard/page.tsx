"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import {
  Users,
  MessageCircle,
  TrendingUp,
  Eye,
  Settings,
  Crown,
  Shield,
  Activity,
  DollarSign,
  BarChart3,
  UserPlus,
  UserMinus,
  Mic,
  Video,
  Gift,
} from "lucide-react"

// بيانات تجريبية محسنة
const ownerStats = {
  totalRooms: 5,
  totalMembers: 1247,
  activeMembers: 892,
  monthlyRevenue: 2450,
  totalRevenue: 15670,
  averageSessionTime: "45 دقيقة",
  engagementRate: 78.5,
  newMembersToday: 23,
  messagesCount: 15420,
  voiceMinutes: 8940,
  videoMinutes: 3210,
  giftsReceived: 156,
}

const myRooms = [
  {
    id: "1",
    name: "غرفة الثقافة العربية",
    description: "مناقشات ثقافية وأدبية",
    plan: { id: "premium", name: "Premium", nameAr: "مميز", color: "#8A2BE2", maxUsers: 1000 },
    members: 234,
    activeNow: 45,
    messagesCount: 5420,
    revenue: 990,
    status: "active",
    createdAt: new Date("2024-01-15"),
    lastActivity: new Date(),
    moderators: [
      { id: "1", name: "فاطمة أحمد", role: "super-admin" },
      { id: "2", name: "محمد علي", role: "admin" },
    ],
  },
  {
    id: "2",
    name: "غرفة الشعر والأدب",
    description: "منصة لمحبي الشعر والأدب العربي",
    plan: { id: "gold", name: "Gold", nameAr: "ذهبي", color: "#FFD700", maxUsers: 500 },
    members: 156,
    activeNow: 28,
    messagesCount: 3210,
    revenue: 490,
    status: "active",
    createdAt: new Date("2024-02-01"),
    lastActivity: new Date(),
    moderators: [{ id: "3", name: "نور الدين", role: "admin" }],
  },
]

const recentActivities = [
  {
    id: "1",
    type: "new_member",
    message: "انضم عضو جديد إلى غرفة الثقافة العربية",
    user: "أحمد محمود",
    room: "غرفة الثقافة العربية",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "2",
    type: "role_assigned",
    message: "تم تعيين دور مشرف لعضو",
    user: "سارة أحمد",
    room: "غرفة الشعر والأدب",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "3",
    type: "gift_received",
    message: "تم استلام هدية افتراضية",
    user: "محمد علي",
    room: "غرفة الثقافة العربية",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "new_member":
      return <UserPlus className="w-4 h-4 text-green-500" />
    case "member_left":
      return <UserMinus className="w-4 h-4 text-red-500" />
    case "role_assigned":
      return <Shield className="w-4 h-4 text-blue-500" />
    case "gift_received":
      return <Gift className="w-4 h-4 text-purple-500" />
    default:
      return <Activity className="w-4 h-4 text-gray-500" />
  }
}

export default function RoomOwnerDashboard() {
  const [selectedRoom, setSelectedRoom] = useState<string>("all")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-arabic">لوحة تحكم مالك الغرف</h1>
          <p className="text-muted-foreground font-arabic">إدارة شاملة لغرفك ومتابعة الأداء</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-arabic bg-transparent">
            <BarChart3 className="w-4 h-4 ml-2" />
            تقرير مفصل
          </Button>
          <Button className="font-arabic">
            <UserPlus className="w-4 h-4 ml-2" />
            إنشاء غرفة جديدة
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="font-arabic">
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="rooms" className="font-arabic">
            إدارة الغرف
          </TabsTrigger>
          <TabsTrigger value="analytics" className="font-arabic">
            التحليلات
          </TabsTrigger>
          <TabsTrigger value="activity" className="font-arabic">
            النشاط
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-arabic text-muted-foreground">إجمالي الغرف</p>
                    <p className="text-2xl font-bold">{ownerStats.totalRooms}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-arabic">+2 هذا الشهر</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-arabic text-muted-foreground">إجمالي الأعضاء</p>
                    <p className="text-2xl font-bold">{ownerStats.totalMembers.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-arabic">+{ownerStats.newMembersToday} اليوم</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-arabic text-muted-foreground">الإيرادات الشهرية</p>
                    <p className="text-2xl font-bold">${ownerStats.monthlyRevenue}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-arabic">+15.2%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-arabic text-muted-foreground">معدل التفاعل</p>
                    <p className="text-2xl font-bold">{ownerStats.engagementRate}%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-arabic">+3.1%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium font-arabic">الرسائل اليوم</p>
                    <p className="text-2xl font-bold">{ownerStats.messagesCount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium font-arabic">دقائق الصوت</p>
                    <p className="text-2xl font-bold">{ownerStats.voiceMinutes.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium font-arabic">دقائق الفيديو</p>
                    <p className="text-2xl font-bold">{ownerStats.videoMinutes.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">النشاط الأخير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="font-medium font-arabic">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground font-arabic">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground font-arabic">{activity.room}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp.toLocaleTimeString("ar-SA", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rooms Management Tab */}
        <TabsContent value="rooms" className="space-y-6">
          <div className="grid gap-6">
            {myRooms.map((room) => (
              <Card key={room.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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
                        <Badge variant="default" className="font-arabic">
                          نشط
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span className="font-arabic">{room.members} عضو</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span className="font-arabic">{room.activeNow} نشط الآن</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-arabic">${room.revenue} هذا الشهر</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-arabic">المشرفون:</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {room.moderators.map((mod) => (
                            <div key={mod.id} className="flex items-center gap-1">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs font-arabic">{mod.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-arabic">{mod.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:w-auto w-full">
                      <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                        <Eye className="w-4 h-4 ml-2" />
                        دخول الغرفة
                      </Button>
                      <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                        <Users className="w-4 h-4 ml-2" />
                        إدارة الأعضاء
                      </Button>
                      <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                        <Settings className="w-4 h-4 ml-2" />
                        الإعدادات
                      </Button>
                      <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                        <BarChart3 className="w-4 h-4 ml-2" />
                        التحليلات
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-arabic">نمو الأعضاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2 p-4">
                  {[120, 150, 180, 210, 234].map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                        style={{ height: `${(value / 250) * 100}%` }}
                      />
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium">{value}</p>
                        <p className="text-xs text-muted-foreground font-arabic">
                          {["يناير", "فبراير", "مارس", "أبريل", "مايو"][index]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-arabic">توزيع الأنشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">الرسائل النصية</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-blue-500 rounded-full" />
                      </div>
                      <span className="text-sm">80%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">المكالمات الصوتية</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-green-500 rounded-full" />
                      </div>
                      <span className="text-sm">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">المكالمات المرئية</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-2/5 h-full bg-purple-500 rounded-full" />
                      </div>
                      <span className="text-sm">40%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">الهدايا</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/5 h-full bg-orange-500 rounded-full" />
                      </div>
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">مراقبة النشاط المباشر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities
                  .concat([
                    {
                      id: "4",
                      type: "new_member",
                      message: "انضم 3 أعضاء جدد إلى غرفة الشعر والأدب",
                      user: "متعددون",
                      room: "غرفة الشعر والأدب",
                      timestamp: new Date(Date.now() - 45 * 60 * 1000),
                    },
                    {
                      id: "5",
                      type: "role_assigned",
                      message: "تم ترقية عضو إلى مشرف",
                      user: "خالد أحمد",
                      room: "غرفة الثقافة العربية",
                      timestamp: new Date(Date.now() - 60 * 60 * 1000),
                    },
                  ])
                  .map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium font-arabic">{activity.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground font-arabic">{activity.user}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground font-arabic">{activity.room}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {activity.timestamp.toLocaleString("ar-SA")}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="font-arabic">
                        عرض التفاصيل
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
