import React from 'react';
import { 
  FileText, 
  Cpu, 
  Tag, 
  UserCheck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { ComplaintStatus } from '../../types/complaint';
import { useTranslation } from '../../i18n/LanguageContext';

export interface StatusBadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
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
    ComplaintStatus,
    {
      labelKey: string;
      defaultLabel: string;
      icon: React.ComponentType<{ className?: string }>;
      bg: string;
      text: string;
      border: string;
    }
  > = {
    Submitted: {
      labelKey: 'status_submitted',
      defaultLabel: 'Submitted',
      icon: FileText,
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-200',
    },
    'AI Processing': {
      labelKey: 'status_ai_processing',
      defaultLabel: 'AI Processing',
      icon: Cpu,
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
    Classified: {
      labelKey: 'status_classified',
      defaultLabel: 'Classified',
      icon: Tag,
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    Assigned: {
      labelKey: 'status_assigned',
      defaultLabel: 'Assigned',
      icon: UserCheck,
      bg: 'bg-cyan-50',
      text: 'text-cyan-800',
      border: 'border-cyan-200',
    },
    'In Progress': {
      labelKey: 'status_in_progress',
      defaultLabel: 'In Progress',
      icon: Clock,
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
    },
    Resolved: {
      labelKey: 'status_resolved',
      defaultLabel: 'Resolved',
      icon: CheckCircle2,
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
    },
  };

  const current = configs[status] || configs.Submitted;
  const Icon = current.icon;
  const label = t(current.labelKey, current.defaultLabel);

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] gap-1 font-medium',
    md: 'px-2.5 py-1 text-xs gap-1.5 font-semibold',
  };

  return (
    <span
      role="status"
      className={`inline-flex items-center rounded-md border shadow-xs ${current.bg} ${current.text} ${current.border} ${sizeStyles[size]} ${className}`}
    >
      <Icon className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};
