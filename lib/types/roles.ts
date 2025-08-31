// نظام الأدوار المتقدم لتطبيق لقاء
export type UserRole = "app_owner" | "room_owner" | "super_admin" | "admin" | "moderator" | "member" | "guest"

export type Permission =
  // صلاحيات مالك التطبيق
  | "manage_all_rooms"
  | "manage_users"
  | "manage_subscriptions"
  | "view_analytics"
  | "manage_app_settings"
  | "create_room_plans"
  | "ban_users_globally"

  // صلاحيات مالك الغرفة
  | "manage_room_settings"
  | "assign_room_roles"
  | "customize_room_theme"
  | "manage_room_members"
  | "delete_room"
  | "transfer_room_ownership"

  // صلاحيات إدارية في الغرفة
  | "kick_members"
  | "ban_members"
  | "mute_members"
  | "delete_messages"
  | "manage_room_events"
  | "moderate_content"

  // صلاحيات أساسية
  | "send_messages"
  | "send_voice_messages"
  | "join_voice_chat"
  | "join_video_chat"
  | "share_screen"
  | "upload_files"
  | "create_polls"
  | "react_to_messages"

export interface RoleDefinition {
  id: UserRole
  name: string
  nameArabic: string
  description: string
  descriptionArabic: string
  color: string
  bgColor: string
  icon: string
  permissions: Permission[]
  hierarchy: number // أعلى رقم = صلاحيات أكثر
  isSystemRole: boolean // لا يمكن حذفها أو تعديلها
}

export interface UserRoleAssignment {
  userId: string
  username: string
  role: UserRole
  assignedBy: string
  assignedAt: Date
  roomId?: string // إذا كان الدور خاص بغرفة معينة
  expiresAt?: Date
  isActive: boolean
}

export interface RoomCustomization {
  roomId: string
  theme: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
  branding: {
    logo?: string
    banner?: string
    welcomeMessage: string
    rules: string[]
  }
  features: {
    allowVoiceChat: boolean
    allowVideoChat: boolean
    allowScreenShare: boolean
    allowFileUpload: boolean
    maxMembers: number
    isPrivate: boolean
    requireApproval: boolean
  }
  customRoles?: CustomRole[]
}

export interface CustomRole {
  id: string
  name: string
  nameArabic: string
  color: string
  permissions: Permission[]
  roomId: string
  createdBy: string
  createdAt: Date
}

