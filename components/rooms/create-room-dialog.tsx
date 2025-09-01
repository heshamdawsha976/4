"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import { ROOM_PLANS, type Room, type RoomPlanDefinition, type RoomSettings } from "@/lib/types"
import { Check } from "lucide-react"

interface CreateRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateRoom: (room: Partial<Room>) => void
}

export function CreateRoomDialog({ open, onOpenChange, onCreateRoom }: CreateRoomDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<RoomPlanDefinition>(ROOM_PLANS[3]) // Basic plan by default
  const [roomName, setRoomName] = useState("")
  const [roomDescription, setRoomDescription] = useState("")
  const [settings, setSettings] = useState<RoomSettings>({
    allowGuests: true,
    requireApproval: false,
    maxParticipants: selectedPlan.maxUsers,
    allowPrivateMessages: true,
    allowVoiceChat: true,
    allowVideoChat: false,
    allowFileSharing: false,
  })

  const handlePlanSelect = (plan: RoomPlanDefinition) => {
    setSelectedPlan(plan)
    setSettings({
      ...settings,
      maxParticipants: plan.maxUsers,
      allowVideoChat: plan.id !== "basic",
      allowFileSharing: ["premium", "gold"].includes(plan.id),
    })
  }

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      onCreateRoom({
        name: roomName,
        description: roomDescription,
        plan: selectedPlan,
        settings,
      })

      // Reset form
      setRoomName("")
      setRoomDescription("")
      setSelectedPlan(ROOM_PLANS[3])
      setSettings({
        allowGuests: true,
        requireApproval: false,
        maxParticipants: ROOM_PLANS[3].maxUsers,
        allowPrivateMessages: true,
        allowVoiceChat: true,
        allowVideoChat: false,
        allowFileSharing: false,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-arabic text-2xl">إنشاء غرفة جديدة</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label className="font-arabic">اسم الغرفة</Label>
              <Input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="أدخل اسم الغرفة"
                className="font-arabic"
              />
            </div>
            <div>
              <Label className="font-arabic">وصف الغرفة (اختياري)</Label>
              <Textarea
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                placeholder="وصف مختصر للغرفة"
                className="font-arabic"
                rows={3}
              />
            </div>
          </div>

          {/* Plan Selection */}
          <div>
            <Label className="font-arabic text-lg font-medium mb-4 block">اختر خطة الغرفة</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ROOM_PLANS.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPlan.id === plan.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <RoomPlanBadge plan={plan} />
                      {selectedPlan.id === plan.id && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-arabic">الحد الأقصى للمستخدمين:</span>
                        <span className="font-medium">{plan.maxUsers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-arabic">السعر:</span>
                        <span className="font-medium">{plan.price === 0 ? "مجاني" : `$${plan.price}`}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Label className="text-xs font-arabic text-muted-foreground">المميزات:</Label>
                      <ul className="text-xs font-arabic text-muted-foreground mt-1 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Room Settings */}
          <div>
            <Label className="font-arabic text-lg font-medium mb-4 block">إعدادات الغرفة</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">السماح للضيوف</Label>
                    <p className="text-sm text-muted-foreground font-arabic">السماح للمستخدمين غير المسجلين بالدخول</p>
                  </div>
                  <Switch
                    checked={settings.allowGuests}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowGuests: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">يتطلب موافقة</Label>
                    <p className="text-sm text-muted-foreground font-arabic">مراجعة طلبات الانضمام قبل القبول</p>
                  </div>
                  <Switch
                    checked={settings.requireApproval}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireApproval: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">الرسائل الخاصة</Label>
                    <p className="text-sm text-muted-foreground font-arabic">السماح بالرسائل الخاصة بين المستخدمين</p>
                  </div>
                  <Switch
                    checked={settings.allowPrivateMessages}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowPrivateMessages: checked })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">الدردشة الصوتية</Label>
                    <p className="text-sm text-muted-foreground font-arabic">تفعيل المحادثات الصوتية</p>
                  </div>
                  <Switch
                    checked={settings.allowVoiceChat}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowVoiceChat: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">الدردشة المرئية</Label>
                    <p className="text-sm text-muted-foreground font-arabic">تفعيل المكالمات المرئية</p>
                  </div>
                  <Switch
                    checked={settings.allowVideoChat}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowVideoChat: checked })}
                    disabled={selectedPlan.id === "basic"}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">مشاركة الملفات</Label>
                    <p className="text-sm text-muted-foreground font-arabic">السماح برفع ومشاركة الملفات</p>
                  </div>
                  <Switch
                    checked={settings.allowFileSharing}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowFileSharing: checked })}
                    disabled={!["premium", "gold"].includes(selectedPlan.id)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Label className="font-arabic">الحد الأقصى للمشاركين</Label>
              <Input
                type="number"
                value={settings.maxParticipants}
                onChange={(e) => setSettings({ ...settings, maxParticipants: Number.parseInt(e.target.value) })}
                min="1"
                max={selectedPlan.maxUsers}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground font-arabic mt-1">
                الحد الأقصى المسموح: {selectedPlan.maxUsers} مستخدم
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleCreateRoom} className="font-arabic flex-1">
              إنشاء الغرفة
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="font-arabic">
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
