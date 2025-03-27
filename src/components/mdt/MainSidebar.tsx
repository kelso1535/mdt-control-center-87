
import React, { useState } from 'react';
import { OfficerStatus } from '@/types';
import { 
  Shield, 
  ChevronDown, 
  AlertTriangle, 
  Flag, 
  LogOut, 
  X 
} from 'lucide-react';
import StatusMenu from './StatusMenu';

interface MainSidebarProps {
  callsign: string;
  currentStatus: OfficerStatus;
  onStatusChange: (status: OfficerStatus) => void;
  onDuress: () => void;
  onFlagStolen: () => void;
  onLogout: () => void;
  userRole?: 'officer' | 'magistrate';
}

const MainSidebar: React.FC<MainSidebarProps> = ({
  callsign,
  currentStatus,
  onStatusChange,
  onDuress,
  onFlagStolen,
  onLogout,
  userRole = 'officer'
}) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  
  return (
    <div className="mdt-main-sidebar bg-[#0f1824] border-r border-[#1c3a5a] flex flex-col text-white">
      <div className="mb-4 p-4 text-center">
        <h2 className="text-3xl font-bold text-[#007bff]">CrimTrac</h2>
        <div className="mt-4 flex justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center">
            <Shield className="w-12 h-12 text-[#007bff]" />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400">Mobile Data Terminal</p>
      </div>
      
      <div className="flex-1">
        {showStatusMenu && (
          <div className="mx-2 mb-2 bg-[#0a1422] border border-[#1c3a5a] rounded overflow-hidden">
            <StatusMenu
              currentStatus={currentStatus}
              onStatusChange={(status) => {
                onStatusChange(status);
                setShowStatusMenu(false);
              }}
            />
          </div>
        )}
      </div>
      
      <div className="mt-auto space-y-1 px-2 mb-2">
        <button
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className="w-full flex items-center justify-between bg-[#007bff] hover:bg-[#0069d9] text-white py-2 px-3 rounded text-sm"
        >
          <span className="flex items-center">
            <ChevronDown className="w-4 h-4 mr-2" />
            Change Status
          </span>
        </button>
        
        <button
          onClick={onDuress}
          className="w-full bg-red-700 hover:bg-red-600 text-white py-2 px-3 rounded flex items-center text-sm"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          [- DURESS -]
        </button>
        
        <button
          onClick={onFlagStolen}
          className="w-full bg-[#0f1824] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-3 rounded flex items-center text-sm"
        >
          <Flag className="w-4 h-4 mr-2" />
          Flag Police Unit Stolen
        </button>
        
        <button
          onClick={onLogout}
          className="w-full bg-[#0f1824] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-3 rounded flex items-center text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout of MDT
        </button>
        
        <button
          onClick={onLogout}
          className="w-full bg-[#0f1824] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-3 rounded flex items-center text-sm"
        >
          <X className="w-4 h-4 mr-2" />
          Exit
        </button>
      </div>
      
      <div className="m-2 p-3 bg-[#0a1422] border border-[#1c3a5a] rounded-md">
        <div className="flex items-center justify-center">
          <Shield className="w-5 h-5 text-[#007bff]" />
        </div>
        <div className="text-xs text-center mt-1">
          <div>Officer: <span className="text-[#007bff]">{callsign}</span></div>
          <div className="mt-1">Status: <span className="text-[#007bff]">{currentStatus}</span></div>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
