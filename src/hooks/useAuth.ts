'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { AdminProfile, DbProfile } from '@/types/admin'

interface UseAuthReturn {
  user: User | null
  profile: AdminProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    if (data) {
      const dbProfile = data as DbProfile
      const convertedProfile: AdminProfile = {
        id: dbProfile.id,
        email: dbProfile.email,
        fullName: dbProfile.full_name,
        role: dbProfile.role,
        avatarUrl: dbProfile.avatar_url,
        createdAt: dbProfile.created_at,
        updatedAt: dbProfile.updated_at,
      }
      setProfile(convertedProfile)
      return convertedProfile
    }

    return null
  }, [supabase])

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }, [user, fetchProfile])

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        }
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    //
    // 이 콜백은 Supabase가 인증 잠금(Web Locks)을 쥔 채로 호출한다. 그래서 콜백 안에서
    // 토큰이 필요한 Supabase 호출을 await 하면 같은 잠금을 기다리다 자기 자신과 교착된다.
    // 10초 뒤 AbortController가 끊고 "signal is aborted without reason"이 올라온다.
    //
    // 실제로 이 화면에서 getSession이 계속 실패했고, 첨부 업로드도 토큰을 못 얻어
    // 막혔다. 원인은 아래 fetchProfile을 콜백 안에서 await 한 것이었다.
    //
    // 콜백은 동기로 끝내 잠금을 바로 돌려주고, Supabase를 쓰는 일은 밖으로 미룬다.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user)
          const userId = session.user.id
          // setTimeout 0 — 콜백이 반환돼 잠금이 풀린 뒤에 실행된다
          setTimeout(() => {
            void fetchProfile(userId)
          }, 0)
        } else {
          setUser(null)
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, fetchProfile])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error }
      }

      router.push('/admin/contacts')
      router.refresh()
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    router.push('/admin/login')
    router.refresh()
  }

  return {
    user,
    profile,
    loading,
    signIn,
    signOut,
    refreshProfile,
  }
}
