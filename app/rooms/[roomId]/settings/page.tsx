"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, UserMinus, Ban, Save, Trash2, Eye } from "lucide-react"

const mockRoom = {
  id: "1",
  name: "غرفة الأصدقاء",
  description: "غرفة للدردشة مع الأصدقاء",
  plan: "premium",
  members: 45,
  maxMembers: 100,
  isPrivate: false,
  requireApproval: true,
  customization: {
    primaryColor: "#8B5CF6",
    secondaryColor: "#EC4899",
    icon: "👥",
    welcomeMessage: "مرحباً بك في غرفة الأصدقاء!",
  },
  owner: "أحمد محمد",
  createdAt: "2024-01-15",
}

const mockMembers = [
  {
    id: "1",
    name: "أحمد محمد",
    role: "owner",
    avatar: "/placeholder-32px.png",
    joinedAt: "2024-01-15",
    isOnline: true,
  },
  {
    id: "2",
    name: "سارة أحمد",
    role: "admin",
    avatar: "/placeholder-32px.png",
    joinedAt: "2024-01-16",
    isOnline: true,
  },
  {
    id: "3",
    name: "محمد علي",
    role: "moderator",
    avatar: "/placeholder-32px.png",
    joinedAt: "2024-01-17",
    isOnline: false,
  },
]

const roleColors = {
  owner: "bg-yellow-100 text-yellow-800",
  admin: "bg-red-100 text-red-800",
  moderator: "bg-blue-100 text-blue-800",
  member: "bg-gray-100 text-gray-800",
}

const roleNames = {
  owner: "مالك",
  admin: "أدمن",
  moderator: "مشرف",
  member: "عضو",
}

export default function RoomSettingsPage({ params }: { params: { roomId: string } }) {
  const [roomData, setRoomData] = useState(mockRoom)
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: roomData.customization.primaryColor + "20" }}
          >
            {roomData.customization.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{roomData.name}</h1>
            <p className="text-gray-600">إعدادات الغرفة</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 ml-2" />
            معاينة
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="members">الأعضاء</TabsTrigger>
          <TabsTrigger value="customization">التخصيص</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>إعدادات أساسية للغرفة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomName">اسم الغرفة</Label>
                  <Input
                    id="roomName"
                    value={roomData.name}
                    onChange={(e) => setRoomData({ ...roomData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxMembers">الحد الأقصى للأعضاء</Label>
                  <Input
                    id="maxMembers"
                    type="number"
                    value={roomData.maxMembers}
                    onChange={(e) => setRoomData({ ...roomData, maxMembers: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف الغرفة</Label>
                <Textarea
                  id="description"
                  value={roomData.description}
                  onChange={(e) => setRoomData({ ...roomData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">رسالة الترحيب</Label>
                <Textarea
                  id="welcomeMessage"
                  value={roomData.customization.welcomeMessage}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      customization: { ...roomData.customization, welcomeMessage: e.target.value },
                    })
                  }
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الخصوصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>غرفة خاصة</Label>
                  <p className="text-sm text-gray-600">تتطلب دعوة للانضمام</p>
                </div>
                <Switch
                  checked={roomData.isPrivate}
                  onCheckedChange={(checked) => setRoomData({ ...roomData, isPrivate: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تتطلب موافقة</Label>
                  <p className="text-sm text-gray-600">يجب الموافقة على طلبات الانضمام</p>
                </div>
                <Switch
                  checked={roomData.requireApproval}
                  onCheckedChange={(checked) => setRoomData({ ...roomData, requireApproval: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>إدارة الأعضاء</CardTitle>
                  <CardDescription>إدارة أعضاء الغرفة وأدوارهم</CardDescription>
                </div>
                <Button>
                  <UserPlus className="w-4 h-4 ml-2" />
                  دعوة عضو
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{member.name}</span>
                          {member.isOnline && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={roleColors[member.role as keyof typeof roleColors]}>
                            {roleNames[member.role as keyof typeof roleNames]}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            انضم في {new Date(member.joinedAt).toLocaleDateString("ar")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Select defaultValue={member.role}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">عضو</SelectItem>
                          <SelectItem value="moderator">مشرف</SelectItem>
                          <SelectItem value="admin">أدمن</SelectItem>
                        </SelectContent>
                      </Select>

                      {member.role !== "owner" && (
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Ban className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <UserMinus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تخصيص المظهر</CardTitle>
              <CardDescription>تخصيص ألوان ومظهر الغرفة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">اللون الأساسي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={roomData.customization.primaryColor}
                      onChange={(e) =>
                        setRoomData({
                          ...roomData,
                          customization: { ...roomData.customization, primaryColor: e.target.value },
                        })
                      }
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={roomData.customization.primaryColor}
                      onChange={(e) =>
                        setRoomData({
                          ...roomData,
                          customization: { ...roomData.customization, primaryColor: e.target.value },
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
                      value={roomData.customization.secondaryColor}
                      onChange={(e) =>
                        setRoomData({
                          ...roomData,
                          customization: { ...roomData.customization, secondaryColor: e.target.value },
                        })
                      }
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={roomData.customization.secondaryColor}
                      onChange={(e) =>
                        setRoomData({
                          ...roomData,
                          customization: { ...roomData.customization, secondaryColor: e.target.value },
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
                  value={roomData.customization.icon}
                  onChange={(e) =>
                    setRoomData({
                      ...roomData,
                      customization: { ...roomData.customization, icon: e.target.value },
                    })
                  }
                  placeholder="💬"
                  className="text-2xl text-center w-32"
                />
              </div>

              {/* Preview */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">معاينة</h3>
                <div
                  className="p-4 rounded-lg text-white"
                  style={{
                    background: `linear-gradient(135deg, ${roomData.customization.primaryColor}, ${roomData.customization.secondaryColor})`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{roomData.customization.icon}</span>
                    <div>
                      <h4 className="font-bold">{roomData.name}</h4>
                      <p className="text-sm opacity-90">{roomData.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
              <CardDescription>إدارة أمان وحماية الغرفة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>تصفية الكلمات</Label>
                    <p className="text-sm text-gray-600">تصفية تلقائية للكلمات غير المناسبة</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>منع الروابط</Label>
                    <p className="text-sm text-gray-600">منع مشاركة الروابط الخارجية</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>حد الرسائل</Label>
                    <p className="text-sm text-gray-600">تحديد عدد الرسائل في الدقيقة</p>
                  </div>
                  <Input type="number" defaultValue="10" className="w-20" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">منطقة الخطر</CardTitle>
              <CardDescription>إجراءات لا يمكن التراجع عنها</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 ml-2" />
                حذف الغرفة نهائياً
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
