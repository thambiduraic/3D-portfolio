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
      case 0: return <Layout className="w-5 h-5 text-sky-400" />;
      case 1: return <Cpu className="w-5 h-5 text-blue-400" />;
      case 2: return <Database className="w-5 h-5 text-emerald-400" />;
      case 3:
      default: return <Terminal className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 md:py-32 border-b border-[#131724]"><Container>
      <SectionHeading label="Technical Competencies" title="Skills & Technologies" description="Verified toolsets and technologies applied across production web applications, client frameworks, and backend integrations." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category: SkillCategory, idx: number) => {
          const isSelected = selectedCategory === idx;
          return <div key={category.title} onClick={() => setSelectedCategory(isSelected ? null : idx)} className={`rounded-xl border p-6 transition-all duration-200 cursor-pointer ${isSelected ? 'bg-[#101422] border-sky-500/50 ring-1 ring-sky-500/20' : 'bg-[#0c0f17] border-[#1d2335] hover:border-[#2a334d] hover:bg-[#0e121d]'}`}>
            <div className="flex items-center gap-3.5 mb-3"><div className="p-2.5 rounded-lg bg-[#141928] border border-[#1f283f]">{getCategoryIcon(idx)}</div><div><h3 className="text-lg font-bold text-white tracking-tight">{category.title}</h3><p className="text-xs text-slate-400">{category.description}</p></div></div>
            <div className="mt-5 flex flex-wrap gap-2">{category.skills.map((skill: string) => <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#121624] border border-[#20273c] text-xs font-medium text-slate-200 hover:border-sky-500/40 hover:text-white transition-colors"><Check className="w-3 h-3 text-sky-400" /><span>{skill}</span></span>)}</div>
          </div>;
        })}
      </div>
      <div className="mt-8 p-4 rounded-lg bg-[#0a0d15] border border-[#161b29] text-center"><p className="text-xs text-slate-400">Note: All listed technical competencies reflect verified work history, production projects, and educational instruction experience without inflated arbitrary percentages.</p></div>
    </Container></section>
  );
};
