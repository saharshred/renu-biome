'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'
import { supabase } from '@/lib/supabaseClient'
import {
  AcademicCapIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  IdentificationIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'

const ownerTabs = [
  {
    group: 'Product & Certification',
    items: [
      'Product Labels/Certifications',
      'Presentations',
      'OMRI certifications',
      'EPA',
    ],
  },
  {
    group: 'Sales & Market',
    items: [
      "Walmart/Costco/Home Depot/Lowe's",
      'Sales',
      'Grower Relationship Management (GRM)',
      'Master Blaster Pricing',
    ],
  },
  {
    group: 'Operations',
    items: [
      'Soil/Leaf Tissue Lab Reports',
      'Manufacturers',
      'Inventory Management',
      'Employees',
    ],
  },
  {
    group: 'Finance',
    items: ['Expenses', 'Budget Planning'],
  },
  {
    group: 'Innovation',
    items: [
      'Pipeline of New Products/Innovations',
      'Trial Database',
      'Patents',
    ],
  },
  {
    group: 'General Admin',
    items: ['Calendar'],
  },
]

const customerTabs = [
  {
    group: 'Account Info',
    items: [
      'Unique Legacy Grower Number for Life',
      'Place Purchase Order',
      'Invoices',
      'View/Pay/Print Bill',
    ],
  },
  {
    group: 'Crop Support',
    items: [
      'Soil Analysis',
      'Fertilizer Recommendations',
      'ReNu Legacy Line Crop Nutrition Program',
    ],
  },
  {
    group: 'Support',
    items: [
      'Schedule Consultation',
      'Field Visit Summary',
      'Innovations',
    ],
  },
]

const labelToSlug: Record<string, string> = {
  // Owner
  'Product Labels/Certifications': 'product-labels-certifications',
  'Presentations': 'presentations',
  'OMRI certifications': 'omri-certifications',
  'EPA': 'epa',
  "Walmart/Costco/Home Depot/Lowe's": 'walmart-costco-home-depot-lowes',
  'Sales': 'sales',
  'Grower Relationship Management (GRM)': 'grower-relationship-management-grm',
  'Master Blaster Pricing': 'master-blaster-pricing',
  'Soil/Leaf Tissue Lab Reports': 'soil-leaf-tissue-lab-reports',
  'Manufacturers': 'manufacturers',
  'Inventory Management': 'inventory-management',
  'Employees': 'employees',
  'Expenses': 'expenses',
  'Budget Planning': 'budget-planning',
  'Pipeline of New Products/Innovations': 'pipeline-of-new-products-innovations',
  'Trial Database': 'trial-database',
  'Patents': 'patents',
  'Calendar': 'calendar',
  // Customer
  'Unique Legacy Grower Number for Life': 'unique-legacy-grower-number-for-life',
  'Place Purchase Order': 'place-purchase-order',
  'Invoices': 'invoices',
  'View/Pay/Print Bill': 'view-pay-print-bill',
  'Soil Analysis': 'soil-card',
  'Fertilizer Recommendations': 'fertilizer-recommendations-messages',
  'ReNu Legacy Line Crop Nutrition Program': 'renu-legacy-line-crop-nutrition-program',
  'Schedule Consultation': 'schedule-an-appointment-with-founder',
  'Field Visit Summary': 'field-visit-summary',
  'Innovations': 'innovations',
};

// Map each group to a Heroicon component
const groupIcons: Record<string, React.ReactNode> = {
  // Owner
  'Product & Certification': <AcademicCapIcon className="h-6 w-6" />, // Graduation cap
  'Sales & Market': <BriefcaseIcon className="h-6 w-6" />, // Briefcase
  'Operations': <Cog6ToothIcon className="h-6 w-6" />, // Gear
  'Finance': <CurrencyDollarIcon className="h-6 w-6" />, // Dollar
  'Innovation': <SparklesIcon className="h-6 w-6" />, // Sparkles
  'General Admin': <CalendarDaysIcon className="h-6 w-6" />, // Calendar
  // Customer
  'Account Info': <UserCircleIcon className="h-6 w-6" />, // User
  'Crop Support': <IdentificationIcon className="h-6 w-6" />, // ID card
  'Communication & Summary': <ChatBubbleLeftRightIcon className="h-6 w-6" />, // Chat
};

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[()'/]/g, '')
}

export default function Sidebar({ role }: { role: string }) {
  console.log('Sidebar received role:', role);
  const pathname = usePathname()
  const router = useRouter()
  const tabs = role === 'owner' ? ownerTabs : customerTabs
  const [openGroups, setOpenGroups] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) =>
      prev.includes(group)
        ? prev.filter((g) => g !== group)
        : [...prev, group]
    )
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside
      className={`transition-all duration-300 ease-in-out h-full ${isCollapsed ? 'w-20 p-4' : 'w-72 p-8'} flex flex-col`}
    >
      <div className="flex-shrink-0">
        {/* Top section: Logo (when expanded) or Expand Button (when collapsed) */}
        <div className="flex items-center justify-between w-full mb-2 h-16">
          {!isCollapsed ? (
            // Expanded state: Logo and Collapse Button
            <>
              <button
                onClick={() => router.push(`/dashboard/${role}`)}
                className="group flex items-center gap-3 transition-all duration-300"
                aria-label="Go to Dashboard"
              >
                <Image
                  alt="ReNu-Biome logo and company name"
                  src="/renu-biome-logo-clean.png"
                  width={220}
                  height={60}
                  className="h-[60px] w-auto object-contain my-2"
                  priority
                />
              </button>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                aria-label="Collapse sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </>
          ) : (
            // Collapsed state: Expand Button
            <button
              onClick={() => setIsCollapsed(false)}
              className="flex items-center justify-center w-full h-full p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              aria-label="Expand sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-gray-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Menu */}
      <nav className="flex-1 overflow-y-auto">
        {tabs.map((section, idx) => (
          <div key={section.group} className="space-y-1 mb-2">
            <button
              onClick={() => {
                if (isCollapsed) {
                  // When collapsed, navigate to the first item in the group
                  const firstItemSlug = labelToSlug[section.items[0]];
                  if (firstItemSlug) {
                    router.push(`/dashboard/${role}/${firstItemSlug}`);
                  }
                } else {
                  // When expanded, toggle the group
                  toggleGroup(section.group);
                }
              }}
              className={
                clsx(
                  `w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} text-base font-bold transition-colors rounded-lg`,
                  pathname.includes(labelToSlug[section.items[0]] || '') ? 'bg-[#e6f4f1]' : 'text-gray-800 hover:text-[#208A84]'
                )
              }
              style={{ minHeight: '44px' }}
            >
              <span className="flex items-center gap-3">
                <span className="text-xl" title={section.group}>
                  {isCollapsed ? (
                    <span className="relative group">
                      {groupIcons[section.group] || <Cog6ToothIcon className="h-6 w-6" />}
                      <span className="sr-only">{section.group}</span>
                      {/* Tooltip */}
                      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity duration-200">
                        {section.group}
                      </span>
                    </span>
                  ) : (
                    groupIcons[section.group] || <Cog6ToothIcon className="h-6 w-6" />
                  )}
                </span>
                {!isCollapsed && <span>{section.group}</span>}
              </span>
              {!isCollapsed && (
                <span className="text-[#208A84] text-lg transition-transform duration-200">
                  {openGroups.includes(section.group) ? '▾' : '▸'}
                </span>
              )}
            </button>
            {/* Subsections */}
            {!isCollapsed && openGroups.includes(section.group) && (
              <ul className="mt-2 ml-8 space-y-1">
                {section.items.map((label) => (
                  <li key={label}>
                    <Link
                      href={`/dashboard/${role}/${labelToSlug[label] || ''}`}
                      className={clsx(
                        'block px-3 py-2 rounded text-[15px] font-medium transition-all duration-200',
                        pathname.includes(labelToSlug[label] || '')
                          ? 'bg-[#208A84] text-white shadow-md shadow-[#208A84]/20'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {/* Divider between groups */}
            {idx < tabs.length - 1 && (
              <div className="border-b border-gray-200 my-2" />
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="flex-shrink-0 pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={clsx(
            'w-full flex items-center gap-3 text-base font-bold text-red-600 hover:bg-red-50 p-3 rounded-lg transition-colors',
            isCollapsed && 'justify-center'
          )}
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  )
}
