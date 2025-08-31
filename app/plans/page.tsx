"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import { ROOM_PLANS } from "@/lib/types"
import { Check, Star, Crown, Diamond, Award, Medal, Circle } from "lucide-react"

const planFeatures = {
  premium: [
    "حتى 1000 مستخدم",
    "دردشة صوتية ومرئية عالية الجودة",
    "هدايا افتراضية متقدمة",
    "تسجيل المحادثات",
    "إدارة متقدمة للأدوار",
    "تخصيص كامل للواجهة",
    "دعم فني على مدار الساعة",
    "تحليلات مفصلة",
    "API متقدم",
    "نسخ احتياطية يومية",
  ],
  gold: [
    "حتى 500 مستخدم",
    "دردشة صوتية ومرئية",
    "هدايا افتراضية",
    "إدارة متوسطة للأدوار",
    "تخصيص محدود للواجهة",
    "دعم فني في أوقات العمل",
    "تحليلات أساسية",
    "نسخ احتياطية أسبوعية",
  ],
  silver: [
    "حتى 200 مستخدم",
    "دردشة صوتية فقط",
    "إدارة أساسية للأدوار",
    "دعم فني عبر البريد",
    "تحليلات محدودة",
    "نسخ احتياطية شهرية",
  ],
  basic: ["حتى 50 مستخدم", "دردشة نصية فقط", "إدارة محدودة", "دعم مجتمعي"],
}

const getPlanIcon = (planId: string) => {
  switch (planId) {
    case "premium":
      return Diamond
    case "gold":
      return Award
    case "silver":
      return Medal
    default:
      return Circle
  }
}

