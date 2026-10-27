import React from 'react';
import { ArrowDown, ArrowUpRight, Code, Cpu, Layers } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

export const HeroSection: React.FC = () => (
  <section className="relative overflow-hidden border-b border-border pb-[var(--spacing-section)] pt-32 md:pb-[var(--spacing-section-lg)] md:pt-44">
    <Container>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 lg:col-span-7">
          <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-control border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            <span className="text-foreground">Available for Frontend Roles</span>
            <span className="hidden text-dim sm:inline" aria-hidden="true">|</span>
            <span>{personalInfo.experienceYears}</span>
          </div>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Frontend Engineer specializing in{' '}
            <span className="text-accent sm:whitespace-nowrap">React &amp; TypeScript</span>
          </h1>
          <p className="max-w-2xl text-lg font-normal leading-relaxed text-muted sm:text-xl">{personalInfo.headline}</p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button href="#projects" size="lg" variant="primary" icon={<ArrowDown className="h-4 w-4" />}>View Selected Work</Button>
            <Button href="#experience" size="lg" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>Experience &amp; Background</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6 text-xs text-muted">
            <span className="font-medium uppercase tracking-[0.14em] text-dim">Core Stack:</span>
            {['React 19', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vite', 'REST APIs'].map((tech) => <span key={tech} className="rounded-control border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">{tech}</span>)}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-card border border-border bg-surface">
            <div className="border-b border-border px-5 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">engineer.config.ts</span>
            </div>
            <div className="space-y-4 p-5 font-mono text-xs leading-relaxed">
              <div className="text-muted"><span className="text-accent">export const</span>{' '}<span className="text-foreground">architectProfile</span> = {'{'}</div>
              <div className="space-y-1.5 pl-4">
                <div><span className="text-muted">name:</span>{' '}<span className="text-foreground">'{personalInfo.name}'</span>,</div>
                <div><span className="text-muted">role:</span>{' '}<span className="text-foreground">'AI Frontend Engineer'</span>,</div>
                <div><span className="text-muted">specialization:</span>{' '}<span className="text-foreground">'React + Strict TypeScript'</span>,</div>
                <div><span className="text-muted">designDiscipline:</span>{' '}<span className="text-foreground">'Anti-Slop &amp; High Usability'</span>,</div>
                <div><span className="text-muted">performancePriority:</span>{' '}<span className="text-dim">[</span><span className="text-foreground">'Sub-second FCP'</span>,{' '}<span className="text-foreground">'Accessible Dom'</span><span className="text-dim">]</span>,</div>
              </div>
              <div className="text-muted">{'}'};</div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-border p-4 text-center">
              <div className="rounded-control border border-border bg-background p-3"><Layers className="mx-auto mb-1 h-4 w-4 text-accent" /><div className="text-[11px] font-semibold text-foreground">React &amp; Vite</div><div className="text-[10px] text-muted">Fast Bundling</div></div>
              <div className="rounded-control border border-border bg-background p-3"><Code className="mx-auto mb-1 h-4 w-4 text-accent" /><div className="text-[11px] font-semibold text-foreground">Strict Types</div><div className="text-[10px] text-muted">Zero 'any'</div></div>
              <div className="rounded-control border border-border bg-background p-3"><Cpu className="mx-auto mb-1 h-4 w-4 text-accent" /><div className="text-[11px] font-semibold text-foreground">REST APIs</div><div className="text-[10px] text-muted">Clean State</div></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);
