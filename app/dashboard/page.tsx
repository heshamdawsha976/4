import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  Search,
  Users,
  Mic,
  Video,
  Globe,
  Music,
  BookOpen,
  Coffee,
  Gamepad2,
  TrendingUp,
  Clock,
  MapPin,
  Settings,
  Bell,
  Plus,
  Star,
  Crown,
  Heart,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      {/* Header */}
      <header className="border-b bg-background/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  لقاء
                </h1>
              </div>
              <div className="hidden md:flex relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="ابحث عن غرف أو أشخاص..."
                  className="w-80 pr-10 font-arabic text-right bg-muted/50 border-primary/20 focus:border-primary/50"
                  dir="rtl"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                <AvatarImage src="/arabic-user-avatar.png" />
                <AvatarFallback className="font-arabic bg-primary/10">أح</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Quick Actions */}
              <Card className="gradient-card border-primary/10 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-arabic text-primary">إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start font-arabic gradient-primary text-primary-foreground shadow-md hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4 ml-2" />
                    إنشاء غرفة جديدة
                  </Button>
                  <Button className="w-full justify-start font-arabic hover:bg-primary/10" variant="ghost">
                    <Users className="w-4 h-4 ml-2" />
                    دعوة أصدقاء
                  </Button>
                  <Button className="w-full justify-start font-arabic hover:bg-primary/10" variant="ghost">
                    <Search className="w-4 h-4 ml-2" />
                    استكشاف الغرف
                  </Button>
                </CardContent>
              </Card>

              {/* Online Friends */}
              <Card className="gradient-card border-primary/10 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-arabic">الأصدقاء المتصلون</CardTitle>
                  <CardDescription className="font-arabic">12 صديق متصل</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "فاطمة أحمد", country: "مصر", status: "في غرفة الثقافة" },
                    { name: "محمد علي", country: "السعودية", status: "متاح للدردشة" },
                    { name: "ليلى حسن", country: "لبنان", status: "في غرفة الشعر" },
                    { name: "عمر خالد", country: "الأردن", status: "متاح للدردشة" },
                  ].map((friend, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={`/arabic-person-.png?height=32&width=32&query=arabic person ${index + 1}`}
                          />
                          <AvatarFallback className="font-arabic text-xs">
                            {friend.name.split(" ")[0].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium font-arabic truncate">{friend.name}</p>
                        <p className="text-xs text-muted-foreground font-arabic truncate">{friend.status}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-sm font-arabic">
                    عرض جميع الأصدقاء
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="featured" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="featured"
                  className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  مميزة
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  رائجة
                </TabsTrigger>
                <TabsTrigger
                  value="country"
                  className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  حسب الدولة
                </TabsTrigger>
                <TabsTrigger
                  value="interests"
                  className="font-arabic data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  الاهتمامات
                </TabsTrigger>
              </TabsList>

              {/* Featured Rooms */}
              <TabsContent value="featured" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    الغرف المميزة
                  </h2>
                  <Button
                    variant="outline"
                    className="font-arabic bg-transparent border-primary/30 hover:bg-primary/10"
                  >
                    عرض الكل
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "غرفة الثقافة العربية",
                      description: "نقاشات ثقافية وتراثية من جميع أنحاء العالم العربي",
                      participants: 245,
                      country: "عام",
                      category: "ثقافة",
                      isLive: true,
                      hasVideo: true,
                      moderator: "د. أحمد الثقافي",
                      rating: 4.8,
                      isPremium: true,
                    },
                    {
                      title: "مقهى الشعر والأدب",
                      description: "أمسيات شعرية وأدبية مع شعراء وكتاب عرب",
                      participants: 189,
                      country: "عام",
                      category: "أدب",
                      isLive: true,
                      hasVideo: false,
                      moderator: "الشاعرة ليلى",
                      rating: 4.6,
                      isPremium: false,
                    },
                    {
                      title: "تكنولوجيا المستقبل",
                      description: "مناقشات حول التقنية والذكاء الاصطناعي",
                      participants: 156,
                      country: "عام",
                      category: "تقنية",
                      isLive: true,
                      hasVideo: true,
                      moderator: "م. محمد التقني",
                      rating: 4.7,
                      isPremium: true,
                    },
                    {
                      title: "كافيه الأصدقاء",
                      description: "دردشة عامة ومرحة للتعارف وتكوين صداقات",
                      participants: 312,
                      country: "عام",
                      category: "عام",
                      isLive: true,
                      hasVideo: false,
                      moderator: "فريق الإدارة",
                      rating: 4.5,
                      isPremium: false,
                    },
                  ].map((room, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-xl transition-all duration-300 cursor-pointer gradient-card border-primary/10 hover:border-primary/30 group"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg font-arabic group-hover:text-primary transition-colors">
                                {room.title}
                              </CardTitle>
                              {room.isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                              {room.isLive && (
                                <Badge className="text-xs font-arabic bg-red-500 hover:bg-red-600 animate-pulse">
                                  مباشر
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(room.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground font-arabic">{room.rating}</span>
                            </div>
                            <CardDescription className="font-arabic text-sm">{room.description}</CardDescription>
                          </div>
                          <div className="flex gap-1">
                            {room.hasVideo && <Video className="w-4 h-4 text-primary" />}
                            <Mic className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                              <Users className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium text-primary">{room.participants}</span>
                            </div>
                            <Badge
                              variant="secondary"
                              className="font-arabic text-xs bg-secondary/20 text-secondary border-secondary/30"
                            >
                              {room.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground font-arabic">{room.country}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 ring-1 ring-primary/20">
                              <AvatarImage src={`/moderator-.png?height=24&width=24&query=moderator ${index + 1}`} />
                              <AvatarFallback className="text-xs font-arabic bg-primary/10">
                                {room.moderator.split(" ")[0].charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground font-arabic">{room.moderator}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="p-1 h-8 w-8 hover:bg-primary/10">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              className="font-arabic gradient-primary shadow-md hover:shadow-lg transition-all"
                            >
                              انضمام
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Trending Rooms */}
              <TabsContent value="trending" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-arabic">الغرف الرائجة</h2>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground font-arabic">آخر 24 ساعة</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "نقاش كرة القدم العربية",
                      participants: 456,
                      growth: "+89%",
                      category: "رياضة",
                      time: "منذ ساعتين",
                    },
                    {
                      title: "طبخات عربية أصيلة",
                      participants: 234,
                      growth: "+67%",
                      category: "طبخ",
                      time: "منذ 3 ساعات",
                    },
                    {
                      title: "موسيقى عربية كلاسيكية",
                      participants: 189,
                      growth: "+45%",
                      category: "موسيقى",
                      time: "منذ ساعة",
                    },
                    {
                      title: "تعلم اللغات الأجنبية",
                      participants: 167,
                      growth: "+34%",
                      category: "تعليم",
                      time: "منذ 4 ساعات",
                    },
                  ].map((room, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold font-arabic mb-1">{room.title}</h3>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{room.participants}</span>
                              </div>
                              <Badge variant="outline" className="text-green-600 border-green-600 font-arabic text-xs">
                                {room.growth}
                              </Badge>
                            </div>
                          </div>
                          <Badge variant="secondary" className="font-arabic text-xs">
                            {room.category}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground font-arabic">{room.time}</span>
                          </div>
                          <Button size="sm" className="font-arabic">
                            انضمام
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Country-based Rooms */}
              <TabsContent value="country" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    غرف حسب الدولة
                  </h2>
                  <Button
                    variant="outline"
                    className="font-arabic bg-transparent border-primary/30 hover:bg-primary/10"
                  >
                    اختر دولتك
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { country: "السعودية", rooms: 45, flag: "🇸🇦", rating: 4.7, activeUsers: 1250 },
                    { country: "مصر", rooms: 38, flag: "🇪🇬", rating: 4.6, activeUsers: 980 },
                    { country: "الإمارات", rooms: 29, flag: "🇦🇪", rating: 4.8, activeUsers: 750 },
                    { country: "المغرب", rooms: 24, flag: "🇲🇦", rating: 4.5, activeUsers: 620 },
                    { country: "الأردن", rooms: 19, flag: "🇯🇴", rating: 4.6, activeUsers: 480 },
                    { country: "لبنان", rooms: 16, flag: "🇱🇧", rating: 4.7, activeUsers: 390 },
                  ].map((country, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-xl transition-all duration-300 cursor-pointer gradient-card border-primary/10 hover:border-primary/30 group"
                    >
                      <CardContent className="pt-6 text-center">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{country.flag}</div>
                        <h3 className="font-bold font-arabic mb-2 group-hover:text-primary transition-colors">
                          {country.country}
                        </h3>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(country.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground font-arabic mr-1">{country.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-arabic mb-1">{country.rooms} غرفة نشطة</p>
                        <p className="text-xs text-primary font-arabic mb-4">{country.activeUsers} مستخدم متصل</p>
                        <Button
                          size="sm"
                          className="font-arabic gradient-primary shadow-md hover:shadow-lg transition-all"
                        >
                          استكشاف
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Interest-based Rooms */}
              <TabsContent value="interests" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-arabic">غرف حسب الاهتمامات</h2>
                  <Button
                    variant="outline"
                    className="font-arabic bg-transparent border-primary/30 hover:bg-primary/10"
                  >
                    تخصيص الاهتمامات
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "الثقافة والتراث", icon: Globe, rooms: 23, color: "bg-blue-500" },
                    { name: "الشعر والأدب", icon: BookOpen, rooms: 18, color: "bg-purple-500" },
                    { name: "الموسيقى", icon: Music, rooms: 31, color: "bg-green-500" },
                    { name: "الطبخ", icon: Coffee, rooms: 15, color: "bg-orange-500" },
                    { name: "الألعاب", icon: Gamepad2, rooms: 27, color: "bg-red-500" },
                    { name: "التقنية", icon: Settings, rooms: 12, color: "bg-indigo-500" },
                    { name: "الرياضة", icon: TrendingUp, rooms: 34, color: "bg-yellow-500" },
                    { name: "التعليم", icon: BookOpen, rooms: 19, color: "bg-teal-500" },
                  ].map((interest, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="pt-6 text-center">
                        <div
                          className={`w-12 h-12 ${interest.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                        >
                          <interest.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold font-arabic mb-2">{interest.name}</h3>
                        <p className="text-sm text-muted-foreground font-arabic mb-4">{interest.rooms} غرفة</p>
                        <Button size="sm" variant="outline" className="font-arabic bg-transparent">
                          استكشاف
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
