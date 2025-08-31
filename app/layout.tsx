import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Noto_Sans_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth/auth-context"
import "./globals.css"

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
})

export const metadata: Metadata = {
  title: "لقاء - تطبيق الدردشة الاجتماعي",
  description: "انضم إلى غرف الدردشة الصوتية والمرئية وتواصل مع أشخاص من جميع أنحاء العالم العربي",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${notoSansArabic.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
