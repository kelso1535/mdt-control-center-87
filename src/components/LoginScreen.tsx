
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
    <div className="login-screen">
      <div className="mb-8 animate-fade-in">
        <MDTLogo />
      </div>
      <div className="w-full max-w-md p-6 space-y-6 animate-slide-in">
        <h2 className="text-xl text-center text-primary font-bold">
          <span className="terminal-effect">LOGIN TO MDT</span>
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your callsign"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              className="bg-input/50 border-border/50 backdrop-blur-sm"
            />
          </div>
          
          <Button 
            onClick={handleLogin} 
            className="w-full glass-button" 
            disabled={loading}
          >
            {loading ? (
              <span className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </span>
            ) : 'Login to MDT'}
          </Button>
          
          <Button 
            onClick={() => {
              setCallsign(`${Math.floor(Math.random() * 99)}-${Math.floor(Math.random() * 99)}`);
              toast.info('Auto callsign generated');
            }} 
            variant="outline" 
            className="w-full glass-button bg-secondary/20"
          >
            Auto Callsign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
