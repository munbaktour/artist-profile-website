'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Send,
  Users,
  MessageSquare,
  Image,
  Link as LinkIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 카카오톡 메시지 템플릿 목록
const templates = [
  {
    id: 'exhibition_invite',
    label: '전시 초대',
    description: '전시 오픈 초대 메시지',
    defaultContent: '안녕하세요, 관훈아르떼입니다.\n\n새로운 전시가 오픈합니다.\n\n▶ 전시명: \n▶ 기간: \n▶ 장소: 관훈아르떼\n\n많은 관심 부탁드립니다.',
  },
  {
    id: 'general_notice',
    label: '일반 공지',
    description: '일반 안내 메시지',
    defaultContent: '안녕하세요, 관훈아르떼입니다.\n\n',
  },
  {
    id: 'event_invite',
    label: '행사 안내',
    description: '오프닝/이벤트 안내',
    defaultContent: '안녕하세요, 관훈아르떼입니다.\n\n특별한 행사에 초대합니다.\n\n▶ 행사명: \n▶ 일시: \n▶ 장소: 관훈아르떼\n\n참석 여부를 알려주시면 감사하겠습니다.',
  },
  {
    id: 'thanks',
    label: '감사 인사',
    description: '방문/구매 감사 메시지',
    defaultContent: '안녕하세요, 관훈아르떼입니다.\n\n방문해 주셔서 감사합니다.\n앞으로도 좋은 전시로 찾아뵙겠습니다.\n\n감사합니다.',
  },
]

type RecipientType = 'all' | 'category' | 'select'

// 카테고리 목록 (mock)
const mockCategories = [
  { id: '1', name: 'VIP' },
  { id: '2', name: '작가' },
  { id: '3', name: '컬렉터' },
  { id: '4', name: '언론' },
  { id: '5', name: '기관' },
]

