
import React from 'react';
import MDTApp from '@/components/MDTApp';

const Index = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-transparent flex items-center justify-center p-4">
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
