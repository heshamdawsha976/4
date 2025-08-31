import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Settings,
  Edit3,
  MapPin,
  Calendar,
  Users,
  MessageCircle,
  Heart,
  Gift,
  Trophy,
  Star,
  Camera,
  Share,
  MoreVertical,
  ArrowLeft,
  Crown,
  Mic,
  Clock,
  Zap,
  TrendingUp,
  Flame,
  Shield,
  Sparkles,
  ThumbsUp,
  Eye,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary/15 via-primary/10 to-secondary/10 border-b backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Share className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32 ring-4 ring-primary/20 shadow-xl">
                <AvatarImage src="/arabic-user-avatar.png" />
                <AvatarFallback className="text-2xl font-arabic gradient-primary text-primary-foreground">
                  أح
                </AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full gradient-primary shadow-lg">
                <Camera className="w-4 h-4" />
              </Button>
              <div className="absolute -top-2 -left-2 w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xs font-bold text-primary-foreground">25</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  أحمد محمد الثقافي
                </h1>
                <Badge className="font-arabic gradient-primary text-primary-foreground shadow-md">
                  <Crown className="w-3 h-3 ml-1" />
                  عضو مميز
                </Badge>
                <Badge variant="outline" className="font-arabic border-yellow-500 text-yellow-600">
                  <Star className="w-3 h-3 ml-1 fill-yellow-500" />
                  خبير
                </Badge>
              </div>
              <p className="text-muted-foreground font-arabic mb-4">كاتب ومثقف عربي، أحب مناقشة التراث والأدب العربي</p>

              <div className="flex items-center justify-center md:justify-start gap-6 text-sm mb-4">
                <div className="flex items-center gap-1 text-muted-foreground font-arabic">
                  <MapPin className="w-4 h-4" />
                  القاهرة، مصر
                </div>
                <div className="flex items-center gap-1 text-muted-foreground font-arabic">
                  <Calendar className="w-4 h-4" />
                  انضم في يناير 2024
                </div>
                <div className="flex items-center gap-1 text-primary font-arabic">
                  <Flame className="w-4 h-4" />
                  نشاط عالي
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-sm font-arabic text-muted-foreground">المستوى 25</span>
                  <Progress value={75} className="w-32 h-2" />
                  <span className="text-sm font-arabic text-muted-foreground">المستوى 26</span>
                </div>
                <p className="text-xs text-muted-foreground font-arabic">2,450 نقطة • 550 نقطة للمستوى التالي</p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4">
                <Button className="font-arabic gradient-primary shadow-md hover:shadow-lg transition-all">
                  <Edit3 className="w-4 h-4 ml-2" />
                  تعديل الملف الشخصي
                </Button>
                <Button
                  variant="outline"
                  className="font-arabic bg-background/80 border-primary/30 hover:bg-primary/10"
                >
                  <Settings className="w-4 h-4 ml-2" />
                  الإعدادات
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "المتابعون", value: "1.2K", icon: Users, color: "text-blue-500" },
              { label: "ساعات المحادثة", value: "156", icon: Clock, color: "text-green-500" },
              { label: "التقييم", value: "4.9", icon: Star, color: "text-yellow-500" },
              { label: "الإنجازات", value: "12", icon: Trophy, color: "text-purple-500" },
            ].map((stat, index) => (
              <Card key={index} className="text-center gradient-card border-primary/10 hover:shadow-lg transition-all">
                <CardContent className="pt-4">
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-arabic">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-4 font-arabic bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="activity"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
                >
                  النشاطات
                </TabsTrigger>
                <TabsTrigger
                  value="rooms"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
                >
                  الغرف
                </TabsTrigger>
                <TabsTrigger
                  value="friends"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
                >
                  الأصدقاء
                </TabsTrigger>
                <TabsTrigger
                  value="media"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
                >
                  الوسائط
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="space-y-6">
                {/* Recent Activities */}
                {[
                  {
                    type: "joined_room",
                    room: "غرفة الشعر العربي",
                    time: "منذ ساعتين",
                    participants: 45,
                    points: 15,
                  },
                  {
                    type: "hosted_room",
                    room: "نقاش حول التراث الإسلامي",
                    time: "أمس",
                    participants: 120,
                    points: 50,
                  },
                  {
                    type: "received_gift",
                    from: "فاطمة أحمد",
                    gift: "وردة",
                    time: "منذ يومين",
                    points: 10,
                  },
                  {
                    type: "achievement",
                    achievement: "متحدث نشط",
                    time: "منذ 3 أيام",
                    points: 100,
                  },
                ].map((activity, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all gradient-card border-primary/10">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-md">
                          {activity.type === "joined_room" && <Users className="w-6 h-6 text-primary-foreground" />}
                          {activity.type === "hosted_room" && <Mic className="w-6 h-6 text-primary-foreground" />}
                          {activity.type === "received_gift" && <Gift className="w-6 h-6 text-primary-foreground" />}
                          {activity.type === "achievement" && <Trophy className="w-6 h-6 text-primary-foreground" />}
                        </div>
                        <div className="flex-1">
                          {activity.type === "joined_room" && (
                            <p className="font-arabic">
                              انضم إلى <span className="font-bold text-primary">{activity.room}</span>
                              {activity.participants && (
                                <span className="text-muted-foreground"> • {activity.participants} مشارك</span>
                              )}
                            </p>
                          )}
                          {activity.type === "hosted_room" && (
                            <p className="font-arabic">
                              استضاف غرفة <span className="font-bold text-primary">{activity.room}</span>
                              {activity.participants && (
                                <span className="text-muted-foreground"> • {activity.participants} مشارك</span>
                              )}
                            </p>
                          )}
                          {activity.type === "received_gift" && (
                            <p className="font-arabic">
                              تلقى هدية <span className="font-bold text-primary">{activity.gift}</span> من{" "}
                              <span className="font-bold">{activity.from}</span>
                            </p>
                          )}
                          {activity.type === "achievement" && (
                            <p className="font-arabic">
                              حصل على إنجاز <span className="font-bold text-primary">{activity.achievement}</span>
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            <p className="text-sm text-muted-foreground font-arabic flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {activity.time}
                            </p>
                            <Badge variant="outline" className="text-xs font-arabic border-primary/30">
                              <Zap className="w-3 h-3 ml-1 text-yellow-500" />+{activity.points} نقطة
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="rooms" className="space-y-4">
                <div className="grid gap-4">
                  {[
                    {
                      name: "غرفة الثقافة العربية",
                      description: "مناقشات حول التراث والثقافة العربية",
                      participants: 245,
                      role: "مدير",
                      status: "نشط",
                    },
                    {
                      name: "نادي الكتاب العربي",
                      description: "قراءة ومناقشة الكتب العربية الحديثة",
                      participants: 89,
                      role: "مشارك",
                      status: "غير نشط",
                    },
                    {
                      name: "شعراء العصر الحديث",
                      description: "منصة لمشاركة ومناقشة الشعر العربي",
                      participants: 156,
                      role: "مشارك",
                      status: "نشط",
                    },
                  ].map((room, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold font-arabic">{room.name}</h3>
                              <Badge variant={room.role === "مدير" ? "default" : "secondary"} className="font-arabic">
                                {room.role}
                              </Badge>
                              <Badge
                                variant={room.status === "نشط" ? "destructive" : "outline"}
                                className="font-arabic"
                              >
                                {room.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-arabic mb-2">{room.description}</p>
                            <p className="text-sm text-muted-foreground font-arabic flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {room.participants} مشارك
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                            دخول
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="friends" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "فاطمة أحمد", country: "السعودية", status: "متصل", mutual: 12, level: 18 },
                    { name: "محمد علي", country: "الأردن", status: "غير متصل", mutual: 8, level: 22 },
                    { name: "ليلى حسن", country: "لبنان", status: "متصل", mutual: 15, level: 16 },
                    { name: "عمر خالد", country: "الكويت", status: "غير متصل", mutual: 6, level: 20 },
                    { name: "نور الدين", country: "المغرب", status: "متصل", mutual: 9, level: 14 },
                    { name: "رانيا سالم", country: "تونس", status: "غير متصل", mutual: 11, level: 19 },
                  ].map((friend, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all gradient-card border-primary/10">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                              <AvatarImage src={`/friend-.png?height=48&width=48&query=arabic friend ${index + 1}`} />
                              <AvatarFallback className="font-arabic gradient-primary text-primary-foreground">
                                {friend.name.split(" ")[0].charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                                friend.status === "متصل" ? "bg-green-500" : "bg-gray-400"
                              }`}
                            ></div>
                            <div className="absolute -top-1 -left-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-primary-foreground">{friend.level}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold font-arabic">{friend.name}</h4>
                            <p className="text-sm text-muted-foreground font-arabic">{friend.country}</p>
                            <p className="text-xs text-muted-foreground font-arabic">{friend.mutual} صديق مشترك</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="hover:bg-primary/10 bg-transparent">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-primary/10 bg-transparent">
                              <UserPlus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="aspect-square">
                      <CardContent className="p-0 h-full">
                        <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Stats */}
            <Card className="gradient-card border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  الإحصائيات التفصيلية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "الغرف المستضافة", value: 24, icon: Mic, progress: 80 },
                  { label: "ساعات المحادثة", value: 156, icon: Clock, progress: 65 },
                  { label: "الأصدقاء", value: 89, icon: Users, progress: 90 },
                  { label: "الهدايا المتلقاة", value: 45, icon: Gift, progress: 55 },
                  { label: "التقييمات الإيجابية", value: 234, icon: ThumbsUp, progress: 95 },
                  { label: "المشاهدات", value: "2.1K", icon: Eye, progress: 75 },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <stat.icon className="w-4 h-4 text-primary" />
                        <span className="font-arabic text-sm">{stat.label}</span>
                      </div>
                      <Badge variant="secondary" className="font-arabic">
                        {stat.value}
                      </Badge>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Achievements */}
            <Card className="gradient-card border-primary/10 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  الإنجازات والشارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "متحدث نشط", icon: Mic, color: "text-blue-500", rarity: "شائع", progress: 100 },
                  { name: "مضيف محترف", icon: Crown, color: "text-yellow-500", rarity: "نادر", progress: 100 },
                  { name: "صديق اجتماعي", icon: Heart, color: "text-red-500", rarity: "شائع", progress: 100 },
                  { name: "نجم الغرفة", icon: Star, color: "text-purple-500", rarity: "أسطوري", progress: 100 },
                  { name: "خبير الثقافة", icon: Shield, color: "text-green-500", rarity: "نادر", progress: 75 },
                  { name: "ملهم المجتمع", icon: Sparkles, color: "text-pink-500", rarity: "أسطوري", progress: 45 },
                ].map((achievement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-md ${achievement.progress === 100 ? "" : "opacity-50"}`}
                      >
                        <achievement.icon className={`w-5 h-5 text-primary-foreground`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-arabic text-sm font-medium">{achievement.name}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs font-arabic ${
                              achievement.rarity === "أسطوري"
                                ? "border-purple-500 text-purple-600"
                                : achievement.rarity === "نادر"
                                  ? "border-yellow-500 text-yellow-600"
                                  : "border-gray-500 text-gray-600"
                            }`}
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                        {achievement.progress < 100 && <Progress value={achievement.progress} className="h-1 mt-1" />}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
