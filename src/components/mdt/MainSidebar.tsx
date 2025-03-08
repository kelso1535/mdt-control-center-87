
import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, Flag, LogOut, User, Users, X } from 'lucide-react';
import { OfficerStatus } from '@/types';
import MDTLogo from '../MDTLogo';
import SidebarButton from '../SidebarButton';
import StatusMenu from './StatusMenu';

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
  
  const handleChangeStatus = (status: OfficerStatus) => {
    onStatusChange(status);
    setShowStatusMenu(false);
  };

  return (
    <div className="mdt-sidebar">
      <div className="mdt-logo">
        <MDTLogo />
      </div>
      
      <SidebarButton 
        icon={<User className="w-full h-full" />}
        variant="blue"
      >
        Login to MDT
      </SidebarButton>
      
      <div className="relative mt-2">
        <SidebarButton 
          icon={<ChevronDown className="w-full h-full" />}
          onClick={() => setShowStatusMenu(!showStatusMenu)}
        >
          Change Status
        </SidebarButton>
        
        <StatusMenu 
          isOpen={showStatusMenu} 
          onSelect={handleChangeStatus} 
        />
      </div>
      
      <SidebarButton 
        icon={<AlertTriangle className="w-full h-full" />}
        variant="alert"
        onClick={onDuress}
      >
        [- DURESS -]
      </SidebarButton>
      
      <SidebarButton 
        icon={<Flag className="w-full h-full" />}
        onClick={onFlagStolen}
      >
        Flag Police Unit Stolen
      </SidebarButton>
      
      <SidebarButton 
        icon={<LogOut className="w-full h-full" />}
        onClick={onLogout}
      >
        Logout of MDT
      </SidebarButton>
      
      <SidebarButton 
        icon={<X className="w-full h-full" />}
        onClick={onLogout}
      >
        Exit
      </SidebarButton>
      
      <div className="flex-1"></div>
      
      <div className="text-xs text-muted-foreground mt-4">
        Officer: {callsign}
        <br />
        Status: {currentStatus}
      </div>
    </div>
  );
};

export default MainSidebar;
