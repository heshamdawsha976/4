"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Copy, Calendar } from "lucide-react"

// بيانات تجريبية للكوبونات
const coupons = [
  {
    id: "WELCOME20",
    name: "ترحيب بالعضو الجديد",
    description: "خصم 20% للأعضاء الجدد",
    type: "percentage",
    value: 20,
    usageLimit: 100,
    usedCount: 45,
    expiryDate: new Date("2024-12-31"),
    status: "active",
    plans: ["all"],
  },
  {
    id: "PREMIUM50",
    name: "خصم البريميوم",
    description: "خصم 50 ريال على الخطة المميزة",
    type: "fixed",
    value: 50,
    usageLimit: 50,
    usedCount: 12,
    expiryDate: new Date("2024-06-30"),
    status: "active",
    plans: ["premium"],
  },
]

export default function CouponManager() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    name: "",
    description: "",
    type: "percentage",
    value: 0,
    usageLimit: 100,
    expiryDate: "",
    plans: ["all"],
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 font-arabic">نشط</Badge>
      case "expired":
        return (
          <Badge variant="destructive" className="font-arabic">
            منتهي
          </Badge>
        )
      case "disabled":
        return (
          <Badge variant="secondary" className="font-arabic">
            معطل
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-arabic">إدارة الكوبونات</h2>
          <p className="text-muted-foreground font-arabic">إنشاء وإدارة كوبونات الخصم</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-arabic">
              <Plus className="w-4 h-4 ml-2" />
              إنشاء كوبون جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-arabic">إنشاء كوبون جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="font-arabic">كود الكوبون</Label>
                <Input
                  placeholder="مثال: WELCOME20"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="font-arabic"
                />
              </div>
              <div>
                <Label className="font-arabic">اسم الكوبون</Label>
                <Input
                  placeholder="اسم وصفي للكوبون"
                  value={newCoupon.name}
                  onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                  className="font-arabic"
                />
              </div>
              <div>
                <Label className="font-arabic">الوصف</Label>
                <Textarea
                  placeholder="وصف الكوبون وشروط الاستخدام"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  className="font-arabic"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-arabic">نوع الخصم</Label>
                  <Select value={newCoupon.type} onValueChange={(value) => setNewCoupon({ ...newCoupon, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage" className="font-arabic">
                        نسبة مئوية
                      </SelectItem>
                      <SelectItem value="fixed" className="font-arabic">
                        مبلغ ثابت
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-arabic">قيمة الخصم</Label>
                  <Input
                    type="number"
                    placeholder="20"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsCreateDialogOpen(false)}
                  variant="outline"
                  className="flex-1 font-arabic bg-transparent"
                >
                  إلغاء
                </Button>
                <Button className="flex-1 font-arabic">إنشاء الكوبون</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Coupons List */}
      <div className="grid gap-4">
        {coupons.map((coupon) => (
          <Card key={coupon.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold font-arabic">{coupon.name}</h3>
                    {getStatusBadge(coupon.status)}
                  </div>
                  <p className="text-muted-foreground mb-3 font-arabic">{coupon.description}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium font-arabic">الكود:</span>
                      <code className="bg-muted px-2 py-1 rounded text-xs">{coupon.id}</code>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium font-arabic">الخصم:</span>
                      <span>{coupon.type === "percentage" ? `${coupon.value}%` : `${coupon.value} ريال`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium font-arabic">الاستخدام:</span>
                      <span>
                        {coupon.usedCount}/{coupon.usageLimit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{coupon.expiryDate.toLocaleDateString("ar-SA")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
