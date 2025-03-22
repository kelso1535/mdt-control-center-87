
import React, { useState } from 'react';
import MDTLogo from './MDTLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';

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
    <div className="login-screen flex flex-col items-center justify-center h-full w-full" 
         style={{
           backgroundImage: 'linear-gradient(180deg, #051628 0%, #0A2744 100%)',
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat'
         }}>
      <div className="mb-12 animate-fade-in">
        <MDTLogo />
      </div>
      
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-5 w-5 text-[#1E90FF] mr-2" />
          <h2 className="text-[#1E90FF] text-xl font-bold tracking-wider">POLICE MDT</h2>
        </div>
        
        <Input
          type="text"
          placeholder="Enter your callsign"
          value={callsign}
          onChange={(e) => setCallsign(e.target.value)}
          className="bg-[#0A1929]/80 border-[#1E3A5F] text-white w-full mb-4 h-12"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleLogin();
          }}
        />
        
        <Button 
          onClick={handleLogin} 
          className="w-full bg-[#1E90FF] hover:bg-[#1E90FF]/80 text-white h-12"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="mr-2">Loading</span>
              <span className="loading-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </span>
          ) : 'Secure Login'}
        </Button>
        
        <div className="text-xs text-center text-gray-400 mt-4">
          Authorized personnel only
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
