'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { artistsData } from '@/data/artists'
import { CVSection, CVDownloadButton } from '@/components/features/artists/cv'

// CV 섹션 라벨
const sectionLabels = {
  education: { ko: '학력 EDUCATION', en: 'EDUCATION' },
  awards: { ko: '수상 AWARDS', en: 'AWARDS' },
  soloExhibitions: { ko: '개인전 SOLO EXHIBITIONS', en: 'SOLO EXHIBITIONS' },
  groupExhibitions: { ko: '단체전 GROUP EXHIBITIONS', en: 'GROUP EXHIBITIONS' },
  collections: { ko: '소장 COLLECTIONS', en: 'COLLECTIONS' },
  current: { ko: '현재 CURRENT', en: 'CURRENT' }
}

export default function ArtistCVPage() {
  const params = useParams()
  const { language } = useLanguage()
  const artistId = params.id as string

  const artist = artistsData.find((a) => a.id === artistId)

  if (!artist) {
    notFound()
  }

  const cv = artist.cv

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Hide non-essential elements */
          header, footer, nav, .no-print {
            display: none !important;
          }

          /* Reset page styles */
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          /* CV page styles */
          .cv-container {
            padding: 2rem !important;
            max-width: 100% !important;
          }

          .cv-header {
            border-bottom: 1px solid #000 !important;
            padding-bottom: 1rem !important;
            margin-bottom: 2rem !important;
          }

          /* Ensure sections don't break across pages */
          section {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="pt-20 min-h-screen bg-white">
        {/* Header */}
        <header className="cv-header px-6 md:px-12 py-8 border-b border-gray-200">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            {/* Back Button + Artist Name */}
            <div className="flex items-center gap-4">
              <Link
                href={`/artists/${artistId}`}
                className="no-print inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </Link>
              <div className="w-px h-6 bg-gray-300 no-print" />
              <h1 className="text-xl md:text-2xl font-light tracking-wide">
                {artist.name[language]} CV
              </h1>
            </div>

            {/* Download Button */}
            <div className="no-print">
              <CVDownloadButton language={language} />
            </div>
          </div>
        </header>

        {/* CV Content */}
        <main className="cv-container px-6 md:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            {cv ? (
              <>
                {/* Education */}
                {cv.education && (
                  <CVSection
                    title={sectionLabels.education}
                    items={cv.education}
                    language={language}
                  />
                )}

                {/* Awards */}
                {cv.awards && (
                  <CVSection
                    title={sectionLabels.awards}
                    items={cv.awards}
                    language={language}
                  />
                )}

                {/* Solo Exhibitions */}
                {cv.soloExhibitions && (
                  <CVSection
                    title={sectionLabels.soloExhibitions}
                    items={cv.soloExhibitions}
                    language={language}
                  />
                )}

                {/* Group Exhibitions */}
                {cv.groupExhibitions && (
                  <CVSection
                    title={sectionLabels.groupExhibitions}
                    items={cv.groupExhibitions}
                    language={language}
                  />
                )}

                {/* Collections */}
                {cv.collections && (
                  <CVSection
                    title={sectionLabels.collections}
                    items={cv.collections}
                    language={language}
                  />
                )}

                {/* Current */}
                {cv.current && (
                  <CVSection
                    title={sectionLabels.current}
                    items={cv.current}
                    language={language}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <p>{language === 'ko' ? 'CV 정보가 없습니다.' : 'No CV information available.'}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
