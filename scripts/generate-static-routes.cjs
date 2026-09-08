// scripts/generate-static-routes.cjs
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(INDEX_HTML)) {
  console.error('Error: build output index.html not found.');
  process.exit(1);
}
const indexContent = fs.readFileSync(INDEX_HTML, 'utf8');

// Canonical routes to generate (must serve the SPA)
const canonicalRoutes = [
  '/resume-builder',
  '/resume-builder/start',
  '/resume-builder/preview',
  '/resume-builder/export',
];

// Legacy routes that redirect to the canonical ones
const legacyRoutes = [
  '/builder',
  '/builder/start',
  '/builder/preview',
  '/builder/export',
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper to write a copy of index.html for a route
function writeCanonical(route) {
  const routeDir = path.join(DIST_DIR, route);
  ensureDir(routeDir);
  const target = path.join(routeDir, 'index.html');
  // Asset URLs are absolute because Vite base is '/'
  fs.writeFileSync(target, indexContent);
  console.log(`Created ${target}`);
}

// Helper to write a tiny redirect page for legacy routes
function writeLegacy(route) {
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

canonicalRoutes.forEach(writeCanonical);
legacyRoutes.forEach(writeLegacy);

console.log('Static route generation complete.');
