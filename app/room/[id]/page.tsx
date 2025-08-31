"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GuestEntryDialog } from "@/components/room/guest-entry-dialog"
import { InteractiveReactions } from "@/components/room/interactive-reactions"
import {
  MessageCircle,
  Mic,
  MicOff,
  VideoOff,
  Users,
  Settings,
  Share,
  Heart,
  Gift,
  Send,
  MoreVertical,
  Volume2,
  PhoneOff,
  Crown,
  Shield,
  ArrowLeft,
  Hand,
  Star,
  ThumbsUp,
  Smile,
  Camera,
  Music,
  Zap,
  Trophy,
  File as Fire,
  Sparkles,
  Ban,
  UserMinus,
  UserPlus,
  AlertTriangle,
  Eye,
  VolumeX,
  MessageSquare,
  Flag,
  UserCheck,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  const [showGuestDialog, setShowGuestDialog] = useState(false)
  const [isGuest, setIsGuest] = useState(true) // افتراض أن المستخدم زائر
  const [guestData, setGuestData] = useState<{ displayName: string; country: string } | null>(null)

  const handleGuestJoin = (data: { displayName: string; country: string }) => {
    setGuestData(data)
    setIsGuest(true)
  }

  const handleReactionSend = (reaction: string) => {
    console.log("Reaction sent:", reaction)
    // هنا يمكن إرسال التفاعل للخادم
  }

  return (
    <div className="h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex flex-col">
      {/* Room Header */}
      <header className="border-b bg-background/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/rooms">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-arabic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    غرفة الثقافة العربية
                  </h1>
                  <div className="flex items-center gap-3">
                    <Badge className="text-xs font-arabic bg-red-500 hover:bg-red-600 animate-pulse shadow-md">
                      🔴 مباشر
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary font-arabic">245 مشارك</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-muted-foreground font-arabic">4.8</span>
                    </div>
                    {isGuest && guestData && (
                      <Badge
                        variant="outline"
                        className="text-xs font-arabic border-green-500 text-green-600 bg-green-50"
                      >
                        <UserCheck className="w-3 h-3 ml-1" />
                        زائر: {guestData.displayName}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!guestData && (
                <Button
                  onClick={() => setShowGuestDialog(true)}
                  className="font-arabic bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <UserPlus className="w-4 h-4 ml-2" />
                  دخول كزائر
                </Button>
              )}

              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Heart className="w-5 h-5 text-red-500" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Share className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10" title="أدوات الإشراف">
                    <Shield className="w-5 h-5 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-arabic">أدوات الإشراف</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-arabic">
                    <UserPlus className="w-4 h-4 ml-2" />
                    ترقية مستخدم
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-arabic">
                    <UserMinus className="w-4 h-4 ml-2" />
                    تخفيض رتبة
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-arabic">
                    <Ban className="w-4 h-4 ml-2" />
                    كتم مؤقت
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-arabic">
                    <Flag className="w-4 h-4 ml-2" />
                    عرض التقارير
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-arabic">
                    <Settings className="w-4 h-4 ml-2" />
                    إعدادات الغرفة
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Voice/Video Area */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 p-6 border-b">
            <div className="max-w-4xl mx-auto">
              {/* Current Speakers */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold font-arabic flex items-center gap-2">
                    <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                      <Mic className="w-4 h-4 text-primary-foreground" />
                    </div>
                    المتحدثون الآن
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Fire className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-arabic text-muted-foreground">نشاط عالي</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-arabic text-muted-foreground">غرفة مميزة</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      name: "د. أحمد الثقافي",
                      role: "master",
                      roleArabic: "ماستر",
                      country: "مصر",
                      speaking: true,
                      likes: 45,
                    },
                    {
                      name: "فاطمة محمد",
                      role: "super-admin",
                      roleArabic: "سوبر أدمن",
                      country: "السعودية",
                      speaking: true,
                      likes: 32,
                    },
                    {
                      name: "محمد علي",
                      role: "admin",
                      roleArabic: "أدمن",
                      country: "الأردن",
                      speaking: false,
                      likes: 18,
                    },
                    {
                      name: "ليلى حسن",
                      role: "participant",
                      roleArabic: "مشارك",
                      country: "لبنان",
                      speaking: false,
                      likes: 24,
                    },
                  ].map((speaker, index) => (
                    <Card
                      key={index}
                      className={`text-center transition-all duration-300 hover:shadow-lg gradient-card border-primary/20 group ${
                        speaker.speaking ? "ring-2 ring-primary shadow-lg scale-105" : "hover:scale-102"
                      }`}
                    >
                      <CardContent className="pt-4">
                        <div className="relative mb-3">
                          <Avatar className="w-16 h-16 mx-auto ring-2 ring-primary/20">
                            <AvatarImage src={`/speaker-.png?height=64&width=64&query=arabic speaker ${index + 1}`} />
                            <AvatarFallback className="font-arabic gradient-primary text-primary-foreground">
                              {speaker.name.split(" ")[0].charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {speaker.role === "master" && (
                            <Crown className="absolute -top-1 -right-1 w-5 h-5 text-red-500 drop-shadow-sm" />
                          )}
                          {speaker.role === "super-admin" && (
                            <Shield className="absolute -top-1 -right-1 w-5 h-5 text-purple-500 drop-shadow-sm" />
                          )}
                          {speaker.role === "admin" && (
                            <Star className="absolute -top-1 -right-1 w-5 h-5 text-blue-500 drop-shadow-sm" />
                          )}
                          {speaker.speaking && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                              <Mic className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="absolute -top-1 -left-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
                              >
                                <MoreVertical className="w-3 h-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel className="font-arabic">{speaker.name}</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="font-arabic">
                                <MessageSquare className="w-4 h-4 ml-2" />
                                رسالة خاصة
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-arabic">
                                <UserPlus className="w-4 h-4 ml-2" />
                                ترقية الدور
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-arabic">
                                <VolumeX className="w-4 h-4 ml-2" />
                                كتم مؤقت
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-arabic text-red-600">
                                <Ban className="w-4 h-4 ml-2" />
                                طرد من الغرفة
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <h4 className="font-bold font-arabic text-sm mb-1">{speaker.name}</h4>
                        <p className="text-xs text-muted-foreground font-arabic mb-2">{speaker.country}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs font-arabic mb-2 ${
                            speaker.role === "master"
                              ? "border-red-500 text-red-600 bg-red-50"
                              : speaker.role === "super-admin"
                                ? "border-purple-500 text-purple-600 bg-purple-50"
                                : speaker.role === "admin"
                                  ? "border-blue-500 text-blue-600 bg-blue-50"
                                  : "border-primary/30"
                          }`}
                        >
                          {speaker.roleArabic}
                        </Badge>
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10">
                            <Heart className="w-3 h-3 text-red-500" />
                          </Button>
                          <span className="text-xs text-muted-foreground font-arabic">{speaker.likes}</span>
                          <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10">
                            <Gift className="w-3 h-3 text-primary" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Enhanced Audio Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-arabic bg-background/80 backdrop-blur-sm hover:bg-primary/10 border-primary/30"
                >
                  <Hand className="w-5 h-5 ml-2" />
                  رفع اليد
                </Button>
                <Button size="lg" className="bg-red-500 text-white hover:bg-red-600 shadow-lg">
                  <MicOff className="w-5 h-5" />
                </Button>
                <Button size="lg" className="bg-gray-500 text-white hover:bg-gray-600 shadow-lg">
                  <VideoOff className="w-5 h-5" />
                </Button>
                <Button size="lg" className="bg-green-500 text-white hover:bg-green-600 shadow-lg">
                  <Volume2 className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-arabic bg-background/80 backdrop-blur-sm hover:bg-primary/10 border-primary/30"
                >
                  <ThumbsUp className="w-5 h-5 ml-2" />
                  إعجاب
                </Button>
                <Button size="lg" variant="destructive" className="shadow-lg">
                  <PhoneOff className="w-5 h-5 ml-2" />
                  <span className="font-arabic">مغادرة</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Text Chat */}
          <div className="flex-1 flex flex-col bg-background/50 backdrop-blur-sm">
            <div className="border-b p-4 bg-background/80">
              <div className="flex items-center justify-between">
                <h3 className="font-bold font-arabic flex items-center gap-2">
                  <div className="w-5 h-5 gradient-primary rounded-full flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 text-primary-foreground" />
                  </div>
                  الدردشة النصية
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-muted-foreground font-arabic">نشط</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="font-arabic text-xs hover:bg-primary/10">
                        <Settings className="w-4 h-4 ml-1" />
                        إدارة
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel className="font-arabic">إدارة الدردشة</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="font-arabic">
                        <Eye className="w-4 h-4 ml-2" />
                        وضع المراقبة
                      </DropdownMenuItem>
                      <DropdownMenuItem className="font-arabic">
                        <VolumeX className="w-4 h-4 ml-2" />
                        كتم الدردشة
                      </DropdownMenuItem>
                      <DropdownMenuItem className="font-arabic">
                        <AlertTriangle className="w-4 h-4 ml-2" />
                        تفعيل الفلترة
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="ghost" size="sm" className="font-arabic text-xs hover:bg-primary/10">
                    <Smile className="w-4 h-4 ml-1" />
                    رموز
                  </Button>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {[
                  {
                    user: "فاطمة محمد",
                    country: "السعودية",
                    message: "مرحباً بالجميع! موضوع رائع اليوم 🌟",
                    time: "منذ دقيقتين",
                    type: "text",
                    likes: 12,
                    hasGift: false,
                    role: "super-admin",
                  },
                  {
                    user: "محمد علي",
                    country: "الأردن",
                    message: "أتفق معك تماماً، الثقافة العربية غنية جداً ✨",
                    time: "منذ دقيقة",
                    type: "text",
                    likes: 8,
                    hasGift: true,
                    role: "admin",
                  },
                  {
                    user: "ليلى حسن",
                    country: "لبنان",
                    message: "هل يمكنني المشاركة في الحديث؟ 🙋‍♀️",
                    time: "منذ 30 ثانية",
                    type: "text",
                    likes: 5,
                    hasGift: false,
                    role: "participant",
                  },
                  {
                    user: "د. أحمد الثقافي",
                    country: "مصر",
                    message: "بالطبع ليلى، ارفعي يدك وسأعطيك الإذن 👍",
                    time: "الآن",
                    type: "text",
                    isModerator: true,
                    likes: 15,
                    hasGift: false,
                    role: "master",
                  },
                ].map((chat, index) => (
                  <div key={index} className="flex gap-3 group hover:bg-accent/30 p-2 rounded-lg transition-colors">
                    <div className="relative">
                      <Avatar className="w-8 h-8 ring-1 ring-primary/20">
                        <AvatarImage src={`/chat-user-.png?height=32&width=32&query=arabic user ${index + 1}`} />
                        <AvatarFallback className="font-arabic text-xs gradient-primary text-primary-foreground">
                          {chat.user.split(" ")[0].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {chat.role === "master" && <Crown className="absolute -top-1 -right-1 w-3 h-3 text-red-500" />}
                      {chat.role === "super-admin" && (
                        <Shield className="absolute -top-1 -right-1 w-3 h-3 text-purple-500" />
                      )}
                      {chat.role === "admin" && <Star className="absolute -top-1 -right-1 w-3 h-3 text-blue-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold font-arabic text-sm">{chat.user}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs font-arabic ${
                            chat.role === "master"
                              ? "border-red-500 text-red-600 bg-red-50"
                              : chat.role === "super-admin"
                                ? "border-purple-500 text-purple-600 bg-purple-50"
                                : chat.role === "admin"
                                  ? "border-blue-500 text-blue-600 bg-blue-50"
                                  : "border-gray-300 text-gray-600 bg-gray-50"
                          }`}
                        >
                          {chat.role === "master"
                            ? "ماستر"
                            : chat.role === "super-admin"
                              ? "سوبر أدمن"
                              : chat.role === "admin"
                                ? "أدمن"
                                : "مشارك"}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-arabic">{chat.country}</span>
                        <span className="text-xs text-muted-foreground font-arabic">{chat.time}</span>
                        {chat.hasGift && <Sparkles className="w-3 h-3 text-yellow-500" />}
                      </div>
                      <p className="text-sm font-arabic mb-2">{chat.message}</p>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span className="text-xs font-arabic mr-1">{chat.likes}</span>
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10">
                          <Gift className="w-3 h-3 text-primary" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10">
                          <Smile className="w-3 h-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem className="font-arabic">
                              <Flag className="w-3 h-3 ml-2" />
                              إبلاغ
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-arabic">
                              <Ban className="w-3 h-3 ml-2" />
                              حذف الرسالة
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-arabic">
                              <AlertTriangle className="w-3 h-3 ml-2" />
                              تحذير
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Enhanced Message Input */}
            <div className="border-t p-4 bg-background/80 backdrop-blur-sm">
              {isGuest && !guestData && (
                <Card className="border-orange-200 bg-orange-50 mb-4">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-orange-600" />
                        <p className="font-arabic text-orange-800 text-sm">انضم كزائر للمشاركة في الدردشة</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => setShowGuestDialog(true)}
                        className="font-arabic bg-orange-600 hover:bg-orange-700"
                      >
                        انضمام
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-2 mb-3">
                <div className="flex gap-1">
                  {["❤️", "👏", "😍", "🔥", "✨", "👍"].map((emoji, index) => (
                    <Button key={index} size="sm" variant="ghost" className="p-1 h-8 w-8 hover:bg-primary/10">
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder={guestData ? "اكتب رسالتك هنا..." : "انضم كزائر للمشاركة..."}
                    className="font-arabic text-right bg-background/80 border-primary/20 focus:border-primary/50"
                    dir="rtl"
                    disabled={!guestData}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary/10 border-primary/20 bg-transparent"
                    disabled={!guestData}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary/10 border-primary/20 bg-transparent"
                    disabled={!guestData}
                  >
                    <Music className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary/10 border-primary/20 bg-transparent"
                    disabled={isGuest}
                    title={isGuest ? "سجل دخولك لإرسال الهدايا" : "إرسال هدية"}
                  >
                    <Gift className="w-4 h-4 text-primary" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary/10 border-primary/20 bg-transparent"
                    disabled={!guestData}
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  className="font-arabic gradient-primary shadow-md hover:shadow-lg transition-all"
                  disabled={!guestData}
                >
                  <Send className="w-4 h-4 ml-2" />
                  إرسال
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Participants Sidebar with Interactive Reactions */}
        <div className="w-80 border-l bg-background/30 backdrop-blur-sm flex flex-col">
          <div className="p-4 border-b bg-background/80">
            <div className="flex items-center justify-between">
              <h3 className="font-bold font-arabic flex items-center gap-2">
                <div className="w-5 h-5 gradient-primary rounded-full flex items-center justify-center">
                  <Users className="w-3 h-3 text-primary-foreground" />
                </div>
                المشاركون (245)
              </h3>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10" title="الماسترز">
                  <Crown className="w-3 h-3 text-red-500" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10" title="السوبر أدمن">
                  <Shield className="w-3 h-3 text-purple-500" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10" title="الأدمن">
                  <Star className="w-3 h-3 text-blue-500" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10" title="المتحدثون">
                  <Mic className="w-3 h-3 text-green-500" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 border-b">
            <InteractiveReactions onReactionSend={handleReactionSend} isGuest={isGuest} />
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Masters */}
              <div>
                <h4 className="font-bold font-arabic text-sm mb-3 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-red-500" />
                  الماسترز
                  <Badge variant="secondary" className="text-xs font-arabic bg-red-100 text-red-700">
                    1
                  </Badge>
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      name: "د. أحمد الثقافي",
                      country: "مصر",
                      status: "متحدث",
                      level: "خبير",
                      points: 2450,
                      role: "master",
                    },
                  ].map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors group"
                    >
                      <div className="relative">
                        <Avatar className="w-8 h-8 ring-2 ring-red-500/30">
                          <AvatarImage src={`/master-.png?height=32&width=32&query=master ${index + 1}`} />
                          <AvatarFallback className="font-arabic text-xs bg-red-500 text-white">
                            {user.name.split(" ")[0].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Crown className="absolute -top-1 -right-1 w-3 h-3 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium font-arabic text-sm truncate">{user.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground font-arabic">{user.country}</p>
                          <Badge variant="outline" className="text-xs font-arabic border-red-500/30 text-red-600">
                            {user.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-muted-foreground font-arabic">{user.points} نقطة</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs font-arabic opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 border-red-500 text-red-600"
                      >
                        {user.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Super Admins */}
              <div>
                <h4 className="font-bold font-arabic text-sm mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  السوبر أدمن
                  <Badge variant="secondary" className="text-xs font-arabic bg-purple-100 text-purple-700">
                    2
                  </Badge>
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      name: "فاطمة محمد",
                      country: "السعودية",
                      status: "متحدث",
                      level: "محترف",
                      points: 1890,
                      role: "super-admin",
                    },
                    {
                      name: "أ. سارة محمد",
                      country: "الإمارات",
                      status: "مستمع",
                      level: "محترف",
                      points: 1650,
                      role: "super-admin",
                    },
                  ].map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors group"
                    >
                      <div className="relative">
                        <Avatar className="w-8 h-8 ring-2 ring-purple-500/30">
                          <AvatarImage src={`/super-admin-.png?height=32&width=32&query=super admin ${index + 1}`} />
                          <AvatarFallback className="font-arabic text-xs bg-purple-500 text-white">
                            {user.name.split(" ")[0].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Shield className="absolute -top-1 -right-1 w-3 h-3 text-purple-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium font-arabic text-sm truncate">{user.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground font-arabic">{user.country}</p>
                          <Badge variant="outline" className="text-xs font-arabic border-purple-500/30 text-purple-600">
                            {user.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-muted-foreground font-arabic">{user.points} نقطة</span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel className="font-arabic">{user.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="font-arabic">
                              <UserPlus className="w-3 h-3 ml-2" />
                              ترقية إلى ماستر
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-arabic">
                              <UserMinus className="w-3 h-3 ml-2" />
                              تخفيض إلى أدمن
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-arabic">
                              <VolumeX className="w-3 h-3 ml-2" />
                              كتم مؤقت
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-arabic text-red-600">
                              <Ban className="w-3 h-3 ml-2" />
                              إزالة الدور
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Admins */}
              <div>
                <h4 className="font-bold font-arabic text-sm mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-500" />
                  الأدمن
                  <Badge variant="secondary" className="text-xs font-arabic bg-blue-100 text-blue-700">
                    3
                  </Badge>
                </h4>
                <div className="space-y-2">
                  {[
                    {
                      name: "محمد علي",
                      country: "الأردن",
                      status: "متحدث",
                      level: "متقدم",
                      points: 1240,
                      role: "admin",
                    },
                    {
                      name: "ليلى حسن",
                      country: "لبنان",
                      status: "مستمع",
                      level: "متقدم",
                      points: 1180,
                      role: "admin",
                    },
                    {
                      name: "عمر خالد",
                      country: "المغرب",
                      status: "مستمع",
                      level: "متوسط",
                      points: 890,
                      role: "admin",
                    },
                  ].map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors group"
                    >
                      <div className="relative">
                        <Avatar className="w-8 h-8 ring-2 ring-blue-500/30">
                          <AvatarImage src={`/admin-.png?height=32&width=32&query=admin ${index + 1}`} />
                          <AvatarFallback className="font-arabic text-xs bg-blue-500 text-white">
                            {user.name.split(" ")[0].charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Star className="absolute -top-1 -right-1 w-3 h-3 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium font-arabic text-sm truncate">{user.name}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground font-arabic">{user.country}</p>
                          <Badge variant="outline" className="text-xs font-arabic border-blue-500/30 text-blue-600">
                            {user.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-muted-foreground font-arabic">{user.points} نقطة</span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuLabel className="font-arabic">{user.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="font-arabic">
                              <UserPlus className="w-3 h-3 ml-2" />
                              ترقية إلى سوبر أدمن
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-arabic">
                              <UserMinus className="w-3 h-3 ml-2" />
                              تخفيض إلى مشارك
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-arabic">
                              <VolumeX className="w-3 h-3 ml-2" />
                              كتم مؤقت
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-arabic text-red-600">
                              <Ban className="w-3 h-3 ml-2" />
                              إزالة الدور
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Regular Participants */}
              <div>
                <h4 className="font-bold font-arabic text-sm mb-3 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-gray-500" />
                  المشاركون
                  <Badge variant="secondary" className="text-xs font-arabic">
                    237
                  </Badge>
                </h4>
                <div className="space-y-2">
                  {[
                    { name: "أحمد سالم", country: "الإمارات" },
                    { name: "نور الدين", country: "المغرب" },
                    { name: "رانيا أحمد", country: "تونس" },
                    { name: "يوسف محمد", country: "العراق" },
                    { name: "هدى علي", country: "سوريا" },
                  ].map((listener, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent group">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`/listener-.png?height=32&width=32&query=listener ${index + 1}`} />
                        <AvatarFallback className="font-arabic text-xs">
                          {listener.name.split(" ")[0].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium font-arabic text-sm truncate">{listener.name}</p>
                        <p className="text-xs text-muted-foreground font-arabic">{listener.country}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="p-1 h-6 hover:bg-primary/10" title="ترقية">
                              <UserPlus className="w-3 h-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle className="font-arabic">ترقية المستخدم</DialogTitle>
                              <DialogDescription className="font-arabic">
                                اختر الدور الجديد لـ {listener.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label className="font-arabic text-sm font-medium">الدور الجديد</label>
                                <Select>
                                  <SelectTrigger className="font-arabic">
                                    <SelectValue placeholder="اختر الدور" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin" className="font-arabic">
                                      أدمن
                                    </SelectItem>
                                    <SelectItem value="super-admin" className="font-arabic">
                                      سوبر أدمن
                                    </SelectItem>
                                    <SelectItem value="master" className="font-arabic">
                                      ماستر
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex gap-2">
                                <Button className="flex-1 font-arabic gradient-primary">تأكيد الترقية</Button>
                                <Button variant="outline" className="font-arabic bg-transparent">
                                  إلغاء
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-sm font-arabic">
                    عرض المزيد...
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <GuestEntryDialog
        open={showGuestDialog}
        onOpenChange={setShowGuestDialog}
        roomName="غرفة الثقافة العربية"
        roomPlan="gold"
        currentParticipants={245}
        maxParticipants={500}
        onGuestJoin={handleGuestJoin}
      />
    </div>
  )
}
