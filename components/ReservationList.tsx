import React from 'react';
import FilterPanel from './FilterPanel';
import KPICards from './KPICards';
import DataTable from './DataTable';
import { ChevronRight } from 'lucide-react';

const ReservationList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        {/* Breadcrumbs */}
        <div className="flex items-center text-xs text-gray-500">
            <span className="text-gray-400">Smart Test Drive</span>
            <ChevronRight size={12} className="mx-1 text-gray-300" />
            <span>Test Drive</span>
            <ChevronRight size={12} className="mx-1 text-gray-300" />
            <span className="font-semibold text-gray-700">Reservation & visit</span>
        </div>

        <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-bold text-gray-900">Test Drive</h1>
            <span className="text-sm text-gray-400">Test drive reservations</span>
        </div>
      </div>

      <KPICards />

      <FilterPanel />

      <DataTable />
    </div>
  );
};

export default ReservationList;