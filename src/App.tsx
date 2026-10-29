import React, { lazy, Suspense } from 'react';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { Reveal } from './components/animation/Reveal';
import { PortfolioModeProvider } from './context/PortfolioModeProvider';
import { usePortfolioMode } from './context/portfolioMode';
import { ThemeProvider } from './context/ThemeProvider';
import { HeroSection } from './sections/HeroSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';

const ImmersivePortfolio = lazy(() =>
  import('./components/immersive/ImmersivePortfolio').then((module) => ({
    default: module.ImmersivePortfolio,
  })),
);

const ClassicPortfolio: React.FC = () => (
  <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-accent-subtle selection:text-foreground">
    <SiteHeader />
    <main className="flex-grow">
      <HeroSection />
      <Reveal>
        <ProjectsSection />
      </Reveal>
      <Reveal>
        <ExperienceSection />
      </Reveal>
      <Reveal>
        <SkillsSection />
      </Reveal>
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
    </main>
    <SiteFooter />
  </div>
);

const ImmersiveBoot: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background">
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
      Loading interactive resume
    </span>
  </div>
);

const PortfolioShell: React.FC = () => {
  const { mode } = usePortfolioMode();

  if (mode === 'immersive') {
    return (
      <Suspense fallback={<ImmersiveBoot />}>
        <ImmersivePortfolio />
      </Suspense>
    );
  }

  return <ClassicPortfolio />;
};

export const App: React.FC = () => (
  <ThemeProvider>
    <PortfolioModeProvider>
      <PortfolioShell />
    </PortfolioModeProvider>
  </ThemeProvider>
);

export default App;
