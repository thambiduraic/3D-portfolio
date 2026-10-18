import React from 'react';
import { Award, CheckCircle, Code2, ShieldCheck, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

export const AboutSection: React.FC = () => (
  <section id="about" className="py-24 md:py-32 border-b border-[#131724]"><Container>
    <SectionHeading label="Profile & Philosophy" title="About & Engineering Values" description="A product-minded approach centered on user experience, system stability, and clean software architecture." />
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-base">
        <p>I am <span className="text-white font-semibold">{personalInfo.name}</span>, a Frontend Engineer with around two years of experience delivering robust web applications, responsive user interfaces, and modular component systems.</p>
        <p>My engineering focus centers on <span className="text-sky-400 font-medium">React and TypeScript</span>, bridging the gap between sophisticated user interface design and resilient data pipelines. Having worked across AI product interfaces and full-stack environments, I value clean code structure, performance optimization, and deliberate architectural choices.</p>
        <p>I believe in building interfaces that respect the user through accessibility, clear feedback, and thoughtful interactions. I also enjoy sharing what I learn through technical training and collaboration.</p>
        <p>{personalInfo.summary}</p>
      </div>
      <div className="lg:col-span-5">
        <div className="rounded-xl bg-[#0c101a] border border-[#1b2234] p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3"><div className="p-2.5 rounded-lg bg-[#141928] border border-[#1f283f]"><Sparkles className="w-5 h-5 text-sky-400" /></div><div><h3 className="text-lg font-bold text-white">Engineering Approach</h3><p className="text-xs text-slate-400">Principles that guide my work</p></div></div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-300"><Code2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" /><div><span className="font-semibold text-white">Maintainable Systems:</span> Reusable components and clear boundaries that make interfaces easier to extend.</div></li>
            <li className="flex items-start gap-3 text-slate-300"><ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><div><span className="font-semibold text-white">Accessibility First:</span> Semantic HTML, high-contrast ratios, and full keyboard-navigable components.</div></li>
            <li className="flex items-start gap-3 text-slate-300"><CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" /><div><span className="font-semibold text-white">Predictable State:</span> Unidirectional data flow and clear boundary separation between views and data sources.</div></li>
          </ul>
          <div className="pt-4 border-t border-[#171e2e] flex items-center justify-between text-xs text-slate-400"><span className="flex items-center gap-1.5 font-medium text-slate-300"><Award className="w-4 h-4 text-sky-400" />Professional Track Record</span><span className="font-mono text-sky-400">Verified 2024–2026</span></div>
        </div>
      </div>
    </div>
  </Container></section>
);
