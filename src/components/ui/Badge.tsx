import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'gray';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'sm',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-md border';

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  };

  const variantStyles = {
    default: 'bg-navy-800 text-text-primary border-navy-700',
    blue: 'bg-blue-950/60 text-blue-300 border-blue-800/50',
    green: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50',
    amber: 'bg-amber-950/60 text-amber-300 border-amber-800/50',
    red: 'bg-red-950/60 text-red-300 border-red-800/50',
    purple: 'bg-purple-950/60 text-purple-300 border-purple-800/50',
    gray: 'bg-slate-800/60 text-slate-300 border-slate-700',
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
