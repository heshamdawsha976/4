"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import { ROOM_PLANS } from "@/lib/types"
import { CreditCard, Shield, Check, ArrowLeft, Percent, Lock, AlertCircle, Calendar } from "lucide-react"
import Link from "next/link"

interface PaymentMethod {
  id: string
  name: string
  nameAr: string
  icon: string
  fees: number
  processingTime: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "stripe",
    name: "Credit/Debit Card",
    nameAr: "بطاقة ائتمانية/مدينة",
    icon: "💳",
    fees: 0,
    processingTime: "فوري",
  },
  {
    id: "paypal",
    name: "PayPal",
    nameAr: "باي بال",
    icon: "🅿️",
    fees: 2.9,
    processingTime: "فوري",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    nameAr: "تحويل بنكي",
    icon: "🏦",
    fees: 0,
    processingTime: "1-3 أيام عمل",
  },
]

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "gold"
  const [isYearly, setIsYearly] = useState(searchParams.get("billing") === "yearly")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    country: "SA",
    address: "",
    city: "",
    postalCode: "",
  })

  const selectedPlan = ROOM_PLANS.find((p) => p.id === planId) || ROOM_PLANS[1]

  const basePrice = isYearly ? Math.floor(selectedPlan.price * 12 * 0.8) : selectedPlan.price
  const paymentMethod = paymentMethods.find((pm) => pm.id === selectedPaymentMethod)!
  const processingFees = Math.round(basePrice * (paymentMethod.fees / 100) * 100) / 100

  let discountAmount = 0
  if (appliedCoupon) {
    discountAmount =
      appliedCoupon.type === "percentage"
        ? Math.round(basePrice * (appliedCoupon.discount / 100) * 100) / 100
        : appliedCoupon.discount
  }

  const totalAmount = basePrice - discountAmount + processingFees

  const handleApplyCoupon = () => {
    // محاكاة التحقق من الكوبون
    const mockCoupons = {
      WELCOME20: { code: "WELCOME20", discount: 20, type: "percentage" as const },
      SAVE50: { code: "SAVE50", discount: 50, type: "fixed" as const },
      NEWUSER: { code: "NEWUSER", discount: 15, type: "percentage" as const },
    }

    const coupon = mockCoupons[couponCode.toUpperCase() as keyof typeof mockCoupons]
    if (coupon) {
      setAppliedCoupon(coupon)
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // محاكاة عملية الدفع
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // هنا سيتم التكامل مع بوابة الدفع الفعلية
    console.log("Processing payment:", {
      plan: selectedPlan,
      billing: isYearly ? "yearly" : "monthly",
      amount: totalAmount,
      paymentMethod: selectedPaymentMethod,
      coupon: appliedCoupon,
      billingInfo,
    })

    setIsProcessing(false)
    // إعادة توجيه لصفحة النجاح
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/plans">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-arabic">إتمام الاشتراك</h1>
            <p className="text-muted-foreground font-arabic">اختر طريقة الدفع وأكمل اشتراكك</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="font-arabic">ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selected Plan */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <RoomPlanBadge plan={selectedPlan} />
                    <Badge variant="secondary" className="font-arabic">
                      {isYearly ? "سنوي" : "شهري"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground font-arabic space-y-1">
                    <div className="flex justify-between">
                      <span>المستخدمين:</span>
                      <span>{selectedPlan.maxUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>دورة الفوترة:</span>
                      <span>{isYearly ? "سنوية" : "شهرية"}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Billing Toggle */}
                <div className="space-y-3">
                  <Label className="font-arabic">دورة الفوترة</Label>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                      <div>
                        <p className="font-medium font-arabic">فوترة سنوية</p>
                        <p className="text-sm text-muted-foreground font-arabic">وفر 20%</p>
                      </div>
                    </div>
                    {isYearly && (
                      <Badge variant="secondary" className="font-arabic">
                        <Percent className="w-3 h-3 ml-1" />
                        خصم
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Coupon Code */}
                <div className="space-y-3">
                  <Label className="font-arabic">كود الخصم</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="أدخل كود الخصم"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="font-arabic"
                      disabled={!!appliedCoupon}
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode || !!appliedCoupon}
                      className="font-arabic bg-transparent"
                    >
                      تطبيق
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Check className="w-4 h-4" />
                      <span className="font-arabic">تم تطبيق كود الخصم: {appliedCoupon.code}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-arabic">السعر الأساسي:</span>
                    <span>${basePrice}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span className="font-arabic">الخصم:</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}

                  {processingFees > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span className="font-arabic">رسوم المعالجة:</span>
                      <span>+${processingFees}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span className="font-arabic">المجموع:</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="font-arabic">دفع آمن ومشفر</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="font-arabic">طريقة الدفع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                        selectedPaymentMethod === method.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center">
                            <span className="text-xl">{method.icon}</span>
                          </div>
                          <div>
                            <p className="font-medium font-arabic">{method.nameAr}</p>
                            <p className="text-sm text-muted-foreground">{method.processingTime}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {method.fees > 0 && (
                            <p className="text-sm text-muted-foreground font-arabic">رسوم: {method.fees}%</p>
                          )}
                          {selectedPaymentMethod === method.id && <Check className="w-5 h-5 text-primary" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-arabic">معلومات الفوترة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-arabic">الاسم الأول</Label>
                    <Input
                      value={billingInfo.firstName}
                      onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                      className="font-arabic"
                      required
                    />
                  </div>
                  <div>
                    <Label className="font-arabic">الاسم الأخير</Label>
                    <Input
                      value={billingInfo.lastName}
                      onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                      className="font-arabic"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="font-arabic">البريد الإلكتروني</Label>
                  <Input
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                    className="font-arabic"
                    required
                  />
                </div>

                <div>
                  <Label className="font-arabic">الشركة (اختياري)</Label>
                  <Input
                    value={billingInfo.company}
                    onChange={(e) => setBillingInfo({ ...billingInfo, company: e.target.value })}
                    className="font-arabic"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-arabic">البلد</Label>
                    <select
                      value={billingInfo.country}
                      onChange={(e) => setBillingInfo({ ...billingInfo, country: e.target.value })}
                      className="w-full p-2 border rounded-md font-arabic"
                    >
                      <option value="SA">السعودية</option>
                      <option value="AE">الإمارات</option>
                      <option value="EG">مصر</option>
                      <option value="JO">الأردن</option>
                      <option value="LB">لبنان</option>
                      <option value="MA">المغرب</option>
                    </select>
                  </div>
                  <div>
                    <Label className="font-arabic">المدينة</Label>
                    <Input
                      value={billingInfo.city}
                      onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                      className="font-arabic"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="font-arabic">العنوان</Label>
                  <Input
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                    className="font-arabic"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            {selectedPaymentMethod === "stripe" && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-arabic flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    تفاصيل البطاقة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="font-arabic">رقم البطاقة</Label>
                    <Input placeholder="1234 5678 9012 3456" className="font-arabic" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-arabic">تاريخ الانتهاء</Label>
                      <Input placeholder="MM/YY" className="font-arabic" />
                    </div>
                    <div>
                      <Label className="font-arabic">CVV</Label>
                      <Input placeholder="123" className="font-arabic" />
                    </div>
                  </div>

                  <div>
                    <Label className="font-arabic">اسم حامل البطاقة</Label>
                    <Input placeholder="كما هو مكتوب على البطاقة" className="font-arabic" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Terms and Payment */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm font-arabic text-blue-800">
                      <p className="font-medium mb-1">معلومات مهمة:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• سيتم تجديد اشتراكك تلقائياً</li>
                        <li>• يمكنك إلغاء الاشتراك في أي وقت</li>
                        <li>• فترة تجريبية مجانية لمدة 14 يوم</li>
                        <li>• استرداد كامل خلال 30 يوم</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="terms" className="rounded" required />
                    <label htmlFor="terms" className="text-sm font-arabic">
                      أوافق على{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        الشروط والأحكام
                      </Link>{" "}
                      و{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        سياسة الخصوصية
                      </Link>
                    </label>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full font-arabic text-lg py-6"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                        جاري المعالجة...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 ml-2" />
                        ادفع ${totalAmount} بأمان
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span className="font-arabic">SSL مشفر</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span className="font-arabic">دفع آمن</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="font-arabic">إلغاء مجاني</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
