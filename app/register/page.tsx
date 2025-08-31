"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Mail, Phone, Facebook, Twitter, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { register } = useAuth()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة")
      return
    }

    if (!acceptTerms) {
      setError("يجب الموافقة على الشروط والأحكام")
      return
    }

    setIsLoading(true)

    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        password: formData.password,
      })

      if (success) {
        router.push("/dashboard")
      } else {
        setError("حدث خطأ أثناء إنشاء الحساب")
      }
    } catch (error) {
      setError("حدث خطأ أثناء إنشاء الحساب")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-arabic text-primary">لقاء</h1>
          <p className="text-muted-foreground font-arabic mt-2">انضم إلى مجتمعنا</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-arabic">إنشاء حساب جديد</CardTitle>
            <CardDescription className="font-arabic">أنشئ حسابك للبدء في الدردشة مع الأصدقاء</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-arabic">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-arabic">
                    الاسم الأول
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="أحمد"
                    className="font-arabic text-right"
                    dir="rtl"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-arabic">
                    اسم العائلة
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="محمد"
                    className="font-arabic text-right"
                    dir="rtl"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="font-arabic">
                  اسم المستخدم
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="ahmed_mohamed"
                  className="text-right"
                  dir="rtl"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-arabic">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="text-right"
                  dir="rtl"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="font-arabic">
                  رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+966501234567"
                  className="text-right"
                  dir="rtl"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="font-arabic">
                  الدولة
                </Label>
                <Select dir="rtl" onValueChange={(value) => handleInputChange("country", value)} required>
                  <SelectTrigger className="font-arabic">
                    <SelectValue placeholder="اختر دولتك" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sa" className="font-arabic">
                      السعودية
                    </SelectItem>
                    <SelectItem value="ae" className="font-arabic">
                      الإمارات
                    </SelectItem>
                    <SelectItem value="eg" className="font-arabic">
                      مصر
                    </SelectItem>
                    <SelectItem value="ma" className="font-arabic">
                      المغرب
                    </SelectItem>
                    <SelectItem value="jo" className="font-arabic">
                      الأردن
                    </SelectItem>
                    <SelectItem value="lb" className="font-arabic">
                      لبنان
                    </SelectItem>
                    <SelectItem value="sy" className="font-arabic">
                      سوريا
                    </SelectItem>
                    <SelectItem value="iq" className="font-arabic">
                      العراق
                    </SelectItem>
                    <SelectItem value="kw" className="font-arabic">
                      الكويت
                    </SelectItem>
                    <SelectItem value="qa" className="font-arabic">
                      قطر
                    </SelectItem>
                    <SelectItem value="bh" className="font-arabic">
                      البحرين
                    </SelectItem>
                    <SelectItem value="om" className="font-arabic">
                      عمان
                    </SelectItem>
                    <SelectItem value="ye" className="font-arabic">
                      اليمن
                    </SelectItem>
                    <SelectItem value="tn" className="font-arabic">
                      تونس
                    </SelectItem>
                    <SelectItem value="dz" className="font-arabic">
                      الجزائر
                    </SelectItem>
                    <SelectItem value="ly" className="font-arabic">
                      ليبيا
                    </SelectItem>
                    <SelectItem value="sd" className="font-arabic">
                      السودان
                    </SelectItem>
                    <SelectItem value="ps" className="font-arabic">
                      فلسطين
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-arabic">
                  كلمة المرور
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="ادخل كلمة مرور قوية"
                  className="font-arabic text-right"
                  dir="rtl"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-arabic">
                  تأكيد كلمة المرور
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="أعد إدخال كلمة المرور"
                  className="font-arabic text-right"
                  dir="rtl"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm font-arabic">
                  أوافق على{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    الشروط والأحكام
                  </Link>{" "}
                  و{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    سياسة الخصوصية
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full font-arabic" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  "إنشاء الحساب"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-arabic">أو</span>
              </div>
            </div>

            {/* Social Registration Options */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full font-arabic bg-transparent" size="lg">
                <Mail className="w-4 h-4 ml-2" />
                التسجيل بالبريد الإلكتروني
              </Button>
              <Button variant="outline" className="w-full font-arabic bg-transparent" size="lg">
                <Phone className="w-4 h-4 ml-2" />
                التسجيل برقم الهاتف
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="font-arabic bg-transparent">
                  <Facebook className="w-4 h-4 ml-2" />
                  فيسبوك
                </Button>
                <Button variant="outline" className="font-arabic bg-transparent">
                  <Twitter className="w-4 h-4 ml-2" />
                  تويتر
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground font-arabic">
                لديك حساب بالفعل؟{" "}
                <Link href="/login" className="text-primary hover:underline font-arabic">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground font-arabic">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
