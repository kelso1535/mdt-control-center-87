
import React from 'react';
import { 
  Search, 
  Car, 
  Clock, 
  FileText, 
  AlertTriangle, 
  DollarSign, 
  Box, 
  ShieldAlert, 
  Users, 
  BarChart3, 
  Gavel, 
  Calendar, 
  LogOut 
} from 'lucide-react';

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
  | 'supervisor' 
  | 'financial' 
  | 'wanted' 
  | 'admin' 
  | 'court' 
  | 'magistrate';

interface NavigationSidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  onLogout: () => void;
  userRole?: 'officer' | 'magistrate';
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ 
  currentScreen, 
  onScreenChange,
  onLogout,
  userRole = 'officer'
}) => {
  // Determine which menu to show based on user role
  if (userRole === 'magistrate') {
    return (
      <div className="mdt-nav-sidebar h-full bg-[#0a1422] border-r border-[#1c3a5a] overflow-y-auto">
        <div className="p-3">
          <h3 className="text-[#007bff] text-sm font-semibold mb-4">MAGISTRATE PANEL</h3>
          
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => onScreenChange('magistrate')}
              className={`flex items-center px-3 py-2 text-sm rounded-md ${
                currentScreen === 'magistrate' 
                  ? 'bg-[#1c3a5a] text-white' 
                  : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 mr-3" />
              Availability
            </button>
            
            <button
              onClick={() => onScreenChange('court')}
              className={`flex items-center px-3 py-2 text-sm rounded-md ${
                currentScreen === 'court' 
                  ? 'bg-[#1c3a5a] text-white' 
                  : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
              }`}
            >
              <Gavel className="w-4 h-4 mr-3" />
              Court Cases
            </button>
            
            <button
              onClick={() => onScreenChange('criminal')}
              className={`flex items-center px-3 py-2 text-sm rounded-md ${
                currentScreen === 'criminal' 
                  ? 'bg-[#1c3a5a] text-white' 
                  : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4 mr-3" />
              Criminal Records
            </button>
            
            <button
              onClick={() => onLogout()}
              className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-[#1c3a5a] hover:text-white mt-auto"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>
    );
  }
  
  // Police officer navigation
  return (
    <div className="mdt-nav-sidebar h-full bg-[#0a1422] border-r border-[#1c3a5a] overflow-y-auto">
      <div className="p-3">
        <h3 className="text-[#007bff] text-sm font-semibold mb-4">POLICE DATABASE</h3>
        
        <nav className="flex flex-col space-y-1">
          <button
            onClick={() => onScreenChange('people')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'people' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <Search className="w-4 h-4 mr-3" />
            People Search
          </button>
          
          <button
            onClick={() => onScreenChange('vehicles')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'vehicles' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <Car className="w-4 h-4 mr-3" />
            Vehicle Search
          </button>
          
          <button
            onClick={() => onScreenChange('history')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'history' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 mr-3" />
            Search History
          </button>
          
          <div className="border-t border-[#1c3a5a] my-2 pt-2">
            <h3 className="text-[#007bff] text-xs font-semibold mb-2 pl-2">RECORDS</h3>
          </div>
          
          <button
            onClick={() => onScreenChange('criminal')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'criminal' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4 mr-3" />
            Criminal Records
          </button>
          
          <button
            onClick={() => onScreenChange('traffic')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'traffic' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <Car className="w-4 h-4 mr-3" />
            Traffic Citations
          </button>
          
          <button
            onClick={() => onScreenChange('reports')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'reports' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 mr-3" />
            Police Reports
          </button>
          
          <button
            onClick={() => onScreenChange('court')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'court' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <Gavel className="w-4 h-4 mr-3" />
            Court Cases
          </button>
          
          <div className="border-t border-[#1c3a5a] my-2 pt-2">
            <h3 className="text-[#007bff] text-xs font-semibold mb-2 pl-2">OTHER</h3>
          </div>
          
          <button
            onClick={() => onScreenChange('financial')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'financial' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4 mr-3" />
            Financial Records
          </button>
          
          <button
            onClick={() => onScreenChange('serials')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'serials' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <Box className="w-4 h-4 mr-3" />
            Serial Numbers
          </button>
          
          <button
            onClick={() => onScreenChange('wanted')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'wanted' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 mr-3" />
            Wanted Persons
          </button>
          
          <div className="border-t border-[#1c3a5a] my-2 pt-2">
            <h3 className="text-[#007bff] text-xs font-semibold mb-2 pl-2">MANAGEMENT</h3>
          </div>
          
          <button
            onClick={() => onScreenChange('supervisor')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'supervisor' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 mr-3" />
            Units & Officers
          </button>
          
          <button
            onClick={() => onScreenChange('actions')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'actions' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-3" />
            Actions Log
          </button>
          
          <button
            onClick={() => onScreenChange('admin')}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              currentScreen === 'admin' 
                ? 'bg-[#1c3a5a] text-white' 
                : 'text-gray-300 hover:bg-[#1c3a5a] hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 mr-3" />
            Administration
          </button>
        </nav>
      </div>
    </div>
  );
};

export default NavigationSidebar;