export default function PlansPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const getPrice = (basePrice: number) => {
    if (basePrice === 0) return 0
    return isYearly ? Math.floor(basePrice * 12 * 0.8) : basePrice // خصم 20% للاشتراك السنوي
  }

  const getMostPopular = () => "gold" // الخطة الذهبية هي الأكثر شعبية

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      {/* Header */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-6 font-arabic" variant="secondary">
          خطط مرنة لجميع الاحتياجات
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-arabic text-balance">
          اختر الخطة المناسبة
          <span className="text-primary"> لمشروعك</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 font-arabic leading-relaxed max-w-2xl mx-auto">
          من الغرف الأساسية إلى المنصات المتقدمة، لدينا الخطة المثالية لكل حجم مشروع
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`font-arabic ${!isYearly ? "font-medium" : "text-muted-foreground"}`}>شهري</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`font-arabic ${isYearly ? "font-medium" : "text-muted-foreground"}`}>سنوي</span>
          {isYearly && (
            <Badge variant="secondary" className="font-arabic text-xs">
              وفر 20%
            </Badge>
          )}
        </div>
      </section>

      {/* Plans Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {ROOM_PLANS.map((plan) => {
            const Icon = getPlanIcon(plan.id)
            const price = getPrice(plan.price)
            const isPopular = plan.id === getMostPopular()
            const features = planFeatures[plan.id as keyof typeof planFeatures] || []

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all hover:shadow-xl ${
                  isPopular ? "ring-2 ring-primary scale-105" : ""
                } ${selectedPlan === plan.id ? "ring-2 ring-primary" : ""}`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-arabic font-medium">الأكثر شعبية</span>
                    </div>
                  </div>
                )}

                <CardHeader className={`text-center ${isPopular ? "pt-12" : "pt-6"}`}>
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${plan.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: plan.color }} />
                  </div>
                  <CardTitle className="font-arabic text-2xl">{plan.nameAr}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{price === 0 ? "مجاني" : `$${price}`}</span>
                      {price > 0 && (
                        <span className="text-muted-foreground font-arabic">/{isYearly ? "سنة" : "شهر"}</span>
                      )}
                    </div>
                    {isYearly && price > 0 && (
                      <p className="text-sm text-muted-foreground font-arabic mt-1">
                        ${Math.floor(price / 12)}/شهر عند الدفع سنوياً
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <Button
                    className={`w-full mb-6 font-arabic ${isPopular ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={isPopular ? "default" : "outline"}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.price === 0 ? "ابدأ مجاناً" : "اختر هذه الخطة"}
                  </Button>

                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-arabic leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-arabic">مقارنة مفصلة للخطط</h2>
          <p className="text-muted-foreground font-arabic text-lg">اكتشف الفروقات بين جميع الخطط</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-background rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-muted">
                <th className="text-right p-4 font-arabic font-medium">المميزات</th>
                {ROOM_PLANS.map((plan) => (
                  <th key={plan.id} className="text-center p-4">
                    <RoomPlanBadge plan={plan} size="sm" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4 font-arabic font-medium">عدد المستخدمين</td>
                {ROOM_PLANS.map((plan) => (
                  <td key={plan.id} className="text-center p-4">
                    {plan.maxUsers}
                  </td>
                ))}
              </tr>
              <tr className="border-t bg-muted/30">
                <td className="p-4 font-arabic font-medium">الدردشة النصية</td>
                {ROOM_PLANS.map((plan) => (
                  <td key={plan.id} className="text-center p-4">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-arabic font-medium">الدردشة الصوتية</td>
                {ROOM_PLANS.map((plan) => (
                  <td key={plan.id} className="text-center p-4">
                    {plan.id !== "basic" ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-t bg-muted/30">
                <td className="p-4 font-arabic font-medium">الدردشة المرئية</td>
                {ROOM_PLANS.map((plan) => (
                  <td key={plan.id} className="text-center p-4">
                    {["premium", "gold"].includes(plan.id) ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-arabic font-medium">الهدايا الافتراضية</td>
                {ROOM_PLANS.map((plan) => (
                  <td key={plan.id} className="text-center p-4">
                    {["premium", "gold"].includes(plan.id) ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-t bg-muted/30">
                <td className="p-4 font-arabic font-medium">تسجيل المحادثات</td>
                {ROOM_PLANS.map((plan) => (
                  <td key={plan.id} className="text-center p-4">
                    {plan.id === "premium" ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-t">
                <td className="p-4 font-arabic font-medium">الدعم الفني</td>
                <td className="text-center p-4 text-sm font-arabic">مجتمعي</td>
                <td className="text-center p-4 text-sm font-arabic">بريد إلكتروني</td>
                <td className="text-center p-4 text-sm font-arabic">أوقات العمل</td>
                <td className="text-center p-4 text-sm font-arabic">24/7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-arabic">الأسئلة الشائعة</h2>
          <p className="text-muted-foreground font-arabic text-lg">إجابات على أكثر الأسئلة شيوعاً</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold font-arabic mb-2">هل يمكنني ترقية خطتي في أي وقت؟</h3>
              <p className="text-muted-foreground font-arabic">
                نعم، يمكنك ترقية خطتك في أي وقت. سيتم احتساب الفرق في السعر فقط للفترة المتبقية.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold font-arabic mb-2">ما هي طرق الدفع المتاحة؟</h3>
              <p className="text-muted-foreground font-arabic">
                نقبل جميع البطاقات الائتمانية الرئيسية، PayPal، والتحويل البنكي للخطط السنوية.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold font-arabic mb-2">هل توجد فترة تجريبية مجانية؟</h3>
              <p className="text-muted-foreground font-arabic">
                نعم، جميع الخطط المدفوعة تأتي مع فترة تجريبية مجانية لمدة 14 يوم.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold font-arabic mb-2">هل يمكنني إلغاء اشتراكي في أي وقت؟</h3>
              <p className="text-muted-foreground font-arabic">
                نعم، يمكنك إلغاء اشتراكك في أي وقت من لوحة التحكم. لن يتم تجديد الاشتراك تلقائياً.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <Crown className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4 font-arabic">جاهز لبدء رحلتك؟</h2>
            <p className="text-lg mb-8 font-arabic opacity-90 max-w-2xl mx-auto">
              ابدأ بالخطة المجانية أو جرب أي خطة مدفوعة لمدة 14 يوم مجاناً
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="font-arabic text-lg px-8">
                ابدأ التجربة المجانية
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-arabic text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                تواصل مع المبيعات
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