// تعريف الأدوار الأساسية
export const SYSTEM_ROLES: Record<UserRole, RoleDefinition> = {
  app_owner: {
    id: "app_owner",
    name: "App Owner",
    nameArabic: "مالك التطبيق",
    description: "Full control over the entire application",
    descriptionArabic: "تحكم كامل في التطبيق بالكامل",
    color: "#FFD700",
    bgColor: "#FFF9C4",
    icon: "👑",
    hierarchy: 100,
    isSystemRole: true,
    permissions: [
      "manage_all_rooms",
      "manage_users",
      "manage_subscriptions",
      "view_analytics",
      "manage_app_settings",
      "create_room_plans",
      "ban_users_globally",
      "manage_room_settings",
      "assign_room_roles",
      "customize_room_theme",
      "manage_room_members",
      "delete_room",
      "transfer_room_ownership",
      "kick_members",
      "ban_members",
      "mute_members",
      "delete_messages",
      "manage_room_events",
      "moderate_content",
      "send_messages",
      "send_voice_messages",
      "join_voice_chat",
      "join_video_chat",
      "share_screen",
      "upload_files",
      "create_polls",
      "react_to_messages",
    ],
  },
  room_owner: {
    id: "room_owner",
    name: "Room Owner",
    nameArabic: "مالك الغرفة",
    description: "Full control over their room",
    descriptionArabic: "تحكم كامل في الغرفة الخاصة بهم",
    color: "#FF6B35",
    bgColor: "#FFE5DB",
    icon: "🏠",
    hierarchy: 90,
    isSystemRole: true,
    permissions: [
      "manage_room_settings",
      "assign_room_roles",
      "customize_room_theme",
      "manage_room_members",
      "delete_room",
      "transfer_room_ownership",
      "kick_members",
      "ban_members",
      "mute_members",
      "delete_messages",
      "manage_room_events",
      "moderate_content",
      "send_messages",
      "send_voice_messages",
      "join_voice_chat",
      "join_video_chat",
      "share_screen",
      "upload_files",
      "create_polls",
      "react_to_messages",
    ],
  },
  super_admin: {
    id: "super_admin",
    name: "Super Admin",
    nameArabic: "سوبر أدمن",
    description: "Advanced administrative privileges",
    descriptionArabic: "صلاحيات إدارية متقدمة",
    color: "#E53E3E",
    bgColor: "#FED7D7",
    icon: "🛡️",
    hierarchy: 80,
    isSystemRole: true,
    permissions: [
      "assign_room_roles",
      "manage_room_members",
      "kick_members",
      "ban_members",
      "mute_members",
      "delete_messages",
      "manage_room_events",
      "moderate_content",
      "send_messages",
      "send_voice_messages",
      "join_voice_chat",
      "join_video_chat",
      "share_screen",
      "upload_files",
      "create_polls",
      "react_to_messages",
    ],
  },
  admin: {
    id: "admin",
    name: "Admin",
    nameArabic: "أدمن",
    description: "Standard administrative privileges",
    descriptionArabic: "صلاحيات إدارية أساسية",
    color: "#3182CE",
    bgColor: "#BEE3F8",
    icon: "⭐",
    hierarchy: 70,
    isSystemRole: true,
    permissions: [
      "kick_members",
      "mute_members",
      "delete_messages",
      "moderate_content",
      "send_messages",
      "send_voice_messages",
      "join_voice_chat",
      "join_video_chat",
      "share_screen",
      "upload_files",
      "create_polls",
      "react_to_messages",
    ],
  },
  moderator: {
    id: "moderator",
    name: "Moderator",
    nameArabic: "مشرف",
    description: "Basic moderation privileges",
    descriptionArabic: "صلاحيات إشراف أساسية",
    color: "#38A169",
    bgColor: "#C6F6D5",
    icon: "🔧",
    hierarchy: 60,
    isSystemRole: true,
    permissions: [
      "mute_members",
      "delete_messages",
      "moderate_content",
      "send_messages",
      "send_voice_messages",
      "join_voice_chat",
      "join_video_chat",
      "share_screen",
      "upload_files",
      "create_polls",
      "react_to_messages",
    ],
  },
  member: {
    id: "member",
    name: "Member",
    nameArabic: "عضو",
    description: "Standard member privileges",
    descriptionArabic: "صلاحيات عضو أساسية",
    color: "#718096",
    bgColor: "#EDF2F7",
    icon: "👤",
    hierarchy: 50,
    isSystemRole: true,
    permissions: [
      "send_messages",
      "send_voice_messages",
      "join_voice_chat",
      "join_video_chat",
      "upload_files",
      "react_to_messages",
    ],
  },
  guest: {
    id: "guest",
    name: "Guest",
    nameArabic: "ضيف",
    description: "Limited guest privileges",
    descriptionArabic: "صلاحيات ضيف محدودة",
    color: "#A0AEC0",
    bgColor: "#F7FAFC",
    icon: "👥",
    hierarchy: 10,
    isSystemRole: true,
    permissions: ["send_messages", "react_to_messages"],
  },
}

// دوال مساعدة
export function hasPermission(userRole: UserRole, permission: Permission, roomId?: string): boolean {
  const role = SYSTEM_ROLES[userRole]
  return role.permissions.includes(permission)
}

export function canManageUser(managerRole: UserRole, targetRole: UserRole): boolean {
  const manager = SYSTEM_ROLES[managerRole]
  const target = SYSTEM_ROLES[targetRole]
  return manager.hierarchy > target.hierarchy
}

export function getRoleColor(role: UserRole): { color: string; bgColor: string } {
  const roleDefinition = SYSTEM_ROLES[role]
  return {
    color: roleDefinition.color,
    bgColor: roleDefinition.bgColor,
  }
}
