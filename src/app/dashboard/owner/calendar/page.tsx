'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function CalendarPage() {
  const [firstName, setFirstName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('first_name')
        .eq('id', user.id)
        .single()
      
      if (error) {
        console.error('Error fetching user name:', error)
      } else if (profile) {
        setFirstName(profile.first_name)
      }
      setLoading(false)
    }

    fetchUserName()
  }, [router])

  if (loading) {
    return <div className="p-6">Loading calendar...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#208A84] mb-4">
        {firstName ? `${firstName}'s Calendar` : 'Company Calendar'}
      </h1>
      <div className="w-full aspect-video border rounded-md shadow-md overflow-hidden">
        <iframe
          src="https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/60bc383c-c303-4500-bdad-e885b1956427/cid-C6EDD37275C5D99C/index.html"
          style={{ border: 0 }}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          title="Company Calendar"
        ></iframe>
      </div>
    </div>
  )
}
