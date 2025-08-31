import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Radio,
  Smartphone,
  Monitor,
  Download,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react"
import Link from "next/link"

const platforms = [
  {
    id: "android",
    name: "أندرويد",
    icon: "🤖",
    description: "متوفر على متجر جوجل بلاي",
    version: "الإصدار 2.1.0",
    size: "25 MB",
    rating: 4.5,
    downloads: "10K+",
    features: [
      "دردشة صوتية عالية الجودة",
      "واجهة مستخدم محسنة للهواتف",
      "إشعارات فورية",
      "وضع توفير البطارية"
    ],
    buttonText: "تحميل من Google Play",
    buttonColor: "bg-green-600 hover:bg-green-700"
  },
  {
    id: "ios", 
    name: "آيفون",
    icon: "🍎",
    description: "متوفر على App Store",
    version: "الإصدار 2.1.0",
    size: "28 MB",
    rating: 4.7,
    downloads: "5K+",
    features: [
      "تحسينات خاصة لـ iOS",
      "دعم Face ID و Touch ID",
      "تكامل مع Siri", 
      "تصميم متجاوب للآيباد"
    ],
    buttonText: "تحميل من App Store",
    buttonColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    id: "web",
    name: "الويب",
    icon: "🌐", 
    description: "استخدم مباشرة من المتصفح",
    version: "أحدث إصدار",
    size: "لا يتطلب تحميل",
    rating: 4.6,
    downloads: "متاح للجميع",
    features: [
      "لا يتطلب تثبيت",
      "يعمل على جميع المتصفحات",
      "تحديثات تلقائية",
      "نفس المميزات الكاملة"
    ],
    buttonText: "استخدم الآن",
    buttonColor: "bg-purple-600 hover:bg-purple-700"
  },
  {
    id: "windows",
    name: "ويندوز",
    icon: "🪟",
    description: "تطبيق سطح المكتب",
    version: "الإصدار 2.0.5",
    size: "45 MB", 
    rating: 4.4,
    downloads: "2K+",
    features: [
      "أداء محسن لسطح المكتب",
      "اختصارات لوحة المفاتيح",
      "نوافذ متعددة",
      "جودة صوت فائقة"
    ],
    buttonText: "تحميل للويندوز",
    buttonColor: "bg-gray-600 hover:bg-gray-700"
  }
]

const systemRequirements = {
  android: {
    os: "أندرويد 6.0 فما فوق",
    ram: "2 جيجابايت RAM",
    storage: "50 ميجابايت مساحة فارغة",
    network: "اتصال إنترنت"
  },
  ios: {
    os: "iOS 12.0 فما فوق", 
    ram: "2 جيجابايت RAM",
    storage: "100 ميجابايت مساحة فارغة",
    network: "اتصال إنترنت"
  },
  web: {
    browser: "Chrome, Firefox, Safari, Edge",
    os: "أي نظام تشغيل",
    ram: "1 جيجابايت RAM",
    network: "اتصال إنترنت مستقر"
  },
  windows: {
    os: "ويندوز 10 فما فوق",
    ram: "4 جيجابايت RAM", 
    storage: "200 ميجابايت مساحة فارغة",
    network: "اتصال إنترنت"
  }
}

