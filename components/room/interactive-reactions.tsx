"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ThumbsUp, Star, File as Fire, Crown, Sparkles, Gift, Car as Clap } from "lucide-react"

interface Reaction {
  id: string
  type: string
  emoji: string
  icon: React.ComponentType<any>
  color: string
  count: number
  isActive: boolean
  animation?: string
}

interface FloatingReaction {
  id: string
  emoji: string
  x: number
  y: number
  color: string
}

interface InteractiveReactionsProps {
  onReactionSend: (reaction: string) => void
  isGuest?: boolean
}

export function InteractiveReactions({ onReactionSend, isGuest = false }: InteractiveReactionsProps) {
  const [reactions, setReactions] = useState<Reaction[]>([
    { id: "love", type: "love", emoji: "❤️", icon: Heart, color: "text-red-500", count: 245, isActive: false },
    { id: "like", type: "like", emoji: "👍", icon: ThumbsUp, color: "text-blue-500", count: 189, isActive: false },
    { id: "fire", type: "fire", emoji: "🔥", icon: Fire, color: "text-orange-500", count: 156, isActive: false },
    { id: "star", type: "star", emoji: "⭐", icon: Star, color: "text-yellow-500", count: 134, isActive: false },
    { id: "clap", type: "clap", emoji: "👏", icon: Clap, color: "text-green-500", count: 98, isActive: false },
    { id: "crown", type: "crown", emoji: "👑", icon: Crown, color: "text-purple-500", count: 67, isActive: false },
  ])

  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([])
  const [showGiftMenu, setShowGiftMenu] = useState(false)

  const handleReactionClick = (reactionId: string) => {
    setReactions((prev) =>
      prev.map((r) => (r.id === reactionId ? { ...r, count: r.count + 1, isActive: true } : { ...r, isActive: false })),
    )

    const reaction = reactions.find((r) => r.id === reactionId)
    if (reaction) {
      onReactionSend(reaction.type)

      // إضافة تفاعل عائم
      const newFloatingReaction: FloatingReaction = {
        id: Date.now().toString(),
        emoji: reaction.emoji,
        x: Math.random() * 300,
        y: Math.random() * 200,
        color: reaction.color,
      }

      setFloatingReactions((prev) => [...prev, newFloatingReaction])

      // إزالة التفاعل العائم بعد الانيميشن
      setTimeout(() => {
        setFloatingReactions((prev) => prev.filter((fr) => fr.id !== newFloatingReaction.id))
      }, 3000)
    }

    // إعادة تعيين الحالة النشطة
    setTimeout(() => {
      setReactions((prev) => prev.map((r) => ({ ...r, isActive: false })))
    }, 1000)
  }

  const gifts = [
    { id: "rose", name: "وردة", emoji: "🌹", cost: 10, color: "text-red-500" },
    { id: "diamond", name: "ماسة", emoji: "💎", cost: 50, color: "text-blue-500" },
    { id: "crown", name: "تاج", emoji: "👑", cost: 100, color: "text-yellow-500" },
    { id: "rocket", name: "صاروخ", emoji: "🚀", cost: 200, color: "text-purple-500" },
  ]

  return (
    <div className="relative">
      {/* التفاعلات العائمة */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingReactions.map((reaction) => (
          <div
            key={reaction.id}
            className="absolute text-2xl animate-bounce"
            style={{
              left: `${reaction.x}px`,
              top: `${reaction.y}px`,
              animation: "float-up 3s ease-out forwards",
            }}
          >
            {reaction.emoji}
          </div>
        ))}
      </div>

      <Card className="border-primary/20 bg-gradient-to-r from-pink-50 to-purple-50">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* التفاعلات السريعة */}
            <div>
              <h4 className="font-bold font-arabic text-sm mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                التفاعل السريع
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {reactions.map((reaction) => {
                  const Icon = reaction.icon
                  return (
                    <Button
                      key={reaction.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleReactionClick(reaction.id)}
                      className={`font-arabic transition-all duration-200 hover:scale-105 bg-transparent ${
                        reaction.isActive ? "ring-2 ring-primary scale-105" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{reaction.emoji}</span>
                        <span className="text-xs">{reaction.count}</span>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* الهدايا الافتراضية */}
            {!isGuest && (
              <div>
                <h4 className="font-bold font-arabic text-sm mb-3 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-primary" />
                  الهدايا الافتراضية
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {gifts.map((gift) => (
                    <Button
                      key={gift.id}
                      variant="outline"
                      size="sm"
                      onClick={() => onReactionSend(`gift:${gift.id}`)}
                      className="font-arabic bg-transparent hover:bg-primary/5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{gift.emoji}</span>
                        <div className="text-right">
                          <div className="text-xs font-medium">{gift.name}</div>
                          <div className="text-xs text-muted-foreground">{gift.cost} عملة</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* رسالة للزوار */}
            {isGuest && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-orange-600" />
                    <p className="font-arabic text-orange-800 text-xs">
                      سجل دخولك لإرسال الهدايا الافتراضية والحصول على ميزات إضافية
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* إحصائيات التفاعل */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-arabic">إجمالي التفاعلات: {reactions.reduce((sum, r) => sum + r.count, 0)}</span>
              <Badge variant="secondary" className="font-arabic">
                نشط جداً
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-50px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.8);
          }
        }
      `}</style>
    </div>
  )
}
