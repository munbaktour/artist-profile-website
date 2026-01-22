'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FormSectionProps } from '@/types/components'

/**
 * FormSection - 폼 섹션 컨테이너
 *
 * 어드민 폼에서 관련 필드를 그룹화하는 섹션 컴포넌트
 *
 * @example
 * ```tsx
 * <FormSection title="기본 정보" icon={User}>
 *   <Input label="이름" ... />
 *   <Input label="이메일" ... />
 * </FormSection>
 * ```
 */
export function FormSection({
  title,
  icon: Icon,
  description,
  collapsible = false,
  defaultCollapsed = false,
  children,
  className,
}: FormSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        className
      )}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(212,175,55,0.2)',
      }}
    >
      {/* Header */}
      <div
        className={cn(
          'p-5 flex items-center justify-between',
          collapsible && 'cursor-pointer hover:bg-white/[0.02]'
        )}
        style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
        onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div
              className="p-2 rounded-lg"
              style={{ background: 'rgba(212,175,55,0.1)' }}
            >
              <Icon size={18} style={{ color: '#D4AF37' }} />
            </div>
          )}
          <div>
            <h3 className="text-lg font-light text-[#f0f0f0]">{title}</h3>
            {description && (
              <p
                className="text-sm mt-0.5"
                style={{ color: 'rgba(212,175,55,0.6)' }}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {collapsible && (
          <button
            className="p-2 rounded-lg transition-all hover:bg-white/5"
            style={{ color: 'rgba(212,175,55,0.7)' }}
          >
            {isCollapsed ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-5 space-y-4">
          {children}
        </div>
      )}
    </div>
  )
}
