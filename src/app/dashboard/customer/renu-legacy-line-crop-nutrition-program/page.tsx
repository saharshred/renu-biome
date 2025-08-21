'use client'

import React from 'react';
import Image from 'next/image';
import { GlobeAmericasIcon, SunIcon, ChartBarIcon, BoltIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

const ReNuLegacyLinePage = () => {
  const programFeatures = [
    {
      icon: <GlobeAmericasIcon className="h-12 w-12 text-[#208A84] mx-auto" />,
      title: 'Sustainable Soil Health',
      description: 'Enhance your soil\'s natural vitality and long-term fertility with our eco-friendly formulations.',
    },
    {
      icon: <BoltIcon className="h-12 w-12 text-green-500 mx-auto" />,
      title: 'Optimized Nutrient Uptake',
      description: 'Our advanced solutions ensure your crops absorb essential nutrients efficiently, leading to robust growth.',
    },
    {
      icon: <SunIcon className="h-12 w-12 text-yellow-500 mx-auto" />,
      title: 'Increased Yield & Quality',
      description: 'Experience significant improvements in crop yield, quality, and market value with targeted nutrition.',
    },
    {
      icon: <ChartBarIcon className="h-12 w-12 text-blue-500 mx-auto" />,
      title: 'Data-Driven Recommendations',
      description: 'Leverage our analytics for precise recommendations tailored to your specific crop and soil conditions.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">ReNu Legacy Line Crop Nutrition Program</h1>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#208A84] to-green-700 rounded-3xl shadow-xl p-10 mb-16 overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10">
            <Image src="/orange-checkmark.png" alt="Background pattern" layout="fill" objectFit="cover" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Image src="/orange-checkmark.png" alt="ReNu-Biome Logo" width={100} height={100} className="mb-6 drop-shadow-md" />
            <p className="text-white text-5xl sm:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
              Cultivating Tomorrow, Today.
            </p>
            <p className="text-white text-opacity-80 text-xl max-w-3xl mb-8">
              Our flagship program designed to revolutionize your agriculture through advanced nutrition, sustainability, and unparalleled growth.
            </p>
            <a
              href="#contact-specialist" // Link to a contact section or form
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-lg text-[#208A84] bg-white hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              Request Program Details
            </a>
          </div>
        </div>

        {/* Program Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Core Pillars of the Legacy Line</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our program is built on innovative science and a deep commitment to your success and the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {programFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action / FAQ / Contact */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <h2 id="contact-specialist" className="text-2xl font-bold text-gray-800 mb-4">Ready to Transform Your Yield?</h2>
          <p className="text-gray-600 mb-6">
            Our specialists are standing by to discuss how the ReNu Legacy Line can specifically benefit your farm.
          </p>
          <a
            href="#" // Placeholder for a contact form or booking link
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#208A84] hover:bg-[#1a6e68] transition-colors duration-200"
          >
            Connect with a Specialist
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReNuLegacyLinePage; 