export default function DownloadPage() {
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
              الغرف المتاحة
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 font-arabic text-gray-800">
            تحميل تطبيق لقاء
          </h2>
          <p className="text-gray-600 font-arabic text-lg max-w-2xl mx-auto">
            استمتع بتجربة الدردشة الصوتية الأفضل على جميع أجهزتك
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">+15K</div>
              <div className="text-sm text-gray-600 font-arabic">تحميل</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">4.6</div>
              <div className="text-sm text-gray-600 font-arabic">تقييم</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">4</div>
              <div className="text-sm text-gray-600 font-arabic">منصات</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">مجاني</div>
              <div className="text-sm text-gray-600 font-arabic">للتحميل</div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {platforms.map((platform) => (
            <Card key={platform.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="text-4xl mb-3">{platform.icon}</div>
                <CardTitle className="font-arabic text-lg">{platform.name}</CardTitle>
                <p className="text-sm text-gray-600 font-arabic">{platform.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Platform Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-arabic text-gray-600">الإصدار:</span>
                    <span className="font-arabic">{platform.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-arabic text-gray-600">الحجم:</span>
                    <span className="font-arabic">{platform.size}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-arabic text-gray-600">التقييم:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{platform.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-arabic text-gray-600">التحميلات:</span>
                    <Badge variant="secondary" className="font-arabic">
                      {platform.downloads}
                    </Badge>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-arabic font-semibold mb-2 text-sm">المميزات:</h4>
                  <ul className="space-y-1">
                    {platform.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="font-arabic text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Download Button */}
                <Button className={`w-full font-arabic ${platform.buttonColor}`}>
                  <Download className="w-4 h-4 ml-2" />
                  {platform.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Requirements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-arabic text-center mb-8 text-gray-800">
            متطلبات النظام
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(systemRequirements).map(([platform, requirements]) => {
              const platformData = platforms.find(p => p.id === platform)
              return (
                <Card key={platform} className="border-gray-200">
                  <CardHeader className="text-center pb-3">
                    <div className="text-2xl mb-2">{platformData?.icon}</div>
                    <CardTitle className="font-arabic text-lg">{platformData?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {Object.entries(requirements).map(([key, value]) => (
                        <li key={key} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span className="font-arabic text-gray-600">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <Radio className="w-16 h-16 text-red-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold font-arabic mb-6 text-gray-800">
                لماذا تحميل تطبيق لقاء؟
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-arabic font-semibold mb-2">تجربة محسنة</h4>
                  <p className="text-sm font-arabic text-gray-600">
                    أداء أفضل وواجهة محسنة للهواتف
                  </p>
                </div>
                
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="font-arabic font-semibold mb-2">إشعارات فورية</h4>
                  <p className="text-sm font-arabic text-gray-600">
                    لا تفوت أي محادثة مهمة
                  </p>
                </div>
                
                <div className="text-center">
                  <Monitor className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-arabic font-semibold mb-2">استخدام أوفلاين</h4>
                  <p className="text-sm font-arabic text-gray-600">
                    بعض الميزات تعمل بدون إنترنت
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-arabic text-center mb-8 text-gray-800">
            أسئلة شائعة
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-arabic font-semibold mb-3">هل التطبيق مجاني؟</h4>
                <p className="text-sm font-arabic text-gray-600">
                  نعم، تحميل التطبيق واستخدامه الأساسي مجاني تماماً. توجد خطط مدفوعة للمميزات المتقدمة.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-arabic font-semibold mb-3">هل يحتاج التطبيق لأذونات خاصة؟</h4>
                <p className="text-sm font-arabic text-gray-600">
                  نعم، يحتاج لإذن الميكروفون للدردشة الصوتية وإذن الإشعارات ليُعلمك بالرسائل الجديدة.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-arabic font-semibold mb-3">هل يعمل التطبيق على جميع الأجهزة؟</h4>
                <p className="text-sm font-arabic text-gray-600">
                  نعم، يعمل على الهواتف الذكية والأجهزة اللوحية وأجهزة الكمبيوتر وحتى المتصفحات.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-arabic font-semibold mb-3">كيف أحدث التطبيق؟</h4>
                <p className="text-sm font-arabic text-gray-600">
                  التحديثات تتم تلقائياً من المتجر. يمكنك أيضاً التحقق يدوياً من المتجر المناسب.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold font-arabic mb-4">
                ابدأ رحلة الدردشة الآن
              </h3>
              <p className="font-arabic mb-6 opacity-90 max-w-2xl mx-auto">
                حمل التطبيق أو استخدمه مباشرة من المتصفح واستمتع بأفضل تجربة دردشة صوتية عربية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/rooms">
                  <Button 
                    size="lg"
                    variant="secondary"
                    className="font-arabic bg-white text-red-600 hover:bg-gray-100"
                  >
                    <Play className="w-5 h-5 ml-2" />
                    جرب الآن من المتصفح
                  </Button>
                </Link>
                <Button 
                  size="lg"
                  variant="outline"
                  className="font-arabic border-white text-white hover:bg-white hover:text-red-600"
                >
                  <Download className="w-5 h-5 ml-2" />
                  تحميل التطبيق
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
