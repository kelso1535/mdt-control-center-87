
import React from 'react';

const DashedDivider: React.FC = () => {
  return (
    <div className="w-full my-2">
      <div className="border-t border-dashed border-[hsl(var(--police-blue))]/30"></div>
    </div>
  );
};

export default DashedDivider;
