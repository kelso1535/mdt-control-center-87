
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
  onStatusChange,
  onDuress,
  onFlagStolen,
  onLogout
}) => {
  return (
    <div className="w-48 bg-sidebar border-r border-sidebar-border p-3 flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-police-blue">MDT System</h2>
        <p className="text-sm text-white">Officer: {callsign}</p>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-police-blue font-bold">Status</p>
        <p className="text-white">{currentStatus}</p>
      </div>
      
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full bg-red-700 hover:bg-red-800 text-white p-2 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MainSidebar;
