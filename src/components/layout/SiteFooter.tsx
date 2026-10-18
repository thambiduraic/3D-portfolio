import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { navItems, personalInfo, socialLinks } from '../../data/portfolioData';
import { Container } from './Container';
import { GithubIcon } from '../ui/Icons';

export const SiteFooter: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-[#161b29] bg-[#05070a] pt-16 pb-12 text-slate-400">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#131724]">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-sky-500 flex items-center justify-center font-bold text-slate-950 text-xs">TC</div>
              <span className="text-lg font-bold text-white tracking-tight">{personalInfo.name}</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">Frontend Engineer specializing in React, TypeScript, and high-performance client architectures. Built with intentional craft and zero-slop engineering.</p>
            <div className="pt-2 flex items-center gap-4">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target={link.iconName === 'mail' ? undefined : '_blank'} rel={link.iconName === 'mail' ? undefined : 'noopener noreferrer'} className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-sky-400 transition-colors bg-[#0d111b] border border-[#1b2234] px-3 py-1.5 rounded-md hover:border-sky-500/40" aria-label={link.label}>
                  {link.iconName === 'github' && <GithubIcon className="w-3.5 h-3.5" />}
                  {link.iconName === 'mail' && <Mail className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-200">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => <li key={item.href}><a href={item.href} className="hover:text-white transition-colors">{item.label}</a></li>)}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-200">Direct Contact</h3>
            <p className="text-xs text-slate-400">Available for full-time engineering roles and high-impact frontend initiatives.</p>
            <a href={`mailto:${personalInfo.email}`} className="inline-block text-sm font-mono text-sky-400 hover:text-sky-300 underline underline-offset-4 decoration-sky-400/30">{personalInfo.email}</a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All verified portfolio rights reserved.</p>
          <button type="button" onClick={scrollToTop} className="inline-flex items-center gap-1.5 hover:text-white transition-colors text-slate-400 cursor-pointer" aria-label="Back to top"><span>Back to top</span><ArrowUp className="w-3.5 h-3.5" /></button>
        </div>
      </Container>
    </footer>
  );
};
