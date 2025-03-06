
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Search, Clock, Clipboard, Database, Flag, LogOut, X, ChevronDown, User, Users, FileSearch, ShieldAlert } from 'lucide-react';
import MDTLogo from './MDTLogo';
import SidebarButton from './SidebarButton';
import LoginScreen from './LoginScreen';
import PeopleSearch from './screens/PeopleSearch';
import VehicleSearch from './screens/VehicleSearch';
import SearchHistory from './screens/SearchHistory';
import CriminalHistory from './screens/CriminalHistory';
import TrafficOffences from './screens/TrafficOffences';
import FinancialRecords from './screens/FinancialRecords';
import SerialSearch from './screens/SerialSearch';
import Actions from './screens/Actions';
import Units from './screens/Units';
import Warrants from './screens/Warrants';
import Reports from './screens/Reports';
import { OfficerStatus } from '@/types';

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

const MDTApp: React.FC = () => {
  const { toast } = useToast();
  const [loggedIn, setLoggedIn] = useState(false);
  const [callsign, setCallsign] = useState('');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OfficerStatus>('Code 1 On Patrol');
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleLogin = (officerCallsign: string) => {
    setCallsign(officerCallsign);
    setLoggedIn(true);
    setCurrentScreen('people');
    toast({
      title: "Login Successful",
      description: `Welcome Officer ${officerCallsign}`,
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
    setShowStatusMenu(false);
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

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'people':
        return <PeopleSearch />;
      case 'vehicles':
        return <VehicleSearch />;
      case 'history':
        return <SearchHistory />;
      case 'criminal':
        return <CriminalHistory />;
      case 'traffic':
        return <TrafficOffences />;
      case 'reports':
        return <Reports />;
      case 'serials':
        return <SerialSearch />;
      case 'actions':
        return <Actions />;
      case 'financial':
        return <FinancialRecords />;
      case 'supervisor':
        return <Units />;
      case 'wanted':
        return <Warrants />;
      default:
        return <PeopleSearch />;
    }
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
          
          <SidebarButton 
            icon={<Users className="w-full h-full" />}
            variant="blue"
          >
            Login Auto Callsign
          </SidebarButton>
          
          <div className="relative mt-2">
            <SidebarButton 
              icon={<ChevronDown className="w-full h-full" />}
              onClick={() => setShowStatusMenu(!showStatusMenu)}
            >
              Change Status
            </SidebarButton>
            
            {showStatusMenu && (
              <div className="absolute top-full left-0 w-full bg-popover border border-border z-10 rounded-md mt-1 py-1 shadow-xl animate-fade-in">
                <button 
                  className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
                  onClick={() => handleChangeStatus('Code 1 On Patrol')}
                >
                  Code 1 On Patrol
                </button>
                <button 
                  className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
                  onClick={() => handleChangeStatus('Code 2 Arrived at Station')}
                >
                  Code 2 Arrived at Station
                </button>
                <button 
                  className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
                  onClick={() => handleChangeStatus('Code 4 Traffic Stop')}
                >
                  Code 4 Traffic Stop
                </button>
                <button 
                  className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
                  onClick={() => handleChangeStatus('Code 5 Arrived on Scene')}
                >
                  Code 5 Arrived on Scene
                </button>
                <button 
                  className="w-full text-left px-3 py-2 hover:bg-muted text-sm transition-colors"
                  onClick={() => handleChangeStatus('Code 6 Unavailable')}
                >
                  Code 6 Unavailable
                </button>
              </div>
            )}
          </div>
          
          <SidebarButton 
            icon={<AlertTriangle className="w-full h-full" />}
            variant="alert"
            onClick={handleDuress}
          >
            [- DURESS -]
          </SidebarButton>
          
          <SidebarButton 
            icon={<ShieldAlert className="w-full h-full" />}
          >
            Law Enforcement
            <br />Assistance Program (LEAP)
          </SidebarButton>
          
          <SidebarButton 
            icon={<Flag className="w-full h-full" />}
            onClick={handleFlagStolen}
          >
            Flag Police Unit Stolen
          </SidebarButton>
          
          <SidebarButton 
            icon={<LogOut className="w-full h-full" />}
            onClick={handleLogout}
          >
            Logout of MDT
          </SidebarButton>
          
          <SidebarButton 
            icon={<X className="w-full h-full" />}
            onClick={handleLogout}
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
        
        <div className="mdt-sidebar" style={{ width: '200px' }}>
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'people' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('people')}
          >
            <Search className="mdt-sidebar-icon" />
            <span>SEARCH PEOPLE</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'vehicles' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('vehicles')}
          >
            <Search className="mdt-sidebar-icon" />
            <span>SEARCH VEHICLE</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'history' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('history')}
          >
            <Clock className="mdt-sidebar-icon" />
            <span>SEARCH HISTORY</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'criminal' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('criminal')}
          >
            <Clipboard className="mdt-sidebar-icon" />
            <span>CRIM HIST</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'traffic' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('traffic')}
          >
            <Clipboard className="mdt-sidebar-icon" />
            <span>TRAFFIC OFFENCES</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'reports' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('reports')}
          >
            <Clipboard className="mdt-sidebar-icon" />
            <span>REPORTS</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'serials' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('serials')}
          >
            <FileSearch className="mdt-sidebar-icon" />
            <span>SERIALS</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'actions' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('actions')}
          >
            <AlertTriangle className="mdt-sidebar-icon" />
            <span>ACTIONS</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'financial' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('financial')}
          >
            <Database className="mdt-sidebar-icon" />
            <span>FIN. RECORDS</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'supervisor' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('supervisor')}
          >
            <Users className="mdt-sidebar-icon" />
            <span>SUPERVISOR</span>
          </div>
          
          <div 
            className={`mdt-sidebar-item ${currentScreen === 'wanted' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('wanted')}
          >
            <AlertTriangle className="mdt-sidebar-icon" />
            <span>WANTED</span>
          </div>
          
          <div className="mdt-sidebar-item" onClick={handleLogout}>
            <LogOut className="mdt-sidebar-icon" />
            <span>EXIT</span>
          </div>
        </div>
        
        <div className="mdt-content">
          {renderScreen()}
        </div>
      </div>
      <div className="screen-overlay"></div>
    </div>
  );
};

export default MDTApp;
