import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GuestLoginDialog } from "@/components/auth/guest-login"
import { Mic, Video, MessageCircle, Heart, Globe, Star, Shield, Crown, Sparkles, ArrowRight, Play, Users } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-arabic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              لقاء
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="font-arabic hover:bg-pink-50">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/register">
              <Button className="font-arabic bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg">
                إنشاء حساب
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-25 animate-pulse"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Badge
            className="mb-8 font-arabic text-lg px-6 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-pink-200"
            variant="secondary"
          >
            <Sparkles className="w-4 h-4 ml-2" />
            تطبيق الدردشة الاجتماعي الأول في العالم العربي
          </Badge>

          <h2 className="text-6xl md:text-7xl font-bold mb-8 font-arabic text-balance leading-tight">
            تواصل مع العالم العربي في
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
              {" "}
              لقاء
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-10 font-arabic leading-relaxed max-w-3xl mx-auto">
            انضم إلى غرف الدردشة الصوتية والمرئية، تواصل مع أشخاص من جميع أنحاء العالم العربي، وشارك في محادثات ثقافية
            ممتعة مع نظام صلاحيات متقدم وخطط مميزة
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/rooms">
              <Button
                size="lg"
                className="font-arabic text-lg px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <ArrowRight className="w-5 h-5 ml-2" />
                ابدأ الآن مجاناً
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="font-arabic text-lg px-10 py-4 border-2 border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-all duration-200 bg-transparent"
            >
              <Play className="w-5 h-5 ml-2" />
              شاهد العرض التوضيحي
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">10K+</div>
              <div className="text-sm text-gray-600 font-arabic">مستخدم نشط</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm text-gray-600 font-arabic">غرفة دردشة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600 font-arabic">دعم متواصل</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 bg-white/50 backdrop-blur-sm rounded-3xl mx-4 shadow-xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-6 font-arabic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            مميزات تطبيق لقاء
          </h3>
          <p className="text-gray-600 font-arabic text-xl max-w-2xl mx-auto">
            اكتشف كل ما يمكنك فعله في تطبيق لقاء مع نظام صلاحيات متطور
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-pink-50 to-pink-100">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg">غرف صوتية عالية الجودة</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                انضم إلى محادثات صوتية كريستالية مع تقنيات متقدمة لإلغاء الضوضاء
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg">بث مرئي متطور</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                شارك في مكالمات فيديو جماعية بدقة عالية وبث مباشر احترافي
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg">نظام صلاحيات متكامل</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                أدوار مخصصة (ماستر، سوبر أدمن، أدمن) مع صلاحيات قابلة للتخصيص
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg">خطط مميزة</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                غرف ذهبية وفضية ومميزة مع مزايا حصرية لكل خطة
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-6 font-arabic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            نظام الأدوار والصلاحيات
          </h3>
          <p className="text-gray-600 font-arabic text-xl max-w-2xl mx-auto">
            تحكم كامل في إدارة الغرف مع أدوار متنوعة
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50 to-amber-50">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg text-amber-700">ماستر</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                صلاحيات كاملة لإدارة الغرفة وجميع المشاركين
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-pink-50">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg text-red-700">سوبر أدمن</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                صلاحيات إدارية متقدمة مع إمكانية الإشراف
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg text-blue-700">أدمن</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                صلاحيات أساسية لإدارة المحتوى والمشاركين
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chat Room Preview */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl mx-4 shadow-xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-6 font-arabic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            لقطات من غرف الدردشة
          </h3>
          <p className="text-gray-600 font-arabic text-xl">شاهد كيف تبدو تجربة الدردشة المتطورة في لقاء</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold font-arabic text-lg">غرفة الثقافة العربية</h4>
                    <p className="text-sm text-gray-600 font-arabic">125 مشارك نشط • غرفة ذهبية</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/70 rounded-xl p-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-arabic font-medium">أحمد من المغرب</span>
                    <Mic className="w-4 h-4 text-green-500" />
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">ماستر</Badge>
                  </div>
                  <div className="flex items-center gap-3 bg-white/70 rounded-xl p-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-arabic font-medium">فاطمة من مصر</span>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">أدمن</Badge>
                  </div>
                  <div className="flex items-center gap-3 bg-white/70 rounded-xl p-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full"></div>
                    <span className="text-sm font-arabic font-medium">محمد من السعودية</span>
                    <Badge className="bg-gray-100 text-gray-800 text-xs">عضو</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold font-arabic text-lg">غرفة الشعر والأدب</h4>
                    <p className="text-sm text-gray-600 font-arabic">89 مشارك نشط • غرفة مميزة</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/80 rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-arabic mb-2">"البحر يهدر والأمواج تغني..."</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 font-arabic">ليلى من لبنان</span>
                      <Badge className="bg-red-100 text-red-800 text-xs">سوبر أدمن</Badge>
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-arabic mb-2">"شعر جميل جداً! 👏"</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 font-arabic">عمر من الأردن</span>
                      <Badge className="bg-gray-100 text-gray-800 text-xs">عضو</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white shadow-2xl border-0">
          <CardContent className="p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-indigo-600/20"></div>
            <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full"></div>

            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 font-arabic">ابدأ رحلتك في لقاء اليوم</h3>
              <p className="text-xl mb-10 font-arabic opacity-90 max-w-3xl mx-auto leading-relaxed">
                انضم إلى آلاف المستخدمين من جميع أنحاء العالم العربي واكتشف تجربة دردشة جديدة ومميزة مع نظام صلاحيات
                متطور وخطط حصرية
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="font-arabic text-lg px-10 py-4 bg-white text-purple-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                    إنشاء حساب مجاني
                  </Button>
                </Link>
                <Link href="/plans">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-arabic text-lg px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Crown className="w-5 h-5 ml-2" />
                    اكت��ف الخطط المميزة
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold font-arabic text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  لقاء
                </span>
              </div>
              <p className="text-sm text-gray-600 font-arabic">تطبيق الدردشة الاجتماعي الأول في العالم العربي</p>
            </div>

            <div>
              <h4 className="font-bold font-arabic mb-4">المنتج</h4>
              <ul className="space-y-2 text-sm text-gray-600 font-arabic">
                <li>
                  <Link href="/rooms" className="hover:text-pink-600">
                    غرف الدردشة
                  </Link>
                </li>
                <li>
                  <Link href="/plans" className="hover:text-pink-600">
                    الخطط والأسعار
                  </Link>
                </li>
                <li>
                  <Link href="/admin/rooms" className="hover:text-pink-600">
                    إدارة الغرف
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold font-arabic mb-4">الدعم</h4>
              <ul className="space-y-2 text-sm text-gray-600 font-arabic">
                <li>
                  <a href="#" className="hover:text-pink-600">
                    مركز المساعدة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600">
                    اتصل بنا
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600">
                    الأسئلة الشائعة
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold font-arabic mb-4">الشركة</h4>
              <ul className="space-y-2 text-sm text-gray-600 font-arabic">
                <li>
                  <a href="#" className="hover:text-pink-600">
                    من نحن
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600">
                    سياسة الخصوصية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600">
                    شروط الاستخدام
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 font-arabic mb-4 md:mb-0">© 2024 لقاء. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-arabic">تابعنا على:</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center hover:bg-pink-200 cursor-pointer transition-colors">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center hover:bg-purple-200 cursor-pointer transition-colors">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
