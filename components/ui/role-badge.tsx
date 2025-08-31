import { Badge } from "@/components/ui/badge"
import { DEFAULT_ROLES, type Role } from "@/lib/types"
import { Crown, Shield, Star, Users, User, UserCheck } from "lucide-react"

interface RoleBadgeProps {
  role: Role | string
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

const getRoleIcon = (roleId: string) => {
  switch (roleId) {
    case "master":
      return Crown
    case "super-admin":
      return Shield
    case "admin":
      return Star
    case "moderator":
      return Users
    case "guest":
      return UserCheck
    default:
      return User
  }
}

export function RoleBadge({ role, size = "md", showIcon = true }: RoleBadgeProps) {
  // إذا كان role من نوع string، ابحث عنه في DEFAULT_ROLES
  const roleData = typeof role === "string"
    ? DEFAULT_ROLES.find(r => r.id === role) || DEFAULT_ROLES.find(r => r.id === "member")!
    : role

  const Icon = getRoleIcon(roleData.id)

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
        backgroundColor: roleData.color,
        color: "#ffffff",
        boxShadow: `0 2px 8px ${roleData.color}40`,
      }}
    >
      {showIcon && <Icon className={`${iconSizes[size]} ml-1`} />}
      {roleData.nameAr}
    </Badge>
  )
}
