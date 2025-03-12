
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'alert' | 'blue';
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ 
  icon, 
  children, 
  active = false, 
  onClick,
  variant = 'default'
}) => {
  const baseClasses = "mdt-btn w-full justify-start";
  
  const variantClasses = {
    default: "",
    primary: "mdt-btn-primary",
    alert: "mdt-btn-alert",
    blue: "mdt-btn-blue"
  };

  return (
    <button 
      className={cn(
        baseClasses, 
        variantClasses[variant],
        active && "ring-1 ring-primary/50"
      )} 
      onClick={onClick}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{children}</span>
    </button>
  );
};

export default SidebarButton;
