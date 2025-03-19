
import React, { useState } from 'react';
import MDTLogo from './MDTLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface LoginScreenProps {
  onLogin: (callsign: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [callsign, setCallsign] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!callsign.trim()) {
      toast.error('Please enter a valid callsign');
      return;
    }
    
    setLoading(true);
    // Simulate login API call
    setTimeout(() => {
      onLogin(callsign);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-screen bg-gradient-to-b from-sidebar-background/50 to-background/95">
      <div className="mb-8 animate-fade-in">
        <MDTLogo />
      </div>
      <div className="w-full max-w-md p-6 space-y-6 animate-slide-in backdrop-blur-sm bg-card/30 border border-border/30 rounded-lg shadow-lg">
        <h2 className="text-xl text-center font-bold">
          <span className="terminal-effect text-police-blue">OCEANIC POLICE MDT</span>
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your callsign"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              className="bg-input/50 border-border/50 backdrop-blur-sm text-foreground"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
          </div>
          
          <Button 
            onClick={handleLogin} 
            className="w-full glass-button bg-police-blue/20 border-police-blue/30 text-police-blue hover:bg-police-blue/30" 
            disabled={loading}
          >
            {loading ? (
              <span className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </span>
            ) : 'Secure Login'}
          </Button>
          
          <div className="text-xs text-center text-muted-foreground mt-2">
            Authorized personnel only
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
