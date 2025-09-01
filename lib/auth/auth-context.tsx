"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
  firstName: string
  lastName: string
  username: string
  email: string
  phone?: string
  country: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // محاكاة تحميل بيانات المستخدم من التخزين المحلي أو API
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem("liqaa_user")
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // محاكاة API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // محاكاة بيانات مستخدم
      const mockUser: User = {
        id: "1",
        username: "ahmed_thaqafi",
        displayName: "أحمد محمد الثقافي",
        email: email,
        country: "مصر",
        role: "member",
        isOnline: true,
        lastSeen: new Date(),
        joinedAt: new Date(),
      }

      setUser(mockUser)
      localStorage.setItem("liqaa_user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    try {
      // محاكاة API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        displayName: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        country: userData.country,
        role: "member",
        isOnline: true,
        lastSeen: new Date(),
        joinedAt: new Date(),
      }

      setUser(newUser)
      localStorage.setItem("liqaa_user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("liqaa_user")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("liqaa_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
