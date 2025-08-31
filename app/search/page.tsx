import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Users,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  Globe,
  BookOpen,
  Music,
  Gamepad2,
  Coffee,
  Heart,
  TrendingUp,
  ArrowLeft,
  SlidersHorizontal,
  Mic,
  History,
  Crown,
  Shield,
  File as Fire,
} from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Enhanced Search Header */}
      <div className="border-b bg-background/90 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن غرف، أشخاص، أو مواضيع..."
                  className="font-arabic text-right pr-10 bg-background/80 border-primary/20 focus:border-primary/50"
                  dir="rtl"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 h-6 hover:bg-primary/10"
                >
                  <Mic className="w-3 h-3 text-primary" />
                </Button>
              </div>
              <Button variant="outline" size="icon" className="hover:bg-primary/10 border-primary/20 bg-transparent">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced Quick Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {[
              { name: "الكل", active: true, icon: null },
              { name: "غرف نشطة", icon: MessageCircle, count: "245" },
              { name: "أشخاص", icon: Users, count: "1.2K" },
              { name: "مواضيع", icon: BookOpen, count: "89" },
              { name: "بلدي", icon: MapPin, count: "67" },
              { name: "مميز", icon: Star, count: "34" },
              { name: "رائج", icon: TrendingUp, count: "12" },
            ].map((filter, index) => (
              <Button
                key={index}
                variant={filter.active ? "default" : "outline"}
                size="sm"
                className={`font-arabic whitespace-nowrap ${
                  filter.active
                    ? "gradient-primary text-primary-foreground shadow-md"
                    : "bg-background/80 border-primary/20 hover:bg-primary/10"
                }`}
              >
                {filter.icon && <filter.icon className="w-4 h-4 ml-1" />}
                {filter.name}
                {filter.count && !filter.active && (
                  <Badge variant="secondary" className="mr-1 text-xs">
                    {filter.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground font-arabic">البحث الأخير:</span>
              <div className="flex gap-2">
                {["الشعر العربي", "التاريخ الإسلامي", "الأدب المعاصر"].map((term, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs font-arabic hover:bg-primary/10"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 font-arabic mb-6 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              الكل
            </TabsTrigger>
            <TabsTrigger
              value="rooms"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              الغرف
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              الأشخاص
            </TabsTrigger>
            <TabsTrigger
              value="topics"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
            >
              المواضيع
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Enhanced Trending Now */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    الأكثر رواجاً الآن
                  </h2>
                  <Badge className="font-arabic bg-red-500 hover:bg-red-600 animate-pulse">🔥 ساخن</Badge>
                </div>
                <Button
                  variant="outline"
                  className="font-arabic bg-background/80 border-primary/30 hover:bg-primary/10"
                >
                  عرض الكل
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    type: "room",
                    name: "غرفة الشعر العربي المعاصر",
                    participants: 156,
                    category: "أدب",
                    status: "مباشر",
                    host: "د. محمد الشاعر",
                    rating: 4.8,
                    trending: true,
                    level: "premium",
                  },
                  {
                    type: "room",
                    name: "نقاش حول التكنولوجيا في العالم العربي",
                    participants: 89,
                    category: "تقنية",
                    status: "مباشر",
                    host: "م. أحمد التقني",
                    rating: 4.6,
                    trending: true,
                    level: "standard",
                  },
                  {
                    type: "room",
                    name: "تاريخ الحضارة الإسلامية",
                    participants: 234,
                    category: "تاريخ",
                    status: "مباشر",
                    host: "د. فاطمة المؤرخة",
                    rating: 4.9,
                    trending: true,
                    level: "premium",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl transition-all duration-300 gradient-card border-primary/10 hover:border-primary/30 group"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex gap-2">
                          <Badge className="font-arabic bg-red-500 hover:bg-red-600 animate-pulse">
                            🔴 {item.status}
                          </Badge>
                          {item.level === "premium" && (
                            <Badge className="font-arabic bg-yellow-500 hover:bg-yellow-600">
                              <Crown className="w-3 h-3 ml-1" />
                              مميز
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="font-arabic border-primary/30">
                          {item.category}
                        </Badge>
                      </div>
                      <h3 className="font-bold font-arabic mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-arabic mb-3">مستضاف بواسطة {item.host}</p>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-arabic">{item.rating}</span>
                        </div>
                        {item.trending && (
                          <div className="flex items-center gap-1">
                            <Fire className="w-4 h-4 text-orange-500" />
                            <span className="text-xs text-orange-600 font-arabic">رائج</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground font-arabic">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-primary font-medium">{item.participants}</span>
                          <span>مشارك</span>
                        </div>
                        <Button
                          size="sm"
                          className="font-arabic gradient-primary shadow-md hover:shadow-lg transition-all"
                        >
                          انضمام
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Popular People */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    أشخاص مميزون
                  </h2>
                </div>
                <Button
                  variant="outline"
                  className="font-arabic bg-background/80 border-primary/30 hover:bg-primary/10"
                >
                  عرض الكل
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: "د. أحمد الثقافي",
                    country: "مصر",
                    followers: 1234,
                    specialty: "أدب عربي",
                    verified: true,
                    level: 25,
                    rating: 4.9,
                    badge: "خبير",
                  },
                  {
                    name: "فاطمة الشاعرة",
                    country: "السعودية",
                    followers: 856,
                    specialty: "شعر حديث",
                    verified: true,
                    level: 22,
                    rating: 4.7,
                    badge: "محترف",
                  },
                  {
                    name: "محمد المؤرخ",
                    country: "الأردن",
                    followers: 692,
                    specialty: "تاريخ إسلامي",
                    verified: false,
                    level: 18,
                    rating: 4.5,
                    badge: "متقدم",
                  },
                  {
                    name: "ليلى الكاتبة",
                    country: "لبنان",
                    followers: 543,
                    specialty: "أدب نسائي",
                    verified: true,
                    level: 20,
                    rating: 4.8,
                    badge: "محترف",
                  },
                ].map((person, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-xl transition-all duration-300 gradient-card border-primary/10 hover:border-primary/30 group"
                  >
                    <CardContent className="pt-6">
                      <div className="relative mb-3">
                        <Avatar className="w-16 h-16 mx-auto ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                          <AvatarImage
                            src={`/popular-person-.png?height=64&width=64&query=popular person ${index + 1}`}
                          />
                          <AvatarFallback className="font-arabic gradient-primary text-primary-foreground">
                            {person.name.split(" ")[0].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -left-1 w-6 h-6 gradient-primary rounded-full flex items-center justify-center shadow-md">
                          <span className="text-xs font-bold text-primary-foreground">{person.level}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <h3 className="font-bold font-arabic group-hover:text-primary transition-colors">
                          {person.name}
                        </h3>
                        {person.verified && <Shield className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground font-arabic mb-1">{person.country}</p>
                      <Badge variant="outline" className="text-xs font-arabic mb-2 border-primary/30">
                        {person.badge}
                      </Badge>
                      <p className="text-xs text-muted-foreground font-arabic mb-2">{person.specialty}</p>

                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-arabic">{person.rating}</span>
                      </div>

                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground font-arabic mb-3">
                        <Users className="w-3 h-3" />
                        {person.followers} متابع
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="font-arabic bg-background/80 border-primary/30 hover:bg-primary/10"
                      >
                        متابعة
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Topics */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    مواضيع شائعة
                  </h2>
                </div>
                <Button
                  variant="outline"
                  className="font-arabic bg-background/80 border-primary/30 hover:bg-primary/10"
                >
                  عرض الكل
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { name: "الأدب العربي", icon: BookOpen, count: 45, trending: true, growth: "+12%" },
                  { name: "التاريخ الإسلامي", icon: Globe, count: 32, trending: false, growth: "+8%" },
                  { name: "الشعر الحديث", icon: Heart, count: 28, trending: true, growth: "+15%" },
                  { name: "الثقافة العربية", icon: Star, count: 56, trending: false, growth: "+5%" },
                  { name: "الموسيقى العربية", icon: Music, count: 19, trending: true, growth: "+20%" },
                  { name: "الطبخ العربي", icon: Coffee, count: 23, trending: false, growth: "+7%" },
                ].map((topic, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all cursor-pointer gradient-card border-primary/10 hover:border-primary/30 group"
                  >
                    <CardContent className="pt-4 text-center">
                      <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-2 shadow-md group-hover:scale-110 transition-transform">
                        <topic.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-bold font-arabic text-sm mb-1 group-hover:text-primary transition-colors">
                        {topic.name}
                      </h3>
                      <p className="text-xs text-muted-foreground font-arabic mb-1">{topic.count} غرفة</p>
                      <div className="flex items-center justify-center gap-1">
                        {topic.trending && <TrendingUp className="w-3 h-3 text-green-500" />}
                        <span
                          className={`text-xs font-arabic ${topic.trending ? "text-green-600" : "text-muted-foreground"}`}
                        >
                          {topic.growth}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rooms" className="space-y-6">
            {/* Enhanced Filters */}
            <div className="flex flex-wrap gap-4 p-4 bg-muted/30 rounded-xl">
              <Select defaultValue="all">
                <SelectTrigger className="w-48 font-arabic bg-background/80 border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-arabic">
                    جميع الفئات
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
                  <SelectItem value="culture" className="font-arabic">
                    ثقافة
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-48 font-arabic bg-background/80 border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-arabic">
                    جميع البلدان
                  </SelectItem>
                  <SelectItem value="egypt" className="font-arabic">
                    مصر
                  </SelectItem>
                  <SelectItem value="saudi" className="font-arabic">
                    السعودية
                  </SelectItem>
                  <SelectItem value="uae" className="font-arabic">
                    الإمارات
                  </SelectItem>
                  <SelectItem value="jordan" className="font-arabic">
                    الأردن
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="active">
                <SelectTrigger className="w-48 font-arabic bg-background/80 border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" className="font-arabic">
                    غرف نشطة
                  </SelectItem>
                  <SelectItem value="scheduled" className="font-arabic">
                    غرف مجدولة
                  </SelectItem>
                  <SelectItem value="all" className="font-arabic">
                    جميع الغرف
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-48 font-arabic bg-background/80 border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-arabic">
                    جميع التقييمات
                  </SelectItem>
                  <SelectItem value="high" className="font-arabic">
                    تقييم عالي (4.5+)
                  </SelectItem>
                  <SelectItem value="medium" className="font-arabic">
                    تقييم متوسط (3.5+)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "مقهى الأدب العربي",
                  description: "نناقش أعمال الكتاب العرب المعاصرين",
                  host: "د. سارة الأديبة",
                  participants: 67,
                  category: "أدب",
                  country: "مصر",
                  status: "مباشر",
                  duration: "45 دقيقة",
                },
                {
                  name: "تاريخ الأندلس",
                  description: "رحلة عبر تاريخ الحضارة الإسلامية في الأندلس",
                  host: "د. محمد المؤرخ",
                  participants: 123,
                  category: "تاريخ",
                  country: "المغرب",
                  status: "مباشر",
                  duration: "1 ساعة 20 دقيقة",
                },
                {
                  name: "الذكاء الاصطناعي والمستقبل",
                  description: "مناقشة تأثير التكنولوجيا على المجتمع العربي",
                  host: "م. أحمد التقني",
                  participants: 89,
                  category: "تقنية",
                  country: "الإمارات",
                  status: "مباشر",
                  duration: "30 دقيقة",
                },
                {
                  name: "الشعر النبطي",
                  description: "أمسية شعرية للشعر النبطي الأصيل",
                  host: "الشاعر عبدالله",
                  participants: 156,
                  category: "شعر",
                  country: "السعودية",
                  status: "مباشر",
                  duration: "2 ساعة",
                },
                {
                  name: "فن الخط العربي",
                  description: "تعلم أساسيات الخط العربي وجمالياته",
                  host: "الخطاط محمد",
                  participants: 34,
                  category: "فن",
                  country: "الأردن",
                  status: "مجدول",
                  duration: "غداً 8:00 م",
                },
                {
                  name: "المطبخ العربي التراثي",
                  description: "وصفات تراثية من مختلف البلدان العربية",
                  host: "الشيف فاطمة",
                  participants: 78,
                  category: "طبخ",
                  country: "لبنان",
                  status: "مباشر",
                  duration: "1 ساعة",
                },
              ].map((room, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant={room.status === "مباشر" ? "destructive" : "secondary"} className="font-arabic">
                        {room.status}
                      </Badge>
                      <Badge variant="outline" className="font-arabic">
                        {room.category}
                      </Badge>
                    </div>

                    <h3 className="font-bold font-arabic text-lg mb-2">{room.name}</h3>
                    <p className="text-sm text-muted-foreground font-arabic mb-3 line-clamp-2">{room.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={`/host-.png?height=24&width=24&query=host ${index + 1}`} />
                        <AvatarFallback className="text-xs font-arabic">
                          {room.host.split(" ")[0].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-arabic">{room.host}</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground font-arabic">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {room.participants} مشارك
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {room.country}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground font-arabic">
                        <Clock className="w-4 h-4" />
                        {room.duration}
                      </div>
                    </div>

                    <Button className="w-full font-arabic">{room.status === "مباشر" ? "انضمام الآن" : "تذكيري"}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="people" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "د. أحمد الثقافي",
                  bio: "كاتب ومثقف عربي، متخصص في الأدب العربي الحديث",
                  country: "مصر",
                  followers: 1234,
                  following: 456,
                  rooms: 24,
                  verified: true,
                },
                {
                  name: "فاطمة الشاعرة",
                  bio: "شاعرة سعودية، تكتب في الشعر النبطي والفصيح",
                  country: "السعودية",
                  followers: 856,
                  following: 234,
                  rooms: 18,
                  verified: true,
                },
                {
                  name: "محمد المؤرخ",
                  bio: "مؤرخ أردني، متخصص في التاريخ الإسلامي",
                  country: "الأردن",
                  followers: 692,
                  following: 189,
                  rooms: 31,
                  verified: false,
                },
                {
                  name: "ليلى الكاتبة",
                  bio: "كاتبة لبنانية، تهتم بالأدب النسائي العربي",
                  country: "لبنان",
                  followers: 543,
                  following: 167,
                  rooms: 12,
                  verified: true,
                },
                {
                  name: "عمر التقني",
                  bio: "مهندس برمجيات إماراتي، مهتم بالتكنولوجيا",
                  country: "الإمارات",
                  followers: 389,
                  following: 145,
                  rooms: 8,
                  verified: false,
                },
                {
                  name: "نور الفنانة",
                  bio: "فنانة تشكيلية مغربية، تعمل في الفن المعاصر",
                  country: "المغرب",
                  followers: 267,
                  following: 98,
                  rooms: 6,
                  verified: false,
                },
              ].map((person, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={`/search-person-.png?height=64&width=64&query=person ${index + 1}`} />
                        <AvatarFallback className="font-arabic">{person.name.split(" ")[0].charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold font-arabic">{person.name}</h3>
                          {person.verified && <Star className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground font-arabic mb-1">{person.country}</p>
                        <p className="text-xs text-muted-foreground font-arabic line-clamp-2">{person.bio}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <p className="font-bold text-sm">{person.followers}</p>
                        <p className="text-xs text-muted-foreground font-arabic">متابع</p>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{person.following}</p>
                        <p className="text-xs text-muted-foreground font-arabic">يتابع</p>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{person.rooms}</p>
                        <p className="text-xs text-muted-foreground font-arabic">غرفة</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 font-arabic">متابعة</Button>
                      <Button variant="outline" className="flex-1 font-arabic bg-transparent">
                        رسالة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "الأدب العربي الحديث",
                  description: "مناقشات حول الأعمال الأدبية العربية المعاصرة",
                  rooms: 45,
                  participants: 1234,
                  icon: BookOpen,
                  trending: true,
                },
                {
                  name: "التاريخ الإسلامي",
                  description: "استكشاف تاريخ الحضارة الإسلامية عبر العصور",
                  rooms: 32,
                  participants: 856,
                  icon: Globe,
                  trending: false,
                },
                {
                  name: "الشعر العربي",
                  description: "من الشعر الجاهلي إلى الشعر المعاصر",
                  rooms: 28,
                  participants: 692,
                  icon: Heart,
                  trending: true,
                },
                {
                  name: "التكنولوجيا والمستقبل",
                  description: "تأثير التقنية على المجتمع العربي",
                  rooms: 19,
                  participants: 543,
                  icon: Gamepad2,
                  trending: false,
                },
                {
                  name: "الفن والثقافة",
                  description: "الفنون التراثية والمعاصرة في العالم العربي",
                  rooms: 23,
                  participants: 389,
                  icon: Star,
                  trending: false,
                },
                {
                  name: "الطبخ العربي",
                  description: "وصفات تراثية ومعاصرة من المطبخ العربي",
                  rooms: 15,
                  participants: 267,
                  icon: Coffee,
                  trending: true,
                },
              ].map((topic, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <topic.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold font-arabic">{topic.name}</h3>
                          {topic.trending && <TrendingUp className="w-4 h-4 text-red-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground font-arabic line-clamp-2">{topic.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                      <div>
                        <p className="font-bold text-sm">{topic.rooms}</p>
                        <p className="text-xs text-muted-foreground font-arabic">غرفة</p>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{topic.participants}</p>
                        <p className="text-xs text-muted-foreground font-arabic">مشارك</p>
                      </div>
                    </div>

                    <Button className="w-full font-arabic">استكشاف الموضوع</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
