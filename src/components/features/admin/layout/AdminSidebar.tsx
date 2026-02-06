'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Users,
  Bell,
  MessageSquare,
  Image as ImageIcon,
  FolderOpen,
  QrCode,
  Settings,
  LogOut,
  X,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  {
    href: '/admin/contacts',
    label: '연락처',
    icon: Users,
  },
  {
    href: '/admin/notifications',
    label: '알림',
    icon: Bell,
  },
  {
    href: '/admin/messages',
    label: '메시지',
    icon: MessageSquare,
  },
  {
    href: '/admin/exhibitions',
    label: '전시 관리',
    icon: ImageIcon,
  },
  {
    href: '/admin/documents',
    label: '문서 관리',
    icon: FolderOpen,
  },
  {
    href: '/admin/checkins',
    label: '체크인',
    icon: QrCode,
  },
  {
    href: '/admin/settings',
    label: '설정',
    icon: Settings,
  },
]

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const { signOut, profile } = useAuth()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 z-50',
          'transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          'bg-zinc-900 border-r border-zinc-800',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-zinc-800">
          <Link
            href="/admin/contacts"
            className="flex flex-col"
          >
            <span className="text-sm font-semibold text-zinc-100 tracking-wide">
              관훈아르떼
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
              CRM System
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5',
                  'text-sm font-medium transition-colors',
                  isActive
                    ? 'text-zinc-50 border-l-2 border-[#D4AF37] rounded-r-lg bg-zinc-800/50'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-lg'
                )}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-zinc-800">
          {profile && (
            <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                <span className="text-xs font-medium text-zinc-300">
                  {profile.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 truncate">
                  {profile.fullName || profile.email}
                </p>
                <p className="text-xs text-zinc-500 truncate capitalize">
                  {profile.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            로그아웃
          </button>
        </div>
      </aside>
    </>
  )
}
