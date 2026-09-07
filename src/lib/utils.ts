export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function containsTerm(text: string, term: string): boolean {
  const normalizedTerm = term.trim();
  if (!normalizedTerm) return false;

  const escaped = escapeRegExp(normalizedTerm);
  const regex = new RegExp(
    `(?<![A-Za-z0-9_])${escaped}(?![A-Za-z0-9_])`,
    'i'
  );

  return regex.test(text);
}

/**
 * Standardized text sanitizer for general inputs.
 */
export function sanitizeText(text: string | undefined): string {
  if (typeof text !== 'string') return '';
  return text.trim();
}

/**
 * Standardized URL sanitizer allowing http, https, mailto, and tel schemes.
 * Rejects javascript:, data:, vbscript:, and file: schemes.
 */
export function sanitizeUrl(url: string | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();

  // Reject malicious schemes
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('file:')
  ) {
    return '';
  }

  // Support mailto and tel schemes
  if (lower.startsWith('mailto:') || lower.startsWith('tel:')) {
    return trimmed;
  }

  // Standard HTTP/HTTPS
  if (lower.startsWith('http://') || lower.startsWith('https://')) {
    return trimmed;
  }

  // Protocol relative
  if (lower.startsWith('//')) {
    return `https:${trimmed}`;
  }

  // Domain like (e.g. github.com/user or linkedin.com/in/user)
  if (/^[a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+(\/.*)?$/.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return '';
}

/**
 * Strips protocol and trailing slash for concise on-resume link text.
 */
export function formatDisplayUrl(url: string | undefined): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.toLowerCase().startsWith('mailto:')) {
    return trimmed.replace(/^mailto:/i, '');
  }
  if (trimmed.toLowerCase().startsWith('tel:')) {
    return trimmed.replace(/^tel:/i, '');
  }
  const safe = sanitizeUrl(trimmed);
  if (!safe) return trimmed;
  return safe.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
}

/**
 * Validates a color hex code (#RGB or #RRGGBB) to prevent style injection.
 */
export function validateHexColor(color: string | undefined, defaultColor = '#111827'): string {
  if (!color) return defaultColor;
  const trimmed = color.trim();
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(trimmed)) {
    return trimmed;
  }
  return defaultColor;
}

export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // 1. File size limit: 5MB
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { isValid: false, error: 'File size exceeds the 5MB limit.' };
  }

  // 2. Allowed MIME types: JPEG, PNG, WebP
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
    return { isValid: false, error: 'Only JPEG, PNG, and WebP images are allowed. SVG, HTML, and other files are rejected.' };
  }

  // 3. Allowed extensions
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!ext || !allowedExtensions.includes(ext)) {
    return { isValid: false, error: 'Invalid file extension. Please select a valid image file.' };
  }

  return { isValid: true };
}
