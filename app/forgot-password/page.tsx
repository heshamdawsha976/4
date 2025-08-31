import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-arabic text-primary">لقاء</h1>
          <p className="text-muted-foreground font-arabic mt-2">استعادة كلمة المرور</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-arabic">نسيت كلمة المرور؟</CardTitle>
            <CardDescription className="font-arabic">لا تقلق، سنرسل لك رابط لإعادة تعيين كلمة المرور</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
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
                />
              </div>
              <Button className="w-full font-arabic" size="lg">
                إرسال رابط الاستعادة
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground font-arabic mb-4">
                تذكرت كلمة المرور؟{" "}
                <Link href="/login" className="text-primary hover:underline font-arabic">
                  تسجيل الدخول
                </Link>
              </p>

              <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground font-arabic"
              >
                <ArrowRight className="w-4 h-4 ml-1" />
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
