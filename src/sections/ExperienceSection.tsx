import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experiences } from '../data/portfolioData';
import type { Experience } from '../types/portfolio';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

export const ExperienceSection: React.FC = () => (
  <section id="experience" className="border-b border-border py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]">
    <Container>
      <SectionHeading label="Career History" title="Professional Experience" description="Chronological engineering track record building AI-integrated frontend interfaces, full-stack systems, and mentoring developers." />
      <div className="relative ml-3 space-y-12 border-l border-border sm:ml-6">
        {experiences.map((exp: Experience) => (
          <div key={exp.id} className="relative pl-6 sm:pl-10">
            <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background"><div className="h-1.5 w-1.5 rounded-full bg-accent" /></div>
            <div className="rounded-card border border-border bg-surface p-6 transition-colors hover:border-border-strong sm:p-8">
              <div className="mb-4 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div><h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{exp.role}</h3><div className="mt-1 flex items-center gap-2 text-sm font-medium text-accent"><Briefcase className="h-4 w-4" /><span>{exp.company}</span></div></div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted"><span className="flex items-center gap-1.5 rounded-control border border-border bg-background px-2.5 py-1"><Calendar className="h-3.5 w-3.5 text-accent" />{exp.period}</span>{exp.location && <span className="flex items-center gap-1.5 rounded-control border border-border bg-background px-2.5 py-1"><MapPin className="h-3.5 w-3.5 text-dim" />{exp.location}</span>}</div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted sm:text-base">{exp.summary}</p>
              <div className="mb-6 space-y-2.5">{exp.responsibilities.map((resp: string, idx: number) => <div key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{resp}</span></div>)}</div>
              <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4"><span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-dim">Technologies:</span>{exp.technologies.map((tech) => <span key={tech} className="rounded-control border border-border bg-background px-2.5 py-1 text-xs text-muted">{tech}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
