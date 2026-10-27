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
  const baseStyles = 'inline-flex cursor-pointer select-none items-center justify-center rounded-control border font-medium text-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus';
  const variants = {
    primary: 'border-accent bg-accent font-semibold text-accent-contrast hover:border-accent-hover hover:bg-accent-hover',
    secondary: 'border-border-strong bg-surface text-foreground hover:border-foreground hover:bg-surface-elevated',
    outline: 'border-border-strong bg-transparent text-foreground hover:bg-surface-elevated',
    ghost: 'border-transparent bg-transparent text-muted hover:bg-surface-elevated hover:text-foreground',
  };
  const sizes = { sm: 'text-xs px-3.5 py-1.5 gap-1.5', md: 'text-sm px-5 py-2.5 gap-2', lg: 'text-base px-6 py-3.5 gap-2.5' };
  const content = <>{icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}<span>{children}</span>{icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}</>;
  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) return <a href={href} className={combinedClasses} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{content}</a>;
  return <button className={combinedClasses} onClick={onClick} {...buttonProps}>{content}</button>;
};
