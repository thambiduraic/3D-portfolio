# Personal Portfolio — Thambidurai Chenniyan

A modern, responsive developer portfolio showcasing my experience, technical skills, projects, and frontend development capabilities.

The portfolio is designed to provide recruiters, hiring managers, and potential clients with a clear overview of my work, technical expertise, and professional background.

---

## Table of Contents

- [Overview](#overview)
- [Portfolio Goals](#portfolio-goals)
- [About Me](#about-me)
- [Featured Project](#featured-project)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Design Principles](#design-principles)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)
- [Performance and Security](#performance-and-security)
- [Deployment](#deployment)
- [Customization](#customization)
- [Project Documentation](#project-documentation)
- [Contact](#contact)

---

## Overview

This portfolio is a personal website built to present my professional profile and development projects through a clean, accessible, and user-friendly interface.

### Key Features

- Responsive layout for desktop, tablet, and mobile devices.
- Professional hero section with a clear introduction and calls to action.
- Project showcase with descriptions, technologies, and project links.
- About section highlighting my background and development interests.
- Professional experience timeline.
- Technical skills organized by category.
- Contact section for professional inquiries.
- Smooth, purposeful animations and transitions.
- Reusable React components.
- Type-safe development using TypeScript.
- SEO-friendly page structure.
- Accessible navigation and interactive elements.

> Features should be documented as completed only after they have been implemented and verified in the actual project.

---

## Portfolio Goals

The primary goals of this portfolio are to:

1. Present my professional background clearly.
2. Demonstrate my React and TypeScript development skills.
3. Showcase real projects and working demonstrations.
4. Highlight reusable component development and responsive UI implementation.
5. Help recruiters and potential clients evaluate my capabilities.
6. Provide an easy way to contact me about job opportunities or freelance projects.

---

## About Me

**Thambidurai Chenniyan**  
Frontend Engineer | React.js | TypeScript

Based in Krishnagiri, Tamil Nadu, India.

I focus on building responsive web interfaces, reusable components, and user-friendly applications. My technical experience includes frontend development, full-stack application development, API integration, and database-backed applications.

### Technical Skills

- **Frontend:** React.js, JavaScript, TypeScript, Redux
- **Styling and UI:** Tailwind CSS, Material UI
- **Backend:** Python, Django, Django REST Framework, Node.js, Express.js
- **Database:** PostgreSQL, Supabase
- **Development:** REST API integration, reusable components, responsive design, performance optimization

This information should be updated whenever my actual skills, experience, or professional goals change.

---

## Featured Project

### PulseBoard — SaaS Analytics Dashboard

**Technologies:** React.js, TypeScript, Vite

**Live Demo:** [Open PulseBoard Dashboard](https://pulseboard-dashboard-v01.netlify.app/dashboard)

PulseBoard is a SaaS analytics dashboard project designed to present business information through a structured, data-focused interface.

#### Project Highlights

- Dashboard overview with KPI cards.
- Revenue and business trend visualizations.
- Customer information and table views.
- Reports and settings sections.
- Responsive page layout.
- Reusable React UI components.
- TypeScript-based UI development.

#### Project Pages

- Overview
- Customers
- Revenue
- Reports
- Settings

**Note:** Only describe functionality that exists in the live demo or verified source code. Clearly identify sample or mock data rather than presenting it as real business data.

### Adding More Projects

For each additional project, include:

- Project name.
- Short description.
- Problem being solved.
- Technologies used.
- Key features.
- Live demo URL, if available.
- Source code URL, if publicly available.
- Screenshots, if useful.

Do not invent project metrics, client names, business outcomes, or deployment URLs.

---

## Technology Stack

The following technologies are intended for this project. The actual stack must be confirmed by inspecting `package.json` and the existing source code.

| Technology | Purpose |
|---|---|
| React.js | Building reusable UI components |
| TypeScript | Type-safe application development |
| Vite | Development server and production build tooling |
| Tailwind CSS | Utility-first styling |
| Material UI | Accessible UI components where appropriate |
| Framer Motion | Purposeful animations and transitions |
| Git | Version control |
| Netlify or Vercel | Potential deployment platforms |

### Technology Guidelines

- Prefer the libraries already installed in the repository.
- Avoid adding dependencies without a clear requirement.
- Do not use multiple libraries to solve the same UI problem unnecessarily.
- Use Tailwind CSS as the primary styling system if that is the established project choice.
- Use Material UI selectively where it improves consistency or accessibility.
- Use Framer Motion for meaningful transitions rather than excessive animation.
- Confirm the installed Framer Motion package and API before implementing animations.
- Do not assume a dependency is installed simply because it is listed in this README.

---

## Project Architecture

The project should follow a clear, maintainable structure. Adapt this structure to the existing repository rather than replacing working architecture without justification.

```text
portfolio/
├── public/
│   ├── images/
│   └── files/
├── src/
│   ├── App.tsx
│   └── main.tsx
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
```

### Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `src/app/` | Application entry points and root component |
| `src/components/layout/` | Shared site layout components |
| `src/components/ui/` | Reusable buttons, headings, and UI primitives |
| `src/sections/` | Main portfolio sections |
| `src/data/` | Portfolio content separated from presentation |
| `src/hooks/` | Custom React hooks |
| `src/lib/` | Shared utilities and helper functions |
| `src/types/` | Shared TypeScript types |
| `src/styles/` | Global styles and design tokens |
| `src/assets/` | Imported images, icons, and other assets |
| `public/` | Static files served directly |
| `tests/` | Automated tests, if configured |

**Important:** This is a target architecture, not proof that these folders already exist. Inspect the repository before creating or moving files.

---

## Getting Started

### Prerequisites

Install the following tools:

- Node.js version compatible with the project's Vite version.
- npm, or the package manager already used by the repository.
- Git, if version control is required.
- A code editor such as Visual Studio Code.

Verify your installation:

```bash
node --version
npm --version
git --version
```

### 1. Clone the Repository

If the project is hosted in a Git repository:

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

Replace the placeholders with your actual repository URL and project folder.

If you already have the project locally, open its existing directory instead.

### 2. Install Dependencies

For an npm project:

```bash
npm install
```

If the repository uses another package manager, follow its existing lockfile and package manager conventions.

### 3. Configure Environment Variables

If the application requires environment variables, create a local `.env` file based on `.env.example`.

Example:

```env
VITE_PUBLIC_API_URL=http://localhost:8000
```

This is an illustrative variable only. Replace it with the actual variables required by the application.

**Security rules:**

- Never commit `.env` files containing local credentials.
- Never put private API keys, service-role keys, passwords, or server secrets in frontend environment variables.
- Variables prefixed with `VITE_` are exposed to client-side code.
- Keep sensitive operations and secret credentials on a trusted backend.
- Use `.env.example` to document variable names without real secret values.

If the portfolio does not need environment variables, do not add unnecessary configuration.

### 4. Start the Development Server

For a Vite application:

```bash
npm run dev
```

Open the local URL printed in your terminal. A common default is:

```text
http://localhost:5173
```

Use the actual URL shown by Vite if the port is different.

### 5. Create a Production Build

```bash
npm run build
```

### 6. Preview the Production Build

```bash
npm run preview
```

Run only scripts that are defined in the project's `package.json`.

---

## Available Scripts

The following are common Vite scripts. Confirm that each script exists in `package.json` before using it.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run linting, if configured |
| `npm run test` | Run tests, if configured |
| `npm run typecheck` | Check TypeScript types, if configured |

Do not report a test, lint, or type-check command as successful unless it has actually been executed and passed.

---

## Design Principles

The portfolio should feel like a polished professional product rather than a generic template.

### Visual Direction

- Clean, modern, editorial layout.
- Strong typography and clear visual hierarchy.
- Consistent spacing and alignment.
- Restrained use of colors, gradients, and shadows.
- Well-designed project cards with clear information.
- Subtle, purposeful animations.
- Consistent button styles and interaction states.
- Clear calls to action.
- Minimal visual clutter.

### User Experience

- Make my role and primary skills immediately understandable.
- Make featured projects easy to discover.
- Keep navigation simple and predictable.
- Ensure links and buttons have meaningful actions.
- Avoid excessive scrolling where it can be reduced without harming readability.
- Provide clear feedback for form submission or other interactions.
- Avoid placeholder content in the finished portfolio.

### Animation

Animations should enhance the experience rather than distract from the content.

- Prefer short, subtle transitions.
- Respect `prefers-reduced-motion`.
- Avoid animations that block interaction.
- Avoid excessive movement on mobile devices.
- Do not introduce animation dependencies unless they are needed.

---

## Responsive Design

The portfolio must work across common viewport sizes.

Suggested testing widths:

| Device Category | Approximate Width |
|---|---:|
| Small mobile | 320–375px |
| Large mobile | 376–480px |
| Tablet | 768px |
| Laptop | 1024–1440px |
| Large desktop | 1440px and above |

### Responsive Requirements

- No unintended horizontal scrolling.
- Navigation works on small screens.
- Text remains readable without excessive zooming.
- Images scale without distortion.
- Project cards adapt to available width.
- Buttons and interactive targets are comfortable to use.
- Forms remain usable on mobile devices.
- Layout spacing is consistent across breakpoints.

Test the actual page at representative viewport sizes before considering the work complete.

---

## Accessibility

Follow practical accessibility standards throughout the application.

- Use semantic HTML elements.
- Maintain logical heading order.
- Provide accessible names for interactive controls.
- Add meaningful alternative text to informative images.
- Maintain sufficient color contrast.
- Ensure keyboard navigation works.
- Show visible focus indicators.
- Associate form fields with labels.
- Communicate validation errors clearly.
- Respect reduced-motion preferences.
- Do not communicate important information through color alone.

Use accessibility checks during development and fix identified issues.

---

## Performance and Security

### Performance

- Use appropriately sized images.
- Avoid unnecessary dependencies.
- Keep components focused and reusable.
- Avoid unnecessary React re-renders.
- Lazy-load suitable below-the-fold images where beneficial.
- Use animation sparingly.
- Remove unused code and assets.
- Verify the production build.
- Use performance auditing tools when available.

### Security and Privacy

- Do not expose private credentials in client-side code.
- Do not commit `.env` files containing secrets.
- Avoid collecting personal information unless necessary.
- Do not add analytics, tracking, or third-party scripts without a clear need.
- Validate contact form input on the server when a backend is used.
- Never claim a form sends messages unless its delivery mechanism has been implemented and tested.
- Use HTTPS for production deployments.

---

## Deployment

The portfolio may be deployed to a static hosting provider such as Netlify or Vercel, depending on the repository configuration.

### Typical Deployment Settings

| Setting | Typical Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Framework | Vite |

Confirm these settings against the actual project before deployment.

### Deployment Checklist

- [ ] Production build completes successfully.
- [ ] All portfolio sections display correctly.
- [ ] Project links point to the correct destinations.
- [ ] Contact actions work as intended.
- [ ] No private credentials are exposed.
- [ ] No broken images or navigation links remain.
- [ ] Mobile and desktop layouts are checked.
- [ ] Browser console has no unresolved critical errors.
- [ ] Page title and metadata are configured.
- [ ] Deployed URL is verified after publishing.

Do not publish a deployment URL in this README until the deployment has been completed and verified.

---

## Customization

Keep portfolio content separate from UI components whenever practical.

For example, project details can be maintained in:

```text
src/data/projects.ts
```

Experience details can be maintained in:

```text
src/data/experience.ts
```

Skills can be maintained in:

```text
src/data/skills.ts
```

Use the actual file paths in the repository if they differ.

### Updating Portfolio Content

When adding or changing content:

1. Verify the information is accurate.
2. Update the relevant data file or component.
3. Check TypeScript types.
4. Test the affected section.
5. Verify links and images.
6. Check responsive layouts.
7. Run the available quality checks.

Do not fabricate work experience, certifications, testimonials, client names, achievements, or performance statistics.

---

## Project Documentation

The project uses the following documentation where available:

| File | Purpose |
|---|---|
| `README.md` | Project overview, setup, architecture, and usage |
| `guide.md` | AI coding assistant instructions and implementation standards |
| `.env.example` | Names and descriptions of required environment variables |
| `package.json` | Dependencies and available scripts |

Keep documentation synchronized with the real implementation.

---

## Contact

**Thambidurai Chenniyan**  
Frontend Engineer | React.js | TypeScript  
Krishnagiri, Tamil Nadu, India

Add verified professional links here when available:

- **GitHub:** `<your-github-profile-url>`
- **LinkedIn:** `<your-linkedin-profile-url>`
- **Portfolio:** `<your-deployed-portfolio-url>`
- **Email:** `<your-professional-email-address>`

Replace all placeholders before publishing the README publicly. Do not publish contact details that you do not want to make public.

---

## License

Choose and add a license if you intend to distribute the source code publicly.

If no license has been selected, do not imply that others have permission to reuse the source code. Replace this section with the actual license terms once they are decided.

---

**Development principle:** Build incrementally, keep the architecture maintainable, verify all claims, and prioritize accessibility, responsiveness, security, and a professional user experience.