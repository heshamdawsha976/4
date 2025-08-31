export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatar?: string
  country: string
  role: "master" | "super_admin" | "admin" | "moderator" | "member" | "guest"
  isOnline: boolean
  lastSeen: Date
  joinedAt: Date
  
  // نظام النقاط والمستويات
  coins: number
  level: number
  experience: number
  badges: string[]
  
  // التفضيلات
  preferences: UserPreferences
  
  // إحصائيات
  stats?: UserStats
  
  // معلومات إضافية للضيوف
  isGuest?: boolean
  guestSession?: {
    id: string
    expiresAt: Date
    nickname: string
  }
}

export interface UserPreferences {
  language: "ar" | "en"
  theme?: "light" | "dark" | "auto"
  notifications: NotificationSettings
  privacy: PrivacySettings
  audio?: AudioSettings
  display?: DisplaySettings
}

export interface NotificationSettings {
  sound: boolean
  mentions: boolean
  privateMessages: boolean
  roomInvites: boolean
  friendRequests?: boolean
  emailNotifications?: boolean
  pushNotifications?: boolean
}

export interface PrivacySettings {
  showOnlineStatus: boolean
  allowPrivateMessages: boolean
  showProfile: boolean
  showCountry?: boolean
  allowFriendRequests?: boolean
  blockList?: string[]
}

export interface AudioSettings {
  inputDevice?: string
  outputDevice?: string
  echoCancellation?: boolean
  noiseSuppression?: boolean
  autoGainControl?: boolean
  volume?: number
}

export interface DisplaySettings {
  chatFontSize?: "small" | "medium" | "large"
  showAvatars?: boolean
  showTimestamps?: boolean
  compactMode?: boolean
  animationsEnabled?: boolean
}

export interface UserStats {
  totalTimeSpent: number // بالدقائق
  roomsJoined: number
  messagesCount: number
  reactionsGiven: number
  reactionsReceived: number
  friendsCount: number
  voiceTimeSpent: number // بالدقائق
  favoritesCount: number
}

export interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  senderRole: string
  senderAvatar?: string
  roomId: string
  timestamp: Date
  type: "text" | "image" | "file" | "system" | "reaction"
  
  // للرسائل المتقدمة
  replyTo?: string
  mentions?: string[]
  reactions?: MessageReaction[]
  isEdited?: boolean
  editedAt?: Date
  isDeleted?: boolean
  deletedAt?: Date
}

export interface MessageReaction {
  userId: string
  userName: string
  type: string
  emoji: string
  timestamp: Date
}

export interface Room {
  id: string
  name: string
  description?: string
  plan: "premium" | "gold" | "silver" | "basic"
  maxParticipants: number
  isPrivate: boolean
  ownerId: string
  createdAt: Date
  updatedAt: Date
  
  // المشاركون والأدوار
  participants: RoomParticipant[]
  customRoles: CustomRole[]
  
  // الإعدادات
  settings: RoomSettings
  
  // إحصائيات
  stats?: RoomStats
  
  // معلومات إضافية
  category?: string
  tags?: string[]
  language?: string
  region?: string
  isActive?: boolean
  lastActivity?: Date
}

export interface RoomParticipant {
  userId: string
  user: User
  role: string
  joinedAt: Date
  permissions: string[]
  isMuted?: boolean
  isBanned?: boolean
  isHandRaised?: boolean
  lastActivity?: Date
}

export interface CustomRole {
  id: string
  name: string
  nameAr: string
  color: string
  permissions: string[]
  priority: number
  isDefault: boolean
  createdBy: string
  createdAt: Date
}

export interface RoomSettings {
  allowVoiceChat: boolean
  allowVideoChat: boolean
  allowFileSharing: boolean
  allowScreenSharing?: boolean
  moderationEnabled: boolean
  welcomeMessage?: string
  slowModeEnabled?: boolean
  slowModeDelay?: number // بالثواني
  maxFileSize?: number // بالـ MB
  allowedFileTypes?: string[]
  requireApproval?: boolean
  linkPreviewEnabled?: boolean
  reactionsEnabled?: boolean
  allowGuests?: boolean
}

export interface RoomStats {
  totalMessages: number
  totalParticipants: number
  peakParticipants: number
  totalVoiceTime: number // بالدقائق
  averageStayTime: number // بالدقائق
  popularTimes: Record<string, number>
  topReactions: Record<string, number>
}

// أنواع للدردشة الصوتية والمرئية
export interface VoiceState {
  isConnected: boolean
  isMuted: boolean
  isDeafened: boolean
  isSpeaking: boolean
  audioLevel: number
}

export interface VideoState {
  isEnabled: boolean
  isScreenSharing: boolean
  quality: "low" | "medium" | "high"
  bandwidth: number
}

export interface MediaPermissions {
  microphone: boolean
  camera: boolean
  screen: boolean
}

// أنواع للتفاعلات
export interface Reaction {
  id: string
  type: string
  emoji: string
  label: string
  color: string
}

export interface UserReaction {
  userId: string
  userName: string
  reactionType: string
  timestamp: Date
  targetType: "message" | "room" | "user"
  targetId: string
}

// أنواع لنظام الصداقة
export interface Friend {
  userId: string
  user: User
  status: "pending" | "accepted" | "blocked"
  addedAt: Date
  lastInteraction?: Date
}

export interface FriendRequest {
  id: string
  fromUserId: string
  toUserId: string
  message?: string
  status: "pending" | "accepted" | "rejected"
  sentAt: Date
  respondedAt?: Date
}

// أنواع للإشعارات
export interface Notification {
  id: string
  userId: string
  type: "mention" | "message" | "friend_request" | "room_invite" | "system"
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: Date
  expiresAt?: Date
}

// أنواع لنظام التقارير
export interface Report {
  id: string
  reporterId: string
  targetType: "user" | "message" | "room"
  targetId: string
  reason: string
  description?: string
  status: "pending" | "reviewed" | "resolved" | "dismissed"
  createdAt: Date
  reviewedAt?: Date
  reviewedBy?: string
}

export type UserRole = "master" | "super_admin" | "admin" | "moderator" | "member" | "guest"
export type RoomPlan = "premium" | "gold" | "silver" | "basic"
export type MessageType = "text" | "image" | "file" | "system" | "reaction"
export type NotificationType = "mention" | "message" | "friend_request" | "room_invite" | "system"
export type ReportStatus = "pending" | "reviewed" | "resolved" | "dismissed"
