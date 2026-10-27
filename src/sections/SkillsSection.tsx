import React, { useState } from 'react';
import { Check, Cpu, Database, Layout, Terminal } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import type { SkillCategory } from '../types/portfolio';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0: return <Layout className="h-5 w-5 text-accent" />;
      case 1: return <Cpu className="h-5 w-5 text-accent" />;
      case 2: return <Database className="h-5 w-5 text-accent" />;
      case 3:
      default: return <Terminal className="h-5 w-5 text-accent" />;
    }
  };

  return (
    <section id="skills" className="border-b border-border py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]"><Container>
      <SectionHeading label="Technical Competencies" title="Skills & Technologies" description="Verified toolsets and technologies applied across production web applications, client frameworks, and backend integrations." />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {skillCategories.map((category: SkillCategory, idx: number) => {
          const isSelected = selectedCategory === idx;
          return <button key={category.title} type="button" onClick={() => setSelectedCategory(isSelected ? null : idx)} aria-pressed={isSelected} className={`w-full cursor-pointer rounded-card border p-6 text-left transition-colors duration-200 ${isSelected ? 'border-accent bg-accent-subtle' : 'border-border bg-surface hover:border-border-strong'}`}>
            <div className="mb-3 flex items-center gap-3.5"><div className="rounded-control border border-border bg-background p-2.5">{getCategoryIcon(idx)}</div><div><h3 className="text-lg font-semibold tracking-tight text-foreground">{category.title}</h3><p className="mt-0.5 text-xs leading-relaxed text-muted">{category.description}</p></div></div>
            <div className="mt-5 flex flex-wrap gap-2">{category.skills.map((skill: string) => <span key={skill} className="inline-flex items-center gap-1.5 rounded-control border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted"><Check className="h-3 w-3 text-accent" /><span>{skill}</span></span>)}</div>
          </button>;
        })}
      </div>
      <div className="mt-8 rounded-control border border-border bg-surface p-4 text-center"><p className="text-xs leading-relaxed text-muted">Note: All listed technical competencies reflect verified work history, production projects, and educational instruction experience without inflated arbitrary percentages.</p></div>
    </Container></section>
  );
};
