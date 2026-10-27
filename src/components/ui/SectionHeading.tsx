import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ label, title, description, align = 'left', className }) => (
  <div className={cn('mb-12 md:mb-16', align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl', className)}>
    {label && <span className="mb-3 block text-xs font-medium uppercase tracking-[0.18em] text-accent">{label}</span>}
    <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h2>
    {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
  </div>
);
