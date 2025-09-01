"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Globe, Users } from "lucide-react"

interface GuestEntryProps {
  roomName: string
  onGuestJoin: (guestData: { displayName: string; country: string }) => void
}

const countries = [
  { code: "SA", name: "السعودية", flag: "🇸🇦" },
  { code: "EG", name: "مصر", flag: "🇪🇬" },
  { code: "AE", name: "الإمارات", flag: "🇦🇪" },
  { code: "JO", name: "الأردن", flag: "🇯🇴" },
  { code: "LB", name: "لبنان", flag: "🇱🇧" },
  { code: "MA", name: "المغرب", flag: "🇲🇦" },
  { code: "TN", name: "تونس", flag: "🇹🇳" },
  { code: "DZ", name: "الجزائر", flag: "🇩🇿" },
  { code: "IQ", name: "العراق", flag: "🇮🇶" },
  { code: "SY", name: "سوريا", flag: "🇸🇾" },
  { code: "KW", name: "الكويت", flag: "🇰🇼" },
  { code: "QA", name: "قطر", flag: "🇶🇦" },
  { code: "BH", name: "البحرين", flag: "🇧🇭" },
  { code: "OM", name: "عمان", flag: "🇴🇲" },
  { code: "YE", name: "اليمن", flag: "🇾🇪" },
  { code: "OTHER", name: "أخرى", flag: "🌍" }
]

export function GuestEntry({ roomName, onGuestJoin }: GuestEntryProps) {
  const [displayName, setDisplayName] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  const handleJoin = async () => {
    if (!displayName.trim()) return

    setIsJoining(true)
    
    // محاكاة عملية الانضمام
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onGuestJoin({
      displayName: displayName.trim(),
      country: selectedCountry || "غير محدد"
    })
    
    setIsJoining(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="font-arabic text-xl">انضم إلى {roomName}</CardTitle>
        <p className="text-muted-foreground font-arabic">يمكنك المشاركة بدون إنشاء حساب</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="font-arabic text-sm font-medium mb-2 block">اسمك المعروض</label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="أدخل اسمك"
            className="font-arabic text-right"
            dir="rtl"
            maxLength={20}
          />
        </div>

        <div>
          <label className="font-arabic text-sm font-medium mb-2 block">البلد (اختياري)</label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="font-arabic">
              <SelectValue placeholder="اختر بلدك" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country.code} value={country.code} className="font-arabic">
                  <div className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <Globe className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800 font-arabic">
              <p className="font-medium mb-1">كضيف يمكنك:</p>
              <ul className="text-xs space-y-1">
                <li>• المشاركة في الدردشة النصية</li>
                <li>• الاستماع للبث الصوتي</li>
                <li>• مشاهدة البث المرئي</li>
                <li>• إرسال ردود الفعل</li>
              </ul>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleJoin}
          disabled={!displayName.trim() || isJoining}
          className="w-full font-arabic bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
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

        <div className="text-center">
          <p className="text-sm text-muted-foreground font-arabic mb-2">
            هل تريد الحصول على جميع الميزات؟
          </p>
          <Button variant="link" className="font-arabic text-primary p-0 h-auto">
            إنشاء حساب مجاني
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}