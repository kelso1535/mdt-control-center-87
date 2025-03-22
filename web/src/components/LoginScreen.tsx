
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
    <div className="flex items-center justify-center h-full w-full" 
         style={{
           backgroundImage: 'linear-gradient(180deg, #051628 0%, #0A2744 100%)',
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat'
         }}>
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1E90FF] mb-4">MDT</h1>
          <div className="relative w-20 h-20 flex items-center justify-center mx-auto">
            <div className="absolute inset-0 bg-[#0A1929]/60 rounded-full"></div>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1E90FF] relative z-10 w-14 h-14">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Police Department
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1E90FF] w-5 h-5 mr-2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-[#1E90FF] text-xl font-bold tracking-wider">POLICE MDT</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            value={callsign}
            onChange={(e) => setCallsign(e.target.value)}
            className="w-full px-3 py-3 mb-4 bg-[#0A1929]/80 border border-[#1E3A5F] text-white rounded-md"
            placeholder="Enter your callsign"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-[#1E90FF] hover:bg-[#1E90FF]/80 text-white font-bold py-3 px-4 rounded transition-colors"
          >
            {loading ? 'Loading...' : 'Secure Login'}
          </button>
          
          <div className="text-xs text-center text-gray-400 mt-4">
            Authorized personnel only
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
