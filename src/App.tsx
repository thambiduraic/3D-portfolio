import React from 'react';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';

export const App: React.FC = () => (
  <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-sky-500/20 selection:text-white">
    <SiteHeader />
    <main className="flex-grow">
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
);

export default App;
