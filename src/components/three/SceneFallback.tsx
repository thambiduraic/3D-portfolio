import React from 'react';

export const SceneFallback: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative h-60 w-60 sm:h-72 sm:w-72">
      <div className="absolute inset-0 rounded-full border border-border" />
      <div className="absolute inset-6 rounded-full border border-border" />
      <div className="absolute inset-12 rounded-full border border-accent/35" />
      <div className="absolute inset-[4.5rem] rounded-full border border-dashed border-border" />
      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      <span className="absolute bottom-1/2 left-0 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/70" />
      <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">stack core</span>
        <span className="mt-2 max-w-[9rem] text-sm font-medium leading-snug text-foreground">
          React · TypeScript · Python · Django
        </span>
      </div>
    </div>
  </div>
);
