'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { supabase } from '@/lib/supabaseClient' //use this shared client

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<'owner' | 'customer' | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      const user = session?.user

      console.log('Session user:', user)

      if (!user) {
        console.error('No user, redirecting to login')
        router.push('/login')
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profileError || !profile?.role) {
        console.error('Could not fetch profile:', profileError)
        router.push('/login')
        return
      }

      setRole(profile.role as 'owner' | 'customer')
      setLoading(false)
    }

    fetchRole()
  }, [router])

  // Role-based route protection
  useEffect(() => {
    if (!loading && role) {
      if (pathname.includes('/dashboard/owner') && role !== 'owner') {
        router.push('/dashboard/customer');
      } else if (pathname.includes('/dashboard/customer') && role !== 'customer') {
        router.push('/dashboard/owner');
      }
    }
  }, [loading, role, pathname, router]);

  if (loading || !role) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <div className="bg-white border-r border-gray-100 shadow-lg sticky top-0 h-screen">
        <Sidebar role={role} />
      </div>
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  )
}
