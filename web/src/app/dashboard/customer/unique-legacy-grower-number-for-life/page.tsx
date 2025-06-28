'use client'

import React from 'react';
import Image from 'next/image';
import { ClipboardDocumentListIcon, CalendarDaysIcon, HandRaisedIcon, StarIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

const Page = () => {
  const legacyGrowerNumber = 'RBNU-007-GL2024'; // Example number, replace with actual data fetching

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(legacyGrowerNumber);
    alert('Legacy Grower Number copied to clipboard!');
  };

  const benefits = [
    {
      icon: <CheckCircleIcon className="h-10 w-10 text-[#208A84]" />,
      title: 'Personalized Support',
      description: 'Receive tailored advice and solutions based on your unique grower profile and history.',
    },
    {
      icon: <ClipboardDocumentListIcon className="h-10 w-10 text-orange-500" />,
      title: 'Streamlined Record-Keeping',
      description: 'All your interactions, purchases, and soil data are consolidated under one easy-to-track identifier.',
    },
    {
      icon: <HandRaisedIcon className="h-10 w-10 text-blue-500" />,
      title: 'Priority Access',
      description: 'Enjoy expedited service and early access to new products, innovations, and expert consultations.',
    },
    {
      icon: <StarIcon className="h-10 w-10 text-purple-500" />,
      title: 'Exclusive Community',
      description: 'Become part of an elite network of growers with access to private forums and special events.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Your Legacy Grower Number</h1>

        {/* Hero Section: Display Number */}
        <div className="bg-gradient-to-br from-green-50 to-[#208A84] rounded-3xl shadow-xl p-10 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="/renu-biome-logo-clean.png" alt="Background pattern" layout="fill" objectFit="cover" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <Image src="/renu-biome-logo-clean.png" alt="ReNu-Biome Logo" width={120} height={120} className="mb-6" />
            <p className="text-white text-lg font-semibold mb-2">Your Lifetime Identifier:</p>
            <div className="flex items-center space-x-4">
              <span className="text-5xl sm:text-6xl font-bold text-white tracking-wide drop-shadow-lg">
                {legacyGrowerNumber}
              </span>
              <button
                onClick={handleCopyToClipboard}
                className="p-3 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                aria-label="Copy number to clipboard"
              >
                <ClipboardDocumentListIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="text-white text-opacity-80 mt-4 max-w-2xl">
              This unique number is your key to personalized support, streamlined services, and exclusive benefits with ReNu-Biome for life.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Your Legacy Number Matters</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            It streamlines your experience, enhances our support, and unlocks a world of opportunities tailored just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action / Support */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Questions About Your Legacy Number?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help. Reach out if you have any inquiries about your unique identifier or its benefits.
          </p>
          <a
            href="#" // Replace with actual support page link
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#208A84] hover:bg-[#1a6e68] transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page; 