import React from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({ children, className, size = 'default' }) => {
  const maxWidths = { narrow: 'max-w-4xl', default: 'max-w-6xl', wide: 'max-w-7xl' };
  return <div className={cn('mx-auto w-full px-5 sm:px-8 md:px-10', maxWidths[size], className)}>{children}</div>;
};
