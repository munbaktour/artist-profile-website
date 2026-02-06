'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  Star,
  Camera,
  Upload,
  X,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react'
import type { Category } from '@/types/admin'
import { isAbortError } from '@/hooks/useAbortableFetch'

interface ExtractedContact {
  name?: string
  nameEn?: string
  email?: string
  phone?: string
  mobile?: string
  company?: string
  position?: string
  address?: string
  city?: string
  country?: string
  postalCode?: string
}

export default function NewContactPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Business card scan state
  const [showScanModal, setShowScanModal] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanError, setScanError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<ExtractedContact | null>(null)
  const [scanEngine, setScanEngine] = useState<'ai' | 'ocr'>('ocr') // 'ai' = Claude, 'ocr' = Naver CLOVA OCR

  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    email: '',
    phone: '',
    mobile: '',
    company: '',
    position: '',
    address: '',
    city: '',
    country: '대한민국',
    postalCode: '',
    categoryId: '',
    isVip: false,
    preferredLanguage: 'ko',
    newsletterSubscribed: false,
    source: '',
    notes: '',
  })

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
          // Set default category - Use functional update to avoid stale closure
          setFormData((prev) => {
            if (data.length > 0 && !prev.categoryId) {
              return { ...prev, categoryId: data[0].id }
            }
            return prev
          })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create contact')
      }

      router.push('/admin/contacts')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  // AbortController ref for business card scan
  const scanAbortRef = useRef<AbortController | null>(null)

  // Cleanup scan on unmount
  useEffect(() => {
    return () => {
      scanAbortRef.current?.abort()
    }
  }, [])

  // Handle file selection with AbortController
  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setScanError('이미지 파일만 업로드 가능합니다.')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Abort previous scan if in progress
    scanAbortRef.current?.abort()
    const controller = new AbortController()
    scanAbortRef.current = controller

    // Scan the image
    setIsScanning(true)
    setScanError(null)
    setExtractedData(null)

    try {
      const formDataPayload = new FormData()
      formDataPayload.append('image', file)

      // Select API endpoint based on scan engine
      const endpoint = scanEngine === 'ocr'
        ? '/api/admin/scan-business-card-ocr'
        : '/api/admin/scan-business-card'

      const res = await fetch(endpoint, {
        method: 'POST',
        body: formDataPayload,
        signal: controller.signal,
      })

      if (controller.signal.aborted) return

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to scan business card')
      }

      setExtractedData(data.data)
    } catch (err) {
      if (isAbortError(err)) return
      setScanError(err instanceof Error ? err.message : '명함 스캔 중 오류가 발생했습니다.')
    } finally {
      setIsScanning(false)
    }
  }

  // Apply extracted data to form
  const applyExtractedData = () => {
    if (!extractedData) return

    setFormData(prev => ({
      ...prev,
      name: extractedData.name || prev.name,
      nameEn: extractedData.nameEn || prev.nameEn,
      email: extractedData.email || prev.email,
      phone: extractedData.phone || prev.phone,
      mobile: extractedData.mobile || prev.mobile,
      company: extractedData.company || prev.company,
      position: extractedData.position || prev.position,
      address: extractedData.address || prev.address,
      city: extractedData.city || prev.city,
      country: extractedData.country || prev.country,
      postalCode: extractedData.postalCode || prev.postalCode,
    }))

    // Close modal and reset
    setShowScanModal(false)
    setPreviewImage(null)
    setExtractedData(null)
  }

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Reset scan modal
  const resetScanModal = () => {
    setShowScanModal(false)
    setPreviewImage(null)
    setExtractedData(null)
    setScanError(null)
    setIsScanning(false)
  }

  const inputClassName = 'w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm outline-none focus:border-zinc-600 placeholder:text-zinc-600 transition-colors'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/contacts"
          className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 text-sm mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          연락처 목록
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-100">새 연락처</h1>
          <button
            type="button"
            onClick={() => setShowScanModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <Camera size={16} />
            명함 스캔
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <User size={16} className="text-zinc-400" />
            <h2 className="text-sm font-medium text-zinc-100">기본 정보</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">
                이름 (한글) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="홍길동"
                required
                className={inputClassName}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">이름 (영문)</label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="Hong Gildong"
                className={inputClassName}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">
                카테고리 <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
                className={inputClassName}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">VIP 지정</label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isVip: !formData.isVip })}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  formData.isVip
                    ? 'bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37]'
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-500'
                }`}
              >
                <Star size={16} fill={formData.isVip ? '#D4AF37' : 'none'} />
                {formData.isVip ? 'VIP 활성화됨' : 'VIP 아님'}
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-zinc-400" />
            <h2 className="text-sm font-medium text-zinc-100">연락처 정보</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">이메일</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className={`${inputClassName} pl-9`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">휴대폰</label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="010-1234-5678"
                className={inputClassName}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">전화번호</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="02-1234-5678"
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* Organization */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Building size={16} className="text-zinc-400" />
            <h2 className="text-sm font-medium text-zinc-100">소속 정보</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">회사/소속</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="회사명 또는 소속"
                className={inputClassName}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">직위/역할</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="대표, 큐레이터, 교수 등"
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-zinc-400" />
            <h2 className="text-sm font-medium text-zinc-100">주소</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs text-zinc-400">주소</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="상세 주소"
                className={inputClassName}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs text-zinc-400">도시</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="서울"
                  className={inputClassName}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs text-zinc-400">국가</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="대한민국"
                  className={inputClassName}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs text-zinc-400">우편번호</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="12345"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5 space-y-4">
          <h2 className="text-sm font-medium text-zinc-100">메모</h2>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="연락처에 대한 메모를 입력하세요..."
            rows={4}
            className={`${inputClassName} resize-none`}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
          <Link
            href="/admin/contacts"
            className="px-4 py-2 rounded-lg text-sm text-zinc-400 border border-zinc-800 hover:bg-zinc-800 transition-colors"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2 bg-[#D4AF37] text-black rounded-lg font-medium text-sm hover:bg-[#C49B30] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                저장 중...
              </>
            ) : (
              <>
                <Save size={16} />
                저장
              </>
            )}
          </button>
        </div>
      </form>

      {/* Business Card Scan Modal */}
      {showScanModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetScanModal()
          }}
        >
          <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-zinc-400" />
                <div>
                  <h3 className="text-sm font-medium text-zinc-100">명함 스캔</h3>
                  <p className="text-xs text-zinc-500">
                    AI가 명함을 분석하여 정보를 추출합니다
                  </p>
                </div>
              </div>
              <button
                onClick={resetScanModal}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-5">
              {/* Scan Engine Selection */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setScanEngine('ocr')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm transition-colors ${
                    scanEngine === 'ocr'
                      ? 'bg-zinc-800 border border-zinc-700 text-zinc-100'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-500'
                  }`}
                >
                  <span className="text-lg">🇰🇷</span>
                  <div className="text-left">
                    <div className="font-medium">CLOVA OCR</div>
                    <div className="text-xs opacity-70">네이버 명함 인식</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setScanEngine('ai')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm transition-colors ${
                    scanEngine === 'ai'
                      ? 'bg-zinc-800 border border-zinc-700 text-zinc-100'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-500'
                  }`}
                >
                  <Sparkles size={16} />
                  <div className="text-left">
                    <div className="font-medium">AI 분석</div>
                    <div className="text-xs opacity-70">Claude Vision</div>
                  </div>
                </button>
              </div>

              {/* Upload Area */}
              {!previewImage && (
                <div
                  className="relative rounded-lg p-8 text-center cursor-pointer bg-zinc-950 border-2 border-dashed border-zinc-700 hover:border-zinc-600 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileSelect(file)
                    }}
                  />
                  <Upload size={40} className="mx-auto mb-3 text-zinc-600" />
                  <p className="text-sm text-zinc-300 mb-1">
                    명함 이미지를 드래그하거나 클릭하여 업로드
                  </p>
                  <p className="text-xs text-zinc-500">
                    JPG, PNG, WebP 지원 (최대 10MB)
                  </p>
                </div>
              )}

              {/* Preview Image */}
              {previewImage && (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-zinc-800">
                    <img
                      src={previewImage}
                      alt="Business card preview"
                      className="w-full h-auto max-h-64 object-contain bg-black"
                    />
                    {isScanning && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
                        <Loader2 className="animate-spin h-8 w-8 mb-3 text-[#D4AF37]" />
                        <p className="text-sm text-[#D4AF37]">
                          {scanEngine === 'ocr' ? 'CLOVA OCR로 명함 인식 중...' : 'AI가 명함을 분석 중...'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {scanError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-sm text-red-400">{scanError}</p>
                    </div>
                  )}

                  {/* Extracted Data Preview */}
                  {extractedData && (
                    <div className="rounded-lg p-4 space-y-3 bg-green-500/5 border border-green-500/20">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        <span className="text-sm font-medium text-green-400">
                          정보 추출 완료
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {extractedData.name && (
                          <div>
                            <span className="text-zinc-500">이름: </span>
                            <span className="text-zinc-200">{extractedData.name}</span>
                          </div>
                        )}
                        {extractedData.company && (
                          <div>
                            <span className="text-zinc-500">회사: </span>
                            <span className="text-zinc-200">{extractedData.company}</span>
                          </div>
                        )}
                        {extractedData.position && (
                          <div>
                            <span className="text-zinc-500">직위: </span>
                            <span className="text-zinc-200">{extractedData.position}</span>
                          </div>
                        )}
                        {extractedData.email && (
                          <div>
                            <span className="text-zinc-500">이메일: </span>
                            <span className="text-zinc-200">{extractedData.email}</span>
                          </div>
                        )}
                        {extractedData.mobile && (
                          <div>
                            <span className="text-zinc-500">휴대폰: </span>
                            <span className="text-zinc-200">{extractedData.mobile}</span>
                          </div>
                        )}
                        {extractedData.phone && (
                          <div>
                            <span className="text-zinc-500">전화: </span>
                            <span className="text-zinc-200">{extractedData.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-zinc-800">
              {previewImage && !isScanning && (
                <button
                  onClick={() => {
                    setPreviewImage(null)
                    setExtractedData(null)
                    setScanError(null)
                  }}
                  className="px-4 py-2 rounded-lg text-sm text-zinc-400 border border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  다시 업로드
                </button>
              )}
              {extractedData && (
                <button
                  onClick={applyExtractedData}
                  className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-lg font-medium text-sm hover:bg-[#C49B30] transition-colors"
                >
                  <Check size={16} />
                  폼에 적용
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
