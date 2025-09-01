// نظام الأنواع الموحد لتطبيق لقاء
export type UserRole = "guest" | "member" | "moderator" | "admin" | "super_admin" | "master"

export type RoomPlan = "basic" | "silver" | "gold" | "premium"

export interface User {
  id: string
  username: string
  displayName: string
  email?: string
  country?: string
  avatar?: string
  role: UserRole
  isOnline: boolean
  joinedAt: Date
  lastSeen: Date
  isGuest: boolean
}

export interface Room {
  id: string
  name: string
  description: string
  plan: RoomPlan
  ownerId: string
  isActive: boolean
  isPrivate: boolean
  maxUsers: number
  currentUsers: number
  createdAt: Date
  settings: RoomSettings
  participants: RoomParticipant[]
}

export interface RoomSettings {
  allowGuests: boolean
  requireApproval: boolean
  allowVoiceChat: boolean
  allowVideoChat: boolean
  allowFileSharing: boolean
  moderationEnabled: boolean
  welcomeMessage?: string
}

export interface RoomParticipant {
  userId: string
  user: User
  role: UserRole
  joinedAt: Date
  isMuted: boolean
  isSpeaking: boolean
  permissions: RoomPermissions
}

export interface RoomPermissions {
  canSpeak: boolean
  canVideo: boolean
  canChat: boolean
  canInvite: boolean
  canKick: boolean
  canMute: boolean
  canManageRoom: boolean
}

export interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  senderRole: UserRole
  roomId: string
  timestamp: Date
  type: "text" | "system" | "reaction"
  replyTo?: string
}

export interface RoomPlanDefinition {
  id: RoomPlan
  name: string
  nameAr: string
  color: string
  maxUsers: number
  price: number
  features: string[]
}

// تعريف خطط الغرف
export const ROOM_PLANS: RoomPlanDefinition[] = [
  {
    id: "basic",
    name: "Basic",
    nameAr: "أساسي",
    color: "#6B7280",
    maxUsers: 50,
    price: 0,
    features: ["دردشة نصية", "استماع للبث", "رموز تعبيرية أساسية"]
  },
  {
    id: "silver",
    name: "Silver",
    nameAr: "فضي",
    color: "#9CA3AF",
    maxUsers: 200,
    price: 19,
    features: ["دردشة نصية", "بث صوتي", "رموز تعبيرية متقدمة"]
  },
  {
    id: "gold",
    name: "Gold",
    nameAr: "ذهبي",
    color: "#F59E0B",
    maxUsers: 500,
    price: 49,
    features: ["دردشة نصية", "بث صوتي ومرئي", "هدايا افتراضية", "إدارة متقدمة"]
  },
  {
    id: "premium",
    name: "Premium",
    nameAr: "مميز",
    color: "#8B5CF6",
    maxUsers: 1000,
    price: 99,
    features: ["جميع الميزات", "تسجيل الجلسات", "تحليلات متقدمة", "دعم VIP"]
  }
]

// تعريف الأدوار والصلاحيات
export const ROLE_DEFINITIONS: Record<UserRole, {
  nameAr: string
  color: string
  hierarchy: number
  permissions: string[]
}> = {
  guest: {
    nameAr: "ضيف",
    color: "#9CA3AF",
    hierarchy: 1,
    permissions: ["chat", "listen"]
  },
  member: {
    nameAr: "عضو",
    color: "#10B981",
    hierarchy: 2,
    permissions: ["chat", "listen", "speak", "react"]
  },
  moderator: {
    nameAr: "مشرف",
    color: "#3B82F6",
    hierarchy: 3,
    permissions: ["chat", "listen", "speak", "react", "mute", "warn"]
  },
  admin: {
    nameAr: "أدمن",
    color: "#8B5CF6",
    hierarchy: 4,
    permissions: ["chat", "listen", "speak", "react", "mute", "warn", "kick", "manage_speakers"]
  },
  super_admin: {
    nameAr: "سوبر أدمن",
    color: "#EF4444",
    hierarchy: 5,
    permissions: ["chat", "listen", "speak", "react", "mute", "warn", "kick", "manage_speakers", "ban", "assign_roles"]
  },
  master: {
    nameAr: "ماستر",
    color: "#F59E0B",
    hierarchy: 6,
    permissions: ["all"]
  }
}

export function hasPermission(userRole: UserRole, permission: string): boolean {
  const rolePerms = ROLE_DEFINITIONS[userRole].permissions
  return rolePerms.includes("all") || rolePerms.includes(permission)
}

export function canManageUser(managerRole: UserRole, targetRole: UserRole): boolean {
  return ROLE_DEFINITIONS[managerRole].hierarchy > ROLE_DEFINITIONS[targetRole].hierarchy
}