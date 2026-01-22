import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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
  website?: string
}

// General OCR 응답 타입
interface GeneralOcrField {
  inferText: string
  inferConfidence: number
  boundingPoly?: {
    vertices: { x: number; y: number }[]
  }
}

interface GeneralOcrImage {
  inferResult?: string
  message?: string
  fields?: GeneralOcrField[]
}

interface GeneralOcrResponse {
  version: string
  requestId: string
  timestamp: number
  images: GeneralOcrImage[]
}

/**
 * 전화번호 포맷팅 (하이픈 추가)
 */
function formatPhoneNumber(phone: string): string {
  const numbers = phone.replace(/[^0-9]/g, '')

  // 한국 휴대폰 번호
  if (numbers.match(/^01[0-9]/)) {
    if (numbers.length === 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
    } else if (numbers.length === 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`
    }
  }

  // 서울 지역번호 (02)
  if (numbers.startsWith('02')) {
    if (numbers.length === 10) {
      return `02-${numbers.slice(2, 6)}-${numbers.slice(6)}`
    } else if (numbers.length === 9) {
      return `02-${numbers.slice(2, 5)}-${numbers.slice(5)}`
    }
  }

  // 기타 지역번호
  if (numbers.length === 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`
  } else if (numbers.length === 10) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`
  }

  return phone
}

/**
 * OCR 텍스트에서 명함 정보 추출 (정규식 기반)
 */
function parseBusinessCardText(texts: string[]): ExtractedContact {
  const allText = texts.join(' ')
  const result: ExtractedContact = {
    country: '대한민국'
  }

  // 이메일 추출 (@가 포함된 문자열)
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const emailMatch = allText.match(emailPattern)
  if (emailMatch) {
    result.email = emailMatch[0]
  }

  // 휴대폰 번호 추출 (010, 011 등)
  const mobilePattern = /01[0-9][-.·\s]?\d{3,4}[-.·\s]?\d{4}/g
  const mobileMatch = allText.match(mobilePattern)
  if (mobileMatch) {
    result.mobile = formatPhoneNumber(mobileMatch[0])
  }

  // 일반 전화번호 추출 (02, 031 등 지역번호)
  const phonePattern = /0[2-6][0-9]?[-.·\s]?\d{3,4}[-.·\s]?\d{4}/g
  const phoneMatches = allText.match(phonePattern)
  if (phoneMatches) {
    // 휴대폰이 아닌 번호 찾기
    const landline = phoneMatches.find(p => !p.startsWith('01'))
    if (landline) {
      result.phone = formatPhoneNumber(landline)
    }
  }

  // 회사명 추출 (주), 주식회사, (유), 유한회사 등
  const companyPatterns = [
    /(?:\(주\)|주식회사|㈜)\s*[가-힣A-Za-z0-9]+/g,
    /[가-힣A-Za-z0-9]+\s*(?:\(주\)|주식회사|㈜)/g,
    /(?:\(유\)|유한회사)\s*[가-힣A-Za-z0-9]+/g,
    /[가-힣A-Za-z0-9]+\s*(?:\(유\)|유한회사)/g,
    /[가-힣]+(?:그룹|홀딩스|코퍼레이션|인터내셔널|엔터프라이즈)/g,
    /[A-Z][a-zA-Z]+\s*(?:Corp|Inc|LLC|Ltd|Co\.|Company|Group)/gi
  ]

  for (const pattern of companyPatterns) {
    const match = allText.match(pattern)
    if (match) {
      result.company = match[0].trim()
      break
    }
  }

  // 직책 추출
  const positionKeywords = [
    '대표이사', '대표', 'CEO', 'CTO', 'CFO', 'COO', 'CMO',
    '회장', '부회장', '사장', '부사장',
    '전무이사', '상무이사', '이사', '전무', '상무',
    '본부장', '실장', '센터장', '단장',
    '부장', '차장', '과장', '대리', '주임', '사원',
    '팀장', '파트장', '매니저', 'Manager', 'Director',
    '수석', '책임', '선임', '연구원', '교수', '박사',
    'President', 'Vice President', 'VP', 'General Manager',
    '원장', '소장', '관장', '총괄', '담당'
  ]

  for (const keyword of positionKeywords) {
    const posPattern = new RegExp(`[가-힣A-Za-z]*${keyword}[가-힣A-Za-z]*`, 'gi')
    const posMatch = allText.match(posPattern)
    if (posMatch) {
      result.position = posMatch[0].trim()
      break
    }
  }

  // 이름 추출 (한글 2-4글자, 직책 키워드와 함께 있는 경우 우선)
  // 직책 근처의 이름 찾기
  const namePatterns = [
    /([가-힣]{2,4})\s*(?:대표|이사|부장|과장|차장|팀장|매니저|Manager|Director)/,
    /(?:대표|이사|부장|과장|차장|팀장|매니저|Manager|Director)\s*([가-힣]{2,4})/,
  ]

  for (const pattern of namePatterns) {
    const match = allText.match(pattern)
    if (match && match[1]) {
      result.name = match[1].trim()
      break
    }
  }

  // 직책 근처에서 못 찾으면 일반적인 한글 이름 패턴
  if (!result.name) {
    // 회사명, 주소 키워드가 아닌 한글 2-4글자
    const excludeWords = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '주식회사', '유한회사']

    for (const text of texts) {
      const koreanName = text.match(/^[가-힣]{2,4}$/)
      if (koreanName && !excludeWords.includes(koreanName[0])) {
        result.name = koreanName[0]
        break
      }
    }
  }

  // 영문 이름 추출
  const englishNamePattern = /[A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?/
  const englishNameMatch = allText.match(englishNamePattern)
  if (englishNameMatch) {
    // 회사명이 아닌 경우에만
    const name = englishNameMatch[0]
    if (!name.match(/Corp|Inc|LLC|Ltd|Co\.|Company|Group|University|Institute/i)) {
      result.nameEn = name
    }
  }

  // 주소 추출 (시/도, 구/군 포함)
  const addressPatterns = [
    /(?:서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주)[가-힣\s\d\-]+(?:로|길|동|구|시|군)[가-힣\s\d\-]*/g,
    /[가-힣]+(?:시|도)\s*[가-힣]+(?:구|군|시)\s*[가-힣\s\d\-]+(?:로|길|동)[가-힣\s\d\-]*/g
  ]

  for (const pattern of addressPatterns) {
    const match = allText.match(pattern)
    if (match) {
      result.address = match[0].trim()
      break
    }
  }

  // 우편번호 추출 (5자리 숫자)
  const postalMatch = allText.match(/\b\d{5}\b/)
  if (postalMatch) {
    result.postalCode = postalMatch[0]
  }

  // 웹사이트 추출
  const websitePattern = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/gi
  const websiteMatch = allText.match(websitePattern)
  if (websiteMatch) {
    // 이메일 도메인이 아닌 것만
    const website = websiteMatch.find(w => !w.includes('@'))
    if (website) {
      result.website = website
    }
  }

  return result
}

/**
 * CLOVA OCR 에러 메시지를 사용자 친화적 메시지로 변환
 */
function getOcrErrorMessage(status: number): string {
  if (status === 401 || status === 403) {
    return '서비스 설정 오류입니다. 관리자에게 문의해주세요.'
  }
  if (status === 429) {
    return '요청이 많습니다. 잠시 후 다시 시도해주세요.'
  }
  if (status === 400) {
    return '이미지를 인식할 수 없습니다. 다른 이미지를 시도해주세요.'
  }
  if (status >= 500) {
    return 'OCR 서비스가 일시적으로 불안정합니다. 잠시 후 다시 시도해주세요.'
  }
  return '이미지 인식 중 오류가 발생했습니다.'
}

// POST /api/admin/scan-business-card-ocr - Scan business card with Naver CLOVA General OCR
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check for API credentials
    const ocrUrl = process.env.NAVER_CLOVA_OCR_URL
    const ocrSecret = process.env.NAVER_CLOVA_OCR_SECRET

    if (!ocrUrl || !ocrSecret) {
      return NextResponse.json(
        { error: 'NAVER_CLOVA_OCR credentials not configured' },
        { status: 500 }
      )
    }

    // Get image from request
    const formData = await request.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '지원하지 않는 이미지 형식입니다. JPEG, PNG, GIF, BMP, TIFF, WebP만 사용 가능합니다.' },
        { status: 400 }
      )
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    // Determine format from mime type
    const formatMap: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/bmp': 'bmp',
      'image/tiff': 'tiff',
      'image/webp': 'webp'
    }
    const format = formatMap[file.type] || 'jpg'

    // Prepare CLOVA General OCR request
    const ocrRequestBody = {
      version: 'V2',
      requestId: `ocr-${Date.now()}`,
      timestamp: Date.now(),
      images: [
        {
          format,
          name: 'business-card',
          data: base64
        }
      ]
    }

    // Call CLOVA OCR API
    const ocrResponse = await fetch(ocrUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-OCR-SECRET': ocrSecret
      },
      body: JSON.stringify(ocrRequestBody)
    })

    if (!ocrResponse.ok) {
      const errorText = await ocrResponse.text()
      console.error(`CLOVA OCR Error [${ocrResponse.status}]:`, errorText)

      return NextResponse.json(
        { error: getOcrErrorMessage(ocrResponse.status) },
        { status: ocrResponse.status }
      )
    }

    const ocrResult: GeneralOcrResponse = await ocrResponse.json()

    // Check if we have valid results
    if (!ocrResult.images || ocrResult.images.length === 0) {
      return NextResponse.json(
        { error: '이미지에서 텍스트를 추출할 수 없습니다.' },
        { status: 400 }
      )
    }

    const imageResult = ocrResult.images[0]

    // Check inference result
    if (imageResult.inferResult !== 'SUCCESS') {
      return NextResponse.json(
        { error: imageResult.message || '이미지 인식에 실패했습니다. 더 선명한 이미지를 사용해주세요.' },
        { status: 400 }
      )
    }

    // Extract all text fields
    const fields = imageResult.fields || []
    if (fields.length === 0) {
      return NextResponse.json(
        { error: '이미지에서 텍스트를 찾을 수 없습니다.' },
        { status: 400 }
      )
    }

    // Get all text strings
    const texts = fields.map(f => f.inferText)

    // Parse business card information from text
    const extractedData = parseBusinessCardText(texts)

    return NextResponse.json({
      success: true,
      data: extractedData,
      rawTexts: texts, // 디버깅용 원본 텍스트
      provider: 'naver-clova-general-ocr'
    })
  } catch (error) {
    console.error('Error scanning business card with OCR:', error)

    return NextResponse.json(
      { error: '이미지 인식 서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}
