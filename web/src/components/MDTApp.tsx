
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { OfficerStatus } from '@/types';
import LoginScreen from './LoginScreen';
import MainSidebar from './mdt/MainSidebar';
import NavigationSidebar from './mdt/NavigationSidebar';
import ContentRenderer from './mdt/ContentRenderer';

type Screen = 
  | 'login'
  | 'people'
  | 'vehicles'
  | 'history'
  | 'criminal'
  | 'traffic'
  | 'reports'
  | 'serials'
  | 'actions'
  | 'financial'
  | 'supervisor'
  | 'wanted'
  | 'admin'
  | 'court'
  | 'magistrate';  // Added court and magistrate screens

interface MDTAppProps {
  sendNUIMessage?: (data: any) => void;
  nuiCallback?: (event: string, data: any) => void;
}

const MDTApp: React.FC<MDTAppProps> = ({ sendNUIMessage, nuiCallback }) => {
  const { toast } = useToast();
  const [loggedIn, setLoggedIn] = useState(false);
  const [callsign, setCallsign] = useState('');
  const [currentStatus, setCurrentStatus] = useState<OfficerStatus>('Code 1 On Patrol');
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<'officer' | 'magistrate'>('officer');

  const handleLogin = (officerCallsign: string, role: 'officer' | 'magistrate' = 'officer') => {
    setCallsign(officerCallsign);
    setLoggedIn(true);
    setUserRole(role);
    setCurrentScreen(role === 'magistrate' ? 'magistrate' : 'people');
    toast({
      title: "Login Successful",
      description: `Welcome ${role === 'magistrate' ? 'Magistrate' : 'Officer'} ${officerCallsign}`,
    });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentScreen('login');
    setCallsign('');
    toast({
      title: "Logged Out",
      description: "You have been logged out of the MDT",
    });
  };

  const handleChangeStatus = (status: OfficerStatus) => {
    setCurrentStatus(status);
    toast({
      title: "Status Updated",
      description: `Status set to: ${status}`,
    });
  };

  const handleFlagStolen = () => {
    toast({
      title: "Vehicle Flagged",
      description: "Police unit has been flagged as stolen",
      variant: "destructive",
    });
  };

  const handleDuress = () => {
    toast({
      title: "DURESS ALERT ACTIVATED",
      description: "All available units have been notified of your location",
      variant: "destructive",
    });
  };

  if (!loggedIn) {
    return (
      <div className="w-full h-full bg-[#0a1422]">
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0a1422]">
      <div className="flex h-full">
        <MainSidebar 
          callsign={callsign}
          currentStatus={currentStatus}
          onStatusChange={handleChangeStatus}
          onDuress={handleDuress}
          onFlagStolen={handleFlagStolen}
          onLogout={handleLogout}
          userRole={userRole}
        />
        
        <NavigationSidebar 
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          onLogout={handleLogout}
          userRole={userRole}
        />
        
        <div className="flex-1 h-full overflow-auto bg-[#0a1726]">
          <ContentRenderer 
            currentScreen={currentScreen} 
            userRole={userRole}
            callsign={callsign}
          />
        </div>
      </div>
    </div>
  );
};

export default MDTApp;
