import { PortfolioData, createDefaultCustomization, createBlankResume, createSafeUUID } from '../types';
import { sanitizeText, sanitizeUrl } from './utils';

export { createBlankResume } from '../types';

export const STORAGE_KEYS = {
  RESUME_DATA: 'buildeasy_portfolio_data',
  WIZARD_DRAFT: 'buildeasy_wizard_draft',
  SCHEMA_VERSION: 'buildeasy_schema_version',
  SCREEN: 'buildeasy_current_screen',
  TAB: 'buildeasy_active_builder_tab',
};

const STORAGE_KEY = STORAGE_KEYS.RESUME_DATA;
const VERSION_KEY = STORAGE_KEYS.SCHEMA_VERSION;
const CURRENT_SCHEMA_VERSION = 3;

/**
 * Generate cryptographically random ID with fallback
 */
function createId(_prefix = 'item'): string {
  return createSafeUUID();
}

/**
 * Normalizes and validates incoming raw data against the expected schema.
 * Ensures every persistent entity object has a valid non-empty string ID.
 */
export function normalizePortfolioData(raw: unknown): PortfolioData {
  if (!raw || typeof raw !== 'object') {
    return createBlankResume();
  }

  const rawObj = raw as Record<string, any>;
  let rawBasic = rawObj.basicInfo;

  // 1. Recover if rawBasic was stored as a string (e.g. "John Doe\nSoftware Engineer")
  if (typeof rawBasic === 'string') {
    const lines = rawBasic.split('\n').map((l: string) => l.trim()).filter(Boolean);
    rawBasic = {
      name: lines[0] || '',
      tagline: lines[1] || '',
      email: lines.find((l: string) => l.includes('@')) || '',
      summary: lines.slice(2).join(' ') || '',
    };
  }

  // 2. Recover if rawBasic was stored as an array of items/characters
  if (Array.isArray(rawBasic)) {
    // If it's an array of single characters e.g. ['H', 'h'] or words
    if (rawBasic.every((c: any) => typeof c === 'string' && c.length === 1)) {
      rawBasic = { name: rawBasic.join('') };
    } else {
      rawBasic = {
        name: typeof rawBasic[0] === 'string' ? rawBasic[0] : '',
        tagline: typeof rawBasic[1] === 'string' ? rawBasic[1] : '',
        email: typeof rawBasic[2] === 'string' ? rawBasic[2] : '',
        summary: typeof rawBasic[3] === 'string' ? rawBasic[3] : '',
      };
    }
  }

  // 3. Recover if rawBasic was corrupted into an object with numeric keys (e.g. { '0': 'H', '1': 'h' })
  if (
    typeof rawBasic === 'object' &&
    rawBasic !== null &&
    !rawBasic.name &&
    Object.keys(rawBasic).length > 0 &&
    Object.keys(rawBasic).every((k) => /^\d+$/.test(k))
  ) {
    const chars = Object.keys(rawBasic)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => String(rawBasic[k]));
    rawBasic = { name: chars.join('') };
  }

  if (typeof rawBasic !== 'object' || rawBasic === null) {
    rawBasic = {};
  }

  // 4. Also inspect JSON Resume standard schema (rawObj.basics) or root flat keys as fallbacks
  const basics = typeof rawObj.basics === 'object' && rawObj.basics !== null ? rawObj.basics : {};
  const profiles = Array.isArray(basics.profiles) ? basics.profiles : [];
  const linkedinFromProfile = profiles.find((p: any) => typeof p?.network === 'string' && p.network.toLowerCase().includes('linkedin'))?.url;
  const githubFromProfile = profiles.find((p: any) => typeof p?.network === 'string' && p.network.toLowerCase().includes('github'))?.url;

  // Resolve Location: support string or object { city, region/state, country }
  let locationStr = '';
  const rawLoc = rawBasic.location ?? rawObj.location ?? basics.location;
  if (typeof rawLoc === 'string') {
    locationStr = rawLoc;
  } else if (typeof rawLoc === 'object' && rawLoc !== null) {
    locationStr = [rawLoc.city, rawLoc.region || rawLoc.state, rawLoc.country].filter(Boolean).join(', ');
  }

  // Resolve Name: support name, fullName, or firstName + lastName
  let nameStr = '';
  if (typeof rawBasic.name === 'string' && rawBasic.name.trim()) {
    nameStr = rawBasic.name;
  } else if (Array.isArray(rawBasic.name)) {
    nameStr = rawBasic.name.join(rawBasic.name.every((c: any) => typeof c === 'string' && c.length === 1) ? '' : ' ');
  } else if (typeof rawBasic.fullName === 'string' && rawBasic.fullName.trim()) {
    nameStr = rawBasic.fullName;
  } else if (rawBasic.firstName || rawBasic.lastName) {
    nameStr = [rawBasic.firstName, rawBasic.lastName].filter(Boolean).join(' ');
  } else if (typeof rawObj.fullName === 'string' && rawObj.fullName.trim()) {
    nameStr = rawObj.fullName;
  } else if (typeof rawObj.name === 'string' && rawObj.name.trim()) {
    nameStr = rawObj.name;
  } else if (typeof basics.name === 'string' && basics.name.trim()) {
    nameStr = basics.name;
  }

  // Resolve Tagline / Title: support tagline, title, headline, role, label
  const taglineStr =
    rawBasic.tagline ||
    rawBasic.title ||
    rawBasic.headline ||
    rawBasic.role ||
    rawBasic.label ||
    rawObj.tagline ||
    rawObj.title ||
    rawObj.headline ||
    rawObj.role ||
    basics.label ||
    '';

  // Resolve Email
  const emailStr = rawBasic.email || rawObj.email || basics.email || '';

  // Resolve Phone
  const phoneStr = rawBasic.phone || rawBasic.phoneNumber || rawObj.phone || basics.phone || '';

  // Resolve Website
  const websiteStr = rawBasic.website || rawBasic.url || rawBasic.link || rawObj.website || rawObj.url || basics.url || '';

  // Resolve Summary / Bio
  const summaryStr =
    rawBasic.summary ||
    rawBasic.about ||
    rawBasic.bio ||
    rawBasic.overview ||
    rawBasic.objective ||
    rawBasic.profile ||
    rawObj.summary ||
    rawObj.about ||
    rawObj.bio ||
    basics.summary ||
    '';

  // Resolve LinkedIn
  const linkedinStr = rawBasic.linkedin || rawObj.linkedin || linkedinFromProfile || '';

  // Resolve GitHub
  const githubStr = rawBasic.github || rawObj.github || githubFromProfile || '';

  // Resolve Portfolio URL
  const portfolioStr = rawBasic.portfolio || rawObj.portfolio || '';

  const basicInfo: PortfolioData['basicInfo'] = {
    firstName: typeof rawBasic.firstName === 'string' ? sanitizeText(rawBasic.firstName) : '',
    lastName: typeof rawBasic.lastName === 'string' ? sanitizeText(rawBasic.lastName) : '',
    name: sanitizeText(nameStr),
    tagline: sanitizeText(taglineStr),
    email: sanitizeText(emailStr),
    phone: sanitizeText(phoneStr),
    location: sanitizeText(locationStr),
    website: sanitizeUrl(websiteStr) || sanitizeText(websiteStr),
    photo: typeof rawBasic.photo === 'string' ? rawBasic.photo : (typeof rawObj.photo === 'string' ? rawObj.photo : ''),
    summary: sanitizeText(summaryStr),
    linkedin: sanitizeUrl(linkedinStr) || sanitizeText(linkedinStr),
    github: sanitizeUrl(githubStr) || sanitizeText(githubStr),
    portfolio: sanitizeUrl(portfolioStr) || sanitizeText(portfolioStr),
  };

  const validTemplates: PortfolioData['templateId'][] = ['minimal', 'executive', 'modern', 'academic', 'classic', 'compact'];
  const templateId = validTemplates.includes(rawObj.templateId as PortfolioData['templateId'])
    ? (rawObj.templateId as PortfolioData['templateId'])
    : 'minimal';

  // Normalize Skills: support array of strings, array of objects, or comma-separated string
  let normalizedSkills: string[] = [];
  const rawSkills = rawObj.skills ?? rawObj.skillList;
  if (Array.isArray(rawSkills)) {
    normalizedSkills = rawSkills
      .map((s: any) => {
        if (typeof s === 'string') return sanitizeText(s);
        if (typeof s?.name === 'string') return sanitizeText(s.name);
        return '';
      })
      .filter((s: string) => s.length > 0);
  } else if (typeof rawSkills === 'string' && rawSkills.trim()) {
    normalizedSkills = rawSkills
      .split(/[,•|]/)
      .map((s: string) => sanitizeText(s))
      .filter((s: string) => s.length > 0);
  }

  // Normalize Experience: support bullets or highlights or description
  const rawExperience = Array.isArray(rawObj.experience)
    ? rawObj.experience
    : Array.isArray(rawObj.work)
      ? rawObj.work
      : [];

  const experience = rawExperience.map((e: any) => {
    let bullets: string[] = [];
    if (Array.isArray(e?.bullets)) {
      bullets = e.bullets.filter((b: any) => typeof b === 'string').map(sanitizeText);
    } else if (Array.isArray(e?.highlights)) {
      bullets = e.highlights.filter((b: any) => typeof b === 'string').map(sanitizeText);
    } else if (typeof e?.description === 'string' && e.description.trim()) {
      bullets = e.description
        .split('\n')
        .map((l: string) => l.replace(/^[-*•]\s*/, '').trim())
        .filter(Boolean);
    }

    return {
      id: typeof e?.id === 'string' && e.id.trim() ? e.id : createId('exp'),
      role: sanitizeText(e?.role || e?.position || e?.title || e?.jobTitle || ''),
      org: sanitizeText(e?.org || e?.company || e?.organization || e?.employer || ''),
      startDate: sanitizeText(e?.startDate || e?.date?.split(/[-–—]/)[0] || ''),
      endDate: sanitizeText(e?.endDate || e?.date?.split(/[-–—]/)[1] || ''),
      current: Boolean(e?.current || (typeof e?.endDate === 'string' && e.endDate.toLowerCase().includes('present'))),
      location: sanitizeText(e?.location || ''),
      bullets,
    };
  });

  // Normalize Education: support school/institution, field/area
  const rawEducation = Array.isArray(rawObj.education) ? rawObj.education : [];
  const education = rawEducation.map((ed: any) => ({
    id: typeof ed?.id === 'string' && ed.id.trim() ? ed.id : createId('edu'),
    institution: sanitizeText(ed?.institution || ed?.school || ed?.university || ed?.college || ''),
    degree: sanitizeText(ed?.degree || ed?.studyType || ''),
    field: sanitizeText(ed?.field || ed?.area || ed?.major || ''),
    startDate: sanitizeText(ed?.startDate || ed?.date?.split(/[-–—]/)[0] || ''),
    endDate: sanitizeText(ed?.endDate || ed?.date?.split(/[-–—]/)[1] || ''),
    gpa: sanitizeText(ed?.gpa || ''),
    description: sanitizeText(ed?.description || ''),
    location: sanitizeText(ed?.location || ''),
  }));

  // Normalize Projects: support name/title, tech/technologies
  const rawProjects = Array.isArray(rawObj.projects) ? rawObj.projects : [];
  const projects = rawProjects.map((p: any) => {
    let tech: string[] = [];
    if (Array.isArray(p?.tech)) {
      tech = p.tech.filter((t: any) => typeof t === 'string').map(sanitizeText);
    } else if (Array.isArray(p?.technologies)) {
      tech = p.technologies.filter((t: any) => typeof t === 'string').map(sanitizeText);
    } else if (typeof p?.technologies === 'string') {
      tech = p.technologies.split(/[,•|]/).map((t: string) => sanitizeText(t)).filter(Boolean);
    }

    let bullets: string[] = [];
    if (Array.isArray(p?.bullets)) {
      bullets = p.bullets.filter((b: any) => typeof b === 'string').map(sanitizeText);
    } else if (Array.isArray(p?.highlights)) {
      bullets = p.highlights.filter((b: any) => typeof b === 'string').map(sanitizeText);
    }

    return {
      id: typeof p?.id === 'string' && p.id.trim() ? p.id : createId('proj'),
      title: sanitizeText(p?.title || p?.name || ''),
      description: sanitizeText(p?.description || ''),
      tech,
      link: sanitizeUrl(p?.link || p?.url || ''),
      githubUrl: sanitizeUrl(p?.githubUrl || ''),
      bullets,
      image: typeof p?.image === 'string' ? p.image : '',
    };
  });

  return {
    id: typeof rawObj.id === 'string' && rawObj.id.trim() ? rawObj.id : createId('resume'),
    templateId,
    accentColor: typeof rawObj.accentColor === 'string' ? rawObj.accentColor : '#111827',
    resumeName: sanitizeText(rawObj.resumeName || 'Untitled Resume'),
    basicInfo,
    links: Array.isArray(rawObj.links)
      ? rawObj.links.map((l: any) => ({
          id: typeof l?.id === 'string' && l.id.trim() ? l.id : createId('link'),
          label: typeof l?.label === 'string' ? sanitizeText(l.label) : '',
          url: typeof l?.url === 'string' ? sanitizeUrl(l.url) || sanitizeText(l.url) : '',
        }))
      : [],
    experience,
    education,
    projects,
    skills: normalizedSkills,
    skillCategories: Array.isArray(rawObj.skillCategories)
      ? rawObj.skillCategories.map((sc: any) => ({
          id: typeof sc?.id === 'string' && sc.id.trim() ? sc.id : createId('skillcat'),
          name: sanitizeText(sc?.name || ''),
          skills: Array.isArray(sc?.skills)
            ? sc.skills.filter((s: any) => typeof s === 'string').map(sanitizeText)
            : [],
        }))
      : [],
    achievements: Array.isArray(rawObj.achievements)
      ? rawObj.achievements.map((a: any) => ({
          id: typeof a?.id === 'string' && a.id.trim() ? a.id : createId('ach'),
          title: sanitizeText(a?.title || ''),
          issuer: sanitizeText(a?.issuer || ''),
          date: sanitizeText(a?.date || ''),
          link: sanitizeUrl(a?.link || ''),
        }))
      : [],
    certifications: Array.isArray(rawObj.certifications)
      ? rawObj.certifications.map((c: any) => ({
          id: typeof c?.id === 'string' && c.id.trim() ? c.id : createId('cert'),
          title: sanitizeText(c?.title || ''),
          subtitle: sanitizeText(c?.subtitle || ''),
          date: sanitizeText(c?.date || ''),
          description: sanitizeText(c?.description || ''),
        }))
      : [],
    publications: Array.isArray(rawObj.publications)
      ? rawObj.publications.map((pub: any) => ({
          id: typeof pub?.id === 'string' && pub.id.trim() ? pub.id : createId('pub'),
          title: sanitizeText(pub?.title || ''),
          subtitle: sanitizeText(pub?.subtitle || ''),
          date: sanitizeText(pub?.date || ''),
          description: sanitizeText(pub?.description || ''),
        }))
      : [],
    customSections: Array.isArray(rawObj.customSections)
      ? rawObj.customSections.map((sec: any) => ({
          id: typeof sec?.id === 'string' && sec.id.trim() ? sec.id : createId('sec'),
          name: sanitizeText(sec?.name || 'Custom Section'),
          items: Array.isArray(sec?.items)
            ? sec.items.map((it: any) => ({
                id: typeof it?.id === 'string' && it.id.trim() ? it.id : createId('cs-item'),
                title: sanitizeText(it?.title || ''),
                subtitle: sanitizeText(it?.subtitle || ''),
                date: sanitizeText(it?.date || ''),
                description: sanitizeText(it?.description || ''),
              }))
            : [],
        }))
      : [],
    customization: {
      pageSize: (rawObj.customization?.pageSize === 'a4' || rawObj.customization?.pageSize === 'letter')
        ? rawObj.customization.pageSize
        : 'letter',
      font: ['inter', 'arial', 'helvetica', 'georgia', 'times'].includes(rawObj.customization?.font as string)
        ? (rawObj.customization?.font as PortfolioData['customization']['font'])
        : 'inter',
      spacing: ['compact', 'balanced', 'comfortable'].includes(rawObj.customization?.spacing as string)
        ? (rawObj.customization?.spacing as PortfolioData['customization']['spacing'])
        : 'balanced',
      sectionOrder: Array.isArray(rawObj.customization?.sectionOrder) && rawObj.customization.sectionOrder.length > 0
        ? rawObj.customization.sectionOrder.filter((s: any) => typeof s === 'string')
        : createDefaultCustomization().sectionOrder,
      hiddenSections: Array.isArray(rawObj.customization?.hiddenSections)
        ? rawObj.customization.hiddenSections.filter((s: any) => typeof s === 'string')
        : [],
    },
  };
}

