import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  currentLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      maxLength,
      currentLength,
      className = '',
      required,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;
    const helperId = inputId ? `${inputId}-helper` : undefined;

    return (
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={inputId}
              className="block text-xs font-semibold text-slate-800 select-none"
            >
              {label}
              {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
            </label>
          )}

          {maxLength !== undefined && currentLength !== undefined && (
            <span
              className={`text-[11px] font-mono ${
                currentLength > maxLength ? 'text-red-600 font-bold' : 'text-slate-500'
              }`}
              aria-live="polite"
            >
              {currentLength} / {maxLength}
            </span>
          )}
        </div>

        <div className="relative rounded-xl shadow-xs">
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            maxLength={maxLength}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`w-full rounded-xl bg-white border text-slate-900 text-sm px-3.5 py-2.5 transition-colors placeholder:text-slate-400 
              focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
              disabled:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed resize-y min-h-[100px]
              ${error ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 hover:border-slate-400'} 
              ${className}`}
            {...props}
          />
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

Textarea.displayName = 'Textarea';
