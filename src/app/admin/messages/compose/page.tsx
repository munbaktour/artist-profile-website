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
  MessageSquare,
  Bell,
  Phone,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 메시지 타입
type MessageType = 'alimtalk' | 'brandmessage' | 'sms' | 'kakao_sms'

// 타겟팅 타입 (브랜드 메시지용)
type TargetingType = 'M' | 'N' | 'I'

// 발송 단계
type SendStep = 'compose' | 'preview' | 'result'

const targetingOptions = [
  { value: 'M' as TargetingType, label: '전체', description: '마케팅 수신동의 유저 전체' },
  { value: 'I' as TargetingType, label: '채널 친구만', description: '채널 친구인 유저만' },
  { value: 'N' as TargetingType, label: '비친구만', description: '채널 친구가 아닌 유저만' },
]

// 알림톡 템플릿 - NHN Cloud 승인된 템플릿
interface AlimtalkTemplate {
  templateCode: string
  templateName: string
  templateContent: string
  buttons?: { type: string; name: string; linkMo?: string; linkPc?: string }[]
  // 개별 변수 (1명: 직접 입력, 2명 이상: DB에서 자동 치환)
  individualVars?: string[]
  // 공통 변수 (사용자가 입력)
  commonVars?: string[]
}

// 변수 모드: 1명 선택 시 직접 입력, 2명 이상 선택 시 자동 치환
type VariableMode = 'manual' | 'auto'

// 실제 NHN Cloud 승인된 알림톡 템플릿 목록
const alimtalkTemplates: AlimtalkTemplate[] = [
  {
    templateCode: 'ARTWORK_INQUIRY',
    templateName: '작품 문의 접수',
    templateContent: '안녕하세요, #{고객명}님.\n\n#{작품명} 작품에 대한 문의가 접수되었습니다.\n담당자가 확인 후 연락드리겠습니다.\n\n감사합니다.\n관훈아르떼',
    individualVars: ['고객명'],
    commonVars: ['작품명'],
  },
  {
    templateCode: 'INQUIRY_CONFIRM',
    templateName: '문의 확인 안내',
    templateContent: '안녕하세요, #{고객명}님.\n\n문의하신 내용을 확인하였습니다.\n\n#{답변내용}\n\n추가 문의사항이 있으시면 연락주세요.\n관훈아르떼',
    individualVars: ['고객명'],
    commonVars: ['답변내용'],
  },
  {
    templateCode: 'RESERVE_CONFIRM',
    templateName: '예약 확인',
    templateContent: '안녕하세요, #{고객명}님.\n\n#{예약일시} 예약이 확정되었습니다.\n\n▶ 장소: 관훈아르떼\n▶ 주소: 서울시 종로구 관훈동\n\n방문 시 본 메시지를 보여주세요.\n감사합니다.',
    individualVars: ['고객명'],
    commonVars: ['예약일시'],
  },
  {
    templateCode: 'EXHIBITION_INVITE',
    templateName: '전시 초대',
    templateContent: '안녕하세요, #{고객명}님.\n\n관훈아르떼에서 새로운 전시를 안내드립니다.\n\n▶ 전시명: #{전시명}\n▶ 기간: #{전시기간}\n▶ 장소: 관훈아르떼\n\n많은 관심 부탁드립니다.',
    individualVars: ['고객명'],
    commonVars: ['전시명', '전시기간'],
    buttons: [
      { type: 'WL', name: '전시 보기', linkMo: 'https://kwanhoonarte.com/exhibition', linkPc: 'https://kwanhoonarte.com/exhibition' }
    ]
  },
  {
    templateCode: 'VISIT_THANKS',
    templateName: '방문 감사',
    templateContent: '안녕하세요, #{고객명}님.\n\n관훈아르떼를 방문해 주셔서 감사합니다.\n앞으로도 좋은 전시로 찾아뵙겠습니다.\n\n감사합니다.\n관훈아르떼',
    individualVars: ['고객명'],
    commonVars: [],
  },
  {
    templateCode: 'EVENT_NOTICE',
    templateName: '행사 안내',
    templateContent: '안녕하세요, #{고객명}님.\n\n관훈아르떼에서 특별한 행사를 안내드립니다.\n\n▶ 행사명: #{행사명}\n▶ 일시: #{행사일시}\n▶ 장소: #{장소}\n\n참여를 원하시면 회신 부탁드립니다.',
    individualVars: ['고객명'],
    commonVars: ['행사명', '행사일시', '장소'],
  },
  {
    templateCode: 'OPENING_NOTICE',
    templateName: '오프닝 안내',
    templateContent: '안녕하세요, #{고객명}님.\n\n#{전시명} 전시 오프닝에 초대합니다.\n\n▶ 일시: #{오프닝일시}\n▶ 장소: 관훈아르떼\n\n작가와 함께하는 특별한 시간이 될 것입니다.\n많은 참석 부탁드립니다.',
    individualVars: ['고객명'],
    commonVars: ['전시명', '오프닝일시'],
  },
  {
    templateCode: 'PURCHASE_CONFIRM',
    templateName: '구매 확인',
    templateContent: '안녕하세요, #{고객명}님.\n\n#{작품명} 작품 구매가 완료되었습니다.\n\n▶ 결제금액: #{결제금액}\n▶ 수령방법: #{수령방법}\n\n추가 문의사항은 연락주세요.\n감사합니다.',
    individualVars: ['고객명'],
    commonVars: ['작품명', '결제금액', '수령방법'],
  },
  {
    templateCode: 'DELIVERY_NOTICE',
    templateName: '배송 안내',
    templateContent: '안녕하세요, #{고객명}님.\n\n주문하신 #{작품명} 작품이 발송되었습니다.\n\n▶ 택배사: #{택배사}\n▶ 운송장번호: #{운송장번호}\n\n배송 조회는 택배사 홈페이지에서 가능합니다.',
    individualVars: ['고객명'],
    commonVars: ['작품명', '택배사', '운송장번호'],
  },
  {
    templateCode: 'SEASON_GREETING',
    templateName: '시즌 인사',
    templateContent: '안녕하세요, #{고객명}님.\n\n#{인사메시지}\n\n관훈아르떼 드림',
    individualVars: ['고객명'],
    commonVars: ['인사메시지'],
  },
]

