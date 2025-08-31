"use client"

import type React from "react"

import { useAuth } from "@/lib/auth/auth-context"
import type { UserRole } from "@/lib/types/user"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole, redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole && user.role !== requiredRole) {
        // التحقق من مستوى الصلاحية
        const roleHierarchy: Record<UserRole, number> = {
          member: 1,
          admin: 2,
          super_admin: 3,
          master: 4,
        }

        if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
          router.push("/unauthorized")
          return
        }
      }
    }
  }, [user, isLoading, requiredRole, router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent/20">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground font-arabic">جاري التحميل...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole) {
    const roleHierarchy: Record<UserRole, number> = {
      member: 1,
      admin: 2,
      super_admin: 3,
      master: 4,
    }

    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      return null
    }
  }

  return <>{children}</>
}
