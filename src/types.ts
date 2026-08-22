import type React from 'react';

export interface BasicInfo {
  firstName?: string;
  lastName?: string;
  name: string;
  tagline: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  photo?: string;
  summary?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface LinkItem {
  id?: string;
  label: string;
  url: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
  location?: string;
}

export interface ExperienceItem {
  id: string;
  current?: boolean;
  org: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  location?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  githubUrl?: string;
  bullets?: string[];
  image?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface SkillCategory {
  id?: string;
  name: string;
  skills: string[];
}

export type TemplateId = 
  | 'minimal'
  | 'executive'
  | 'modern'
  | 'academic'
  | 'classic'
  | 'compact';

export type TemplateCategory =
  | 'all'
  | 'professional'
  | 'modern'
  | 'academic'
  | 'compact';

export type FontId = 'inter' | 'arial' | 'helvetica' | 'georgia' | 'times';
export type SpacingId = 'compact' | 'balanced' | 'comfortable';
export type PageSizeId = 'a4' | 'letter';

export interface CustomizationSettings {
  font: FontId;
  spacing: SpacingId;
  pageSize: PageSizeId;
  sectionOrder: string[];
  hiddenSections: string[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface PortfolioData {
  templateId: TemplateId;
  accentColor?: string;
  customization?: CustomizationSettings;
  resumeName?: string;

  basicInfo: BasicInfo;
  links: LinkItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: string[];
  skillCategories?: SkillCategory[];
  achievements: AchievementItem[];
  certifications?: CustomSectionItem[];
  publications?: CustomSectionItem[];
  customSections?: { id: string; name: string; items: CustomSectionItem[] }[];
}

export type ResumeData = PortfolioData;

/**
 * Factory functions to create fresh, decoupled objects with robust unique IDs
 */
export function createDefaultCustomization(): CustomizationSettings {
  return {
    font: 'inter',
    spacing: 'balanced',
    pageSize: 'letter',
    sectionOrder: ['summary', 'experience', 'education', 'projects', 'skills', 'certifications', 'achievements', 'publications', 'custom'],
    hiddenSections: [],
  };
}

export function createBlankResume(): PortfolioData {
  return {
    templateId: 'minimal',
    resumeName: 'Untitled Resume',
    customization: createDefaultCustomization(),
    basicInfo: {
      firstName: '',
      lastName: '',
      name: '',
      tagline: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      photo: '',
      summary: '',
      linkedin: '',
      github: '',
      portfolio: '',
    },
    links: [],
    education: [],
    experience: [],
    projects: [],
    skills: [],
    skillCategories: [],
    achievements: [],
    certifications: [],
    publications: [],
    customSections: [],
  };
}

export const DEFAULT_CUSTOMIZATION: CustomizationSettings = createDefaultCustomization();
export const EMPTY_RESUME_DATA: PortfolioData = createBlankResume();
export const BLANK_RESUME_DATA: PortfolioData = createBlankResume();

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  templateId: 'minimal',
  customization: createDefaultCustomization(),
  basicInfo: {
    firstName: 'Jane',
    lastName: 'Doe',
    name: 'Jane Doe',
    tagline: 'Lead Software Architect & Engineering Director',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    photo: '',
    summary: 'Accomplished software leader with 8+ years of expertise designing and implementing robust, scalable architectures. Proven success directing cross-functional squads to optimize systems performance, streamline continuous delivery pipelines, and drive high-impact user experiences.',
    linkedin: 'https://linkedin.com/in/janedoe',
    github: 'https://github.com/janedoe',
    portfolio: 'https://example.com',
  },
  links: [
    { id: 'link-1', label: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' },
    { id: 'link-2', label: 'GitHub', url: 'https://github.com/janedoe' },
    { id: 'link-3', label: 'Portfolio', url: 'https://example.com' },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      field: 'Software Engineering & Distributed Systems',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.88',
      description: 'Dean’s Honors List, Regents Scholar.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      org: 'Enterprise Systems',
      role: 'Staff Software Engineer',
      startDate: '2022',
      endDate: 'Present',
      bullets: [
        'Architected real-time collaboration canvas supporting 50k+ daily concurrent users with sub-15ms sync latency.',
        'Reduced cloud infrastructure compute spend by 38% via Redis clustering and efficient protobuf serialization.',
        'Mentored 12 mid-level and junior engineers on high-throughput microservices architecture and zero-downtime migrations.',
      ],
    },
    {
      id: 'exp-2',
      org: 'CloudScale Technologies',
      role: 'Senior Software Engineer',
      startDate: '2020',
      endDate: '2022',
      bullets: [
        'Engineered distributed telemetry streaming engine processing 1.4B events/day with Apache Kafka and Go.',
        'Spearheaded automated CI/CD pipeline improvements cutting deployment lead time from 45 minutes to 7 minutes.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Real-time Vector Canvas Engine',
      description: 'High-performance vector rendering and collaborative whiteboard system supporting WebGL and multi-cursor sync.',
      tech: ['React', 'TypeScript', 'WebGL', 'CRDT', 'Node.js'],
      link: 'https://example.com/canvas',
      bullets: [
        'Implemented Conflict-free Replicated Data Type (CRDT) algorithms to resolve concurrent vector strokes without locking.',
      ],
    },
  ],
  skills: [
    'React',
    'TypeScript',
    'Node.js',
    'Go',
    'PostgreSQL',
    'Distributed Systems',
    'Docker',
    'Kubernetes',
    'AWS',
    'GraphQL',
    'Microservices',
    'CI/CD Pipelines',
  ],
  skillCategories: [
    {
      id: 'cat-1',
      name: 'Languages & Frameworks',
      skills: ['React', 'TypeScript', 'Node.js', 'Go', 'GraphQL'],
    },
    {
      id: 'cat-2',
      name: 'Infrastructure & Cloud',
      skills: ['Docker', 'Kubernetes', 'AWS', 'PostgreSQL', 'CI/CD Pipelines'],
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place Winner — Global Distributed Systems Hackathon',
      issuer: 'Tech Innovations Summit',
      date: '2023',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Solutions Architect — Professional',
      subtitle: 'Amazon Web Services',
      date: '2023',
    },
  ],
  publications: [],
  customSections: [],
};
