
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
    <div className="w-48 bg-black border-r border-gray-800 p-2" style={{ minWidth: '160px' }}>
      <div className="space-y-0">
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={`nav-item ${
              currentScreen === item.id ? 'active' : ''
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationSidebar;
