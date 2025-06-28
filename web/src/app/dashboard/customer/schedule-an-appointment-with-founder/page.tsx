"use client"
import { Calendar, Clock, CheckCircle, Phone, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Script from "next/script"

export default function ScheduleAppointmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive" 
      />
      {/* Clean Header */}
      <div className="border-b border-gray-100 bg-gradient-to-br from-white to-emerald-50/30">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-light text-gray-900 mb-6">Schedule Your Consultation</h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Book a personalized session with <span className="text-emerald-600 font-medium">Dr. Raj Madam</span>, our
            founder, and transform your crop nutrition program
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Side - Calendly Embed */}
          <div className="order-2 lg:order-1">
            <Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                {/* Calendly Embed */}
                <div 
                  className="calendly-inline-widget bg-gradient-to-br from-gray-50 to-emerald-50/50 rounded-lg overflow-hidden border border-gray-200 min-h-[500px] flex items-center justify-center"
                  data-url="https://calendly.com/gotosaharsh"
                  style={{ minWidth: '320px', height: '630px' }}
                >
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  A new window will open for the Calendly booking process if the widget does not load.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Info */}
          <div className="order-1 lg:order-2 space-y-12">
            {/* What You'll Get */}
            <div className="space-y-8">
              <h2 className="text-2xl font-light text-gray-900">What you'll get</h2>
              <div className="space-y-6">
                {[
                  "Personalized consultation tailored to your farm",
                  "Expert analysis of your soil and crop needs",
                  "Custom nutrition program recommendations",
                  "Q&A session with Dr. Raj Madam",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting Details */}
            <div className="space-y-8">
              <h2 className="text-2xl font-light text-gray-900">Meeting details</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700 font-light">30 minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700 font-light">Monday - Thursday, 9:00 AM - 5:00 PM PST</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-8">
              <h2 className="text-2xl font-light text-gray-900">Need help?</h2>
              <div className="flex justify-center">
                <span className="inline-block bg-emerald-50 text-emerald-700 font-semibold text-lg rounded-full px-5 py-2 shadow-sm border border-emerald-100 mb-2 mt-2">
                  Dr. Raj Madam
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700 font-light">(415) 654-3128</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700 font-light">rmadam@renu-biome.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 