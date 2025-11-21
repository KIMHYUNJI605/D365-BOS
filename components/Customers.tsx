import React from 'react';
import { Customer } from '../types';
import { MOCK_CUSTOMERS } from '../constants';
import { Phone, Mail, MoreVertical } from 'lucide-react';

const Customers: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 text-sm">Manage leads and client relationships.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Last Contact</th>
                <th className="px-6 py-3">Notes</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {customer.name.charAt(0)}
                      </div>
                      {customer.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                      customer.status === 'Lead' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={14} /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={14} /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{customer.lastContact}</td>
                  <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{customer.notes}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;