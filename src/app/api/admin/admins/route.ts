import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET: 모든 관리자 목록 조회
export async function GET() {
  try {
    const supabase = await createClient()

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    // 관리자 목록 조회
    const { data: admins, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, role, avatar_url, created_at')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching admins:', error)
      return NextResponse.json(
        { error: '관리자 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      )
    }

    // camelCase로 변환
    const formattedAdmins = admins.map(admin => ({
      id: admin.id,
      email: admin.email,
      fullName: admin.full_name,
      role: admin.role,
      avatarUrl: admin.avatar_url,
      createdAt: admin.created_at,
    }))

    return NextResponse.json({ data: formattedAdmins })
  } catch (error) {
    console.error('Error in admins API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
