import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      options = [],
      error,
      helperText,
      className = '',
      required,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = selectId ? `${selectId}-error` : undefined;
    const helperId = selectId ? `${selectId}-helper` : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-slate-800 select-none"
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative rounded-xl shadow-xs">
          <select
            ref={ref}
            id={selectId}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full min-h-[42px] appearance-none rounded-xl bg-white border text-slate-900 text-sm pl-3.5 pr-10 py-2 transition-colors 
              focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
              disabled:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed
              ${error ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 hover:border-slate-400'} 
              ${className}`}
            {...props}
          >
            {children ? (
              children
            ) : (
              options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
                  {opt.label}
                </option>
              ))
            )}
          </select>

          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-slate-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
