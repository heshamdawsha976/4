"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Settings, Users, Crown, Eye, Lock, Globe } from "lucide-react"

const mockRooms = [
  {
    id: "1",
    name: "غرفة الأصدقاء",
    description: "غرفة للدردشة مع الأصدقاء",
    plan: "premium",
    members: 45,
    maxMembers: 100,
    isPrivate: false,
    customization: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#EC4899",
      icon: "👥",
    },
    owner: "أحمد محمد",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "غرفة العمل",
    description: "مناقشات العمل والمشاريع",
    plan: "gold",
    members: 23,
    maxMembers: 50,
    isPrivate: true,
    customization: {
      primaryColor: "#F59E0B",
      secondaryColor: "#EF4444",
      icon: "💼",
    },
    owner: "سارة أحمد",
    createdAt: "2024-01-20",
  },
]

const planColors = {
  basic: "bg-gray-100 text-gray-800",
  silver: "bg-gray-200 text-gray-900",
  gold: "bg-yellow-100 text-yellow-800",
  premium: "bg-purple-100 text-purple-800",
}

const planNames = {
  basic: "أساسي",
  silver: "فضي",
  gold: "ذهبي",
  premium: "مميز",
}

export default function ManageRoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredRooms = mockRooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = selectedPlan === "all" || room.plan === selectedPlan
    return matchesSearch && matchesPlan
  })

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الغرف</h1>
          <p className="text-gray-600 mt-1">إدارة وتخصيص غرف الدردشة</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 ml-2" />
              إنشاء غرفة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إنشاء غرفة جديدة</DialogTitle>
              <DialogDescription>قم بإنشاء غرفة دردشة جديدة مع إعدادات مخصصة</DialogDescription>
            </DialogHeader>
            <CreateRoomForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في الغرف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="تصفية حسب الخطة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الخطط</SelectItem>
                <SelectItem value="basic">أساسي</SelectItem>
                <SelectItem value="silver">فضي</SelectItem>
                <SelectItem value="gold">ذهبي</SelectItem>
                <SelectItem value="premium">مميز</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: room.customization.primaryColor + "20" }}
                  >
                    {room.customization.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={planColors[room.plan as keyof typeof planColors]}>
                        {planNames[room.plan as keyof typeof planNames]}
                      </Badge>
                      {room.isPrivate ? (
                        <Lock className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Globe className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{room.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>
                    {room.members}/{room.maxMembers}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Crown className="w-4 h-4" />
                  <span>{room.owner}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="w-4 h-4 ml-1" />
                  عرض
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Settings className="w-4 h-4 ml-1" />
                  تعديل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد غرف</h3>
            <p className="text-gray-600">لم يتم العثور على غرف تطابق معايير البحث</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function CreateRoomForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    plan: "basic",
    maxMembers: 50,
    isPrivate: false,
    requireApproval: false,
    customization: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#EC4899",
      icon: "💬",
    },
  })

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">الأساسيات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          <TabsTrigger value="customization">التخصيص</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الغرفة</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم الغرفة"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">الخطة</Label>
              <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">أساسي</SelectItem>
                  <SelectItem value="silver">فضي</SelectItem>
                  <SelectItem value="gold">ذهبي</SelectItem>
                  <SelectItem value="premium">مميز</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="وصف مختصر للغرفة"
              rows={3}
            />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxMembers">الحد الأقصى للأعضاء</Label>
              <Input
                id="maxMembers"
                type="number"
                value={formData.maxMembers}
                onChange={(e) => setFormData({ ...formData, maxMembers: Number.parseInt(e.target.value) })}
                min="1"
                max="1000"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>غرفة خاصة</Label>
                <p className="text-sm text-gray-600">تتطلب دعوة للانضمام</p>
              </div>
              <Switch
                checked={formData.isPrivate}
                onCheckedChange={(checked) => setFormData({ ...formData, isPrivate: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>تتطلب موافقة</Label>
                <p className="text-sm text-gray-600">يجب الموافقة على طلبات الانضمام</p>
              </div>
              <Switch
                checked={formData.requireApproval}
                onCheckedChange={(checked) => setFormData({ ...formData, requireApproval: checked })}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customization" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">اللون الأساسي</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={formData.customization.primaryColor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customization: { ...formData.customization, primaryColor: e.target.value },
                    })
                  }
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={formData.customization.primaryColor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customization: { ...formData.customization, primaryColor: e.target.value },
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">اللون الثانوي</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={formData.customization.secondaryColor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customization: { ...formData.customization, secondaryColor: e.target.value },
                    })
                  }
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={formData.customization.secondaryColor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customization: { ...formData.customization, secondaryColor: e.target.value },
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">أيقونة الغرفة</Label>
            <Input
              id="icon"
              value={formData.customization.icon}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customization: { ...formData.customization, icon: e.target.value },
                })
              }
              placeholder="💬"
              className="text-2xl text-center"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
          إلغاء
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          إنشاء الغرفة
        </Button>
      </div>
    </div>
  )
}
