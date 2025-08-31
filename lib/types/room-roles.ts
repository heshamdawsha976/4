// نظام الأدوار الخاص بالغرف مع دعم الخطط المختلفة
import type { UserRole, Permission } from "./roles"

export type RoomPlan = "silver" | "gold" | "premium"

export interface RoomPlanLimits {
  maxUsers: number
  roles: Record<UserRole, number>
  features: string[]
  price: number
  currency: string
}

export const ROOM_PLAN_LIMITS: Record<RoomPlan, RoomPlanLimits> = {
  silver: {
    maxUsers: 40,
    roles: {
      app_owner: 0, // غير متاح في الخطط العادية
      room_owner: 1, // مالك واحد فقط
      super_admin: 5,
      admin: 10,
      moderator: 15,
      member: 15,
      guest: 5, // ضيوف محدودين
    },
    features: ["basic_chat", "voice", "video"],
    price: 19,
    currency: "USD",
  },
  gold: {
    maxUsers: 70,
    roles: {
      app_owner: 0,
      room_owner: 1,
      super_admin: 10,
      admin: 20,
      moderator: 30,
      member: 30,
      guest: 10,
    },
    features: ["basic_chat", "voice", "video", "custom_backgrounds", "polls", "advanced_member_sorting"],
    price: 49,
    currency: "USD",
  },
  premium: {
    maxUsers: 150,
    roles: {
      app_owner: 0,
      room_owner: 1,
      super_admin: 30,
      admin: 50,
      moderator: 80,
      member: 80,
      guest: 20,
    },
    features: [
      "basic_chat",
      "voice",
      "video",
      "custom_backgrounds",
      "polls",
      "advanced_member_sorting",
      "private_rooms",
      "advanced_admin_tools",
      "contests_and_prizes",
      "detailed_activity_logs",
    ],
    price: 99,
    currency: "USD",
  },
}

export interface RoomMember {
  id: string
  userId?: string // undefined للضيوف
  username: string
  displayName: string
  avatar?: string
  country?: string
  role: UserRole
  isGuest: boolean
  joinedAt: Date
  lastActive: Date
  permissions: Permission[]
  roomSpecificData: {
    roomId: string
    assignedBy: string
    assignedAt: Date
    isActive: boolean
    isMuted: boolean
    isBanned: boolean
    mutedUntil?: Date
    bannedUntil?: Date
    warnings: number
  }
}

export interface GuestSession {
  id: string
  username: string
  displayName: string
  roomId: string
  joinedAt: Date
  expiresAt: Date
  ipAddress: string
  userAgent: string
  permissions: Permission[]
  isActive: boolean
}

export interface RoomRoleAssignment {
  roomId: string
  userId?: string // undefined للضيوف
  guestSessionId?: string
  role: UserRole
  assignedBy: string
  assignedAt: Date
  expiresAt?: Date
  isActive: boolean
  permissions: Permission[]
}

// دوال مساعدة للأدوار الخاصة بالغرف
export function canAssignRole(assignerRole: UserRole, targetRole: UserRole, roomPlan: RoomPlan): boolean {
  const limits = ROOM_PLAN_LIMITS[roomPlan]

  // التحقق من وجود الدور في الخطة
  if (limits.roles[targetRole] === 0) {
    return false
  }

  // التحقق من الهرمية
  const assignerHierarchy = getRoleHierarchy(assignerRole)
  const targetHierarchy = getRoleHierarchy(targetRole)

  return assignerHierarchy > targetHierarchy
}

export function getRoleHierarchy(role: UserRole): number {
  const hierarchy = {
    app_owner: 100,
    room_owner: 90,
    super_admin: 80,
    admin: 70,
    moderator: 60,
    member: 50,
    guest: 10,
  }
  return hierarchy[role]
}

export function getRoleLimit(roomPlan: RoomPlan, role: UserRole): number {
  return ROOM_PLAN_LIMITS[roomPlan].roles[role]
}

export function hasRoomFeature(roomPlan: RoomPlan, feature: string): boolean {
  return ROOM_PLAN_LIMITS[roomPlan].features.includes(feature)
}
