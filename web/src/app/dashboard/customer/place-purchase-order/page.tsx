'use client'

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, Truck, CreditCard, Calendar, MapPin, Phone, Mail, User, Building, FileText, Hash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { jsPDF } from 'jspdf';

// Agricultural fertilizer products
const fertilizerProducts = [
  {
    id: 1,
    name: 'N-CARE',
    category: 'Nitrogen Fertilizer',
    pricePerGallon: 14.75,
    unit: 'per gallon',
    description: 'High-efficiency nitrogen fertilizer for optimal crop growth and yield',
    image: '/n-care.png',
    availableSizes: ['55-gallon drum', '275-gallon tote', '1000-gallon tank'],
    minOrder: 55, // minimum 55 gallons
    inStock: true
  },
  {
    id: 2,
    name: 'K-RUSH',
    category: 'Potassium Fertilizer',
    pricePerGallon: 16.25,
    unit: 'per gallon',
    description: 'Advanced potassium solution for improved plant health and stress resistance',
    image: '/k-rush.png',
    availableSizes: ['55-gallon drum', '275-gallon tote', '1000-gallon tank'],
    minOrder: 55,
    inStock: true
  },
  {
    id: 3,
    name: 'BIOME CARE',
    category: 'Biological Fertilizer',
    pricePerGallon: 18.50,
    unit: 'per gallon',
    description: 'Beneficial microbial blend for enhanced soil health and root development',
    image: '/biome-care.png',
    availableSizes: ['55-gallon drum', '275-gallon tote', '1000-gallon tank'],
    minOrder: 55,
    inStock: true
  },
  {
    id: 4,
    name: 'KARANJA OIL',
    category: 'Organic Pesticide',
    pricePerGallon: 22.00,
    unit: 'per gallon',
    description: 'Natural organic pesticide derived from karanja tree for pest control',
    image: '/karanjaoil.png',
    availableSizes: ['55-gallon drum', '275-gallon tote'],
    minOrder: 55,
    inStock: true
  }
];

const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', price: 150, days: '3-5 business days' },
  { id: 'express', name: 'Express Delivery', price: 250, days: '1-2 business days' },
  { id: 'rush', name: 'Rush Delivery', price: 400, days: 'Same day (if ordered before 2 PM)' }
];

