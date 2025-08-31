export type UserRole = "member" | "admin" | "super_admin" | "master"

export type RoomPlan = "silver" | "gold" | "premium"

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  country: string
  avatar?: string
  role: UserRole
  isOnline: boolean
  lastSeen: Date
  joinedAt: Date
  coins: number
  level: number
  experience: number
  badges: string[]
  preferences: UserPreferences
}

export interface UserPreferences {
  language: "ar" | "en"
  notifications: {
    sound: boolean
    mentions: boolean
    privateMessages: boolean
    roomInvites: boolean
  }
  privacy: {
    showOnlineStatus: boolean
    allowPrivateMessages: boolean
    showProfile: boolean
  }
}

export interface Room {
  id: string
  name: string
  description: string
  plan: RoomPlan
  ownerId: string
  isActive: boolean
  isPrivate: boolean
  password?: string
  maxUsers: number
  currentUsers: number
  createdAt: Date
  settings: RoomSettings
  members: RoomMember[]
}

export interface RoomSettings {
  allowVideo: boolean
  allowAudio: boolean
  allowChat: boolean
  allowGifts: boolean
  customBackground?: string
  welcomeMessage?: string
  rules?: string[]
  moderationLevel: "low" | "medium" | "high"
}

export interface RoomMember {
  userId: string
  user: User
  role: UserRole
  joinedAt: Date
  isMuted: boolean
  isBanned: boolean
  permissions: RoomPermissions
}

export interface RoomPermissions {
  canSpeak: boolean
  canVideo: boolean
  canChat: boolean
  canInvite: boolean
  canKick: boolean
  canBan: boolean
  canMute: boolean
  canManageRoom: boolean
}

export interface ChatMessage {
  id: string
  roomId: string
  userId: string
  user: User
  content: string
  type: "text" | "emoji" | "gift" | "system"
  timestamp: Date
  isEdited: boolean
  replyTo?: string
}

export interface Gift {
  id: string
  name: string
  nameAr: string
  icon: string
  animation?: string
  cost: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface UserGift {
  id: string
  fromUserId: string
  toUserId: string
  giftId: string
  gift: Gift
  roomId: string
  timestamp: Date
  message?: string
}
