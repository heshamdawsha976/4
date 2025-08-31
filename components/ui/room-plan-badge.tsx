import { Badge } from "@/components/ui/badge"
import { ROOM_PLANS, type RoomPlan } from "@/lib/types"
import { Crown, Star, Shield, Circle } from "lucide-react"

interface RoomPlanBadgeProps {
  plan: RoomPlan | string
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

const getPlanIcon = (planId: string) => {
  switch (planId) {
    case "premium":
      return Crown
    case "gold":
      return Star
    case "silver":
      return Shield
    default:
      return Circle
  }
}

export function RoomPlanBadge({ plan, size = "md", showIcon = true }: RoomPlanBadgeProps) {
  // إذا كان plan من نوع string، ابحث عنه في ROOM_PLANS
  const planData = typeof plan === "string" 
    ? ROOM_PLANS.find(p => p.id === plan) || ROOM_PLANS.find(p => p.id === "basic")!
    : plan

  const Icon = getPlanIcon(planData.id)

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <Badge
      className={`font-arabic font-medium ${sizeClasses[size]} border-0`}
      style={{
        backgroundColor: planData.color,
        color: "#ffffff",
        boxShadow: `0 2px 8px ${planData.color}40`,
      }}
    >
      {showIcon && <Icon className={`${iconSizes[size]} ml-1`} />}
      {planData.nameAr}
    </Badge>
  )
}
