'use client'

import { useAuth } from '@/hooks/useAuth'
import { CategoryManagement } from '@/components/features/admin/settings/CategoryManagement'
import { AdminManagement } from '@/components/features/admin/settings/AdminManagement'
import { Users, Mail, Shield, Bell, Tags } from 'lucide-react'
import { hasPermission } from '@/types/admin'
import type { AdminRole } from '@/types/admin'

export default function SettingsPage() {
  const { profile } = useAuth()

  const canEditCategories = profile?.role
    ? hasPermission(profile.role as AdminRole, 'categories', 'update')
    : false

  const canManageAdmins = profile?.role
    ? hasPermission(profile.role as AdminRole, 'admins', 'update')
    : false

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-zinc-100">설정</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          계정 및 시스템 설정을 관리합니다.
        </p>
      </div>

      {/* Admin Management Section */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-5">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          <div>
            <h2 className="text-sm font-medium text-zinc-100">관리자 목록</h2>
            <p className="text-xs text-zinc-500">시스템에 등록된 관리자를 관리합니다.</p>
          </div>
        </div>

        <AdminManagement canEdit={canManageAdmins} currentUserId={profile?.id} />
      </div>

      {/* Category Management Section */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-5">
        <div className="flex items-center gap-3">
          <Tags className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          <div>
            <h2 className="text-sm font-medium text-zinc-100">카테고리 관리</h2>
            <p className="text-xs text-zinc-500">연락처 분류를 위한 카테고리를 관리합니다.</p>
          </div>
        </div>

        <CategoryManagement canEdit={canEditCategories} />
      </div>

      {/* Notification Settings */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-5">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          <div>
            <h2 className="text-sm font-medium text-zinc-100">알림 설정</h2>
            <p className="text-xs text-zinc-500">이메일 및 SMS 발송 설정</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-zinc-100 text-sm font-medium">Resend</p>
                <p className="text-xs text-zinc-500">이메일 발송 서비스</p>
              </div>
              <span className="ml-auto px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">
                연결됨
              </span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-zinc-500" />
              <div>
                <p className="text-zinc-100 text-sm font-medium">SMS</p>
                <p className="text-xs text-zinc-500">NHN Cloud SMS 발송 서비스</p>
              </div>
              <span className="ml-auto px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">
                연결됨
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Info */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-5">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          <div>
            <h2 className="text-sm font-medium text-zinc-100">데이터베이스</h2>
            <p className="text-xs text-zinc-500">Supabase 연결 정보</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-100 text-sm font-medium">Supabase</p>
              <p className="text-xs text-zinc-500">PostgreSQL 데이터베이스</p>
            </div>
            <span className="px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">
              연결됨
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
