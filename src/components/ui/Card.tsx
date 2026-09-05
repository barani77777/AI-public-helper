import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', hover = true, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl bg-white border border-[#E8E0D8] shadow-sm transition-all duration-300 preserve-3d ${
          hover ? 'hover:-translate-y-1 hover:shadow-xl hover:border-teal-400/80' : ''
        } ${glow ? 'ring-2 ring-teal-500/20 shadow-lg' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 sm:p-6 border-b border-[#E8E0D8] ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`font-heading font-bold text-lg text-[#2D2D2D] tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`text-xs sm:text-sm text-slate-500 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 sm:p-6 border-t border-slate-100 bg-slate-50/80 rounded-b-2xl ${className}`} {...props}>
    {children}
  </div>
);
