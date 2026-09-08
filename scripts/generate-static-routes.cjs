// scripts/generate-static-routes.cjs
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(INDEX_HTML)) {
  console.error('Error: build output index.html not found.');
  process.exit(1);
}

let baseContent = fs.readFileSync(INDEX_HTML, 'utf8');

// Template metadata for SEO injection
const TEMPLATE_METADATA = {
  minimal: {
    title: 'Minimal Resume Template | BuildEasy',
    description: 'Create a clean, uncluttered minimal resume with BuildEasy. Focuses on typographic hierarchy, whitespace, and clear experience progression.',
  },
  executive: {
    title: 'Executive Resume Template | BuildEasy',
    description: 'Build an authoritative executive resume with BuildEasy. Designed for directors, VP level, and senior leadership roles.',
  },
  modern: {
    title: 'Modern Resume Template | BuildEasy',
    description: 'Design a sleek, contemporary modern resume with BuildEasy. Features structured side column framing alongside experience panels.',
  },
  academic: {
    title: 'Academic CV & Resume Template | BuildEasy',
    description: 'Build an academic CV or detailed resume with BuildEasy. Tailored for research grants, publications, and academic achievements.',
  },
  classic: {
    title: 'Classic Resume Template | BuildEasy',
    description: 'Craft a traditional, timeless classic resume with BuildEasy. Perfect for legal, finance, corporate, and traditional industries.',
  },
  compact: {
    title: 'Compact Resume Template | BuildEasy',
    description: 'Maximize space with the Compact resume template on BuildEasy. Fits comprehensive roles and skill sets neatly onto one page.',
  },
};

const TEMPLATES_INDEX_METADATA = {
  title: 'Professional Resume Templates | BuildEasy',
  description: 'Choose from 6 professionally designed resume templates: Minimal, Executive, Modern, Academic, Classic, and Compact. Free to customize and export to PDF.',
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Injects SEO metadata into HTML for a specific route
 * Updates title, canonical URL, and description meta tag
 */
function injectSEOMetadata(htmlContent, route, title, description) {
  let modified = htmlContent;

  // Inject unique title
  modified = modified.replace(/<title>([^<]*)<\/title>/i, `<title>${title}</title>`);

  // Inject canonical URL
  const canonicalUrl = `https://buildeasy-resume.github.io${route}`;
  // Remove existing canonical if present, then add new one
  modified = modified.replace(/<link[^>]*rel="canonical"[^>]*>/gi, '');
  // Add canonical in <head> if not already there
  if (!modified.includes('rel="canonical"')) {
    modified = modified.replace(
      /<\/head>/i,
      `<link rel="canonical" href="${canonicalUrl}" />\n</head>`
    );
  }

  // Update or inject meta description
  if (modified.includes('name="description"')) {
    modified = modified.replace(
      /<meta\s+name="description"\s+content="[^"]*"/i,
      `<meta name="description" content="${description.replace(/"/g, '&quot;')}"`
    );
  } else {
    modified = modified.replace(
      /<\/head>/i,
      `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />\n</head>`
    );
  }

  // Update OG tags
  modified = modified.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"/i,
    `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}"`
  );

  modified = modified.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"/i,
    `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}"`
  );

  modified = modified.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"/i,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // Update Twitter tags
  modified = modified.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"/i,
    `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}"`
  );

  modified = modified.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"/i,
    `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}"`
  );

  return modified;
}

/**
 * Write a route-specific HTML file with injected SEO metadata
 */
function writeCanonicalRoute(route, title, description) {
  const routeDir = path.join(DIST_DIR, route);
  ensureDir(routeDir);
  const target = path.join(routeDir, 'index.html');

  const seoInjectedContent = injectSEOMetadata(baseContent, route, title, description);
  fs.writeFileSync(target, seoInjectedContent);
  console.log(`Created ${target} with SEO metadata`);
}

/**
 * Write a tiny redirect page for legacy routes
 */
function writeLegacyRedirect(route, newRoute) {
  const routeDir = path.join(DIST_DIR, route);
  ensureDir(routeDir);
  const target = path.join(routeDir, 'index.html');
  const redirectScript = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Redirecting…</title>
  <script>
    // Preserve query string and hash, then redirect to the new canonical path
    const newPath = location.pathname.replace(/^\/builder/, '/resume-builder') + location.search + location.hash;
    location.replace(newPath);
  </script>
</head>
<body></body>
</html>`;
  fs.writeFileSync(target, redirectScript);
  console.log(`Created legacy redirect ${target}`);
}

// Generate canonical routes with SEO metadata
console.log('Generating canonical routes with SEO metadata...');

// Templates index
writeCanonicalRoute('/templates', TEMPLATES_INDEX_METADATA.title, TEMPLATES_INDEX_METADATA.description);

// Individual template routes
Object.entries(TEMPLATE_METADATA).forEach(([templateId, metadata]) => {
  writeCanonicalRoute(`/templates/${templateId}`, metadata.title, metadata.description);
});

// Resume builder routes (these still use the same metadata but ensure they exist as files)
const builderRoutes = [
  '/resume-builder',
  '/resume-builder/start',
  '/resume-builder/preview',
  '/resume-builder/export',
];

builderRoutes.forEach(route => {
  const routeDir = path.join(DIST_DIR, route);
  ensureDir(routeDir);
  const target = path.join(routeDir, 'index.html');
  fs.writeFileSync(target, baseContent);
  console.log(`Created ${target}`);
});

// Generate legacy redirects
console.log('Generating legacy redirects...');
const legacyRoutes = [
  '/builder',
  '/builder/start',
  '/builder/preview',
  '/builder/export',
];

legacyRoutes.forEach(route => writeLegacyRedirect(route, route.replace(/^\/builder/, '/resume-builder')));

console.log('Static route generation complete.');
console.log(`Generated 1 templates index + ${Object.keys(TEMPLATE_METADATA).length} template routes + ${builderRoutes.length} builder routes + ${legacyRoutes.length} legacy redirects.`);
