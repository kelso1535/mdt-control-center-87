
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (callsign: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [callsign, setCallsign] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callsign.trim()) {
      setLoading(true);
      // Simulate login API call
      setTimeout(() => {
        onLogin(callsign.trim());
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-border w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-police-blue mb-2">Police MDT</h1>
          <p className="text-muted-foreground">Login to access the system</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="callsign" className="text-sm font-medium text-white">
              Officer Callsign
            </label>
            <input
              id="callsign"
              type="text"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-input rounded-md"
              placeholder="Enter your callsign"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-police-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
