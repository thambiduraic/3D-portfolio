import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary', size = 'md', href, external = false, icon,
  iconPosition = 'right', className, children, onClick, ...buttonProps
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090e] cursor-pointer active:scale-[0.98] select-none text-center';
  const variants = {
    primary: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] border border-sky-400',
    secondary: 'bg-[#121622] hover:bg-[#1a2030] text-slate-200 hover:text-white border border-[#22283b] hover:border-[#2f3852]',
    outline: 'bg-transparent hover:bg-[#121622] text-slate-300 hover:text-white border border-[#262c3f] hover:border-slate-500',
    ghost: 'bg-transparent hover:bg-[#121622] text-slate-400 hover:text-slate-100',
  };
  const sizes = { sm: 'text-xs px-3.5 py-1.5 gap-1.5', md: 'text-sm px-5 py-2.5 gap-2', lg: 'text-base px-6 py-3.5 gap-2.5' };
  const content = <>{icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}<span>{children}</span>{icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}</>;
  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) return <a href={href} className={combinedClasses} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{content}</a>;
  return <button className={combinedClasses} onClick={onClick} {...buttonProps}>{content}</button>;
};
