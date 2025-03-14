
import React from 'react';
import { Shield } from 'lucide-react';

const MDTLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold text-police-blue">CrimTrac</div>
      <div className="mt-2 flex items-center justify-center bg-police-blue/10 p-4 rounded-full border border-police-blue/20">
        <Shield 
          size={64}
          className="text-police-blue" 
        />
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        Mobile Data Terminal
      </div>
    </div>
  );
};

export default MDTLogo;
