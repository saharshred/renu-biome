"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import {
  TrendingUp,
  DollarSign,
  Users,
  Package,
  BarChart3,
  Activity,
  Leaf,
  Beaker,
  Droplets,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Bell,
  Download,
  Filter,
  Eye,
  Target,
  Microscope,
  FlaskConical,
  Sprout,
  Bug,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function OwnerDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")
  const [firstName, setFirstName] = useState<string | null>(null)
  const [totalRevenue, setTotalRevenue] = useState<string>("$2.4M")
  const [activeCustomers, setActiveCustomers] = useState<string>("8,429")
  const [productsSold, setProductsSold] = useState<string>("12,847")
  const [marketReach, setMarketReach] = useState<string>("94.2%")
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  // Fetch real data from Supabase where possible
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
        setFirstName(null)
      }
      // Example: fetch real data for metrics if available
      // For now, keep mock data for demo
      setTotalRevenue("$2.4M")
      setActiveCustomers("8,429")
      setProductsSold("12,847")
      setMarketReach("94.2%")
      setRecentActivity([
        {
          type: "order",
          title: "Large Order - Green Valley Farms",
          amount: "$12,450",
          time: "2 hours ago",
          status: "completed",
          icon: Package,
        },
        {
          type: "customer",
          title: "New Customer Registration",
          amount: "Sunrise Agriculture Co.",
          time: "4 hours ago",
          status: "active",
          icon: Users,
        },
        {
          type: "product",
          title: "Low Stock Alert - Bee Bloom",
          amount: "47 units remaining",
          time: "6 hours ago",
          status: "warning",
          icon: Bell,
        },
        {
          type: "revenue",
          title: "Monthly Target Achieved",
          amount: "104% of goal",
          time: "8 hours ago",
          status: "success",
          icon: Target,
        },
      ])
      setLoading(false)
    }
    fetchData()
  }, [router])

  // Key metrics (can be replaced with real data as needed)
  const keyMetrics = [
    {
      title: "Total Revenue",
      value: totalRevenue,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "emerald",
      description: "Monthly recurring revenue",
      href: "/dashboard/owner/sales",
    },
    {
      title: "Active Customers",
      value: activeCustomers,
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "blue",
      description: "Registered farm operations",
      href: "/dashboard/owner/grower-relationship-management-grm",
    },
    {
      title: "Products Sold",
      value: productsSold,
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "orange",
      description: "Units moved this month",
      href: "/dashboard/owner/inventory-management",
    },
    {
      title: "Market Reach",
      value: marketReach,
      change: "+5.7%",
      trend: "up",
      icon: Globe,
      color: "purple",
      description: "Geographic coverage",
      href: "/dashboard/owner/presentations",
    },
  ]

  const productCategories = [
    {
      name: "Green Nitrogen",
      sales: "$485K",
      growth: "+15.2%",
      trend: "up",
      icon: Leaf,
      color: "emerald",
      units: "2,847",
      description: "Sustainable nitrogen solutions",
    },
    {
      name: "Peptide Nutrition",
      sales: "$392K",
      growth: "+8.7%",
      trend: "up",
      icon: Microscope,
      color: "blue",
      units: "1,923",
      description: "Advanced protein compounds",
    },
    {
      name: "Fermentation",
      sales: "$298K",
      growth: "-3.2%",
      trend: "down",
      icon: FlaskConical,
      color: "purple",
      units: "1,456",
      description: "Microbial fermentation products",
    },
    {
      name: "Bee Bloom",
      sales: "$245K",
      growth: "+22.1%",
      trend: "up",
      icon: Bug,
      color: "yellow",
      units: "987",
      description: "Pollinator enhancement",
    },
    {
      name: "Organic Line",
      sales: "$189K",
      growth: "+11.4%",
      trend: "up",
      icon: Sprout,
      color: "green",
      units: "1,234",
      description: "Certified organic solutions",
    },
  ]

  const regionalData = [
    { region: "Midwest", percentage: 37, sales: "$892K", growth: "+14.2%" },
    { region: "Southeast", percentage: 27, sales: "$654K", growth: "+8.9%" },
    { region: "West Coast", percentage: 22, sales: "$523K", growth: "+18.7%" },
    { region: "Northeast", percentage: 14, sales: "$331K", growth: "+5.3%" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-lg text-gray-600">Loading owner dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-orange-50/20 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Microscope className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                  <Leaf className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Welcome, Saharsh
                </h1>
                <p className="text-lg text-gray-500 font-medium">Owner Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 text-sm font-semibold shadow-sm">
                <Activity className="w-4 h-4 mr-1" />
                Live Data
              </Badge>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1 text-sm font-semibold shadow-sm">
                <Beaker className="w-4 h-4 mr-1" />
                Microbe Analytics
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36 h-10 rounded-lg border-gray-200 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="rounded-lg border-gray-200 shadow-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 rounded-lg shadow-md">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => {
            const CardContentEl = (
              <CardContent className="p-7">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold text-gray-600">{metric.title}</p>
                      {metric.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-4xl font-extrabold text-gray-900">{metric.value}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-base font-bold ${metric.trend === "up" ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {metric.change}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{metric.description}</span>
                    </div>
                  </div>
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md ${
                      metric.color === "emerald"
                        ? "bg-emerald-100"
                        : metric.color === "blue"
                          ? "bg-blue-100"
                          : metric.color === "orange"
                            ? "bg-orange-100"
                            : "bg-purple-100"
                    }`}
                  >
                    <metric.icon
                      className={`w-8 h-8 ${
                        metric.color === "emerald"
                          ? "text-emerald-600"
                          : metric.color === "blue"
                            ? "text-blue-600"
                            : metric.color === "orange"
                              ? "text-orange-600"
                              : "text-purple-600"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            );
            return metric.href ? (
              <Link href={metric.href} key={index} className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-2xl">
                <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-md hover:shadow-2xl transition-all duration-300 group rounded-2xl hover:ring-2 hover:ring-orange-200">
                  {CardContentEl}
                </Card>
              </Link>
            ) : (
              <Card
                key={index}
                className="border-0 shadow-xl bg-white/95 backdrop-blur-md transition-all duration-300 group rounded-2xl"
              >
                {CardContentEl}
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 border-0 shadow-xl bg-white/95 backdrop-blur-md rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                    Revenue Analytics
                  </CardTitle>
                  <p className="text-base text-gray-500">The Power of Microbes — Financial Impact</p>
                </div>
                <Button variant="ghost" size="sm" className="rounded-lg">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-br from-orange-50 via-emerald-50 to-blue-50 rounded-xl flex items-center justify-center relative overflow-hidden border border-orange-100">
                {/* Simulated Chart Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-orange-200/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-3/4 h-4/5 bg-gradient-to-t from-emerald-200/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-1/2 h-3/5 bg-gradient-to-t from-blue-200/50 to-transparent" />
                </div>
                <div className="text-center space-y-4 z-10">
                  <div className="flex items-center justify-center gap-3">
                    <TrendingUp className="w-10 h-10 text-orange-600" />
                    <Microscope className="w-10 h-10 text-emerald-600" />
                  </div>
                  <p className="text-gray-700 font-semibold text-lg">Advanced Crop Nutrition Revenue Trends</p>
                  <p className="text-sm text-gray-400">Interactive analytics dashboard</p>
                  <div className="flex items-center justify-center gap-8 pt-4">
                    <div className="text-center">
                      <div className="text-3xl font-extrabold text-orange-600">{totalRevenue}</div>
                      <div className="text-xs text-gray-500">This Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-extrabold text-emerald-600">+12.5%</div>
                      <div className="text-xs text-gray-500">Growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-md rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Live Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shadow-md ${
                      activity.status === "completed" || activity.status === "success"
                        ? "bg-emerald-100"
                        : activity.status === "warning"
                          ? "bg-orange-100"
                          : "bg-blue-100"
                    }`}
                  >
                    <activity.icon
                      className={`w-6 h-6 ${
                        activity.status === "completed" || activity.status === "success"
                          ? "text-emerald-600"
                          : activity.status === "warning"
                            ? "text-orange-600"
                            : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.amount}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Product Categories Performance */}
        <div className="pt-2">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-md rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-orange-600" />
                    Product Category Performance
                  </CardTitle>
                  <p className="text-base text-gray-500">Advanced Crop Nutrition Product Lines</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-lg border-gray-200 shadow-sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {productCategories.map((category, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group bg-white flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-11 h-11 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md ${
                          category.color === "emerald"
                            ? "bg-emerald-100"
                            : category.color === "blue"
                              ? "bg-blue-100"
                              : category.color === "purple"
                                ? "bg-purple-100"
                                : category.color === "yellow"
                                  ? "bg-yellow-100"
                                  : "bg-green-100"
                        }`}
                      >
                        <category.icon
                          className={`w-6 h-6 ${
                            category.color === "emerald"
                              ? "text-emerald-600"
                              : category.color === "blue"
                                ? "text-blue-600"
                                : category.color === "purple"
                                  ? "text-purple-600"
                                  : category.color === "yellow"
                                    ? "text-yellow-600"
                                    : "text-green-600"
                          }`}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        {category.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm font-bold ${
                            category.trend === "up" ? "text-emerald-600" : "text-red-600"
                          }`}
                        >
                          {category.growth}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{category.name}</h3>
                      <p className="text-xs text-gray-400">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">{category.sales}</span>
                        <span className="text-sm text-gray-500">{category.units} units</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-md rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600" />
                Regional Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {regionalData.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-700">{region.region}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-gray-900">{region.sales}</span>
                      <span className="text-xs text-emerald-600 font-bold">{region.growth}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={region.percentage} className="flex-1 h-2 rounded-full" />
                    <span className="text-xs text-gray-400 w-8">{region.percentage}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl">
            <CardContent className="p-7">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <Microscope className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">The Power of Microbes</h3>
                    <p className="text-orange-100 text-base">Advanced Crop Nutrition Impact</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-100">Soil Health Improvement</span>
                    <span className="font-bold text-lg">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-100">Crop Yield Increase</span>
                    <span className="font-bold text-lg">+23.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-100">Sustainable Practices</span>
                    <span className="font-bold text-lg">91.8%</span>
                  </div>
                </div>
                <Button variant="secondary" className="w-full mt-4 rounded-lg bg-white/20 text-white hover:bg-white/30">
                  <Droplets className="w-5 h-5 mr-2" />
                  View Microbe Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
