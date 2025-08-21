'use client'

import { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { fetchSales, Sale } from '@/lib/api/sales'

const COLORS = ['#208A84', '#F6B93B', '#EB2F06', '#60A3BC', '#6D214F', '#00b894']

export default function SalesDashboardPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSales = async () => {
      try {
        setLoading(true)
        const salesData = await fetchSales()
        setSales(salesData)
      } catch (err) {
        setError('Could not load sales data.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadSales()
  }, [])

  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0)
  const totalUnits = sales.reduce((sum, s) => sum + s.units_sold, 0)

  const chartData = sales.reduce((acc, sale) => {
    const existing = acc.find((a) => a.name === sale.product)
    if (existing) {
      existing.value += sale.revenue
    } else {
      acc.push({ name: sale.product, value: sale.revenue })
    }
    return acc
  }, [] as { name: string; value: number }[])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#208A84] mb-4">Sales Overview</h1>
      <p className="text-gray-600 mb-8">Track sales performance and distribution across products.</p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-medium text-gray-600 mb-1">Total Revenue</h2>
          <p className="text-2xl font-bold text-[#208A84]">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-medium text-gray-600 mb-1">Total Units Sold</h2>
          <p className="text-2xl font-bold text-[#208A84]">{totalUnits}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-medium text-gray-600 mb-1">Unique Products</h2>
          <p className="text-2xl font-bold text-[#208A84]">{new Set(sales.map((s) => s.product)).size}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Units Sold</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue ($)</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              sales.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{entry.product}</td>
                  <td className="px-6 py-4">{entry.units_sold}</td>
                  <td className="px-6 py-4">${entry.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4">{entry.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="mt-10 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue by Product</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                innerRadius={50}
                paddingAngle={3}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