/**
 * Migration helper to smoothly migrate older local storage schemas
 */
function migrateSchemaIfNeeded(): void {
  try {
    const rawVersion = localStorage.getItem(VERSION_KEY);
    const version = rawVersion ? parseInt(rawVersion, 10) : 1;

    if (version < CURRENT_SCHEMA_VERSION) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          const normalized = normalizePortfolioData(parsed);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        } catch {
          // Invalid json, ignore
        }
      }
      localStorage.setItem(VERSION_KEY, CURRENT_SCHEMA_VERSION.toString());
    }
  } catch {
    // Storage access failed or private mode
  }
}

/**
 * Save current state to localStorage safely
 */
export function persistResumeData(data: PortfolioData): boolean {
  try {
    const payload = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, payload);
    localStorage.setItem(VERSION_KEY, CURRENT_SCHEMA_VERSION.toString());
    return true;
  } catch (error) {
    console.warn('Unable to persist to localStorage (quota or private mode):', error);
    return false;
  }
}

export const savePortfolio = persistResumeData;

/**
 * Load normalized portfolio from localStorage
 */
export function loadPersistedResume(): PortfolioData {
  migrateSchemaIfNeeded();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createBlankResume();
    }
    const parsed = JSON.parse(raw);
    return normalizePortfolioData(parsed);
  } catch (error) {
    console.warn('Error reading from localStorage, returning default resume data:', error);
    return createBlankResume();
  }
}

