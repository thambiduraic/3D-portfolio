import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Mail,
} from 'lucide-react';
import {
  experiences,
  immersiveSections,
  personalInfo,
  projects,
  skillCategories,
  socialLinks,
} from '../../data/portfolioData';
import type { ImmersiveSectionId } from '../../types/portfolio';
import { Button } from '../ui/Button';
import { GithubIcon } from '../ui/Icons';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface ImmersivePanelProps {
  section: ImmersiveSectionId;
  onNavigate: (section: ImmersiveSectionId) => void;
}

const frontendSkills = skillCategories[0];
const backendSkills = skillCategories[1];
const featuredProject = projects[0];
const latestRole = experiences[0];
const backendRole = experiences[1];

const Chip: React.FC<{ label: string; accent?: boolean }> = ({ label, accent = false }) => (
  <span
    className={
      accent
        ? 'rounded-control border border-accent/40 bg-accent-subtle px-2.5 py-1 text-[11px] font-medium text-accent'
        : 'rounded-control border border-border bg-surface/70 px-2.5 py-1 text-[11px] font-medium text-muted'
    }
  >
    {label}
  </span>
);

const AchievementList: React.FC<{ items: string[]; compact?: boolean }> = ({
  items,
  compact = false,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <ul className={compact ? 'space-y-2' : 'space-y-2.5'}>
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={prefersReducedMotion ? false : { opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.3, delay: index * 0.045, ease: 'easeOut' }
          }
          className="flex items-start gap-2 text-sm leading-relaxed text-muted"
        >
          <Check
            className={compact ? 'mt-0.5 h-3 w-3 shrink-0 text-accent' : 'mt-0.5 h-3.5 w-3.5 shrink-0 text-accent'}
            aria-hidden="true"
          />
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  );
};

const PanelHeading: React.FC<{ eyebrow: string; title: string; description?: string }> = ({
  eyebrow,
  title,
  description,
}) => (
  <div className="space-y-3">
    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
      {eyebrow}
    </span>
    <h2 className="text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    )}
  </div>
);

const CopyEmailButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
    } catch {
      return;
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 py-2.5 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
      aria-label="Copy email address"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-success" />
          <span className="text-success">Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copy Email</span>
        </>
      )}
    </button>
  );
};

const OverviewContent: React.FC<{ onNavigate: (section: ImmersiveSectionId) => void }> = ({
  onNavigate,
}) => (
  <div className="space-y-6">
    <div className="inline-flex items-center gap-2 rounded-control border border-border bg-surface/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
      <span className="h-2 w-2 rounded-full bg-success" />
      Available for Frontend Roles
    </div>

    <div className="space-y-3">
      <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-foreground xl:text-5xl">
        {personalInfo.name}
      </h1>
      <p className="text-lg font-medium text-accent">{personalInfo.role}</p>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
        {personalInfo.focus} · {personalInfo.experienceYears}
      </p>
    </div>

    <p className="max-w-xl text-base leading-relaxed text-muted">{personalInfo.headline}</p>

    <div className="flex flex-wrap gap-2">
      {['React 19', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vite', 'REST APIs'].map((tech) => (
        <Chip key={tech} label={tech} />
      ))}
    </div>

    <div className="grid grid-cols-3 divide-x divide-border border-y border-border py-4">
      <div className="pr-3">
        <span className="block font-mono text-xl font-semibold text-foreground">
          {personalInfo.experienceYears.split(' ')[0]}
        </span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-dim">Years exp.</span>
      </div>
      <div className="px-3">
        <span className="block font-mono text-xl font-semibold text-foreground">{experiences.length}</span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-dim">Roles</span>
      </div>
      <div className="pl-3">
        <span className="block font-mono text-xl font-semibold text-foreground">{projects.length}</span>
        <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-dim">Live project</span>
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      <Button onClick={() => onNavigate('experience')} icon={<ArrowRight className="h-4 w-4" />}>
        Explore Experience
      </Button>
      <Button
        variant="secondary"
        onClick={() => onNavigate('projects')}
        icon={<ArrowUpRight className="h-4 w-4" />}
      >
        View Selected Work
      </Button>
    </div>
  </div>
);

