
import React from 'react';
import { OfficerStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import StatusMenu from './StatusMenu';
import DashedDivider from '../DashedDivider';
import { AlertTriangle, LogOut, Shield } from 'lucide-react';

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
  return (
    <div className="w-14 bg-sidebar-background flex flex-col items-center py-4 border-r border-sidebar-border/30">
      <div className="text-police-blue">
        {userRole === 'magistrate' ? (
          <div className="p-2 rounded-full bg-police-blue/10 border border-police-blue/20">
            <Shield size={18} />
          </div>
        ) : (
          <div className="p-2 rounded-full bg-police-blue/10 border border-police-blue/20">
            <Shield size={18} />
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center mt-2">
        <span className="text-sm font-bold text-police-blue">{callsign}</span>
        <span className="text-xs text-muted-foreground mt-1">
          {userRole === 'magistrate' ? 'Magistrate' : 'Officer'}
        </span>
      </div>
      
      {userRole === 'officer' && (
        <>
          <DashedDivider />
          
          <div className="mt-2">
            <StatusMenu 
              currentStatus={currentStatus} 
              onStatusChange={onStatusChange}
            />
          </div>
          
          <DashedDivider />
          
          <div className="mt-4 mb-2 text-xs text-center text-muted-foreground">
            Emergency
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onDuress}
            className="bg-red-900/20 hover:bg-red-900/30 text-red-500 border border-red-900/30 mb-2"
          >
            <AlertTriangle size={18} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon" 
            onClick={onFlagStolen}
            className="bg-sidebar-item-hover text-sidebar-icon border border-sidebar-border/30"
          >
            <Shield size={18} />
          </Button>
        </>
      )}
      
      <div className="mt-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          className="bg-sidebar-item-hover text-sidebar-icon border border-sidebar-border/30"
        >
          <LogOut size={18} />
        </Button>
      </div>
    </div>
  );
};

export default MainSidebar;
