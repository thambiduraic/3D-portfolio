import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, MessageSquare, Send } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolioData';
import type { SocialLink } from '../types/portfolio';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderSubject, setSenderSubject] = useState('');
  const [senderMessage, setSenderMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(senderSubject || 'Engineering Inquiry')}&body=${encodeURIComponent(`Hello ${personalInfo.name},\n\n${senderMessage || 'I would like to discuss an engineering opportunity with you.'}\n\nBest regards,\n${senderName || 'A Collaborator'}`)}`;

  return (
    <section id="contact" className="py-[var(--spacing-section)] md:py-[var(--spacing-section-lg)]"><Container size="narrow">
      <SectionHeading align="center" label="Let's Connect" title="Start a Conversation" description="Open for full-time frontend engineering roles, consulting, and high-impact web development collaborations." />
      <div className="space-y-8 rounded-card border border-border bg-surface p-6 sm:p-10">
        <div className="flex flex-col gap-4 rounded-control border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3.5"><div className="shrink-0 rounded-control border border-border bg-surface p-3 text-accent"><Mail className="h-5 w-5" /></div><div className="min-w-0"><span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-dim">Direct Email Address</span><a href={`mailto:${personalInfo.email}`} className="block break-all font-mono text-base text-foreground transition-colors hover:text-accent sm:text-lg">{personalInfo.email}</a></div></div>
          <button type="button" onClick={copyEmail} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground" aria-label="Copy email address">
            {copied ? <><Check className="h-3.5 w-3.5 text-success" /><span className="text-success">Copied!</span></> : <><Copy className="h-3.5 w-3.5 text-muted" /><span>Copy Address</span></>}
          </button>
          <span role="status" aria-live="polite" className="sr-only">{copied ? 'Email address copied to clipboard' : ''}</span>
        </div>
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground"><MessageSquare className="h-4 w-4 text-accent" /><span>Compose Quick Message</span></div>
          <div className="space-y-3">
            <div><label htmlFor="name-input" className="mb-1.5 block text-xs font-medium text-muted">Your Name / Organization</label><input id="name-input" type="text" placeholder="e.g. Alex from TechCorp" value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full rounded-control border border-border-strong bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted focus:border-accent" /></div>
            <div><label htmlFor="subject-input" className="mb-1.5 block text-xs font-medium text-muted">Topic / Role Title</label><input id="subject-input" type="text" placeholder="e.g. Frontend Engineer Role Discussion" value={senderSubject} onChange={(e) => setSenderSubject(e.target.value)} className="w-full rounded-control border border-border-strong bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted focus:border-accent" /></div>
            <div><label htmlFor="message-input" className="mb-1.5 block text-xs font-medium text-muted">Message Details</label><textarea id="message-input" rows={4} placeholder="Write your note or project scope..." value={senderMessage} onChange={(e) => setSenderMessage(e.target.value)} className="w-full resize-none rounded-control border border-border-strong bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted focus:border-accent" /></div>
            <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row"><p className="text-center text-xs leading-relaxed text-muted sm:text-left">Dispatches directly via your system email client. No third-party data tracking.</p><Button href={mailtoLink} size="md" variant="primary" icon={<Send className="h-4 w-4" />}>Send via Email</Button></div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 border-t border-border pt-6 text-xs"><span className="text-muted">Verified Web Presence:</span>{socialLinks.map((item: SocialLink) => <a key={item.label} href={item.href} target={item.iconName === 'mail' ? undefined : '_blank'} rel={item.iconName === 'mail' ? undefined : 'noopener noreferrer'} className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-accent"><span>{item.label}</span><ArrowUpRight className="h-3 w-3 text-dim" /></a>)}</div>
      </div>
    </Container></section>
  );
};
