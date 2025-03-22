
import React, { useState } from 'react';
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
  | 'admin';

const MDTApp: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [callsign, setCallsign] = useState('');
  const [currentStatus, setCurrentStatus] = useState<OfficerStatus>('Code 1 On Patrol');
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleLogin = (officerCallsign: string) => {
    setCallsign(officerCallsign);
    setLoggedIn(true);
    setCurrentScreen('people');
    // Toast will be handled by use-toast once we add it
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentScreen('login');
    setCallsign('');
    // Toast will be handled by use-toast once we add it
  };

  const handleChangeStatus = (status: OfficerStatus) => {
    setCurrentStatus(status);
    // Toast will be handled by use-toast once we add it
  };

  const handleFlagStolen = () => {
    // Toast will be handled by use-toast once we add it
  };

  const handleDuress = () => {
    // Toast will be handled by use-toast once we add it
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
