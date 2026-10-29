import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navItems, personalInfo } from '../../data/portfolioData';
import { Container } from './Container';
import { Button } from '../ui/Button';
import { ModeToggle } from '../ui/ModeToggle';

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const hasSurface = isScrolled || mobileMenuOpen;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
      hasSurface
        ? 'border-border bg-background py-3'
        : 'border-transparent bg-transparent py-4'
    }`}>
      <Container className="flex items-center justify-between">
        <a href="#" className="group flex items-center gap-3 text-foreground" aria-label="Home">
          <span className="flex h-8 w-8 items-center justify-center rounded-control border border-foreground bg-foreground font-mono text-sm font-semibold text-background transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-contrast">TC</span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold leading-none tracking-tight sm:text-base">{personalInfo.name}</span>
            <span className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Frontend Engineer</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main Navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} className="text-xs font-medium text-muted transition-colors hover:text-foreground">{item.label}</a>)}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <ModeToggle />
          <Button href="#contact" size="sm" variant="secondary" icon={<ArrowUpRight className="h-3.5 w-3.5" />}>Let's Talk</Button>
        </div>

        <button type="button" className="rounded-control border border-transparent p-2 text-foreground transition-colors hover:border-border hover:bg-surface-elevated xl:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-b border-border bg-background px-5 py-5 xl:hidden">
          <nav className="flex flex-col" aria-label="Mobile Navigation">
            {navItems.map((item) => <a key={item.href} href={item.href} className="border-b border-border py-3 text-sm font-medium text-muted transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>{item.label}</a>)}
          </nav>
          <div className="space-y-3 pt-5">
            <Button href="#contact" size="md" variant="primary" className="w-full" onClick={() => setMobileMenuOpen(false)} icon={<ArrowUpRight className="h-4 w-4" />}>Contact Me</Button>
            <ModeToggle className="w-full justify-center" />
          </div>
        </div>
      )}
    </header>
  );
};
