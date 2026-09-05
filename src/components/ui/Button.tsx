import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles = 
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ' +
      'focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs min-h-[36px] gap-1.5',
      md: 'px-4 py-2 text-sm min-h-[42px] gap-2',
      lg: 'px-6 py-2.5 text-base min-h-[46px] gap-2.5',
    };

    const variantStyles = {
      primary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm hover:shadow',
      secondary: 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 hover:border-neutral-300 shadow-sm',
      outline: 'bg-transparent hover:bg-neutral-100 text-neutral-700 border border-neutral-300 hover:text-neutral-900',
      ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900',
      danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
      success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
