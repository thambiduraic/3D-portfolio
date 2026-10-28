import type {
  Experience,
  ImmersiveSection,
  NavItem,
  Project,
  SkillCategory,
  SocialLink,
} from '../types/portfolio';

export const personalInfo = {
  name: 'Thambidurai Chennaiyen',
  role: 'Frontend Engineer',
  focus: 'React & TypeScript Specialist',
  experienceYears: '2 Years Experience',
  email: 'thambidurai1604@gmail.com',
  github: 'https://github.com/thambiduraic',
  headline: 'Building resilient, high-performance interfaces with React, TypeScript, and modern web architectures.',
  summary:
    'Frontend engineer with around two years of experience delivering performant web applications, responsive component systems, and scalable user experiences. Focused on clean code, type safety, and product polish.',
};

export const sceneTechnologies = ['React', 'TypeScript', 'Python', 'Django', 'PostgreSQL', 'Node.js'];

export const immersiveSections: ImmersiveSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const navItems: NavItem[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const projects: Project[] = [
  {
    id: 'pulseboard',
    title: 'PulseBoard — SaaS Analytics Dashboard',
    category: 'Production SaaS Application',
    description:
      'A modular, high-density analytics dashboard engineered for SaaS telemetry. Delivers interactive data streams, reactive visual widgets, responsive layouts, and zero-jank client state synchronization.',
    architecturalOverview: [
      'Engineered with React, TypeScript, and Vite for fast client rendering and instant HMR',
      'Implemented clean component abstractions separating presentational charts from stateful data providers',
      'Optimized DOM layout with fluid responsive grids and accessible navigation panels',
      'Configured type-safe data transformations for reliable telemetry visualization',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'REST API Integration'],
    demoUrl: 'https://pulseboard-dashboard-v01.netlify.app',
    repoUrl: 'https://github.com/thambiduraic/pulseboard-dashboard.git',
    features: [
      'Comprehensive metric overview panels and interactive trend graphs',
      'Responsive multi-breakpoint layout supporting mobile to widescreen displays',
      'Light/Dark theme support with calibrated semantic design tokens',
      'Zero-latency filter toggles and rapid client-side dataset querying',
    ],
    metricsOrHighlights: [
      'Sub-second first contentful paint powered by Vite bundle optimization',
      '100% strict TypeScript typing across all components and dataset models',
      'Real-world deployed demo actively accessible on Netlify',
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'reachcopilot',
    role: 'AI Frontend Engineer',
    company: 'ReachCopilot',
    period: 'March 2025 — March 2026',
    summary:
      'Spearheaded frontend engineering for AI-powered interface modules, integrating real-time streaming feedback and responsive assistive tools.',
    responsibilities: [
      'Architected intuitive UI components for AI-driven workflows using React and TypeScript',
      'Engineered responsive layouts and optimized client rendering pipelines for low-latency streaming interactions',
      'Collaborated closely with cross-functional teams to integrate robust REST APIs and stateful services',
      'Maintained rigorous code hygiene, type safety, and reusable design patterns across the codebase',
    ],
    technologies: ['React', 'TypeScript', 'REST APIs', 'Tailwind CSS', 'Git & GitHub'],
  },
  {
    id: 'nschool',
    role: 'Full Stack Developer & Technical Trainer',
    company: 'NSCHOOL Academy',
    period: 'February 2024 — March 2025',
    summary:
      'Engineered full-stack educational and enterprise web applications while mentoring engineering students in frontend and backend systems.',
    responsibilities: [
      'Developed responsive single-page web applications with React, Redux, and modern CSS frameworks',
      'Engineered backend endpoints and database schemas with Python, Django, Django REST Framework, Node.js, and PostgreSQL',
      'Conducted hands-on technical sessions covering TypeScript architecture, API development with Postman, and Git workflows',
      'Guided junior developers in testing, debugging, and deploying production-ready codebases',
    ],
    technologies: ['React', 'Redux', 'Python', 'Django', 'Django REST Framework', 'Node.js', 'PostgreSQL', 'Postman'],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Architecture & UI',
    description: 'Building robust, accessible, and high-performance interfaces.',
    skills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI'],
  },
  {
    title: 'Backend & API Integration',
    description: 'Designing and consuming scalable, type-safe API services.',
    skills: ['REST API Integration', 'Node.js', 'Express.js', 'Python', 'Django', 'Django REST Framework', 'Postman'],
  },
  {
    title: 'Databases & Cloud Storage',
    description: 'Relational data modeling and cloud backend management.',
    skills: ['PostgreSQL', 'Supabase'],
  },
  {
    title: 'Developer Tooling & Systems',
    description: 'Ensuring code health, version control, and rapid build cycles.',
    skills: ['Git', 'GitHub', 'Vite', 'ESLint', 'npm'],
  },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/thambiduraic', iconName: 'github' },
  { label: 'Email', href: 'mailto:thambidurai1604@gmail.com', iconName: 'mail' },
];
