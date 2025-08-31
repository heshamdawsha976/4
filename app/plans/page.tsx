import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Radio,
  Check,
  Crown,
  Star,
  Shield,
  Zap,
  Users,
  Mic,
  Video,
  Settings,
  HeadphonesIcon,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const plans = [
  {
    id: "basic",
    name: "غرفة عادية",
    nameEn: "Basic Room",
    price: 0,
    currency: "USD",
    period: "مجاناً",
    maxUsers: 20,
    color: "border-gray-200",
    bgColor: "bg-gray-50",
    textColor: "text-gray-800",
    icon: Radio,
    iconColor: "text-gray-600",
    features: [
      { name: "دردشة صوتية أساسية", icon: Mic, included: true },
      { name: "دردشة نصية", icon: Radio, included: true },
      { name: "إشراف أساسي", icon: Shield, included: true },
      { name: "20 مستخدم كحد أقصى", icon: Users, included: true },
      { name: "دردشة مرئية", icon: Video, included: false },
      { name: "مشاركة الشاشة", icon: Settings, included: false },
      { name: "تحليلات متقدمة", icon: Zap, included: false },
      { name: "دعم مميز", icon: HeadphonesIcon, included: false }
    ]
  },
  {
    id: "silver",
    name: "غرفة فضية",
    nameEn: "Silver Room", 
    price: 80,
    currency: "USD",
    period: "شهرياً",
    maxUsers: 40,
    color: "border-gray-300",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    icon: Shield,
    iconColor: "text-gray-600",
    features: [
      { name: "دردشة صوتية عالية الجودة", icon: Mic, included: true },
      { name: "دردشة مرئية", icon: Video, included: true },
      { name: "تخصيص المظهر", icon: Settings, included: true },
      { name: "إشراف متقدم", icon: Shield, included: true },
      { name: "40 مستخدم كحد أقصى", icon: Users, included: true },
      { name: "مشاركة الشاشة", icon: Settings, included: false },
      { name: "تحليلات متقدمة", icon: Zap, included: false },
      { name: "دعم مميز", icon: HeadphonesIcon, included: false }
    ]
  },
  {
    id: "gold",
    name: "غرفة ذهبية",
    nameEn: "Gold Room",
    price: 107,
    currency: "USD", 
    period: "شهرياً",
    maxUsers: 70,
    color: "border-yellow-400",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-800",
    icon: Star,
    iconColor: "text-yellow-600",
    isPopular: true,
    features: [
      { name: "دردشة صوتية مميزة", icon: Mic, included: true },
      { name: "دردشة مرئية HD", icon: Video, included: true },
      { name: "مشاركة الشاشة", icon: Settings, included: true },
      { name: "دعم مميز", icon: HeadphonesIcon, included: true },
      { name: "تحليلات وإحصائيات", icon: Zap, included: true },
      { name: "70 مستخدم كحد أقصى", icon: Users, included: true },
      { name: "بث مباشر", icon: Radio, included: false },
      { name: "وصول API", icon: Settings, included: false }
    ]
  },
  {
    id: "premium",
    name: "غرفة مميزة", 
    nameEn: "Premium Room",
    price: 265.99,
    currency: "USD",
    period: "شهرياً",
    maxUsers: 500,
    color: "border-purple-400",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    icon: Crown,
    iconColor: "text-purple-600",
    features: [
      { name: "دردشة صوتية احترافية", icon: Mic, included: true },
      { name: "دردشة مرئية 4K", icon: Video, included: true },
      { name: "بث مباشر للشبكات", icon: Radio, included: true },
      { name: "وصول API", icon: Settings, included: true },
      { name: "علامة تجارية خاصة", icon: Crown, included: true },
      { name: "دعم مخصص", icon: HeadphonesIcon, included: true },
      { name: "500 مستخدم كحد أقصى", icon: Users, included: true },
      { name: "جميع الميزات", icon: Zap, included: true }
    ]
  }
]

