import { ArabCountry, ArabRegion } from "@/lib/data/arab-regions"

// أنواع بيانات الغرف الصوتية العربية
export interface VoiceRoom {
  id: string
  name: string
  description: string
  
  // التصنيف الجغرافي والثقافي
  region: string // معرف المنطقة من ARAB_REGIONS
  country: string // معرف الدولة من ARAB_COUNTRIES  
  regionData?: ArabRegion // بيانات المنطقة
  countryData?: ArabCountry // بيانات الدولة
  
  // إعدادات الغرفة
  plan: RoomPlan
  category: RoomCategory
  language: "ar" | "en" | "mixed"
  roomType: "voice" | "video" | "mixed"
  mood: "friendly" | "serious" | "educational" | "entertainment"
  
  // المشاركة والنشاط
  participants: number
  maxParticipants: number
  listeners: number
  speakers: number
  waitingList: number
  
  // الحالة والتوقيت
  isLive: boolean
  activeNow: boolean
  peak: "صباح" | "ظهر" | "عصر" | "مساء" | "ليل" | "فجر"
  createdAt: Date
  lastActivity: Date
  
  // إدارة الغرفة
  owner: RoomOwner
  moderators: RoomModerator[]
  
  // المحتوى والتفاعل
  tags: string[]
  topics: string[]
  rules: string[]
  welcomeMessage?: string
  
  // إحصائيات
  stats: RoomStats
  
  // الخصوصية والأمان
  isPrivate: boolean
  requiresApproval: boolean
  ageRestriction?: number
  contentRating: "عام" | "مراهقين" | "بالغين"
  
  // الميزات الخاصة
  features: RoomFeature[]
  customizations: RoomCustomization
}

export interface RoomOwner {
  id: string
  name: string
  username: string
  avatar?: string
  country: string
  region: string
  role: "owner"
  isOnline: boolean
  joinedAt: Date
  reputation: number
  badges: string[]
}

export interface RoomModerator {
  id: string
  name: string
  username: string
  avatar?: string
  country: string
  region: string
  role: "master" | "super_admin" | "admin" | "moderator"
  permissions: string[]
  assignedAt: Date
  assignedBy: string
  isActive: boolean
}

export interface RoomStats {
  totalMessages: number
  totalParticipants: number
  peakParticipants: number
  totalVoiceTime: number // بالدقائق
  averageStayTime: number // بالدقائق
  dailyActiveUsers: number
  weeklyActiveUsers: number
  monthlyActiveUsers: number
  popularHours: Record<string, number>
  topReactions: Record<string, number>
  topTopics: string[]
  engagementRate: number
  returnRate: number // معدل العودة
}

export interface RoomFeature {
  id: string
  name: string
  nameAr: string
  description: string
  isEnabled: boolean
  isPremium: boolean
  settings?: Record<string, any>
}

export interface RoomCustomization {
  theme: {
    primaryColor: string
    secondaryColor: string
    background: string
    isDark: boolean
  }
  avatar: {
    roomIcon: string
    roomBanner?: string
  }
  sounds: {
    joinSound?: string
    leaveSound?: string
    notificationSound?: string
  }
  text: {
    welcomeMessage?: string
    rules?: string[]
    description?: string
  }
}

export type RoomPlan = "premium" | "gold" | "silver" | "basic"

export type RoomCategory = 
  | "ثقافة" 
  | "أدب" 
  | "موس��قى" 
  | "ترفيه" 
  | "تعليم" 
  | "دين" 
  | "رياضة" 
  | "تكنولوجيا" 
  | "أعمال" 
  | "طبخ" 
  | "سفر" 
  | "صحة" 
  | "عام"

// معايير البحث والتصفية
export interface RoomFilters {
  region?: string
  country?: string
  category?: RoomCategory
  plan?: RoomPlan
  language?: "ar" | "en" | "mixed"
  roomType?: "voice" | "video" | "mixed"
  mood?: "friendly" | "serious" | "educational" | "entertainment"
  isLive?: boolean
  hasSpace?: boolean // له مكان فارغ
  minParticipants?: number
  maxParticipants?: number
  tags?: string[]
  searchQuery?: string
}

export interface RoomSearchResult {
  rooms: VoiceRoom[]
  total: number
  page: number
  limit: number
  filters: RoomFilters
  suggestions: string[]
  regions: RegionStats[]
  categories: CategoryStats[]
}

export interface RegionStats {
  id: string
  name: string
  flag: string
  roomCount: number
  activeUsers: number
  color: string
}

export interface CategoryStats {
  id: RoomCategory
  name: string
  icon: string
  roomCount: number
  activeUsers: number
  color: string
}

// أحداث الغرفة في الوقت الفعلي
export interface RoomEvent {
  id: string
  type: RoomEventType
  roomId: string
  userId: string
  userName: string
  userCountry: string
  data?: Record<string, any>
  timestamp: Date
}

