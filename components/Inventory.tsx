import React, { useState } from 'react';
import { Car, CarStatus } from '../types';
import { Plus, Filter, Search, MoreHorizontal, Sparkles, Loader2, Edit, Trash2 } from 'lucide-react';
import { generateCarDescription } from '../services/geminiService';

interface InventoryProps {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
}

const Inventory: React.FC<InventoryProps> = ({ cars, setCars }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState<Partial<Car>>({
    make: '', model: '', year: new Date().getFullYear(), price: 0, vin: '', mileage: 0, color: '', description: '', status: CarStatus.AVAILABLE
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.make || !formData.model) {
      alert("Please enter at least Make and Model first.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateCarDescription(formData);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCar: Car = {
      ...formData as Car,
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`
    };
    setCars([newCar, ...cars]);
    setIsModalOpen(false);
    // Reset form
    setFormData({ make: '', model: '', year: new Date().getFullYear(), price: 0, vin: '', mileage: 0, color: '', description: '', status: CarStatus.AVAILABLE });
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = `${car.make} ${car.model} ${car.vin}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || car.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: CarStatus) => {
    switch (status) {
      case CarStatus.AVAILABLE: return 'bg-green-100 text-green-700';
      case CarStatus.PENDING: return 'bg-amber-100 text-amber-700';
      case CarStatus.SOLD: return 'bg-gray-100 text-gray-700';
      case CarStatus.MAINTENANCE: return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 text-sm">Manage your vehicles and listings.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Make, Model, VIN..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          <Filter size={18} className="text-gray-400" />
          {['All', CarStatus.AVAILABLE, CarStatus.PENDING, CarStatus.SOLD].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                filterStatus === status 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map(car => (
          <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48 bg-gray-200">
              <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                {car.year}
              </div>
              <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(car.status)}`}>
                {car.status}
              </span>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{car.make} {car.model}</h3>
                  <p className="text-gray-500 text-sm">{car.color} • {car.mileage.toLocaleString()} mi</p>
                </div>
                <span className="font-bold text-blue-600">${car.price.toLocaleString()}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{car.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-mono">{car.vin}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit size={16}/></button>
                  <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Car Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">Add New Vehicle</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><MoreHorizontal size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Make</label>
                  <input required name="make" value={formData.make} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Model</label>
                  <input required name="model" value={formData.model} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Year</label>
                  <input required type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Price ($)</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Color</label>
                  <input name="color" value={formData.color} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg">
                    {Object.values(CarStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-gray-700">VIN</label>
                  <input required name="vin" value={formData.vin} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg uppercase" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-gray-700">Description</label>
                    <button 
                      type="button"
                      onClick={handleGenerateDescription}
                      disabled={isGenerating}
                      className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 disabled:opacity-50"
                    >
                      {isGenerating ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12} />}
                      {isGenerating ? 'Generating...' : 'Auto-Generate with AI'}
                    </button>
                  </div>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Vehicle details and features..."
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;