import { Badge } from "@/components/ui/badge"
import { ROOM_PLANS, type RoomPlan, type RoomPlanDefinition } from "@/lib/types"
import { Diamond, Award, Medal, Circle } from "lucide-react"

interface RoomPlanBadgeProps {
  plan: RoomPlan | RoomPlanDefinition
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

const getPlanIcon = (planId: string) => {
  switch (planId) {
    case "premium": return Diamond
    case "gold": return Award
    case "silver": return Medal
    default: return Circle
  }
}

export function RoomPlanBadge({ plan, size = "md", showIcon = true }: RoomPlanBadgeProps) {
  // التعامل مع كلا النوعين من البيانات
  const planData = typeof plan === "string" 
    ? ROOM_PLANS.find(p => p.id === plan)
    : plan

  if (!planData) return null

  const Icon = getPlanIcon(planData.id)

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2"
  }

  const iconSizes = {
    sm: "w-3 h-3", 
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }

  return (
    <Badge
      className={`font-arabic font-medium ${sizeClasses[size]} text-white border-0`}
      style={{ backgroundColor: planData.color }}
    >
      {showIcon && <Icon className={`${iconSizes[size]} ml-1`} />}
      {planData.nameAr}
    </Badge>
  )
}