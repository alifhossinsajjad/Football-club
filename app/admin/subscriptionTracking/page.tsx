"use client";

import React, { useState } from 'react';
import { 
  Users, DollarSign, TrendingUp, Calendar, 
  Download, Plus, Search, Eye, Edit 
} from 'lucide-react';

// Types
interface SubUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'Active' | 'Cancelled' | 'Expired';
  nextBilling: string;
  amount: string;
  autoRenew: boolean;
}

const mockData: SubUser[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', plan: 'NextGen Pro', status: 'Active', nextBilling: '15/01/2026', amount: '€9.99', autoRenew: true },
  { id: '2', name: 'Sarah Player', email: 'sarah@example.com', plan: 'NextGen Pro', status: 'Active', nextBilling: '20/01/2026', amount: '€9.99', autoRenew: true },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', plan: 'NextGen Pro', status: 'Cancelled', nextBilling: 'N/A', amount: '€9.99', autoRenew: false },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', plan: 'NextGen Pro', status: 'Active', nextBilling: '18/01/2026', amount: '€9.99', autoRenew: true },
  { id: '5', name: 'Alex Brown', email: 'alex@example.com', plan: 'NextGen Pro', status: 'Expired', nextBilling: 'N/A', amount: '€9.99', autoRenew: false },
];

const SubscriptionTrackingPage = () => {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Cancelled' | 'Expired'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = mockData.filter(user => {
    const matchesFilter = filter === 'All' || user.status === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f111f] text-white p-6 md:p-8 font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span className="text-cyan-400">Subscription</span> 
          <span className="text-[#a855f7]">Tracking</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">Track and manage all user subscriptions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<Users className="w-5 h-5 text-cyan-400" />}
          iconBg="bg-[#1e293b]"
          title="Total Subscribers"
          value="3,842"
          change="+15%"
          changeType="positive"
        />
        <StatCard 
          icon={<DollarSign className="w-5 h-5 text-cyan-400" />}
          iconBg="bg-[#1e293b]"
          title="Monthly Revenue"
          value="€38,420"
          change="+23%"
          changeType="positive"
        />
        <StatCard 
          icon={<TrendingUp className="w-5 h-5 text-cyan-400" />}
          iconBg="bg-[#1e293b]"
          title="Active Subscriptions"
          value="3,456"
          change="+12%"
          changeType="positive"
        />
        <StatCard 
          icon={<Calendar className="w-5 h-5 text-cyan-400" />}
          iconBg="bg-[#1e293b]"
          title="Expiring This Month"
          value="386"
          change="-5%"
          changeType="negative"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#171b2f] border border-white/5 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
          <Download className="w-4 h-4" />
          Export Data
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#00d8b6] text-white rounded-lg text-sm font-medium hover:bg-[#00c2a3] transition-colors shadow-lg shadow-[#00d8b6]/20">
          <Plus className="w-4 h-4" />
          Manage Plans
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#171b2f] border border-gray-800 rounded-xl p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name, email, or user ID..." 
            className="w-full bg-[#0a0c16] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex bg-[#0a0c16] p-1 rounded-lg border border-gray-800">
          {['All', 'Active', 'Cancelled', 'Expired'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-5 py-1.5 text-sm font-medium rounded-md transition-all ${
                filter === f 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#171b2f] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#171b2f] text-gray-200 border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 font-bold">User</th>
              <th className="px-6 py-4 font-bold">Email</th>
              <th className="px-6 py-4 font-bold">Plan</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Next Billing</th>
              <th className="px-6 py-4 font-bold">Amount</th>
              <th className="px-6 py-4 font-bold">Auto-Renew</th>
              <th className="px-6 py-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-gray-200">{row.name}</td>
                <td className="px-6 py-4 text-gray-400">{row.email}</td>
                <td className="px-6 py-4 text-cyan-400 font-medium">{row.plan}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                    row.status === 'Active' 
                      ? 'bg-green-500/10 text-green-500' 
                      : row.status === 'Cancelled'
                        ? 'bg-yellow-600/20 text-yellow-600'
                        : 'bg-red-500/10 text-red-500'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{row.nextBilling}</td>
                <td className="px-6 py-4 text-gray-200">{row.amount}</td>
                <td className="px-6 py-4">
                  <span className={`${row.autoRenew ? 'text-green-500' : 'text-gray-500'}`}>
                    {row.autoRenew ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center gap-4 text-gray-400">
                  <button className="hover:text-cyan-400 transition-colors">
                    <Eye className="w-4 h-4 text-cyan-500" />
                  </button>
                  <button className="hover:text-fuchsia-400 transition-colors">
                    <Edit className="w-4 h-4 text-fuchsia-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No subscriptions found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}

// Helper Component
const StatCard = ({ icon, iconBg, title, value, change, changeType }: {
  icon: React.ReactNode, iconBg: string, title: string, value: string, change: string, changeType: 'positive' | 'negative'
}) => (
  <div className="bg-[#171b2f] border border-gray-800 rounded-xl p-5 relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-500' : 'text-yellow-500'}`}>
        {change}
      </span>
    </div>
    <div className="space-y-1">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
    </div>
  </div>
)

export default SubscriptionTrackingPage;
