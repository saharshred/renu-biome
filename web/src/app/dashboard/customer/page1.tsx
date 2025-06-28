"use client"

import { useState } from "react"
import {
  TrendingUp,
  Calendar,
  FileText,
  Leaf,
  BarChart3,
  Users,
  Bell,
  ChevronRight,
  Clock,
  Target,
  Award,
  Droplets,
  Sun,
  CloudRain,
  ArrowUpRight,
  Activity,
  Zap,
  CheckCircle,
  Beaker,
  Microscope,
  Sprout,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function CustomerDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")

  // Mock data for the dashboard
  const keyMetrics = [
    {
      title: "Crop Health Score",
      value: "94.2%",
      change: "+5.7%",
      trend: "up",
      icon: Leaf,
      color: "emerald",
      description: "Overall field performance",
    },
    {
      title: "Active Programs",
      value: "3",
      change: "+1",
      trend: "up",
      icon: Target,
      color: "blue",
      description: "Nutrition programs enrolled",
    },
    {
      title: "Yield Projection",
      value: "+18.3%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "orange",
      description: "Above baseline estimate",
    },
    {
      title: "ROI This Season",
      value: "$47.2K",
      change: "+12.4%",
      trend: "up",
      icon: BarChart3,
      color: "purple",
      description: "Return on investment",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Soil Analysis Review",
      description: "Review latest soil test results and recommendations",
      dueDate: "Tomorrow",
      priority: "high",
      type: "analysis",
      icon: Microscope,
    },
    {
      id: 2,
      title: "Field Application - North Block",
      description: "Apply Green Nitrogen Plus to 45-acre north section",
      dueDate: "July 18, 2024",
      priority: "medium",
      type: "application",
      icon: Sprout,
    },
    {
      id: 3,
      title: "Consultant Meeting",
      description: "Monthly check-in with Dr. Sarah Martinez",
      dueDate: "July 22, 2024",
      priority: "medium",
      type: "meeting",
      icon: Users,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "recommendation",
      title: "New fertilizer recommendation available",
      description: "Peptide Nutrition Complex suggested for Block C",
      time: "2 hours ago",
      icon: Beaker,
      color: "blue",
    },
    {
      id: 2,
      type: "analysis",
      title: "Soil analysis completed",
      description: "Results show improved nitrogen levels",
      time: "1 day ago",
      icon: CheckCircle,
      color: "emerald",
    },
    {
      id: 3,
      type: "weather",
      title: "Weather alert",
      description: "Rain expected this weekend - adjust application timing",
      time: "2 days ago",
      icon: CloudRain,
      color: "orange",
    },
  ]

  const weatherData = {
    current: {
      temp: 78,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 8,
    },
    forecast: [
      { day: "Today", high: 82, low: 65, condition: "sunny", icon: Sun },
      { day: "Tomorrow", high: 79, low: 62, condition: "cloudy", icon: CloudRain },
      { day: "Friday", high: 85, low: 68, condition: "sunny", icon: Sun },
      { day: "Saturday", high: 77, low: 60, condition: "rainy", icon: CloudRain },
    ],
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200"
      case "medium":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "low":
        return "bg-green-50 text-green-700 border-green-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 bg-clip-text text-transparent">
                Welcome Back, Jack
              </h1>
              <p className="text-gray-600">Your advanced crop nutrition command center</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Consultation
              </Button>
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-emerald-100 text-emerald-700">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-emerald-600">{metric.change}</span>
                      <span className="text-xs text-gray-500">{metric.description}</span>
                    </div>
                  </div>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
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
                      className={`w-7 h-7 ${
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
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Tasks */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Target className="w-5 h-5 mr-2 text-emerald-600" />
                    Priority Actions
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <task.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{task.dueDate}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-emerald-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.color === "emerald"
                          ? "bg-emerald-100"
                          : activity.color === "blue"
                            ? "bg-blue-100"
                            : "bg-orange-100"
                      }`}
                    >
                      <activity.icon
                        className={`w-5 h-5 ${
                          activity.color === "emerald"
                            ? "text-emerald-600"
                            : activity.color === "blue"
                              ? "text-blue-600"
                              : "text-orange-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Weather & Quick Stats */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Field Weather</h3>
                      <p className="text-blue-100 text-sm">Current conditions</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{weatherData.current.temp}°F</div>
                      <div className="text-blue-100 text-sm">{weatherData.current.condition}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-400/30">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-200" />
                      <div>
                        <div className="text-sm text-blue-100">Humidity</div>
                        <div className="font-semibold">{weatherData.current.humidity}%</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-blue-200" />
                      <div>
                        <div className="text-sm text-blue-100">Wind</div>
                        <div className="font-semibold">{weatherData.current.windSpeed} mph</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-blue-400/30">
                    <h4 className="font-medium text-blue-100">4-Day Forecast</h4>
                    <div className="space-y-2">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <day.icon className="w-4 h-4 text-blue-200" />
                            <span className="text-sm">{day.day}</span>
                          </div>
                          <div className="text-sm">
                            {day.high}° / {day.low}°
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-emerald-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  View Recommendations
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Field Visit
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            {/* Program Status */}
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Award className="w-5 h-5 mr-2 text-emerald-600" />
                  Program Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Green Nitrogen Program</span>
                    <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-500">85% complete - Next application due July 20</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Peptide Nutrition</span>
                    <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-gray-500">60% complete - Mid-season evaluation pending</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Soil Health Program</span>
                    <Badge className="bg-orange-100 text-orange-700">Planning</Badge>
                  </div>
                  <Progress value={25} className="h-2" />
                  <p className="text-xs text-gray-500">25% complete - Soil analysis in progress</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