// 빠른 입력 템플릿 (브랜드 메시지용)
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
  mobile?: string
  category_name?: string
}

type RecipientType = 'all' | 'category' | 'select'

interface Category {
  id: string
  name: string
  color?: string
}

interface SendResult {
  success: boolean
  total: number
  successCount: number
  failCount: number
  failedRecipients?: { name: string; phone: string; reason: string }[]
  requestId?: string
}

export default function MessageComposePage() {
  // 발송 단계
  const [sendStep, setSendStep] = useState<SendStep>('compose')
  const [sendResult, setSendResult] = useState<SendResult | null>(null)

  // 메시지 타입
  const [messageType, setMessageType] = useState<MessageType>('alimtalk')
  const [selectedTemplate, setSelectedTemplate] = useState<AlimtalkTemplate | null>(null)
  // 공통 변수 (사용자 입력)
  const [commonVariables, setCommonVariables] = useState<Record<string, string>>({})
  // 개별 변수 (1명 선택 시 직접 입력용)
  const [individualVariables, setIndividualVariables] = useState<Record<string, string>>({})

  // 수신자 관련
  const [recipientType, setRecipientType] = useState<RecipientType>('all')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactSearch, setContactSearch] = useState('')
  const [loadingContacts, setLoadingContacts] = useState(false)

  // 브랜드 메시지 / SMS 관련
  const [content, setContent] = useState('')
  const [targeting, setTargeting] = useState<TargetingType>('M')
  const [buttonText, setButtonText] = useState('')
  const [buttonLink, setButtonLink] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // 발송 관련
  const [isSending, setIsSending] = useState(false)
  const [totalContactCount, setTotalContactCount] = useState(0)
  const [categoryContactCounts, setCategoryContactCounts] = useState<Record<string, number>>({})
  const [previewContacts, setPreviewContacts] = useState<Contact[]>([])

  // 변수 모드 계산: 1명이면 manual, 2명 이상이면 auto
  const getVariableMode = (): VariableMode => {
    if (recipientType === 'select') {
      return selectedContacts.length === 1 ? 'manual' : 'auto'
    }
    // 전체 또는 카테고리 선택 시 항상 auto (2명 이상일 가능성 높음)
    return 'auto'
  }

  const variableMode = getVariableMode()

  // 템플릿 선택 시 변수 초기화
  const handleTemplateSelect = (template: AlimtalkTemplate) => {
    setSelectedTemplate(template)
    // 공통 변수 초기화
    const initialCommonVars: Record<string, string> = {}
    template.commonVars?.forEach(v => { initialCommonVars[v] = '' })
    setCommonVariables(initialCommonVars)
    // 개별 변수 초기화
    const initialIndividualVars: Record<string, string> = {}
    template.individualVars?.forEach(v => { initialIndividualVars[v] = '' })
    setIndividualVariables(initialIndividualVars)
  }

  // 개별 메시지 미리보기 생성 (특정 고객용)
  const getPreviewMessage = (contact: Contact, mode: VariableMode = variableMode): string => {
    if (!selectedTemplate) return ''

    let message = selectedTemplate.templateContent

    if (mode === 'manual') {
      // 1명 선택: 사용자가 직접 입력한 개별 변수 사용
      Object.entries(individualVariables).forEach(([key, value]) => {
        message = message.replace(new RegExp(`#\\{${key}\\}`, 'g'), value || `#{${key}}`)
      })
    } else {
      // 2명 이상: DB에서 자동 치환
      message = message.replace(/#{고객명}/g, contact.name || '고객')
      message = message.replace(/#{전화번호}/g, contact.phone || contact.mobile || '')
    }

    // 공통 변수 치환
    Object.entries(commonVariables).forEach(([key, value]) => {
      message = message.replace(new RegExp(`#\\{${key}\\}`, 'g'), value || `#{${key}}`)
    })

    return message
  }

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
      const res = await fetch('/api/admin/contacts?pageSize=500')
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      if (data.data && Array.isArray(data.data)) {
        setContacts(data.data.map((c: Record<string, unknown>) => ({
          id: c.id as string,
          name: (c.name as string) || '',
          phone: (c.phone as string) || (c.mobile as string) || '',
          mobile: (c.mobile as string) || '',
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

  // 미리보기 단계로 이동
  const goToPreview = async () => {
    // 수신자 정보 수집
    let recipientIds: string[] = []

    if (recipientType === 'all') {
      try {
        const res = await fetch('/api/admin/contacts?pageSize=500')
        const data = await res.json()
        if (data.data) {
          recipientIds = data.data.map((c: { id: string }) => c.id)
          setPreviewContacts(data.data.map((c: Record<string, unknown>) => ({
            id: c.id as string,
            name: (c.name as string) || '',
            phone: (c.phone as string) || (c.mobile as string) || '',
            mobile: (c.mobile as string) || '',
          })))
        }
      } catch {
        alert('연락처 목록을 불러오는데 실패했습니다.')
        return
      }
    } else if (recipientType === 'category') {
      if (selectedCategories.length === 0) {
        alert('카테고리를 선택해주세요.')
        return
      }
      try {
        const res = await fetch('/api/admin/contacts?pageSize=500')
        const data = await res.json()
        if (data.data) {
          const filtered = data.data.filter((c: { category_id?: string }) =>
            c.category_id && selectedCategories.includes(c.category_id)
          )
          recipientIds = filtered.map((c: { id: string }) => c.id)
          setPreviewContacts(filtered.map((c: Record<string, unknown>) => ({
            id: c.id as string,
            name: (c.name as string) || '',
            phone: (c.phone as string) || (c.mobile as string) || '',
            mobile: (c.mobile as string) || '',
          })))
        }
      } catch {
        alert('연락처 목록을 불러오는데 실패했습니다.')
        return
      }
    } else {
      recipientIds = selectedContacts
      setPreviewContacts(contacts.filter(c => selectedContacts.includes(c.id)))
    }

    if (recipientIds.length === 0) {
      alert('발송 대상이 없습니다.')
      return
    }

    // 유효성 검사
    if (messageType === 'alimtalk' && !selectedTemplate) {
      alert('템플릿을 선택해주세요.')
      return
    }

    if ((messageType === 'brandmessage' || messageType === 'sms' || messageType === 'kakao_sms') && !content) {
      alert('메시지 내용을 입력해주세요.')
      return
    }

    setSendStep('preview')
  }

  // 실제 발송
  const handleSend = async () => {
    setIsSending(true)

    try {
      const recipientIds = previewContacts.map(c => c.id)

      const requestBody: Record<string, unknown> = {
        recipientIds,
        messageType,
      }

      if (messageType === 'alimtalk') {
        requestBody.templateCode = selectedTemplate?.templateCode
        requestBody.commonVariables = commonVariables
        // 변수 모드: 1명이면 직접 입력한 변수, 2명 이상이면 auto
        requestBody.variableMode = variableMode
        if (variableMode === 'manual') {
          requestBody.individualVariables = individualVariables
        }
      } else if (messageType === 'brandmessage') {
        requestBody.content = content
        requestBody.imageUrl = imageUrl
        requestBody.buttonText = buttonText
        requestBody.buttonLink = buttonLink
        requestBody.targeting = targeting
      } else if (messageType === 'sms') {
        requestBody.content = content
      } else if (messageType === 'kakao_sms') {
        // 카카오톡 실패 시 SMS 대체 발송
        requestBody.content = content
        requestBody.fallbackToSms = true
        if (selectedTemplate) {
          requestBody.templateCode = selectedTemplate.templateCode
          requestBody.commonVariables = commonVariables
          requestBody.variableMode = variableMode
          if (variableMode === 'manual') {
            requestBody.individualVariables = individualVariables
          }
        }
      }

      const res = await fetch('/api/admin/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const result = await res.json()

      if (res.ok) {
        setSendResult({
          success: true,
          total: previewContacts.length,
          successCount: result.successCount || result.sentCount || previewContacts.length,
          failCount: result.failCount || 0,
          failedRecipients: result.failedRecipients,
          requestId: result.requestId,
        })
      } else {
        setSendResult({
          success: false,
          total: previewContacts.length,
          successCount: 0,
          failCount: previewContacts.length,
          failedRecipients: [{ name: '전체', phone: '', reason: result.error || '발송 실패' }],
        })
      }

      setSendStep('result')
    } catch {
      setSendResult({
        success: false,
        total: previewContacts.length,
        successCount: 0,
        failCount: previewContacts.length,
        failedRecipients: [{ name: '전체', phone: '', reason: '네트워크 오류' }],
      })
      setSendStep('result')
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

  // 결과 화면
  if (sendStep === 'result' && sendResult) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center py-8">
          {sendResult.success && sendResult.failCount === 0 ? (
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : sendResult.successCount > 0 ? (
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          )}

          <h1 className="text-xl font-semibold text-zinc-100 mb-2">
            {sendResult.success && sendResult.failCount === 0
              ? '발송 완료'
              : sendResult.successCount > 0
              ? '일부 발송 완료'
              : '발송 실패'}
          </h1>

          <p className="text-zinc-400">
            총 {sendResult.total}명 중 {sendResult.successCount}명 성공
            {sendResult.failCount > 0 && `, ${sendResult.failCount}명 실패`}
          </p>
        </div>

        {/* 결과 통계 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 text-center">
            <p className="text-2xl font-bold text-zinc-100">{sendResult.total}</p>
            <p className="text-sm text-zinc-500">전체</p>
          </div>
          <div className="bg-zinc-900 rounded-lg border border-green-800/30 p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{sendResult.successCount}</p>
            <p className="text-sm text-zinc-500">성공</p>
          </div>
          <div className="bg-zinc-900 rounded-lg border border-red-800/30 p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{sendResult.failCount}</p>
            <p className="text-sm text-zinc-500">실패</p>
          </div>
        </div>

        {/* 실패 상세 */}
        {sendResult.failedRecipients && sendResult.failedRecipients.length > 0 && (
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5">
            <h3 className="text-sm font-medium text-zinc-100 mb-3">실패 상세</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {sendResult.failedRecipients.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-zinc-800 last:border-0">
                  <div>
                    <span className="text-zinc-300">{r.name}</span>
                    {r.phone && <span className="text-zinc-500 ml-2">{r.phone}</span>}
                  </div>
                  <span className="text-red-400 text-xs">{r.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {sendResult.requestId && (
          <p className="text-xs text-zinc-500 text-center">
            요청 ID: {sendResult.requestId}
          </p>
        )}

        <div className="flex gap-3">
          <Link href="/admin/messages" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-800"
            >
              발송 내역으로
            </Button>
          </Link>
          <Button
            onClick={() => {
              setSendStep('compose')
              setSendResult(null)
              setPreviewContacts([])
            }}
            className="flex-1 bg-[#D4AF37] hover:bg-[#C49B30] text-black font-medium"
          >
            새 메시지 작성
          </Button>
        </div>
      </div>
    )
  }

  // 미리보기 화면
  if (sendStep === 'preview') {
    return (
      <div className="max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSendStep('compose')}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">발송 확인</h1>
            <p className="text-zinc-500 text-sm mt-0.5">
              발송 전 내용을 확인해주세요
            </p>
          </div>
        </div>

        {/* 발송 정보 요약 */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
          <h2 className="text-sm font-medium text-zinc-100">발송 정보</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">발송 채널</span>
              <span className="text-zinc-300">
                {messageType === 'alimtalk' && '카카오 알림톡'}
                {messageType === 'brandmessage' && '카카오 브랜드 메시지'}
                {messageType === 'sms' && 'SMS'}
                {messageType === 'kakao_sms' && '카카오톡 + SMS'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">발송 대상</span>
              <span className="text-zinc-300">{previewContacts.length}명</span>
            </div>
            {messageType === 'alimtalk' && selectedTemplate && (
              <div className="flex justify-between col-span-2">
                <span className="text-zinc-500">템플릿</span>
                <span className="text-zinc-300">{selectedTemplate.templateName}</span>
              </div>
            )}
          </div>
        </div>

        {/* 수신자 목록 */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
          <h2 className="text-sm font-medium text-zinc-100">수신자 목록 ({previewContacts.length}명)</h2>
          <div className="max-h-48 overflow-y-auto space-y-1">
            {previewContacts.slice(0, 20).map(contact => (
              <div key={contact.id} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                <span className="text-sm text-zinc-300">{contact.name}</span>
                <span className="text-xs text-zinc-500">{contact.phone}</span>
              </div>
            ))}
            {previewContacts.length > 20 && (
              <p className="text-xs text-zinc-500 text-center py-2">
                외 {previewContacts.length - 20}명
              </p>
            )}
          </div>
        </div>

        {/* 메시지 미리보기 */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
          <h2 className="text-sm font-medium text-zinc-100">메시지 미리보기</h2>

          {messageType === 'alimtalk' && selectedTemplate && previewContacts.length > 0 && (
            <div className="space-y-3">
              {variableMode === 'manual' ? (
                /* 1명 선택: 직접 입력한 변수로 미리보기 */
                <>
                  <p className="text-xs text-zinc-500">📝 직접 입력한 변수 적용</p>
                  <div className="bg-[#B2C7D9] rounded-xl p-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-[#333] whitespace-pre-wrap leading-relaxed">
                        {getPreviewMessage(previewContacts[0], 'manual')}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* 2명 이상: 각 수신자별 미리보기 */
                <>
                  <p className="text-xs text-zinc-500">✨ 수신자별 자동 치환 미리보기 (최대 3명 표시)</p>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {previewContacts.slice(0, 3).map((contact, index) => (
                      <div key={contact.id} className="space-y-1">
                        <p className="text-xs text-zinc-400">{index + 1}. {contact.name} ({contact.phone})</p>
                        <div className="bg-[#B2C7D9] rounded-xl p-3">
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <p className="text-sm text-[#333] whitespace-pre-wrap leading-relaxed">
                              {getPreviewMessage(contact, 'auto')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {previewContacts.length > 3 && (
                      <p className="text-xs text-zinc-500 text-center py-2">
                        외 {previewContacts.length - 3}명에게도 동일하게 자동 치환됩니다
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {(messageType === 'brandmessage' || messageType === 'sms' || messageType === 'kakao_sms') && (
            <div className="bg-[#B2C7D9] rounded-xl p-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-sm text-[#333] whitespace-pre-wrap leading-relaxed">
                  {content}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 발송 버튼 */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setSendStep('compose')}
            className="flex-1 border-zinc-800 text-zinc-400 hover:bg-zinc-800"
          >
            이전으로
          </Button>
          <Button
            onClick={handleSend}
            disabled={isSending}
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
                {previewContacts.length}명에게 발송
              </span>
            )}
          </Button>
        </div>
      </div>
    )
  }

  // 작성 화면 (기본)
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
          <h1 className="text-lg font-semibold text-zinc-100">메시지 발송</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            카카오톡 또는 SMS로 메시지를 발송합니다
          </p>
        </div>
      </div>

      {/* 메시지 타입 선택 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { type: 'alimtalk' as MessageType, icon: Bell, label: '알림톡', desc: '승인 템플릿' },
          { type: 'brandmessage' as MessageType, icon: MessageSquare, label: '브랜드 메시지', desc: '자유 형식' },
          { type: 'sms' as MessageType, icon: Phone, label: 'SMS', desc: '문자 발송' },
          { type: 'kakao_sms' as MessageType, icon: Bell, label: '카카오+SMS', desc: '실패 시 SMS' },
        ].map(({ type, icon: Icon, label, desc }) => (
          <button
            key={type}
            onClick={() => {
              setMessageType(type)
              setSelectedTemplate(null)
              setCommonVariables({})
              setContent('')
            }}
            className={cn(
              'p-3 rounded-lg border transition-all text-left',
              messageType === type
                ? 'bg-zinc-800 border-[#D4AF37] ring-1 ring-[#D4AF37]'
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
            )}
          >
            <div className="flex items-center gap-2">
              <Icon className={cn(
                'w-4 h-4',
                messageType === type ? 'text-[#D4AF37]' : 'text-zinc-500'
              )} />
              <div>
                <p className={cn(
                  'text-sm font-medium',
                  messageType === type ? 'text-zinc-100' : 'text-zinc-400'
                )}>{label}</p>
                <p className="text-[10px] text-zinc-500">{desc}</p>
              </div>
            </div>
          </button>
        ))}
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
                발송 대상: <span className="text-zinc-400">{getRecipientCount()}명</span>
              </p>
            </div>
          </div>

          {/* 메시지 내용 */}
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
            <h2 className="text-sm font-medium text-zinc-100">
              {messageType === 'alimtalk' ? '알림톡 템플릿' : '메시지 내용'}
            </h2>

            {messageType === 'alimtalk' || messageType === 'kakao_sms' ? (
              /* 알림톡: 템플릿 선택 및 공통 변수 입력 */
              <div className="space-y-4">
                {/* 템플릿 선택 */}
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-sm">템플릿 선택</Label>
                  <div className="grid gap-2 max-h-64 overflow-y-auto">
                    {alimtalkTemplates.map(template => (
                      <button
                        key={template.templateCode}
                        onClick={() => handleTemplateSelect(template)}
                        className={cn(
                          'p-3 rounded-lg border text-left transition-all',
                          selectedTemplate?.templateCode === template.templateCode
                            ? 'bg-zinc-800 border-[#D4AF37] ring-1 ring-[#D4AF37]'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        )}
                      >
                        <p className={cn(
                          'font-medium text-sm',
                          selectedTemplate?.templateCode === template.templateCode
                            ? 'text-zinc-100'
                            : 'text-zinc-400'
                        )}>
                          {template.templateName}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                          {template.templateContent}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 변수 모드 안내 */}
                {selectedTemplate && (
                  <div className={cn(
                    "p-3 rounded-lg border",
                    variableMode === 'manual'
                      ? "bg-blue-900/20 border-blue-800/30"
                      : "bg-green-900/20 border-green-800/30"
                  )}>
                    <p className={cn(
                      "text-xs font-medium",
                      variableMode === 'manual' ? "text-blue-400" : "text-green-400"
                    )}>
                      {variableMode === 'manual'
                        ? '📝 1명 선택 - 변수 직접 입력 모드'
                        : '✨ 복수 선택 - 변수 자동 치환 모드'}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {variableMode === 'manual'
                        ? '고객명 등 모든 변수를 직접 입력합니다.'
                        : '#{고객명}, #{전화번호}는 DB에서 자동으로 치환됩니다.'}
                    </p>
                  </div>
                )}

                {/* 개별 변수 입력 (1명 선택 시) */}
                {selectedTemplate && variableMode === 'manual' && selectedTemplate.individualVars && selectedTemplate.individualVars.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-zinc-300 text-sm">개별 변수 입력</Label>
                    {selectedTemplate.individualVars.map(varName => (
                      <div key={varName} className="space-y-1">
                        <Label className="text-xs text-zinc-500">{varName}</Label>
                        <Input
                          value={individualVariables[varName] || ''}
                          onChange={(e) => setIndividualVariables(prev => ({
                            ...prev,
                            [varName]: e.target.value
                          }))}
                          placeholder={`#{${varName}} 값 입력`}
                          className={inputClassName}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 공통 변수 입력 */}
                {selectedTemplate && selectedTemplate.commonVars && selectedTemplate.commonVars.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-zinc-300 text-sm">공통 변수 입력</Label>
                    {selectedTemplate.commonVars.map(varName => (
                      <div key={varName} className="space-y-1">
                        <Label className="text-xs text-zinc-500">{varName}</Label>
                        <Input
                          value={commonVariables[varName] || ''}
                          onChange={(e) => setCommonVariables(prev => ({
                            ...prev,
                            [varName]: e.target.value
                          }))}
                          placeholder={`#{${varName}} 값 입력`}
                          className={inputClassName}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 카카오+SMS일 때 SMS 내용 */}
                {messageType === 'kakao_sms' && (
                  <div className="space-y-2 pt-4 border-t border-zinc-800">
                    <Label className="text-zinc-300 text-sm flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      SMS 대체 발송 내용
                    </Label>
                    <p className="text-xs text-zinc-500">카카오톡 발송 실패 시 이 내용으로 SMS가 발송됩니다</p>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="SMS 내용을 입력하세요..."
                      rows={4}
                      className={cn(inputClassName, 'resize-none')}
                    />
                    <p className="text-xs text-zinc-500 text-right">
                      {content.length} / 90자 (90자 초과 시 LMS)
                    </p>
                  </div>
                )}
              </div>
            ) : messageType === 'sms' ? (
              /* SMS */
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-sm">SMS 내용</Label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="SMS 내용을 입력하세요..."
                    rows={6}
                    className={cn(inputClassName, 'resize-none')}
                  />
                  <p className="text-xs text-zinc-500 text-right">
                    {content.length} / 90자
                    <span className="ml-2">
                      {content.length <= 90 ? '(SMS)' : content.length <= 2000 ? '(LMS)' : '(MMS)'}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              /* 브랜드 메시지 */
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
            )}
          </div>

          {/* 다음 버튼 */}
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
              onClick={goToPreview}
              disabled={
                (messageType === 'alimtalk' && !selectedTemplate) ||
                (messageType === 'brandmessage' && !content) ||
                (messageType === 'sms' && !content) ||
                (messageType === 'kakao_sms' && !selectedTemplate && !content)
              }
              className="flex-1 bg-[#D4AF37] hover:bg-[#C49B30] text-black font-medium"
            >
              <span className="flex items-center gap-2">
                미리보기
                <ChevronRight className="w-4 h-4" />
              </span>
            </Button>
          </div>

          {/* 발송 안내 */}
          <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-800/30 space-y-1">
            <p className="text-sm text-amber-400 font-medium">
              {messageType === 'alimtalk' && '알림톡 발송 안내'}
              {messageType === 'brandmessage' && '브랜드 메시지 발송 안내'}
              {messageType === 'sms' && 'SMS 발송 안내'}
              {messageType === 'kakao_sms' && '카카오톡 + SMS 발송 안내'}
            </p>
            {messageType === 'alimtalk' && (
              <>
                <p className="text-xs text-amber-400/80">• 승인된 템플릿만 발송 가능</p>
                <p className="text-xs text-amber-400/80">• 고객명은 DB에서 자동 치환됩니다</p>
                <p className="text-xs text-amber-400/80">• 24시간 발송 가능</p>
              </>
            )}
            {messageType === 'brandmessage' && (
              <>
                <p className="text-xs text-amber-400/80">• 마케팅 수신동의 유저에게 발송 가능</p>
                <p className="text-xs text-amber-400/80">• 발송 시간: 08:00 ~ 20:50</p>
              </>
            )}
            {messageType === 'sms' && (
              <>
                <p className="text-xs text-amber-400/80">• 90자 이하: SMS / 90자 초과: LMS</p>
                <p className="text-xs text-amber-400/80">• 24시간 발송 가능</p>
              </>
            )}
            {messageType === 'kakao_sms' && (
              <>
                <p className="text-xs text-amber-400/80">• 카카오톡 발송 실패 시 자동으로 SMS 발송</p>
                <p className="text-xs text-amber-400/80">• 추가 비용이 발생할 수 있습니다</p>
              </>
            )}
          </div>
        </div>

        {/* 오른쪽: 미리보기 */}
        <div className="lg:col-span-2">
          <div className="sticky top-6">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
              <h3 className="text-sm font-medium text-zinc-100">미리보기</h3>

              {/* 카카오톡 스타일 미리보기 */}
              <div className="bg-[#B2C7D9] rounded-xl p-4 min-h-[300px]">
                {/* 채팅방 헤더 */}
                <div className="text-center mb-4">
                  <p className="text-xs text-[#5B6770]">관훈아르떼</p>
                </div>

                {/* 메시지 말풍선 */}
                <div className="flex gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#FEE500] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#3C1E1E]">관훈</span>
                  </div>

                  <div className="flex-1 max-w-[85%]">
                    <p className="text-xs text-[#5B6770] mb-1">관훈아르떼</p>

                    <div className="bg-white rounded-lg rounded-tl-none shadow-sm overflow-hidden">
                      {imageUrl && (
                        <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                          <Image className="w-6 h-6 text-gray-400" />
                        </div>
                      )}

                      <div className="p-3">
                        <p className="text-sm text-[#333] whitespace-pre-wrap leading-relaxed">
                          {messageType === 'alimtalk' || messageType === 'kakao_sms'
                            ? (selectedTemplate
                              ? selectedTemplate.templateContent.replace(/#{고객명}/g, '홍길동')
                                .replace(/#\{([^}]+)\}/g, (_, key) => commonVariables[key] || `#{${key}}`)
                              : '템플릿을 선택하세요.')
                            : (content || '메시지 내용이 여기에 표시됩니다.')
                          }
                        </p>
                      </div>

                      {buttonText && messageType === 'brandmessage' && (
                        <>
                          <div className="border-t border-gray-100" />
                          <div className="p-2">
                            <div className="text-center py-2 rounded bg-[#FEE500]/20 text-sm text-[#3C1E1E] font-medium">
                              {buttonText}
                            </div>
                          </div>
                        </>
                      )}

                      {selectedTemplate?.buttons && messageType === 'alimtalk' && (
                        <>
                          <div className="border-t border-gray-100" />
                          <div className="p-2">
                            {selectedTemplate.buttons.map((btn, i) => (
                              <div key={i} className="text-center py-2 rounded bg-[#FEE500]/20 text-sm text-[#3C1E1E] font-medium">
                                {btn.name}
                              </div>
                            ))}
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
                  <span className="text-zinc-400">
                    {messageType === 'alimtalk' && '알림톡'}
                    {messageType === 'brandmessage' && '브랜드 메시지'}
                    {messageType === 'sms' && 'SMS'}
                    {messageType === 'kakao_sms' && '카카오톡 + SMS'}
                  </span>
                </div>
                {(messageType === 'alimtalk' || messageType === 'kakao_sms') && (
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">템플릿</span>
                    <span className="text-zinc-400">
                      {selectedTemplate?.templateName || '미선택'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">대상</span>
                  <span className="text-zinc-400">{getRecipientCount()}명</span>
                </div>
                {messageType === 'brandmessage' && (
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">타겟팅</span>
                    <span className="text-amber-400">
                      {targetingOptions.find(o => o.value === targeting)?.label}
                    </span>
                  </div>
                )}
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
