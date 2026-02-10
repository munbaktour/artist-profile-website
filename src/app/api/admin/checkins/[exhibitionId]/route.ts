import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET: 특정 전시의 체크인 목록 조회 (인증 필요)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ exhibitionId: string }> }
) {
  try {
    const { exhibitionId } = await params
    const supabase = await createClient()

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    // 체크인 목록 조회 (전화번호 입력한 방문자)
    const { data: checkins, error } = await supabase
      .from('exhibition_checkins')
      .select('id, phone, name, checked_in_at')
      .eq('exhibition_id', exhibitionId)
      .order('checked_in_at', { ascending: false })

    if (error) {
      console.error('Error fetching checkins:', error)
      return NextResponse.json(
        { error: '체크인 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      )
    }

    // 익명 방문 카운트 조회
    const { count: visitCount, error: visitError } = await supabase
      .from('exhibition_visits')
      .select('*', { count: 'exact', head: true })
      .eq('exhibition_id', exhibitionId)

    // 익명 방문 목록 조회 (개별 기록)
    const { data: visits, error: visitsError } = await supabase
      .from('exhibition_visits')
      .select('id, visited_at')
      .eq('exhibition_id', exhibitionId)
      .order('visited_at', { ascending: false })

    if (visitError) {
      console.error('Error fetching visit count:', visitError)
    }
    if (visitsError) {
      console.error('Error fetching visits:', visitsError)
    }

    // 최근 방문 시간 (익명 방문 목록에서 첫 번째 항목)
    const lastVisit = visits && visits.length > 0 ? visits[0].visited_at : null

    return NextResponse.json({
      data: checkins,
      visits: visits || [],
      total: checkins.length,
      visitCount: visitCount || 0,
      lastVisit,
    })
  } catch (error) {
    console.error('Error in checkins API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
