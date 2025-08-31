"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import type { Room } from "@/lib/types"
import { Save, X } from "lucide-react"

interface RoomSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  room: Room
  onUpdateRoom: (room: Room) => void
}

export function RoomSettingsDialog({ open, onOpenChange, room, onUpdateRoom }: RoomSettingsDialogProps) {
  const [roomName, setRoomName] = useState(room.name)
  const [roomDescription, setRoomDescription] = useState(room.description || "")
  const [settings, setSettings] = useState(room.settings)

  const handleSave = () => {
    const updatedRoom: Room = {
      ...room,
      name: roomName,
      description: roomDescription,
      settings,
    }
    onUpdateRoom(updatedRoom)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-arabic text-2xl">إعدادات الغرفة</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label className="font-arabic">اسم الغرفة</Label>
              <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} className="font-arabic" />
            </div>
            <div>
              <Label className="font-arabic">وصف الغرفة</Label>
              <Textarea
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                className="font-arabic"
                rows={3}
              />
            </div>
            <div>
              <Label className="font-arabic">خطة الغرفة</Label>
              <div className="mt-2">
                <RoomPlanBadge plan={room.plan} size="lg" />
              </div>
            </div>
          </div>

          {/* Room Settings */}
          <div>
            <Label className="font-arabic text-lg font-medium mb-4 block">إعدادات الغرفة</Label>
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
                  disabled={room.plan.id === "basic"}
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
                  disabled={!["premium", "gold"].includes(room.plan.id)}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label className="font-arabic">الحد الأقصى للمشاركين</Label>
              <Input
                type="number"
                value={settings.maxParticipants}
                onChange={(e) => setSettings({ ...settings, maxParticipants: Number.parseInt(e.target.value) })}
                min="1"
                max={room.plan.maxUsers}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground font-arabic mt-1">
                الحد الأقصى المسموح: {room.plan.maxUsers} مستخدم
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="font-arabic flex-1">
              <Save className="w-4 h-4 ml-2" />
              حفظ التغييرات
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="font-arabic">
              <X className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
