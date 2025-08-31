"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth/auth-context"
import { UserPlus, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

const countries = [
  { code: "SA", name: "السعودية", flag: "🇸🇦" },
  { code: "EG", name: "مصر", flag: "🇪🇬" },
  { code: "AE", name: "الإ��ارات", flag: "🇦🇪" },
  { code: "MA", name: "المغرب", flag: "🇲🇦" },
  { code: "DZ", name: "الجزائر", flag: "🇩🇿" },
  { code: "TN", name: "تونس", flag: "🇹🇳" },
  { code: "JO", name: "الأردن", flag: "🇯🇴" },
  { code: "LB", name: "لبنان", flag: "🇱🇧" },
  { code: "SY", name: "سوريا", flag: "🇸🇾" },
  { code: "IQ", name: "العراق", flag: "🇮🇶" },
  { code: "YE", name: "اليمن", flag: "🇾🇪" },
  { code: "OM", name: "عُمان", flag: "🇴🇲" },
  { code: "KW", name: "الكويت", flag: "🇰🇼" },
  { code: "QA", name: "قطر", flag: "🇶🇦" },
  { code: "BH", name: "البحرين", flag: "🇧🇭" },
  { code: "PS", name: "فلسطين", flag: "🇵🇸" },
  { code: "LY", name: "ليبيا", flag: "🇱🇾" },
  { code: "SD", name: "السودان", flag: "🇸🇩" },
  { code: "MR", name: "موريتانيا", flag: "🇲🇷" },
  { code: "DJ", name: "جيبوتي", flag: "🇩🇯" },
  { code: "KM", name: "جزر القمر", flag: "🇰🇲" },
  { code: "SO", name: "الصومال", flag: "🇸🇴" },
]

interface GuestLoginDialogProps {
  children: React.ReactNode
  redirectTo?: string
}

export function GuestLoginDialog({ children, redirectTo }: GuestLoginDialogProps) {
  const [open, setOpen] = useState(false)
  const [nickname, setNickname] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("SA")
  const [isLoading, setIsLoading] = useState(false)
  const { loginAsGuest } = useAuth()
  const router = useRouter()

  const handleGuestLogin = async () => {
    if (!nickname.trim()) return

    setIsLoading(true)
    try {
      const success = await loginAsGuest(nickname.trim(), selectedCountry)
      if (success) {
        setOpen(false)
        if (redirectTo) {
          router.push(redirectTo)
        }
      }
    } catch (error) {
      console.error("Guest login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedCountryData = countries.find(c => c.code === selectedCountry)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-arabic text-right">
            <UserPlus className="h-5 w-5 text-pink-600" />
            الدخول كزائر
          </DialogTitle>
          <DialogDescription className="text-right font-arabic">
            أدخل اسماً مستعاراً واختر دولتك للدخول السريع إلى الغرف
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-right font-arabic">
              الاسم المستعار
            </Label>
            <Input
              id="nickname"
              placeholder="أدخل اسماً مستعاراً"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="text-right font-arabic"
              maxLength={20}
            />
            <p className="text-xs text-gray-500 text-right font-arabic">
              يمكنك استخدام أي اسم تريد (20 حرف كحد أقصى)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-right font-arabic">
              الدولة
            </Label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="اختر دولتك">
                  {selectedCountryData && (
                    <div className="flex items-center gap-2">
                      <span>{selectedCountryData.flag}</span>
                      <span className="font-arabic">{selectedCountryData.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span className="font-arabic">{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Globe className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800 font-arabic leading-relaxed">
                <strong>مميزات الزائر:</strong><br />
                • دخول فوري بدون تسجيل<br />
                • مشاركة في جميع ا��غرف العامة<br />
                • دردشة صوتية ونصية<br />
                • تفاعل مع المحتوى
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <div className="text-xs text-amber-800 font-arabic leading-relaxed">
                <strong>للحصول على مميزات إضافية:</strong><br />
                • إنشاء غرف خاصة<br />
                • رسائل خاصة<br />
                • نظام النقاط والشارات<br />
                • حفظ التفضيلات<br />
                يمكنك إنشاء حساب لاحقاً
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleGuestLogin}
              disabled={!nickname.trim() || isLoading}
              className="flex-1 font-arabic bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              {isLoading ? "جاري الدخول..." : "دخول سريع"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="font-arabic border-pink-200 hover:bg-pink-50"
            >
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default GuestLoginDialog
