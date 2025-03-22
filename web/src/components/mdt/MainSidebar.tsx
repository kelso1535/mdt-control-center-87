
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
    <div className="w-64 bg-[#0d1e33] border-r border-[#1c3a5a] p-4 flex flex-col text-white">
      <div className="mb-4">
        <h2 className="text-xl font-bold">MDT System</h2>
        <p className="text-sm text-gray-400">Officer: {callsign}</p>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-400 font-bold">Status</p>
        <p className="text-white">{currentStatus}</p>
      </div>
      
      <div className="flex flex-col mt-4 space-y-2">
        <button
          onClick={() => onStatusChange('Code 1 On Patrol')}
          className="bg-[#0d1e33] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-4 rounded"
        >
          Code 1 On Patrol
        </button>
        <button
          onClick={() => onStatusChange('Code 2 Responding')}
          className="bg-[#0d1e33] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-4 rounded"
        >
          Code 2 Responding
        </button>
        <button
          onClick={() => onStatusChange('Code 3 Emergency')}
          className="bg-[#0d1e33] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-4 rounded"
        >
          Code 3 Emergency
        </button>
        <button
          onClick={onDuress}
          className="bg-red-800 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          DURESS
        </button>
        <button
          onClick={onFlagStolen}
          className="bg-[#0d1e33] border border-[#1c3a5a] hover:bg-[#1c3a5a] text-white py-2 px-4 rounded"
        >
          Flag Unit as Stolen
        </button>
      </div>
      
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full bg-[#1c3a5a] hover:bg-[#0d1e33] text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MainSidebar;
