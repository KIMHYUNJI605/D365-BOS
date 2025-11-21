import React from 'react';
import { Bell, User, Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-[#ece9e6] shadow-sm h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50 border-b border-gray-300/50">
      {/* Left Side: Mobile Menu & Logo */}
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-600 hover:bg-gray-200 rounded-md">
          <Menu size={24} />
        </button>
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 select-none">
             {/* Stylized H Icon */}
             <svg width="36" height="24" viewBox="0 0 36 24" fill="currentColor" className="text-[#002c5f]">
                <path d="M2.5 4C2.5 2.61929 3.61929 1.5 5 1.5H31C32.3807 1.5 33.5 2.61929 33.5 4V20C33.5 21.3807 32.3807 22.5 31 22.5H5C3.61929 22.5 2.5 21.3807 2.5 20V4ZM6 6V18H10V13H26V18H30V6H26V11H10V6H6Z" fillRule="evenodd" clipRule="evenodd"/>
             </svg>
             <span className="text-xl font-bold text-[#002c5f] tracking-tight">Dealer365</span>
             <div className="w-3 h-3 rounded-full border-[1.5px] border-gray-500 ml-1"></div> 
        </div>
      </div>

      {/* Right Side: Utilities */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Language Selector */}
        <div className="hidden md:flex items-center gap-2 cursor-pointer hover:bg-black/5 px-2 py-1.5 rounded transition-colors">
            <img 
                src="https://flagcdn.com/w20/us.png" 
                srcSet="https://flagcdn.com/w40/us.png 2x" 
                width="20" 
                height="14" 
                alt="US Flag"
                className="rounded-[2px] object-cover shadow-sm"
            />
            <span className="text-xs font-medium text-gray-600">English (USA)</span>
            <ChevronDown size={14} className="text-gray-500" />
        </div>

        {/* Notifications */}
        <button className="relative text-gray-500 hover:text-[#002c5f] transition-colors">
          <Bell size={20} />
        </button>
        
        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">.admin</p>
          </div>
          <div className="w-9 h-9 bg-[#e2e4e9] rounded-full flex items-center justify-center overflow-hidden border border-white shadow-sm">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;