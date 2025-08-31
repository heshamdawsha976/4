import type { UserRole, RoomPermissions, RoomPlan } from "@/lib/types/user"

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  member: 1,
  admin: 2,
  super_admin: 3,
  master: 4,
}

export const ROOM_LIMITS: Record<
  RoomPlan,
  {
    maxUsers: number
    roles: Record<UserRole, number>
    features: string[]
  }
> = {
  silver: {
    maxUsers: 40,
    roles: {
      master: 5,
      super_admin: 5,
      admin: 10,
      member: 15,
    },
    features: ["basic_chat", "voice", "video"],
  },
  gold: {
    maxUsers: 70,
    roles: {
      master: 10,
      super_admin: 10,
      admin: 20,
      member: 30,
    },
    features: ["basic_chat", "voice", "video", "custom_backgrounds", "polls", "advanced_member_sorting"],
  },
  premium: {
    maxUsers: 150,
    roles: {
      master: 20,
      super_admin: 30,
      admin: 50,
      member: 80,
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
  },
}

export function getRolePermissions(userRole: UserRole, roomPlan: RoomPlan): RoomPermissions {
  const basePermissions: RoomPermissions = {
    canSpeak: false,
    canVideo: false,
    canChat: true,
    canInvite: false,
    canKick: false,
    canBan: false,
    canMute: false,
    canManageRoom: false,
  }

  switch (userRole) {
    case "master":
      return {
        canSpeak: true,
        canVideo: true,
        canChat: true,
        canInvite: true,
        canKick: true,
        canBan: true,
        canMute: true,
        canManageRoom: true,
      }

    case "super_admin":
      return {
        canSpeak: true,
        canVideo: true,
        canChat: true,
        canInvite: true,
        canKick: true,
        canBan: true,
        canMute: true,
        canManageRoom: false,
      }

    case "admin":
      return {
        canSpeak: true,
        canVideo: true,
        canChat: true,
        canInvite: true,
        canKick: true,
        canBan: false,
        canMute: true,
        canManageRoom: false,
      }

    case "member":
    default:
      return {
        ...basePermissions,
        canSpeak: true,
        canVideo: true,
      }
  }
}

export function canUserPerformAction(userRole: UserRole, targetRole: UserRole, action: keyof RoomPermissions): boolean {
  const userLevel = ROLE_HIERARCHY[userRole]
  const targetLevel = ROLE_HIERARCHY[targetRole]

  // لا يمكن للمستخدم تنفيذ إجراءات على مستخدمين بنفس المستوى أو أعلى
  if (userLevel <= targetLevel) {
    return false
  }

  const permissions = getRolePermissions(userRole, "premium") // استخدام أعلى صلاحيات
  return permissions[action]
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    master: "ماستر",
    super_admin: "سوبر أدمن",
    admin: "أدمن",
    member: "عضو",
  }
  return roleNames[role]
}

export function getRoleColor(role: UserRole): string {
  const roleColors: Record<UserRole, string> = {
    master: "text-yellow-600 bg-yellow-100",
    super_admin: "text-red-600 bg-red-100",
    admin: "text-blue-600 bg-blue-100",
    member: "text-gray-600 bg-gray-100",
  }
  return roleColors[role]
}
