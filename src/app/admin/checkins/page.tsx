'use client'

import { useState, useEffect, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import {
  QrCode,
  Users,
  Clock,
  ChevronRight,
  ArrowLeft,
  Phone,
  User,
  Download,
  Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckinRecord {
  id: string
  phone: string
  name: string | null
  checked_in_at: string
}

interface ExhibitionRow {
  id: string
  slug: string
  title_ko: string
  status: string
  start_date: string
  end_date: string
}

export default function AdminCheckinsPage() {
  const [selectedExhibition, setSelectedExhibition] = useState<string | null>(null)
  const [checkins, setCheckins] = useState<CheckinRecord[]>([])
  const [exhibitions, setExhibitions] = useState<ExhibitionRow[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingExhibitions, setLoadingExhibitions] = useState(true)
  const [error, setError] = useState('')
  const [visitCount, setVisitCount] = useState(0)
  const [lastVisit, setLastVisit] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/admin/exhibitions', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.data) setExhibitions(data.data)
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error('Failed to fetch exhibitions:', err)
      })
      .finally(() => setLoadingExhibitions(false))
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!selectedExhibition) return

    const controller = new AbortController()
    setLoading(true)
    setError('')

    fetch(`/api/admin/checkins/${selectedExhibition}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setCheckins(data.data || [])
          setVisitCount(data.visitCount || 0)
          setLastVisit(data.lastVisit || null)
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError('체크인 목록을 불러오는데 실패했습니다.')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [selectedExhibition])

  const qrRef = useRef<HTMLDivElement>(null)

  const selectedExhibitionData = exhibitions.find(ex => ex.slug === selectedExhibition)

  const checkinUrl = selectedExhibition
    ? `https://kwanhoonarte.com/checkin/${selectedExhibition}`
    : ''

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = `checkin-qr-${selectedExhibition}.png`
    link.href = url
    link.click()
  }

  // 전시 목록 화면
  if (!selectedExhibition) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">체크인 관리</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            전시별 방문자 체크인 현황을 확인합니다.
          </p>
        </div>

        {/* 전시 목록 */}
        <div className="space-y-3">
          {loadingExhibitions ? (
            <div className="p-8 text-center">
              <p className="text-zinc-400">불러오는 중...</p>
            </div>
          ) : exhibitions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <QrCode className="w-10 h-10 text-zinc-700 mb-4" />
              <p className="text-zinc-400 mb-1">등록된 전시가 없습니다</p>
            </div>
          ) : (
            exhibitions.map(exhibition => (
              <button
                key={exhibition.id}
                onClick={() => setSelectedExhibition(exhibition.slug)}
                className="w-full bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex items-center gap-4 hover:bg-zinc-800/70 transition-colors text-left"
              >
                <QrCode className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-100 font-medium truncate">
                    {exhibition.title_ko}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {exhibition.start_date} ~ {exhibition.end_date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'px-2 py-0.5 rounded text-xs',
                    exhibition.status === 'current'
                      ? 'bg-green-500/10 text-green-400'
                      : exhibition.status === 'upcoming'
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-zinc-800 text-zinc-400'
                  )}>
                    {exhibition.status === 'current' ? '진행 중' : exhibition.status === 'upcoming' ? '예정' : '종료'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    )
  }

  // 참석자 목록 화면
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => setSelectedExhibition(null)}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 text-sm mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          전시 목록
        </button>
        <h1 className="text-lg font-semibold text-zinc-100">
          {selectedExhibitionData?.title_ko}
        </h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          {selectedExhibitionData?.start_date} ~ {selectedExhibitionData?.end_date}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex items-center gap-4">
          <Eye className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
          <div>
            <p className="text-2xl font-semibold text-zinc-100">{visitCount}</p>
            <p className="text-xs text-zinc-500">QR 스캔 횟수</p>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex items-center gap-4">
          <Users className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          <div>
            <p className="text-2xl font-semibold text-zinc-100">{checkins.length}</p>
            <p className="text-xs text-zinc-500">정보 입력 체크인</p>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex items-center gap-4">
          <Clock className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          <div>
            <p className="text-2xl font-semibold text-zinc-100">
              {lastVisit
                ? new Date(lastVisit).toLocaleDateString('ko-KR')
                : checkins.length > 0
                ? new Date(checkins[0].checked_in_at).toLocaleDateString('ko-KR')
                : '-'}
            </p>
            <p className="text-xs text-zinc-500">최근 방문</p>
          </div>
        </div>
      </div>

      {/* QR 코드 */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-5">
        <h2 className="text-sm font-medium text-zinc-100 mb-4">체크인 QR코드</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div ref={qrRef} className="bg-white p-4 rounded-lg">
            <QRCodeCanvas
              value={checkinUrl}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-zinc-400 mb-2">체크인 URL</p>
            <p className="text-xs text-zinc-500 break-all mb-4 font-mono">
              {checkinUrl}
            </p>
            <button
              onClick={downloadQR}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-lg font-medium text-sm hover:bg-[#C49B30] transition-colors"
            >
              <Download className="w-4 h-4" />
              QR 다운로드 (PNG)
            </button>
            <p className="text-xs text-zinc-500 mt-2">
              고해상도 이미지로 인쇄하여 전시장에 비치하세요.
            </p>
          </div>
        </div>
      </div>

      {/* 참석자 목록 */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-zinc-400">불러오는 중...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : checkins.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="w-8 h-8 text-zinc-700 mb-4" />
            <p className="text-zinc-400 mb-1">아직 체크인한 방문자가 없습니다</p>
            <p className="text-sm text-zinc-500">
              QR코드를 통해 방문자가 체크인하면 여기에 표시됩니다.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {checkins.map((checkin) => (
              <div key={checkin.id} className="px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-100 text-sm font-medium truncate">
                    {checkin.name || '이름 없음'}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Phone className="w-3 h-3" />
                    <span>{formatPhone(checkin.phone)}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-zinc-400">
                    {new Date(checkin.checked_in_at).toLocaleDateString('ko-KR')}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {new Date(checkin.checked_in_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function formatPhone(phone: string): string {
  if (phone.length === 11) {
    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
  }
  if (phone.length === 10) {
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`
  }
  return phone
}
