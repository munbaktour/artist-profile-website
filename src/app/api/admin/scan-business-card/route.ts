import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
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
}

/**
 * Anthropic API 에러를 사용자 친화적 한국어 메시지로 변환
 */
function getErrorMessage(error: Anthropic.APIError): string {
  const message = error.message.toLowerCase()

  // Credit/Billing 관련 에러
  if (message.includes('credit') || message.includes('balance') || message.includes('billing')) {
    return '서비스 점검 중입니다. 잠시 후 다시 시도해주세요.'
  }

  // Rate Limit 에러 (429)
  if (error.status === 429 || message.includes('rate') || message.includes('limit')) {
    return '요청이 많습니다. 잠시 후 다시 시도해주세요.'
  }

  // Overloaded 에러 (529)
  if (error.status === 529 || message.includes('overload')) {
    return '서비스가 일시적으로 혼잡합니다. 잠시 후 다시 시도해주세요.'
  }

  // 인증 에러 (401)
  if (error.status === 401 || message.includes('auth') || message.includes('key') || message.includes('unauthorized')) {
    return '서비스 설정 오류입니다. 관리자에게 문의해주세요.'
  }

  // 기타 에러
  return '명함 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
}

// POST /api/admin/scan-business-card - Scan business card image with Claude Vision
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      )
    }

    // Get image from request
    const formData = await request.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    // Determine media type
    const mediaType = file.type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(mediaType)) {
      return NextResponse.json(
        { error: 'Unsupported image format. Use JPEG, PNG, GIF, or WebP.' },
        { status: 400 }
      )
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey,
    })

    // Call Claude Vision API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64,
              },
            },
            {
              type: 'text',
              text: `이 명함 이미지에서 연락처 정보를 추출해주세요. 다음 JSON 형식으로만 응답해주세요 (다른 텍스트 없이 JSON만):

{
  "name": "한글 이름",
  "nameEn": "영문 이름 (있으면)",
  "email": "이메일 주소",
  "phone": "전화번호 (회사/대표)",
  "mobile": "휴대폰 번호",
  "company": "회사/소속명",
  "position": "직위/직책",
  "address": "주소",
  "city": "도시",
  "country": "국가",
  "postalCode": "우편번호"
}

정보가 없는 필드는 빈 문자열("")로 남겨두세요.
전화번호는 하이픈(-)을 포함해서 정리해주세요.
한국 명함인 경우 country는 "대한민국"으로 설정해주세요.`,
            },
          ],
        },
      ],
    })

    // Extract text response
    const textContent = message.content.find(block => block.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json(
        { error: 'Failed to extract text from image' },
        { status: 500 }
      )
    }

    // Parse JSON response
    let extractedData: ExtractedContact
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      extractedData = JSON.parse(jsonMatch[0])
    } catch {
      console.error('Failed to parse Claude response:', textContent.text)
      return NextResponse.json(
        { error: 'Failed to parse extracted data', raw: textContent.text },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: extractedData,
    })
  } catch (error) {
    console.error('Error scanning business card:', error)

    if (error instanceof Anthropic.APIError) {
      const userMessage = getErrorMessage(error)
      console.error(`Anthropic API Error [${error.status}]: ${error.message}`)

      return NextResponse.json(
        { error: userMessage },
        { status: error.status || 500 }
      )
    }

    return NextResponse.json(
      { error: '명함 분석 서비스를 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}
