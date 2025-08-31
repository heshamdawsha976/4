// نظام الأدوار المتقدم مع ميزات إضافية
import type { UserRole, Permission } from "./roles"

export interface RoleTemplate {
  id: string
  name: string
  nameArabic: string
  description: string
  descriptionArabic: string
  permissions: Permission[]
  color: string
  bgColor: string
  icon: string
  isPublic: boolean
  createdBy: string
  createdAt: Date
  usageCount: number
}

export interface TemporaryRoleAssignment {
  id: string
  userId: string
  roomId: string
  role: UserRole
  assignedBy: string
  assignedAt: Date
  expiresAt: Date
  reason: string
  isActive: boolean
  autoRevoke: boolean
}

export interface RoleChangeLog {
  id: string
  userId: string
  roomId: string
  previousRole: UserRole
  newRole: UserRole
  changedBy: string
  changedAt: Date
  reason: string
  duration?: number // بالدقائق
  isTemporary: boolean
}

export interface RolePermissionOverride {
  id: string
  userId: string
  roomId: string
  permission: Permission
  granted: boolean // true = منح، false = منع
  overriddenBy: string
  overriddenAt: Date
  expiresAt?: Date
  reason: string
}

export interface RoleHierarchyRule {
  higherRole: UserRole
  lowerRole: UserRole
  canPromote: boolean
  canDemote: boolean
  canOverridePermissions: boolean
  requiresApproval: boolean
}

export interface RoleAnalytics {
  roomId: string
  role: UserRole
  totalAssignments: number
  activeAssignments: number
  averageDuration: number // بالساعات
  mostCommonActions: string[]
  performanceScore: number
  lastUpdated: Date
}

// قوالب الأدوار المحددة مسبقاً
export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    id: "event-moderator",
    name: "Event Moderator",
    nameArabic: "مشرف الفعاليات",
    description: "Specialized role for managing events and activities",
    descriptionArabic: "دور متخصص لإدارة الفعاليات والأنشطة",
    permissions: [
      "manage_room_events",
      "moderate_content",
      "mute_members",
      "create_polls",
      "send_messages",
      "join_voice_chat",
      "join_video_chat",
    ],
    color: "#9C27B0",
    bgColor: "#F3E5F5",
    icon: "🎭",
    isPublic: true,
    createdBy: "system",
    createdAt: new Date(),
    usageCount: 0,
  },
  {
    id: "content-curator",
    name: "Content Curator",
    nameArabic: "منسق المحتوى",
    description: "Manages and curates room content",
    descriptionArabic: "يدير وينسق محتوى الغرفة",
    permissions: ["moderate_content", "delete_messages", "upload_files", "send_messages", "react_to_messages"],
    color: "#FF9800",
    bgColor: "#FFF3E0",
    icon: "📝",
    isPublic: true,
    createdBy: "system",
    createdAt: new Date(),
    usageCount: 0,
  },
  {
    id: "vip-member",
    name: "VIP Member",
    nameArabic: "عضو مميز",
    description: "Premium member with enhanced privileges",
    descriptionArabic: "عضو مميز مع صلاحيات محسنة",
    permissions: [
      "send_messages",
      "send_voice_messages",
      "join_voice_chat",
      "join_video_chat",
      "share_screen",
      "upload_files",
      "create_polls",
      "react_to_messages",
    ],
    color: "#E91E63",
    bgColor: "#FCE4EC",
    icon: "⭐",
    isPublic: true,
    createdBy: "system",
    createdAt: new Date(),
    usageCount: 0,
  },
]

// قواعد الهرمية المتقدمة
export const ADVANCED_HIERARCHY_RULES: RoleHierarchyRule[] = [
  {
    higherRole: "app_owner",
    lowerRole: "room_owner",
    canPromote: true,
    canDemote: true,
    canOverridePermissions: true,
    requiresApproval: false,
  },
  {
    higherRole: "room_owner",
    lowerRole: "super_admin",
    canPromote: true,
    canDemote: true,
    canOverridePermissions: true,
    requiresApproval: false,
  },
  {
    higherRole: "super_admin",
    lowerRole: "admin",
    canPromote: true,
    canDemote: true,
    canOverridePermissions: false,
    requiresApproval: false,
  },
  {
    higherRole: "admin",
    lowerRole: "moderator",
    canPromote: true,
    canDemote: true,
    canOverridePermissions: false,
    requiresApproval: true,
  },
]

// دوال مساعدة متقدمة
export function canPerformRoleAction(
  performerRole: UserRole,
  targetRole: UserRole,
  action: "promote" | "demote" | "override",
): boolean {
  const rule = ADVANCED_HIERARCHY_RULES.find((r) => r.higherRole === performerRole && r.lowerRole === targetRole)

  if (!rule) return false

  switch (action) {
    case "promote":
      return rule.canPromote
    case "demote":
      return rule.canDemote
    case "override":
      return rule.canOverridePermissions
    default:
      return false
  }
}

export function calculateRoleScore(role: UserRole, analytics: RoleAnalytics): number {
  const baseScore = {
    app_owner: 100,
    room_owner: 90,
    super_admin: 80,
    admin: 70,
    moderator: 60,
    member: 50,
    guest: 10,
  }[role]

  // تعديل النتيجة بناءً على الأداء
  const performanceMultiplier = analytics.performanceScore / 100
  return Math.round(baseScore * performanceMultiplier)
}

export function getRecommendedRole(currentRole: UserRole, activityLevel: number, trustScore: number): UserRole | null {
  // خوارزمية بسيطة لاقتراح ترقية الدور
  if (currentRole === "guest" && activityLevel > 50 && trustScore > 70) {
    return "member"
  }

  if (currentRole === "member" && activityLevel > 80 && trustScore > 85) {
    return "moderator"
  }

  if (currentRole === "moderator" && activityLevel > 90 && trustScore > 90) {
    return "admin"
  }

  return null
}
