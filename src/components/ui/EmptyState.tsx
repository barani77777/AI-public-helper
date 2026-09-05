import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      role="region"
      aria-label="Empty content notice"
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-white border border-dashed border-slate-300 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <Icon className="w-7 h-7" aria-hidden="true" />
      </div>
      <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-1">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
