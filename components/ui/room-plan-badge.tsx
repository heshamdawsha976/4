import { Badge } from "@/components/ui/badge"
import type { RoomPlan } from "@/lib/types"
import { Diamond, Award, Medal, Circle } from "lucide-react"

interface RoomPlanBadgeProps {
  plan: RoomPlan
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

const getPlanIcon = (planId: string) => {
  switch (planId) {
    case "premium":
      return Diamond
    case "gold":
      return Award
    case "silver":
      return Medal
    default:
      return Circle
  }
}

export function RoomPlanBadge({ plan, size = "md", showIcon = true }: RoomPlanBadgeProps) {
  const Icon = getPlanIcon(plan.id)

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
        backgroundColor: plan.color,
        color: "#ffffff",
        boxShadow: `0 2px 8px ${plan.color}40`,
      }}
    >
      {showIcon && <Icon className={`${iconSizes[size]} ml-1`} />}
      {plan.nameAr}
    </Badge>
  )
}
