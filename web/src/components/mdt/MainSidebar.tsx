
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
    <div className="w-48 bg-sidebar border-r border-sidebar-border p-3 flex flex-col" style={{ minWidth: '160px' }}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">MDT System</h2>
        <p className="text-sm text-white">Officer: {callsign}</p>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-white font-bold">Status</p>
        <p className="text-white">{currentStatus}</p>
      </div>
      
      <div className="flex flex-col mt-2 space-y-2">
        <button
          onClick={() => onStatusChange('Code 1 On Patrol')}
          className="simple-button"
        >
          Code 1 On Patrol
        </button>
        <button
          onClick={() => onStatusChange('Code 2 Responding')}
          className="simple-button"
        >
          Code 2 Responding
        </button>
        <button
          onClick={() => onStatusChange('Code 3 Emergency')}
          className="simple-button"
        >
          Code 3 Emergency
        </button>
        <button
          onClick={onDuress}
          className="simple-button bg-destructive"
        >
          DURESS
        </button>
        <button
          onClick={onFlagStolen}
          className="simple-button"
        >
          Flag Unit as Stolen
        </button>
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
