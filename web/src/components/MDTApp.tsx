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
  | 'wanted';

interface MDTAppProps {
  sendNUIMessage: (data: any) => void;
  nuiCallback: (event: string, data: any) => void;
}

const MDTApp: React.FC<MDTAppProps> = ({ sendNUIMessage, nuiCallback }) => {
  const { toast } = useToast();
  const [loggedIn, setLoggedIn] = useState(false);
  const [callsign, setCallsign] = useState('');
  const [currentStatus, setCurrentStatus] = useState<OfficerStatus>('Code 1 On Patrol');
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleLogin = (officerCallsign: string) => {
    setCallsign(officerCallsign);
    setLoggedIn(true);
    setCurrentScreen('people');
    nuiCallback('login', { callsign: officerCallsign });
    toast({
      title: "Login Successful",
      description: `Welcome Officer ${officerCallsign}`,
    });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentScreen('login');
    setCallsign('');
    nuiCallback('closeApp', {});
    toast({
      title: "Logged Out",
      description: "You have been logged out of the MDT",
    });
  };

  const handleChangeStatus = (status: OfficerStatus) => {
    setCurrentStatus(status);
    nuiCallback('changeStatus', { status });
    toast({
      title: "Status Updated",
      description: `Status set to: ${status}`,
    });
  };

  const handleFlagStolen = () => {
    nuiCallback('flagStolen', {});
    toast({
      title: "Vehicle Flagged",
      description: "Police unit has been flagged as stolen",
      variant: "destructive",
    });
  };

  const handleDuress = () => {
    nuiCallback('duress', {});
    toast({
      title: "DURESS ALERT ACTIVATED",
      description: "All available units have been notified of your location",
      variant: "destructive",
    });
  };

  if (!loggedIn) {
    return (
      <div className="mdt-container">
        <LoginScreen onLogin={handleLogin} />
        <div className="screen-overlay"></div>
      </div>
    );
  }

  return (
    <div className="mdt-container">
      <div className="mdt-main">
        <MainSidebar 
          callsign={callsign}
          currentStatus={currentStatus}
          onStatusChange={handleChangeStatus}
          onDuress={handleDuress}
          onFlagStolen={handleFlagStolen}
          onLogout={handleLogout}
        />
        
        <NavigationSidebar 
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          onLogout={handleLogout}
        />
        
        <div className="mdt-content">
          <ContentRenderer currentScreen={currentScreen} />
        </div>
      </div>
      <div className="screen-overlay"></div>
    </div>
  );
};

export default MDTApp;
