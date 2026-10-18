import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navItems, personalInfo } from '../../data/portfolioData';
import { Container } from './Container';
import { Button } from '../ui/Button';

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#07090e]/90 backdrop-blur-md border-b border-[#1b2030] py-3.5 shadow-lg shadow-black/20'
        : 'bg-transparent py-5 border-b border-transparent'
    }`}>
      <Container className="flex items-center justify-between">
        <a href="#" className="group flex items-center gap-2.5 text-slate-100 hover:text-white transition-colors" aria-label="Home">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-sm shadow-sm group-hover:scale-105 transition-transform">TC</div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base tracking-tight leading-none text-slate-100">{personalInfo.name}</span>
            <span className="text-[11px] text-sky-400 font-mono tracking-wider uppercase mt-1">Frontend Engineer</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1 bg-[#0e121d]/80 border border-[#1e2436] px-3 py-1.5 rounded-full" aria-label="Main Navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-[#1a2133]">{item.label}</a>)}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button href="#contact" size="sm" variant="secondary" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>Let's Talk</Button>
        </div>

        <button type="button" className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-label="Toggle navigation menu">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d15] border-b border-[#1c2234] px-5 py-6 space-y-4">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {navItems.map((item) => <a key={item.href} href={item.href} className="text-sm font-medium text-slate-200 hover:text-sky-400 py-2 transition-colors border-b border-[#141926]" onClick={() => setMobileMenuOpen(false)}>{item.label}</a>)}
          </nav>
          <div className="pt-2">
            <Button href="#contact" size="md" variant="primary" className="w-full" onClick={() => setMobileMenuOpen(false)} icon={<ArrowUpRight className="w-4 h-4" />}>Contact Me</Button>
          </div>
        </div>
      )}
    </header>
  );
};
