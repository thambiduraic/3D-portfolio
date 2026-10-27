import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { navItems, personalInfo, socialLinks } from '../../data/portfolioData';
import { Container } from './Container';
import { GithubIcon } from '../ui/Icons';

export const SiteFooter: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-border bg-background pb-12 pt-16 text-muted">
      <Container>
        <div className="grid grid-cols-1 gap-10 border-b border-border pb-12 md:grid-cols-12">
          <div className="space-y-4 md:col-span-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-control border border-foreground bg-foreground font-mono text-xs font-semibold text-background">TC</div>
              <span className="text-lg font-semibold tracking-tight text-foreground">{personalInfo.name}</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">Frontend Engineer specializing in React, TypeScript, and high-performance client architectures. Built with intentional craft and zero-slop engineering.</p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target={link.iconName === 'mail' ? undefined : '_blank'} rel={link.iconName === 'mail' ? undefined : 'noopener noreferrer'} className="inline-flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground" aria-label={link.label}>
                  {link.iconName === 'github' && <GithubIcon className="h-3.5 w-3.5" />}
                  {link.iconName === 'mail' && <Mail className="h-3.5 w-3.5" />}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => <li key={item.href}><a href={item.href} className="text-muted transition-colors hover:text-foreground">{item.label}</a></li>)}
            </ul>
          </div>

          <div className="space-y-3 md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground">Direct Contact</h3>
            <p className="text-xs leading-relaxed text-muted">Available for full-time engineering roles and high-impact frontend initiatives.</p>
            <a href={`mailto:${personalInfo.email}`} className="inline-block font-mono text-sm text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-hover">{personalInfo.email}</a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All verified portfolio rights reserved.</p>
          <button type="button" onClick={scrollToTop} className="inline-flex cursor-pointer items-center gap-1.5 text-muted transition-colors hover:text-foreground" aria-label="Back to top"><span>Back to top</span><ArrowUp className="h-3.5 w-3.5" /></button>
        </div>
      </Container>
    </footer>
  );
};
