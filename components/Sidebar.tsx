import React, { useState, useEffect } from 'react';
import { SIDEBAR_MENU } from '../constants';
import { MenuItem } from '../types';
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
  activeId: string;
  onNavigate: (id: string) => void;
}

// Helper to check if an item or its children contains the active ID
const isItemActive = (item: MenuItem, activeId: string): boolean => {
  if (item.id === activeId) return true;
  if (item.children) {
    return item.children.some(child => isItemActive(child, activeId));
  }
  return false;
};

const SidebarItem: React.FC<{ 
  item: MenuItem; 
  depth?: number; 
  activeId: string;
  isCollapsed: boolean;
  onNavigate: (id: string) => void;
}> = ({ item, depth = 0, activeId, isCollapsed, onNavigate }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isActiveExact = item.id === activeId;
  const isActivePath = isItemActive(item, activeId);
  
  // Default expanded state: Expand if it's part of the active path
  const [isExpanded, setIsExpanded] = useState(isActivePath);

  // Sync expansion with active path updates
  useEffect(() => {
    if (isActivePath && !isCollapsed) {
      setIsExpanded(true);
    }
  }, [isActivePath, isCollapsed]);
  
  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      if (!isCollapsed) {
        setIsExpanded(!isExpanded);
      }
    } else {
      onNavigate(item.id);
    }
  };

  // Style Logic based on Depth
  const isDepth0 = depth === 0;
  const isDepth1 = depth === 1;
  const isDepth2 = depth >= 2;

  // Base padding calculations
  const getPaddingLeft = () => {
    if (isCollapsed) return 0;
    if (isDepth0) return '16px'; 
    if (isDepth1) return '48px'; 
    return '64px'; 
  };

  // Text Styles
  const getTextStyles = () => {
    if (isDepth0) return 'font-bold text-[14px]'; 
    if (isDepth1) return 'font-medium text-[13px]';
    return 'font-normal text-[13px]'; 
  };

  // Color Styles for Text
  const getColorStyles = () => {
    if (isActiveExact) return 'text-blue-700';
    if (isActivePath && isDepth0) return 'text-blue-800'; 
    if (isActivePath) return 'text-gray-900';
    return 'text-gray-600 group-hover:text-gray-900';
  };

  // Container Background/Structure Styles
  const getContainerStyles = () => {
    if (isCollapsed && isDepth0) {
        return 'justify-center px-2 py-2'; // Center content when collapsed
    }

    let base = `flex items-center pr-3 py-2 cursor-pointer transition-colors mx-3 rounded-md mb-1 ${getColorStyles()} `;
    
    if (isActivePath && !isCollapsed) {
       if (isDepth0) base += 'bg-blue-50/60 '; // Very subtle background for active parent
       else base += '';
    } else {
       base += 'hover:bg-gray-100/80 ';
    }
    return base;
  };

  // Dynamically render icon if it exists
  const Icon = item.icon;

  return (
    <li className="select-none group">
      <div 
        onClick={handleClick}
        className={getContainerStyles()}
        style={{ paddingLeft: getPaddingLeft() }}
        title={isCollapsed ? item.label : ''}
      >
        <div className={`flex items-center gap-3 overflow-hidden flex-1 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          
          {/* Icon: Only for Depth 0 */}
          {Icon && isDepth0 && (
            <div className={`
              flex items-center justify-center rounded-lg transition-all duration-200
              ${isCollapsed 
                  ? (isActivePath 
                      ? 'bg-blue-700 text-white w-10 h-10 shadow-md ring-2 ring-blue-100' // Collapsed & Active
                      : 'text-gray-500 w-10 h-10 hover:bg-gray-100 hover:text-gray-700') // Collapsed & Inactive
                  : (isActivePath 
                      ? 'text-blue-700' // Expanded & Active
                      : 'text-gray-400 group-hover:text-gray-600') // Expanded & Inactive
              }
            `}>
              <Icon size={20} />
            </div>
          )}

          {/* Label: Hide if collapsed */}
          {!isCollapsed && (
            <span className={`truncate ${getTextStyles()} flex-1`}>
              {item.label}
            </span>
          )}

          {/* Visual Indicator for Depth 2 Active Item (The dot) */}
          {!isCollapsed && isDepth2 && isActiveExact && (
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1 shrink-0 animate-pulse" />
          )}
        </div>
        
        {/* Expand/Collapse Arrow */}
        {!isCollapsed && hasChildren && (
          <span className={`ml-2 transition-transform duration-200 ${isActivePath ? 'text-blue-600' : 'text-gray-400'} ${isExpanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={14} strokeWidth={2} />
          </span>
        )}
      </div>
      
      {/* Recursive Children */}
      {!isCollapsed && hasChildren && (
        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            {/* Vertical Guide Line for Children */}
            <div className="relative">
                {isDepth0 && isExpanded && (
                    <div className="absolute left-[26px] top-0 bottom-2 w-px bg-gray-200/70" />
                )}
                <ul className="py-0.5">
                {item.children!.map(child => (
                    <SidebarItem 
                    key={child.id} 
                    item={child} 
                    depth={depth + 1} 
                    activeId={activeId}
                    isCollapsed={isCollapsed}
                    onNavigate={onNavigate}
                    />
                ))}
                </ul>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, onCloseMobile, onToggleCollapse, activeId, onNavigate }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-16 bottom-0 left-0 z-40 bg-white border-r border-gray-200 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-[72px]' : 'w-[260px]'}
      `}>
        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <ul>
            {SIDEBAR_MENU.map(item => (
              <SidebarItem 
                key={item.id} 
                item={item} 
                activeId={activeId} 
                isCollapsed={isCollapsed}
                onNavigate={(id) => {
                  onNavigate(id);
                  if (window.innerWidth < 1024) onCloseMobile();
                }}
              />
            ))}
          </ul>
        </div>

        {/* Footer / Collapse Toggle */}
        <div className="bg-white border-t border-gray-100 flex flex-col shrink-0">
            <div className={`hidden lg:flex items-center border-b border-gray-100 ${isCollapsed ? 'justify-center p-3' : 'justify-end px-4 py-3'}`}>
              <button 
                onClick={onToggleCollapse}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-blue-600 transition-all border border-transparent hover:border-gray-200"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
              </button>
            </div>

            {!isCollapsed ? (
              <div className="p-5">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      D3
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">Dealer365</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">v4.0.1 Build 2025</p>
                   </div>
                </div>
              </div>
            ) : (
               <div className="p-4 flex justify-center">
                  <div className="w-6 h-6 rounded bg-gray-100 text-gray-400 flex items-center justify-center text-[9px] font-bold">v4</div>
               </div>
            )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
