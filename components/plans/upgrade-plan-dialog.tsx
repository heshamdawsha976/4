"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RoomPlanBadge } from "@/components/ui/room-plan-badge"
import { ROOM_PLANS, type RoomPlan } from "@/lib/types"
import { Check, ArrowUp, Crown } from "lucide-react"

interface UpgradePlanDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentPlan: RoomPlan
  onUpgrade: (newPlan: RoomPlan, isYearly: boolean) => void
}

export function UpgradePlanDialog({ open, onOpenChange, currentPlan, onUpgrade }: UpgradePlanDialogProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<RoomPlan | null>(null)

  // فلترة الخطط لإظهار الخطط الأعلى فقط
  const availableUpgrades = ROOM_PLANS.filter((plan) => plan.price > currentPlan.price)

  const getPrice = (basePrice: number) => {
    return isYearly ? Math.floor(basePrice * 12 * 0.8) : basePrice // خصم 20% للاشتراك السنوي
  }

  const handleUpgrade = () => {
    if (selectedPlan) {
      onUpgrade(selectedPlan, isYearly)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-arabic text-2xl">ترقية الخطة</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Plan */}
          <div>
            <h3 className="font-arabic text-lg font-medium mb-3">خطتك الحالية</h3>
            <Card className="border-2 border-muted">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RoomPlanBadge plan={currentPlan} />
                    <div>
                      <p className="font-medium font-arabic">{currentPlan.nameAr}</p>
                      <p className="text-sm text-muted-foreground">
                        {currentPlan.price === 0 ? "مجاني" : `$${currentPlan.price}/شهر`}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-arabic">
                    نشط حالياً
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-arabic ${!isYearly ? "font-medium" : "text-muted-foreground"}`}>شهري</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`font-arabic ${isYearly ? "font-medium" : "text-muted-foreground"}`}>سنوي</span>
            {isYearly && (
              <Badge variant="secondary" className="font-arabic text-xs">
                وفر 20%
              </Badge>
            )}
          </div>

          {/* Available Upgrades */}
          <div>
            <h3 className="font-arabic text-lg font-medium mb-4">الخطط المتاحة للترقية</h3>

            {availableUpgrades.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-arabic text-lg font-medium mb-2">أنت في أعلى خطة!</h3>
                  <p className="text-muted-foreground font-arabic">
                    تستخدم حالياً أفضل خطة متاحة مع جميع المميزات المتقدمة.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableUpgrades.map((plan) => {
                  const price = getPrice(plan.price)
                  const currentPrice = getPrice(currentPlan.price)
                  const priceDifference = price - currentPrice

                  return (
                    <Card
                      key={plan.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedPlan?.id === plan.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <RoomPlanBadge plan={plan} size="lg" />
                          <div className="mt-3">
                            <div className="text-2xl font-bold">${price}</div>
                            <div className="text-sm text-muted-foreground font-arabic">/{isYearly ? "سنة" : "شهر"}</div>
                            {priceDifference > 0 && (
                              <div className="flex items-center justify-center gap-1 mt-2">
                                <ArrowUp className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-500 font-arabic">+${priceDifference} إضافي</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-arabic">المستخدمين:</span>
                            <span>{plan.maxUsers}</span>
                          </div>
                          <div className="text-xs text-muted-foreground font-arabic">
                            <p className="font-medium mb-1">المميزات الجديدة:</p>
                            <ul className="space-y-1">
                              {plan.features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-start gap-1">
                                  <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {selectedPlan?.id === plan.id && (
                          <div className="mt-4 p-2 bg-primary/10 rounded-lg text-center">
                            <span className="text-sm font-arabic text-primary font-medium">محدد للترقية</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Upgrade Summary */}
          {selectedPlan && (
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-arabic text-lg font-medium mb-4">ملخص الترقية</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-arabic">من:</span>
                    <RoomPlanBadge plan={currentPlan} size="sm" />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-arabic">إلى:</span>
                    <RoomPlanBadge plan={selectedPlan} size="sm" />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-arabic">التكلفة الإضافية:</span>
                    <span className="font-medium">
                      +${getPrice(selectedPlan.price) - getPrice(currentPlan.price)}/{isYearly ? "سنة" : "شهر"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-arabic">دورة الفوترة:</span>
                    <span className="font-arabic">{isYearly ? "سنوي" : "شهري"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleUpgrade} disabled={!selectedPlan} className="font-arabic flex-1">
              تأكيد الترقية
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
