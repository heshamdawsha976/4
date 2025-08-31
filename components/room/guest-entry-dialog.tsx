"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Globe, Users, MessageCircle } from "lucide-react"

interface GuestEntryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roomName: string
  roomPlan: "silver" | "gold" | "premium"
  currentParticipants: number
  maxParticipants: number
  onGuestJoin: (guestData: {
    displayName: string
    country: string
    avatar?: string
  }) => void
}

const countries = [
  "السعودية",
  "الإمارات",
  "مصر",
  "الأردن",
  "لبنان",
  "المغرب",
  "تونس",
  "الجزائر",
  "العراق",
  "سوريا",
  "الكويت",
  "قطر",
  "البحرين",
  "عمان",
  "اليمن",
  "السودان",
  "ليبيا",
  "فلسطين",
  "الصومال",
  "جيبوتي",
  "موريتانيا",
  "جزر القمر",
]

const planFeatures = {
  silver: {
    name: "فضية",
    color: "bg-gray-100 text-gray-800",
    features: ["دردشة نصية", "استماع للبث الصوتي", "رموز تعبيرية أساسية"],
  },
  gold: {
    name: "ذهبية",
    color: "bg-yellow-100 text-yellow-800",
    features: ["دردشة نصية", "استماع للبث الصوتي والمرئي", "رموز تعبيرية متقدمة", "إرسال هدايا"],
  },
  premium: {
    name: "مميزة",
    color: "bg-purple-100 text-purple-800",
    features: ["جميع الميزات", "مشاركة في البث الصوتي", "هدايا حصرية", "تفاعل متقدم"],
  },
}

export function GuestEntryDialog({
  open,
  onOpenChange,
  roomName,
  roomPlan,
  currentParticipants,
  maxParticipants,
  onGuestJoin,
}: GuestEntryDialogProps) {
  const [displayName, setDisplayName] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  const handleJoinAsGuest = async () => {
    if (!displayName.trim() || !selectedCountry) return

    setIsJoining(true)

    // محاكاة عملية الانضمام
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onGuestJoin({
      displayName: displayName.trim(),
      country: selectedCountry,
    })

    setIsJoining(false)
    onOpenChange(false)
  }

  const plan = planFeatures[roomPlan]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-arabic text-xl text-center">انضم كزائر إلى الغرفة</DialogTitle>
          <DialogDescription className="font-arabic text-center">
            يمكنك الانضمام والمشاركة في الدردشة بدون إنشاء حساب
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* معلومات الغرفة */}
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold font-arabic">{roomName}</h3>
                  <Badge className={plan.color}>{plan.name}</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="font-arabic">
                    {currentParticipants}/{maxParticipants}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span className="font-arabic">عام</span>
                </div>
              </div>

              <Separator className="my-3" />

              <div>
                <h4 className="font-bold font-arabic text-sm mb-2">الميزات المتاحة للزوار:</h4>
                <div className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="font-arabic">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* نموذج الانضمام */}
          <div className="space-y-4">
            <div>
              <label className="font-arabic text-sm font-medium mb-2 block">الاسم المعروض</label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="أدخل اسمك المعروض"
                className="font-arabic text-right"
                dir="rtl"
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground font-arabic mt-1">سيظهر هذا الاسم للمشاركين الآخرين</p>
            </div>

            <div>
              <label className="font-arabic text-sm font-medium mb-2 block">البلد</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="font-arabic">
                  <SelectValue placeholder="اختر بلدك" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country} className="font-arabic">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* تحذير للزوار */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <UserPlus className="w-4 h-4 text-orange-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-arabic text-orange-800 font-medium mb-1">ملاحظة للزوار</p>
                  <p className="font-arabic text-orange-700 text-xs leading-relaxed">
                    كزائر، يمكنك المشاركة في الدردشة والاستماع للبث. للحصول على ميزات إضافية مثل البث الصوتي والهدايا،
                    يرجى إنشاء حساب.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* أزرار الإجراء */}
          <div className="flex gap-3">
            <Button
              onClick={handleJoinAsGuest}
              disabled={!displayName.trim() || !selectedCountry || isJoining}
              className="flex-1 font-arabic bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              {isJoining ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                  جاري الانضمام...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 ml-2" />
                  انضمام كزائر
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="font-arabic bg-transparent">
              إلغاء
            </Button>
          </div>

          {/* رابط إنشاء حساب */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-arabic mb-2">هل تريد الحصول على جميع الميزات؟</p>
            <Button variant="link" className="font-arabic text-primary p-0 h-auto">
              إنشاء حساب مجاني
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
