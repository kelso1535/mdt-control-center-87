
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'blue' | 'alert';
  className?: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  children,
  onClick,
  variant = 'default',
  className
}) => {
  const buttonClass = cn(
    'mdt-btn w-full',
    {
      'mdt-btn-blue': variant === 'blue',
      'mdt-btn-alert': variant === 'alert'
    },
    className
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      <div className="w-5 h-5 flex-shrink-0">
        {icon}
      </div>
      <span className="truncate">{children}</span>
    </button>
  );
};

export default SidebarButton;
