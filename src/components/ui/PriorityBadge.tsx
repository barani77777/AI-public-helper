import React from 'react';
import { ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { PriorityLevel } from '../../types/complaint';
import { useTranslation } from '../../i18n/LanguageContext';

export interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  let t = (key: string, def: string) => def;
  try {
    const i18n = useTranslation();
    t = i18n.t;
  } catch {
    // In case used outside LanguageProvider
  }

  const configs: Record<
    PriorityLevel,
    {
      labelKey: string;
      defaultLabel: string;
      icon: React.ComponentType<{ className?: string }>;
      bg: string;
      text: string;
      border: string;
      ariaDesc: string;
    }
  > = {
    Critical: {
      labelKey: 'priority_critical',
      defaultLabel: 'Critical Priority',
      icon: ShieldAlert,
      bg: 'bg-red-50',
      text: 'text-red-700 font-bold',
      border: 'border-red-200',
      ariaDesc: 'Critical priority issue requiring immediate emergency response',
    },
    High: {
      labelKey: 'priority_high',
      defaultLabel: 'High Priority',
      icon: AlertTriangle,
      bg: 'bg-orange-50',
      text: 'text-orange-700 font-bold',
      border: 'border-orange-200',
      ariaDesc: 'High priority issue requiring urgent municipal dispatch',
    },
    Medium: {
      labelKey: 'priority_medium',
      defaultLabel: 'Medium Priority',
      icon: AlertCircle,
      bg: 'bg-amber-50',
      text: 'text-amber-800 font-semibold',
      border: 'border-amber-200',
      ariaDesc: 'Medium priority issue scheduled for standard department workflow',
    },
    Low: {
      labelKey: 'priority_low',
      defaultLabel: 'Low Priority',
      icon: Info,
      bg: 'bg-emerald-50',
      text: 'text-emerald-700 font-semibold',
      border: 'border-emerald-200',
      ariaDesc: 'Low priority issue assigned to routine maintenance cycle',
    },
  };

  const current = configs[priority] || configs.Medium;
  const Icon = current.icon;
  const label = t(current.labelKey, current.defaultLabel);

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2 font-semibold',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      role="status"
      aria-label={current.ariaDesc}
      className={`inline-flex items-center rounded-full border shadow-sm ${current.bg} ${current.text} ${current.border} ${sizeStyles[size]} ${className}`}
    >
      <Icon className={`${iconSizes[size]} flex-shrink-0`} aria-hidden="true" />
      {showLabel && <span>{label}</span>}
    </span>
  );
};
