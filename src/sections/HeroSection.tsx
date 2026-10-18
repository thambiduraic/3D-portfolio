import React from 'react';
import { ArrowDown, ArrowUpRight, Code, Cpu, Layers } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

export const HeroSection: React.FC = () => (
  <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden border-b border-[#131724]">
    <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/10 rounded-full blur-[120px]" aria-hidden="true" />
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111624] border border-[#1f283d] text-xs font-medium text-sky-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Frontend Roles</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">{personalInfo.experienceYears}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            Frontend Engineer specializing in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">React &amp; TypeScript</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">{personalInfo.headline}</p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button href="#projects" size="lg" variant="primary" icon={<ArrowDown className="w-4 h-4" />}>View Selected Work</Button>
            <Button href="#experience" size="lg" variant="secondary" icon={<ArrowUpRight className="w-4 h-4" />}>Experience &amp; Background</Button>
          </div>
          <div className="pt-6 border-t border-[#151a27] flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Core Stack:</span>
            {['React 19', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vite', 'REST APIs'].map((tech) => <span key={tech} className="px-2.5 py-1 rounded bg-[#0e121d] border border-[#1b2234] text-slate-300">{tech}</span>)}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-xl bg-[#0d1018] border border-[#1e2538] p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#181f30]">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500/80" /><div className="w-3 h-3 rounded-full bg-amber-500/80" /><div className="w-3 h-3 rounded-full bg-emerald-500/80" /></div>
              <span className="text-xs font-mono text-slate-400">engineer.config.ts</span>
            </div>
            <div className="py-4 space-y-4 font-mono text-xs">
              <div className="text-slate-400"><span className="text-purple-400">export const</span>{' '}<span className="text-blue-300">architectProfile</span> = {'{'}</div>
              <div className="pl-4 space-y-1.5 text-slate-300">
                <div><span className="text-slate-400">name:</span>{' '}<span className="text-emerald-300">'{personalInfo.name}'</span>,</div>
                <div><span className="text-slate-400">role:</span>{' '}<span className="text-emerald-300">'AI Frontend Engineer'</span>,</div>
                <div><span className="text-slate-400">specialization:</span>{' '}<span className="text-emerald-300">'React + Strict TypeScript'</span>,</div>
                <div><span className="text-slate-400">designDiscipline:</span>{' '}<span className="text-emerald-300">'Anti-Slop &amp; High Usability'</span>,</div>
                <div><span className="text-slate-400">performancePriority:</span>{' '}<span className="text-sky-300">[</span><span className="text-emerald-300">'Sub-second FCP'</span>,{' '}<span className="text-emerald-300">'Accessible Dom'</span><span className="text-sky-300">]</span>,</div>
              </div>
              <div className="text-slate-400">{'}'};</div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#181f30] grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded bg-[#090b11] border border-[#161c2b"><Layers className="w-4 h-4 text-sky-400 mx-auto mb-1" /><div className="text-[11px] font-semibold text-slate-200">React &amp; Vite</div><div className="text-[10px] text-slate-400">Fast Bundling</div></div>
              <div className="p-2.5 rounded bg-[#090b11] border border-[#161c2b"><Code className="w-4 h-4 text-blue-400 mx-auto mb-1" /><div className="text-[11px] font-semibold text-slate-200">Strict Types</div><div className="text-[10px] text-slate-400">Zero 'any'</div></div>
              <div className="p-2.5 rounded bg-[#090b11] border border-[#161c2b"><Cpu className="w-4 h-4 text-emerald-400 mx-auto mb-1" /><div className="text-[11px] font-semibold text-slate-200">REST APIs</div><div className="text-[10px] text-slate-400">Clean State</div></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);
