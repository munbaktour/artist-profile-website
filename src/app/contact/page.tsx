'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react'
import { NaverMap } from '@/components/molecules/NaverMap'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { TRANSLATIONS, GALLERY_INFO } from '@/lib/constants'

export default function ContactPage() {
  const { language } = useLanguage()
  const t = TRANSLATIONS.contact
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
          <h1 className="text-4xl text-center tracking-widest font-light">
            {t.header.title[language]}
          </h1>
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

              {/* Naver Map */}
              <NaverMap
                center={{ lat: 37.5729503, lng: 126.9856214 }}
                zoom={16}
                className="w-full h-[400px]"
              />
            </div>

            {/* Right Side - Contact Info & Form */}
            <div>
              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl mb-8 tracking-wider font-light">
                  {t.visitInfo.title[language]}
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1 font-medium">
                        {t.visitInfo.address.label[language]}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {GALLERY_INFO.ADDRESS[language]}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1 font-medium">
                        {t.visitInfo.phone.label[language]}
                      </p>
                      <p className="text-sm text-gray-600">{GALLERY_INFO.PHONE}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1 font-medium">
                        {t.visitInfo.email.label[language]}
                      </p>
                      <p className="text-sm text-gray-600">{GALLERY_INFO.EMAIL}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1 font-medium">
                        {t.visitInfo.hours.label[language]}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {t.visitInfo.hours.weekdays[language]}<br />
                        {t.visitInfo.hours.weekends[language]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div>
                <h3 className="text-2xl mb-6 tracking-wider font-light">
                  {t.form.title[language]}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.form.fields.name[language]}
                      required
                      className="px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.form.fields.email[language]}
                      required
                      className="px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.form.fields.phone[language]}
                    className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black text-gray-600"
                  >
                    <option value="">{t.form.fields.subject[language]}</option>
                    <option value="general">{t.form.subjects.general[language]}</option>
                    <option value="exhibition">{t.form.subjects.exhibition[language]}</option>
                    <option value="artwork">{t.form.subjects.artwork[language]}</option>
                    <option value="press">{t.form.subjects.press[language]}</option>
                    <option value="other">{t.form.subjects.other[language]}</option>
                  </select>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.form.fields.message[language]}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black resize-none"
                  />

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm">
                      {t.form.success[language]}
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
                      {t.form.error[language]}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-black text-white text-xs tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t.form.submitting[language] : t.form.submit[language]}
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
              <h4 className="text-lg mb-4 tracking-wider font-medium">
                {t.additional.parking.title[language]}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t.additional.parking.description[language]}
              </p>
            </div>
            <div>
              <h4 className="text-lg mb-4 tracking-wider font-medium">
                {t.additional.publicTransit.title[language]}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t.additional.publicTransit.description[language]}
              </p>
            </div>
            <div>
              <h4 className="text-lg mb-4 tracking-wider font-medium">
                {t.additional.appointments.title[language]}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t.additional.appointments.description[language]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h3 className="text-2xl mb-6 tracking-wider font-light">
            {t.social.title[language]}
          </h3>
          <p className="text-gray-700 mb-8">
            {t.social.description[language]}
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://instagram.com/kwanhoonarte"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-[600px] mx-auto text-center">
          <h3 className="text-2xl mb-4 tracking-wider text-white font-light">
            {t.newsletter.title[language]}
          </h3>
          <p className="text-gray-300 mb-8">
            {t.newsletter.description[language]}
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t.newsletter.placeholder[language]}
              className="flex-1 px-4 py-3 bg-white text-black text-sm focus:outline-none"
            />
            <button className="px-8 py-3 bg-white text-black text-xs tracking-widest hover:bg-gray-200 transition-all">
              {t.newsletter.submit[language]}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            {t.newsletter.privacy[language]}
          </p>
        </div>
      </section>
    </div>
  )
}
