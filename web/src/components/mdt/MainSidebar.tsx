
import React from 'react';
import { OfficerStatus } from '@/types';

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
  onLogout
}) => {
  return (
    <div className="w-48 bg-black border-r border-gray-800 p-3 flex flex-col" style={{ minWidth: '160px' }}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">MDT System</h2>
        <p className="text-sm text-white">Officer: {callsign}</p>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-white font-bold">Status</p>
        <p className="text-white">{currentStatus}</p>
      </div>
      
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MainSidebar;
