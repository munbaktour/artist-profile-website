'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft,
  Send,
  Users,
  Image,
  Link as LinkIcon,
  Check,
  X,
  Search,
  Loader2,
  Megaphone,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 타겟팅 타입
type TargetingType = 'M' | 'N' | 'I'

const targetingOptions = [
  { value: 'M' as TargetingType, label: '전체', description: '마케팅 수신동의 유저 전체' },
  { value: 'I' as TargetingType, label: '채널 친구만', description: '채널 친구인 유저만' },
  { value: 'N' as TargetingType, label: '비친구만', description: '채널 친구가 아닌 유저만' },
]

// 빠른 입력 템플릿 (브랜드 메시지용 - 자유롭게 수정 가능)
const quickTemplates = [
  {
    id: 'exhibition_invite',
    label: '전시 초대',
    content: '안녕하세요, 관훈아르떼입니다.\n\n새로운 전시가 오픈합니다.\n\n▶ 전시명: \n▶ 기간: \n▶ 장소: 관훈아르떼\n\n많은 관심 부탁드립니다.',
  },
  {
    id: 'event_invite',
    label: '행사 안내',
    content: '안녕하세요, 관훈아르떼입니다.\n\n특별한 행사에 초대합니다.\n\n▶ 행사명: \n▶ 일시: \n▶ 장소: 관훈아르떼\n\n참석 여부를 알려주시면 감사하겠습니다.',
  },
  {
    id: 'thanks',
    label: '감사 인사',
    content: '안녕하세요, 관훈아르떼입니다.\n\n방문해 주셔서 감사합니다.\n앞으로도 좋은 전시로 찾아뵙겠습니다.\n\n감사합니다.',
  },
]

interface Contact {
  id: string
  name: string
  phone: string
  category_name?: string
}

type RecipientType = 'all' | 'category' | 'select'

interface Category {
  id: string
  name: string
  color?: string
}

