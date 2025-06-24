'use client'

import React, { useState } from 'react';
import { ChartBarIcon, BeakerIcon, SparklesIcon, DocumentTextIcon, CalendarDaysIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface SoilMetric {
  label: string;
  value: string | number;
  unit?: string;
  status: 'Good' | 'Optimal' | 'Needs Adjustment' | 'Low' | 'High';
  description: string;
  icon: React.ReactNode;
}

interface SoilReport {
  reportId: string;
  date: string;
  metrics: SoilMetric[];
  recommendations: string[];
}

const mockSoilReports: SoilReport[] = [
  {
    reportId: 'SR-2024-001',
    date: '2024-06-15',
    metrics: [
      {
        label: 'pH', value: 6.5, status: 'Optimal', description: 'Ideal for most crops, balanced nutrient availability.', unit: '', icon: <BeakerIcon className="h-8 w-8 text-green-500" />
      },
      {
        label: 'Organic Matter', value: '3.8%', status: 'Good', description: 'Healthy organic content, good soil structure and water retention.', icon: <SparklesIcon className="h-8 w-8 text-lime-600" />
      },
      {
        label: 'Nitrogen (N)', value: 'Low', status: 'Needs Adjustment', description: 'Nitrogen levels are currently low; consider a nitrogen-rich amendment.', icon: <ChartBarIcon className="h-8 w-8 text-orange-500" />
      },
      {
        label: 'Phosphorus (P)', value: 'Optimal', status: 'Optimal', description: 'Adequate phosphorus for robust root development and energy transfer.', icon: <ChartBarIcon className="h-8 w-8 text-green-500" />
      },
      {
        label: 'Potassium (K)', value: 'Good', status: 'Good', description: 'Good potassium levels supporting overall plant vigor and disease resistance.', icon: <ChartBarIcon className="h-8 w-8 text-blue-500" />
      },
    ],
    recommendations: [
      'Apply a balanced nitrogen fertilizer based on crop needs.',
      'Consider incorporating cover crops to further boost organic matter.',
      'Monitor phosphorus levels annually to maintain optimal conditions.',
    ],
  },
  {
    reportId: 'SR-2023-09-01',
    date: '2023-09-01',
    metrics: [
      {
        label: 'pH', value: 6.2, status: 'Good', description: 'Slightly acidic, still good for most plants.', unit: '', icon: <BeakerIcon className="h-8 w-8 text-blue-500" />
      },
      {
        label: 'Organic Matter', value: '3.2%', status: 'Needs Adjustment', description: 'Could use more organic matter for improved soil structure.', icon: <SparklesIcon className="h-8 w-8 text-amber-600" />
      },
      {
        label: 'Nitrogen (N)', value: 'Optimal', status: 'Optimal', description: 'Nitrogen levels were good.', icon: <ChartBarIcon className="h-8 w-8 text-green-500" />
      },
      {
        label: 'Phosphorus (P)', value: 'Low', status: 'Needs Adjustment', description: 'Phosphorus levels were low.', icon: <ChartBarIcon className="h-8 w-8 text-orange-500" />
      },
      {
        label: 'Potassium (K)', value: 'Low', status: 'Needs Adjustment', description: 'Potassium levels were low.', icon: <ChartBarIcon className="h-8 w-8 text-red-500" />
      },
    ],
    recommendations: [
      'Increase organic matter with compost.',
      'Apply phosphorus-rich fertilizer.',
      'Add potassium supplements.',
    ],
  },
];

const getStatusColor = (status: SoilMetric['status']) => {
  switch (status) {
    case 'Optimal': return 'bg-green-100 text-green-800';
    case 'Good': return 'bg-blue-100 text-blue-800';
    case 'Needs Adjustment': return 'bg-orange-100 text-orange-800';
    case 'Low': return 'bg-red-100 text-red-800';
    case 'High': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const SoilCardPage = () => {
  const [selectedReport, setSelectedReport] = useState<SoilReport>(mockSoilReports[0]);

  const handleReportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const reportId = event.target.value;
    const report = mockSoilReports.find(r => r.reportId === reportId);
    if (report) {
      setSelectedReport(report);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Your Soil Health Card</h1>

        {/* Report Selector */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <select
              value={selectedReport.reportId}
              onChange={handleReportChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm rounded-md shadow-sm"
            >
              {mockSoilReports.map((report) => (
                <option key={report.reportId} value={report.reportId}>
                  {`Soil Report - ${report.date}`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Current Report Overview */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12">
          <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800">Latest Analysis ({selectedReport.date})</h2>
            <span className="text-gray-500 text-sm flex items-center">
              <CalendarDaysIcon className="h-5 w-5 mr-2" /> Report ID: {selectedReport.reportId}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {selectedReport.metrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-102 hover:shadow-md">
                <div className="flex justify-center mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{metric.label}</h3>
                <p className="text-4xl font-extrabold text-[#208A84] mb-2">{metric.value}{metric.unit}</p>
                <span className={clsx(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  getStatusColor(metric.status)
                )}>
                  {metric.status}
                </span>
                <p className="text-gray-600 text-sm mt-3">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* General Recommendations */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">General Recommendations</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
            {selectedReport.recommendations.length > 0 ? (
              selectedReport.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))
            ) : (
              <li>No specific general recommendations for this report.</li>
            )}
          </ul>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-4">For detailed fertilizer recommendations, please visit the dedicated page.</p>
          <a
            href="/dashboard/customer/fertilizer-recommendations-messages"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#208A84] hover:bg-[#1a6e68] transition-colors duration-200"
          >
            <DocumentTextIcon className="-ml-1 mr-3 h-5 w-5" />
            View Fertilizer Recommendations
          </a>
        </div>
      </div>
    </div>
  );
};

export default SoilCardPage; 