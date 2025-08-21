'use client'

import React, { useState, useMemo } from 'react';
import { PrinterIcon, ArrowDownTrayIcon, CreditCardIcon, BanknotesIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface BillLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface BillDetails {
  billId: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  status: 'Paid' | 'Due' | 'Overdue';
  lineItems: BillLineItem[];
}

const mockBill: BillDetails = {
  billId: 'BILL-2024-001',
  issueDate: '2024-06-01',
  dueDate: '2024-07-01',
  totalAmount: 1850.75,
  status: 'Due',
  lineItems: [
    { description: 'Organic Soil Enhancer (50lbs)', quantity: 10, unitPrice: 85.00, total: 850.00 },
    { description: 'Premium Seed Blend (25kg)', quantity: 5, unitPrice: 120.00, total: 600.00 },
    { description: 'Farm Consultation (2 hrs)', quantity: 1, unitPrice: 300.00, total: 300.00 },
    { description: 'Delivery Fee', quantity: 1, unitPrice: 15.75, total: 15.75 },
    { description: 'Rebate Applied', quantity: 1, unitPrice: -100.00, total: -100.00 },
  ],
};

const getStatusColor = (status: BillDetails['status']) => {
  switch (status) {
    case 'Paid': return 'bg-green-100 text-green-800';
    case 'Due': return 'bg-blue-100 text-blue-800';
    case 'Overdue': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const ViewPayPrintBillPage = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentAmount, setPaymentAmount] = useState(mockBill.totalAmount.toFixed(2));

  const billStatusColor = getStatusColor(mockBill.status);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('Simulating PDF download for bill ' + mockBill.billId);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Simulating payment of $${paymentAmount} via ${paymentMethod}.`);
    // Here you would integrate with your payment gateway
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Manage Your Bill</h1>

        {/* Bill Overview Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Bill ID: <span className="text-gray-800 font-semibold">{mockBill.billId}</span></p>
              <p className="text-sm font-medium text-gray-500">Issue Date: <span className="text-gray-800 font-semibold">{mockBill.issueDate}</span></p>
            </div>
            <span className={clsx("px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded-full", billStatusColor)}>
              {mockBill.status}
            </span>
          </div>
          <div className="text-center mb-8">
            <p className="text-gray-500 text-xl mb-2">Total Amount Due</p>
            <p className="text-6xl font-extrabold text-[#208A84] drop-shadow-md">${mockBill.totalAmount.toFixed(2)}</p>
            <p className="text-gray-600 mt-2 text-lg">Due Date: <span className="font-bold">{mockBill.dueDate}</span></p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <PrinterIcon className="h-5 w-5 mr-2" /> Print Bill
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Download PDF
            </button>
          </div>
        </div>

        {/* Bill Details Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12">
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="w-full flex justify-between items-center text-2xl font-bold text-gray-800 pb-4 border-b border-gray-200 focus:outline-none"
          >
            Bill Details
            {isDetailsOpen ? (
              <ChevronUpIcon className="h-7 w-7 text-gray-600" />
            ) : (
              <ChevronDownIcon className="h-7 w-7 text-gray-600" />
            )}
          </button>

          {isDetailsOpen && (
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockBill.lineItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right text-base font-bold text-gray-900">Grand Total:</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-base font-bold text-gray-900">${mockBill.totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payment Section */}
        {mockBill.status !== 'Paid' && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Payment</h2>

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div>
                <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 mb-2">Amount to Pay</label>
                <input
                  type="number"
                  id="paymentAmount"
                  name="paymentAmount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  step="0.01"
                  min="0"
                  max={mockBill.totalAmount}
                  className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm p-3 bg-white"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {paymentMethod === 'credit_card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input type="text" id="cardNumber" className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm p-3" placeholder="XXXX XXXX XXXX XXXX" required />
                  </div>
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                    <input type="text" id="cardName" className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm p-3" required />
                  </div>
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (MM/YY)</label>
                    <input type="text" id="expiryDate" className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm p-3" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <input type="text" id="cvc" className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#208A84] focus:border-[#208A84] sm:text-sm p-3" placeholder="XXX" required />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[#208A84] hover:bg-[#1a6e68] transition-colors duration-200"
              >
                <CreditCardIcon className="h-5 w-5 mr-2" /> Pay Now
              </button>
            </form>
          </div>
        )}

        {mockBill.status === 'Paid' && (
          <div className="bg-green-50 rounded-3xl shadow-xl border border-green-200 p-8 text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-800 mb-2">Bill Paid!</h2>
            <p className="text-green-700 text-lg">Your bill has been successfully paid. Thank you!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ViewPayPrintBillPage; 