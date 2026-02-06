'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface ExhibitionInfo {
  slug: string
  title_ko: string
}

export default function CheckinPage() {
  const params = useParams()
  const exhibitionId = params.id as string

  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [checkedInAt, setCheckedInAt] = useState<string | null>(null)
  const [exhibition, setExhibition] = useState<ExhibitionInfo | null>(null)
  const [loadingExhibition, setLoadingExhibition] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/admin/exhibitions/${exhibitionId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.data) setExhibition(data.data)
      })
      .catch(() => {})
      .finally(() => setLoadingExhibition(false))
    return () => controller.abort()
  }, [exhibitionId])

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exhibitionId,
          phone: phone.replace(/[^0-9]/g, ''),
          name: name.trim() || undefined,
        }),
      })

      const data = await res.json()

      if (res.status === 201) {
        setStatus('success')
      } else if (data.alreadyCheckedIn) {
        setStatus('already')
        setCheckedInAt(data.checkedInAt)
      } else {
        setStatus('error')
        setErrorMessage(data.error || '체크인에 실패했습니다.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('네트워크 오류가 발생했습니다.')
    }
  }

  if (loadingExhibition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-400">...</p>
      </div>
    )
  }

  if (!exhibition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">전시 정보를 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  // 체크인 완료 / 이미 체크인 화면
  if (status === 'success' || status === 'already') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {status === 'success' ? '체크인 완료!' : '이미 체크인하셨습니다'}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              {exhibition.title_ko}
            </p>
            {status === 'already' && checkedInAt && (
              <p className="text-xs text-gray-400">
                체크인 시간: {new Date(checkedInAt).toLocaleString('ko-KR')}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-6">
              전시 관람을 즐겨주세요!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-1">
            KWANHOON ARTE
          </h1>
          <h2 className="text-xl font-semibold text-gray-900">
            {exhibition.title_ko}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            전시 체크인
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="010-1234-5678"
                required
                maxLength={13}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                이름 <span className="text-gray-400 text-xs">(선택)</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                maxLength={20}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-colors"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || phone.replace(/[^0-9]/g, '').length < 10}
              className="w-full py-3 px-4 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'loading' ? '처리 중...' : '체크인'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          체크인 정보는 전시 관리 목적으로만 사용됩니다.
        </p>
      </div>
    </div>
  )
}
