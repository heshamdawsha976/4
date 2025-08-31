import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GuestLoginDialog } from "@/components/auth/guest-login"
import { 
  Mic, 
  Users, 
  Globe, 
  Play, 
  ChevronDown,
  Radio,
  MessageCircle,
  Clock,
  Shield
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-arabic text-gray-800">
              لقاء
            </h1>
          </div>

          {/* Simple Navigation Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-arabic text-gray-700 hover:text-red-600 transition-colors">
              الرئيسية
            </Link>
            <Link href="/rooms" className="font-arabic text-gray-700 hover:text-red-600 transition-colors">
              الغرف
            </Link>
            <Link href="/plans" className="font-arabic text-gray-700 hover:text-red-600 transition-colors">
              الأسعار
            </Link>
            <Link href="/rules" className="font-arabic text-gray-700 hover:text-red-600 transition-colors">
              الشروط والقوانين
            </Link>
            <Link href="/download" className="font-arabic text-gray-700 hover:text-red-600 transition-colors">
              تحميل
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden">
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Hero Section - Simplified like Lgana */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge 
            className="mb-8 font-arabic text-base px-6 py-2 bg-red-100 text-red-700 border-red-200"
            variant="secondary"
          >
            أكبر تجمع عربي للدردشات الصوتية
          </Badge>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 font-arabic text-gray-800 leading-tight">
            لقاء
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-arabic text-gray-700">
            تواصل مع العالم العربي في
            <span className="text-red-600 block mt-2">غرف الدردشة الصوتية</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-12 font-arabic leading-relaxed max-w-2xl mx-auto">
            انضم إلى غرف الدردشة الصوتية والمرئية، تواصل مع أشخاص من جميع أنحاء العالم العربي، 
            وشارك في محادثات ثقافية ممتعة مع نظام صلاحيات متقدم وخطط مميزة
          </p>

          {/* Main CTA Button */}
          <div className="mb-16">
            <GuestLoginDialog redirectTo="/rooms">
              <Button
                size="lg"
                className="font-arabic text-xl px-12 py-6 bg-red-600 hover:bg-red-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Radio className="w-6 h-6 ml-3" />
                ادخل الآن
              </Button>
            </GuestLoginDialog>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
                <Clock className="w-6 h-6" />
                24/7
              </div>
              <div className="text-sm text-gray-600 font-arabic">دعم متواصل</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">+500</div>
              <div className="text-sm text-gray-600 font-arabic">غرفة دردشة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">+10K</div>
              <div className="text-sm text-gray-600 font-arabic">مستخدم نشط</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Simplified */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 font-arabic text-gray-800">
              لماذا لقاء؟
            </h3>
            <p className="text-gray-600 font-arabic text-lg">
              أفضل تطبيق للدردشة الصوتية في العالم العرب��
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg">غرف صوتية عالية الجودة</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                انضم إلى محادثات صوتية كريستالية مع تقنيات متقدمة لإلغاء الضوضاء
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg">تنوع عربي أصيل</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                غرف مصنفة حسب الدول والمناطق العربية لتجربة ثقافية متنوعة
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-bold mb-3 font-arabic text-lg">بيئة آمنة ومحمية</h4>
              <p className="text-sm text-gray-600 font-arabic leading-relaxed">
                قوانين صارمة ونظام إشراف متطور لضمان تجربة ممتعة وآمنة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4 font-arabic text-white">
            ابدأ رحلتك في لقاء اليوم
          </h3>
          <p className="text-xl mb-8 font-arabic text-red-100 max-w-2xl mx-auto">
            انضم إلى آلاف المستخدمين من جميع أنحاء العالم العربي واكتشف تجربة دردشة جديدة
          </p>
          <GuestLoginDialog redirectTo="/rooms">
            <Button
              size="lg"
              variant="secondary"
              className="font-arabic text-lg px-10 py-4 bg-white text-red-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Radio className="w-5 h-5 ml-2" />
              ادخل الآن مجاناً
            </Button>
          </GuestLoginDialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Radio className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold font-arabic text-xl">لقاء</span>
              </div>
              <p className="text-sm text-gray-300 font-arabic">
                أكبر تجمع عربي للدردشات الصوتية
              </p>
            </div>

            <div>
              <h4 className="font-bold font-arabic mb-4">التطبيق</h4>
              <ul className="space-y-2 text-sm text-gray-300 font-arabic">
                <li>
                  <Link href="/rooms" className="hover:text-white transition-colors">
                    الغرف
                  </Link>
                </li>
                <li>
                  <Link href="/plans" className="hover:text-white transition-colors">
                    الأسعار
                  </Link>
                </li>
                <li>
                  <Link href="/download" className="hover:text-white transition-colors">
                    تحميل
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold font-arabic mb-4">الدعم</h4>
              <ul className="space-y-2 text-sm text-gray-300 font-arabic">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    مركز المساعدة
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link href="/rules" className="hover:text-white transition-colors">
                    الشروط والقوانين
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold font-arabic mb-4">تابعنا</h4>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400 font-arabic">
              © 2024 لقاء. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
