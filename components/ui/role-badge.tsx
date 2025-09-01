import { Badge } from "@/components/ui/badge"
import { ROLE_DEFINITIONS, type UserRole } from "@/lib/types"
import { Crown, Shield, Star, Users, User, UserCheck } from "lucide-react"

interface RoleBadgeProps {
  role: UserRole
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

const getRoleIcon = (role: UserRole) => {
  switch (role) {
    case "master": return Crown
    case "super_admin": return Shield
    case "admin": return Star
    case "moderator": return Users
    case "member": return User
    case "guest": return UserCheck
    default: return User
  }
}

export function RoleBadge({ role, size = "md", showIcon = true }: RoleBadgeProps) {
  const roleData = ROLE_DEFINITIONS[role]
  const Icon = getRoleIcon(role)

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
      style={{ backgroundColor: roleData.color }}
    >
      {showIcon && <Icon className={`${iconSizes[size]} ml-1`} />}
      {roleData.nameAr}
    </Badge>
  )
}