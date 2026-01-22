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

  const inputStyle = {
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(212,175,55,0.2)',
    color: '#f0f0f0',
  }

  const labelStyle = {
    color: 'rgba(212,175,55,0.8)',
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div
        className="sticky top-0 z-40 px-6 py-6 mb-8"
        style={{
          background: 'linear-gradient(90deg, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0.9) 50%, rgba(212,175,55,0.1) 100%)',
          borderBottom: '1px solid rgba(212,175,55,0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/contacts"
              className="p-2 rounded-lg transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(212,175,55,0.2)',
                color: '#D4AF37',
              }}
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1
                className="text-2xl font-light tracking-[6px] mb-1"
                style={{ color: '#D4AF37', fontFamily: "'Playfair Display', serif" }}
              >
                새 연락처
              </h1>
              <p
                className="text-xs tracking-[2px] uppercase"
                style={{ color: 'rgba(212,175,55,0.7)' }}
              >
                Add New Contact
              </p>
            </div>
          </div>

          {/* Business Card Scan Button */}
          <button
            type="button"
            onClick={() => setShowScanModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.1) 100%)',
              border: '1px solid rgba(212,175,55,0.5)',
              color: '#D4AF37',
            }}
          >
            <Camera size={18} />
            명함 스캔
          </button>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 pb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div
              className="p-4 rounded-lg"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
              }}
            >
              <p className="text-sm" style={{ color: '#ef4444' }}>{error}</p>
            </div>
          )}

          {/* Basic Info */}
          <div
            className="rounded-xl p-6 space-y-5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <User size={18} style={{ color: '#D4AF37' }} />
              <h2 className="text-lg font-light text-[#f0f0f0]">기본 정보</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  이름 (한글) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="홍길동"
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  이름 (영문)
                </label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="Hong Gildong"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  카테고리 <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} style={{ background: '#1a1a1a' }}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  VIP 지정
                </label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isVip: !formData.isVip })}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all"
                  style={{
                    background: formData.isVip ? 'rgba(212,175,55,0.15)' : 'rgba(0,0,0,0.3)',
                    border: `1px solid ${formData.isVip ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
                    color: formData.isVip ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  <Star size={18} fill={formData.isVip ? '#D4AF37' : 'none'} />
                  {formData.isVip ? 'VIP 활성화됨' : 'VIP 아님'}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div
            className="rounded-xl p-6 space-y-5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Phone size={18} style={{ color: '#D4AF37' }} />
              <h2 className="text-lg font-light text-[#f0f0f0]">연락처 정보</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  이메일
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: 'rgba(212,175,55,0.4)' }}
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-lg text-sm outline-none transition-all"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  휴대폰
                </label>
                <input
                  type="text"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  전화번호
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="02-1234-5678"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Organization */}
          <div
            className="rounded-xl p-6 space-y-5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Building size={18} style={{ color: '#D4AF37' }} />
              <h2 className="text-lg font-light text-[#f0f0f0]">소속 정보</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  회사/소속
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="회사명 또는 소속"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  직위/역할
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="대표, 큐레이터, 교수 등"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div
            className="rounded-xl p-6 space-y-5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} style={{ color: '#D4AF37' }} />
              <h2 className="text-lg font-light text-[#f0f0f0]">주소</h2>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs tracking-[1px]" style={labelStyle}>
                  주소
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="상세 주소"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={inputStyle}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="block text-xs tracking-[1px]" style={labelStyle}>
                    도시
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="서울"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                    style={inputStyle}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs tracking-[1px]" style={labelStyle}>
                    국가
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="대한민국"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                    style={inputStyle}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs tracking-[1px]" style={labelStyle}>
                    우편번호
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="12345"
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div
            className="rounded-xl p-6 space-y-5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <h2 className="text-lg font-light text-[#f0f0f0]">메모</h2>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="연락처에 대한 메모를 입력하세요..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none"
              style={inputStyle}
            />
          </div>

          {/* Actions */}
          <div
            className="flex items-center justify-end gap-4 pt-4"
            style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}
          >
            <Link
              href="/admin/contacts"
              className="px-6 py-3 rounded-lg text-sm transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                color: '#0a0a0a',
                boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
              }}
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
      </main>

      {/* Business Card Scan Modal */}
      {showScanModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) resetScanModal()
          }}
        >
          <div
            className="w-full max-w-xl rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #1a1a2e 0%, #0a0a0a 100%)',
              border: '1px solid rgba(212,175,55,0.3)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: 'rgba(212,175,55,0.1)' }}
                >
                  <Sparkles size={20} style={{ color: '#D4AF37' }} />
                </div>
                <div>
                  <h3 className="text-lg font-light text-[#f0f0f0]">명함 스캔</h3>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    AI가 명함을 분석하여 정보를 추출합니다
                  </p>
                </div>
              </div>
              <button
                onClick={resetScanModal}
                className="p-2 rounded-lg transition-all hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Scan Engine Selection */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setScanEngine('ocr')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm transition-all"
                  style={{
                    background: scanEngine === 'ocr' ? 'rgba(212,175,55,0.15)' : 'rgba(0,0,0,0.3)',
                    border: `1px solid ${scanEngine === 'ocr' ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
                    color: scanEngine === 'ocr' ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                  }}
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
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm transition-all"
                  style={{
                    background: scanEngine === 'ai' ? 'rgba(212,175,55,0.15)' : 'rgba(0,0,0,0.3)',
                    border: `1px solid ${scanEngine === 'ai' ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
                    color: scanEngine === 'ai' ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  <Sparkles size={18} />
                  <div className="text-left">
                    <div className="font-medium">AI 분석</div>
                    <div className="text-xs opacity-70">Claude Vision</div>
                  </div>
                </button>
              </div>

              {/* Upload Area */}
              {!previewImage && (
                <div
                  className="relative rounded-xl p-8 text-center cursor-pointer transition-all hover:border-[#D4AF37]"
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '2px dashed rgba(212,175,55,0.3)',
                  }}
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
                  <Upload size={48} className="mx-auto mb-4" style={{ color: 'rgba(212,175,55,0.5)' }} />
                  <p className="text-sm mb-2" style={{ color: '#f0f0f0' }}>
                    명함 이미지를 드래그하거나 클릭하여 업로드
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    JPG, PNG, WebP 지원 (최대 10MB)
                  </p>
                </div>
              )}

              {/* Preview Image */}
              {previewImage && (
                <div className="space-y-4">
                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{ border: '1px solid rgba(212,175,55,0.2)' }}
                  >
                    <img
                      src={previewImage}
                      alt="Business card preview"
                      className="w-full h-auto max-h-64 object-contain"
                      style={{ background: '#000' }}
                    />
                    {isScanning && (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.7)' }}
                      >
                        <Loader2 className="animate-spin h-10 w-10 mb-3" style={{ color: '#D4AF37' }} />
                        <p className="text-sm" style={{ color: '#D4AF37' }}>
                          {scanEngine === 'ocr' ? 'CLOVA OCR로 명함 인식 중...' : 'AI가 명함을 분석 중...'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  {scanError && (
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)',
                      }}
                    >
                      <p className="text-sm" style={{ color: '#ef4444' }}>{scanError}</p>
                    </div>
                  )}

                  {/* Extracted Data Preview */}
                  {extractedData && (
                    <div
                      className="rounded-xl p-5 space-y-4"
                      style={{
                        background: 'rgba(212,175,55,0.05)',
                        border: '1px solid rgba(212,175,55,0.2)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Check size={18} style={{ color: '#22c55e' }} />
                        <span className="text-sm font-medium" style={{ color: '#22c55e' }}>
                          정보 추출 완료
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {extractedData.name && (
                          <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>이름: </span>
                            <span style={{ color: '#f0f0f0' }}>{extractedData.name}</span>
                          </div>
                        )}
                        {extractedData.company && (
                          <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>회사: </span>
                            <span style={{ color: '#f0f0f0' }}>{extractedData.company}</span>
                          </div>
                        )}
                        {extractedData.position && (
                          <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>직위: </span>
                            <span style={{ color: '#f0f0f0' }}>{extractedData.position}</span>
                          </div>
                        )}
                        {extractedData.email && (
                          <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>이메일: </span>
                            <span style={{ color: '#f0f0f0' }}>{extractedData.email}</span>
                          </div>
                        )}
                        {extractedData.mobile && (
                          <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>휴대폰: </span>
                            <span style={{ color: '#f0f0f0' }}>{extractedData.mobile}</span>
                          </div>
                        )}
                        {extractedData.phone && (
                          <div>
                            <span style={{ color: 'rgba(255,255,255,0.5)' }}>전화: </span>
                            <span style={{ color: '#f0f0f0' }}>{extractedData.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              className="flex items-center justify-end gap-3 px-6 py-4"
              style={{ borderTop: '1px solid rgba(212,175,55,0.2)' }}
            >
              {previewImage && !isScanning && (
                <button
                  onClick={() => {
                    setPreviewImage(null)
                    setExtractedData(null)
                    setScanError(null)
                  }}
                  className="px-5 py-2.5 rounded-lg text-sm transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  다시 업로드
                </button>
              )}
              {extractedData && (
                <button
                  onClick={applyExtractedData}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                    color: '#0a0a0a',
                    boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
                  }}
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
