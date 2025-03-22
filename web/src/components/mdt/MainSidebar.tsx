
import React, { useState } from 'react';
import { OfficerStatus } from '@/types';
import { Shield, ChevronDown, AlertTriangle, Flag, LogOut, X } from 'lucide-react';

interface MainSidebarProps {
  callsign: string;
  currentStatus: OfficerStatus;
  onStatusChange: (status: OfficerStatus) => void;
  onDuress: () => void;
  onFlagStolen: () => void;
  onLogout: () => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({
  callsign,
  currentStatus,
  onStatusChange,
  onDuress,
  onFlagStolen,
  onLogout
}) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  
  return (
    <div className="w-[250px] bg-[#0d1e33] border-r border-[#1c3a5a] p-4 flex flex-col text-white">
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-[#007bff]">MDT</h2>
        <div className="mt-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#0d1e33] border-2 border-[#007bff] flex items-center justify-center">
            <Shield className="w-12 h-12 text-[#007bff]" />
          </div>
        </div>
        <p className="mt-2 text-center">Police Department</p>
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Status buttons will show when the change status button is clicked */}
        {showStatusMenu && (
          <div className="mb-2 bg-[#0a1422] border border-[#1c3a5a] rounded overflow-hidden">
            <button
              onClick={() => {
                onStatusChange('Code 1 On Patrol');
                setShowStatusMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-[#1c3a5a] text-white"
            >
              Code 1 On Patrol
            </button>
            <button
              onClick={() => {
                onStatusChange('Code 2 Responding');
                setShowStatusMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-[#1c3a5a] text-white"
            >
              Code 2 Responding
            </button>
            <button
              onClick={() => {
                onStatusChange('Code 3 Emergency');
                setShowStatusMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-[#1c3a5a] text-white"
            >
              Code 3 Emergency
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-auto space-y-2">
        <button
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className="w-full flex items-center justify-between bg-[#007bff] hover:bg-[#0069d9] text-white py-2 px-4 rounded"
        >
          <span>Change Status</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        
        <button
          onClick={onDuress}
          className="w-full bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          [- DURESS -]
        </button>
        
        <button
          onClick={onFlagStolen}
          className="w-full bg-[#0d1e33] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-4 rounded flex items-center"
        >
          <Flag className="w-4 h-4 mr-2" />
          Flag Police Unit Stolen
        </button>
        
        <button
          onClick={onLogout}
          className="w-full bg-[#0d1e33] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-4 rounded flex items-center"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout of MDT
        </button>
        
        <button
          onClick={onLogout}
          className="w-full bg-[#0d1e33] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-4 rounded flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Exit
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-[#0a1422] border border-[#1c3a5a] rounded-md">
        <div className="flex items-center justify-center mb-2">
          <Shield className="w-5 h-5 text-[#007bff]" />
        </div>
        <div className="text-xs text-center">
          <div>Officer: <span className="text-[#007bff]">{callsign}</span></div>
          <div className="mt-1">Status: <span className="text-[#007bff]">{currentStatus}</span></div>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
