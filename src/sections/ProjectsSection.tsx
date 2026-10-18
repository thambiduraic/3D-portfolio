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
    <section id="projects" className="py-24 md:py-32 border-b border-[#131724]">
      <Container>
        <SectionHeading label="Featured Engineering Project" title="Selected Production Software" description="A production SaaS application showcasing client-side performance, modular architecture, and strict TypeScript patterns." />
        <div className="rounded-2xl bg-[#0c0f17] border border-[#1d2335] overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8 border-b border-[#181e2e] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0d15]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2.5 py-0.5 rounded">{project.category}</span>
                <span className="text-xs text-slate-400 font-mono">React 19 · TypeScript · Vite</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{project.title}</h3>
            </div>
            <div className="flex items-center gap-3">
              <Button href={project.demoUrl} external size="md" variant="primary" icon={<ExternalLink className="w-4 h-4" />}>Launch Live Demo</Button>
              {project.repoUrl && <Button href={project.repoUrl} external size="md" variant="secondary" icon={<GithubIcon className="w-4 h-4" />}>GitHub</Button>}
            </div>
          </div>

          <div className="p-6 md:p-8 bg-[#080a10] border-b border-[#181e2e]">
            <div className="rounded-xl border border-[#1e2437] bg-[#0c101a] p-4 sm:p-6">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#171d2c]">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" /><div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" /><span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">https://pulseboard-dashboard-v01.netlify.app/dashboard</span></div>
                <div className="flex items-center gap-1.5 bg-[#080b12] p-1 rounded-lg border border-[#1b2234]">
                  <button type="button" onClick={() => setActiveMetricTab('realtime')} className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${activeMetricTab === 'realtime' ? 'bg-sky-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}>Telemetry</button>
                  <button type="button" onClick={() => setActiveMetricTab('traffic')} className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${activeMetricTab === 'traffic' ? 'bg-sky-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}>Traffic Breakdown</button>
                  <button type="button" onClick={() => setActiveMetricTab('latency')} className={`text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${activeMetricTab === 'latency' ? 'bg-sky-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}>Client Latency</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#0e121e] border border-[#1d2539]"><div className="flex items-center justify-between text-xs text-slate-400 mb-1"><span>Active Telemetry Streams</span><Activity className="w-4 h-4 text-sky-400" /></div><div className="text-2xl font-bold font-mono text-white">{activeMetricTab === 'realtime' ? '1,420 evt/s' : activeMetricTab === 'traffic' ? '84.2k req' : '18ms avg'}</div><div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /><span>Real-time WebSocket / SSE connection</span></div></div>
                <div className="p-4 rounded-lg bg-[#0e121e] border border-[#1d2539]"><div className="flex items-center justify-between text-xs text-slate-400 mb-1"><span>Render Cycle Budget</span><LayoutDashboard className="w-4 h-4 text-blue-400" /></div><div className="text-2xl font-bold font-mono text-white">{activeMetricTab === 'latency' ? '0.38s FCP' : '60 FPS'}</div><div className="text-[11px] text-sky-400 mt-1">Optimized React component tree</div></div>
                <div className="p-4 rounded-lg bg-[#0e121e] border border-[#1d2539]"><div className="flex items-center justify-between text-xs text-slate-400 mb-1"><span>State Synchronization</span><Users className="w-4 h-4 text-purple-400" /></div><div className="text-2xl font-bold font-mono text-white">0 Race Conds</div><div className="text-[11px] text-slate-400 mt-1">Immutable state transitions</div></div>
              </div>
              <div className="p-4 rounded-lg bg-[#0a0d15] border border-[#181f30">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono"><span>Component Pipeline Load</span><span>Strict Type Validation: OK</span></div>
                <div className="space-y-2"><div className="h-2 w-full bg-[#131926] rounded-full overflow-hidden flex"><div className="bg-sky-400 h-full w-[45%]" title="UI Rendering" /><div className="bg-blue-600 h-full w-[35%]" title="Data Transforms" /><div className="bg-indigo-500 h-full w-[15%]" title="Network I/O" /></div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />React UI</span><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />TypeScript Models</span><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />API Pipeline</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">Architectural Highlights</h4><ul className="space-y-2.5">{project.architecturalOverview.map((item, idx) => <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" /><span>{item}</span></li>)}</ul></div>
            <div><h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">Technologies &amp; Tools</h4><div className="flex flex-wrap gap-2 mb-6">{project.technologies.map((tech) => <span key={tech} className="text-xs px-3 py-1.5 rounded-md bg-[#111624] border border-[#21293e] text-slate-200 font-medium">{tech}</span>)}</div><h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-3">Key Features</h4><ul className="space-y-2 text-sm text-slate-400">{project.features.map((feature, idx) => <li key={idx} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" /><span>{feature}</span></li>)}</ul></div>
          </div>
        </div>
      </Container>
    </section>
  );
};
