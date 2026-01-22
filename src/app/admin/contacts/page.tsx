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

  const getCategoryColor = (category: Category | undefined) => {
    return category?.color || '#D4AF37'
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      }}
    >
      {/* Page Header */}
      <div
        className="sticky top-0 z-40 px-6 py-6 mb-8"
        style={{
          background: 'linear-gradient(90deg, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0.9) 50%, rgba(212,175,55,0.1) 100%)',
          borderBottom: '1px solid rgba(212,175,55,0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div>
            <h1
              className="text-2xl font-light tracking-[6px] mb-1"
              style={{ color: '#D4AF37', fontFamily: "'Playfair Display', serif" }}
            >
              연락처 관리
            </h1>
            <p
              className="text-xs tracking-[2px] uppercase"
              style={{ color: 'rgba(212,175,55,0.7)' }}
            >
              Collector & Relations Management
            </p>
          </div>
          <button
            onClick={() => router.push('/admin/contacts/new')}
            className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
              color: '#0a0a0a',
              boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
            }}
          >
            <Plus size={18} />
            새 연락처 추가
          </button>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {[
            { label: '전체 연락처', value: stats.total, color: '#D4AF37' },
            { label: 'VIP', value: stats.vip, color: '#FFD700' },
            { label: '컬렉터', value: stats.collectors, color: '#E91E63' },
            { label: '작가', value: stats.artists, color: '#9C27B0' },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-lg transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              <div
                className="text-4xl font-light mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs tracking-[1px]"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 min-w-[300px] relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(212,175,55,0.5)' }}
            />
            <input
              type="text"
              placeholder="이름, 소속, 역할로 검색..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="w-full py-3.5 pl-12 pr-4 rounded-lg text-sm outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(212,175,55,0.2)',
                color: '#f0f0f0',
              }}
            />
          </div>
          <button
            onClick={() => {
              setShowVIPOnly(!showVIPOnly)
              setPage(1)
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-lg font-medium text-sm transition-all"
            style={{
              background: showVIPOnly
                ? 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)'
                : 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212,175,55,0.3)',
              color: showVIPOnly ? '#0a0a0a' : '#D4AF37',
            }}
          >
            <Star size={16} fill={showVIPOnly ? '#0a0a0a' : 'none'} />
            VIP Only
          </button>
        </div>

        {/* Category Tabs */}
        <div
          className="flex flex-wrap gap-2 mb-8 pb-4"
          style={{ borderBottom: '1px solid rgba(212,175,55,0.1)' }}
        >
          <button
            onClick={() => {
              setSelectedCategory('all')
              setPage(1)
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all"
            style={{
              background: selectedCategory === 'all'
                ? 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.1) 100%)'
                : 'transparent',
              border: `1px solid ${selectedCategory === 'all' ? '#D4AF37' : 'rgba(255,255,255,0.1)'}`,
              color: selectedCategory === 'all' ? '#D4AF37' : 'rgba(255,255,255,0.6)',
            }}
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
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${cat.color}22 0%, ${cat.color}11 100%)`
                    : 'transparent',
                  border: `1px solid ${isActive ? cat.color : 'rgba(255,255,255,0.1)'}`,
                  color: isActive ? cat.color : 'rgba(255,255,255,0.6)',
                }}
              >
                <Icon size={14} />
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Contact List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-xl animate-pulse"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#262626]" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-32 bg-[#262626] rounded" />
                    <div className="h-4 w-24 bg-[#262626] rounded" />
                    <div className="h-3 w-40 bg-[#262626] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            className="text-center py-20"
            style={{ color: '#ef4444' }}
          >
            <p>{error}</p>
          </div>
        ) : contacts.length === 0 ? (
          <div
            className="text-center py-20"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <Users size={48} className="mx-auto mb-4 opacity-30" />
            <p>검색 결과가 없습니다</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleView(contact)}
                className="relative p-6 rounded-xl cursor-pointer transition-all hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: `1px solid ${contact.isVip ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                {/* VIP Badge */}
                {contact.isVip && (
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[1px]"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                      color: '#0a0a0a',
                    }}
                  >
                    VIP
                  </div>
                )}

                <div className="flex gap-4">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${getCategoryColor(contact.category)}33 0%, ${getCategoryColor(contact.category)}11 100%)`,
                      border: `1px solid ${getCategoryColor(contact.category)}44`,
                    }}
                  >
                    <User size={24} color={getCategoryColor(contact.category)} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-[#f0f0f0] mb-1">
                      {contact.name}
                    </h3>
                    <p
                      className="text-sm mb-0.5"
                      style={{ color: 'rgba(212,175,55,0.8)' }}
                    >
                      {contact.position || contact.category?.name || ''}
                    </p>
                    {contact.company && (
                      <p
                        className="text-xs mb-3"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                      >
                        {contact.company}
                      </p>
                    )}

                    {/* Contact Info */}
                    <div className="text-xs space-y-1 mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      {contact.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} />
                          {contact.phone}
                        </div>
                      )}
                      {contact.email && (
                        <div className="flex items-center gap-1.5">
                          <Mail size={12} />
                          {contact.email}
                        </div>
                      )}
                    </div>

                    {/* Category Badge */}
                    {contact.category && (
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-[11px]"
                        style={{
                          background: 'rgba(212,175,55,0.15)',
                          color: 'rgba(212,175,55,0.9)',
                        }}
                      >
                        {contact.category.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="flex gap-2 mt-4 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleView(contact)
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <Eye size={14} />
                    상세보기
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/admin/contacts/${contact.id}?edit=true`)
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs transition-all"
                    style={{
                      background: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      color: '#D4AF37',
                    }}
                  >
                    <Edit2 size={14} />
                    수정
                  </button>
                  <button
                    onClick={(e) => handleDelete(contact.id, e)}
                    disabled={deletingId === contact.id}
                    className="flex items-center justify-center px-3 py-2 rounded-md text-xs transition-all disabled:opacity-50"
                    style={{
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: '#ef4444',
                    }}
                  >
                    {deletingId === contact.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} / {total}
            </p>
            <div className="flex items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="p-2 rounded-lg transition-all disabled:opacity-30"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  color: '#D4AF37',
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm px-3" style={{ color: 'rgba(212,175,55,0.8)' }}>
                {page} / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="p-2 rounded-lg transition-all disabled:opacity-30"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  color: '#D4AF37',
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Contact Detail Modal */}
      {isModalOpen && selectedContact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl p-8"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%)',
              border: '1px solid rgba(212,175,55,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-5 mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${getCategoryColor(selectedContact.category)}33 0%, ${getCategoryColor(selectedContact.category)}11 100%)`,
                  border: `2px solid ${getCategoryColor(selectedContact.category)}44`,
                }}
              >
                <User size={36} color={getCategoryColor(selectedContact.category)} />
              </div>
              <div>
                <h3 className="text-2xl font-normal text-[#f0f0f0] mb-1 flex items-center gap-3">
                  {selectedContact.name}
                  {selectedContact.isVip && (
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                        color: '#0a0a0a',
                      }}
                    >
                      VIP
                    </span>
                  )}
                </h3>
                <p style={{ color: 'rgba(212,175,55,0.8)' }}>{selectedContact.position}</p>
                {selectedContact.company && (
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {selectedContact.company}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Info Box */}
            <div
              className="p-5 rounded-xl mb-5 space-y-4"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {selectedContact.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={18} color="#D4AF37" />
                  <span className="text-[#f0f0f0]">{selectedContact.phone}</span>
                </div>
              )}
              {selectedContact.email && (
                <div className="flex items-center gap-3">
                  <Mail size={18} color="#D4AF37" />
                  <span className="text-[#f0f0f0]">{selectedContact.email}</span>
                </div>
              )}
              {selectedContact.company && (
                <div className="flex items-center gap-3">
                  <Building size={18} color="#D4AF37" />
                  <span className="text-[#f0f0f0]">{selectedContact.company}</span>
                </div>
              )}
            </div>

            {/* Category */}
            {selectedContact.category && (
              <div className="mb-5">
                <h4 className="text-xs mb-2" style={{ color: 'rgba(212,175,55,0.7)' }}>
                  카테고리
                </h4>
                <span
                  className="inline-block px-4 py-2 rounded-full text-sm"
                  style={{
                    background: 'rgba(212,175,55,0.15)',
                    color: 'rgba(212,175,55,0.9)',
                  }}
                >
                  {selectedContact.category.name}
                </span>
              </div>
            )}

            {/* Notes */}
            {selectedContact.notes && (
              <div className="mb-5">
                <h4 className="text-xs mb-2" style={{ color: 'rgba(212,175,55,0.7)' }}>
                  메모
                </h4>
                <p
                  className="p-4 rounded-lg text-sm leading-relaxed"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
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
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-medium text-sm mt-6 transition-all"
              style={{
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#D4AF37',
              }}
            >
              <Edit2 size={16} />
              수정하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
