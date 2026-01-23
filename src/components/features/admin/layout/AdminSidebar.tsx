'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Users,
  Bell,
  MessageSquare,
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
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 z-50',
          'transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          background: 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)',
          borderRight: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between h-20 px-6"
          style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
        >
          <Link
            href="/admin/contacts"
            className="flex flex-col"
          >
            <span
              className="text-lg font-light tracking-[4px]"
              style={{ color: '#D4AF37', fontFamily: "'Playfair Display', serif" }}
            >
              관훈아르떼
            </span>
            <span
              className="text-[9px] tracking-[2px] uppercase"
              style={{ color: 'rgba(212,175,55,0.5)' }}
            >
              CRM System
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'rgba(212,175,55,0.6)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3.5 rounded-lg',
                  'text-sm font-medium transition-all'
                )}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(212,175,55,0.3)'
                    : '1px solid transparent',
                  color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                }}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{ borderTop: '1px solid rgba(212,175,55,0.15)' }}
        >
          {profile && (
            <div
              className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg"
              style={{ background: 'rgba(212,175,55,0.05)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.1) 100%)',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: '#D4AF37' }}
                >
                  {profile.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: '#f0f0f0' }}
                >
                  {profile.fullName || profile.email}
                </p>
                <p
                  className="text-xs truncate capitalize"
                  style={{ color: 'rgba(212,175,55,0.6)' }}
                >
                  {profile.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={signOut}
            className={cn(
              'flex items-center gap-3 w-full px-4 py-3 rounded-lg',
              'text-sm font-medium transition-all'
            )}
            style={{
              color: 'rgba(255,255,255,0.4)',
              border: '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.1)'
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'
              e.currentTarget.style.color = '#ef4444'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'transparent'
              e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
            }}
          >
            <LogOut className="w-5 h-5" />
            로그아웃
          </button>
        </div>
      </aside>
    </>
  )
}
