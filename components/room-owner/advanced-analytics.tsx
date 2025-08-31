"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, MessageCircle, Clock, DollarSign, Activity, Download } from "lucide-react"

// بيانات تحليلية متقدمة
const analyticsData = {
  userGrowth: [
    { period: "يناير", newUsers: 45, activeUsers: 120, retention: 85 },
    { period: "فبراير", newUsers: 62, activeUsers: 156, retention: 88 },
    { period: "مارس", newUsers: 78, activeUsers: 189, retention: 82 },
    { period: "أبريل", newUsers: 91, activeUsers: 234, retention: 90 },
    { period: "مايو", newUsers: 103, activeUsers: 267, retention: 87 },
  ],
  engagementMetrics: {
    averageSessionTime: "42 دقيقة",
    messagesPerUser: 15.6,
    voiceCallsPerDay: 89,
    videoCallsPerDay: 34,
    giftsPerDay: 23,
    peakHours: "20:00 - 23:00",
  },
  revenueBreakdown: {
    subscriptions: 1890,
    gifts: 340,
    premiumFeatures: 220,
    total: 2450,
  },
}

export default function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("users")

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-arabic">التحليلات المتقدمة</h2>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 font-arabic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d" className="font-arabic">
                7 أيام
              </SelectItem>
              <SelectItem value="30d" className="font-arabic">
                30 يوم
              </SelectItem>
              <SelectItem value="90d" className="font-arabic">
                90 يوم
              </SelectItem>
              <SelectItem value="1y" className="font-arabic">
                سنة
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="font-arabic bg-transparent">
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-arabic text-muted-foreground">متوسط وقت الجلسة</p>
                <p className="text-2xl font-bold">{analyticsData.engagementMetrics.averageSessionTime}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500 font-arabic">+8.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-arabic text-muted-foreground">الرسائل لكل مستخدم</p>
                <p className="text-2xl font-bold">{analyticsData.engagementMetrics.messagesPerUser}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500 font-arabic">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-arabic text-muted-foreground">ساعات الذروة</p>
                <p className="text-lg font-bold">{analyticsData.engagementMetrics.peakHours}</p>
                <p className="text-sm text-muted-foreground font-arabic">أعلى نشاط</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-arabic text-muted-foreground">معدل الاحتفاظ</p>
                <p className="text-2xl font-bold">87%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500 font-arabic">-2.1%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic">نمو المستخدمين والتفاعل</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between gap-4 p-4">
            {analyticsData.userGrowth.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                    style={{ height: `${(data.activeUsers / 300) * 100}%` }}
                    title={`المستخدمون النشطون: ${data.activeUsers}`}
                  />
                  <div
                    className="w-full bg-green-500 rounded-t-lg transition-all hover:bg-green-400"
                    style={{ height: `${(data.newUsers / 120) * 100}%` }}
                    title={`مستخدمون جدد: ${data.newUsers}`}
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium">{data.activeUsers}</p>
                  <p className="text-xs text-green-500">+{data.newUsers}</p>
                  <p className="text-xs text-muted-foreground font-arabic">{data.period}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded" />
              <span className="text-sm font-arabic">المستخدمون النشطون</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span className="text-sm font-arabic">مستخدمون جدد</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic">تفصيل الإيرادات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-arabic">الاشتراكات</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">${analyticsData.revenueBreakdown.subscriptions}</p>
                  <p className="text-sm text-muted-foreground">77%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-purple-500" />
                  </div>
                  <span className="font-arabic">الهدايا الافتراضية</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">${analyticsData.revenueBreakdown.gifts}</p>
                  <p className="text-sm text-muted-foreground">14%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="font-arabic">الميزات المميزة</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">${analyticsData.revenueBreakdown.premiumFeatures}</p>
                  <p className="text-sm text-muted-foreground">9%</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">${analyticsData.revenueBreakdown.total}</p>
                <p className="text-muted-foreground font-arabic">إجمالي الإيرادات الشهرية</p>
                <Badge className="mt-2 bg-green-500 font-arabic">+15.2% من الشهر الماضي</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
