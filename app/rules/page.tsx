import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Radio,
  Shield,
  AlertTriangle,
  CheckCircle,
  UserX,
  Volume2,
  Eye,
  Heart,
  Users,
  MessageCircle,
  Camera,
  ArrowRight,
  Star,
  Clock
} from "lucide-react"
import Link from "next/link"

const rules = [
  {
    id: 1,
    category: "السلوك العام",
    icon: Users,
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    rules: [
      "منع التحدث أو الكتابة بالكلام البذيء أو ال��لفاظ النابية",
      "احترام جميع المشاركين وتجنب التنمر أو الإساءة الشخصية",
      "استخدام الأسماء المهذبة واللائقة في الغرف",
      "تجنب الصراخ أو رفع الصوت بشكل مزعج",
      "احترام الثقافات والتقاليد المختلفة"
    ]
  },
  {
    id: 2,
    category: "المحتوى المحظور",
    icon: AlertTriangle,
    color: "bg-red-50 border-red-200", 
    iconColor: "text-red-600",
    rules: [
      "منع فتح الأحاديث التي تتطرق إلى الخلافات المذهبية والعقائدية والسياسية",
      "منع التطرق إلى كلام يسيء إلى الله أو الأديان أو الرسل الكرام أو الصحابة الكرام",
      "منع نشر أو مشاركة المحتوى الإباحي أو غير الأخلاقي",
      "منع الترويج للعنف أو الأنشطة الإجرامية",
      "منع التحريض على الكراهية أو التمييز العنصري"
    ]
  },
  {
    id: 3,
    category: "الإعلانات والتجارة",
    icon: MessageCircle,
    color: "bg-yellow-50 border-yellow-200",
    iconColor: "text-yellow-600", 
    rules: [
      "منع وضع الإعلانات داخل الغرفة (مواقع أو روابط أخرى)",
      "منع نشر أرقام الهاتف أو عناوين البريد الإلكتروني",
      "منع عرض المنتجات أو الخدمات التجارية بدون إذن",
      "منع طلب أو إرسال الأموال أو المعاملات المالية",
      "منع الترويج لتطبيقات أو منصات منافسة"
    ]
  },
  {
    id: 4,
    category: "استخدام الكاميرا والصوت",
    icon: Camera,
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    rules: [
      "منع تشغيل برنامج الكاميرا للعرض الإباحي أو غير الأخلاقي",
      "منع تشغيل الكاميرا للإعلانات التجارية بدون إذن", 
      "احترام خصوصية الآخرين وعدم تسجيلهم بدون إذن",
      "استخدام جودة صوت مناسبة وتجنب التشويش",
      "إغلاق الميكروفون عند عدم التحدث لتجنب الضوضاء"
    ]
  },
  {
    id: 5,
    category: "إدارة الغرف",
    icon: Shield,
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    rules: [
      "منع الدخول بعدة أجهزة بأسماء وهمية لرفع ترتيب الغرفة",
      "منع استخدام الغرف لأمور شخصية لأنها غرف عامة ويحق للجميع استخدامها",
      "احترام قرارات المشرفين ومالكي الغرف",
      "عدم طلب صلاحيات إدارية بشكل مستمر أو مزعج",
      "الإبلاغ عن أي سلوك مخالف للقوانين للمشرفين"
    ]
  },
  {
    id: 6,
    category: "الخصوصية والأمان",
    icon: Eye,
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    rules: [
      "عدم مشاركة المعلومات الشخصية (عنوان، رقم هوية، حسابات بنكية)",
      "تجنب الكشف عن معلومات الآخرين بدون إذنهم",
      "الإبلاغ عن أي محاولات تهديد أو ابتزاز فوراً",
      "استخدام كلمات مرور قوية وعدم مشاركتها",
      "عدم قبول طلبات الصداقة من مجهولين خارج التطبيق"
    ]
  }
]