const FrontendContent: React.FC<{ onNavigate: (section: ImmersiveSectionId) => void }> = ({
  onNavigate,
}) => (
  <div className="space-y-6">
    <PanelHeading
      eyebrow="Specialization 01 / Frontend"
      title="React & TypeScript interfaces"
      description={frontendSkills.description}
    />

    <div className="flex flex-wrap gap-2">
      {frontendSkills.skills.map((skill) => (
        <Chip key={skill} label={skill} />
      ))}
    </div>

    <div className="rounded-card border border-border bg-surface/70 p-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
        Verified frontend contributions
      </span>
      <h3 className="mt-2 text-base font-semibold text-foreground">
        {latestRole.role} · {latestRole.company}
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
        {latestRole.period}
      </p>
      <div className="mt-3">
        <AchievementList items={latestRole.responsibilities.slice(0, 3)} compact />
      </div>
    </div>

    <div className="rounded-card border border-border bg-surface/70 p-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">Applied in production</span>
      <h3 className="mt-2 text-base font-semibold text-foreground">{featuredProject.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{featuredProject.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {featuredProject.technologies.slice(0, 4).map((tech) => (
          <Chip key={tech} label={tech} />
        ))}
      </div>
      <button
        type="button"
        onClick={() => onNavigate('projects')}
        className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent-hover"
      >
        Open project details
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>

    <div className="rounded-control border border-border bg-background/60 p-4">
      <p className="text-sm leading-relaxed text-muted">
        Interfaces are built with responsive grids, semantic markup, accessible navigation, and
        type-safe component boundaries.
      </p>
    </div>
  </div>
);

const BackendContent: React.FC<{ onNavigate: (section: ImmersiveSectionId) => void }> = ({
  onNavigate,
}) => (
  <div className="space-y-6">
    <PanelHeading
      eyebrow="Specialization 02 / Backend"
      title="Python, Django & data layers"
      description={backendSkills.description}
    />

    <div className="flex flex-wrap gap-2">
      {backendSkills.skills.map((skill) => (
        <Chip key={skill} label={skill} />
      ))}
    </div>

    <div className="rounded-card border border-border bg-surface/70 p-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
        Verified backend contributions
      </span>
      <h3 className="mt-2 text-base font-semibold text-foreground">
        {backendRole.role} · {backendRole.company}
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
        {backendRole.period}
      </p>
      <div className="mt-3 border-l border-accent/60 pl-3">
        <AchievementList items={backendRole.responsibilities} compact />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {backendRole.technologies.slice(1, 7).map((tech) => (
          <Chip key={tech} label={tech} />
        ))}
      </div>
    </div>

    <Button
      variant="secondary"
      onClick={() => onNavigate('experience')}
      icon={<ArrowRight className="h-4 w-4" />}
    >
      See Full Experience
    </Button>
  </div>
);

const ExperienceContent: React.FC = () => (
  <div className="space-y-6">
    <PanelHeading
      eyebrow="Career History / 2024 — 2026"
      title="Professional experience"
      description="Chronological engineering track record across AI-powered interfaces, full-stack systems, and developer mentorship."
    />

    <div className="relative space-y-6 border-l border-border pl-6">
      {experiences.map((experience) => (
        <article key={experience.id} className="relative">
          <span className="absolute -left-[1.85rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background">
            <span className="absolute inset-[2px] rounded-full bg-accent" />
          </span>
          <div className="flex flex-col gap-2 border-b border-border pb-3">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{experience.role}</h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                <Briefcase className="h-3.5 w-3.5" />
                {experience.company}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted">
                <Calendar className="h-3 w-3" />
                {experience.period}
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{experience.summary}</p>
          <div className="mt-3">
            <AchievementList items={experience.responsibilities} compact />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <Chip key={tech} label={tech} />
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
);

const ProjectsContent: React.FC = () => (
  <div className="space-y-6">
    <PanelHeading
      eyebrow="Selected Work / Production SaaS"
      title={featuredProject.title}
      description={featuredProject.description}
    />

    <div className="flex flex-wrap gap-2">
      {featuredProject.technologies.map((tech) => (
        <Chip key={tech} label={tech} />
      ))}
    </div>

    <div className="space-y-3 rounded-card border border-border bg-surface/70 p-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">Highlights</span>
      <AchievementList items={featuredProject.metricsOrHighlights} />
    </div>

    <div className="flex flex-wrap gap-3">
      <Button
        href={featuredProject.demoUrl}
        external
        icon={<ExternalLink className="h-4 w-4" />}
      >
        Launch Live Demo
      </Button>
      {featuredProject.repoUrl && (
        <Button
          href={featuredProject.repoUrl}
          external
          variant="secondary"
          icon={<GithubIcon className="h-4 w-4" />}
        >
          GitHub
        </Button>
      )}
    </div>
  </div>
);

const ContactContent: React.FC = () => (
  <div className="space-y-6">
    <PanelHeading
      eyebrow="Contact / Open to opportunities"
      title="Let's build something reliable."
      description="Open for full-time frontend engineering roles, consulting, and high-impact web development collaborations."
    />

    <div className="rounded-card border border-border bg-surface/70 p-5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">Direct email</span>
      <a
        href={`mailto:${personalInfo.email}`}
        className="mt-2 block break-all font-mono text-base text-foreground transition-colors hover:text-accent sm:text-lg"
      >
        {personalInfo.email}
      </a>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button href={`mailto:${personalInfo.email}`} icon={<Mail className="h-4 w-4" />}>
          Email Me
        </Button>
        <CopyEmailButton />
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.iconName === 'mail' ? undefined : '_blank'}
          rel={link.iconName === 'mail' ? undefined : 'noopener noreferrer'}
          className="inline-flex items-center gap-2 rounded-control border border-border bg-surface/70 px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
        >
          {link.iconName === 'github' && <GithubIcon className="h-3.5 w-3.5" />}
          {link.iconName === 'mail' && <Mail className="h-3.5 w-3.5" />}
          {link.label}
          <ArrowUpRight className="h-3 w-3 text-dim" />
        </a>
      ))}
    </div>

    <div className="rounded-control border border-border bg-background/60 p-4">
      <p className="text-sm leading-relaxed text-muted">
        Latest role: <span className="font-medium text-foreground">{latestRole.role}</span> at{' '}
        <span className="font-medium text-foreground">{latestRole.company}</span> ({latestRole.period}).
      </p>
    </div>
  </div>
);

export const ImmersivePanel: React.FC<ImmersivePanelProps> = ({ section, onNavigate }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const currentIndex = immersiveSections.findIndex((item) => item.id === section);
  const previousSection = immersiveSections[(currentIndex - 1 + immersiveSections.length) % immersiveSections.length];
  const nextSection = immersiveSections[(currentIndex + 1) % immersiveSections.length];

  const renderContent = () => {
    switch (section) {
      case 'overview':
        return <OverviewContent onNavigate={onNavigate} />;
      case 'frontend':
        return <FrontendContent onNavigate={onNavigate} />;
      case 'backend':
        return <BackendContent onNavigate={onNavigate} />;
      case 'experience':
        return <ExperienceContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'contact':
      default:
        return <ContactContent />;
    }
  };

  return (
    <div className="flex min-h-full flex-col">
      <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
        <span>
          {String(currentIndex + 1).padStart(2, '0')} / {String(immersiveSections.length).padStart(2, '0')}
        </span>
        <span className="text-muted">{immersiveSections[currentIndex]?.label}</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={section}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-5">
        <button
          type="button"
          onClick={() => onNavigate(previousSection.id)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {previousSection.label}
        </button>
        <button
          type="button"
          onClick={() => onNavigate(nextSection.id)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-foreground"
        >
          {nextSection.label}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

