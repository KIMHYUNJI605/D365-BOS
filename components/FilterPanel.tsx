import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, Filter } from 'lucide-react';
import Button from './Button';

const FilterPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden transition-all duration-300">
      {/* Panel Header */}
      <div 
        className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-700">Search Conditions</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Collapsible Content */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5">
          {/* Grid System - 12 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-4">
            
            {/* Row 1 */}
            <div className="md:col-span-3 space-y-1.5">
              <label htmlFor="distributor" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Distributor Name</label>
              <select id="distributor" className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-gray-700">
                <option>HMID</option>
                <option>HMA</option>
              </select>
            </div>

            <div className="md:col-span-3 space-y-1.5">
              <label htmlFor="dealer" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dealer Name</label>
              <select id="dealer" className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-gray-700">
                <option>All</option>
                <option>Hyundai Downtown</option>
                <option>Westside Auto</option>
              </select>
            </div>

            <div className="md:col-span-3 space-y-1.5">
              <label htmlFor="group" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dealer Group Name</label>
              <select id="group" className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-gray-700">
                <option>All</option>
                <option>Penske Auto</option>
                <option>AutoNation</option>
              </select>
            </div>

             <div className="md:col-span-3 space-y-1.5">
              <label htmlFor="status" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</label>
              <select id="status" className="w-full h-9 px-3 bg-gray-50 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-gray-700">
                <option>All</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            {/* Row 2 */}
            <div className="md:col-span-4 space-y-1.5">
              <label htmlFor="date" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date Range</label>
              <div className="relative">
                  <input 
                  type="text" 
                  id="date" 
                  defaultValue="11/14/2025 - 11/20/2025"
                  className="w-full h-9 px-3 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow text-gray-700"
                  />
              </div>
            </div>

            <div className="md:col-span-3 space-y-1.5">
              <label htmlFor="customer" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer Name</label>
              <input 
                type="text" 
                id="customer" 
                placeholder="Search by customer name" 
                className="w-full h-9 px-3 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow placeholder-gray-400"
              />
            </div>

             <div className="md:col-span-3 space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Search by email" 
                className="w-full h-9 px-3 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow placeholder-gray-400"
              />
            </div>

            {/* Search Button - Aligned to bottom right */}
            <div className="md:col-span-2 flex items-end justify-end">
              <Button className="w-full md:w-auto">
                <Search size={16} />
                SEARCH
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;