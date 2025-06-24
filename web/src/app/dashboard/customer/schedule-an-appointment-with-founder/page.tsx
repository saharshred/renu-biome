'use client'

import { Calendar, Info, Mail, Phone, Clock } from 'lucide-react'
import Script from 'next/script'

export default function ScheduleAppointmentPage() {

  return (
    <>
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive" 
      />
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#208A84] mb-2">Schedule an Appointment</h1>
          <p className="text-lg text-gray-600">Book a personalized consultation with our founder.</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Calendly Embed */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="mr-3 text-[#208A84]" />
                Select a Date & Time
              </h2>
              
              <div 
                className="calendly-inline-widget rounded-lg overflow-hidden border border-gray-200" 
                data-url="https://calendly.com/gotosaharsh" 
                style={{ minWidth: '320px', height: '630px' }}
              >
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                A new window will open for the Calendly booking process if the widget does not load.
              </p>
            </div>

            {/* Right Column: Information */}
            <div className="lg:col-span-1">
              {/* What to Expect */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Info className="mr-3 text-[#208A84]" />
                  What to Expect
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start"><span className="font-bold text-[#208A84] mr-2">✓</span>Personalized consultation tailored to your farm</li>
                  <li className="flex items-start"><span className="font-bold text-[#208A84] mr-2">✓</span>Expert analysis of your soil and crop needs</li>
                  <li className="flex items-start"><span className="font-bold text-[#208A84] mr-2">✓</span>Custom nutrition program recommendations</li>
                  <li className="flex items-start"><span className="font-bold text-[#208A84] mr-2">✓</span>Q&A session with an industry expert</li>
                </ul>
              </div>
              
              {/* Available Times */}
              <div className="mb-8 p-6 bg-green-50/50 border border-green-100 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <Clock className="mr-3 text-[#208A84]" />
                      Available Hours
                  </h3>
                  <p className="text-gray-600">
                      Our founder is generally available during the following hours. Please check Calendly for specific openings.
                  </p>
                  <div className="mt-4 text-center font-medium text-[#1a6e68]">
                      <p>Monday - Thursday</p>
                      <p>9:00 AM - 5:00 PM</p>
                  </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Phone className="mr-3 text-[#208A84]" size={18} />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="mr-3 text-[#208A84]" size={18} />
                    <span>founder@renu-biome.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 