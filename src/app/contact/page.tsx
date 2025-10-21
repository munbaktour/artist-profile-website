'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // TODO: 실제 API 호출 또는 EmailJS 통합
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl text-center tracking-widest font-light">CONTACT</h1>
        </div>
      </section>

      {/* Split Layout */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Image/Map */}
            <div>
              <div className="relative mb-6 overflow-hidden h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1663736244030-1e3fdc47c84c?w=1080&q=80"
                  alt="Gallery Location"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 h-[400px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="tracking-wide">Interactive Map</p>
                  <p className="text-sm mt-2">서울 종로구 관훈동 인사동5길 12</p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Info & Form */}
            <div>
              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl mb-8 tracking-wider font-light">방문 안내</h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1 font-medium">주소</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        서울 종로구 관훈동<br />
                        인사동5길 12<br />
                        우편번호 06090
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1 font-medium">전화</p>
                      <p className="text-sm text-gray-600">02-720-4028</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1 font-medium">이메일</p>
                      <p className="text-sm text-gray-600">artstory@kwanhoonarte.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1 font-medium">운영 시간</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        화요일 - 토요일: 오전 11시 - 오후 7시<br />
                        일요일: 오후 12시 - 오후 6시<br />
                        월요일 및 공휴일 휴관
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div>
                <h3 className="text-2xl mb-6 tracking-wider font-light">문의하기</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="이름 *"
                      required
                      className="px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="이메일 *"
                      required
                      className="px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="전화번호"
                    className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black text-gray-600"
                  >
                    <option value="">문의 유형</option>
                    <option value="general">일반 문의</option>
                    <option value="exhibition">전시 정보</option>
                    <option value="artwork">작품 구매</option>
                    <option value="press">언론 & 미디어</option>
                    <option value="other">기타</option>
                  </select>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="메시지 *"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black resize-none"
                  />

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm">
                      메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
                      메시지 전송에 실패했습니다. 다시 시도해주세요.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-black text-white text-xs tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '전송 중...' : '메시지 보내기'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Information */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg mb-4 tracking-wider font-medium">주차</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                방문객을 위한 무료 주차가 건물 지하 주차장에서 가능합니다.
                갤러리 리셉션에서 주차권을 확인받으시기 바랍니다.
              </p>
            </div>
            <div>
              <h4 className="text-lg mb-4 tracking-wider font-medium">대중교통</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                안국역(3호선) - 6번 출구에서 도보 약 5분 거리입니다.
              </p>
            </div>
            <div>
              <h4 className="text-lg mb-4 tracking-wider font-medium">예약 관람</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                정규 시간 외 프라이빗 관람 및 예약이 가능합니다.
                맞춤형 방문을 준비하시려면 최소 48시간 전에 문의해주세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h3 className="text-2xl mb-6 tracking-wider font-light">팔로우하기</h3>
          <p className="text-gray-700 mb-8">
            소셜 미디어에서 관훈아르테를 팔로우하여 최신 업데이트, 비하인드 스토리, 독점 미리보기를 받아보세요.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-[600px] mx-auto text-center">
          <h3 className="text-2xl mb-4 tracking-wider text-white font-light">뉴스레터</h3>
          <p className="text-gray-300 mb-8">
            전시 공지, 미술계 인사이트, 독점 초대를 받아보시려면 구독하세요.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="이메일 주소 입력"
              className="flex-1 px-4 py-3 bg-white text-black text-sm focus:outline-none"
            />
            <button className="px-8 py-3 bg-white text-black text-xs tracking-widest hover:bg-gray-200 transition-all">
              구독하기
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            구독하시면 개인정보 처리방침에 동의하는 것으로 간주됩니다
          </p>
        </div>
      </section>
    </div>
  )
}
