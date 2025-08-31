// نظام المصادقة للضيوف
import type { GuestSession, RoomMember } from "@/lib/types/room-roles"
import type { Permission } from "@/lib/types/roles"

export interface GuestLoginData {
  username: string
  displayName: string
  roomId: string
  country?: string
}

export class GuestAuthManager {
  private static instance: GuestAuthManager
  private guestSessions: Map<string, GuestSession> = new Map()

  static getInstance(): GuestAuthManager {
    if (!GuestAuthManager.instance) {
      GuestAuthManager.instance = new GuestAuthManager()
    }
    return GuestAuthManager.instance
  }

  // إنشاء جلسة ضيف جديدة
  createGuestSession(data: GuestLoginData): GuestSession {
    const sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // انتهاء الصلاحية بعد 24 ساعة

    const guestPermissions: Permission[] = ["send_messages", "react_to_messages", "join_voice_chat"]

    const session: GuestSession = {
      id: sessionId,
      username: data.username,
      displayName: data.displayName,
      roomId: data.roomId,
      joinedAt: new Date(),
      expiresAt,
      ipAddress: this.getClientIP(),
      userAgent: this.getClientUserAgent(),
      permissions: guestPermissions,
      isActive: true,
    }

    this.guestSessions.set(sessionId, session)

    // حفظ في localStorage للمتصفح
    if (typeof window !== "undefined") {
      localStorage.setItem(`guest_session_${data.roomId}`, JSON.stringify(session))
    }

    return session
  }

  // التحقق من صحة جلسة الضيف
  validateGuestSession(sessionId: string): GuestSession | null {
    const session = this.guestSessions.get(sessionId)

    if (!session) {
      return null
    }

    // التحقق من انتهاء الصلاحية
    if (new Date() > session.expiresAt) {
      this.removeGuestSession(sessionId)
      return null
    }

    return session
  }

  // تحديث نشاط الضيف
  updateGuestActivity(sessionId: string): void {
    const session = this.guestSessions.get(sessionId)
    if (session) {
      // تحديث وقت النشاط الأخير
      session.isActive = true
      this.guestSessions.set(sessionId, session)
    }
  }

  // إزالة جلسة الضيف
  removeGuestSession(sessionId: string): void {
    this.guestSessions.delete(sessionId)

    // إزالة من localStorage
    if (typeof window !== "undefined") {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith("guest_session_") && localStorage.getItem(key)?.includes(sessionId)) {
          localStorage.removeItem(key)
        }
      })
    }
  }

  // الحصول على جلسة ضيف من localStorage
  getStoredGuestSession(roomId: string): GuestSession | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(`guest_session_${roomId}`)
    if (!stored) return null

    try {
      const session: GuestSession = JSON.parse(stored)

      // التحقق من انتهاء الصلاحية
      if (new Date() > new Date(session.expiresAt)) {
        localStorage.removeItem(`guest_session_${roomId}`)
        return null
      }

      // إعادة تحميل الجلسة في الذاكرة
      this.guestSessions.set(session.id, session)
      return session
    } catch {
      localStorage.removeItem(`guest_session_${roomId}`)
      return null
    }
  }

  // تحويل جلسة الضيف إلى عضو غرفة
  guestToRoomMember(session: GuestSession): RoomMember {
    return {
      id: session.id,
      userId: undefined, // ضيف بدون حساب مسجل
      username: session.username,
      displayName: session.displayName,
      role: "guest",
      isGuest: true,
      joinedAt: session.joinedAt,
      lastActive: new Date(),
      permissions: session.permissions,
      roomSpecificData: {
        roomId: session.roomId,
        assignedBy: "system",
        assignedAt: session.joinedAt,
        isActive: session.isActive,
        isMuted: false,
        isBanned: false,
        warnings: 0,
      },
    }
  }

  private getClientIP(): string {
    // في بيئة الإنتاج، يجب الحصول على IP الحقيقي
    return "127.0.0.1"
  }

  private getClientUserAgent(): string {
    if (typeof window !== "undefined") {
      return window.navigator.userAgent
    }
    return "Unknown"
  }

  // تنظيف الجلسات المنتهية الصلاحية
  cleanupExpiredSessions(): void {
    const now = new Date()
    for (const [sessionId, session] of this.guestSessions.entries()) {
      if (now > session.expiresAt) {
        this.removeGuestSession(sessionId)
      }
    }
  }
}

// تصدير instance واحد
export const guestAuth = GuestAuthManager.getInstance()

// تنظيف دوري للجلسات المنتهية الصلاحية
if (typeof window !== "undefined") {
  setInterval(() => {
    guestAuth.cleanupExpiredSessions()
  }, 60000) // كل دقيقة
}
