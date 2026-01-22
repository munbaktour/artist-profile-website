'use client'

import { useEffect, useState, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { isAbortError } from '@/hooks/useAbortableFetch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VipBadge } from '@/components/features/admin/contacts/VipBadge'
import { CategoryBadge } from '@/components/features/admin/contacts/CategoryBadge'
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  MapPin,
  Plus,
  Crown,
  Send,
  MessageSquare,
  MoreHorizontal,
  User,
  Calendar,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Contact, Category, Note, NoteType, AdminContactFormData } from '@/types/admin'

const noteTypes: { value: NoteType; label: string; icon: string }[] = [
  { value: 'note', label: '메모', icon: '📝' },
  { value: 'call', label: '통화', icon: '📞' },
  { value: 'email', label: '이메일', icon: '📧' },
  { value: 'meeting', label: '미팅', icon: '🤝' },
  { value: 'purchase', label: '구매', icon: '💰' },
  { value: 'event', label: '이벤트', icon: '🎨' },
]

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ContactDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'

  const [contact, setContact] = useState<Contact | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(isEditMode)
  const [isSaving, setIsSaving] = useState(false)

  // New note form
  const [newNote, setNewNote] = useState('')
  const [newNoteType, setNewNoteType] = useState<NoteType>('note')
  const [isAddingNote, setIsAddingNote] = useState(false)

  const [formData, setFormData] = useState<AdminContactFormData | null>(null)

  // Delete note loading state - 더블 클릭 방지
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null)

  // Fetch categories with AbortController
  useEffect(() => {
    const controller = new AbortController()

    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/categories', { signal: controller.signal })

        if (controller.signal.aborted) return

        if (res.ok) {
          const data = await res.json()
          setCategories(data)
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

  // Fetch contact with AbortController
  useEffect(() => {
    const controller = new AbortController()

    const fetchContact = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/admin/contacts/${id}`, { signal: controller.signal })

        if (controller.signal.aborted) return

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch contact')
        }

        const c = data.data
        setContact(c)
        setNotes(c.notes || [])
        setFormData({
          categoryId: c.categoryId || '',
          name: c.name,
          nameEn: c.nameEn || '',
          email: c.email || '',
          phone: c.phone || '',
          mobile: c.mobile || '',
          company: c.company || '',
          position: c.position || '',
          address: c.address || '',
          city: c.city || '',
          country: c.country || '',
          postalCode: c.postalCode || '',
          isVip: c.isVip || false,
          preferredLanguage: c.preferredLanguage || 'ko',
          newsletterSubscribed: c.newsletterSubscribed || false,
          source: c.source || '',
        })
      } catch (err) {
        if (isAbortError(err)) return
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchContact()

    return () => {
      controller.abort()
    }
  }, [id])

  const handleSave = async () => {
    if (!formData) return

    setIsSaving(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update contact')
      }

      // Refresh contact data
      const refreshRes = await fetch(`/api/admin/contacts/${id}`)
      const refreshData = await refreshRes.json()

      if (refreshRes.ok) {
        setContact(refreshData.data)
        setNotes(refreshData.data.notes || [])
      }

      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('정말로 이 연락처를 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete contact')
      }

      router.push('/admin/contacts')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    setIsAddingNote(true)

    try {
      const res = await fetch('/api/admin/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactId: id,
          content: newNote,
          type: newNoteType,
          isPrivate: false,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add note')
      }

      // FIX: Use functional update to avoid stale closure
      setNotes((prevNotes) => [data.data, ...prevNotes])
      setNewNote('')
      setNewNoteType('note')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsAddingNote(false)
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('이 메모를 삭제하시겠습니까?')) return

    // Prevent double-click
    if (deletingNoteId) return

    setDeletingNoteId(noteId)

    try {
      const res = await fetch(`/api/admin/notes?id=${noteId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete note')
      }

      // FIX: Use functional update to avoid stale closure
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== noteId))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setDeletingNoteId(null)
    }
  }

  const inputClassName = cn(
    'bg-[#0a0a0a] border-[#262626] text-white',
    'placeholder:text-[#52525b]',
    'focus:ring-white/20 focus:border-white/20'
  )

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 bg-[#262626]" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 bg-[#262626]" />
            <Skeleton className="h-4 w-32 bg-[#262626]" />
          </div>
        </div>
        <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6">
          <Skeleton className="h-64 bg-[#262626]" />
        </div>
      </div>
    )
  }

  if (error || !contact || !formData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
          <p className="text-red-400">{error || 'Contact not found'}</p>
          <Link href="/admin/contacts">
            <Button
              variant="outline"
              className="mt-4 bg-transparent border-[#262626] text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/contacts">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1a]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{contact.name}</h1>
              <VipBadge isVip={contact.isVip} />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <CategoryBadge category={contact.category} size="sm" />
              {contact.company && (
                <span className="text-[#a1a1aa] text-sm">· {contact.company}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Send Notification Button */}
          <Link href={`/admin/notifications/compose?contactId=${contact.id}`}>
            <Button
              variant="outline"
              className="bg-transparent border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <Send className="w-4 h-4 mr-2" />
              알림 발송
            </Button>
          </Link>

          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="bg-transparent border-[#262626] text-white hover:bg-[#1a1a1a]"
              >
                취소
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-white text-black hover:bg-white/90"
              >
                {isSaving ? '저장 중...' : '저장'}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="bg-transparent border-[#262626] text-white hover:bg-[#1a1a1a]"
              >
                <Pencil className="w-4 h-4 mr-2" />
                수정
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                className="bg-transparent border-red-500/20 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                삭제
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">연락처 정보</h2>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#fafafa]">이름 (한글) *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fafafa]">이름 (영문)</Label>
                    <Input
                      value={formData.nameEn || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, nameEn: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fafafa]">카테고리</Label>
                    <Select
                      value={formData.categoryId || 'none'}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          categoryId: value === 'none' ? undefined : value,
                        })
                      }
                    >
                      <SelectTrigger className={inputClassName}>
                        <SelectValue placeholder="선택 안함" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#262626]">
                        <SelectItem value="none" className="text-white">
                          선택 안함
                        </SelectItem>
                        {categories.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            value={cat.id}
                            className="text-white"
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: cat.color }}
                              />
                              {cat.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fafafa] flex items-center gap-2">
                      <Crown className="w-4 h-4 text-[#D4AF37]" />
                      VIP
                    </Label>
                    <div className="flex items-center gap-3 h-10">
                      <Switch
                        checked={formData.isVip}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isVip: checked })
                        }
                        className="data-[state=checked]:bg-[#D4AF37]"
                      />
                      <span className="text-sm text-[#a1a1aa]">
                        {formData.isVip ? 'VIP 활성화' : 'VIP 비활성화'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fafafa]">이메일</Label>
                    <Input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fafafa]">전화번호</Label>
                    <Input
                      value={formData.phone || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fafafa]">휴대폰</Label>
                    <Input
                      value={formData.mobile || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fafafa]">회사</Label>
                    <Input
                      value={formData.company || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#fafafa]">직위</Label>
                    <Input
                      value={formData.position || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {contact.email && (
                  <div className="flex items-center gap-3 text-[#a1a1aa]">
                    <Mail className="w-4 h-4" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-white"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
                {(contact.phone || contact.mobile) && (
                  <div className="flex items-center gap-3 text-[#a1a1aa]">
                    <Phone className="w-4 h-4" />
                    <span>{contact.mobile || contact.phone}</span>
                  </div>
                )}
                {contact.company && (
                  <div className="flex items-center gap-3 text-[#a1a1aa]">
                    <Building2 className="w-4 h-4" />
                    <span>
                      {contact.company}
                      {contact.position && ` · ${contact.position}`}
                    </span>
                  </div>
                )}
                {(contact.address || contact.city) && (
                  <div className="flex items-center gap-3 text-[#a1a1aa]">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {[contact.address, contact.city, contact.country]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                메모
                <span className="text-sm font-normal text-[#52525b]">
                  ({notes.length})
                </span>
              </h2>
            </div>

            {/* Add Note Form */}
            <div className="space-y-3 p-4 rounded-lg bg-[#0a0a0a] border border-[#262626]">
              <div className="flex items-center gap-2">
                <Select
                  value={newNoteType}
                  onValueChange={(value) => setNewNoteType(value as NoteType)}
                >
                  <SelectTrigger className={cn(inputClassName, 'w-[140px]')}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#262626]">
                    {noteTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="text-white"
                      >
                        <span className="flex items-center gap-2">
                          <span>{type.icon}</span>
                          {type.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="새 메모 추가..."
                className={cn(inputClassName, 'min-h-[80px] resize-none')}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleAddNote}
                  disabled={isAddingNote || !newNote.trim()}
                  className="bg-white text-black hover:bg-white/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isAddingNote ? '추가 중...' : '메모 추가'}
                </Button>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-3">
              {notes.length === 0 ? (
                <p className="text-[#52525b] text-sm text-center py-8">
                  메모가 없습니다.
                </p>
              ) : (
                notes.map((note: Note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-lg bg-[#0a0a0a] border border-[#262626] group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="border-[#262626] text-[#a1a1aa]"
                        >
                          {noteTypes.find((t) => t.value === note.type)?.icon}{' '}
                          {noteTypes.find((t) => t.value === note.type)?.label ||
                            note.type}
                        </Badge>
                        {note.isPrivate && (
                          <Badge
                            variant="outline"
                            className="border-yellow-500/30 text-yellow-500"
                          >
                            비공개
                          </Badge>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#52525b] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-[#1a1a1a] border-[#262626]"
                        >
                          <DropdownMenuItem
                            className="text-red-400 hover:bg-[#262626] cursor-pointer"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-[#fafafa] whitespace-pre-wrap mb-3">
                      {note.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[#52525b]">
                      {note.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {note.author.fullName || note.author.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(note.createdAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div
            className={cn(
              'rounded-lg border p-6 space-y-4',
              contact.isVip
                ? 'bg-gradient-to-br from-[#1a1a1a] to-[#D4AF37]/10 border-[#D4AF37]/30'
                : 'bg-[#1a1a1a] border-[#262626]'
            )}
          >
            <h3 className="text-sm font-medium text-[#a1a1aa]">정보</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#52525b]">카테고리</span>
                <CategoryBadge category={contact.category} size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#52525b]">VIP</span>
                {contact.isVip ? (
                  <VipBadge isVip={contact.isVip} size="sm" />
                ) : (
                  <span className="text-[#52525b]">-</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-[#52525b]">언어</span>
                <span className="text-white">
                  {contact.preferredLanguage === 'ko' ? '한국어' : 'English'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#52525b]">뉴스레터</span>
                <span className="text-white">
                  {contact.newsletterSubscribed ? '구독 중' : '미구독'}
                </span>
              </div>
              {contact.source && (
                <div className="flex justify-between">
                  <span className="text-[#52525b]">유입 경로</span>
                  <span className="text-white">{contact.source}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#52525b]">등록일</span>
                <span className="text-white">
                  {new Date(contact.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-4">
            <h3 className="text-sm font-medium text-[#a1a1aa]">태그</h3>

            {contact.tags && contact.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    style={{ backgroundColor: tag.color + '20', color: tag.color }}
                    className="border-0"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-[#52525b] text-sm">태그가 없습니다.</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-6 space-y-3">
            <h3 className="text-sm font-medium text-[#a1a1aa]">빠른 작업</h3>

            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                이메일 보내기
              </a>
            )}
            {(contact.phone || contact.mobile) && (
              <a
                href={`tel:${contact.mobile || contact.phone}`}
                className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                전화 걸기
              </a>
            )}
            <Link
              href={`/admin/notifications/compose?contactId=${contact.id}`}
              className="flex items-center gap-2 text-sm text-[#D4AF37] hover:text-[#F5D67B] transition-colors"
            >
              <Send className="w-4 h-4" />
              알림 발송하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
