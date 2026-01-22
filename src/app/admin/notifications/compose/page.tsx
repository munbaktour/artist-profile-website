'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Search,
  Users,
  Crown,
  Send,
  X,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { VipBadge } from '@/components/features/admin/contacts/VipBadge'
import { CategoryBadge } from '@/components/features/admin/contacts/CategoryBadge'
import type { Contact, Category } from '@/types/admin'
import { isAbortError } from '@/hooks/useAbortableFetch'

interface SelectedRecipient {
  id: string
  name: string
  email?: string | null
  phone?: string | null
  isVip: boolean
  category?: Category | null
}

export default function NotificationComposePage() {
  const router = useRouter()

  // Form state
  const [channel, setChannel] = useState<'email' | 'sms'>('email')
  const [notificationType, setNotificationType] = useState<'exhibition_invite' | 'general_notice'>('general_notice')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  // Exhibition-specific fields
  const [exhibitionTitle, setExhibitionTitle] = useState('')
  const [exhibitionDate, setExhibitionDate] = useState('')
  const [exhibitionVenue, setExhibitionVenue] = useState('')
  const [rsvpLink, setRsvpLink] = useState('')

  // Recipients
  const [selectedRecipients, setSelectedRecipients] = useState<SelectedRecipient[]>([])
  const [recipientDialogOpen, setRecipientDialogOpen] = useState(false)

  // Contact search state
  const [contacts, setContacts] = useState<Contact[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingContacts, setLoadingContacts] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [vipOnly, setVipOnly] = useState(false)

  // Sending state
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<{
    success: boolean
    message: string
    summary?: { total: number; sent: number; failed: number }
  } | null>(null)

  // AbortController refs
  const contactsAbortRef = useRef<AbortController | null>(null)

  // Fetch categories
  useEffect(() => {
    const controller = new AbortController()

    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/categories', { signal: controller.signal })
        if (controller.signal.aborted) return

        if (res.ok) {
          const data = await res.json()
          if (!controller.signal.aborted) {
            setCategories(data)
          }
        }
      } catch (err) {
        if (isAbortError(err)) return
        console.error('Failed to fetch categories:', err)
      }
    }
    fetchCategories()

    return () => {
      controller.abort()
    }
  }, [])

  // Fetch contacts for recipient selection
  const fetchContacts = useCallback(async (signal?: AbortSignal) => {
    setLoadingContacts(true)
    try {
      const params = new URLSearchParams({
        pageSize: '100',
      })

      if (searchQuery) params.set('search', searchQuery)
      if (categoryFilter && categoryFilter !== 'all') params.set('categoryId', categoryFilter)
      if (vipOnly) params.set('isVip', 'true')

      const res = await fetch(`/api/admin/contacts?${params}`, { signal })

      // Check if request was aborted
      if (signal?.aborted) return

      const data = await res.json()

      // Check again after JSON parsing
      if (signal?.aborted) return

      if (res.ok) {
        setContacts(data.data)
      }
    } catch (err) {
      // Ignore abort errors
      if (isAbortError(err)) return
      console.error('Failed to fetch contacts:', err)
    } finally {
      setLoadingContacts(false)
    }
  }, [searchQuery, categoryFilter, vipOnly])

  useEffect(() => {
    if (recipientDialogOpen) {
      // Abort previous request
      contactsAbortRef.current?.abort()

      // Create new AbortController
      const controller = new AbortController()
      contactsAbortRef.current = controller

      fetchContacts(controller.signal)

      // Cleanup on dependency change
      return () => {
        controller.abort()
      }
    }
  }, [recipientDialogOpen, fetchContacts])

  const toggleRecipient = (contact: Contact) => {
    const exists = selectedRecipients.find(r => r.id === contact.id)
    if (exists) {
      setSelectedRecipients(prev => prev.filter(r => r.id !== contact.id))
    } else {
      setSelectedRecipients(prev => [
        ...prev,
        {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          isVip: contact.isVip,
          category: contact.category,
        },
      ])
    }
  }

  const selectAllVisible = () => {
    const newRecipients = contacts.filter(c => {
      // Filter by channel capability
      if (channel === 'email' && !c.email) return false
      if (channel === 'sms' && !c.phone) return false
      // Check if already selected
      return !selectedRecipients.find(r => r.id === c.id)
    })

    setSelectedRecipients(prev => [
      ...prev,
      ...newRecipients.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        isVip: c.isVip,
        category: c.category,
      })),
    ])
  }

  const removeRecipient = (id: string) => {
    setSelectedRecipients(prev => prev.filter(r => r.id !== id))
  }

  const handleSend = async () => {
    // Validate
    if (selectedRecipients.length === 0) {
      alert('수신자를 선택해주세요.')
      return
    }

    if (channel === 'email' && !subject) {
      alert('제목을 입력해주세요.')
      return
    }

    if (!content) {
      alert('내용을 입력해주세요.')
      return
    }

    // Filter recipients with valid contact info
    const validRecipients = selectedRecipients.filter(r => {
      if (channel === 'email') return !!r.email
      if (channel === 'sms') return !!r.phone
      return false
    })

    if (validRecipients.length === 0) {
      alert(`선택된 수신자 중 ${channel === 'email' ? '이메일' : '전화번호'}이 있는 연락처가 없습니다.`)
      return
    }

    setSending(true)
    setSendResult(null)

    try {
      const res = await fetch('/api/admin/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notificationType,
          channel,
          recipients: validRecipients.map(r => ({
            id: r.id,
            name: r.name,
            email: r.email,
            phone: r.phone,
          })),
          subject,
          content,
          exhibitionTitle: notificationType === 'exhibition_invite' ? exhibitionTitle : undefined,
          exhibitionDate: notificationType === 'exhibition_invite' ? exhibitionDate : undefined,
          exhibitionVenue: notificationType === 'exhibition_invite' ? exhibitionVenue : undefined,
          rsvpLink: notificationType === 'exhibition_invite' ? rsvpLink : undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send notifications')
      }

      setSendResult({
        success: true,
        message: data.message,
        summary: data.summary,
      })
    } catch (err) {
      setSendResult({
        success: false,
        message: err instanceof Error ? err.message : 'An error occurred',
      })
    } finally {
      setSending(false)
    }
  }

  const inputClassName = cn(
    'bg-[#0a0a0a] border-[#262626] text-white',
    'placeholder:text-[#52525b]',
    'focus:ring-white/20 focus:border-white/20'
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/notifications">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#a1a1aa] hover:text-white hover:bg-[#262626]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">새 알림 작성</h1>
          <p className="text-[#a1a1aa] text-sm mt-1">
            이메일 또는 SMS를 작성하여 연락처에게 발송합니다.
          </p>
        </div>
      </div>

      {/* Send Result */}
      {sendResult && (
        <div className={cn(
          'p-4 rounded-lg border flex items-start gap-3',
          sendResult.success
            ? 'bg-green-500/10 border-green-500/20'
            : 'bg-red-500/10 border-red-500/20'
        )}>
          {sendResult.success ? (
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          <div>
            <p className={sendResult.success ? 'text-green-400' : 'text-red-400'}>
              {sendResult.message}
            </p>
            {sendResult.summary && (
              <p className="text-sm text-[#a1a1aa] mt-1">
                총 {sendResult.summary.total}건 중 {sendResult.summary.sent}건 성공, {sendResult.summary.failed}건 실패
              </p>
            )}
            {sendResult.success && (
              <Button
                variant="link"
                className="text-green-400 p-0 h-auto mt-2"
                onClick={() => router.push('/admin/notifications')}
              >
                발송 내역 보기
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Channel Selection */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
        <Label className="text-[#fafafa]">발송 채널</Label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setChannel('email')}
            className={cn(
              'flex-1 p-4 rounded-lg border-2 transition-all',
              channel === 'email'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-[#262626] bg-[#0a0a0a] hover:border-[#3f3f46]'
            )}
          >
            <Mail className={cn(
              'w-6 h-6 mx-auto mb-2',
              channel === 'email' ? 'text-blue-400' : 'text-[#a1a1aa]'
            )} />
            <p className={cn(
              'font-medium',
              channel === 'email' ? 'text-white' : 'text-[#a1a1aa]'
            )}>
              이메일
            </p>
          </button>
          <button
            type="button"
            onClick={() => setChannel('sms')}
            className={cn(
              'flex-1 p-4 rounded-lg border-2 transition-all',
              channel === 'sms'
                ? 'border-green-500 bg-green-500/10'
                : 'border-[#262626] bg-[#0a0a0a] hover:border-[#3f3f46]'
            )}
          >
            <MessageSquare className={cn(
              'w-6 h-6 mx-auto mb-2',
              channel === 'sms' ? 'text-green-400' : 'text-[#a1a1aa]'
            )} />
            <p className={cn(
              'font-medium',
              channel === 'sms' ? 'text-white' : 'text-[#a1a1aa]'
            )}>
              SMS
            </p>
            <p className="text-xs text-[#52525b] mt-1">(설정 필요)</p>
          </button>
        </div>
      </div>

      {/* Notification Type */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
        <Label className="text-[#fafafa]">알림 유형</Label>
        <Select
          value={notificationType}
          onValueChange={(v) => setNotificationType(v as 'exhibition_invite' | 'general_notice')}
        >
          <SelectTrigger className={inputClassName}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#262626]">
            <SelectItem value="general_notice" className="text-white">
              일반 공지
            </SelectItem>
            <SelectItem value="exhibition_invite" className="text-white">
              전시 초대
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Recipients */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-[#fafafa]">수신자</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRecipientDialogOpen(true)}
            className="bg-transparent border-[#262626] text-white hover:bg-[#262626]"
          >
            <Users className="w-4 h-4 mr-2" />
            수신자 선택
          </Button>
        </div>

        {selectedRecipients.length === 0 ? (
          <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626] text-center">
            <Users className="w-8 h-8 text-[#52525b] mx-auto mb-2" />
            <p className="text-[#a1a1aa] text-sm">수신자를 선택해주세요.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-[#a1a1aa]">
              {selectedRecipients.length}명 선택됨
              {channel === 'email' && (
                <> ({selectedRecipients.filter(r => r.email).length}명 이메일 발송 가능)</>
              )}
              {channel === 'sms' && (
                <> ({selectedRecipients.filter(r => r.phone).length}명 SMS 발송 가능)</>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedRecipients.slice(0, 10).map((recipient) => (
                <span
                  key={recipient.id}
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm',
                    'bg-[#262626] text-white'
                  )}
                >
                  {recipient.isVip && <Crown className="w-3 h-3 text-[#D4AF37]" />}
                  {recipient.name}
                  <button
                    type="button"
                    onClick={() => removeRecipient(recipient.id)}
                    className="ml-1 text-[#a1a1aa] hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedRecipients.length > 10 && (
                <span className="px-2 py-1 text-sm text-[#a1a1aa]">
                  외 {selectedRecipients.length - 10}명
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Exhibition Details (if exhibition invite) */}
      {notificationType === 'exhibition_invite' && (
        <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
          <Label className="text-[#fafafa]">전시 정보</Label>

          <div className="space-y-2">
            <Label className="text-[#a1a1aa] text-sm">전시 제목</Label>
            <Input
              value={exhibitionTitle}
              onChange={(e) => setExhibitionTitle(e.target.value)}
              placeholder="전시 제목을 입력하세요"
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#a1a1aa] text-sm">일시</Label>
              <Input
                value={exhibitionDate}
                onChange={(e) => setExhibitionDate(e.target.value)}
                placeholder="예: 2025.01.20 - 02.28"
                className={inputClassName}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#a1a1aa] text-sm">장소</Label>
              <Input
                value={exhibitionVenue}
                onChange={(e) => setExhibitionVenue(e.target.value)}
                placeholder="예: 관훈아르떼 갤러리"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#a1a1aa] text-sm">참석 확인 링크 (선택)</Label>
            <Input
              value={rsvpLink}
              onChange={(e) => setRsvpLink(e.target.value)}
              placeholder="https://..."
              className={inputClassName}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
        {channel === 'email' && (
          <div className="space-y-2">
            <Label className="text-[#fafafa]">제목 <span className="text-red-400">*</span></Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="이메일 제목을 입력하세요"
              className={inputClassName}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-[#fafafa]">내용 <span className="text-red-400">*</span></Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="메시지 내용을 입력하세요"
            rows={8}
            className={cn(inputClassName, 'resize-none')}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link href="/admin/notifications">
          <Button
            variant="outline"
            className="bg-transparent border-[#262626] text-white hover:bg-[#262626]"
          >
            취소
          </Button>
        </Link>
        <Button
          onClick={handleSend}
          disabled={sending || selectedRecipients.length === 0}
          className="bg-white text-black hover:bg-white/90"
        >
          {sending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              발송 중...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              발송하기
            </>
          )}
        </Button>
      </div>

      {/* Recipient Selection Dialog */}
      <Dialog open={recipientDialogOpen} onOpenChange={setRecipientDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#262626] text-white max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>수신자 선택</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Search and Filters */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
                <Input
                  placeholder="이름, 이메일, 회사로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(inputClassName, 'pl-10')}
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px] bg-[#0a0a0a] border-[#262626] text-white">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#262626]">
                  <SelectItem value="all" className="text-white">전체</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id} className="text-white">
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={vipOnly ? 'default' : 'outline'}
                size="icon"
                onClick={() => setVipOnly(!vipOnly)}
                className={cn(
                  vipOnly
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#F5D67B] to-[#B8960C] text-[#1a1a1a] border-0'
                    : 'bg-transparent border-[#262626] text-white hover:bg-[#262626]'
                )}
              >
                <Crown className="w-4 h-4" />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#a1a1aa]">
                {selectedRecipients.length}명 선택됨
              </p>
              <Button
                variant="link"
                size="sm"
                onClick={selectAllVisible}
                className="text-[#a1a1aa] hover:text-white"
              >
                표시된 연락처 모두 선택
              </Button>
            </div>

            {/* Contact List */}
            <div className="border border-[#262626] rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
              {loadingContacts ? (
                <div className="p-4 space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="w-5 h-5 rounded bg-[#262626]" />
                      <Skeleton className="h-5 w-32 bg-[#262626]" />
                      <Skeleton className="h-4 w-40 bg-[#262626] ml-auto" />
                    </div>
                  ))}
                </div>
              ) : contacts.length === 0 ? (
                <div className="p-8 text-center text-[#a1a1aa]">
                  검색 결과가 없습니다.
                </div>
              ) : (
                <div className="divide-y divide-[#262626]">
                  {contacts.map((contact) => {
                    const isSelected = selectedRecipients.some(r => r.id === contact.id)
                    const hasValidContact = channel === 'email' ? !!contact.email : !!contact.phone

                    return (
                      <label
                        key={contact.id}
                        className={cn(
                          'flex items-center gap-3 p-3 cursor-pointer hover:bg-[#262626]/50 transition-colors',
                          !hasValidContact && 'opacity-50 cursor-not-allowed'
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => hasValidContact && toggleRecipient(contact)}
                          disabled={!hasValidContact}
                          className="border-[#3f3f46] data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium truncate">
                              {contact.name}
                            </span>
                            {contact.isVip && <VipBadge isVip={true} size="sm" />}
                            <CategoryBadge category={contact.category} size="sm" />
                          </div>
                          <p className="text-sm text-[#a1a1aa] truncate">
                            {channel === 'email'
                              ? contact.email || '이메일 없음'
                              : contact.phone || '전화번호 없음'}
                          </p>
                        </div>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setRecipientDialogOpen(false)}
              className="bg-white text-black hover:bg-white/90"
            >
              완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
