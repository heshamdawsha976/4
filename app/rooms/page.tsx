"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ROOM_PLANS, type Room } from "@/lib/types"
import {
  MessageCircle, Users, Crown, Shield, Star, Globe, Search, Plus, Filter,
  Sparkles, Heart, Music, BookOpen, Coffee, Gamepad2, TrendingUp
} from "lucide-react"
import Link from "next/link"

// بيانات تجريبية للغرف
const mockRooms: Room[] = [
  {
    id: "1",
    name: "غرفة الثقافة العربية",
    description: "مناقشات ثقافية وأدبية عن التراث العربي",
    plan: "gold",
    ownerId: "owner1",
    isActive: true,
    isPrivate: false,
    maxUsers: 500,
    currentUsers: 245,
    createdAt: new Date(),
    settings: {
      allowGuests: true,
      requireApproval: false,
      allowVoiceChat: true,
      allowVideoChat: true,
      allowFileSharing: true,
      moderationEnabled: true,
      welcomeMessage: "أهلاً وسهلاً بكم"
    },
    participants: []
  },
  {
    id: "2", 
    name: "مقهى الشعر والأدب",
    description: "أمسيات شعرية ومناقشات أدبية",
    plan: "premium",
    ownerId: "owner2",
    isActive: true,
    isPrivate: false,
    maxUsers: 1000,
    currentUsers: 189,
    createdAt: new Date(),
    settings: {
      allowGuests: true,
      requireApproval: false,
      allowVoiceChat: true,
      allowVideoChat: true,
      allowFileSharing: true,
      moderationEnabled: true
    },
    participants: []
  },
  {
    id: "3",
    name: "نقاشات التكنولوجيا",
    description: "مناقشات حول التقنية والذكاء الاصطناعي",
    plan: "silver",
    ownerId: "owner3", 
    isActive: true,
    isPrivate: false,
    maxUsers: 200,
    currentUsers: 156,
    createdAt: new Date(),
    settings: {
      allowGuests: true,
      requireApproval: false,
      allowVoiceChat: true,
      allowVideoChat: false,
      allowFileSharing: false,
      moderationEnabled: true
    },
    participants: []
  }
]

const categories = [
  { name: "الكل", icon: Globe, count: 156 },
  { name: "ثقافة", icon: BookOpen, count: 45 },
  { name: "أدب", icon: Heart, count: 32 },
  { name: "موسيقى", icon: Music, count: 28 },
  { name: "عام", icon: Coffee, count: 38 },
  { name: "ألعاب", icon: Gamepad2, count: 13 },
]

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")

  useEffect(() => {
    setRooms(mockRooms)
  }, [])

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getPlanBadge = (plan: string) => {
    const planData = ROOM_PLANS.find(p => p.id === plan)
    if (!planData) return null

    return (
      <Badge 
        className="font-arabic text-white"
        style={{ backgroundColor: planData.color }}
      >
        {planData.nameAr}
      </Badge>
    )
  }

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-right ${
                      selectedCategory === category.name 
                        ? "bg-pink-100 text-pink-700" 
                        : "hover:bg-pink-50"
                    }`}
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
          </div>

          {/* Rooms Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredRooms.map((room) => (
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
                      <div className="flex-shrink-0 mr-3">
                        {getPlanBadge(room.plan)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {room.isActive && (
                        <Badge className="bg-green-100 text-green-800 font-arabic">
                          <div className="w-2 h-2 bg-green-500 rounded-full ml-1 animate-pulse"></div>
                          مباشر
                        </Badge>
                      )}
                      <Badge variant="outline" className="font-arabic">
                        {room.settings.allowGuests ? "يسمح بالضيوف" : "أعضاء فقط"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="font-arabic">
                            {room.currentUsers}/{room.maxUsers}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span className="font-arabic">عربي</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/room/${room.id}`} className="flex-1">
                        <Button className="w-full font-arabic bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                          <MessageCircle className="w-4 h-4 ml-2" />
                          دخول الغرفة
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" className="border-pink-200 hover:bg-pink-50 bg-transparent">
                        <Heart className="w-4 h-4 text-pink-600" />
                      </Button>
                    </div>

                    <div className="mt-3 text-xs text-gray-500 font-arabic text-center">
                      مالك الغرفة: د. أحمد الثقافي
                    </div>
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