import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "@/styles/variables.css"

import { LanguageProvider } from "@/lib/i18n/LanguageProvider"
import { LayoutContent } from "@/components/organisms/LayoutContent"
import { SEO_DEFAULTS } from "@/lib/constants"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: SEO_DEFAULTS.DEFAULT_TITLE,
  description: SEO_DEFAULTS.DESCRIPTION.ko,
  keywords: [...SEO_DEFAULTS.KEYWORDS],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="text/javascript"
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?clientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
          defer
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <LayoutContent>{children}</LayoutContent>
        </LanguageProvider>
      </body>
    </html>
  )
}
