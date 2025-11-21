import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Customers from './components/Customers';
import ReservationList from './components/ReservationList';
import AIChatModal from './components/AIChatModal';
import { ViewState, Car } from './types';
import { MOCK_CARS, MOCK_KPI, MOCK_RESERVATIONS } from './constants';

function App() {
  // We map the new string IDs from sidebar to our internal ViewState or keep string IDs
  const [activeMenuId, setActiveMenuId] = useState<string>('reservation');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [cars, setCars] = useState<Car[]>(MOCK_CARS);

  // Construct context data for AI
  const aiContext = JSON.stringify({
    totalInventory: cars.length,
    carDetails: cars.map(c => `${c.year} ${c.make} ${c.model} (${c.status}) - $${c.price}`),
    kpi: MOCK_KPI,
    reservations: MOCK_RESERVATIONS
  });

  const renderView = () => {
    // Map sidebar IDs to components
    switch (activeMenuId) {
      case 'dashboard':
      case 'ssc-dashboard':
        return <Dashboard kpi={MOCK_KPI} />;
      
      case 'vehicle-code': // Mapping vehicle code to Inventory for demo
        return <Inventory cars={cars} setCars={setCars} />;
      
      case 'customers':
        return <Customers />;
      
      case 'reservation':
        return <ReservationList />;
        
      default:
        // Default fallbacks if specific pages aren't built yet
        if (activeMenuId.includes('dashboard')) return <Dashboard kpi={MOCK_KPI} />;
        return (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
            <p className="text-lg font-medium">Page Under Construction</p>
            <p className="text-sm mt-2">Selected ID: {activeMenuId}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header: Fixed at top, z-index higher than sidebar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Sidebar: Fixed left, starts below header */}
      <Sidebar 
        activeId={activeMenuId} 
        onNavigate={setActiveMenuId}
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onCloseMobile={() => setIsSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      {/* Main Content Area */}
      <main 
        className={`
          pt-16 min-h-screen transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}
        `}
      >
        <div className="p-4 md:p-6 lg:p-8">
          {renderView()}
        </div>
      </main>

      {/* AI Assistant FAB */}
      <AIChatModal contextData={aiContext} />
    </div>
  );
}

export default App;
