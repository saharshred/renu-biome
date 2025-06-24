'use client'

import React, { useState, useMemo } from 'react';
import { ArrowDownTrayIcon, MagnifyingGlassIcon, DocumentTextIcon, CreditCardIcon, CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Due' | 'Overdue';
  dueDate: string;
  detailsLink: string;
  pdfLink: string;
}

const invoicesData: Invoice[] = [
  {
    id: 'INV-2023-001', date: '2023-01-15', amount: 500.75, status: 'Paid', dueDate: '2023-02-15', detailsLink: '#', pdfLink: '#'
  },
  {
    id: 'INV-2023-002', date: '2023-02-01', amount: 1200.00, status: 'Due', dueDate: '2023-03-01', detailsLink: '#', pdfLink: '#'
  },
  {
    id: 'INV-2023-003', date: '2023-02-20', amount: 350.20, status: 'Overdue', dueDate: '2023-03-20', detailsLink: '#', pdfLink: '#'
  },
  {
    id: 'INV-2023-004', date: '2023-03-05', amount: 800.50, status: 'Paid', dueDate: '2023-04-05', detailsLink: '#', pdfLink: '#'
  },
  {
    id: 'INV-2023-005', date: '2023-03-10', amount: 950.00, status: 'Due', dueDate: '2023-04-10', detailsLink: '#', pdfLink: '#'
  },
  {
    id: 'INV-2023-006', date: '2023-04-01', amount: 210.00, status: 'Due', dueDate: '2023-05-01', detailsLink: '#', pdfLink: '#'
  },
  {
    id: 'INV-2023-007', date: '2023-04-18', amount: 640.80, status: 'Overdue', dueDate: '2023-05-18', detailsLink: '#', pdfLink: '#'
  },
];

const getStatusColor = (status: Invoice['status']) => {
  switch (status) {
    case 'Paid': return 'bg-green-100 text-green-800';
    case 'Due': return 'bg-blue-100 text-blue-800';
    case 'Overdue': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const InvoicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | Invoice['status'] | ''>('All');

  const filteredInvoices = useMemo(() => {
    let filtered = invoicesData;

    if (filterStatus !== 'All' && filterStatus !== '') {
      filtered = filtered.filter(invoice => invoice.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        invoice =>
          invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.amount.toString().includes(searchTerm)
      );
    }

    return filtered;
  }, [searchTerm, filterStatus]);

  const totalOutstanding = useMemo(() => {
    return invoicesData.filter(inv => inv.status === 'Due' || inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);
  }, []);

  const totalPaid = useMemo(() => {
    return invoicesData.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  }, []);

  const upcomingInvoicesCount = useMemo(() => {
    return invoicesData.filter(inv => inv.status === 'Due').length;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Your Invoices & Payments</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <CreditCardIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Total Outstanding</p>
            <p className="text-3xl font-bold text-gray-900">${totalOutstanding.toFixed(2)}</p>
            {totalOutstanding > 0 && (
              <button className="mt-4 w-full bg-[#208A84] text-white py-2 px-4 rounded-full hover:bg-[#1a6e68] transition-colors duration-200 shadow-md">
                Pay All Outstanding
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Total Paid</p>
            <p className="text-3xl font-bold text-gray-900">${totalPaid.toFixed(2)}</p>
            <p className="text-gray-400 mt-2 text-sm">Lifetime Payments</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <CalendarDaysIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Upcoming Invoices</p>
            <p className="text-3xl font-bold text-gray-900">{upcomingInvoicesCount}</p>
            <p className="text-gray-400 mt-2 text-sm">Currently Due</p>
          </div>
        </div>

        {/* Invoice List Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">My Invoices</h2>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by ID or Amount..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#208A84] focus:border-[#208A84]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <select
                className="p-2 border border-gray-300 rounded-lg bg-white focus:ring-[#208A84] focus:border-[#208A84]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as Invoice['status'] | 'All' | '')}
              >
                <option value="All">All Statuses</option>
                <option value="Due">Due</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${invoice.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getStatusColor(invoice.status))}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={invoice.detailsLink} className="text-[#208A84] hover:text-[#1a6e68] mr-4">View</a>
                        <a href={invoice.pdfLink} className="text-blue-500 hover:text-blue-700">
                          <ArrowDownTrayIcon className="h-5 w-5 inline-block" /> PDF
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No invoices found matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
