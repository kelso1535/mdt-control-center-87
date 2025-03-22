
import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (callsign: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [callsign, setCallsign] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callsign.trim()) {
      onLogin(callsign.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-[#0d1e33] to-[#0a1422] text-white">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-[#007bff] mb-2">MDT</h1>
        <div className="flex justify-center mb-4">
          <Shield className="h-24 w-24 text-[#007bff]" />
        </div>
        <p className="text-gray-400">Police Department</p>
      </div>
      
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center">
            <Shield className="h-5 w-5 text-[#007bff] mr-2" />
            <span className="text-[#007bff] text-xl font-bold">POLICE MDT</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
              className="w-full px-3 py-2 bg-[#0d1e33] border border-[#1c3a5a] rounded-md text-white placeholder-gray-500"
              placeholder="Enter your callsign"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#007bff] hover:bg-[#0069d9] text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Secure Login
          </button>
        </form>
        
        <div className="text-xs text-center text-gray-500 mt-4">
          Authorized personnel only
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
