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
    {label && <span className="text-xs font-semibold tracking-wider uppercase text-sky-400 mb-2.5 block">{label}</span>}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-100 leading-tight">{title}</h2>
    {description && <p className="mt-3.5 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">{description}</p>}
  </div>
);
