"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  Download,
  Search,
  RefreshCw,
  XCircle,
  Clock,
  BarChart3,
} from "lucide-react"

// بيانات تجريبية للتقارير المالية
const financialStats = {
  totalRevenue: 45670,
  monthlyRevenue: 12450,
  activeSubscriptions: 234,
  churnRate: 3.2,
  averageRevenuePerUser: 67.5,
  pendingPayments: 8,
  failedPayments: 3,
  refunds: 2,
}

const revenueData = [
  { month: "يناير", revenue: 8500, subscriptions: 180 },
  { month: "فبراير", revenue: 9200, subscriptions: 195 },
  { month: "مارس", revenue: 10100, subscriptions: 210 },
  { month: "أبريل", revenue: 11300, subscriptions: 225 },
  { month: "مايو", revenue: 12450, subscriptions: 234 },
]

const transactions = [
  {
    id: "TXN-001",
    customer: "أحمد محمد",
    email: "ahmed@example.com",
    amount: 99,
    plan: "Premium",
    status: "completed",
    date: new Date("2024-01-15"),
    paymentMethod: "Credit Card",
  },
  {
    id: "TXN-002",
    customer: "فاطمة أحمد",
    email: "fatima@example.com",
    amount: 49,
    plan: "Gold",
    status: "pending",
    date: new Date("2024-01-14"),
    paymentMethod: "PayPal",
  },
  {
    id: "TXN-003",
    customer: "محمد علي",
    email: "mohammed@example.com",
    amount: 19,
    plan: "Silver",
    status: "failed",
    date: new Date("2024-01-13"),
    paymentMethod: "Credit Card",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500 font-arabic">مكتمل</Badge>
    case "pending":
      return (
        <Badge variant="secondary" className="font-arabic">
          معلق
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="destructive" className="font-arabic">
          فشل
        </Badge>
      )
    case "refunded":
      return (
        <Badge variant="outline" className="font-arabic">
          مسترد
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

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("30")

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || txn.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-arabic">إدارة الفوترة والمدفوعات</h1>
          <p className="text-muted-foreground font-arabic">تتبع الإيرادات والمدفوعات والتقارير المالية</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="font-arabic bg-transparent">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
          <Button variant="outline" className="font-arabic bg-transparent">
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث البيانات
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="font-arabic">
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="transactions" className="font-arabic">
            المعاملات
          </TabsTrigger>
          <TabsTrigger value="analytics" className="font-arabic">
            التحليلات
          </TabsTrigger>
          <TabsTrigger value="settings" className="font-arabic">
            الإعدادات
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
                    <p className="text-sm font-arabic text-muted-foreground">إجمالي الإيرادات</p>
                    <p className="text-2xl font-bold">${financialStats.totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-arabic">+12.5%</span>
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
                    <p className="text-sm font-arabic text-muted-foreground">الإيرادات الشهرية</p>
                    <p className="text-2xl font-bold">${financialStats.monthlyRevenue.toLocaleString()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-arabic">+8.2%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-arabic text-muted-foreground">الاشتراكات النشطة</p>
                    <p className="text-2xl font-bold">{financialStats.activeSubscriptions}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-arabic">+5.1%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-arabic text-muted-foreground">معدل الإلغاء</p>
                    <p className="text-2xl font-bold">{financialStats.churnRate}%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500 font-arabic">-0.8%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">نمو الإيرادات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end justify-between gap-4 p-4">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                      style={{ height: `${(data.revenue / 15000) * 100}%` }}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium">${data.revenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground font-arabic">{data.month}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium font-arabic">المدفوعات المعلقة</p>
                    <p className="text-2xl font-bold">{financialStats.pendingPayments}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 font-arabic bg-transparent">
                  مراجعة المعلقة
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium font-arabic">المدفوعات الفاشلة</p>
                    <p className="text-2xl font-bold">{financialStats.failedPayments}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 font-arabic bg-transparent">
                  معالجة الفاشلة
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium font-arabic">المبالغ المستردة</p>
                    <p className="text-2xl font-bold">{financialStats.refunds}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 font-arabic bg-transparent">
                  إدارة الاسترداد
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="البحث بالاسم، البريد، أو رقم المعاملة..."
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
                    variant={statusFilter === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("completed")}
                    className="font-arabic bg-transparent"
                  >
                    مكتمل
                  </Button>
                  <Button
                    variant={statusFilter === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("pending")}
                    className="font-arabic bg-transparent"
                  >
                    معلق
                  </Button>
                  <Button
                    variant={statusFilter === "failed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("failed")}
                    className="font-arabic bg-transparent"
                  >
                    فشل
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">المعاملات المالية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-4 font-arabic font-medium">رقم المعاملة</th>
                      <th className="text-right p-4 font-arabic font-medium">العميل</th>
                      <th className="text-center p-4 font-arabic font-medium">الخطة</th>
                      <th className="text-center p-4 font-arabic font-medium">المبلغ</th>
                      <th className="text-center p-4 font-arabic font-medium">الحالة</th>
                      <th className="text-center p-4 font-arabic font-medium">طريقة الدفع</th>
                      <th className="text-center p-4 font-arabic font-medium">التاريخ</th>
                      <th className="text-center p-4 font-arabic font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="text-sm font-medium">{transaction.id}</div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium font-arabic">{transaction.customer}</div>
                            <div className="text-sm text-muted-foreground">{transaction.email}</div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <Badge variant="outline" className="font-arabic">
                            {transaction.plan}
                          </Badge>
                        </td>
                        <td className="p-4 text-center font-medium">${transaction.amount}</td>
                        <td className="p-4 text-center">{getStatusBadge(transaction.status)}</td>
                        <td className="p-4 text-center font-arabic">{transaction.paymentMethod}</td>
                        <td className="p-4 text-center">{transaction.date.toLocaleDateString("ar-SA")}</td>
                        <td className="p-4 text-center">
                          <Button variant="ghost" size="sm" className="font-arabic">
                            تفاصيل
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-arabic">توزيع الخطط</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">Premium</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-primary rounded-full" />
                      </div>
                      <span className="text-sm">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">Gold</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-yellow-500 rounded-full" />
                      </div>
                      <span className="text-sm">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">Silver</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/12 h-full bg-gray-500 rounded-full" />
                      </div>
                      <span className="text-sm">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-arabic">متوسط الإيرادات لكل مستخدم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">${financialStats.averageRevenuePerUser}</div>
                <p className="text-sm text-muted-foreground font-arabic">زيادة 15% عن الشهر الماضي</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-arabic">Premium</span>
                    <span>$99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-arabic">Gold</span>
                    <span>$49</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-arabic">Silver</span>
                    <span>$19</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">إعدادات الدفع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 font-arabic">بوابات الدفع المفعلة</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">
                        PP
                      </div>
                      <span className="font-arabic">PayPal</span>
                    </div>
                    <Badge className="bg-green-500 font-arabic">مفعل</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-sm font-bold">
                        ST
                      </div>
                      <span className="font-arabic">Stripe</span>
                    </div>
                    <Badge className="bg-green-500 font-arabic">مفعل</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 font-arabic">إعدادات الفوترة</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">الفوترة التلقائية</span>
                    <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                      مفعل
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">تذكيرات الدفع</span>
                    <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                      مفعل
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-arabic">فترة السماح</span>
                    <span className="text-sm text-muted-foreground font-arabic">7 أيام</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