export type RoomEventType =
  | "user_joined"
  | "user_left"
  | "user_started_speaking"
  | "user_stopped_speaking"
  | "user_muted"
  | "user_unmuted"
  | "user_promoted"
  | "user_demoted"
  | "user_kicked"
  | "user_banned"
  | "message_sent"
  | "reaction_added"
  | "topic_changed"
  | "room_settings_updated"

// خطط الاشتراك للغرف (مثل لقانا)
export interface RoomPlanDetails {
  id: RoomPlan
  name: string
  nameAr: string
  price: number
  currency: "USD" | "SAR" | "AED" | "EGP"
  maxUsers: number
  features: RoomPlanFeature[]
  color: string
  isPopular?: boolean
  discount?: number
  period: "monthly" | "quarterly" | "yearly"
}

export interface RoomPlanFeature {
  id: string
  name: string
  nameAr: string
  description: string
  isIncluded: boolean
  limit?: number
}

// بيانات خطط الغرف (مستوحاة من لقانا)
export const ROOM_PLANS: RoomPlanDetails[] = [
  {
    id: "basic",
    name: "Basic Room",
    nameAr: "غرفة عادية",
    price: 0,
    currency: "USD",
    maxUsers: 20,
    features: [
      { id: "voice_chat", name: "Voice Chat", nameAr: "دردشة صوتية", description: "Basic voice chat", isIncluded: true },
      { id: "text_chat", name: "Text Chat", nameAr: "دردشة نصية", description: "Text messaging", isIncluded: true },
      { id: "basic_moderation", name: "Basic Moderation", nameAr: "إشراف أساسي", description: "Basic room moderation", isIncluded: true }
    ],
    color: "bg-gray-100 text-gray-700",
    period: "monthly"
  },
  {
    id: "silver",
    name: "Silver Room", 
    nameAr: "غرفة فضية",
    price: 80,
    currency: "USD",
    maxUsers: 40,
    features: [
      { id: "voice_chat", name: "Voice Chat", nameAr: "دردشة صوتية", description: "High quality voice", isIncluded: true },
      { id: "video_chat", name: "Video Chat", nameAr: "دردشة مرئية", description: "Video calls", isIncluded: true },
      { id: "custom_theme", name: "Custom Theme", nameAr: "تخصيص المظهر", description: "Customize room appearance", isIncluded: true },
      { id: "advanced_moderation", name: "Advanced Moderation", nameAr: "إشراف متقدم", description: "Advanced moderation tools", isIncluded: true }
    ],
    color: "bg-gray-200 text-gray-800",
    period: "monthly"
  },
  {
    id: "gold",
    name: "Gold Room",
    nameAr: "غرفة ذهبية", 
    price: 107,
    currency: "USD",
    maxUsers: 70,
    features: [
      { id: "voice_chat", name: "Voice Chat", nameAr: "دردشة صوتية", description: "Premium voice quality", isIncluded: true },
      { id: "video_chat", name: "Video Chat", nameAr: "دردشة مرئية", description: "HD video calls", isIncluded: true },
      { id: "screen_sharing", name: "Screen Sharing", nameAr: "مشاركة الشاشة", description: "Share your screen", isIncluded: true },
      { id: "priority_support", name: "Priority Support", nameAr: "دعم مميز", description: "Priority customer support", isIncluded: true },
      { id: "analytics", name: "Analytics", nameAr: "تحليلات", description: "Room analytics and insights", isIncluded: true }
    ],
    color: "bg-yellow-200 text-yellow-800",
    isPopular: true,
    period: "monthly"
  },
  {
    id: "premium",
    name: "Premium Room",
    nameAr: "غرفة مميزة",
    price: 265.99,
    currency: "USD", 
    maxUsers: 500,
    features: [
      { id: "voice_chat", name: "Voice Chat", nameAr: "دردشة صوتية", description: "Studio quality voice", isIncluded: true },
      { id: "video_chat", name: "Video Chat", nameAr: "دردشة مرئية", description: "4K video calls", isIncluded: true },
      { id: "live_streaming", name: "Live Streaming", nameAr: "بث مباشر", description: "Stream to social media", isIncluded: true },
      { id: "api_access", name: "API Access", nameAr: "وصول API", description: "Integrate with your apps", isIncluded: true },
      { id: "white_label", name: "White Label", nameAr: "علامة تجارية خاصة", description: "Your own branding", isIncluded: true },
      { id: "dedicated_support", name: "Dedicated Support", nameAr: "دعم مخصص", description: "Dedicated account manager", isIncluded: true }
    ],
    color: "bg-purple-200 text-purple-800",
    period: "monthly"
  }
]

// دالة للحصول على خطة غرفة
export function getRoomPlan(planId: RoomPlan): RoomPlanDetails | undefined {
  return ROOM_PLANS.find(plan => plan.id === planId)
}

// دالة لتنسيق السعر
export function formatPrice(price: number, currency: string): string {
  const formatter = new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
  return formatter.format(price)
}
