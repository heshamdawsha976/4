"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import { ROOM_PLANS } from "@/lib/types"
import { Search, TrendingUp, Users, DollarSign, Calendar, Download, Filter } from "lucide-react"

// بيانات تجريبية للاشتراكات
const mockSubscriptions = [
  {
    id: "1",
    customerName: "أحمد محمد",
    email: "ahmed@example.com",
    plan: ROOM_PLANS[0], // Premium
    status: "active",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-12-15"),
    amount: 99,
    currency: "USD",
    billingCycle: "yearly",
    roomsCount: 3,
  },
  {
    id: "2",
    customerName: "فاطمة أحمد",
    email: "fatima@example.com",
    plan: ROOM_PLANS[1], // Gold
    status: "active",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-01"),
    amount: 49,
    currency: "USD",
    billingCycle: "monthly",
    roomsCount: 2,
  },
  {
    id: "3",
    customerName: "محمد علي",
    email: "mohammed@example.com",
    plan: ROOM_PLANS[2], // Silver
    status: "expired",
    startDate: new Date("2023-12-01"),
    endDate: new Date("2024-01-01"),
    amount: 19,
    currency: "USD",
    billingCycle: "monthly",
    roomsCount: 1,
  },
  {
    id: "4",
    customerName: "ليلى حسن",
    email: "layla@example.com",
    plan: ROOM_PLANS[1], // Gold
    status: "trial",
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-02-03"),
    amount: 0,
    currency: "USD",
    billingCycle: "trial",
    roomsCount: 1,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500 font-arabic">نشط</Badge>
    case "trial":
      return (
        <Badge variant="secondary" className="font-arabic">
          تجريبي
        </Badge>
      )
    case "expired":
      return (
        <Badge variant="destructive" className="font-arabic">
          منتهي
        </Badge>
      )
    case "cancelled":
      return (
        <Badge variant="outline" className="font-arabic">
          ملغي
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="font-arabic">
          {status}
        </Badge>
      )
  }
}

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || sub.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // إحصائيات
  const stats = {
    totalRevenue: mockSubscriptions.reduce((sum, sub) => sum + sub.amount, 0),
    activeSubscriptions: mockSubscriptions.filter((sub) => sub.status === "active").length,
    totalCustomers: mockSubscriptions.length,
    trialUsers: mockSubscriptions.filter((sub) => sub.status === "trial").length,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-arabic">إدارة الاشتراكات</h1>
          <p className="text-muted-foreground font-arabic">متابعة وإدارة جميع الاشتراكات</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-arabic bg-transparent">
            <Download className="w-4 h-4 ml-2" />
            تصدير البيانات
          </Button>
          <Button variant="outline" className="font-arabic bg-transparent">
            <Filter className="w-4 h-4 ml-2" />
            تصفية متقدمة
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-arabic text-muted-foreground">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold">${stats.totalRevenue}</p>
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
                <p className="text-sm font-arabic text-muted-foreground">الاشتراكات النشطة</p>
                <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-arabic text-muted-foreground">إجمالي العملاء</p>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
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
                <p className="text-sm font-arabic text-muted-foreground">المستخدمون التجريبيون</p>
                <p className="text-2xl font-bold">{stats.trialUsers}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث بالاسم أو البريد الإلكتروني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 font-arabic"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className="font-arabic bg-transparent"
              >
                الكل
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("active")}
                className="font-arabic bg-transparent"
              >
                نشط
              </Button>
              <Button
                variant={statusFilter === "trial" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("trial")}
                className="font-arabic bg-transparent"
              >
                تجريبي
              </Button>
              <Button
                variant={statusFilter === "expired" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("expired")}
                className="font-arabic bg-transparent"
              >
                منتهي
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic">قائمة الاشتراكات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-4 font-arabic font-medium">العميل</th>
                  <th className="text-right p-4 font-arabic font-medium">الخطة</th>
                  <th className="text-center p-4 font-arabic font-medium">الحالة</th>
                  <th className="text-center p-4 font-arabic font-medium">تاريخ البداية</th>
                  <th className="text-center p-4 font-arabic font-medium">تاريخ الانتهاء</th>
                  <th className="text-center p-4 font-arabic font-medium">المبلغ</th>
                  <th className="text-center p-4 font-arabic font-medium">الغرف</th>
                  <th className="text-center p-4 font-arabic font-medium">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium font-arabic">{subscription.customerName}</p>
                        <p className="text-sm text-muted-foreground">{subscription.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <RoomPlanBadge plan={subscription.plan} size="sm" />
                    </td>
                    <td className="text-center p-4">{getStatusBadge(subscription.status)}</td>
                    <td className="text-center p-4 font-arabic">{subscription.startDate.toLocaleDateString("ar")}</td>
                    <td className="text-center p-4 font-arabic">{subscription.endDate.toLocaleDateString("ar")}</td>
                    <td className="text-center p-4">
                      <div>
                        <span className="font-medium">
                          {subscription.amount === 0 ? "مجاني" : `$${subscription.amount}`}
                        </span>
                        {subscription.billingCycle !== "trial" && (
                          <p className="text-xs text-muted-foreground font-arabic">
                            {subscription.billingCycle === "yearly" ? "سنوي" : "شهري"}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <Badge variant="outline" className="font-arabic">
                        {subscription.roomsCount} غرفة
                      </Badge>
                    </td>
                    <td className="text-center p-4">
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                          عرض
                        </Button>
                        <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                          تعديل
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubscriptions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground font-arabic">لا توجد اشتراكات تطابق البحث</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
