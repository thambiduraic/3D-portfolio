export type PortfolioMode = 'immersive' | 'classic';
export type ColorTheme = 'dark' | 'light';

export interface ImmersiveSafeArea {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type ImmersiveSectionId =
  | 'overview'
  | 'frontend'
  | 'backend'
  | 'experience'
  | 'projects'
  | 'contact';

export interface ImmersiveSection {
  id: ImmersiveSectionId;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  architecturalOverview: string[];
  technologies: string[];
  demoUrl: string;
  repoUrl?: string;
  features: string[];
  metricsOrHighlights: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  iconName: 'github' | 'mail' | 'external';
}

export interface NavItem {
  label: string;
  href: string;
}
