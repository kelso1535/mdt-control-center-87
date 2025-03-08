
import React from 'react';
import MDTApp from '@/components/MDTApp';
import { Tablet } from 'lucide-react';

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center p-4">
      <div className="tablet-frame">
        <div className="tablet-power-button"></div>
        <div className="tablet-volume-buttons"></div>
        <div className="tablet-camera"></div>
        <div className="tablet-screen">
          <MDTApp />
        </div>
      </div>
    </div>
  );
};

export default Index;
