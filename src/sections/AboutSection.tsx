import React from 'react';
import { Award, CheckCircle, Code2, ShieldCheck, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

export const AboutSection: React.FC = () => (
  <section id="about" className="border-b border-border py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]"><Container>
    <SectionHeading label="Profile & Philosophy" title="About & Engineering Values" description="A product-minded approach centered on user experience, system stability, and clean software architecture." />
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
      <div className="space-y-5 text-base leading-relaxed text-muted lg:col-span-7">
        <p>I am <span className="font-semibold text-foreground">{personalInfo.name}</span>, a Frontend Engineer with around two years of experience delivering robust web applications, responsive user interfaces, and modular component systems.</p>
        <p>My engineering focus centers on <span className="font-medium text-accent">React and TypeScript</span>, bridging the gap between sophisticated user interface design and resilient data pipelines. Having worked across AI product interfaces and full-stack environments, I value clean code structure, performance optimization, and deliberate architectural choices.</p>
        <p>I believe in building interfaces that respect the user through accessibility, clear feedback, and thoughtful interactions. I also enjoy sharing what I learn through technical training and collaboration.</p>
        <p>{personalInfo.summary}</p>
      </div>
      <div className="lg:col-span-5">
        <div className="space-y-6 rounded-card border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3"><div className="rounded-control border border-border bg-background p-2.5"><Sparkles className="h-5 w-5 text-accent" /></div><div><h3 className="text-lg font-semibold text-foreground">Engineering Approach</h3><p className="mt-0.5 text-xs text-muted">Principles that guide my work</p></div></div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm leading-relaxed text-muted"><Code2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><div><span className="font-semibold text-foreground">Maintainable Systems:</span> Reusable components and clear boundaries that make interfaces easier to extend.</div></li>
            <li className="flex items-start gap-3 text-sm leading-relaxed text-muted"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><div><span className="font-semibold text-foreground">Accessibility First:</span> Semantic HTML, high-contrast ratios, and full keyboard-navigable components.</div></li>
            <li className="flex items-start gap-3 text-sm leading-relaxed text-muted"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><div><span className="font-semibold text-foreground">Predictable State:</span> Unidirectional data flow and clear boundary separation between views and data sources.</div></li>
          </ul>
          <div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-xs text-muted"><span className="flex items-center gap-1.5 font-medium text-foreground"><Award className="h-4 w-4 text-accent" />Professional Track Record</span><span className="font-mono text-accent">Verified 2024–2026</span></div>
        </div>
      </div>
    </div>
  </Container></section>
);
