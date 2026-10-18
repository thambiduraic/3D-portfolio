import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experiences } from '../data/portfolioData';
import type { Experience } from '../types/portfolio';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

export const ExperienceSection: React.FC = () => (
  <section id="experience" className="py-24 md:py-32 border-b border-[#131724]">
    <Container>
      <SectionHeading label="Career History" title="Professional Experience" description="Chronological engineering track record building AI-integrated frontend interfaces, full-stack systems, and mentoring developers." />
      <div className="relative border-l border-[#1a2133] ml-3 sm:ml-6 space-y-12">
        {experiences.map((exp: Experience) => (
          <div key={exp.id} className="relative pl-6 sm:pl-10">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#07090e] border-2 border-sky-400 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-sky-400" /></div>
            <div className="rounded-xl bg-[#0c101a] border border-[#1b2234] p-6 sm:p-8 hover:border-[#27324c] transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#151c2c]">
                <div><h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{exp.role}</h3><div className="flex items-center gap-2 text-sky-400 font-medium text-sm mt-1"><Briefcase className="w-4 h-4" /><span>{exp.company}</span></div></div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono"><span className="flex items-center gap-1.5 bg-[#101524] px-2.5 py-1 rounded border border-[#1c2438]"><Calendar className="w-3.5 h-3.5 text-sky-400" />{exp.period}</span>{exp.location && <span className="flex items-center gap-1.5 bg-[#101524] px-2.5 py-1 rounded border border-[#1c2438]"><MapPin className="w-3.5 h-3.5 text-slate-400" />{exp.location}</span>}</div>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-5">{exp.summary}</p>
              <div className="space-y-2.5 mb-6">{exp.responsibilities.map((resp: string, idx: number) => <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-400"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" /><span>{resp}</span></div>)}</div>
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#151c2c]"><span className="text-xs font-semibold text-slate-400 mr-1">Technologies:</span>{exp.technologies.map((tech) => <span key={tech} className="text-xs px-2.5 py-1 rounded bg-[#101522] border border-[#1b2336] text-slate-300">{tech}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