export default function MessageComposePage() {
  const [recipientType, setRecipientType] = useState<RecipientType>('all')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [templateId, setTemplateId] = useState('')
  const [content, setContent] = useState('')
  const [buttonText, setButtonText] = useState('')
  const [buttonLink, setButtonLink] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isSending, setIsSending] = useState(false)

  // 템플릿 선택 시 내용 자동 채우기
  const handleTemplateChange = (id: string) => {
    setTemplateId(id)
    const template = templates.find(t => t.id === id)
    if (template) {
      setContent(template.defaultContent)
    }
  }

  // 발송 버튼 클릭 (UI만)
  const handleSend = () => {
    setIsSending(true)
    // NHN Cloud 인증 대기 중 - 실제 발송 안 함
    setTimeout(() => {
      setIsSending(false)
      alert('NHN Cloud 카카오톡 발송 서비스 인증 대기 중입니다.\n인증 완료 후 발송이 가능합니다.')
    }, 1000)
  }

  // 수신자 수 계산 (mock)
  const getRecipientCount = () => {
    if (recipientType === 'all') return 128
    if (recipientType === 'category' && selectedCategory) {
      const counts: Record<string, number> = { '1': 15, '2': 32, '3': 28, '4': 18, '5': 12 }
      return counts[selectedCategory] || 0
    }
    return 0
  }

  const inputClassName = cn(
    'bg-[#0a0a0a] border-[#262626] text-white',
    'placeholder:text-[#52525b]',
    'focus:ring-white/20 focus:border-white/20'
  )

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/messages"
          className="p-2 rounded-lg hover:bg-[#262626] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#a1a1aa]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">카카오톡 메시지 발송</h1>
          <p className="text-[#a1a1aa] text-sm mt-1">
            카카오 알림톡/친구톡을 통해 메시지를 발송합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 왼쪽: 작성 영역 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 발송 대상 */}
          <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="text-white font-medium">발송 대상</h2>
            </div>

            <Separator className="bg-[#262626]" />

            <div className="space-y-3">
              <div className="flex gap-2">
                {(['all', 'category', 'select'] as RecipientType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setRecipientType(type)
                      setSelectedCategory('')
                    }}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      recipientType === type
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                        : 'bg-[#262626] text-[#a1a1aa] border border-transparent hover:border-[#363636]'
                    )}
                  >
                    {type === 'all' && '전체'}
                    {type === 'category' && '카테고리별'}
                    {type === 'select' && '직접 선택'}
                  </button>
                ))}
              </div>

              {recipientType === 'category' && (
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className={inputClassName}>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#262626]">
                    {mockCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id} className="text-white">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {recipientType === 'select' && (
                <Button
                  variant="outline"
                  className="w-full border-[#262626] text-[#a1a1aa] hover:bg-[#262626]"
                >
                  <Users className="w-4 h-4 mr-2" />
                  연락처에서 선택 (0명 선택됨)
                </Button>
              )}

              <p className="text-xs text-[#52525b]">
                발송 대상: <span className="text-[#a1a1aa]">{getRecipientCount()}명</span>
              </p>
            </div>
          </div>

          {/* 메시지 내용 */}
          <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <MessageSquare className="w-4 h-4 text-amber-400" />
              </div>
              <h2 className="text-white font-medium">메시지 내용</h2>
            </div>

            <Separator className="bg-[#262626]" />

            <div className="space-y-4">
              {/* 템플릿 선택 */}
              <div className="space-y-2">
                <Label className="text-[#fafafa]">템플릿</Label>
                <Select value={templateId} onValueChange={handleTemplateChange}>
                  <SelectTrigger className={inputClassName}>
                    <SelectValue placeholder="템플릿을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#262626]">
                    {templates.map(t => (
                      <SelectItem key={t.id} value={t.id} className="text-white">
                        <div>
                          <p>{t.label}</p>
                          <p className="text-xs text-[#52525b]">{t.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 메시지 본문 */}
              <div className="space-y-2">
                <Label className="text-[#fafafa]">본문</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="메시지 내용을 입력하세요..."
                  rows={8}
                  className={cn(inputClassName, 'resize-none')}
                />
                <p className="text-xs text-[#52525b] text-right">
                  {content.length} / 1,000자
                </p>
              </div>

              {/* 이미지 URL */}
              <div className="space-y-2">
                <Label className="text-[#fafafa] flex items-center gap-2">
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
                <Label className="text-[#fafafa] flex items-center gap-2">
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
            </div>
          </div>

          {/* 발송 버튼 */}
          <div className="flex gap-3">
            <Link href="/admin/messages" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-[#262626] text-[#a1a1aa] hover:bg-[#262626]"
              >
                취소
              </Button>
            </Link>
            <Button
              onClick={handleSend}
              disabled={!content || isSending}
              className="flex-1 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] font-medium"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#3C1E1E]/30 border-t-[#3C1E1E] rounded-full animate-spin" />
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
          <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
            <p className="text-sm text-yellow-400/80">
              NHN Cloud 카카오톡 발송 서비스 인증 대기 중입니다. 인증 완료 후 실제 발송이 가능합니다.
            </p>
          </div>
        </div>

        {/* 오른쪽: 미리보기 */}
        <div className="lg:col-span-2">
          <div className="sticky top-6">
            <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
              <h3 className="text-white font-medium text-sm">미리보기</h3>
              <Separator className="bg-[#262626]" />

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
                  <span className="text-[#52525b]">채널</span>
                  <span className="text-[#a1a1aa]">카카오 알림톡</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#52525b]">대상</span>
                  <span className="text-[#a1a1aa]">{getRecipientCount()}명</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#52525b]">템플릿</span>
                  <span className="text-[#a1a1aa]">
                    {templates.find(t => t.id === templateId)?.label || '없음'}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#52525b]">글자 수</span>
                  <span className={cn(
                    'text-[#a1a1aa]',
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
    </div>
  )
}