// Helper to fetch logo as base64
async function getLogoBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function PlacePurchaseOrderPage() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [poNumber, setPoNumber] = useState('');
  const [siteNumber, setSiteNumber] = useState('');
  const [orderItems, setOrderItems] = useState<Array<{
    productId: number;
    product: any;
    gallons: number;
    size: string;
  }>>([]);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    specialInstructions: ''
  });
  const [orderNotes, setOrderNotes] = useState('');
  const [productGallons, setProductGallons] = useState<{[key: number]: string}>({});
  const [editingGallons, setEditingGallons] = useState<{[key: number]: string}>({});
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();
        if (error) throw error;
        if (profile) {
          setFirstName(profile.first_name);
          setLastName(profile.last_name);
        }
      } catch (error: any) {
        console.error("Error fetching user's name:", error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const addProductToOrder = (product: any) => {
    const gallons = parseInt(productGallons[product.id] || '', 10);
    if (isNaN(gallons) || gallons < product.minOrder) {
      alert(`Minimum order for ${product.name} is ${product.minOrder} gallons`);
      return;
    }
    const existingItem = orderItems.find(item => item.productId === product.id);
    if (existingItem) {
      setOrderItems(prev => prev.map(item => 
        item.productId === product.id 
          ? { ...item, gallons: item.gallons + gallons }
          : item
      ));
    } else {
      setOrderItems(prev => [...prev, {
        productId: product.id,
        product,
        gallons: gallons,
        size: product.availableSizes[0]
      }]);
    }
    setProductGallons(prev => ({ ...prev, [product.id]: '' }));
  };

  const removeProductFromOrder = (productId: number) => {
    setOrderItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateGallons = (productId: number, gallons: number) => {
    setOrderItems(prev => prev.map(item => 
      item.productId === productId 
        ? { ...item, gallons: Math.max(item.product.minOrder, gallons) }
        : item
    ));
  };

  const updateSize = (productId: number, size: string) => {
    setOrderItems(prev => prev.map(item => 
      item.productId === productId 
        ? { ...item, size }
        : item
    ));
  };

  const getOrderTotal = () => {
    let subtotal = 0;
    orderItems.forEach(item => {
      subtotal += item.product.pricePerGallon * item.gallons;
    });
    const deliveryCost = deliveryOptions.find(d => d.id === deliveryOption)?.price || 0;
    return { subtotal, deliveryCost, total: subtotal + deliveryCost };
  };

  const generatePoNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PO-${timestamp}-${random}`;
  };

  const handleSubmitOrder = async () => {
    if (!poNumber.trim()) {
      alert('Please enter a Purchase Order number');
      return;
    }
    if (!siteNumber.trim()) {
      alert('Please enter a Site number');
      return;
    }
    if (orderItems.length === 0) {
      alert('Please add at least one product to your order');
      return;
    }
    if (!deliveryAddress.street.trim() || !deliveryAddress.city.trim() || !deliveryAddress.state.trim() || !deliveryAddress.zipCode.trim() || !deliveryAddress.phone.trim()) {
      alert('Please enter a complete delivery address');
      return;
    }
    
    // Here you would typically submit the order to your backend
    console.log('Submitting agricultural order:', {
      poNumber,
      siteNumber,
      orderItems,
      deliveryOption,
      deliveryAddress,
      orderNotes,
      total: getOrderTotal()
    });
    
    setShowThankYouModal(true);
  };

  // Function to generate and download the purchase order PDF (now async)
  const generateAndDownloadPDF = async () => {
    const doc = new jsPDF();
    let y = 20;
    // Add logo
    try {
      const logoBase64 = await getLogoBase64('/renu-biome-logo-clean.png');
      doc.addImage(logoBase64, 'PNG', 80, 8, 50, 18);
      y = 32;
    } catch (e) {
      // If logo fails, just continue
      y = 20;
    }
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Purchase Order', 105, y, { align: 'center' });
    y += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setDrawColor(46, 204, 113);
    doc.line(15, y, 195, y);
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.text('PO Number:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(poNumber, 45, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Site Number:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(siteNumber, 45, y);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Delivery Address:', 15, y);
    doc.setFont('helvetica', 'normal');
    y += 6;
    doc.text(`${deliveryAddress.street}`, 20, y);
    y += 6;
    doc.text(`${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zipCode}`, 20, y);
    y += 6;
    doc.text(`Phone: ${deliveryAddress.phone}`, 20, y);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Order Items:', 15, y);
    y += 7;
    orderItems.forEach((item, idx) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. ${item.product.name} (${item.size})`, 20, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(`Gallons: ${item.gallons}    Price: $${item.product.pricePerGallon.toFixed(2)}/gallon    Total: $${(item.product.pricePerGallon * item.gallons).toFixed(2)}`, 25, y);
      y += 7;
    });
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Delivery Method:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${deliveryOptions.find(d => d.id === deliveryOption)?.name || ''}`, 55, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Order Notes:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(orderNotes || '-', 45, y);
    y += 10;
    doc.setDrawColor(46, 204, 113);
    doc.line(15, y, 195, y);
    y += 7;
    const { subtotal, deliveryCost, total } = getOrderTotal();
    doc.setFont('helvetica', 'bold');
    doc.text(`Subtotal:`, 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`$${subtotal.toFixed(2)}`, 180, y, { align: 'right' });
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.text(`Delivery:`, 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`$${deliveryCost.toFixed(2)}`, 180, y, { align: 'right' });
    y += 6;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total:`, 15, y);
    doc.text(`$${total.toFixed(2)}`, 180, y, { align: 'right' });
    doc.save(`PurchaseOrder_${poNumber || 'unnamed'}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-lg text-gray-600">Loading purchase order form...</p>
      </div>
    );
  }

  const { subtotal, deliveryCost, total } = getOrderTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Modal for Thank You */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg relative flex flex-col items-center">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowThankYouModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <img src="/renu-biome-logo-clean.png" alt="ReNu-Biome Logo" className="h-20 w-auto object-contain mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#208A84] mb-2 text-center">Thank you for submitting a purchase order!</h2>
            <p className="text-gray-700 text-lg mb-6 text-center">We have received your request. You can download a PDF copy of your order below.</p>
            <Button
              onClick={generateAndDownloadPDF}
              className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-6 py-2 font-medium shadow-sm hover:bg-emerald-100 transition text-lg"
            >
              Download PDF
            </Button>
          </div>
        </div>
      )}
      {/* Hide form when modal is open */}
      {!showThankYouModal && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
          {/* Header */}
          <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-black font-['Poppins']">
                    Purchase Order
                  </h1>
                  <p className="text-gray-600">Order agricultural fertilizer products</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard/customer/schedule-an-appointment-with-founder">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                    >
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Consultation
                      </span>
                    </Button>
                  </Link>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Purchase Order Details */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-emerald-600" />
                    Purchase Order Details
                  </h2>
                  <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                    {/* PO Number input group */}
                    <div className="flex flex-1 min-w-0 items-center">
                      <input
                        type="text"
                        placeholder="Enter PO number"
                        value={poNumber}
                        onChange={(e) => setPoNumber(e.target.value)}
                        className="flex-1 min-w-0 h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <Button
                        onClick={() => setPoNumber(generatePoNumber())}
                        className="h-8 ml-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg px-4 font-medium shadow-sm hover:bg-emerald-100 transition text-base"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        Generate
                      </Button>
                    </div>
                    {/* Site Number input */}
                    <input
                      type="text"
                      placeholder="Enter site number"
                      value={siteNumber}
                      onChange={(e) => setSiteNumber(e.target.value)}
                      className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Product Selection */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Package className="w-6 h-6 mr-3 text-emerald-600" />
                    Available Fertilizer Products
                  </h2>
                  <div className="space-y-6">
                    {fertilizerProducts.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-32 h-32 object-contain rounded-xl bg-white p-2 mr-4"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className="text-xl font-bold text-emerald-600">${product.pricePerGallon}</span>
                                <span className="text-sm text-gray-500 ml-1">/gallon</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Gallons
                                </label>
                                <input
                                  type="number"
                                  min={product.minOrder}
                                  placeholder={`Min ${product.minOrder} gallons`}
                                  value={productGallons[product.id] || ''}
                                  onChange={(e) => setProductGallons(prev => ({ 
                                    ...prev, 
                                    [product.id]: e.target.value 
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                              </div>
                              <Button
                                onClick={() => addProductToOrder(product)}
                                disabled={!product.inStock}
                                className="bg-emerald-600 hover:bg-emerald-700 mt-6"
                              >
                                {product.inStock ? 'Add to Order' : 'Out of Stock'}
                              </Button>
                            </div>
                            {!product.inStock && (
                              <p className="text-sm text-red-500 mt-2">Currently unavailable</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                {orderItems.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                      <ShoppingCart className="w-6 h-6 mr-3 text-emerald-600" />
                      Order Items
                    </h2>
                    <div className="space-y-4">
                      {orderItems.map((item) => (
                        <div key={item.productId} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                            <Button
                              onClick={() => removeProductFromOrder(item.productId)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Container Size
                              </label>
                              <select
                                value={item.size}
                                onChange={(e) => updateSize(item.productId, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              >
                                {item.product.availableSizes.map((size: string) => (
                                  <option key={size} value={size}>{size}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gallons
                              </label>
                              <input
                                type="number"
                                min={item.product.minOrder}
                                value={editingGallons[item.productId] ?? item.gallons.toString()}
                                onChange={e => {
                                  setEditingGallons(prev => ({ ...prev, [item.productId]: e.target.value }));
                                  const val = parseInt(e.target.value, 10);
                                  if (!isNaN(val) && val >= item.product.minOrder) {
                                    updateGallons(item.productId, val);
                                  }
                                }}
                                onBlur={e => {
                                  const val = parseInt(e.target.value, 10);
                                  if (isNaN(val) || val < item.product.minOrder) {
                                    setEditingGallons(prev => ({ ...prev, [item.productId]: item.gallons.toString() }));
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 hide-number-input-arrows"
                              />
                              <style jsx global>{`
                                input.hide-number-input-arrows::-webkit-outer-spin-button,
                                input.hide-number-input-arrows::-webkit-inner-spin-button {
                                  -webkit-appearance: none;
                                  margin: 0;
                                }
                                input.hide-number-input-arrows[type=number] {
                                  -moz-appearance: textfield;
                                }
                              `}</style>
                              <p className="text-xs text-gray-500 mt-1">Min: {item.product.minOrder} gallons</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Total Price
                              </label>
                              <div className="text-lg font-bold text-emerald-600">
                                ${(item.product.pricePerGallon * item.gallons).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Information */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Truck className="w-6 h-6 mr-3 text-emerald-600" />
                    Delivery Information
                  </h2>
                  
                  {/* Delivery Options */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery Method</h3>
                    <div className="space-y-3">
                      {deliveryOptions.map((option) => (
                        <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="delivery"
                            value={option.id}
                            checked={deliveryOption === option.id}
                            onChange={(e) => setDeliveryOption(e.target.value)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-800">{option.name}</span>
                              <span className="text-emerald-600 font-semibold">${option.price}</span>
                            </div>
                            <p className="text-sm text-gray-600">{option.days}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Delivery Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Street Address"
                        value={deliveryAddress.street}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, street: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={deliveryAddress.state}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={deliveryAddress.zipCode}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={deliveryAddress.phone}
                        onChange={(e) => setDeliveryAddress(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <textarea
                      placeholder="Special delivery instructions (optional)"
                      value={deliveryAddress.specialInstructions}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, specialInstructions: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Order Notes */}
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <User className="w-6 h-6 mr-3 text-emerald-600" />
                    Additional Information
                  </h2>
                  <textarea
                    placeholder="Add any special instructions or notes for your order..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-emerald-600" />
                    Purchase Order Summary
                  </h2>

                  {orderItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No items in order</p>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {orderItems.map((item) => (
                          <div key={item.productId} className="border-b border-gray-100 pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm">{item.product.name}</p>
                                <p className="text-sm text-gray-600">{item.gallons} gallons - {item.size}</p>
                              </div>
                              <span className="font-semibold text-gray-800 text-sm">
                                ${(item.product.pricePerGallon * item.gallons).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Delivery</span>
                          <span className="font-medium">${deliveryCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-200 pt-2">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <Button
                        onClick={handleSubmitOrder}
                        className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
                        disabled={
                          orderItems.length === 0 || 
                          !poNumber.trim() || 
                          !siteNumber.trim() ||
                          !deliveryAddress.street.trim() ||
                          !deliveryAddress.city.trim() ||
                          !deliveryAddress.state.trim() ||
                          !deliveryAddress.zipCode.trim() ||
                          !deliveryAddress.phone.trim()
                        }
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Submit Purchase Order
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
