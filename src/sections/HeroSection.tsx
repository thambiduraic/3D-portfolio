import React, { useLayoutEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { ProfileCard } from '../components/ui/ProfileCard';
import { gsap } from '../lib/gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.from('[data-hero]', {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
      });

      gsap.from('[data-hero-visual]', {
        y: 18,
        opacity: 0,
        scale: 0.98,
        duration: 1,
        delay: 0.2,
        ease: 'power2.out',
      });
    }, section);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border pb-[var(--spacing-section)] pt-[clamp(6rem,18vh,11rem)] md:pb-[var(--spacing-section-lg)]"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-7">
            <div
              data-hero
              className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-control border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
            >
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              <span className="text-foreground">Available for Frontend Roles</span>
              <span className="hidden text-dim sm:inline" aria-hidden="true">|</span>
              <span>{personalInfo.experienceYears}</span>
            </div>

            <h1
              data-hero
              className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              Frontend Engineer specializing in{' '}
              <span className="text-accent sm:whitespace-nowrap">React &amp; TypeScript</span>
            </h1>

            <p data-hero className="max-w-2xl text-lg font-normal leading-relaxed text-muted sm:text-xl">
              {personalInfo.headline}
            </p>

            <div data-hero className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="#projects" size="lg" variant="primary" icon={<ArrowDown className="h-4 w-4" />}>
                View Selected Work
              </Button>
              <Button href="#experience" size="lg" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
                Experience &amp; Background
              </Button>
            </div>

            <div data-hero className="flex flex-wrap items-center gap-3 border-t border-border pt-6 text-xs text-muted">
              <span className="font-medium uppercase tracking-[0.14em] text-dim">Core Stack:</span>
              {['React 19', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vite', 'REST APIs'].map((tech) => (
                <span key={tech} className="rounded-control border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div data-hero-visual className="lg:col-span-5">
            <ProfileCard />
          </div>
        </div>
      </Container>
    </section>
  );
};
