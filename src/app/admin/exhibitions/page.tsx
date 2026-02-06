'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Image as ImageIcon,
  Calendar,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExhibitionRow {
  id: string
  slug: string
  title_ko: string
  title_en: string | null
  artist_name_ko: string | null
  status: string
  start_date: string
  end_date: string
  poster_image: string | null
}

type FilterStatus = 'all' | 'current' | 'upcoming' | 'past'

export default function AdminExhibitionsPage() {
  const router = useRouter()
  const [exhibitions, setExhibitions] = useState<ExhibitionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)

    fetch('/api/admin/exhibitions', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setExhibitions(data.data || [])
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError('전시 목록을 불러오는데 실패했습니다.')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 전시를 삭제하시겠습니까?`)) return
    if (deletingId) return

    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/exhibitions/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setExhibitions(prev => prev.filter(ex => ex.id !== id))
      }
    } catch {
      alert('삭제에 실패했습니다.')
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = filter === 'all'
    ? exhibitions
    : exhibitions.filter(ex => ex.status === filter)

  const statusLabel = (status: string) => {
    switch (status) {
      case 'current': return '진행 중'
      case 'upcoming': return '예정'
      case 'past': return '종료'
      default: return status
    }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-500/10 text-green-400'
      case 'upcoming': return 'bg-blue-500/10 text-blue-400'
      case 'past': return 'bg-gray-500/10 text-gray-400'
      default: return 'bg-gray-500/10 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">전시 관리</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            전시를 등록하고 관리합니다.
          </p>
        </div>
        <Link
          href="/admin/exhibitions/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-lg font-medium text-sm hover:bg-[#C49B30] transition-colors"
        >
          <Plus className="w-4 h-4" />
          새 전시 등록
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {([
          { id: 'all', label: '전체' },
          { id: 'current', label: '진행 중' },
          { id: 'upcoming', label: '예정' },
          { id: 'past', label: '종료' },
        ] as { id: FilterStatus; label: string }[]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm transition-colors',
              filter === tab.id
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Exhibition List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-zinc-400">불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ImageIcon className="w-10 h-10 text-zinc-700 mb-4" />
            <p className="text-zinc-400 mb-1">등록된 전시가 없습니다</p>
            <p className="text-sm text-zinc-500">
              &quot;새 전시 등록&quot; 버튼을 눌러 전시를 추가하세요.
            </p>
          </div>
        ) : (
          filtered.map(exhibition => (
            <div
              key={exhibition.id}
              className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex items-center gap-4 hover:bg-zinc-800/70 transition-colors"
            >
              <ImageIcon className="w-5 h-5 text-zinc-500 flex-shrink-0" />
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => router.push(`/admin/exhibitions/${exhibition.id}/edit`)}
              >
                <p className="text-zinc-100 font-medium truncate">
                  {exhibition.title_ko}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  {exhibition.artist_name_ko && (
                    <span className="text-xs text-zinc-400">
                      {exhibition.artist_name_ko}
                    </span>
                  )}
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exhibition.start_date} ~ {exhibition.end_date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={cn(
                  'px-2 py-0.5 rounded text-xs',
                  statusColor(exhibition.status)
                )}>
                  {statusLabel(exhibition.status)}
                </span>
                <button
                  onClick={() => handleDelete(exhibition.id, exhibition.title_ko)}
                  disabled={deletingId === exhibition.id}
                  className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
