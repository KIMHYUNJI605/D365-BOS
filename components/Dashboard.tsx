import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { SALES_DATA } from '../constants';
import { KPIData } from '../types';
import { DollarSign, Car, ShoppingBag, TrendingUp } from 'lucide-react';

interface DashboardProps {
  kpi: KPIData;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType; color: string; change: string }> = ({ title, value, icon: Icon, color, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-xs">
      <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded mr-2">
        {change}
      </span>
      <span className="text-gray-400">from last month</span>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ kpi }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Inventory Value" 
          value={`$${kpi.totalInventoryValue.toLocaleString()}`} 
          icon={DollarSign} 
          color="bg-blue-500" 
          change="+12.5%"
        />
        <StatCard 
          title="Active Vehicles" 
          value={kpi.activeCars} 
          icon={Car} 
          color="bg-indigo-500" 
          change="+2"
        />
        <StatCard 
          title="Monthly Sales" 
          value={kpi.monthlySales} 
          icon={ShoppingBag} 
          color="bg-emerald-500" 
          change="+4"
        />
        <StatCard 
          title="Pending Leads" 
          value={kpi.pendingLeads} 
          icon={TrendingUp} 
          color="bg-amber-500" 
          change="+15%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity / Mini Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <UserIcon size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New Lead Added</p>
                  <p className="text-xs text-gray-500">2 minutes ago by Manager Kim</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserIcon = ({size, className}: {size: number, className: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

export default Dashboard;