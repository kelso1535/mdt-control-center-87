
import React from 'react';
import { OfficerStatus } from '@/types';

interface StatusMenuProps {
  isOpen?: boolean;
  currentStatus: OfficerStatus;
  onStatusChange: (status: OfficerStatus) => void;
}

const StatusMenu: React.FC<StatusMenuProps> = ({ 
  isOpen = true, 
  currentStatus, 
  onStatusChange 
}) => {
  const statusOptions: OfficerStatus[] = [
    'Code 1 On Patrol',
    'Code 2 Responding',
    'Code 3 Emergency',
    'Break',
    'Meal Break',
    'Off Duty',
    'On Scene',
    'Unavailable',
    'Busy'
  ];

  return (
    <div className="flex flex-col space-y-1">
      {statusOptions.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            currentStatus === status
              ? 'bg-police-blue text-white'
              : 'bg-sidebar-item-hover text-sidebar-icon hover:bg-sidebar-item-hover/80'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default StatusMenu;
