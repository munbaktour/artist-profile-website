'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Mail, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message || '로그인에 실패했습니다.')
      }
    } catch {
      setError('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl font-light tracking-[8px] mb-2"
            style={{ color: '#D4AF37', fontFamily: "'Playfair Display', serif" }}
          >
            관훈아르떼
          </h1>
          <p
            className="text-xs tracking-[3px] uppercase"
            style={{ color: 'rgba(212,175,55,0.6)' }}
          >
            Collector Relations Management
          </p>
        </div>

        {/* Login Form */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <h2
            className="text-xl font-light mb-8 tracking-[2px]"
            style={{ color: '#f0f0f0' }}
          >
            관리자 로그인
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs tracking-[1px]"
                style={{ color: 'rgba(212,175,55,0.8)' }}
              >
                이메일
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(212,175,55,0.4)' }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kwanhoonarte.com"
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 rounded-lg text-sm outline-none transition-all disabled:opacity-50"
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    color: '#f0f0f0',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs tracking-[1px]"
                style={{ color: 'rgba(212,175,55,0.8)' }}
              >
                비밀번호
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(212,175,55,0.4)' }}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3.5 rounded-lg text-sm outline-none transition-all disabled:opacity-50"
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    color: '#f0f0f0',
                  }}
                />
              </div>
            </div>

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                color: '#0a0a0a',
                boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  로그인 중...
                </span>
              ) : (
                '로그인'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs tracking-[2px] mt-8"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          © {new Date().getFullYear()} KWANHOON ARTE
        </p>
      </div>
    </div>
  )
}
