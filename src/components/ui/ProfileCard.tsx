import React from 'react';
import { ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { experiences, personalInfo, projects, socialLinks } from '../../data/portfolioData';
import { GithubIcon } from './Icons';

const coreStack = ['React 19', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vite', 'REST APIs'];

export const ProfileCard: React.FC = () => {
  const latestRole = experiences[0];

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">profile.snapshot</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Available
        </span>
      </div>

      <div className="relative p-6 sm:p-7">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-accent/10" />
        <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full border border-accent/15" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full border border-border" />

        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-background">
              <span className="absolute inset-2 rounded-full border border-dashed border-border" />
              <span className="font-mono text-xl font-semibold tracking-tight text-accent">TC</span>
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">{personalInfo.name}</h2>
              <p className="mt-1 text-sm font-medium text-accent">{personalInfo.role}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                {personalInfo.focus}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">{personalInfo.summary}</p>

          <div className="mt-6 grid grid-cols-3 divide-x divide-border border-y border-border py-4 text-center">
            <div>
              <span className="block font-mono text-lg font-semibold text-foreground">
                {personalInfo.experienceYears.split(' ')[0]}
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-dim">Years exp.</span>
            </div>
            <div>
              <span className="block font-mono text-lg font-semibold text-foreground">2024—26</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-dim">Track record</span>
            </div>
            <div>
              <span className="block font-mono text-lg font-semibold text-foreground">{projects.length}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-dim">Live project</span>
            </div>
          </div>

          <div className="mt-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">Core stack</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {coreStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-control border border-border bg-background px-2.5 py-1 font-mono text-[10px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2 border-l border-accent/60 pl-3">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            <p className="text-xs leading-relaxed text-muted">
              Latest role: <span className="font-medium text-foreground">{latestRole.role}</span> at{' '}
              <span className="font-medium text-foreground">{latestRole.company}</span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.iconName === 'mail' ? undefined : '_blank'}
                rel={link.iconName === 'mail' ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2 rounded-control border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                {link.iconName === 'github' && <GithubIcon className="h-3.5 w-3.5" />}
                {link.iconName === 'mail' && <Mail className="h-3.5 w-3.5" />}
                {link.label}
                <ArrowUpRight className="h-3 w-3 text-dim" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
