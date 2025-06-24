'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  UserCircleIcon,
  DocumentTextIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'

interface RecentActivity {
  id: string;
  description: string;
  timestamp: string;
  link?: string;
}

const DashboardCard = ({ title, value, icon, description, link }: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
  link?: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between h-full transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="text-[#208A84] text-3xl">{icon}</div>
    </div>
    <p className="text-4xl font-extrabold text-[#208A84] mb-2">{value}</p>
    <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
    {link && (
      <Link href={link} className="text-[#1a6e68] hover:underline text-sm font-medium self-end">
        View Details →
      </Link>
    )}
  </div>
)

const RecentActivityItem = ({ activity }: { activity: RecentActivity }) => (
  <li className="flex items-start justify-between py-4 px-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
    <div className="flex items-center flex-grow">
      <InformationCircleIcon className="h-5 w-5 text-[#208A84] mr-3 flex-shrink-0" />
      <p className="text-gray-800 text-sm font-medium flex-grow">
        {activity.description}
        {activity.link && (
          <Link href={activity.link} className="text-[#1a6e68] hover:underline ml-2 text-xs">
            View Details
          </Link>
        )}
      </p>
    </div>
    <span className="text-gray-500 text-xs font-light flex-shrink-0 ml-4">{activity.timestamp}</span>
  </li>
)

export default function CustomerDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [growerId, setGrowerId] = useState<string | null>(null)
  const [invoicesDue, setInvoicesDue] = useState<number | null>(null)
  const [soilCardStatus, setSoilCardStatus] = useState<string | null>(null)
  const [nextRecommendation, setNextRecommendation] = useState<string | null>(null)
  const [upcomingAppointments, setUpcomingAppointments] = useState<number | null>(null)
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Fetch user's first name
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', user.id)
          .single()

        if (error) throw error
        if (profile) {
          setFirstName(profile.first_name)
        }
      } catch (error: any) {
        console.error("Error fetching user's first name:", error.message)
      }

      // Mock Data for customer sections
      setGrowerId('RB-001')
      setInvoicesDue(2)
      setSoilCardStatus('Review Pending')
      setNextRecommendation('July 15, 2024')
      setUpcomingAppointments(1)

      setRecentActivities([
        { id: '1', description: 'New fertilizer recommendation available', timestamp: '1 day ago', link: '/dashboard/customer/fertilizer-recommendations-messages' },
        { id: '2', description: 'Your invoice #INV-2024-005 is due', timestamp: '3 days ago', link: '/dashboard/customer/invoices' },
        { id: '3', description: 'Field visit summary uploaded for your farm', timestamp: '5 days ago', link: '/dashboard/customer/field-visit-summary' },
        { id: '4', description: 'New innovation insights shared', timestamp: '1 week ago', link: '/dashboard/customer/innovations' },
        { id: '5', description: 'Appointment scheduled with founder for July 10', timestamp: '1 week ago', link: '/dashboard/customer/schedule-an-appointment-with-founder' },
      ])

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-lg text-gray-600">Loading customer dashboard...</p>
      </div>
    )
  }

  return (
    <div className="p-8 animate-fade-in-up">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-[#208A84] mb-2">Welcome, {firstName || 'Valued Customer'}!</h1>
        <p className="text-lg text-gray-600">Your personalized portal for crop insights and support.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          title="Legacy Grower ID"
          value={growerId || 'N/A'}
          icon={<UserCircleIcon className="h-8 w-8" />}
          description="Your unique identification number."
          link="/dashboard/customer/unique-legacy-grower-number-for-life"
        />
        <DashboardCard
          title="Invoices Due"
          value={invoicesDue !== null ? invoicesDue : 'N/A'}
          icon={<DocumentTextIcon className="h-8 w-8" />}
          description="Number of pending invoices."
          link="/dashboard/customer/invoices"
        />
        <DashboardCard
          title="Soil Card Status"
          value={soilCardStatus || 'N/A'}
          icon={<BeakerIcon className="h-8 w-8" />}
          description="Latest update on your soil health."
          link="/dashboard/customer/soil-card"
        />
        <DashboardCard
          title="Next Recommendation"
          value={nextRecommendation || 'N/A'}
          icon={<ClipboardDocumentListIcon className="h-8 w-8" />}
          description="Date for your next fertilizer recommendation."
          link="/dashboard/customer/fertilizer-recommendations-messages"
        />
        <DashboardCard
          title="Upcoming Appointments"
          value={upcomingAppointments !== null ? upcomingAppointments : 'N/A'}
          icon={<CalendarDaysIcon className="h-8 w-8" />}
          description="Scheduled meetings and field visits."
          link="/dashboard/customer/schedule-an-appointment-with-founder"
        />
        <DashboardCard
          title="New Field Visit Summaries"
          value={1} // Mock data
          icon={<ChatBubbleLeftRightIcon className="h-8 w-8" />}
          description="Latest reports from our field experts."
          link="/dashboard/customer/field-visit-summary"
        />
        <DashboardCard
          title="New Innovations"
          value={3} // Mock data
          icon={<ChatBubbleLeftRightIcon className="h-8 w-8" />}
          description="Discover the latest from ReNu-Biome."
          link="/dashboard/customer/innovations"
        />
        <DashboardCard
          title="Programs Enrolled"
          value={1} // Mock data
          icon={<ClipboardDocumentListIcon className="h-8 w-8" />}
          description="Your ReNu Legacy Line Crop Nutrition Program status."
          link="/dashboard/customer/renu-legacy-line-crop-nutrition-program"
        />
      </div>

      <section className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity & Updates</h2>
        <ul className="divide-y divide-gray-100">
          {recentActivities.length > 0 ? (
            recentActivities.map(activity => (
              <RecentActivityItem key={activity.id} activity={activity} />
            ))
          ) : (
            <li className="py-3 text-center text-gray-500">No recent activity to display.</li>
          )}
        </ul>
      </section>
    </div>
  )
}
