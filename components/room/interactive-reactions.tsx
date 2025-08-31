"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  ThumbsUp, 
  Laugh, 
  Angry, 
  Frown,
  Sparkles,
  Fire,
  Zap,
  Gift,
  Crown,
  Star,
  Music,
  PartyPopper,
  HandHeart,
  Eye
} from "lucide-react"

interface Reaction {
  id: string
  type: string
  emoji: string
  icon: any
  label: string
  color: string
  count: number
  isActive: boolean
}

interface FloatingReaction {
  id: string
  type: string
  emoji: string
  x: number
  y: number
  startTime: number
}

interface InteractiveReactionsProps {
  onReactionSend: (reactionType: string) => void
  reactions: Reaction[]
  isEnabled?: boolean
  showFloating?: boolean
  className?: string
}

const defaultReactions: Reaction[] = [
  { id: "love", type: "love", emoji: "❤️", icon: Heart, label: "حب", color: "text-red-500", count: 0, isActive: false },
  { id: "like", type: "like", emoji: "👍", icon: ThumbsUp, label: "إعجاب", color: "text-blue-500", count: 0, isActive: false },
  { id: "laugh", type: "laugh", emoji: "😂", icon: Laugh, label: "ضحك", color: "text-yellow-500", count: 0, isActive: false },
  { id: "fire", type: "fire", emoji: "🔥", icon: Fire, label: "رائع", color: "text-orange-500", count: 0, isActive: false },
  { id: "sparkle", type: "sparkle", emoji: "✨", icon: Sparkles, label: "مميز", color: "text-purple-500", count: 0, isActive: false },
  { id: "crown", type: "crown", emoji: "👑", icon: Crown, label: "ملكي", color: "text-yellow-600", count: 0, isActive: false },
  { id: "star", type: "star", emoji: "⭐", icon: Star, label: "نجمة", color: "text-amber-500", count: 0, isActive: false },
  { id: "party", type: "party", emoji: "🎉", icon: PartyPopper, label: "احتفال", color: "text-pink-500", count: 0, isActive: false },
]

export function InteractiveReactions({
  onReactionSend,
  reactions = defaultReactions,
  isEnabled = true,
  showFloating = true,
  className = ""
}: InteractiveReactionsProps) {
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([])
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({})
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set())

  // تنظيف التفاعلات المتحركة
  useEffect(() => {
    if (!showFloating) return

    const interval = setInterval(() => {
      const now = Date.now()
      setFloatingReactions(prev => 
        prev.filter(reaction => now - reaction.startTime < 3000)
      )
    }, 100)

    return () => clearInterval(interval)
  }, [showFloating])

  const handleReactionClick = (reactionType: string) => {
    if (!isEnabled) return

    // إرسال التفاعل
    onReactionSend(reactionType)

    // تحديث العداد المحلي
    setReactionCounts(prev => ({
      ...prev,
      [reactionType]: (prev[reactionType] || 0) + 1
    }))

    // تتبع تفاعلات المستخدم
    setUserReactions(prev => new Set(prev).add(reactionType))

    // إضافة تفاعل متحرك
    if (showFloating) {
      const reaction = reactions.find(r => r.type === reactionType)
      if (reaction) {
        const floatingReaction: FloatingReaction = {
          id: Date.now().toString(),
          type: reactionType,
          emoji: reaction.emoji,
          x: Math.random() * 100,
          y: Math.random() * 50 + 50,
          startTime: Date.now()
        }
        setFloatingReactions(prev => [...prev, floatingReaction])
      }
    }
  }

  const ReactionButton = ({ reaction }: { reaction: Reaction }) => {
    const isUserReaction = userReactions.has(reaction.type)
    const count = reactionCounts[reaction.type] || reaction.count

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReactionClick(reaction.type)}
        disabled={!isEnabled}
        className={`
          flex flex-col items-center gap-1 p-3 h-auto min-w-[4rem] transition-all duration-200 
          hover:scale-110 hover:shadow-lg active:scale-95
          ${isUserReaction 
            ? 'bg-gradient-to-t from-pink-100 to-purple-100 border-2 border-pink-300 shadow-md' 
            : 'hover:bg-gray-50'
          }
        `}
      >
        <div className={`text-2xl transition-transform duration-200 ${isUserReaction ? 'animate-bounce' : ''}`}>
          {reaction.emoji}
        </div>
        <span className={`text-xs font-arabic ${reaction.color} font-medium`}>
          {reaction.label}
        </span>
        {count > 0 && (
          <Badge 
            className={`
              text-xs px-1 min-w-[1.5rem] h-5 
              ${isUserReaction 
                ? 'bg-pink-500 text-white' 
                : 'bg-gray-100 text-gray-700'
              }
            `}
          >
            {count > 999 ? "999+" : count}
          </Badge>
        )}
      </Button>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* التفاعلات المتحركة */}
      {showFloating && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingReactions.map(reaction => (
            <div
              key={reaction.id}
              className="absolute text-3xl animate-float-up"
              style={{
                left: `${reaction.x}%`,
                top: `${reaction.y}%`,
                animationDuration: "3s",
                animationTimingFunction: "ease-out"
              }}
            >
              {reaction.emoji}
            </div>
          ))}
        </div>
      )}

      {/* شريط التفاعلات */}
      <Card className="bg-white/90 backdrop-blur-sm border-pink-100 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-arabic font-semibold text-sm flex items-center gap-2">
              <HandHeart className="w-4 h-4 text-pink-500" />
              التفاعلات
            </h3>
            {!isEnabled && (
              <Badge variant="secondary" className="font-arabic text-xs">
                غير متاح
              </Badge>
            )}
          </div>

          {/* صف التفاعلات الرئيسية */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {reactions.slice(0, 4).map(reaction => (
              <ReactionButton key={reaction.id} reaction={reaction} />
            ))}
          </div>

          {/* صف التفاعلات الإضافية */}
          <div className="grid grid-cols-4 gap-2">
            {reactions.slice(4, 8).map(reaction => (
              <ReactionButton key={reaction.id} reaction={reaction} />
            ))}
          </div>

          {/* إحصائيات سريعة */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span className="font-arabic">
                  {Object.values(reactionCounts).reduce((sum, count) => sum + count, 0)} تفاعل
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-arabic">
                  {userReactions.size} تفاعلاتك
                </span>
              </div>
            </div>
          </div>

          {/* التفاعلات الشائعة */}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {Object.entries(reactionCounts)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([type, count]) => {
                const reaction = reactions.find(r => r.type === type)
                if (!reaction || count === 0) return null
                
                return (
                  <div key={type} className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                    <span className="text-sm">{reaction.emoji}</span>
                    <span className="text-xs text-gray-600">{count}</span>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>

      {/* CSS للحركة */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-50px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) scale(0.8);
            opacity: 0;
          }
        }
        
        .animate-float-up {
          animation: float-up 3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default InteractiveReactions
