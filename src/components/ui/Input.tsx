import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;
    const helperId = inputId ? `${inputId}-helper` : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-800 select-none"
          >
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative rounded-xl shadow-xs">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full min-h-[42px] rounded-xl bg-white border text-slate-900 text-sm px-3.5 py-2 transition-colors placeholder:text-slate-400 
              focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
              disabled:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : ''} 
              ${rightIcon || error ? 'pr-10' : ''} 
              ${error ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 hover:border-slate-400'} 
              ${className}`}
            {...props}
          />

          {error ? (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-red-500">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
            </div>
          ) : rightIcon ? (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1">
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

Input.displayName = 'Input';
