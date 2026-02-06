import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST: 공개 체크인 (인증 불필요)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { exhibitionId, phone, name } = body

    if (!exhibitionId || !phone) {
      return NextResponse.json(
        { error: '전시 ID와 전화번호는 필수입니다.' },
        { status: 400 }
      )
    }

    // 전화번호 형식 정리 (숫자만)
    const cleanPhone = phone.replace(/[^0-9]/g, '')
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return NextResponse.json(
        { error: '올바른 전화번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // 중복 체크: 같은 전시 + 같은 전화번호
    const { data: existing } = await supabase
      .from('exhibition_checkins')
      .select('id, checked_in_at')
      .eq('exhibition_id', exhibitionId)
      .eq('phone', cleanPhone)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        {
          message: '이미 체크인하셨습니다.',
          alreadyCheckedIn: true,
          checkedInAt: existing.checked_in_at,
        },
        { status: 200 }
      )
    }

    // 체크인 기록 저장
    const { error } = await supabase
      .from('exhibition_checkins')
      .insert({
        exhibition_id: exhibitionId,
        phone: cleanPhone,
        name: name?.trim() || null,
      })

    if (error) {
      console.error('Error creating checkin:', error)
      return NextResponse.json(
        { error: '체크인에 실패했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: '체크인이 완료되었습니다.', success: true },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in checkin API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
