
import React from 'react';
import { 
  Search, 
  Clipboard, 
  Clock, 
  Database, 
  AlertTriangle, 
  Users, 
  Settings, 
  LogOut,
  Shield
} from 'lucide-react';

type Screen = 
  | 'login' 
  | 'people' 
  | 'vehicles' 
  | 'history' 
  | 'serials' 
  | 'criminal' 
  | 'traffic' 
  | 'reports' 
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
  onScreenChange,
  onLogout
}) => {
  return (
    <div className="w-[250px] bg-[#0d1e33] border-r border-[#1c3a5a] text-white overflow-y-auto">
      <div className="p-3 border-b border-[#1c3a5a]">
        <div className="flex items-center text-xs font-bold text-[#007bff] mb-1">
          <Shield className="w-4 h-4 mr-1" />
          POLICE DEPARTMENT
        </div>
      </div>
      
      <div className="py-2">
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'people' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('people')}
        >
          <Search className="w-4 h-4" />
          <span className="text-sm">SEARCH PEOPLE</span>
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'vehicles' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('vehicles')}
        >
          <Search className="w-4 h-4" />
          <span className="text-sm">SEARCH VEHICLE</span>
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'serials' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('serials')}
        >
          <Search className="w-4 h-4" />
          <span className="text-sm">SEARCH SERIALS</span>
        </div>
      </div>
      
      <div className="border-t border-[#1c3a5a] pt-2 mt-1">
        <div className="px-3 py-1 flex items-center text-xs font-bold text-[#007bff]">
          <Clipboard className="w-4 h-4 mr-1" />
          RECORDS
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'criminal' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('criminal')}
        >
          <Clipboard className="w-4 h-4" />
          <span className="text-sm">CRIM HIST</span>
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'traffic' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('traffic')}
        >
          <Clipboard className="w-4 h-4" />
          <span className="text-sm">TRAFFIC OFFENCES</span>
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'reports' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('reports')}
        >
          <Clipboard className="w-4 h-4" />
          <span className="text-sm">REPORTS</span>
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'financial' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('financial')}
        >
          <Database className="w-4 h-4" />
          <span className="text-sm">FIN. RECORDS</span>
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'history' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('history')}
        >
          <Clock className="w-4 h-4" />
          <span className="text-sm">SEARCH HISTORY</span>
        </div>
      </div>
      
      <div className="border-t border-[#1c3a5a] pt-2 mt-1">
        <div className="px-3 py-1 flex items-center text-xs font-bold text-[#007bff]">
          <AlertTriangle className="w-4 h-4 mr-1" />
          SYSTEM
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'actions' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('actions')}
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">ACTIONS</span>
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'supervisor' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('supervisor')}
        >
          <Users className="w-4 h-4" />
          <span className="text-sm">SUPERVISOR</span>
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'wanted' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('wanted')}
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">WANTED</span>
        </div>
        
        <div 
          className={`px-3 py-2 flex items-center gap-2 cursor-pointer ${currentScreen === 'admin' ? 'bg-[#007bff] text-white' : 'hover:bg-[#1c3a5a]'}`}
          onClick={() => onScreenChange('admin')}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm">ADMIN</span>
        </div>
      </div>
      
      <div className="mt-2 border-t border-[#1c3a5a] pt-2">
        <div 
          className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#1c3a5a]"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">EXIT</span>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
