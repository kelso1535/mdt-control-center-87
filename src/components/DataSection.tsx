
import React from 'react';

interface DataSectionProps {
  title: string;
  children: React.ReactNode;
}

const DataSection: React.FC<DataSectionProps> = ({ title, children }) => {
  return (
    <div className="data-section">
      <h3 className="data-header">{title}</h3>
      {children}
    </div>
  );
};

export default DataSection;
