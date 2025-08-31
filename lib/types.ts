export interface User {
  id: string
  name: string
  avatar?: string
  country?: string
}

export interface Role {
  id: string
  name: string
  nameAr: string
  color: string
  permissions: Permission[]
  priority: number // أعلى رقم = أعلى صلاحية
}

export interface Permission {
  id: string
  name: string
  nameAr: string
  description: string
}

export interface RoomPlan {
  id: string
  name: string
  nameAr: string
  color: string
  maxUsers: number
  features: string[]
  price: number
  currency: string
}

export interface Room {
  id: string
  name: string
  description?: string
  plan: RoomPlan
  owner: User
  moderators: UserRole[]
  participants: UserRole[]
  isActive: boolean
  createdAt: Date
  settings: RoomSettings
}

export interface UserRole {
  user: User
  role: Role
  assignedAt: Date
  assignedBy: string
}

export interface RoomSettings {
  allowGuests: boolean
  requireApproval: boolean
  maxParticipants: number
  allowPrivateMessages: boolean
  allowVoiceChat: boolean
  allowVideoChat: boolean
  allowFileSharing: boolean
}

// الأدوار المحددة مسبقاً
export const DEFAULT_ROLES: Role[] = [
  {
    id: "master",
    name: "Master",
    nameAr: "ماستر",
    color: "#FFD700", // ذهبي
    priority: 100,
    permissions: [
      { id: "all", name: "All Permissions", nameAr: "جميع الصلاحيات", description: "Full control over the room" },
    ],
  },
  {
    id: "super-admin",
    name: "Super Admin",
    nameAr: "سوبر أدمن",
    color: "#FF6B35", // برتقالي
    priority: 80,
    permissions: [
      {
        id: "manage-users",
        name: "Manage Users",
        nameAr: "إدارة المستخدمين",
        description: "Add/remove users and assign roles",
      },
      { id: "manage-room", name: "Manage Room", nameAr: "إدارة الغرفة", description: "Change room settings" },
      {
        id: "moderate-chat",
        name: "Moderate Chat",
        nameAr: "إدارة الدردشة",
        description: "Delete messages and mute users",
      },
    ],
  },
  {
    id: "admin",
    name: "Admin",
    nameAr: "أدمن",
    color: "#4ECDC4", // تركوازي
    priority: 60,
    permissions: [
      {
        id: "moderate-chat",
        name: "Moderate Chat",
        nameAr: "إدارة الدردشة",
        description: "Delete messages and mute users",
      },
      {
        id: "manage-participants",
        name: "Manage Participants",
        nameAr: "إدارة المشاركين",
        description: "Invite and remove participants",
      },
    ],
  },
  {
    id: "moderator",
    name: "Moderator",
    nameAr: "مشرف",
    color: "#45B7D1", // أزرق
    priority: 40,
    permissions: [
      {
        id: "moderate-chat",
        name: "Moderate Chat",
        nameAr: "إدارة الدردشة",
        description: "Delete messages and mute users",
      },
    ],
  },
  {
    id: "member",
    name: "Member",
    nameAr: "عضو",
    color: "#96CEB4", // أخضر فاتح
    priority: 20,
    permissions: [
      { id: "send-messages", name: "Send Messages", nameAr: "إرسال الرسائل", description: "Send messages in chat" },
      { id: "voice-chat", name: "Voice Chat", nameAr: "الدردشة الصوتية", description: "Participate in voice chat" },
    ],
  },
  {
    id: "guest",
    name: "Guest",
    nameAr: "زائر",
    color: "#FFA726", // برتقالي فاتح
    priority: 10,
    permissions: [
      { id: "send-messages", name: "Send Messages", nameAr: "إرسال الرسائل", description: "Send messages in chat" },
      { id: "voice-chat", name: "Voice Chat", nameAr: "الدردشة الصوتية", description: "Participate in voice chat" },
      { id: "listen-only", name: "Listen Only", nameAr: "الاستماع فقط", description: "Listen to voice chat" },
    ],
  },
]

// خطط الغرف
export const ROOM_PLANS: RoomPlan[] = [
  {
    id: "premium",
    name: "Premium Room",
    nameAr: "روم مميز",
    color: "#8A2BE2", // بنفسجي
    maxUsers: 1000,
    features: ["دردشة صوتية ومرئية", "هدايا افتراضية", "تسجيل المحادثات", "إدارة متقدمة"],
    price: 99,
    currency: "USD",
  },
  {
    id: "gold",
    name: "Gold Room",
    nameAr: "روم ذهبي",
    color: "#FFD700", // ذهبي
    maxUsers: 500,
    features: ["دردشة صوتية ومرئية", "هدايا افتراضية", "إدارة متوسطة"],
    price: 49,
    currency: "USD",
  },
  {
    id: "silver",
    name: "Silver Room",
    nameAr: "روم فضي",
    color: "#C0C0C0", // فضي
    maxUsers: 200,
    features: ["دردشة صوتية", "إدارة أساسية"],
    price: 19,
    currency: "USD",
  },
  {
    id: "basic",
    name: "Basic Room",
    nameAr: "روم أساسي",
    color: "#87CEEB", // أزرق فاتح
    maxUsers: 50,
    features: ["دردشة نصية", "إدارة محدودة"],
    price: 0,
    currency: "USD",
  },
]