export default function PlansPage() {
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
          <h2 className="text-4xl font-bold mb-4 font-arabic text-gray-800">
            خطط الاشتراك والأسعار
          </h2>
          <p className="text-gray-600 font-arabic text-lg max-w-2xl mx-auto">
            اختر الخطة المناسبة لغرفتك واستمتع بمميزات متقدمة للدردشة الصوتية
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            return (
              <Card 
                key={plan.id}
                className={`
                  relative transition-all duration-300 hover:shadow-xl transform hover:scale-105
                  ${plan.color} ${plan.bgColor}
                  ${plan.isPopular ? 'ring-2 ring-yellow-400 shadow-lg' : ''}
                `}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-white font-arabic px-4 py-1">
                      الأكثر شعبية
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${plan.bgColor}`}>
                    <IconComponent className={`w-8 h-8 ${plan.iconColor}`} />
                  </div>
                  
                  <CardTitle className={`font-arabic text-xl mb-2 ${plan.textColor}`}>
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mb-4">
                    {plan.price === 0 ? (
                      <div className={`text-3xl font-bold ${plan.textColor}`}>
                        مجاناً
                      </div>
                    ) : (
                      <div>
                        <div className={`text-3xl font-bold ${plan.textColor}`}>
                          ${plan.price}
                        </div>
                        <div className="text-sm text-gray-600 font-arabic">
                          {plan.period}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`text-sm font-arabic ${plan.textColor} opacity-80`}>
                    حتى {plan.maxUsers} مستخدم
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features List */}
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => {
                      const FeatureIcon = feature.icon
                      return (
                        <div 
                          key={index}
                          className={`flex items-center gap-3 text-sm ${
                            feature.included ? 'text-gray-700' : 'text-gray-400'
                          }`}
                        >
                          {feature.included ? (
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          ) : (
                            <div className="w-4 h-4 border border-gray-300 rounded flex-shrink-0"></div>
                          )}
                          <FeatureIcon className="w-4 h-4 flex-shrink-0" />
                          <span className="font-arabic">{feature.name}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button 
                      className={`
                        w-full font-arabic
                        ${plan.id === 'basic' ? 'bg-gray-600 hover:bg-gray-700' : ''}
                        ${plan.id === 'silver' ? 'bg-gray-700 hover:bg-gray-800' : ''}
                        ${plan.id === 'gold' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
                        ${plan.id === 'premium' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                      `}
                    >
                      {plan.price === 0 ? 'ابدأ مجاناً' : 'اشترك الآن'}
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold font-arabic text-center mb-8 text-gray-800">
            مقارنة شاملة للميزات
          </h3>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-right p-4 font-arabic font-semibold text-gray-800">الميزة</th>
                    <th className="text-center p-4 font-arabic font-semibold text-gray-600">عادية</th>
                    <th className="text-center p-4 font-arabic font-semibold text-gray-600">فضية</th>
                    <th className="text-center p-4 font-arabic font-semibold text-yellow-700">ذهبية</th>
                    <th className="text-center p-4 font-arabic font-semibold text-purple-700">مميزة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-4 font-arabic">الحد الأقصى للمستخدمين</td>
                    <td className="text-center p-4">20</td>
                    <td className="text-center p-4">40</td>
                    <td className="text-center p-4">70</td>
                    <td className="text-center p-4">500</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-arabic">دردشة صوتية</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-arabic">دردشة مرئية</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-arabic">دعم مميز</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4">-</td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="text-center p-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold font-arabic mb-8 text-gray-800">
            أسئلة شائعة
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-right">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-arabic font-semibold mb-3">هل يمكنني تغيير خطتي لاحقاً؟</h4>
              <p className="text-gray-600 font-arabic text-sm">
                نعم، يمكنك الترقية أو التراجع في خطتك في أي وقت. التغييرات تصبح سارية فوراً.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-arabic font-semibold mb-3">هل توجد رسوم إضافية؟</h4>
              <p className="text-gray-600 font-arabic text-sm">
                لا توجد رسوم خفية. السعر المعروض شامل جميع الميزات المذكورة في الخطة.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <div className="bg-red-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold font-arabic mb-4">
              ابدأ رحلتك مع لقاء اليوم
            </h3>
            <p className="font-arabic mb-6 opacity-90">
              انضم إلى آلاف المستخدمين واستمتع بتجربة دردشة صوتية لا مثيل لها
            </p>
            <Link href="/rooms">
              <Button 
                size="lg"
                variant="secondary"
                className="font-arabic bg-white text-red-600 hover:bg-gray-100"
              >
                <Radio className="w-5 h-5 ml-2" />
                تصفح الغرف المتاحة
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
