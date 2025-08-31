import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GuestLoginDialog } from "@/components/auth/guest-login"
import {
  MessageCircle,
  Users,
  Crown,
  Shield,
  Star,
  Globe,
  Search,
  Plus,
  Filter,
  Sparkles,
  Heart,
  Music,
  BookOpen,
  Coffee,
  Gamepad2,
} from "lucide-react"
import Link from "next/link"

// Mock data for rooms
const rooms = [
  {
    id: "1",
    name: "غرفة الثقافة العربية",
    description: "مناقشات ثقافية وأدبية عن التراث العربي",
    category: "ثقافة",
    participants: 125,
    maxParticipants: 200,
    isLive: true,
    plan: "gold",
    owner: "أحمد المغربي",
    language: "العربية",
    tags: ["ثقافة", "أدب", "تراث"],
    activeUsers: [
      { name: "فاطمة", role: "admin", avatar: "👩" },
      { name: "محمد", role: "member", avatar: "👨" },
      { name: "عائشة", role: "super_admin", avatar: "👩‍🦱" },
    ],
  },
  {
    id: "2",
    name: "غرفة الشعر والأدب",
    description: "أمسيات شعرية ومناقشات أدبية",
    category: "أدب",
    participants: 89,
    maxParticipants: 150,
    isLive: true,
    plan: "premium",
    owner: "ليلى اللبنانية",
    language: "العربية",
    tags: ["شعر", "أدب", "إبداع"],
    activeUsers: [
      { name: "عمر", role: "member", avatar: "👨���🎓" },
      { name: "زينب", role: "admin", avatar: "👩‍🏫" },
    ],
  },
  {
    id: "3",
    name: "مقهى الأصدقاء",
    description: "دردشة ودية وأحاديث عامة",
    category: "عام",
    participants: 67,
    maxParticipants: 100,
    isLive: true,
    plan: "silver",
    owner: "سارة المصرية",
    language: "العربية",
    tags: ["دردشة", "أصدقاء", "ترفيه"],
    activeUsers: [
      { name: "خالد", role: "member", avatar: "👨‍💼" },
      { name: "نور", role: "member", avatar: "👩‍💻" },
    ],
  },
  {
    id: "4",
    name: "غرفة الألعاب",
    description: "مناقشات حول الألعاب والتكنولوجيا",
    category: "ألعاب",
    participants: 45,
    maxParticipants: 80,
    isLive: true,
    plan: "basic",
    owner: "يوسف السعودي",
    language: "العربية",
    tags: ["ألعاب", "تكنولوجيا", "مرح"],
    activeUsers: [{ name: "أمير", role: "member", avatar: "👨‍🎮" }],
  },
]

const categories = [
  { name: "الكل", icon: Globe, count: 156 },
  { name: "ثقافة", icon: BookOpen, count: 45 },
  { name: "أدب", icon: Heart, count: 32 },
  { name: "موسيقى", icon: Music, count: 28 },
  { name: "عام", icon: Coffee, count: 38 },
  { name: "ألعاب", icon: Gamepad2, count: 13 },
]

const planColors = {
  gold: "from-yellow-400 to-amber-500",
  premium: "from-purple-500 to-pink-500",
  silver: "from-gray-400 to-gray-500",
  basic: "from-blue-400 to-indigo-500",
}

