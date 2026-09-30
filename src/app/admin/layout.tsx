'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { AdminSidebar } from '@/components/features/admin/layout/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    // `dark`: 어드민은 다크 화면인데 shadcn 테마 토큰이 라이트로 잡혀 있었다.
    // 그래서 variant="outline" 버튼이 흰 배경 + 옅은 회색 글자로 렌더돼 보이지 않았다.
    // 이 클래스 하나로 하위 컴포넌트(Button/Input/Select/Dialog/Table)가 모두 다크 토큰을 쓴다.
    <div className="dark min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 lg:hidden p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* 여백을 레이아웃에서 한 번만 준다.
            기존에는 각 페이지가 알아서 처리해 대부분 여백이 없었고,
            헤더 버튼과 카드가 화면 오른쪽 끝에 붙어 잘려 보였다. */}
        <main className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  )
}
