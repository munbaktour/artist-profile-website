import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// POST: 익명 방문 카운트 (전화번호/이름 없이)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { exhibitionId } = body

    if (!exhibitionId) {
      return NextResponse.json(
        { error: '전시 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // 익명 방문 기록 저장
    const { error } = await supabase
      .from('exhibition_visits')
      .insert({
        exhibition_id: exhibitionId,
      })

    if (error) {
      console.error('Error creating visit:', error)
      // 에러가 발생해도 사용자 경험에 영향 주지 않음
      return NextResponse.json(
        { success: false, error: '방문 기록 저장 실패' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in visit API:', error)
    return NextResponse.json(
      { success: false, error: '서버 오류' },
      { status: 500 }
    )
  }
}
