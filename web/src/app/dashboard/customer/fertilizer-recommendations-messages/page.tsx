'use client'

import React, { useState } from 'react'
import { BeakerIcon, SparklesIcon, ChartBarIcon, MagnifyingGlassIcon, ChevronDownIcon, TagIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

interface Fertilizer {
  id: string;
  name: string;
  type: 'Organic' | 'Synthetic' | 'Bio-Fertilizer';
  npkRatio: string;
  description: string;
  applicationRate: string;
  timing: string;
  benefits: string[];
  precautions: string[];
  icon: React.ReactNode;
  bestFor: string[];
  price: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  recommendationDate: string;
  notes: string;
}

const mockFertilizers: Fertilizer[] = [
  {
    id: 'F001',
    name: 'Balanced NPK Complete',
    type: 'Synthetic',
    npkRatio: '10-10-10',
    description: 'A balanced, all-purpose fertilizer suitable for most crops and soil types. Ideal for general plant health and growth across seasons.',
    applicationRate: '2-3 lbs per 100 sq ft',
    timing: 'Early spring and mid-summer',
    benefits: [
      'Promotes balanced growth',
      'Improves overall plant health',
      'Enhances nutrient uptake',
      'Suitable for most crops'
    ],
    precautions: [
      'Avoid over-application to prevent nutrient runoff.',
      'Keep away from water sources to prevent contamination.',
      'Store in a cool, dry place away from direct sunlight.'
    ],
    icon: <BeakerIcon className="h-8 w-8 text-blue-500" />,
    bestFor: ['Vegetables', 'Fruits', 'Flowers', 'Lawns'],
    price: '$24.99 per 5lb bag',
    status: 'In Stock',
    recommendationDate: '2024-06-01',
    notes: 'Recommended for general maintenance and pre-planting application.',
  },
  {
    id: 'F002',
    name: 'Organic Compost Blend',
    type: 'Organic',
    npkRatio: '3-2-2',
    description: 'Rich in organic matter and beneficial microorganisms for soil health. Builds long-term soil fertility.',
    applicationRate: '1-2 inches layer',
    timing: 'Fall or early spring',
    benefits: [
      'Improves soil structure',
      'Increases water retention',
      'Provides slow-release nutrients',
      'Enhances microbial activity'
    ],
    precautions: [
      'Ensure proper composting to avoid pathogens.',
      'Monitor moisture levels to maintain microbial activity.',
      'Avoid fresh manure to prevent burning plants.'
    ],
    icon: <SparklesIcon className="h-8 w-8 text-green-500" />,
    bestFor: ['Soil improvement', 'Vegetable gardens', 'Flower beds'],
    price: '$19.99 per 20lb bag',
    status: 'Low Stock',
    recommendationDate: '2024-05-20',
    notes: 'Excellent for enriching depleted soils and establishing new beds.',
  },
  {
    id: 'F003',
    name: 'Phosphorus Boost',
    type: 'Synthetic',
    npkRatio: '0-20-0',
    description: 'High-phosphorus fertilizer for root development and flowering. Essential for new plantings and fruit set.',
    applicationRate: '1-2 lbs per 100 sq ft',
    timing: 'Early spring',
    benefits: [
      'Boosts root development',
      'Enhances flowering and fruiting',
      'Improves energy transfer',
      'Supports seed formation'
    ],
    precautions: [
      'Use only when phosphorus is deficient as per soil test.',
      'Avoid runoff into water bodies due to environmental concerns.',
      'Follow soil test recommendations precisely to avoid excess.'
    ],
    icon: <ChartBarIcon className="h-8 w-8 text-purple-500" />,
    bestFor: ['Flowering plants', 'Fruit trees', 'Root crops'],
    price: '$29.99 per 5lb bag',
    status: 'In Stock',
    recommendationDate: '2024-04-15',
    notes: 'Critically important for new fruit tree plantings and spring bloomers.',
  },
  {
    id: 'F004',
    name: 'Nitrogen Pro Growth',
    type: 'Synthetic',
    npkRatio: '30-0-0',
    description: 'Fast-acting nitrogen for rapid leaf and stem growth. Ideal for leafy greens and grasses.',
    applicationRate: '1 lb per 100 sq ft',
    timing: 'Early growing season',
    benefits: [
      'Rapid vegetative growth',
      'Increased leaf size and color',
      'Boosts overall plant vigor'
    ],
    precautions: [
      'Can cause burn if over-applied.',
      'Leaches easily, apply frequently in small doses.',
      'Wear gloves during application.'
    ],
    icon: <TagIcon className="h-8 w-8 text-red-500" />,
    bestFor: ['Leafy greens', 'Corn', 'Grasses'],
    price: '$22.50 per 5lb bag',
    status: 'In Stock',
    recommendationDate: '2024-05-10',
    notes: 'Great for a quick green-up and boosting early season growth.',
  },
  {
    id: 'F005',
    name: 'Bio-Stimulant Boost',
    type: 'Bio-Fertilizer',
    npkRatio: '1-0-0',
    description: 'Enhances nutrient availability and plant stress tolerance through beneficial microbes.',
    applicationRate: 'Liquid concentrate, follow dilution rates',
    timing: 'Throughout growing season',
    benefits: [
      'Improves nutrient uptake efficiency',
      'Increases drought resistance',
      'Enhances soil microbial diversity'
    ],
    precautions: [
      'Store away from direct sunlight.',
      'Do not mix with harsh chemicals.',
      'Apply when soil is moist.'
    ],
    icon: <SparklesIcon className="h-8 w-8 text-yellow-500" />,
    bestFor: ['All crops', 'Stress recovery', 'Soil revitalization'],
    price: '$35.00 per 1 liter',
    status: 'In Stock',
    recommendationDate: '2024-06-05',
    notes: 'Excellent for overall plant resilience and reducing the need for synthetic inputs.',
  }
];

const getStatusColor = (status: Fertilizer['status']) => {
  switch (status) {
    case 'In Stock': return 'bg-green-100 text-green-800';
    case 'Low Stock': return 'bg-orange-100 text-orange-800';
    case 'Out of Stock': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const FertilizerCard = ({ fertilizer }: { fertilizer: Fertilizer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-[1.005] hover:shadow-2xl flex flex-col">
      <div className="p-7 flex-grow">
        <div className="flex items-start space-x-5 mb-5">
          <div className="flex-shrink-0 mt-1">
            {fertilizer.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">{fertilizer.name}</h3>
              <span className={clsx(
                "px-4 py-1 text-sm font-semibold rounded-full tracking-wide",
                fertilizer.type === 'Organic' ? "bg-green-100 text-green-800" :
                fertilizer.type === 'Synthetic' ? "bg-blue-100 text-blue-800" :
                "bg-purple-100 text-purple-800"
              )}>
                {fertilizer.type}
              </span>
            </div>
            <p className="text-md text-gray-600 font-medium">NPK Ratio: <span className="font-bold text-gray-700">{fertilizer.npkRatio}</span></p>
            <p className="text-gray-700 mt-4 text-base leading-relaxed">{fertilizer.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm mt-5 border-t pt-5 border-gray-100">
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-28">Application:</span>
            <span className="text-gray-600 flex-grow">{fertilizer.applicationRate}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-28">Timing:</span>
            <span className="text-gray-600 flex-grow">{fertilizer.timing}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-28">Price:</span>
            <span className="text-gray-600 flex-grow">{fertilizer.price}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-28">Status:</span>
            <span className={clsx("px-3 py-1 text-xs font-semibold rounded-full", getStatusColor(fertilizer.status))}>
              {fertilizer.status}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-28">Rec. Date:</span>
            <span className="text-gray-600 flex-grow">{fertilizer.recommendationDate}</span>
          </div>
        </div>

        <div className="mt-7">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Best For:</h4>
          <div className="flex flex-wrap gap-2.5">
            {fertilizer.bestFor.map((item, idx) => (
              <span key={idx} className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-[#208A84] bg-opacity-15 text-[#1a6e68] tracking-wide">
                {item}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-8 w-full flex items-center justify-center text-[#208A84] hover:text-[#1a6e68] text-sm font-semibold py-2.5 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#208A84] focus:ring-opacity-50 group"
        >
          {isExpanded ? (
            <><ChevronUpIcon className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110" /> Show Less</>
          ) : (
            <><ChevronDownIcon className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110" /> Show More</>
          )}
        </button>

        {isExpanded && (
          <div className="mt-8 pt-7 border-t border-gray-100 animate-fade-in space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2.5">Benefits:</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5">
                {fertilizer.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2.5">Precautions:</h4>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1.5">
                {fertilizer.precautions.map((precaution, idx) => (
                  <li key={idx}>{precaution}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2.5">Notes:</h4>
              <p className="text-gray-600 text-sm">{fertilizer.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FertilizerRecommendationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredFertilizers = mockFertilizers.filter(fertilizer => {
    const matchesSearch = fertilizer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fertilizer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || fertilizer.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-[#208A84] text-center mb-14 animate-fade-in-down drop-shadow-md">Fertilizer Recommendations</h1>

        {/* Search and Filter Section */}
        <div className="mb-12 flex flex-col sm:flex-row gap-5 bg-white p-7 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search recommendations..."
              className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-base transition-all duration-200 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="block w-full sm:w-52 pl-4 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-base rounded-lg shadow-sm transition-all duration-200 appearance-none"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Organic">Organic</option>
            <option value="Synthetic">Synthetic</option>
            <option value="Bio-Fertilizer">Bio-Fertilizer</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 sm:w-52 ml-auto">
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </div>

        {/* Fertilizer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFertilizers.length > 0 ? (
            filteredFertilizers.map((fertilizer) => (
              <FertilizerCard key={fertilizer.id} fertilizer={fertilizer} />
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-gray-500 text-xl rounded-xl bg-white shadow-lg border border-gray-100">
              No matching fertilizer recommendations found.
            </div>
          )}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center py-8 bg-white rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
          <p className="text-xl text-gray-700 mb-5 font-semibold">Need a personalized recommendation or have questions?</p>
          <Link
            href="/dashboard/customer/schedule-an-appointment-with-founder"
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-[#208A84] hover:bg-[#1a6e68] transition-colors duration-200 transform hover:scale-105"
          >
            <ChatBubbleLeftRightIcon className="-ml-1 mr-3 h-5 w-5" />
            Contact a Specialist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FertilizerRecommendationsPage; 