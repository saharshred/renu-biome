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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">Your Invoices & Payments</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 text-center border border-emerald-100 hover:shadow-2xl transition-all duration-300 group">
            <CreditCardIcon className="h-12 w-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-gray-500 text-lg font-medium">Total Outstanding</p>
            <p className="text-3xl font-bold text-gray-900">${totalOutstanding.toFixed(2)}</p>
            {totalOutstanding > 0 && (
              <button className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded-full hover:bg-emerald-700 transition-colors duration-200 shadow-md font-semibold text-lg">
                Pay All Outstanding
              </button>
            )}
          </div>

          <div className="bg-white/90 rounded-2xl shadow-xl p-6 text-center border border-emerald-100 hover:shadow-2xl transition-all duration-300 group">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-gray-500 text-lg font-medium">Total Paid</p>
            <p className="text-3xl font-bold text-gray-900">${totalPaid.toFixed(2)}</p>
            <p className="text-gray-400 mt-2 text-sm">Lifetime Payments</p>
          </div>

          <div className="bg-white/90 rounded-2xl shadow-xl p-6 text-center border border-emerald-100 hover:shadow-2xl transition-all duration-300 group">
            <CalendarDaysIcon className="h-12 w-12 text-purple-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-gray-500 text-lg font-medium">Upcoming Invoices</p>
            <p className="text-3xl font-bold text-gray-900">{upcomingInvoicesCount}</p>
            <p className="text-gray-400 mt-2 text-sm">Currently Due</p>
          </div>
        </div>

        {/* Invoice List Header */}
        <div className="bg-white/95 rounded-2xl shadow-xl p-8 mb-6 border border-emerald-100">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0 tracking-tight">My Invoices</h2>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by ID or Amount..."
                  className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 bg-emerald-50/30 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-400" />
              </div>
              <select
                className="p-2 border border-emerald-200 rounded-lg bg-white focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
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
          <div className="overflow-x-auto rounded-xl border border-emerald-100 bg-white/90 shadow-sm">
            <table className="min-w-full divide-y divide-emerald-100">
              <thead className="bg-emerald-50/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">Invoice ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">Due Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-emerald-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-emerald-50">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-emerald-50/40 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{invoice.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">${invoice.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx("px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border", {
                          'bg-green-50 text-green-700 border-green-200': invoice.status === 'Paid',
                          'bg-blue-50 text-blue-700 border-blue-200': invoice.status === 'Due',
                          'bg-red-50 text-red-700 border-red-200': invoice.status === 'Overdue',
                        })}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={invoice.detailsLink} className="text-emerald-700 hover:text-emerald-900 font-semibold mr-4 transition-colors">View</a>
                        <a href={invoice.pdfLink} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                          <ArrowDownTrayIcon className="h-5 w-5 inline-block align-text-bottom" /> PDF
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
