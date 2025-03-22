
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

export interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <div className="section-header">
    <div className="section-line"></div>
    <div className="section-title">------- {title} -------</div>
    <div className="section-line"></div>
  </div>
);

export default DataSection;
