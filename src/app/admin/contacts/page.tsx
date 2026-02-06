'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  User,
  Phone,
  Mail,
  Building,
  Star,
  Eye,
  Users,
  Palette,
  Award,
  FileText,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import type { Contact, Category } from '@/types/admin'
import { isAbortError } from '@/hooks/useAbortableFetch'

// 카테고리 아이콘 매핑
const categoryIcons: Record<string, React.ElementType> = {
  '컬렉터': Star,
  '작가': Palette,
  '관훈아르떼': Building,
  '갤러리': Award,
  '학계': FileText,
  '옥션': ShoppingBag,
  '세무/컨설팅': FileText,
  '문화예술': Award,
}

export default function ContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showVIPOnly, setShowVIPOnly] = useState(false)

  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 20

  // Modal state
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Delete loading state - 더블 클릭 방지
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Fetch categories on mount with AbortController
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

  // AbortController ref for contacts fetch
  const contactsAbortRef = useRef<AbortController | null>(null)

  const fetchContacts = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      })

      if (searchTerm) params.set('search', searchTerm)
      if (selectedCategory && selectedCategory !== 'all') params.set('categoryId', selectedCategory)
      if (showVIPOnly) params.set('isVip', 'true')

      const res = await fetch(`/api/admin/contacts?${params}`, { signal })

      // Check if aborted
      if (signal?.aborted) return

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch contacts')
      }

      // Batch state updates - React 18 auto-batches these
      setContacts(data.data)
      setTotal(data.total)
      setTotalPages(data.totalPages)
    } catch (err) {
      // Ignore abort errors
      if (isAbortError(err)) return
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [page, searchTerm, selectedCategory, showVIPOnly])

  useEffect(() => {
    // Cancel previous request
    contactsAbortRef.current?.abort()
    const controller = new AbortController()
    contactsAbortRef.current = controller

    fetchContacts(controller.signal)

    return () => {
      controller.abort()
    }
  }, [fetchContacts])

  // 통계 계산
  const stats = useMemo(() => {
    return {
      total: total,
      vip: contacts.filter(c => c.isVip).length, // 현재 페이지 기준
      collectors: contacts.filter(c => c.category?.name === '컬렉터').length,
      artists: contacts.filter(c => c.category?.name === '작가').length,
    }
  }, [contacts, total])

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()

    // Prevent double-click
    if (deletingId) return

    if (!confirm('정말로 이 연락처를 삭제하시겠습니까?')) return

    setDeletingId(id)

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete contact')
      }

      // Create new AbortController for the refetch
      contactsAbortRef.current?.abort()
      const controller = new AbortController()
      contactsAbortRef.current = controller
      await fetchContacts(controller.signal)
    } catch (err) {
      if (!isAbortError(err)) {
        alert(err instanceof Error ? err.message : 'An error occurred')
      }
    } finally {
      setDeletingId(null)
    }
  }

  const handleView = (contact: Contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
  }


  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Page Header */}
      <div className="sticky top-0 z-40 px-6 py-4 mb-6 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">
              연락처 관리
            </h1>
            <p className="text-xs text-zinc-500 mt-0.5">
              Collector & Relations Management
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/contacts/new')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37] text-black text-sm font-medium hover:bg-[#C49B30] transition-colors"
          >
            <Plus size={16} />
            새 연락처 추가
          </button>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: '전체 연락처', value: stats.total, icon: Users },
            { label: 'VIP', value: stats.vip, icon: Star },
            { label: '컬렉터', value: stats.collectors, icon: Star },
            { label: '작가', value: stats.artists, icon: Palette },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 rounded-lg bg-zinc-900 border border-zinc-800"
            >
              <stat.icon size={20} className="flex-shrink-0 text-zinc-400" />
              <div>
                <div className="text-2xl font-semibold text-zinc-100">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 min-w-[300px] relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="text"
              placeholder="이름, 소속, 역할로 검색..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="w-full py-2.5 pl-10 pr-4 rounded-lg text-sm bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
          <button
            onClick={() => {
              setShowVIPOnly(!showVIPOnly)
              setPage(1)
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              showVIPOnly
                ? 'bg-[#D4AF37] text-black'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            <Star size={14} fill={showVIPOnly ? 'currentColor' : 'none'} />
            VIP Only
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-zinc-800">
          <button
            onClick={() => {
              setSelectedCategory('all')
              setPage(1)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === 'all'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-zinc-800/50'
            }`}
          >
            <Users size={14} />
            전체
          </button>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.name] || Users
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id)
                  setPage(1)
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${
                  isActive
                    ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                    : 'text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
              >
                <Icon size={14} />
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Contact List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-zinc-800 rounded" />
                    <div className="h-3 w-24 bg-zinc-800 rounded" />
                    <div className="h-3 w-40 bg-zinc-800 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">
            <p>{error}</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-20">
            <Users size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-zinc-400">검색 결과가 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleView(contact)}
                className="relative p-5 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer hover:bg-zinc-800/70 transition-colors"
              >
                {/* VIP Badge */}
                {contact.isVip && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#D4AF37] text-black">
                    VIP
                  </div>
                )}

                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-zinc-800">
                    <User size={18} className="text-zinc-400" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-zinc-100 mb-0.5">
                      {contact.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mb-0.5">
                      {contact.position || contact.category?.name || ''}
                    </p>
                    {contact.company && (
                      <p className="text-xs text-zinc-500 mb-2">
                        {contact.company}
                      </p>
                    )}

                    {/* Contact Info */}
                    <div className="text-xs space-y-1 text-zinc-500 mb-2">
                      {contact.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone size={11} />
                          {contact.phone}
                        </div>
                      )}
                      {contact.email && (
                        <div className="flex items-center gap-1.5">
                          <Mail size={11} />
                          {contact.email}
                        </div>
                      )}
                    </div>

                    {/* Category Badge */}
                    {contact.category && (
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] bg-zinc-800 text-zinc-400">
                        {contact.category.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-zinc-800">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleView(contact)
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                  >
                    <Eye size={13} />
                    상세보기
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/admin/contacts/${contact.id}?edit=true`)
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                  >
                    <Edit2 size={13} />
                    수정
                  </button>
                  <button
                    onClick={(e) => handleDelete(contact.id, e)}
                    disabled={deletingId === contact.id}
                    className="flex items-center justify-center px-3 py-1.5 rounded text-xs text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors disabled:opacity-50"
                  >
                    {deletingId === contact.id ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Trash2 size={13} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
            <p className="text-sm text-zinc-500">
              {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} / {total}
            </p>
            <div className="flex items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm px-3 text-zinc-400">
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Contact Detail Modal */}
      {isModalOpen && selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-xl p-6 bg-zinc-900 border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-zinc-800">
                <User size={24} className="text-zinc-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                  {selectedContact.name}
                  {selectedContact.isVip && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#D4AF37] text-black">
                      VIP
                    </span>
                  )}
                </h3>
                <p className="text-sm text-zinc-400">{selectedContact.position}</p>
                {selectedContact.company && (
                  <p className="text-xs text-zinc-500">{selectedContact.company}</p>
                )}
              </div>
            </div>

            {/* Contact Info Box */}
            <div className="p-4 rounded-lg mb-4 space-y-3 bg-zinc-800/50">
              {selectedContact.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-zinc-500" />
                  <span className="text-sm text-zinc-200">{selectedContact.phone}</span>
                </div>
              )}
              {selectedContact.email && (
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-zinc-500" />
                  <span className="text-sm text-zinc-200">{selectedContact.email}</span>
                </div>
              )}
              {selectedContact.company && (
                <div className="flex items-center gap-3">
                  <Building size={16} className="text-zinc-500" />
                  <span className="text-sm text-zinc-200">{selectedContact.company}</span>
                </div>
              )}
            </div>

            {/* Category */}
            {selectedContact.category && (
              <div className="mb-4">
                <h4 className="text-xs text-zinc-500 mb-1.5">카테고리</h4>
                <span className="inline-block px-3 py-1 rounded text-sm bg-zinc-800 text-zinc-300">
                  {selectedContact.category.name}
                </span>
              </div>
            )}

            {/* Notes */}
            {selectedContact.notes && (
              <div className="mb-4">
                <h4 className="text-xs text-zinc-500 mb-1.5">메모</h4>
                <p className="p-3 rounded-lg text-sm leading-relaxed bg-zinc-800/50 text-zinc-300">
                  {selectedContact.notes}
                </p>
              </div>
            )}

            {/* Edit Button */}
            <button
              onClick={() => {
                setIsModalOpen(false)
                router.push(`/admin/contacts/${selectedContact.id}?edit=true`)
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium mt-5 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              <Edit2 size={15} />
              수정하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
