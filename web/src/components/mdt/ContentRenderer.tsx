
import React from 'react';

type Screen = 
  | 'login'
  | 'people'
  | 'vehicles'
  | 'history'
  | 'criminal'
  | 'traffic'
  | 'reports'
  | 'serials'
  | 'actions'
  | 'financial'
  | 'supervisor'
  | 'wanted'
  | 'admin';

interface ContentRendererProps {
  currentScreen: Screen;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ currentScreen }) => {
  // This is a placeholder - in a real implementation, you would import and render actual components
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-police-blue mb-4">
        {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)} Screen
      </h2>
      <p className="text-white">
        This is the {currentScreen} screen. Content will be rendered here.
      </p>
    </div>
  );
};

export default ContentRenderer;
