'use client'

import { Menu, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminHeaderProps {
  onMenuClick: () => void
  title?: string
}

export function AdminHeader({ onMenuClick, title }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-zinc-950 border-b border-zinc-800">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-zinc-900 text-zinc-400 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {title && (
            <h1 className="text-lg font-semibold text-zinc-100">
              {title}
            </h1>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <button
            className={cn(
              'p-2 rounded-lg',
              'text-zinc-400 hover:text-zinc-100',
              'hover:bg-zinc-900',
              'transition-colors'
            )}
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