const violations = [
  {
    level: "تحذير",
    color: "bg-yellow-100 text-yellow-800",
    description: "تحذير شفهي أو كتابي للمخالفة البسيطة",
    duration: "فوري"
  },
  {
    level: "كتم مؤقت", 
    color: "bg-orange-100 text-orange-800",
    description: "منع من التحدث أو الكتابة لفترة محددة",
    duration: "1 ساعة - 24 ساعة"
  },
  {
    level: "طرد من الغرفة",
    color: "bg-red-100 text-red-800", 
    description: "إخراج من الغرفة مع منع الدخول لفترة",
    duration: "1 يوم - 7 أيام"
  },
  {
    level: "حظر دائم",
    color: "bg-gray-100 text-gray-800",
    description: "منع دائم من استخدام التطبيق",
    duration: "دائم"
  }
]

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
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
          
          <Link href="/rooms">
            <Button className="font-arabic bg-red-600 hover:bg-red-700">
              <Radio className="w-4 h-4 ml-2" />
              تصفح الغرف
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 font-arabic text-gray-800">
            الشروط والقوانين
          </h2>
          <p className="text-gray-600 font-arabic text-lg max-w-3xl mx-auto">
            لضمان بيئة آمنة وممتعة لجميع المستخدمين، نرجو الالتزام بالقوانين والإرشادات التالية
          </p>
        </div>

        {/* Welcome Message */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold font-arabic mb-4 text-gray-800">
                مرحباً بكم في مجتمع لقاء
              </h3>
              <p className="text-gray-700 font-arabic leading-relaxed max-w-2xl mx-auto">
                نهدف إلى توفير مساحة آمنة ومحترمة للتواصل والحوار البناء بين جميع أفراد المجتمع العربي. 
                التزامكم بهذه القوانين يساعد في الحفاظ على جودة التجربة للجميع.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rules Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {rules.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.id} className={`${category.color} transition-all duration-300 hover:shadow-lg`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-arabic text-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white`}>
                      <IconComponent className={`w-5 h-5 ${category.iconColor}`} />
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-arabic text-gray-700 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Violation Levels */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-arabic text-center mb-8 text-gray-800">
            مستويات المخالفات والعقوبات
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {violations.map((violation, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-gray-600">{index + 1}</span>
                  </div>
                  <Badge className={`${violation.color} mx-auto mb-2`}>
                    {violation.level}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-arabic text-gray-600 mb-3 leading-relaxed">
                    {violation.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span className="font-arabic">{violation.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reporting System */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-center font-arabic text-xl text-gray-800">
                نظام الإبلاغ والشكاوى
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <AlertTriangle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <p className="font-arabic text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                إذا واجهت أي سلوك مخالف أو غير مناسب، يرجى الإبلاغ عنه فوراً. 
                نحن ملتزمون بمراجعة جميع التقارير والتعامل معها بسرية تامة.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <UserX className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-arabic font-semibold mb-2">إبلاغ فوري</h4>
                  <p className="text-sm font-arabic text-gray-600">
                    استخدم زر الإبلاغ في الغرفة
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-arabic font-semibold mb-2">تواصل مباشر</h4>
                  <p className="text-sm font-arabic text-gray-600">
                    راسل المشرفين مباشرة
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-arabic font-semibold mb-2">حماية السرية</h4>
                  <p className="text-sm font-arabic text-gray-600">
                    جميع البلاغات سرية
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Guidelines */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-arabic text-center mb-8 text-gray-800">
            إرشادات المجتمع الإيجابي
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h4 className="font-arabic font-semibold mb-3">كن لطيفاً ومهذباً</h4>
                <p className="text-sm font-arabic text-gray-600">
                  تعامل مع الآخرين بالاحترام والود
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h4 className="font-arabic font-semibold mb-3">شارك بإيجابية</h4>
                <p className="text-sm font-arabic text-gray-600">
                  ساهم في بناء محادثات مفيدة ومثمرة
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h4 className="font-arabic font-semibold mb-3">كن مثالاً يحتذى</h4>
                <p className="text-sm font-arabic text-gray-600">
                  ساعد في جعل لقاء مكاناً أفضل للجميع
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
            <CardContent className="p-8">
              <Radio className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold font-arabic mb-4">
                مستعد للانضمام إلى مجتمع لقاء؟
              </h3>
              <p className="font-arabic mb-6 opacity-90 max-w-2xl mx-auto">
                بقراءة هذه القوانين والموافقة عليها، أنت تساهم في بناء مجتمع آمن وممتع للجميع
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/rooms">
                  <Button 
                    size="lg"
                    variant="secondary"
                    className="font-arabic bg-white text-red-600 hover:bg-gray-100"
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                    ابدأ الآن
                  </Button>
                </Link>
                <Link href="/plans">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="font-arabic border-white text-white hover:bg-white hover:text-red-600"
                  >
                    اكتشف الخطط
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
