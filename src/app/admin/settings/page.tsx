'use client'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { CategoryManagement } from '@/components/features/admin/settings/CategoryManagement'
import { User, Mail, Shield, Bell, Tags } from 'lucide-react'
import { hasPermission } from '@/types/admin'
import type { AdminRole } from '@/types/admin'

export default function SettingsPage() {
  const { profile } = useAuth()

  const canEditCategories = profile?.role
    ? hasPermission(profile.role as AdminRole, 'categories', 'update')
    : false

  const inputClassName = cn(
    'bg-[#0a0a0a] border-[#262626] text-white',
    'placeholder:text-[#52525b]',
    'focus:ring-white/20 focus:border-white/20'
  )

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">설정</h1>
        <p className="text-[#a1a1aa] text-sm mt-1">
          계정 및 시스템 설정을 관리합니다.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <User className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">프로필</h2>
            <p className="text-sm text-[#a1a1aa]">계정 정보를 확인합니다.</p>
          </div>
        </div>

        <Separator className="bg-[#262626]" />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[#fafafa]">이메일</Label>
            <Input
              value={profile?.email || ''}
              disabled
              className={cn(inputClassName, 'disabled:opacity-70')}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#fafafa]">이름</Label>
            <Input
              value={profile?.fullName || '-'}
              disabled
              className={cn(inputClassName, 'disabled:opacity-70')}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#fafafa]">역할</Label>
            <Input
              value={
                profile?.role === 'super_admin'
                  ? '최고 관리자'
                  : profile?.role === 'admin'
                  ? '관리자'
                  : profile?.role === 'manager'
                  ? '매니저'
                  : profile?.role === 'director'
                  ? '디렉터'
                  : '뷰어'
              }
              disabled
              className={cn(inputClassName, 'disabled:opacity-70')}
            />
          </div>
        </div>
      </div>

      {/* Category Management Section */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Tags className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">카테고리 관리</h2>
            <p className="text-sm text-[#a1a1aa]">연락처 분류를 위한 카테고리를 관리합니다.</p>
          </div>
        </div>

        <Separator className="bg-[#262626]" />

        <CategoryManagement canEdit={canEditCategories} />
      </div>

      {/* Notification Settings */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Bell className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">알림 설정</h2>
            <p className="text-sm text-[#a1a1aa]">이메일 및 SMS 발송 설정</p>
          </div>
        </div>

        <Separator className="bg-[#262626]" />

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#a1a1aa]" />
              <div>
                <p className="text-white font-medium">Resend</p>
                <p className="text-sm text-[#52525b]">이메일 발송 서비스</p>
              </div>
              <span className="ml-auto px-2 py-1 rounded text-xs bg-green-500/10 text-green-400">
                연결됨
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#a1a1aa]" />
              <div>
                <p className="text-white font-medium">SMS</p>
                <p className="text-sm text-[#52525b]">SMS 발송 서비스</p>
              </div>
              <span className="ml-auto px-2 py-1 rounded text-xs bg-yellow-500/10 text-yellow-400">
                설정 필요
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Info */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">데이터베이스</h2>
            <p className="text-sm text-[#a1a1aa]">Supabase 연결 정보</p>
          </div>
        </div>

        <Separator className="bg-[#262626]" />

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Supabase</p>
                <p className="text-sm text-[#52525b]">PostgreSQL 데이터베이스</p>
              </div>
              <span className="px-2 py-1 rounded text-xs bg-green-500/10 text-green-400">
                연결됨
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
