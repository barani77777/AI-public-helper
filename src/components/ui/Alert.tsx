import React from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle2, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'info' | 'warning' | 'danger' | 'success';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const configs = {
    info: {
      role: 'status',
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      iconColor: 'text-blue-600',
    },
    warning: {
      role: 'alert',
      icon: AlertTriangle,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      iconColor: 'text-amber-600',
    },
    danger: {
      role: 'alert',
      icon: AlertCircle,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      iconColor: 'text-red-600',
    },
    success: {
      role: 'status',
      icon: CheckCircle2,
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      iconColor: 'text-emerald-600',
    },
  };

  const config = configs[variant];
  const Icon = config.icon;

  return (
    <div
      role={config.role}
      className={`rounded-xl border p-4 flex items-start gap-3.5 ${config.bg} ${config.border} ${className}`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} aria-hidden="true" />
      <div className="flex-1 text-sm">
        {title && <h5 className={`font-semibold mb-0.5 ${config.text}`}>{title}</h5>}
        <div className="text-slate-700 leading-relaxed text-xs sm:text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-white/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
