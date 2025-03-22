
import React from 'react';

type Screen = 
  | 'login' 
  | 'people' 
  | 'vehicles' 
  | 'history' 
  | 'criminal' 
  | 'traffic' 
  | 'reports' 
  | 'serials' 
  | 'actions' 
  | 'financial' 
  | 'supervisor' 
  | 'wanted'
  | 'admin';

interface NavigationSidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  onLogout: () => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentScreen,
  onScreenChange
}) => {
  const navItems: {id: Screen; label: string}[] = [
    { id: 'people', label: 'People Search' },
    { id: 'vehicles', label: 'Vehicle Search' },
    { id: 'history', label: 'Search History' },
    { id: 'criminal', label: 'Criminal History' },
    { id: 'traffic', label: 'Traffic Offenses' },
    { id: 'reports', label: 'Reports' },
    { id: 'serials', label: 'Serial Search' },
    { id: 'actions', label: 'Actions' },
    { id: 'financial', label: 'Financial Records' },
    { id: 'supervisor', label: 'Units' },
    { id: 'wanted', label: 'Warrants' },
    { id: 'admin', label: 'Admin' }
  ];

  return (
    <div className="w-64 bg-[#0a1726] border-r border-[#1c3a5a] text-white">
      <div className="py-4">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={`
              px-4 py-2 cursor-pointer hover:bg-[#1c3a5a] transition-colors
              ${currentScreen === item.id ? 'bg-[#007bff] text-white' : 'text-gray-300'}
            `}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationSidebar;
