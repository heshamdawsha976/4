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
import { MessageCircle, Mail, Phone, Facebook, Twitter, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("بيانات تسجيل الدخول غير صحيحة")
      }
    } catch (error) {
      setError("حدث خطأ أثناء تسجيل الدخول")
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
          <p className="text-muted-foreground font-arabic mt-2">مرحباً بك مرة أخرى</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-arabic">تسجيل الدخول</CardTitle>
            <CardDescription className="font-arabic">ادخل إلى حسابك للوصول إلى غرف الدردشة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-arabic">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-arabic">
                  البريد الإلكتروني أو رقم الهاتف
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="example@email.com أو +966501234567"
                  className="font-arabic text-right"
                  dir="rtl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-arabic">
                  كلمة المرور
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="ادخل كلمة المرور"
                  className="font-arabic text-right"
                  dir="rtl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline font-arabic">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <Button type="submit" className="w-full font-arabic" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin ml-2" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  "تسجيل الدخول"
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

            {/* Social Login Options */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full font-arabic bg-transparent" size="lg">
                <Mail className="w-4 h-4 ml-2" />
                تسجيل الدخول بالبريد الإلكتروني
              </Button>
              <Button variant="outline" className="w-full font-arabic bg-transparent" size="lg">
                <Phone className="w-4 h-4 ml-2" />
                تسجيل الدخول برقم الهاتف
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
                ليس لديك حساب؟{" "}
                <Link href="/register" className="text-primary hover:underline font-arabic">
                  إنشاء حساب جديد
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
