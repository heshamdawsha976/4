"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { RoomCustomization } from "@/lib/types/roles"
import { Palette, ImageIcon, Settings, Users, Shield } from "lucide-react"

interface RoomCustomizationProps {
  roomId: string
  customization?: RoomCustomization
  onSave?: (customization: RoomCustomization) => void
}

const colorPresets = [
  { name: "وردي كلاسيكي", primary: "#E91E63", secondary: "#F48FB1", bg: "#FCE4EC" },
  { name: "بنفسجي ملكي", primary: "#9C27B0", secondary: "#CE93D8", bg: "#F3E5F5" },
  { name: "أزرق محيطي", primary: "#2196F3", secondary: "#90CAF9", bg: "#E3F2FD" },
  { name: "أخضر طبيعي", primary: "#4CAF50", secondary: "#A5D6A7", bg: "#E8F5E8" },
  { name: "برتقالي دافئ", primary: "#FF9800", secondary: "#FFCC02", bg: "#FFF3E0" },
  { name: "أحمر قوي", primary: "#F44336", secondary: "#EF5350", bg: "#FFEBEE" },
]

export function RoomCustomizationPanel({ roomId, customization, onSave }: RoomCustomizationProps) {
  const [config, setConfig] = useState<RoomCustomization>(
    customization || {
      roomId,
      theme: {
        primaryColor: "#E91E63",
        secondaryColor: "#F48FB1",
        backgroundColor: "#FCE4EC",
        textColor: "#1A1A1A",
        accentColor: "#AD1457",
      },
      branding: {
        welcomeMessage: "مرحباً بكم في غرفتنا المميزة!",
        rules: ["احترام جميع الأعضاء", "عدم استخدام لغة غير لائقة", "الالتزام بموضوع الغرفة"],
      },
      features: {
        allowVoiceChat: true,
        allowVideoChat: true,
        allowScreenShare: false,
        allowFileUpload: true,
        maxMembers: 100,
        isPrivate: false,
        requireApproval: false,
      },
    },
  )

  const handleSave = () => {
    onSave?.(config)
  }

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    setConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        primaryColor: preset.primary,
        secondaryColor: preset.secondary,
        backgroundColor: preset.bg,
        accentColor: preset.primary,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-arabic">تخصيص الغرفة</h2>
        <Button onClick={handleSave} className="font-arabic">
          حفظ التخصيصات
        </Button>
      </div>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-4 font-arabic">
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            المظهر
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            العلامة التجارية
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            المميزات
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            الصلاحيات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">ألوان الغرفة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colorPresets.map((preset, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105"
                    style={{
                      backgroundColor: preset.bg,
                      borderColor: preset.primary,
                    }}
                    onClick={() => applyColorPreset(preset)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }} />
                    </div>
                    <span className="text-sm font-arabic">{preset.name}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <Label className="font-arabic">اللون الأساسي</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.theme.primaryColor}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, primaryColor: e.target.value },
                        }))
                      }
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={config.theme.primaryColor}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, primaryColor: e.target.value },
                        }))
                      }
                      className="font-mono"
                    />
                  </div>
                </div>

                <div>
                  <Label className="font-arabic">اللون الثانوي</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={config.theme.secondaryColor}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, secondaryColor: e.target.value },
                        }))
                      }
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={config.theme.secondaryColor}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, secondaryColor: e.target.value },
                        }))
                      }
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">معاينة المظهر</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="p-6 rounded-lg border-2"
                style={{
                  backgroundColor: config.theme.backgroundColor,
                  borderColor: config.theme.primaryColor,
                  color: config.theme.textColor,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: config.theme.primaryColor }}
                  >
                    غ
                  </div>
                  <div>
                    <h3 className="font-bold font-arabic">غرفة مخصصة</h3>
                    <p className="text-sm opacity-75 font-arabic">معاينة التصميم الجديد</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: config.theme.secondaryColor + "40" }}>
                  <p className="text-sm font-arabic">مرحباً! هذه معاينة لكيفية ظهور الرسائل</p>
                </div>
                <Badge
                  style={{
                    backgroundColor: config.theme.accentColor,
                    color: "white",
                  }}
                  className="font-arabic"
                >
                  عضو مميز
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">رسالة الترحيب</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={config.branding.welcomeMessage}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    branding: { ...prev.branding, welcomeMessage: e.target.value },
                  }))
                }
                placeholder="اكتب رسالة ترحيب مخصصة للغرفة..."
                className="font-arabic min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">قوانين الغرفة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {config.branding.rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={rule}
                    onChange={(e) => {
                      const newRules = [...config.branding.rules]
                      newRules[index] = e.target.value
                      setConfig((prev) => ({
                        ...prev,
                        branding: { ...prev.branding, rules: newRules },
                      }))
                    }}
                    className="font-arabic"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newRules = config.branding.rules.filter((_, i) => i !== index)
                      setConfig((prev) => ({
                        ...prev,
                        branding: { ...prev.branding, rules: newRules },
                      }))
                    }}
                  >
                    حذف
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setConfig((prev) => ({
                    ...prev,
                    branding: {
                      ...prev.branding,
                      rules: [...prev.branding.rules, "قانون جديد"],
                    },
                  }))
                }}
                className="font-arabic"
              >
                إضافة قانون
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">إعدادات الغرفة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="font-arabic">السماح بالدردشة الصوتية</Label>
                <Switch
                  checked={config.features.allowVoiceChat}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      features: { ...prev.features, allowVoiceChat: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="font-arabic">السماح بالدردشة المرئية</Label>
                <Switch
                  checked={config.features.allowVideoChat}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      features: { ...prev.features, allowVideoChat: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="font-arabic">السماح بمشاركة الشاشة</Label>
                <Switch
                  checked={config.features.allowScreenShare}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      features: { ...prev.features, allowScreenShare: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="font-arabic">السماح برفع الملفات</Label>
                <Switch
                  checked={config.features.allowFileUpload}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      features: { ...prev.features, allowFileUpload: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="font-arabic">غرفة خاصة</Label>
                <Switch
                  checked={config.features.isPrivate}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      features: { ...prev.features, isPrivate: checked },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="font-arabic">يتطلب موافقة للانضمام</Label>
                <Switch
                  checked={config.features.requireApproval}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      features: { ...prev.features, requireApproval: checked },
                    }))
                  }
                />
              </div>

              <div>
                <Label className="font-arabic">الحد الأقصى للأعضاء</Label>
                <Input
                  type="number"
                  value={config.features.maxMembers}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      features: { ...prev.features, maxMembers: Number.parseInt(e.target.value) || 100 },
                    }))
                  }
                  className="mt-1"
                  min="1"
                  max="1000"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic">إدارة الأدوار المخصصة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-arabic mb-4">قريباً: إمكانية إنشاء أدوار مخصصة للغرفة</p>
                <Button variant="outline" disabled className="font-arabic bg-transparent">
                  إنشاء دور مخصص
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
