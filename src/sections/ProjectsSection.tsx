import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, LayoutDashboard, TrendingUp, Users, Activity } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { GithubIcon } from '../components/ui/Icons';

export const ProjectsSection: React.FC = () => {
  const [activeMetricTab, setActiveMetricTab] = useState<'realtime' | 'latency' | 'traffic'>('realtime');
  const project = projects[0];

  return (
    <section id="projects" className="border-b border-border py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]">
      <Container>
        <SectionHeading label="Featured Engineering Project" title="Selected Production Software" description="A production SaaS application showcasing client-side performance, modular architecture, and strict TypeScript patterns." />
        <div className="overflow-hidden rounded-card border border-border bg-surface">
          <div className="flex flex-col gap-4 border-b border-border p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex w-fit items-center rounded-control border border-border bg-background px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">{project.category}</span>
                <span className="font-mono text-[11px] text-dim">React 19 · TypeScript · Vite</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{project.title}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href={project.demoUrl} external size="md" variant="primary" icon={<ExternalLink className="h-4 w-4" />}>Launch Live Demo</Button>
              {project.repoUrl && <Button href={project.repoUrl} external size="md" variant="secondary" icon={<GithubIcon className="h-4 w-4" />}>GitHub</Button>}
            </div>
          </div>

          <div className="border-b border-border bg-background p-6 md:p-8">
            <div className="rounded-card border border-border bg-surface p-4 sm:p-6">
              <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="hidden truncate font-mono text-[11px] text-dim sm:inline">https://pulseboard-dashboard-v01.netlify.app/dashboard</span>
                <div className="flex flex-wrap items-center gap-1 rounded-control border border-border bg-background p-1" role="group" aria-label="Dashboard metrics">
                  <button type="button" onClick={() => setActiveMetricTab('realtime')} aria-pressed={activeMetricTab === 'realtime'} className={`cursor-pointer whitespace-nowrap rounded-control px-2.5 py-1 text-xs transition-colors ${activeMetricTab === 'realtime' ? 'bg-foreground font-medium text-background' : 'text-muted hover:text-foreground'}`}>Telemetry</button>
                  <button type="button" onClick={() => setActiveMetricTab('traffic')} aria-pressed={activeMetricTab === 'traffic'} className={`cursor-pointer whitespace-nowrap rounded-control px-2.5 py-1 text-xs transition-colors ${activeMetricTab === 'traffic' ? 'bg-foreground font-medium text-background' : 'text-muted hover:text-foreground'}`}>Traffic Breakdown</button>
                  <button type="button" onClick={() => setActiveMetricTab('latency')} aria-pressed={activeMetricTab === 'latency'} className={`cursor-pointer whitespace-nowrap rounded-control px-2.5 py-1 text-xs transition-colors ${activeMetricTab === 'latency' ? 'bg-foreground font-medium text-background' : 'text-muted hover:text-foreground'}`}>Client Latency</button>
                </div>
              </div>
              <div className="mb-6 mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-control border border-border bg-background p-4"><div className="mb-1 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.12em] text-dim"><span>Active Telemetry Streams</span><Activity className="h-4 w-4 shrink-0 text-muted" /></div><div className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">{activeMetricTab === 'realtime' ? '1,420 evt/s' : activeMetricTab === 'traffic' ? '84.2k req' : '18ms avg'}</div><div className="mt-1 flex items-center gap-1 text-[11px] text-success"><TrendingUp className="h-3 w-3 shrink-0" /><span>Real-time WebSocket / SSE connection</span></div></div>
                <div className="rounded-control border border-border bg-background p-4"><div className="mb-1 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.12em] text-dim"><span>Render Cycle Budget</span><LayoutDashboard className="h-4 w-4 shrink-0 text-muted" /></div><div className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">{activeMetricTab === 'latency' ? '0.38s FCP' : '60 FPS'}</div><div className="mt-1 text-[11px] text-accent">Optimized React component tree</div></div>
                <div className="rounded-control border border-border bg-background p-4"><div className="mb-1 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.12em] text-dim"><span>State Synchronization</span><Users className="h-4 w-4 shrink-0 text-muted" /></div><div className="mt-2 font-mono text-2xl font-semibold tabular-nums text-foreground">0 Race Conds</div><div className="mt-1 text-[11px] text-muted">Immutable state transitions</div></div>
              </div>
              <div className="rounded-control border border-border bg-background p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-dim"><span>Component Pipeline Load</span><span>Strict Type Validation: OK</span></div>
                <div className="space-y-2"><div className="flex h-2 w-full overflow-hidden rounded-full bg-border"><div className="h-full w-[45%] bg-accent" title="UI Rendering" /><div className="h-full w-[35%] bg-foreground" title="Data Transforms" /><div className="h-full w-[15%] bg-dim" title="Network I/O" /></div>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted"><span className="flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-accent" />React UI</span><span className="flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-foreground" />TypeScript Models</span><span className="flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-dim" />API Pipeline</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
            <div><h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-dim">Architectural Highlights</h4><ul className="space-y-2.5">{project.architecturalOverview.map((item, idx) => <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span>{item}</span></li>)}</ul></div>
            <div><h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-dim">Technologies &amp; Tools</h4><div className="mb-6 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded-control border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted">{tech}</span>)}</div><h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-dim">Key Features</h4><ul className="space-y-2 text-sm leading-relaxed text-muted">{project.features.map((feature, idx) => <li key={idx} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span>{feature}</span></li>)}</ul></div>
          </div>
        </div>
      </Container>
    </section>
  );
};