export default function MessageComposePage() {
  const [recipientType, setRecipientType] = useState<RecipientType>('all')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactSearch, setContactSearch] = useState('')
  const [loadingContacts, setLoadingContacts] = useState(false)
  const [content, setContent] = useState('')
  const [targeting, setTargeting] = useState<TargetingType>('M')
  const [buttonText, setButtonText] = useState('')
  const [buttonLink, setButtonLink] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [totalContactCount, setTotalContactCount] = useState(0)
  const [categoryContactCounts, setCategoryContactCounts] = useState<Record<string, number>>({})

  // 카테고리 목록 로드
  const loadCategories = useCallback(async () => {
    if (categories.length > 0) return
    setLoadingCategories(true)
    try {
      const res = await fetch('/api/admin/categories')
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      if (Array.isArray(data)) {
        setCategories(data.map((c: { id: string; name: string; color?: string }) => ({
          id: c.id,
          name: c.name,
          color: c.color,
        })))
      }
    } catch {
      // 로드 실패 시 빈 목록 유지
    } finally {
      setLoadingCategories(false)
    }
  }, [categories.length])

  // 카테고리별 연락처 수 및 전체 연락처 수 로드
  const loadContactCounts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/contacts?pageSize=500')
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      if (data.data && Array.isArray(data.data)) {
        setTotalContactCount(data.data.length)
        // 카테고리별 연락처 수 계산
        const counts: Record<string, number> = {}
        data.data.forEach((contact: { category_id?: string }) => {
          if (contact.category_id) {
            counts[contact.category_id] = (counts[contact.category_id] || 0) + 1
          }
        })
        setCategoryContactCounts(counts)
      }
    } catch {
      // 로드 실패 시 기본값 유지
    }
  }, [])

  // 컴포넌트 마운트 시 카테고리와 연락처 수 로드
  useEffect(() => {
    loadCategories()
    loadContactCounts()
  }, [loadCategories, loadContactCounts])

  // 연락처 목록 로드
  const loadContacts = useCallback(async () => {
    if (contacts.length > 0) return
    setLoadingContacts(true)
    try {
      const res = await fetch('/api/admin/contacts?pageSize=200')
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      if (data.data && Array.isArray(data.data)) {
        setContacts(data.data.map((c: Record<string, unknown>) => ({
          id: c.id as string,
          name: (c.name as string) || '',
          phone: (c.phone as string) || (c.mobile as string) || '',
          category_name: (c.category as { name?: string } | null)?.name || undefined,
        })))
      }
    } catch {
      // 로드 실패 시 빈 목록 유지
    } finally {
      setLoadingContacts(false)
    }
  }, [contacts.length])

  // 모달 열기
  const openContactModal = () => {
    setShowContactModal(true)
    setContactSearch('')
    loadContacts()
  }

  // 연락처 선택 토글
  const toggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  // 전체 선택/해제
  const toggleAllContacts = (filteredContacts: Contact[]) => {
    const filteredIds = filteredContacts.map(c => c.id)
    const allSelected = filteredIds.every(id => selectedContacts.includes(id))
    if (allSelected) {
      setSelectedContacts(prev => prev.filter(id => !filteredIds.includes(id)))
    } else {
      setSelectedContacts(prev => [...new Set([...prev, ...filteredIds])])
    }
  }

  // 검색 필터링
  const filteredContacts = contacts.filter(c => {
    if (!contactSearch) return true
    const query = contactSearch.toLowerCase()
    return (
      (c.name && c.name.toLowerCase().includes(query)) ||
      (c.phone && c.phone.includes(query)) ||
      (c.category_name && c.category_name.toLowerCase().includes(query))
    )
  })

  // 빠른 템플릿 적용
  const applyQuickTemplate = (templateContent: string) => {
    setContent(templateContent)
  }

  // 발송 버튼 클릭 (실제 API 호출)
  const handleSend = async () => {
    // 수신자 ID 수집
    let recipientIds: string[] = []

    if (recipientType === 'all') {
      // 전체 발송: 모든 연락처 조회
      try {
        const res = await fetch('/api/admin/contacts?pageSize=500')
        const data = await res.json()
        if (data.data) {
          recipientIds = data.data.map((c: { id: string }) => c.id)
        }
      } catch {
        alert('연락처 목록을 불러오는데 실패했습니다.')
        return
      }
    } else if (recipientType === 'category') {
      // 카테고리별: 해당 카테고리 연락처 조회
      if (selectedCategories.length === 0) {
        alert('카테고리를 선택해주세요.')
        return
      }
      try {
        const res = await fetch('/api/admin/contacts?pageSize=500')
        const data = await res.json()
        if (data.data) {
          // 선택된 카테고리 ID로 필터링
          recipientIds = data.data
            .filter((c: { category_id?: string }) =>
              c.category_id && selectedCategories.includes(c.category_id)
            )
            .map((c: { id: string }) => c.id)
        }
      } catch {
        alert('연락처 목록을 불러오는데 실패했습니다.')
        return
      }
    } else {
      recipientIds = selectedContacts
    }

    if (recipientIds.length === 0) {
      alert('발송 대상이 없습니다.')
      return
    }

    setIsSending(true)

    try {
      const res = await fetch('/api/admin/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientIds,
          content,
          imageUrl,
          buttonText,
          buttonLink,
          targeting,
        }),
      })

      const result = await res.json()

      if (res.ok && result.success) {
        alert(`${result.sentCount}명에게 메시지를 발송했습니다.`)
        window.location.href = '/admin/messages'
      } else {
        alert(result.error || '메시지 발송에 실패했습니다.')
      }
    } catch {
      alert('네트워크 오류가 발생했습니다.')
    } finally {
      setIsSending(false)
    }
  }

  // 카테고리 토글
  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev =>
      prev.includes(catId)
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    )
  }

  // 수신자 수 계산
  const getRecipientCount = () => {
    if (recipientType === 'all') return totalContactCount
    if (recipientType === 'category' && selectedCategories.length > 0) {
      return selectedCategories.reduce((sum, id) => sum + (categoryContactCounts[id] || 0), 0)
    }
    if (recipientType === 'select') return selectedContacts.length
    return 0
  }

  const inputClassName = cn(
    'bg-zinc-950 border-zinc-800 text-zinc-100',
    'placeholder:text-zinc-600',
    'focus:ring-zinc-700 focus:border-zinc-600'
  )

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/messages"
          className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-400" />
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">카카오톡 브랜드 메시지 발송</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            마케팅 수신동의 유저에게 브랜드 메시지를 발송합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 왼쪽: 작성 영역 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 발송 대상 */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
            <h2 className="text-sm font-medium text-zinc-100">발송 대상</h2>

            <div className="space-y-3">
              <div className="flex gap-2">
                {(['all', 'category', 'select'] as RecipientType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setRecipientType(type)
                      setSelectedCategories([])
                      if (type !== 'select') setSelectedContacts([])
                    }}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      recipientType === type
                        ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                        : 'bg-zinc-800/50 text-zinc-500 border border-transparent hover:text-zinc-300'
                    )}
                  >
                    {type === 'all' && '전체'}
                    {type === 'category' && '카테고리별'}
                    {type === 'select' && '직접 선택'}
                  </button>
                ))}
              </div>

              {recipientType === 'category' && (
                <div className="flex flex-wrap gap-2">
                  {loadingCategories ? (
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      카테고리 로딩 중...
                    </div>
                  ) : categories.length === 0 ? (
                    <p className="text-sm text-zinc-500">등록된 카테고리가 없습니다.</p>
                  ) : (
                    categories.map(cat => {
                      const isSelected = selectedCategories.includes(cat.id)
                      const count = categoryContactCounts[cat.id] || 0
                      return (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                            'flex items-center gap-1.5',
                            isSelected
                              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                              : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                          )}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          {cat.name}
                          <span className="text-xs text-zinc-500">({count})</span>
                        </button>
                      )
                    })
                  )}
                </div>
              )}

              {recipientType === 'select' && (
                <Button
                  variant="outline"
                  className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                  onClick={openContactModal}
                >
                  <Users className="w-4 h-4 mr-2" />
                  연락처에서 선택 ({selectedContacts.length}명 선택됨)
                </Button>
              )}

              {recipientType === 'select' && selectedContacts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedContacts.slice(0, 5).map(id => {
                    const contact = contacts.find(c => c.id === id)
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs border border-zinc-700"
                      >
                        {contact?.name || '...'}
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleContact(id) }}
                          className="hover:text-zinc-100 transition-colors ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )
                  })}
                  {selectedContacts.length > 5 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs border border-zinc-700">
                      +{selectedContacts.length - 5}명
                    </span>
                  )}
                </div>
              )}

              <p className="text-xs text-zinc-500">
                발송 대상: <span className="text-zinc-400">
                  {recipientType === 'category' && selectedCategories.length > 0
                    ? `${categories.filter(c => selectedCategories.includes(c.id)).map(c => c.name).join(', ')} (${getRecipientCount()}명)`
                    : `${getRecipientCount()}명`
                  }
                </span>
              </p>
            </div>
          </div>

          {/* 메시지 내용 */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
            <h2 className="text-sm font-medium text-zinc-100">메시지 내용</h2>

            <div className="space-y-4">
              {/* 빠른 입력 */}
              <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">빠른 입력</Label>
                <div className="flex flex-wrap gap-2">
                  {quickTemplates.map(t => (
                    <button
                      key={t.id}
                      onClick={() => applyQuickTemplate(t.content)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 메시지 본문 */}
              <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">본문</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="메시지 내용을 입력하세요..."
                  rows={8}
                  className={cn(inputClassName, 'resize-none')}
                />
                <p className="text-xs text-zinc-500 text-right">
                  {content.length} / 1,000자
                </p>
              </div>

              {/* 이미지 URL */}
              <div className="space-y-2">
                <Label className="text-zinc-300 text-sm flex items-center gap-2">
                  <Image className="w-3.5 h-3.5" />
                  이미지 (선택)
                </Label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="이미지 URL을 입력하세요"
                  className={inputClassName}
                />
              </div>

              {/* 버튼 */}
              <div className="space-y-2">
                <Label className="text-zinc-300 text-sm flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5" />
                  버튼 (선택)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="버튼 텍스트"
                    className={inputClassName}
                  />
                  <Input
                    value={buttonLink}
                    onChange={(e) => setButtonLink(e.target.value)}
                    placeholder="버튼 URL"
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* 발송 대상 타겟팅 */}
              <div className="space-y-2">
                <Label className="text-zinc-300 text-sm flex items-center gap-2">
                  <Megaphone className="w-3.5 h-3.5" />
                  발송 타겟팅
                </Label>
                <div className="flex flex-wrap gap-2">
                  {targetingOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setTargeting(option.value)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        targeting === option.value
                          ? 'bg-[#D4AF37] text-black'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-zinc-500">
                  {targetingOptions.find(o => o.value === targeting)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* 발송 버튼 */}
          <div className="flex gap-3">
            <Link href="/admin/messages" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-800"
              >
                취소
              </Button>
            </Link>
            <Button
              onClick={handleSend}
              disabled={!content || isSending}
              className="flex-1 bg-[#D4AF37] hover:bg-[#C49B30] text-black font-medium"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  발송 중...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  카카오톡 발송
                </span>
              )}
            </Button>
          </div>

          {/* NHN Cloud 안내 */}
          <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-800/30 space-y-1">
            <p className="text-sm text-amber-400 font-medium">
              브랜드 메시지 발송 안내
            </p>
            <p className="text-xs text-amber-400/80">
              • 마케팅 수신동의 유저에게 채널 친구 여부와 관계없이 발송 가능
            </p>
            <p className="text-xs text-amber-400/80">
              • 발송 시간: 08:00 ~ 20:50 (야간 발송 제한)
            </p>
          </div>
        </div>

        {/* 오른쪽: 미리보기 */}
        <div className="lg:col-span-2">
          <div className="sticky top-6">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
              <h3 className="text-sm font-medium text-zinc-100">미리보기</h3>

              {/* 카카오톡 스타일 미리보기 */}
              <div className="bg-[#B2C7D9] rounded-xl p-4 min-h-[400px]">
                {/* 채팅방 헤더 */}
                <div className="text-center mb-4">
                  <p className="text-xs text-[#5B6770]">관훈아르떼</p>
                </div>

                {/* 메시지 말풍선 */}
                <div className="flex gap-2">
                  {/* 프로필 */}
                  <div className="w-9 h-9 rounded-full bg-[#FEE500] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#3C1E1E]">관훈</span>
                  </div>

                  <div className="flex-1 max-w-[85%]">
                    <p className="text-xs text-[#5B6770] mb-1">관훈아르떼</p>

                    {/* 말풍선 */}
                    <div className="bg-white rounded-lg rounded-tl-none shadow-sm overflow-hidden">
                      {/* 이미지 영역 */}
                      {imageUrl && (
                        <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                          <Image className="w-6 h-6 text-gray-400" />
                        </div>
                      )}

                      {/* 텍스트 영역 */}
                      <div className="p-3">
                        <p className="text-sm text-[#333] whitespace-pre-wrap leading-relaxed">
                          {content || '메시지 내용이 여기에 표시됩니다.'}
                        </p>
                      </div>

                      {/* 버튼 영역 */}
                      {buttonText && (
                        <>
                          <div className="border-t border-gray-100" />
                          <div className="p-2">
                            <div className="text-center py-2 rounded bg-[#FEE500]/20 text-sm text-[#3C1E1E] font-medium">
                              {buttonText}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 발송 정보 요약 */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">채널</span>
                  <span className="text-zinc-400">브랜드 메시지</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">대상</span>
                  <span className="text-zinc-400">{getRecipientCount()}명</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">타겟팅</span>
                  <span className="text-amber-400">
                    {targetingOptions.find(o => o.value === targeting)?.label}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">글자 수</span>
                  <span className={cn(
                    'text-zinc-400',
                    content.length > 1000 && 'text-red-400'
                  )}>
                    {content.length}자
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 연락처 선택 모달 */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowContactModal(false)}
          />
          <div className="relative w-full max-w-lg mx-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col max-h-[80vh]">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-100">연락처 선택</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* 검색 */}
            <div className="p-4 border-b border-zinc-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="이름 또는 전화번호 검색..."
                  className="w-full pl-9 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* 전체 선택 */}
            {!loadingContacts && filteredContacts.length > 0 && (
              <div className="px-4 py-2.5 border-b border-zinc-800">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filteredContacts.length > 0 && filteredContacts.every(c => selectedContacts.includes(c.id))}
                    onChange={() => toggleAllContacts(filteredContacts)}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-zinc-400 focus:ring-zinc-600"
                  />
                  <span className="text-sm text-zinc-400">
                    전체 선택 ({filteredContacts.length}명)
                  </span>
                </label>
              </div>
            )}

            {/* 연락처 목록 */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {loadingContacts ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-zinc-500">
                    {contacts.length === 0 ? '연락처가 없습니다.' : '검색 결과가 없습니다.'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-800">
                  {filteredContacts.map(contact => (
                    <label
                      key={contact.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleContact(contact.id)}
                        className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-zinc-400 focus:ring-zinc-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-zinc-100 truncate">{contact.name}</span>
                          {contact.category_name && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                              {contact.category_name}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-zinc-500 flex-shrink-0">{contact.phone || '-'}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 모달 푸터 */}
            <div className="p-4 border-t border-zinc-800">
              <Button
                onClick={() => setShowContactModal(false)}
                className="w-full bg-[#D4AF37] hover:bg-[#C49B30] text-black font-medium"
              >
                {selectedContacts.length}명 선택 완료
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
