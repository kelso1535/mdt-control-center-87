
import React from 'react';

const MDTLogo: React.FC = () => {
  return <div className="flex flex-col items-center">
      <div className="text-4xl font-bold text-police-blue">MDT</div>
      <div className="mt-2 flex items-center justify-center">
        <img 
          src="/lovable-uploads/dba38bf0-6209-45ae-b39e-b04a00215704.png" 
          alt="Oceanic Police Force Logo" 
          className="h-32 w-auto" 
        />
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        Oceanic Police Force
      </div>
    </div>;
};

export default MDTLogo;
