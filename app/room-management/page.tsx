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
  Settings,
  Crown,
  Shield,
  Star,
  Users,
  Lock,
  Plus,
  Edit,
  Eye,
  MessageCircle,
  UserCheck,
  ArrowLeft,
  Diamond,
  Award,
  Target,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function RoomManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Settings className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    إدارة الغرف والصلاحيات
                  </h1>
                  <p className="text-sm text-muted-foreground font-arabic">تحكم كامل في غرفك وصلاحيات المستخدمين</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="font-arabic gradient-primary shadow-md hover:shadow-lg transition-all">
                <Plus className="w-4 h-4 ml-2" />
                إنشاء غرفة جديدة
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="my-rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="my-rooms"
              className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              غرفي
            </TabsTrigger>
            <TabsTrigger
              value="create-room"
              className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              إنشاء غرفة
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              الصلاحيات
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              الإحصائيات
            </TabsTrigger>
          </TabsList>

          {/* My Rooms Tab */}
          <TabsContent value="my-rooms" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                غرفي المُدارة
              </h2>
              <div className="flex items-center gap-2">
                <Badge className="font-arabic bg-green-500 hover:bg-green-600">3 غرف نشطة</Badge>
                <Badge variant="outline" className="font-arabic border-primary/30">
                  12 غرفة إجمالي
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "غرفة الثقافة العربية",
                  plan: "premium",
                  planName: "روم ذهبي",
                  participants: 245,
                  status: "مباشر",
                  permissions: ["admin", "super-admin", "master"],
                  moderators: 3,
                  revenue: "1,250 ريال",
                  rating: 4.8,
                  isPrivate: false,
                },
                {
                  name: "مقهى الشعر والأدب",
                  plan: "silver",
                  planName: "روم فضي",
                  participants: 156,
                  status: "مباشر",
                  permissions: ["admin", "super-admin"],
                  moderators: 2,
                  revenue: "850 ريال",
                  rating: 4.6,
                  isPrivate: false,
                },
                {
                  name: "نقاش خاص - VIP",
                  plan: "featured",
                  planName: "روم مميز",
                  participants: 89,
                  status: "مجدول",
                  permissions: ["master"],
                  moderators: 1,
                  revenue: "2,100 ريال",
                  rating: 4.9,
                  isPrivate: true,
                },
              ].map((room, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 gradient-card border-primary/10 hover:border-primary/30 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg font-arabic group-hover:text-primary transition-colors">
                            {room.name}
                          </CardTitle>
                          {room.isPrivate && <Lock className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={`font-arabic ${
                              room.plan === "premium"
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : room.plan === "silver"
                                  ? "bg-gray-400 hover:bg-gray-500"
                                  : "bg-purple-500 hover:bg-purple-600"
                            }`}
                          >
                            {room.plan === "premium" && <Crown className="w-3 h-3 ml-1" />}
                            {room.plan === "silver" && <Award className="w-3 h-3 ml-1" />}
                            {room.plan === "featured" && <Diamond className="w-3 h-3 ml-1" />}
                            {room.planName}
                          </Badge>
                          <Badge
                            className={`font-arabic ${
                              room.status === "مباشر"
                                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          >
                            {room.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Room Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-primary/5 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-bold text-primary">{room.participants}</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-arabic">مشارك</p>
                        </div>
                        <div className="text-center p-3 bg-secondary/5 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Shield className="w-4 h-4 text-secondary" />
                            <span className="font-bold text-secondary">{room.moderators}</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-arabic">مشرف</p>
                        </div>
                      </div>

                      {/* Permissions */}
                      <div>
                        <p className="text-sm font-medium font-arabic mb-2">الأدوار المفعلة:</p>
                        <div className="flex flex-wrap gap-1">
                          {room.permissions.map((perm, permIndex) => (
                            <Badge
                              key={permIndex}
                              variant="outline"
                              className={`text-xs font-arabic ${
                                perm === "master"
                                  ? "border-red-500 text-red-600 bg-red-50"
                                  : perm === "super-admin"
                                    ? "border-purple-500 text-purple-600 bg-purple-50"
                                    : "border-blue-500 text-blue-600 bg-blue-50"
                              }`}
                            >
                              {perm === "master" && <Crown className="w-3 h-3 ml-1" />}
                              {perm === "super-admin" && <Shield className="w-3 h-3 ml-1" />}
                              {perm === "admin" && <Star className="w-3 h-3 ml-1" />}
                              {perm === "master" ? "ماستر" : perm === "super-admin" ? "سوبر أدمن" : "أدمن"}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Revenue & Rating */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="text-center">
                          <p className="text-sm font-bold text-green-600">{room.revenue}</p>
                          <p className="text-xs text-muted-foreground font-arabic">الإيرادات</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-bold">{room.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-arabic">التقييم</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 font-arabic gradient-primary shadow-md">
                          <Settings className="w-3 h-3 ml-1" />
                          إدارة
                        </Button>
                        <Button size="sm" variant="outline" className="bg-background/80 border-primary/30">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-background/80 border-primary/30">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create Room Tab */}
          <TabsContent value="create-room" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  إنشاء غرفة جديدة
                </h2>
                <p className="text-muted-foreground font-arabic">اختر الخطة المناسبة لغرفتك وخصص الصلاحيات</p>
              </div>

              {/* Room Plans */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    name: "روم ذهبي",
                    price: "299 ريال/شهر",
                    icon: Crown,
                    color: "yellow",
                    features: [
                      "حتى 500 مشارك",
                      "جميع الأدوار (ماستر، سوبر أدمن، أدمن)",
                      "بث صوتي ومرئي عالي الجودة",
                      "تسجيل الجلسات",
                      "إحصائيات متقدمة",
                      "دعم فني مميز",
                      "تخصيص كامل للواجهة",
                    ],
                    popular: true,
                  },
                  {
                    name: "روم فضي",
                    price: "149 ريال/شهر",
                    icon: Award,
                    color: "gray",
                    features: [
                      "حتى 200 مشارك",
                      "أدوار (سوبر أدمن، أدمن)",
                      "بث صوتي ومرئي",
                      "إحصائيات أساسية",
                      "دعم فني عادي",
                      "تخصيص محدود",
                    ],
                    popular: false,
                  },
                  {
                    name: "روم مميز",
                    price: "499 ريال/شهر",
                    icon: Diamond,
                    color: "purple",
                    features: [
                      "حتى 1000 مشارك",
                      "جميع الأدوار + أدوار مخصصة",
                      "بث 4K وصوت عالي الدقة",
                      "تسجيل وبث مباشر خارجي",
                      "ذكاء اصطناعي للإشراف",
                      "دعم فني VIP",
                      "تخصيص كامل + برندنج",
                      "API متقدم",
                    ],
                    popular: false,
                  },
                ].map((plan, index) => (
                  <Card
                    key={index}
                    className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      plan.popular ? "ring-2 ring-primary shadow-lg scale-105" : ""
                    } gradient-card border-primary/10 hover:border-primary/30`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="font-arabic bg-primary hover:bg-primary/90 shadow-md">
                          <Sparkles className="w-3 h-3 ml-1" />
                          الأكثر شعبية
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-lg ${
                          plan.color === "yellow"
                            ? "bg-yellow-500"
                            : plan.color === "gray"
                              ? "bg-gray-400"
                              : "bg-purple-500"
                        }`}
                      >
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-arabic">{plan.name}</CardTitle>
                      <CardDescription className="text-2xl font-bold text-primary">{plan.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm font-arabic">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <UserCheck className="w-3 h-3 text-white" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full font-arabic shadow-md hover:shadow-lg transition-all ${
                          plan.popular ? "gradient-primary" : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        اختيار هذه الخطة
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Room Creation Form */}
              <Card className="gradient-card border-primary/10">
                <CardHeader>
                  <CardTitle className="font-arabic">تفاصيل الغرفة</CardTitle>
                  <CardDescription className="font-arabic">املأ المعلومات الأساسية لغرفتك الجديدة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="room-name" className="font-arabic">
                        اسم الغرفة
                      </Label>
                      <Input
                        id="room-name"
                        placeholder="مثال: غرفة الثقافة العربية"
                        className="font-arabic text-right bg-background/80 border-primary/20"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room-category" className="font-arabic">
                        الفئة
                      </Label>
                      <Select>
                        <SelectTrigger className="font-arabic bg-background/80 border-primary/20">
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="culture" className="font-arabic">
                            ثقافة
                          </SelectItem>
                          <SelectItem value="literature" className="font-arabic">
                            أدب
                          </SelectItem>
                          <SelectItem value="history" className="font-arabic">
                            تاريخ
                          </SelectItem>
                          <SelectItem value="technology" className="font-arabic">
                            تقنية
                          </SelectItem>
                          <SelectItem value="general" className="font-arabic">
                            عام
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="room-description" className="font-arabic">
                      وصف الغرفة
                    </Label>
                    <Input
                      id="room-description"
                      placeholder="وصف مختصر عن موضوع الغرفة وأهدافها"
                      className="font-arabic text-right bg-background/80 border-primary/20"
                      dir="rtl"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="max-participants" className="font-arabic">
                        الحد الأقصى للمشاركين
                      </Label>
                      <Select>
                        <SelectTrigger className="font-arabic bg-background/80 border-primary/20">
                          <SelectValue placeholder="اختر العدد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50" className="font-arabic">
                            50 مشارك
                          </SelectItem>
                          <SelectItem value="100" className="font-arabic">
                            100 مشارك
                          </SelectItem>
                          <SelectItem value="200" className="font-arabic">
                            200 مشارك
                          </SelectItem>
                          <SelectItem value="500" className="font-arabic">
                            500 مشارك
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room-language" className="font-arabic">
                        اللغة الأساسية
                      </Label>
                      <Select>
                        <SelectTrigger className="font-arabic bg-background/80 border-primary/20">
                          <SelectValue placeholder="اختر اللغة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="arabic" className="font-arabic">
                            العربية
                          </SelectItem>
                          <SelectItem value="english" className="font-arabic">
                            الإنجليزية
                          </SelectItem>
                          <SelectItem value="mixed" className="font-arabic">
                            مختلطة
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room-country" className="font-arabic">
                        البلد/المنطقة
                      </Label>
                      <Select>
                        <SelectTrigger className="font-arabic bg-background/80 border-primary/20">
                          <SelectValue placeholder="اختر البلد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general" className="font-arabic">
                            عام
                          </SelectItem>
                          <SelectItem value="saudi" className="font-arabic">
                            السعودية
                          </SelectItem>
                          <SelectItem value="egypt" className="font-arabic">
                            مصر
                          </SelectItem>
                          <SelectItem value="uae" className="font-arabic">
                            الإمارات
                          </SelectItem>
                          <SelectItem value="jordan" className="font-arabic">
                            الأردن
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Room Settings */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-bold font-arabic">إعدادات الغرفة</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-arabic">غرفة خاصة</Label>
                          <p className="text-sm text-muted-foreground font-arabic">تتطلب دعوة للانضمام</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-arabic">تسجيل الجلسات</Label>
                          <p className="text-sm text-muted-foreground font-arabic">حفظ تلقائي للمحادثات</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-arabic">السماح بالفيديو</Label>
                          <p className="text-sm text-muted-foreground font-arabic">إمكانية البث المرئي</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="font-arabic">الإشراف التلقائي</Label>
                          <p className="text-sm text-muted-foreground font-arabic">فلترة المحتوى بالذكاء الاصطناعي</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button className="flex-1 font-arabic gradient-primary shadow-md hover:shadow-lg transition-all">
                      <Plus className="w-4 h-4 ml-2" />
                      إنشاء الغرفة
                    </Button>
                    <Button variant="outline" className="font-arabic bg-background/80 border-primary/30">
                      معاينة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                إدارة الصلاحيات والأدوار
              </h2>
              <p className="text-muted-foreground font-arabic">تخصيص الأدوار والصلاحيات لكل غرفة بشكل مستقل</p>
            </div>

            {/* Role Definitions */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: "ماستر",
                  color: "red",
                  icon: Crown,
                  description: "السيطرة الكاملة على الغرفة",
                  permissions: [
                    "إدارة جميع المستخدمين",
                    "تعديل إعدادات الغرفة",
                    "حذف الغرفة",
                    "إدارة الإيرادات",
                    "تعيين وإزالة المشرفين",
                    "الوصول للإحصائيات المتقدمة",
                  ],
                },
                {
                  name: "سوبر أدمن",
                  color: "purple",
                  icon: Shield,
                  description: "صلاحيات إدارية متقدمة",
                  permissions: [
                    "كتم وطرد المستخدمين",
                    "إدارة قائمة المتحدثين",
                    "تعديل موضوع الغرفة",
                    "إدارة الرسائل",
                    "تعيين أدمن عادي",
                    "الوصول للإحصائيات الأساسية",
                  ],
                },
                {
                  name: "أدمن",
                  color: "blue",
                  icon: Star,
                  description: "صلاحيات إشراف أساسية",
                  permissions: [
                    "كتم المستخدمين مؤقتاً",
                    "إدارة طلبات الكلام",
                    "حذف الرسائل المخالفة",
                    "إرسال تحذيرات",
                    "رفع التقارير",
                  ],
                },
              ].map((role, index) => (
                <Card
                  key={index}
                  className="gradient-card border-primary/10 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 shadow-lg ${
                        role.color === "red" ? "bg-red-500" : role.color === "purple" ? "bg-purple-500" : "bg-blue-500"
                      }`}
                    >
                      <role.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-arabic">{role.name}</CardTitle>
                    <CardDescription className="font-arabic">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {role.permissions.map((permission, permIndex) => (
                        <li key={permIndex} className="flex items-center gap-2 text-sm font-arabic">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserCheck className="w-2 h-2 text-white" />
                          </div>
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Permission Management Interface */}
            <Card className="gradient-card border-primary/10">
              <CardHeader>
                <CardTitle className="font-arabic">تخصيص الصلاحيات</CardTitle>
                <CardDescription className="font-arabic">اختر الغرفة وقم بتعيين الأدوار للمستخدمين</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-arabic">اختر الغرفة</Label>
                    <Select>
                      <SelectTrigger className="font-arabic bg-background/80 border-primary/20">
                        <SelectValue placeholder="اختر الغرفة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="culture" className="font-arabic">
                          غرفة الثقافة العربية
                        </SelectItem>
                        <SelectItem value="poetry" className="font-arabic">
                          مقهى الشعر والأدب
                        </SelectItem>
                        <SelectItem value="vip" className="font-arabic">
                          نقاش خاص - VIP
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-arabic">البحث عن مستخدم</Label>
                    <Input
                      placeholder="اسم المستخدم أو البريد الإلكتروني"
                      className="font-arabic text-right bg-background/80 border-primary/20"
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Current Permissions */}
                <div className="space-y-4">
                  <h3 className="font-bold font-arabic">المستخدمون الحاليون</h3>
                  <div className="space-y-3">
                    {[
                      { name: "د. أحمد الثقافي", role: "master", email: "ahmed@example.com", avatar: 1 },
                      { name: "فاطمة محمد", role: "super-admin", email: "fatima@example.com", avatar: 2 },
                      { name: "محمد علي", role: "admin", email: "mohammed@example.com", avatar: 3 },
                      { name: "ليلى حسن", role: "admin", email: "layla@example.com", avatar: 4 },
                    ].map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                            <AvatarImage
                              src={`/user-${user.avatar}.png?height=40&width=40&query=user ${user.avatar}`}
                            />
                            <AvatarFallback className="font-arabic gradient-primary text-primary-foreground">
                              {user.name.split(" ")[0].charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium font-arabic">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`font-arabic ${
                              user.role === "master"
                                ? "bg-red-500 hover:bg-red-600"
                                : user.role === "super-admin"
                                  ? "bg-purple-500 hover:bg-purple-600"
                                  : "bg-blue-500 hover:bg-blue-600"
                            }`}
                          >
                            {user.role === "master" && <Crown className="w-3 h-3 ml-1" />}
                            {user.role === "super-admin" && <Shield className="w-3 h-3 ml-1" />}
                            {user.role === "admin" && <Star className="w-3 h-3 ml-1" />}
                            {user.role === "master" ? "ماستر" : user.role === "super-admin" ? "سوبر أدمن" : "أدمن"}
                          </Badge>
                          <Select defaultValue={user.role}>
                            <SelectTrigger className="w-32 font-arabic bg-background/80 border-primary/20">
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
                              <SelectItem value="remove" className="font-arabic text-red-600">
                                إزالة
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" variant="outline" className="bg-background/80 border-primary/30">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t">
                  <Button className="font-arabic gradient-primary shadow-md hover:shadow-lg transition-all">
                    <UserCheck className="w-4 h-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                  <Button variant="outline" className="font-arabic bg-background/80 border-primary/30">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مستخدم جديد
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                إحصائيات الغرف والأداء
              </h2>
              <p className="text-muted-foreground font-arabic">تتبع أداء غرفك وتفاعل المستخدمين</p>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "إجمالي المشاركين",
                  value: "12,456",
                  change: "+23%",
                  icon: Users,
                  color: "blue",
                },
                {
                  title: "الغرف النشطة",
                  value: "8",
                  change: "+2",
                  icon: MessageCircle,
                  color: "green",
                },
                {
                  title: "إجمالي الإيرادات",
                  value: "45,230 ريال",
                  change: "+18%",
                  icon: Target,
                  color: "yellow",
                },
                {
                  title: "متوسط التقييم",
                  value: "4.7",
                  change: "+0.2",
                  icon: Star,
                  color: "purple",
                },
              ].map((metric, index) => (
                <Card key={index} className="gradient-card border-primary/10 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                          metric.color === "blue"
                            ? "bg-blue-500"
                            : metric.color === "green"
                              ? "bg-green-500"
                              : metric.color === "yellow"
                                ? "bg-yellow-500"
                                : "bg-purple-500"
                        }`}
                      >
                        <metric.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="font-arabic bg-green-500 hover:bg-green-600">{metric.change}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                    <p className="text-sm text-muted-foreground font-arabic">{metric.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Analytics */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="gradient-card border-primary/10">
                <CardHeader>
                  <CardTitle className="font-arabic">أداء الغرف</CardTitle>
                  <CardDescription className="font-arabic">إحصائيات مفصلة لكل غرفة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "غرفة الثقافة العربية",
                        participants: 245,
                        sessions: 156,
                        rating: 4.8,
                        revenue: "12,500 ريال",
                      },
                      {
                        name: "مقهى الشعر والأدب",
                        participants: 189,
                        sessions: 134,
                        rating: 4.6,
                        revenue: "8,900 ريال",
                      },
                      {
                        name: "نقاش خاص - VIP",
                        participants: 89,
                        sessions: 67,
                        rating: 4.9,
                        revenue: "15,600 ريال",
                      },
                    ].map((room, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold font-arabic">{room.name}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-arabic">{room.rating}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-primary">{room.participants}</p>
                            <p className="text-xs text-muted-foreground font-arabic">مشارك</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-secondary">{room.sessions}</p>
                            <p className="text-xs text-muted-foreground font-arabic">جلسة</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-green-600">{room.revenue}</p>
                            <p className="text-xs text-muted-foreground font-arabic">إيراد</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card border-primary/10">
                <CardHeader>
                  <CardTitle className="font-arabic">نشاط المستخدمين</CardTitle>
                  <CardDescription className="font-arabic">إحصائيات التفاعل والمشاركة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-arabic">معدل المشاركة اليومية</span>
                        <span className="text-sm font-bold">78%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-arabic">متوسط وقت الجلسة</span>
                        <span className="text-sm font-bold">45 دقيقة</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-arabic">معدل العودة</span>
                        <span className="text-sm font-bold">92%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-arabic">رضا المستخدمين</span>
                        <span className="text-sm font-bold">4.7/5</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
