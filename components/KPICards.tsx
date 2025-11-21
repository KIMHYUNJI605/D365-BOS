import React from 'react';
import { Users, CalendarClock, AlertCircle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';

const KPICards: React.FC = () => {
  const stats = [
    {
      title: 'Total Reservations',
      value: '1,245',
      change: '+12.5%',
      isPositive: true,
      icon: Users,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      title: 'Upcoming Test Drives',
      value: '28',
      change: '+4',
      period: 'today',
      isPositive: true,
      icon: CalendarClock,
      iconColor: 'text-violet-600',
      iconBg: 'bg-violet-50',
    },
    {
      title: 'Pending Confirmations',
      value: '12',
      change: '-2',
      period: 'vs yesterday',
      isPositive: false,
      icon: AlertCircle,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
    },
    {
      title: 'Completed Test Drives',
      value: '892',
      change: '+8.2%',
      isPositive: true,
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col transition-all hover:shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.title}</h4>
              <div className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
            <div className={`p-2.5 rounded-lg ${stat.iconBg} ${stat.iconColor}`}>
              <stat.icon size={20} />
            </div>
          </div>
          
          <div className="flex items-center text-xs mt-auto">
            <span className={`flex items-center font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {stat.isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
              {stat.change}
            </span>
            <span className="text-gray-400 ml-2">
              {stat.period || 'vs last month'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;