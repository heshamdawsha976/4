"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { guestAuth } from "@/lib/auth/guest-auth"
import type { GuestSession } from "@/lib/types/room-roles"
import { Users, Clock, Globe } from "lucide-react"

interface GuestLoginProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roomId: string
  roomName: string
  onGuestLogin: (session: GuestSession) => void
}

const countries = [
  { code: "SA", name: "السعودية", flag: "🇸🇦" },
  { code: "AE", name: "الإمارات", flag: "🇦🇪" },
  { code: "EG", name: "مصر", flag: "🇪🇬" },
  { code: "JO", name: "الأردن", flag: "🇯🇴" },
  { code: "LB", name: "لبنان", flag: "🇱🇧" },
  { code: "SY", name: "سوريا", flag: "🇸🇾" },
  { code: "IQ", name: "العراق", flag: "🇮🇶" },
  { code: "KW", name: "الكويت", flag: "🇰🇼" },
  { code: "QA", name: "قطر", flag: "🇶🇦" },
  { code: "BH", name: "البحرين", flag: "🇧🇭" },
  { code: "OM", name: "عمان", flag: "🇴🇲" },
  { code: "YE", name: "اليمن", flag: "🇾🇪" },
  { code: "MA", name: "المغرب", flag: "🇲🇦" },
  { code: "TN", name: "تونس", flag: "🇹🇳" },
  { code: "DZ", name: "الجزائر", flag: "🇩🇿" },
  { code: "LY", name: "ليبيا", flag: "🇱🇾" },
  { code: "SD", name: "السودان", flag: "🇸🇩" },
  { code: "US", name: "الولايات المتحدة", flag: "🇺🇸" },
  { code: "GB", name: "المملكة المتحدة", flag: "🇬🇧" },
  { code: "FR", name: "فرنسا", flag: "🇫🇷" },
  { code: "DE", name: "ألمانيا", flag: "🇩🇪" },
  { code: "OTHER", name: "أخرى", flag: "🌍" },
]

export function GuestLoginDialog({ open, onOpenChange, roomId, roomName, onGuestLogin }: GuestLoginProps) {
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [country, setCountry] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // التحقق من وجود جلسة ضيف محفوظة
  const existingSession = guestAuth.getStoredGuestSession(roomId)

  const handleGuestLogin = async () => {
    if (!username.trim() || !displayName.trim()) {
      setError("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    if (username.length < 3) {
      setError("اسم المستخدم يجب أن يكون 3 أحرف على الأقل")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const session = guestAuth.createGuestSession({
        username: username.trim(),
        displayName: displayName.trim(),
        roomId,
        country: country || undefined,
      })

      onGuestLogin(session)
      onOpenChange(false)
    } catch (err) {
      setError("حدث خطأ أثناء إنشاء الجلسة")
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinueExistingSession = () => {
    if (existingSession) {
      onGuestLogin(existingSession)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-arabic text-center text-xl">الانضمام كضيف</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* معلومات الغرفة */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-arabic font-medium">{roomName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-arabic">
                <Clock className="w-4 h-4" />
                <span>جلسة الضيف تنتهي بعد 24 ساعة</span>
              </div>
            </CardContent>
          </Card>

          {/* جلسة موجودة */}
          {existingSession && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-arabic font-medium text-green-800">لديك جلسة نشطة</p>
                    <p className="text-sm text-green-600 font-arabic">{existingSession.displayName}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 font-arabic">
                    نشط
                  </Badge>
                </div>
                <Button
                  onClick={handleContinueExistingSession}
                  className="w-full font-arabic bg-transparent"
                  variant="outline"
                >
                  متابعة الجلسة الحالية
                </Button>
              </CardContent>
            </Card>
          )}

          {/* نموذج تسجيل جديد */}
          <div className="space-y-4">
            <div>
              <Label className="font-arabic">اسم المستخدم *</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="اختر اسم مستخدم مؤقت"
                className="font-arabic"
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground font-arabic mt-1">سيظهر للآخرين في الغرفة</p>
            </div>

            <div>
              <Label className="font-arabic">الاسم المعروض *</Label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="الاسم الذي تريد أن يراه الآخرون"
                className="font-arabic"
                maxLength={30}
              />
            </div>

            <div>
              <Label className="font-arabic">البلد (اختياري)</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="font-arabic">
                  <SelectValue placeholder="اختر بلدك" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code} className="font-arabic">
                      <div className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <div className="text-sm text-destructive font-arabic bg-destructive/10 p-3 rounded-lg">{error}</div>
            )}

            <Button onClick={handleGuestLogin} disabled={isLoading} className="w-full font-arabic">
              {isLoading ? "جاري الانضمام..." : "انضمام كضيف"}
            </Button>
          </div>

          {/* معلومات إضافية */}
          <div className="text-xs text-muted-foreground font-arabic space-y-1 border-t pt-4">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <span>كضيف، يمكنك المشاركة في الدردشة والصوت</span>
            </div>
            <p>• لا تحتاج إلى إنشاء حساب</p>
            <p>• بياناتك محفوظة محلياً فقط</p>
            <p>• يمكنك الترقية لعضوية كاملة لاحقاً</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
