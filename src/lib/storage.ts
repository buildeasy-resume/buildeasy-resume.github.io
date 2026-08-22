import { PortfolioData, DEFAULT_CUSTOMIZATION, INITIAL_PORTFOLIO_DATA, createBlankResume } from '../types';
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
const CURRENT_SCHEMA_VERSION = 2;

/**
 * Generate cryptographically random ID with fallback
 */
function createId(prefix = 'item'): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Normalizes and validates incoming raw data against the expected schema.
 * Ensures every persistent entity object has a valid non-empty string ID.
 */
export function normalizePortfolioData(raw: unknown): PortfolioData {
  const data = (typeof raw === 'object' && raw !== null ? raw : {}) as Partial<PortfolioData>;

  const basicInfo = {
    name: sanitizeText(data.basicInfo?.name || ''),
    tagline: sanitizeText(data.basicInfo?.tagline || ''),
    email: sanitizeText(data.basicInfo?.email || ''),
    phone: sanitizeText(data.basicInfo?.phone || ''),
    location: sanitizeText(data.basicInfo?.location || ''),
    website: sanitizeUrl(data.basicInfo?.website || ''),
    photo: typeof data.basicInfo?.photo === 'string' ? data.basicInfo.photo : '',
    summary: sanitizeText(data.basicInfo?.summary || ''),
    linkedin: sanitizeUrl(data.basicInfo?.linkedin || ''),
    github: sanitizeUrl(data.basicInfo?.github || ''),
    portfolio: sanitizeUrl(data.basicInfo?.portfolio || ''),
  };

  const validTemplates = ['minimal', 'executive', 'modern', 'academic', 'classic', 'compact'];
  const templateId = validTemplates.includes(data.templateId as string)
    ? (data.templateId as PortfolioData['templateId'])
    : 'minimal';

  return {
    templateId,
    accentColor: typeof data.accentColor === 'string' ? data.accentColor : '#2563eb',
    resumeName: sanitizeText(data.resumeName || 'My Resume'),
    basicInfo,
    links: Array.isArray(data.links)
      ? data.links.map(l => ({
          id: typeof l?.id === 'string' && l.id.trim() ? l.id : createId('link'),
          label: typeof l?.label === 'string' ? sanitizeText(l.label) : '',
          url: typeof l?.url === 'string' ? sanitizeUrl(l.url) : '',
        }))
      : [],
    experience: Array.isArray(data.experience)
      ? data.experience.map(e => ({
          id: typeof e?.id === 'string' && e.id.trim() ? e.id : createId('exp'),
          role: sanitizeText(e?.role || ''),
          org: sanitizeText(e?.org || ''),
          startDate: sanitizeText(e?.startDate || ''),
          endDate: sanitizeText(e?.endDate || ''),
          current: Boolean(e?.current),
          location: sanitizeText(e?.location || ''),
          bullets: Array.isArray(e?.bullets)
            ? e.bullets.filter(b => typeof b === 'string').map(sanitizeText)
            : [],
        }))
      : [],
    education: Array.isArray(data.education)
      ? data.education.map(ed => ({
          id: typeof ed?.id === 'string' && ed.id.trim() ? ed.id : createId('edu'),
          institution: sanitizeText(ed?.institution || ''),
          degree: sanitizeText(ed?.degree || ''),
          field: sanitizeText(ed?.field || ''),
          startDate: sanitizeText(ed?.startDate || ''),
          endDate: sanitizeText(ed?.endDate || ''),
          gpa: sanitizeText(ed?.gpa || ''),
          description: sanitizeText(ed?.description || ''),
          location: sanitizeText(ed?.location || ''),
        }))
      : [],
    projects: Array.isArray(data.projects)
      ? data.projects.map(p => ({
          id: typeof p?.id === 'string' && p.id.trim() ? p.id : createId('proj'),
          title: sanitizeText(p?.title || ''),
          description: sanitizeText(p?.description || ''),
          tech: Array.isArray(p?.tech)
            ? p.tech.filter(t => typeof t === 'string').map(sanitizeText)
            : [],
          link: sanitizeUrl(p?.link || ''),
          githubUrl: sanitizeUrl(p?.githubUrl || ''),
          bullets: Array.isArray(p?.bullets)
            ? p.bullets.filter(b => typeof b === 'string').map(sanitizeText)
            : [],
          image: typeof p?.image === 'string' ? p.image : '',
        }))
      : [],
    skills: Array.isArray(data.skills)
      ? data.skills.filter(s => typeof s === 'string' && s.trim().length > 0).map(sanitizeText)
      : [],
    skillCategories: Array.isArray(data.skillCategories)
      ? data.skillCategories.map(sc => ({
          id: typeof sc?.id === 'string' && sc.id.trim() ? sc.id : createId('skillcat'),
          name: sanitizeText(sc?.name || ''),
          skills: Array.isArray(sc?.skills)
            ? sc.skills.filter(s => typeof s === 'string').map(sanitizeText)
            : [],
        }))
      : [],
    achievements: Array.isArray(data.achievements)
      ? data.achievements.map(a => ({
          id: typeof a?.id === 'string' && a.id.trim() ? a.id : createId('ach'),
          title: sanitizeText(a?.title || ''),
          issuer: sanitizeText(a?.issuer || ''),
          date: sanitizeText(a?.date || ''),
          link: sanitizeUrl(a?.link || ''),
        }))
      : [],
    certifications: Array.isArray(data.certifications)
      ? data.certifications.map(c => ({
          id: typeof c?.id === 'string' && c.id.trim() ? c.id : createId('cert'),
          title: sanitizeText(c?.title || ''),
          subtitle: sanitizeText(c?.subtitle || ''),
          date: sanitizeText(c?.date || ''),
          description: sanitizeText(c?.description || ''),
        }))
      : [],
    publications: Array.isArray(data.publications)
      ? data.publications.map(pub => ({
          id: typeof pub?.id === 'string' && pub.id.trim() ? pub.id : createId('pub'),
          title: sanitizeText(pub?.title || ''),
          subtitle: sanitizeText(pub?.subtitle || ''),
          date: sanitizeText(pub?.date || ''),
          description: sanitizeText(pub?.description || ''),
        }))
      : [],
    customSections: Array.isArray(data.customSections)
      ? data.customSections.map(sec => ({
          id: typeof sec?.id === 'string' && sec.id.trim() ? sec.id : createId('sec'),
          name: sanitizeText(sec?.name || 'Custom Section'),
          items: Array.isArray(sec?.items)
            ? sec.items.map(it => ({
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
      pageSize: data.customization?.pageSize || 'letter',
      font: data.customization?.font || 'inter',
      spacing: data.customization?.spacing || 'balanced',
      sectionOrder: Array.isArray(data.customization?.sectionOrder)
        ? data.customization.sectionOrder
        : INITIAL_PORTFOLIO_DATA.customization?.sectionOrder || ['experience', 'education', 'projects', 'skills'],
      hiddenSections: Array.isArray(data.customization?.hiddenSections)
        ? data.customization.hiddenSections
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
      return INITIAL_PORTFOLIO_DATA;
    }
    const parsed = JSON.parse(raw);
    return normalizePortfolioData(parsed);
  } catch (error) {
    console.warn('Error reading from localStorage, returning default resume data:', error);
    return INITIAL_PORTFOLIO_DATA;
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
  return INITIAL_PORTFOLIO_DATA;
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
