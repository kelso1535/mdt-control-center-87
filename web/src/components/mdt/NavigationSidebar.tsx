
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
    <div className="w-48 bg-sidebar border-r border-sidebar-border p-2">
      <div className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={`w-full text-left p-2 rounded text-sm ${
              currentScreen === item.id
                ? 'bg-police-blue text-white'
                : 'text-white hover:bg-muted'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationSidebar;
