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
  <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-accent-subtle selection:text-foreground">
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
