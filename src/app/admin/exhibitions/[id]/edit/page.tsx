'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { ImageUploader } from '@/components/features/admin/exhibitions/ImageUploader'

export default function EditExhibitionPage() {
  const params = useParams()
  const router = useRouter()
  const exhibitionId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    slug: '',
    title_ko: '',
    title_en: '',
    artist_name_ko: '',
    artist_name_en: '',
    status: 'upcoming',
    start_date: '',
    end_date: '',
    location_ko: '관훈아르떼',
    location_en: 'KWANHOON ARTE',
    description_ko: '',
    description_en: '',
    poster_image: '',
    images: [] as string[],
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/admin/exhibitions/${exhibitionId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          const ex = data.data
          setForm({
            slug: ex.slug || '',
            title_ko: ex.title_ko || '',
            title_en: ex.title_en || '',
            artist_name_ko: ex.artist_name_ko || '',
            artist_name_en: ex.artist_name_en || '',
            status: ex.status || 'upcoming',
            start_date: ex.start_date || '',
            end_date: ex.end_date || '',
            location_ko: ex.location_ko || '관훈아르떼',
            location_en: ex.location_en || 'KWANHOON ARTE',
            description_ko: ex.description_ko || '',
            description_en: ex.description_en || '',
            poster_image: ex.poster_image || '',
            images: ex.images || [],
          })
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError('전시 정보를 불러오는데 실패했습니다.')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [exhibitionId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/exhibitions/${exhibitionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: form.slug,
          title_ko: form.title_ko,
          title_en: form.title_en || null,
          artist_name_ko: form.artist_name_ko || null,
          artist_name_en: form.artist_name_en || null,
          status: form.status,
          start_date: form.start_date,
          end_date: form.end_date,
          location_ko: form.location_ko,
          location_en: form.location_en,
          description_ko: form.description_ko || null,
          description_en: form.description_en || null,
          poster_image: form.poster_image || null,
          images: form.images,
        }),
      })

      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        router.push('/admin/exhibitions')
      }
    } catch {
      setError('전시 수정에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-zinc-400">불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/exhibitions"
          className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 text-sm mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          전시 목록
        </Link>
        <h1 className="text-lg font-semibold text-zinc-100">전시 수정</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-4">
          <h2 className="text-zinc-100 font-medium mb-2">기본 정보</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">
                제목 (한국어) <span className="text-red-400">*</span>
              </label>
              <input
                name="title_ko"
                value={form.title_ko}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">
                제목 (영어)
              </label>
              <input
                name="title_en"
                value={form.title_en}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">
              URL Slug <span className="text-red-400">*</span>
            </label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600 font-mono"
            />
            <p className="text-xs text-zinc-500 mt-1">
              URL에 사용됩니다: /exhibition/{form.slug || 'slug'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">작가명 (한국어)</label>
              <input
                name="artist_name_ko"
                value={form.artist_name_ko}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">작가명 (영어)</label>
              <input
                name="artist_name_en"
                value={form.artist_name_en}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </div>

        {/* 상태 및 기간 */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-4">
          <h2 className="text-zinc-100 font-medium mb-2">상태 및 기간</h2>

          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">상태</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
            >
              <option value="upcoming">예정</option>
              <option value="current">진행 중</option>
              <option value="past">종료</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">
                시작일 <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">
                종료일 <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </div>

        {/* 장소 */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-4">
          <h2 className="text-zinc-100 font-medium mb-2">장소</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">장소 (한국어)</label>
              <input
                name="location_ko"
                value={form.location_ko}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">장소 (영어)</label>
              <input
                name="location_en"
                value={form.location_en}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-4">
          <h2 className="text-zinc-100 font-medium mb-2">설명</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">설명 (한국어)</label>
              <textarea
                name="description_ko"
                value={form.description_ko}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">설명 (영어)</label>
              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600 resize-none"
              />
            </div>
          </div>
        </div>

        {/* 이미지 */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 space-y-6">
          <h2 className="text-zinc-100 font-medium mb-2">이미지</h2>

          <ImageUploader
            mode="single"
            value={form.poster_image}
            onChange={(url) => setForm(prev => ({ ...prev, poster_image: url as string }))}
            slug={form.slug}
            type="poster"
            label="포스터 이미지"
            hint="전시 대표 이미지를 업로드하세요. (최대 10MB, JPEG/PNG/WebP)"
          />

          <ImageUploader
            mode="multiple"
            value={form.images}
            onChange={(urls) => setForm(prev => ({ ...prev, images: urls as string[] }))}
            slug={form.slug}
            type="gallery"
            maxFiles={15}
            label="전시 전경 이미지"
            hint="전시장 전경 사진을 업로드하세요. (최대 15장, 각 10MB)"
          />
        </div>

        {/* Error & Submit */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D4AF37] text-black rounded-lg font-medium text-sm hover:bg-[#C49B30] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? '저장 중...' : '수정 완료'}
          </button>
        </div>
      </form>
    </div>
  )
}
