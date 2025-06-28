'use client'
import { useState } from 'react';
import { FileText, Maximize2, TrendingUp, Bell } from 'lucide-react';
import {
  LineChart,
  Line as ReLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  ResponsiveContainer,
} from 'recharts';

const mockReports = [
  { label: 'June 15, 2024', value: '2024-06-15', file: '/soil-analysis.pdf' },
  { label: 'September 1, 2023', value: '2023-09-01', file: '/soil-analysis.pdf' },
];

// Mock data for graphs (Recharts expects array of objects)
const soilTrends = [
  { month: 'Jan', nitrogen: 5, phosphorus: 20 },
  { month: 'Feb', nitrogen: 7, phosphorus: 18 },
  { month: 'Mar', nitrogen: 10, phosphorus: 16 },
  { month: 'Apr', nitrogen: 12, phosphorus: 14 },
  { month: 'May', nitrogen: 14, phosphorus: 13 },
  { month: 'Jun', nitrogen: 15, phosphorus: 12 },
];

export default function SoilCardPage() {
  const [selectedReport, setSelectedReport] = useState(mockReports[0]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: { color: '#334155', font: { size: 14, weight: 'bold' as const } },
      },
      title: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { ticks: { color: '#64748b', font: { size: 13 } } },
      y: { ticks: { color: '#64748b', font: { size: 13 } }, beginAtZero: true },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex flex-col items-center justify-start pt-2 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center mb-8 mt-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-black text-center">
          Soil Analysis Report
        </h1>
      </div>
      {/* Minimal Dropdown */}
      <div className="w-full max-w-3xl mb-8 flex justify-center">
        <select
          value={selectedReport.value}
          onChange={e => {
            const found = mockReports.find(r => r.value === e.target.value);
            if (found) setSelectedReport(found);
          }}
          className="block w-full max-w-xs px-4 py-2 border border-emerald-200 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 bg-white text-lg font-medium text-gray-800"
        >
          <option value="" disabled>Select Report Date</option>
          {mockReports.map(report => (
            <option key={report.value} value={report.value}>{report.label}</option>
          ))}
        </select>
      </div>
      {/* PDF Viewer Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 flex flex-col items-center">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            <span className="font-semibold text-gray-800 text-lg">{selectedReport.label} PDF</span>
          </div>
          <div className="flex gap-2">
            <a
              href={selectedReport.file}
              download
              className="inline-flex items-center px-4 py-2 border border-emerald-200 rounded-full bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-100 transition-colors text-sm shadow-sm"
            >
              Download PDF
            </a>
            <a
              href={selectedReport.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-emerald-200 rounded-full bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-100 transition-colors text-sm shadow-sm"
            >
              <Maximize2 className="w-4 h-4 mr-2" /> Full Screen
            </a>
          </div>
        </div>
        <div className="w-full border-2 border-emerald-100 rounded-xl overflow-hidden bg-emerald-50/20 shadow-inner">
          <iframe
            src={selectedReport.file}
            title="Soil Analysis PDF"
            className="w-full h-[70vh] min-h-[400px] rounded-xl"
          >
          </iframe>
        </div>
        <p className="text-gray-500 text-center mt-4 text-sm">
          If the PDF does not display, <a href={selectedReport.file} className="text-emerald-700 underline font-medium">click here to download the report</a>.
        </p>
      </div>
      {/* Graphs Section */}
      <div className="w-full max-w-4xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 flex flex-col items-center">
          <div className="w-full flex items-center mb-0.5">
            <span className="inline-block w-4 h-4 rounded-full bg-emerald-400 mr-2"></span>
            <h2 className="text-lg font-sans font-medium text-gray-900 tracking-tight">Nitrogen Levels Over Time</h2>
          </div>
          <div className="w-full mb-3 ml-6">
            <span className="text-sm text-gray-400 font-sans">Showing positive growth trend</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={soilTrends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={13} tickLine={false} axisLine={false} >
                <text x="50%" y={40} textAnchor="middle" fill="#64748b" fontSize="13" fontFamily="inherit">Month</text>
              </XAxis>
              <YAxis stroke="#64748b" fontSize={13} tickLine={false} axisLine={false} >
                <text x={-30} y={120} transform="rotate(-90)" textAnchor="middle" fill="#10b981" fontSize="13" fontFamily="inherit">Nitrogen (ppm)</text>
              </YAxis>
              <ReTooltip contentStyle={{ borderRadius: 12, fontSize: 14 }} />
              <ReLine type="monotone" dataKey="nitrogen" name="Nitrogen (ppm)" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 flex flex-col items-center">
          <div className="w-full flex items-center mb-0.5">
            <span className="inline-block w-4 h-4 rounded-full bg-indigo-400 mr-2"></span>
            <h2 className="text-lg font-sans font-medium text-gray-900 tracking-tight">Phosphorus Levels Over Time</h2>
          </div>
          <div className="w-full mb-3 ml-6">
            <span className="text-sm text-gray-400 font-sans">Showing improvement towards optimal</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={soilTrends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={13} tickLine={false} axisLine={false} >
                <text x="50%" y={40} textAnchor="middle" fill="#64748b" fontSize="13" fontFamily="inherit">Month</text>
              </XAxis>
              <YAxis stroke="#64748b" fontSize={13} tickLine={false} axisLine={false} >
                <text x={-30} y={120} transform="rotate(-90)" textAnchor="middle" fill="#6366f1" fontSize="13" fontFamily="inherit">Phosphorus (ppm)</text>
              </YAxis>
              <ReTooltip contentStyle={{ borderRadius: 12, fontSize: 14 }} />
              <ReLine type="monotone" dataKey="phosphorus" name="Phosphorus (ppm)" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 