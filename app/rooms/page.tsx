import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GuestLoginDialog } from "@/components/auth/guest-login"
import { 
  Radio,
  Users,
  Crown,
  Shield,
  Star,
  Search,
  Filter,
  Volume2,
  MapPin,
  UserCheck,
  Clock,
  Headphones,
  ChevronRight,
  Mic,
  Eye
} from "lucide-react"
import Link from "next/link"

// بيانات الغرف العربية مع التصنيف الجغرافي
const arabRooms = [
  {
    id: "1",
    name: "صالون الخليج العربي",
    description: "تجمع أهل الخليج للحديث عن التراث والثقافة",
    region: "الخليج العربي",
    country: "🇸🇦",
    participants: 45,
    maxParticipants: 100,
    isLive: true,
    plan: "gold",
    owner: "عبدالله الخليجي",
    language: "العربية",
    category: "ثقافة",
    listeners: 28,
    speakers: 6,
    waitingList: 3,
    roomType: "voice", // voice, video, mixed
    mood: "friendly", // friendly, serious, educational
    activeNow: true,
    peak: "مساء",
    tags: ["خليج", "تراث", "ثقافة"]
  },
  {
    id: "2", 
    name: "ديوان الشام",
    description: "غرفة أهل الشام للشعر والأدب والحكايات",
    region: "بلاد الشام",
    country: "🇸🇾",
    participants: 32,
    maxParticipants: 80,
    isLive: true,
    plan: "silver",
    owner: "أحمد الدمشقي",
    language: "العربية",
    category: "أدب",
    listeners: 24,
    speakers: 4,
    waitingList: 1,
    roomType: "voice",
    mood: "educational",
    activeNow: true,
    peak: "ليل",
    tags: ["شام", "شعر", "أدب"]
  },
  {
    id: "3",
    name: "قهوة المغرب العربي",
    description: "مجلس أهل المغرب العربي للنقاش والحديث الودود",
    region: "المغرب العربي",
    country: "🇲🇦",
    participants: 28,
    maxParticipants: 60,
    isLive: true,
    plan: "premium",
    owner: "فاطمة المغربية",
    language: "العربية",
    category: "عام",
    listeners: 20,
    speakers: 5,
    waitingList: 0,
    roomType: "voice",
    mood: "friendly",
    activeNow: true,
    peak: "عصر",
    tags: ["مغرب", "ودود", "نقاش"]
  },
  {
    id: "4",
    name: "مجلس وادي النيل",
    description: "تجمع أهل مصر والسودان للحديث والضحك",
    region: "وادي النيل",
    country: "🇪🇬",
    participants: 67,
    maxParticipants: 120,
    isLive: true,
    plan: "gold",
    owner: "محمد المصري",
    language: "العربية",
    category: "ترفيه",
    listeners: 50,
    speakers: 8,
    waitingList: 5,
    roomType: "voice",
    mood: "friendly",
    activeNow: true,
    peak: "مساء",
    tags: ["مصر", "سودان", "فكاهة"]
  },
  {
    id: "5",
    name: "مجلس بلاد الرافدين",
    description: "غرفة العراق للشعر الشعبي والغناء التراثي",
    region: "العراق",
    country: "🇮🇶",
    participants: 23,
    maxParticipants: 50,
    isLive: true,
    plan: "basic",
    owner: "علي البغدادي",
    language: "العربية",
    category: "موسيقى",
    listeners: 18,
    speakers: 3,
    waitingList: 0,
    roomType: "voice",
    mood: "friendly",
    activeNow: true,
    peak: "ليل",
    tags: ["عراق", "شعر شعبي", "تراث"]
  }
]

// تصنيفات الدول والمناطق العربية
const arabRegions = [
  { name: "الكل", flag: "🌍", count: 156, color: "bg-gray-100 text-gray-700" },
  { name: "الخليج العربي", flag: "🇸🇦", count: 45, color: "bg-green-100 text-green-700" },
  { name: "بلاد الشام", flag: "🇸🇾", count: 32, color: "bg-blue-100 text-blue-700" },
  { name: "المغرب العربي", flag: "🇲🇦", count: 28, color: "bg-red-100 text-red-700" },
  { name: "وادي النيل", flag: "🇪🇬", count: 31, color: "bg-yellow-100 text-yellow-700" },
  { name: "العراق", flag: "🇮🇶", count: 12, color: "bg-purple-100 text-purple-700" },
  { name: "اليمن", flag: "🇾🇪", count: 8, color: "bg-pink-100 text-pink-700" }
]

const planColors = {
  premium: "from-purple-500 to-purple-600",
  gold: "from-yellow-500 to-yellow-600", 
  silver: "from-gray-400 to-gray-500",
  basic: "from-blue-400 to-blue-500"
}

const planBadges = {
  premium: { label: "مميزة", color: "bg-purple-100 text-purple-800" },
  gold: { label: "ذهبية", color: "bg-yellow-100 text-yellow-800" },
  silver: { label: "فضية", color: "bg-gray-100 text-gray-800" },
  basic: { label: "عادية", color: "bg-blue-100 text-blue-800" }
}

