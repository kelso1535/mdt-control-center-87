
import React from 'react';
import { Shield } from 'lucide-react';

const MDTLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-[#1E90FF] mb-4">MDT</h1>
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0A1929]/60 rounded-full"></div>
        <Shield size={56} className="text-[#1E90FF] relative z-10" strokeWidth={1.5} />
      </div>
      <div className="text-sm text-gray-400 mt-2">
        Police Department
      </div>
    </div>
  );
};

export default MDTLogo;
