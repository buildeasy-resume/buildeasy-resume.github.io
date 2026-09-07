import { CustomizationSettings, PortfolioData } from '../types';
import { sanitizeUrl, formatDisplayUrl } from './utils';

export function getSectionStyle(sectionId: string, custom?: CustomizationSettings) {
  if (!custom) return {};
  const hidden = custom.hiddenSections || [];
  if (hidden.includes(sectionId)) {
    return { display: 'none' };
  }
  const orderArray = custom.sectionOrder || [];
  const index = orderArray.indexOf(sectionId);
  return { order: index >= 0 ? index : 99 };
}

export function getRootStyles(custom?: CustomizationSettings, accentColor?: string) {
  const styles: any = {};
  
  if (custom) {
    // Fonts
    if (custom.font === 'inter') styles.fontFamily = 'Inter, sans-serif';
    else if (custom.font === 'arial') styles.fontFamily = 'Arial, sans-serif';
    else if (custom.font === 'helvetica') styles.fontFamily = 'Helvetica, sans-serif';
    else if (custom.font === 'georgia') styles.fontFamily = 'Georgia, serif';
    else if (custom.font === 'times') styles.fontFamily = '"Times New Roman", serif';

    if (custom.spacing === 'compact') {
      styles['--tw-space-y-reverse'] = 0;
      styles.lineHeight = '1.3';
    } else if (custom.spacing === 'comfortable') {
      styles.lineHeight = '1.7';
    } else {
      styles.lineHeight = '1.5';
    }
  }

  // Accent Color
  if (accentColor) {
    styles['--color-accent'] = accentColor;
  }

  return styles;
}

export interface HeaderContactInfo {
  location?: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
  websiteDisplay?: string;
  socialLinks: Array<{
    id: string;
    label: string;
    url: string;
    display: string;
  }>;
}

function getNormalizedUrlKey(url: string): string {
  try {
    let clean = url.trim().toLowerCase();
    clean = clean.replace(/^https?:\/\//, '');
    clean = clean.replace(/^www\./, '');
    clean = clean.replace(/\/$/, '');
    return clean;
  } catch {
    return url.toLowerCase();
  }
}

/**
 * Normalizes and deduplicates all links for resume headers across all templates.
 * Separates physical contact methods (location, phone, email, website) from social/portfolio links.
 * Strictly guarantees that duplicate URLs (e.g. LinkedIn entered in basicInfo AND in additional links)
 * are rendered exactly once.
 */
export function getNormalizedResumeContact(data: PortfolioData): HeaderContactInfo {
  const basic = data.basicInfo || { name: '', tagline: '', email: '' };
  
  const location = basic.location?.trim() || undefined;
  const phone = basic.phone?.trim() || undefined;
  const email = basic.email?.trim() || undefined;
  
  const websiteRaw = basic.website?.trim();
  const websiteUrl = websiteRaw ? sanitizeUrl(websiteRaw) : undefined;
  const websiteDisplay = websiteUrl ? formatDisplayUrl(websiteUrl) : undefined;

  const seenUrls = new Set<string>();
  if (websiteUrl) {
    seenUrls.add(getNormalizedUrlKey(websiteUrl));
  }

  const socialLinks: HeaderContactInfo['socialLinks'] = [];

  const addCandidate = (label: string, rawUrl: string | undefined, id?: string) => {
    if (!rawUrl || !rawUrl.trim()) return;
    const safeUrl = sanitizeUrl(rawUrl.trim());
    if (!safeUrl) return;

    const normalizedKey = getNormalizedUrlKey(safeUrl);
    if (seenUrls.has(normalizedKey)) return;
    seenUrls.add(normalizedKey);

    socialLinks.push({
      id: id || `social-${label.toLowerCase()}-${socialLinks.length}`,
      label: label.trim() || formatDisplayUrl(safeUrl),
      url: safeUrl,
      display: formatDisplayUrl(safeUrl),
    });
  };

  // 1. Basic Info specific links
  if (basic.linkedin) addCandidate('LinkedIn', basic.linkedin, 'bi-linkedin');
  if (basic.github) addCandidate('GitHub', basic.github, 'bi-github');
  if (basic.portfolio) addCandidate('Portfolio', basic.portfolio, 'bi-portfolio');

  // 2. Custom links array (from Links / Additional Links)
  if (Array.isArray(data.links)) {
    data.links.forEach((l, idx) => {
      if (l.url) {
        addCandidate(l.label || 'Link', l.url, l.id || `custom-link-${idx}`);
      }
    });
  }

  return {
    location,
    phone,
    email,
    websiteUrl,
    websiteDisplay,
    socialLinks,
  };
}
