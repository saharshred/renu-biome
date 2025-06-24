'use client'

import React, { useState } from 'react'
import { PlusIcon, RocketLaunchIcon, MagnifyingGlassIcon, ChevronDownIcon, FunnelIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface ProductInnovation {
  id: string;
  name: string;
  description: string;
  stage: 'Idea' | 'Research' | 'Development' | 'Testing' | 'Launch';
  estimatedCompletion: string; // e.g., "Q3 2024", "Dec 2024"
  progress: number; // 0-100
  lead: string; // Person responsible
  priority: 'Low' | 'Medium' | 'High';
}

const mockProducts: ProductInnovation[] = [
  {
    id: 'P001',
    name: 'Bio-Boost Soil Enhancer',
    description: 'A new microbial blend designed to significantly improve soil fertility and plant nutrient uptake.',
    stage: 'Development',
    estimatedCompletion: 'Q4 2024',
    progress: 60,
    lead: 'Dr. Emily Chen',
    priority: 'High',
  },
  {
    id: 'P002',
    name: 'Smart Irrigation Sensor',
    description: 'IoT-enabled sensor system for precise water management in large agricultural fields, integrated with weather data.',
    stage: 'Research',
    estimatedCompletion: 'Q1 2025',
    progress: 25,
    lead: 'John Davis',
    priority: 'High',
  },
  {
    id: 'P003',
    name: 'Eco-Friendly Pest Deterrent',
    description: 'Natural, non-toxic sprayable solution for common agricultural pests, safe for beneficial insects.',
    stage: 'Testing',
    estimatedCompletion: 'Q3 2024',
    progress: 85,
    lead: 'Maria Rodriguez',
    priority: 'Medium',
  },
  {
    id: 'P004',
    name: 'Automated Crop Health Drone',
    description: 'AI-powered drone for autonomous crop monitoring, disease detection, and yield prediction.',
    stage: 'Idea',
    estimatedCompletion: 'Q2 2025',
    progress: 10,
    lead: 'Dr. Emily Chen',
    priority: 'Low',
  },
  {
    id: 'P005',
    name: 'Hydroponic Nutrient Solution',
    description: 'Optimized liquid nutrient formula for soilless cultivation systems, ensuring rapid and healthy plant growth.',
    stage: 'Launch',
    estimatedCompletion: 'Released Q2 2024',
    progress: 100,
    lead: 'John Davis',
    priority: 'High',
  },
];

const getStageColor = (stage: ProductInnovation['stage']) => {
  switch (stage) {
    case 'Idea': return 'bg-blue-100 text-blue-800';
    case 'Research': return 'bg-yellow-100 text-yellow-800';
    case 'Development': return 'bg-purple-100 text-purple-800';
    case 'Testing': return 'bg-orange-100 text-orange-800';
    case 'Launch': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: ProductInnovation['priority']) => {
  switch (priority) {
    case 'High': return 'text-red-600';
    case 'Medium': return 'text-orange-500';
    case 'Low': return 'text-green-600';
    default: return 'text-gray-600';
  }
};

const ProductCard = ({ product }: { product: ProductInnovation }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.005] hover:shadow-xl">
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h3>
        <span className={clsx("px-3 py-1 text-xs font-semibold rounded-full", getStageColor(product.stage))}>
          {product.stage}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Lead:</span>
          <span className="text-gray-600">{product.lead}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Est. Completion:</span>
          <span className="text-gray-600 flex items-center gap-1">
            <CalendarDaysIcon className="h-4 w-4 text-gray-400" /> {product.estimatedCompletion}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Priority:</span>
          <span className={clsx("font-semibold", getPriorityColor(product.priority))}>{product.priority}</span>
        </div>
      </div>
    </div>

    {/* Progress Bar */}
    <div className="mt-4">
      <div className="flex justify-between text-xs text-gray-700 mb-1">
        <span>Progress</span>
        <span>{product.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-[#208A84] h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${product.progress}%` }}
        ></div>
      </div>
    </div>
  </div>
)

export default function PipelineOfNewProductsInnovationsPage() {
  const [products, setProducts] = useState<ProductInnovation[]>(mockProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<ProductInnovation, 'id' | 'progress'>>({
    name: '',
    description: '',
    stage: 'Idea',
    estimatedCompletion: '',
    lead: '',
    priority: 'Medium',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');

  const handleAddProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `P${String(products.length + 1).padStart(3, '0')}`;
    const progress = 0; // New products start at 0% progress
    setProducts(prev => [...prev, { ...newProduct, id, progress }]);
    setNewProduct({
      name: '',
      description: '',
      stage: 'Idea',
      estimatedCompletion: '',
      lead: '',
      priority: 'Medium',
    });
    setShowAddForm(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.lead.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || product.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-[#208A84] text-center mb-14 animate-fade-in-down drop-shadow-md">Product Innovation Pipeline</h1>

        {/* Search, Filter, and Add New Product Section */}
        <div className="mb-12 bg-white p-7 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-5 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex-1 relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-base transition-all duration-200 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-52">
            <select
              className="block w-full pl-4 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-base rounded-lg shadow-sm transition-all duration-200 appearance-none"
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
            >
              <option value="all">All Stages</option>
              <option value="Idea">Idea</option>
              <option value="Research">Research</option>
              <option value="Development">Development</option>
              <option value="Testing">Testing</option>
              <option value="Launch">Launch</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#208A84] hover:bg-[#1a6e68] transition-colors duration-200 transform hover:scale-105 w-full md:w-auto justify-center"
          >
            <PlusIcon className="-ml-1 mr-3 h-5 w-5" />
            Add New Product
          </button>
        </div>

        {/* Add New Product Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product Innovation</h2>
              <form onSubmit={handleAddProductSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input type="text" name="name" id="name" value={newProduct.name} onChange={handleAddProductChange} required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description" id="description" value={newProduct.description} onChange={handleAddProductChange} rows={3} required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="stage" className="block text-sm font-medium text-gray-700">Stage</label>
                  <select name="stage" id="stage" value={newProduct.stage} onChange={handleAddProductChange} required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm rounded-md shadow-sm appearance-none">
                    <option value="Idea">Idea</option>
                    <option value="Research">Research</option>
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="Launch">Launch</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="estimatedCompletion" className="block text-sm font-medium text-gray-700">Estimated Completion</label>
                  <input type="text" name="estimatedCompletion" id="estimatedCompletion" value={newProduct.estimatedCompletion} onChange={handleAddProductChange} placeholder="e.g., Q4 2024, Dec 2024" required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="lead" className="block text-sm font-medium text-gray-700">Lead</label>
                  <input type="text" name="lead" id="lead" value={newProduct.lead} onChange={handleAddProductChange} required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                  <select name="priority" id="priority" value={newProduct.priority} onChange={handleAddProductChange} required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm rounded-md shadow-sm appearance-none">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button type="button" onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#208A84] transition-colors duration-200">
                    Cancel
                  </button>
                  <button type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#208A84] hover:bg-[#1a6e68] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#208A84] transition-colors duration-200">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-gray-500 text-xl rounded-xl bg-white shadow-lg border border-gray-100">
              No products in the pipeline matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 