import React from 'react';
import { Loader2 } from 'lucide-react';

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string; label?: string }> = ({
  size = 'md',
  className = '',
  label = 'Loading...',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div role="status" className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`animate-pulse rounded-lg bg-slate-200 ${className}`}
    aria-hidden="true"
  />
);

export const CardSkeleton: React.FC = () => (
  <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-5 w-16" />
    </div>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-16 w-full" />
    <div className="flex items-center gap-3 pt-2">
      <Skeleton className="h-8 w-24 rounded-lg" />
      <Skeleton className="h-8 w-32 rounded-lg" />
    </div>
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <tr className="border-b border-slate-100 animate-pulse">
    <td className="py-4 px-4"><Skeleton className="h-4 w-20" /></td>
    <td className="py-4 px-4"><Skeleton className="h-4 w-48" /></td>
    <td className="py-4 px-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
    <td className="py-4 px-4"><Skeleton className="h-6 w-20 rounded-md" /></td>
    <td className="py-4 px-4"><Skeleton className="h-4 w-32" /></td>
    <td className="py-4 px-4 text-right"><Skeleton className="h-8 w-16 ml-auto rounded-lg" /></td>
  </tr>
);
