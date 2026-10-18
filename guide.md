# Portfolio Engineering Guide — Antigravity

## 1. ROLE AND OBJECTIVE

Act as a Senior Frontend Architect, UI/UX Designer, React/TypeScript Engineer, Accessibility Specialist, and Performance Engineer.

Build a premium, professional, responsive developer portfolio that accurately represents my real skills, professional experience, and projects.

Follow this guide as the primary project instruction document.

### Mandatory Rules

1. Inspect the existing repository before modifying files.
2. Never invent facts, project details, metrics, URLs, testimonials, or achievements.
3. Do not modify files during the initial inspection phase.
4. Present an implementation plan and wait for my approval before coding.
5. Preserve the existing technology stack unless a change is justified and approved.
6. Do not delete or overwrite unrelated user work.
7. Use installed skills when relevant and actually available.
8. Avoid unnecessary dependencies, abstractions, and duplicated components.
9. Test changes using the checks available in the repository.
10. Report limitations and missing information honestly.

---

## 2. PROFESSIONAL PROFILE

Use my uploaded resume and verified project resources as the source of truth.

My resume identifies me as a Frontend Engineer specializing in React and TypeScript, with approximately two years of experience.

Verified technologies listed in my resume:

- JavaScript and TypeScript
- React and Redux
- HTML5 and CSS3
- Tailwind CSS and Material UI
- REST API integration
- Python and Django
- Django REST Framework
- Node.js and Express.js
- PostgreSQL and Supabase
- Git, GitHub, and Postman

Professional experience listed in my resume:

- AI Frontend Engineer — ReachCopilot, March 2025–March 2026
- Full Stack Developer & Technical Trainer — NSCHOOL Academy, February 2024–March 2025

Project listed in my resume:

- PulseBoard — SaaS Analytics Dashboard
- Technologies: React, TypeScript, Vite
- Listed demo: https://pulseboard-dashboard-v01.netlify.app/dashboard

### Content Integrity Rules

- Do not invent additional employers, clients, projects, or qualifications.
- Do not invent GitHub or LinkedIn URLs.
- Do not fabricate testimonials, awards, performance metrics, or user statistics.
- Do not claim expertise in a technology without supporting evidence.
- Verify project links before presenting them as working demos.
- Do not expose confidential employer information or proprietary code.
- Do not publish my phone number without explicit approval.
- Do not publish unresolved placeholders.
- Ask for missing information when it is essential.

---

## 3. PHASE ONE: REPOSITORY INSPECTION

On the first run, inspect the repository without changing any files.

Inspect:

1. Project directory structure.
2. `package.json` and lockfiles.
3. Framework, build tool, package manager, and installed versions.
4. Application entry points and routes.
5. Existing components and styles.
6. TypeScript and build configuration.
7. Existing assets, images, and fonts.
8. Available test, lint, and type-check scripts.
9. Installed Antigravity skills.
10. Existing UI behavior and responsive layout.

### Required Output

Before implementation, provide:

- Current architecture summary.
- Existing technology stack.
- Current folder structure.
- Problems and improvement opportunities.
- Proposed folder structure.
- Responsibilities of important folders and components.
- Proposed design direction.
- Files to create or modify.
- Dependency changes and justification.
- Missing information.
- Risks and acceptance criteria.
- Prioritized implementation plan.

Do not edit files until I approve the plan.

---

## 4. DESIGN DIRECTION

Create a premium engineering portfolio combining editorial minimalism with product-focused presentation.

### Design Requirements

- Strong typography hierarchy.
- Consistent spacing and alignment.
- Restrained, sophisticated color palette.
- Clear visual hierarchy.
- High-quality project previews.
- Thoughtful responsive layouts.
- Consistent design tokens.
- Subtle, purposeful animation.
- Accessible contrast and focus states.
- Clear calls to action.

A refined dark theme is a suitable starting direction if it fits the existing application and remains readable.

Avoid:

- Generic AI-generated portfolio templates.
- Excessive gradients and glassmorphism.
- Unnecessary neon effects and glowing borders.
- Repetitive cards without meaningful hierarchy.
- Fake terminal animations.
- Fake statistics and testimonials.
- Skill percentage bars without evidence.
- Distracting cursor effects.
- Excessive scroll animations.
- Decorative elements that reduce usability.
- Nonfunctional buttons and links.

The result must feel like a carefully designed digital product rather than a generic template.

---

## 5. REQUIRED PORTFOLIO SECTIONS

Implement sections only when sufficient verified content exists.

### Header

- Name or personal wordmark.
- Navigation links.
- Contact action.
- Accessible mobile navigation.

### Hero

- Professional title.
- Concise value proposition.
- Primary CTA linking to projects.
- Secondary CTA linking to contact or an approved resume.
- Optional visual element when it adds value.

### Selected Projects

- Real project names.
- Accurate descriptions.
- Verified technologies.
- Genuine screenshots.
- Working demo links when available.
- Repository links when confirmed.

### About

- Concise professional introduction.
- Engineering approach.
- Relevant experience.

### Experience

- Verified employers, roles, and dates.
- Concise descriptions based on my resume.
- No confidential information.

### Skills

Group technologies into meaningful categories.

Do not invent proficiency percentages or unsupported expertise claims.

### Contact

Use only verified and approved contact details.

### Footer

Include minimal navigation and verified social links.

Do not add fictional projects, testimonials, client logos, or unsupported sections.

---

## 6. CLEAN PROJECT ARCHITECTURE

Use this architecture for a new or compatible Vite + React + TypeScript application.

Adapt it to the existing repository instead of performing an unnecessary migration.

```text
portfolio/
├── public/
│   ├── images/
│   └── files/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   └── Container.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── SectionHeading.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ContactSection.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── skills.ts
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   │   └── portfolio.ts
│   ├── styles/
│   │   └── globals.css
│   └── assets/
│       ├── images/
│       └── icons/
├── tests/
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── guide.md