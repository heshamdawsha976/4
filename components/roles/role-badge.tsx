import { Badge } from "@/components/ui/badge"
import { SYSTEM_ROLES, type UserRole } from "@/lib/types/roles"
import { Crown, Home, Shield, Star, Wrench, User, Users } from "lucide-react"

interface RoleBadgeProps {
  role: UserRole
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
  showText?: boolean
  className?: string
}

const roleIcons = {
  app_owner: Crown,
  room_owner: Home,
  super_admin: Shield,
  admin: Star,
  moderator: Wrench,
  member: User,
  guest: Users,
}

export function RoleBadge({ role, size = "md", showIcon = true, showText = true, className = "" }: RoleBadgeProps) {
  const roleDefinition = SYSTEM_ROLES[role]
  const Icon = roleIcons[role]

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
      className={`font-arabic font-medium border-0 ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: roleDefinition.bgColor,
        color: roleDefinition.color,
      }}
    >
      {showIcon && <Icon className={`${iconSizes[size]} ${showText ? "ml-1" : ""}`} />}
      {showText && roleDefinition.nameArabic}
    </Badge>
  )
}

export function RoleIndicator({ role, className = "" }: { role: UserRole; className?: string }) {
  const roleDefinition = SYSTEM_ROLES[role]
  const Icon = roleIcons[role]

  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${className}`}
      style={{ backgroundColor: roleDefinition.color }}
      title={roleDefinition.nameArabic}
    >
      <Icon className="w-4 h-4 text-white" />
    </div>
  )
}
