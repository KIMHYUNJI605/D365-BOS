import React from 'react';
import { MOCK_RESERVATIONS } from '../constants';
import { ChevronLeft, ChevronRight, ArrowUpDown, MoreVertical, FileEdit, Trash2, Eye, XCircle } from 'lucide-react';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let colorClass = "";
  
  switch (status) {
    case 'Confirmed':
      colorClass = "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-600/10";
      break;
    case 'Pending':
      colorClass = "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-600/10";
      break;
    case 'Completed':
      colorClass = "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-600/10";
      break;
    case 'Cancelled':
      colorClass = "bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-600/10";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-700 border-gray-200";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${colorClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-60" aria-hidden="true"></span>
      {status}
    </span>
  );
};

const DataTable: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col mb-10">
      
      {/* Header Toolbar */}
      <div className="px-5 py-4 border-b border-gray-200 bg-white rounded-t-lg flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
          Reservation List
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Rows:</span>
            <select className="text-xs border border-gray-300 rounded bg-white py-1 pl-2 pr-6 focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:border-gray-400 transition-colors">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Wrapper - Responsive Overflow */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              {[
                'Dealer Code', 
                'Dealer Name', 
                'Date', 
                'Vehicle', 
                'Customer Name', 
                'Phone Number', 
                'Email Address', 
                'Recommender', 
                'Sales Consultant', 
                'Status',
                'Action'
              ].map((header) => (
                <th 
                  key={header} 
                  className={`px-5 py-3.5 font-semibold text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors group ${header === 'Action' ? 'text-right' : ''}`}
                >
                  <div className={`flex items-center gap-1 ${header === 'Action' ? 'justify-end' : ''}`}>
                    {header}
                    {header !== 'Action' && <ArrowUpDown size={12} className="text-gray-300 group-hover:text-gray-500" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {MOCK_RESERVATIONS.map((row, idx) => (
              <tr key={row.id} className={`group hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="px-5 py-3 text-gray-600 font-mono text-xs">{row.dealerCode}</td>
                <td className="px-5 py-3 text-gray-900 font-medium">{row.dealerName}</td>
                <td className="px-5 py-3 text-gray-600">{row.date}</td>
                <td className="px-5 py-3 text-blue-700 font-medium">{row.vehicle}</td>
                <td className="px-5 py-3 text-gray-800 font-medium">{row.customerName}</td>
                <td className="px-5 py-3 text-gray-600">{row.phoneNumber}</td>
                <td className="px-5 py-3 text-gray-600">
                    <a href={`mailto:${row.email}`} className="hover:text-blue-600 hover:underline">
                        {row.email}
                    </a>
                </td>
                <td className="px-5 py-3 text-gray-500">{row.recommender}</td>
                <td className="px-5 py-3 text-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-500">
                            {row.salesConsultant.charAt(0)}
                        </div>
                        {row.salesConsultant}
                    </div>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end min-h-[28px]">
                        {/* Hover Actions */}
                        <div className="hidden group-hover:flex items-center gap-1">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                                <Eye size={16} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                                <FileEdit size={16} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors" title="Cancel">
                                <XCircle size={16} />
                            </button>
                        </div>
                        {/* Default Action */}
                        <div className="flex group-hover:hidden items-center">
                            <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="border-t border-gray-200 bg-gray-50/50 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-lg">
        <span className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-900">1-7</span> of <span className="font-semibold text-gray-900">42</span> reservations
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 disabled:opacity-50 shadow-sm transition-colors" disabled>
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1 px-2">
             <button className="w-8 h-8 rounded-md bg-blue-600 text-white text-xs font-medium flex items-center justify-center shadow-sm shadow-blue-200">1</button>
             <button className="w-8 h-8 rounded-md hover:bg-gray-100 text-gray-600 text-xs font-medium flex items-center justify-center transition-colors">2</button>
             <button className="w-8 h-8 rounded-md hover:bg-gray-100 text-gray-600 text-xs font-medium flex items-center justify-center transition-colors">3</button>
             <span className="text-gray-400 text-xs px-1">...</span>
             <button className="w-8 h-8 rounded-md hover:bg-gray-100 text-gray-600 text-xs font-medium flex items-center justify-center transition-colors">8</button>
          </div>
          <button className="p-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 shadow-sm transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;