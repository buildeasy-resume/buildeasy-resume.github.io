# BuildEasy — Free Resume & Portfolio Builder

BuildEasy is a fast, modern resume and portfolio builder designed to help job seekers generate high-impact, ATS-optimized resumes.

## Quick Start

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

App will run on `http://localhost:3000`.

### Typecheck & Linting

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

The compiled static assets will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
# App URL endpoint
APP_URL="http://localhost:3000"
```

> **Security Note:** Never commit actual API keys or private credentials to source control or public files.

## Production Deployment

BuildEasy compiles into optimized static files (`dist/`) served via Vite, Nginx, or any standard static web host. The app uses client-side state persistence (`localStorage`) with automatic schema fallback.