const planBadges = {
  gold: { label: "ذهبية", color: "bg-yellow-100 text-yellow-800" },
  premium: { label: "مميزة", color: "bg-purple-100 text-purple-800" },
  silver: { label: "فضية", color: "bg-gray-100 text-gray-800" },
  basic: { label: "أساسية", color: "bg-blue-100 text-blue-800" },
}

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold font-arabic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                لقاء
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <GuestLoginDialog>
              <Button className="font-arabic bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg">
                <Users className="w-4 h-4 ml-2" />
                دخول سريع
              </Button>
            </GuestLoginDialog>
            <Button className="font-arabic bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg">
              <Plus className="w-4 h-4 ml-2" />
              إنشاء غرفة
            </Button>
            <Link href="/login">
              <Button variant="ghost" className="font-arabic hover:bg-pink-50">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-arabic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            اكتشف الغرف المتاحة
          </h2>
          <p className="text-gray-600 font-arabic text-lg max-w-2xl mx-auto">
            انضم إلى أي غرفة كزائر للاستماع والمشاركة في الدردشة، أو سجل دخولك للحصول على مميزات إضافية
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="ابحث عن غرفة..."
                className="font-arabic pr-12 bg-white/80 backdrop-blur-sm border-pink-200 focus:border-pink-400"
              />
            </div>
          </div>
          <Button variant="outline" className="font-arabic border-pink-200 hover:bg-pink-50 bg-transparent">
            <Filter className="w-4 h-4 ml-2" />
            تصفية
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic text-lg">التصنيفات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-pink-50 transition-colors text-right"
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="w-5 h-5 text-pink-600" />
                      <span className="font-arabic">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="font-arabic text-lg">إحصائيات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600 mb-1">156</div>
                  <div className="text-sm text-gray-600 font-arabic">غرفة نشطة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">2.3K</div>
                  <div className="text-sm text-gray-600 font-arabic">مستخدم متصل</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600 font-arabic">متاح دائماً</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rooms Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <Card
                  key={room.id}
                  className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <CardTitle className="font-arabic text-lg mb-2 text-balance">{room.name}</CardTitle>
                        <p className="text-sm text-gray-600 font-arabic leading-relaxed">{room.description}</p>
                      </div>
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${planColors[room.plan]} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 mr-3`}
                      >
                        {room.plan === "gold" && <Crown className="w-6 h-6 text-white" />}
                        {room.plan === "premium" && <Sparkles className="w-6 h-6 text-white" />}
                        {room.plan === "silver" && <Shield className="w-6 h-6 text-white" />}
                        {room.plan === "basic" && <Star className="w-6 h-6 text-white" />}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={planBadges[room.plan].color}>{planBadges[room.plan].label}</Badge>
                      <Badge variant="outline" className="font-arabic">
                        {room.category}
                      </Badge>
                      {room.isLive && (
                        <Badge className="bg-green-100 text-green-800">
                          <div className="w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse"></div>
                          مباشر
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {room.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-pink-50 text-pink-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="font-arabic">
                            {room.participants}/{room.maxParticipants}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span className="font-arabic">{room.language}</span>
                        </div>
                      </div>
                    </div>

                    {/* Active Users Preview */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 font-arabic mb-2">المتحدثون النشطون:</div>
                      <div className="flex items-center gap-2">
                        {room.activeUsers.slice(0, 3).map((user, index) => (
                          <div key={index} className="flex items-center gap-1 bg-pink-50 rounded-lg px-2 py-1">
                            <span className="text-sm">{user.avatar}</span>
                            <span className="text-xs font-arabic">{user.name}</span>
                            {user.role === "admin" && <Shield className="w-3 h-3 text-blue-500" />}
                            {user.role === "super_admin" && <Crown className="w-3 h-3 text-red-500" />}
                          </div>
                        ))}
                        {room.activeUsers.length > 3 && (
                          <span className="text-xs text-gray-500 font-arabic">
                            +{room.activeUsers.length - 3} آخرين
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/room/${room.id}`} className="flex-1">
                        <Button className="w-full font-arabic bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                          <MessageCircle className="w-4 h-4 ml-2" />
                          دخول كزائر
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" className="border-pink-200 hover:bg-pink-50 bg-transparent">
                        <Heart className="w-4 h-4 text-pink-600" />
                      </Button>
                    </div>

                    <div className="mt-3 text-xs text-gray-500 font-arabic text-center">مالك الغرفة: {room.owner}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="font-arabic border-pink-200 hover:bg-pink-50 bg-transparent">
                تحميل المزيد من الغرف
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