export default function VoiceRoomsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold font-arabic text-gray-800">
                لقاء
              </h1>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-arabic border-red-200 text-red-700 hover:bg-red-50">
              <Crown className="w-4 h-4 ml-2" />
              إنشاء غرفة
            </Button>
            <GuestLoginDialog>
              <Button className="font-arabic bg-red-600 hover:bg-red-700 text-white">
                <Radio className="w-4 h-4 ml-2" />
                ادخل الآن
              </Button>
            </GuestLoginDialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 font-arabic text-gray-800">
            الغرف الصوتية العربية
          </h2>
          <p className="text-gray-600 font-arabic text-lg max-w-2xl mx-auto">
            انضم إلى غرف الدردشة الصوتية المتنوعة من جميع أنحاء الوطن العربي
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="ابحث عن غرفة..."
                className="font-arabic pr-12 bg-white border-gray-300 focus:border-red-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="font-arabic border-green-200 text-green-700 hover:bg-green-50">
              <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
              مباشر الآن
            </Button>
            <Button variant="outline" className="font-arabic border-gray-300 hover:bg-gray-50">
              <Filter className="w-4 h-4 ml-2" />
              تصفية
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Regional Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg border-gray-200">
              <CardHeader>
                <CardTitle className="font-arabic text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  المناطق العربية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {arabRegions.map((region) => (
                  <button
                    key={region.name}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-right border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{region.flag}</span>
                      <span className="font-arabic text-sm">{region.name}</span>
                    </div>
                    <Badge className={`text-xs ${region.color}`}>
                      {region.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Live Stats */}
            <Card className="bg-white shadow-lg border-gray-200 mt-6">
              <CardHeader>
                <CardTitle className="font-arabic text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5 text-red-600" />
                  إحصائيات مباشرة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                  <div className="text-2xl font-bold text-red-600 mb-1 flex items-center justify-center gap-2">
                    <Radio className="w-6 h-6" />
                    156
                  </div>
                  <div className="text-sm text-gray-600 font-arabic">غرفة نشطة</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <div className="text-2xl font-bold text-green-600 mb-1 flex items-center justify-center gap-2">
                    <Users className="w-6 h-6" />
                    2.3K
                  </div>
                  <div className="text-sm text-gray-600 font-arabic">مستمع الآن</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600 mb-1 flex items-center justify-center gap-2">
                    <Mic className="w-6 h-6" />
                    89
                  </div>
                  <div className="text-sm text-gray-600 font-arabic">متحدث نشط</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Voice Rooms Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {arabRooms.map((room) => (
                <Card
                  key={room.id}
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{room.country}</span>
                          <Badge className="bg-gray-100 text-gray-700 text-xs font-arabic">
                            {room.region}
                          </Badge>
                          {room.isLive && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <div className="w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse"></div>
                              مباشر
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="font-arabic text-lg mb-2 text-balance">{room.name}</CardTitle>
                        <p className="text-sm text-gray-600 font-arabic leading-relaxed">{room.description}</p>
                      </div>
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${planColors[room.plan]} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 mr-3`}
                      >
                        <Radio className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={planBadges[room.plan].color}>
                        {planBadges[room.plan].label}
                      </Badge>
                      <Badge variant="outline" className="font-arabic">
                        {room.category}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Voice Room Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                          <Headphones className="w-4 h-4" />
                          <span className="font-bold">{room.listeners}</span>
                        </div>
                        <div className="text-xs text-gray-500 font-arabic">مستمع</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                          <Mic className="w-4 h-4" />
                          <span className="font-bold">{room.speakers}</span>
                        </div>
                        <div className="text-xs text-gray-500 font-arabic">متحدث</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-bold">{room.waitingList}</span>
                        </div>
                        <div className="text-xs text-gray-500 font-arabic">انتظار</div>
                      </div>
                    </div>

                    {/* Room Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {room.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-red-50 text-red-700 font-arabic">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Entry Buttons */}
                    <div className="flex gap-2">
                      <GuestLoginDialog redirectTo={`/room/${room.id}`}>
                        <Button className="flex-1 font-arabic bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                          <Radio className="w-4 h-4 ml-2" />
                          انضم للغرفة
                        </Button>
                      </GuestLoginDialog>
                      <Button variant="outline" size="icon" className="border-gray-300 hover:bg-gray-50">
                        <Volume2 className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>

                    {/* Room Owner */}
                    <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-red-500" />
                          <span className="font-arabic text-gray-600">مدير الغرفة:</span>
                        </div>
                        <span className="font-arabic font-medium text-gray-800">{room.owner}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="font-arabic text-gray-500">ذروة النشاط:</span>
                        <span className="font-arabic text-gray-700">{room.peak}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="font-arabic border-gray-300 hover:bg-gray-50">
                <ChevronRight className="w-4 h-4 ml-2" />
                تحميل المزيد من الغرف
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