export const loadPortfolio = loadPersistedResume;

/**
 * Reset portfolio storage to initial state
 */
export function resetPortfolio(): PortfolioData {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VERSION_KEY);
  } catch {
    // Ignore
  }
  return createBlankResume();
}

/**
 * Completely clear all persistent resume, wizard, screen, and tab storage for atomic Start Over.
 */
export function clearAllStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch {
    // Ignore
  }
}

/**
 * Wizard Draft Persistence
 */
export function persistWizardDraft(data: PortfolioData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WIZARD_DRAFT, JSON.stringify(data));
  } catch {
    // Quota or private mode
  }
}

export function loadWizardDraft(): PortfolioData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WIZARD_DRAFT);
    if (!raw) return null;
    return normalizePortfolioData(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function clearWizardDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.WIZARD_DRAFT);
  } catch {
    // Ignore
  }
}

/**
 * Export full resume data as JSON string
 */
export function exportDataAsJson(data: PortfolioData): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Import resume from JSON text with strict validation
 */
export function importDataFromJson(jsonStr: string): { success: boolean; data?: PortfolioData; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Invalid file format: root must be a JSON object.' };
    }
    const normalized = normalizePortfolioData(parsed);
    return { success: true, data: normalized };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Invalid JSON string.' };
  }
}
