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
    <section id="contact" className="py-24 md:py-32"><Container size="narrow">
      <SectionHeading align="center" label="Let's Connect" title="Start a Conversation" description="Open for full-time frontend engineering roles, consulting, and high-impact web development collaborations." />
      <div className="rounded-2xl bg-[#0c101a] border border-[#1e2538] p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-[#080b12] border border-[#182033]">
          <div className="flex items-center gap-3.5"><div className="p-3 rounded-lg bg-[#111726] border border-[#1c243a] text-sky-400"><Mail className="w-5 h-5" /></div><div><span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">Direct Email Address</span><a href={`mailto:${personalInfo.email}`} className="text-base sm:text-lg font-mono text-white hover:text-sky-400 transition-colors">{personalInfo.email}</a></div></div>
          <button type="button" onClick={copyEmail} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#141a29] border border-[#222a40] text-xs font-medium text-slate-200 hover:text-white hover:border-sky-500/50 transition-colors cursor-pointer" aria-label="Copy email address">
            {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></> : <><Copy className="w-3.5 h-3.5 text-slate-400" /><span>Copy Address</span></>}
          </button>
        </div>
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200"><MessageSquare className="w-4 h-4 text-sky-400" /><span>Compose Quick Message</span></div>
          <div className="space-y-3">
            <div><label htmlFor="name-input" className="block text-xs text-slate-400 mb-1">Your Name / Organization</label><input id="name-input" type="text" placeholder="e.g. Alex from TechCorp" value={senderName} onChange={(e) => setSenderName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg bg-[#080b12] border border-[#1b2234] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500" /></div>
            <div><label htmlFor="subject-input" className="block text-xs text-slate-400 mb-1">Topic / Role Title</label><input id="subject-input" type="text" placeholder="e.g. Frontend Engineer Role Discussion" value={senderSubject} onChange={(e) => setSenderSubject(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg bg-[#080b12] border border-[#1b2234] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500" /></div>
            <div><label htmlFor="message-input" className="block text-xs text-slate-400 mb-1">Message Details</label><textarea id="message-input" rows={4} placeholder="Write your note or project scope..." value={senderMessage} onChange={(e) => setSenderMessage(e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg bg-[#080b12] border border-[#1b2234] text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 resize-none" /></div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4"><p className="text-xs text-slate-400 text-center sm:text-left">Dispatches directly via your system email client. No third-party data tracking.</p><Button href={mailtoLink} size="md" variant="primary" icon={<Send className="w-4 h-4" />}>Send via Email</Button></div>
          </div>
        </div>
        <div className="pt-6 border-t border-[#171e2e] flex flex-wrap items-center justify-center gap-4 text-xs"><span className="text-slate-400">Verified Web Presence:</span>{socialLinks.map((item: SocialLink) => <a key={item.label} href={item.href} target={item.iconName === 'mail' ? undefined : '_blank'} rel={item.iconName === 'mail' ? undefined : 'noopener noreferrer'} className="inline-flex items-center gap-1.5 text-slate-300 hover:text-sky-400 transition-colors font-medium"><span>{item.label}</span><ArrowUpRight className="w-3 h-3 text-slate-400" /></a>)}</div>
      </div>
    </Container></section>
  );
};
