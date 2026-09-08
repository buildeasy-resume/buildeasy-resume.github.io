// scripts/verify-build.cjs
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

// Root files to verify
const rootFiles = [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
];

// Canonical and legacy route files
const routeFiles = [
  // Canonical SPA routes
  'resume-builder/index.html',
  'resume-builder/start/index.html',
  'resume-builder/preview/index.html',
  'resume-builder/export/index.html',
  // Legacy redirects
  'builder/index.html',
  'builder/start/index.html',
  'builder/preview/index.html',
  'builder/export/index.html',
];

let missing = [];
for (const relPath of rootFiles) {
  const fullPath = path.join(DIST_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    missing.push(relPath);
  }
}
for (const relPath of routeFiles) {
  const fullPath = path.join(DIST_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    missing.push(relPath);
  }
}

if (missing.length > 0) {
  console.error('Verification failed: missing files:', missing.join(', '));
  process.exit(1);
} else {
  console.log('Verification passed: all required static files are present.');
  process.exit(0);
}
