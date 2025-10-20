import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageType } from '../App';

interface ContactProps {
  language: LanguageType;
}

export function Contact({ language }: ContactProps) {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-center tracking-widest">CONTACT</h1>
        </div>
      </section>

      {/* Split Layout */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Image/Map */}
            <div>
              <div className="mb-6 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1663736244030-1e3fdc47c84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBnYWxsZXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwOTI1MDM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Gallery Location"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 h-[400px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="tracking-wide">Interactive Map</p>
                  <p className="text-sm mt-2">123 Gangnam-daero, Seoul</p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Info & Form */}
            <div>
              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="mb-8 tracking-wider">
                  {language === 'en' ? 'Visit Us' : '방문 안내'}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1">{language === 'en' ? 'Address' : '주소'}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {language === 'en' ? (
                          <>
                            123 Gangnam-daero<br />
                            Gangnam-gu, Seoul<br />
                            South Korea 06090
                          </>
                        ) : (
                          <>
                            서울시 강남구<br />
                            강남대로 123<br />
                            우편번호 06090
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1">{language === 'en' ? 'Phone' : '전화'}</p>
                      <p className="text-sm text-gray-600">+82 2 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1">{language === 'en' ? 'Email' : '이메일'}</p>
                      <p className="text-sm text-gray-600">info@kwanhoonarte.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock size={20} className="text-gray-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="tracking-wide mb-1">{language === 'en' ? 'Hours' : '운영 시간'}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {language === 'en' ? (
                          <>
                            Tuesday - Saturday: 11:00 AM - 7:00 PM<br />
                            Sunday: 12:00 PM - 6:00 PM<br />
                            Closed Mondays and Public Holidays
                          </>
                        ) : (
                          <>
                            화요일 - 토요일: 오전 11시 - 오후 7시<br />
                            일요일: 오후 12시 - 오후 6시<br />
                            월요일 및 공휴일 휴관
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div>
                <h3 className="mb-6 tracking-wider">
                  {language === 'en' ? 'Send Inquiry' : '문의하기'}
                </h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name *"
                      required
                      className="px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      className="px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />

                  <select className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black text-gray-600">
                    <option value="">Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="exhibition">Exhibition Information</option>
                    <option value="artwork">Artwork Purchase</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>

                  <textarea
                    placeholder="Message *"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white text-xs tracking-widest hover:bg-gray-800 transition-all"
                  >
                    SEND MESSAGE
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
              <h4 className="mb-4 tracking-wider">Parking</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Complimentary parking is available for visitors in the building's underground parking facility. 
                Please validate your parking ticket at the gallery reception.
              </p>
            </div>
            <div>
              <h4 className="mb-4 tracking-wider">Public Transport</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Gangnam Station (Line 2) - Exit 11, 5-minute walk<br />
                Sinnonhyeon Station (Line 9) - Exit 6, 8-minute walk<br />
                Bus routes: 140, 143, 146, 341, 360, 740
              </p>
            </div>
            <div>
              <h4 className="mb-4 tracking-wider">Appointments</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Private viewings and appointments are available outside regular hours. 
                Please contact us at least 48 hours in advance to arrange a personalized visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h3 className="mb-6 tracking-wider">
            {language === 'en' ? 'Follow Us' : '팔로우하기'}
          </h3>
          <p className="text-gray-700 mb-8">
            {language === 'en'
              ? 'Stay connected with kwanhoonarte on social media for the latest updates, behind-the-scenes content, and exclusive previews.'
              : '소셜 미디어에서 관훈아르테를 팔로우하여 최신 업데이트, 비하인드 스토리, 독점 미리보기를 받아보세요.'}
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
          <h3 className="mb-4 tracking-wider text-white">
            {language === 'en' ? 'Newsletter' : '뉴스레터'}
          </h3>
          <p className="text-gray-300 mb-8">
            {language === 'en'
              ? 'Subscribe to receive exhibition announcements, art world insights, and exclusive invitations.'
              : '전시 공지, 미술계 인사이트, 독점 초대를 받아보시려면 구독하세요.'}
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white text-black text-sm focus:outline-none"
            />
            <button className="px-8 py-3 bg-white text-black text-xs tracking-widest hover:bg-gray-200 transition-all">
              SUBSCRIBE
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </section>
    </div>
  );
}
