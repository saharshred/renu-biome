'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowTrendingUpIcon,
  CubeTransparentIcon,
  UsersIcon,
  WalletIcon,
  DocumentDuplicateIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  min_stock: number;
}

interface Employee {
  id: string;
  name: string;
  position: string;
}

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

export default function OwnerDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [totalSales, setTotalSales] = useState<number | null>(null)
  const [lowStockItems, setLowStockItems] = useState<number | null>(null)
  const [totalEmployees, setTotalEmployees] = useState<number | null>(null)
  const [recentExpenses, setRecentExpenses] = useState<number | null>(null)
  const [activeCustomers, setActiveCustomers] = useState<number | null>(null)
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

      // Fetch Inventory Data
      try {
        const { data: inventoryData, error: inventoryError } = await supabase
          .from('inventory')
          .select('quantity, min_stock')
        if (inventoryError) throw inventoryError
        const lowStockCount = inventoryData.filter(item => item.quantity <= item.min_stock).length
        setLowStockItems(lowStockCount)
      } catch (error: any) {
        console.error('Error fetching inventory:', error.message)
        setLowStockItems(0) // Default to 0 if error
      }

      // Fetch Employee Data
      try {
        const { data: employeesData, error: employeesError } = await supabase
          .from('employees')
          .select('id')
        if (employeesError) throw employeesError
        setTotalEmployees(employeesData.length)
      } catch (error: any) {
        console.error('Error fetching employees:', error.message)
        setTotalEmployees(0) // Default to 0 if error
      }

      // Mock Data for other sections
      setTotalSales(24500) // Example sales
      setRecentExpenses(1200) // Example recent expenses
      setActiveCustomers(156) // Example active customers

      setRecentActivities([
        { id: '1', description: 'Processed new order #2024-001', timestamp: '2 hours ago', link: '/dashboard/owner/sales' },
        { id: '2', description: 'Inventory for Product X reached low stock', timestamp: '5 hours ago', link: '/dashboard/owner/inventory-management' },
        { id: '3', description: 'New employee onboarded: Jane Doe', timestamp: '1 day ago', link: '/dashboard/owner/employees' },
        { id: '4', description: 'Updated Q3 budget forecast', timestamp: '2 days ago', link: '/dashboard/owner/budget-planning' },
        { id: '5', description: 'Customer feedback submitted by Acme Corp.', timestamp: '3 days ago', link: '/dashboard/owner/grower-relationship-management-grm' },
      ])

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-lg text-gray-600">Loading owner dashboard...</p>
      </div>
    )
  }

  return (
    <div className="p-8 animate-fade-in-up">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-[#208A84] mb-2">Welcome, {firstName || 'Owner'}!</h1>
        <p className="text-lg text-gray-600">Your comprehensive overview of ReNu-Biome operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          title="Total Sales"
          value={`$${totalSales?.toLocaleString() || 'N/A'}`}
          icon={<ArrowTrendingUpIcon className="h-8 w-8" />}
          description="Revenue generated in the current period."
          link="/dashboard/owner/sales"
        />
        <DashboardCard
          title="Low Stock Items"
          value={lowStockItems !== null ? lowStockItems : 'N/A'}
          icon={<CubeTransparentIcon className="h-8 w-8" />}
          description="Number of products needing reorder or attention."
          link="/dashboard/owner/inventory-management"
        />
        <DashboardCard
          title="Total Employees"
          value={totalEmployees !== null ? totalEmployees : 'N/A'}
          icon={<UsersIcon className="h-8 w-8" />}
          description="Current count of team members."
          link="/dashboard/owner/employees"
        />
        <DashboardCard
          title="Recent Expenses"
          value={`$${recentExpenses?.toLocaleString() || 'N/A'}`}
          icon={<WalletIcon className="h-8 w-8" />}
          description="Expenditures recorded in the last 7 days."
          link="/dashboard/owner/expenses"
        />
        <DashboardCard
          title="Active Customers"
          value={activeCustomers !== null ? activeCustomers : 'N/A'}
          icon={<ChatBubbleLeftRightIcon className="h-8 w-8" />}
          description="Engaged customers in the last month."
          link="/dashboard/owner/grower-relationship-management-grm"
        />
        <DashboardCard
          title="Upcoming Calendar Events"
          value={5} // Mock data
          icon={<CalendarDaysIcon className="h-8 w-8" />}
          description="Important meetings and deadlines."
          link="/dashboard/owner/calendar"
        />
        <DashboardCard
          title="Pending Certifications"
          value={2} // Mock data
          icon={<DocumentDuplicateIcon className="h-8 w-8" />}
          description="Documents awaiting approval or renewal."
          link="/dashboard/owner/product-labels-certifications"
        />
        <DashboardCard
          title="Tasks Completed (Today)"
          value={8} // Mock data
          icon={<ClipboardDocumentListIcon className="h-8 w-8" />}
          description="Your team's daily progress."
          link="/dashboard/owner/sales"
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
