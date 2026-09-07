import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ResumeProvider } from './context/ResumeContext';
import Home from './pages/Home';
import BuilderPage from './pages/BuilderPage';
import BuilderStartPage from './pages/BuilderStartPage';
import BuilderPreviewPage from './pages/BuilderPreviewPage';
import BuilderExportPage from './pages/BuilderExportPage';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import ResumeBuilder from './pages/ResumeBuilder';
import TemplatesIndex from './pages/TemplatesIndex';
import TemplateView from './pages/TemplateView';
import FAQ from './pages/FAQ';
import ResumeTipsIndex from './pages/ResumeTipsIndex';
import ArticleView from './pages/ArticleView';
import ResumeExamplesIndex from './pages/ResumeExamplesIndex';
import ResumeExampleView from './pages/ResumeExampleView';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function GitHubPagesRedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirectUrl = sessionStorage.redirect;
  // Convert legacy /builder routes to the new /resume-builder path for GitHub Pages SPA fallback
  const normalizedPath = redirectUrl ? redirectUrl.replace(/^https?:\/\/[^/]+\//, '').replace(/^builder/, 'resume-builder') : null;
    if (redirectUrl) {
      delete sessionStorage.redirect;
      try {
        const urlObj = new URL(normalizedPath || redirectUrl);
        const pathAndQuery = urlObj.pathname + urlObj.search + urlObj.hash;
        if (pathAndQuery && pathAndQuery !== '/' && !pathAndQuery.endsWith('404.html')) {
          navigate(pathAndQuery, { replace: true });
        }
      } catch {
        // Ignore parsing errors
      }
    }
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <ResumeProvider>
        <BrowserRouter>
          <GitHubPagesRedirectHandler />
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Canonical Builder Routes */}
            <Route path="/resume-builder" element={<BuilderPage />} />
            <Route path="/resume-builder/start" element={<BuilderStartPage />} />
            <Route path="/resume-builder/preview" element={<BuilderPreviewPage />} />
            <Route path="/resume-builder/export" element={<BuilderExportPage />} />

            {/* Backward-compatible /builder routes */}
            <Route path="/builder" element={<Navigate to="/resume-builder" replace />} />
            <Route path="/builder/start" element={<Navigate to="/resume-builder/start" replace />} />
            <Route path="/builder/preview" element={<Navigate to="/resume-builder/preview" replace />} />
            <Route path="/builder/export" element={<Navigate to="/resume-builder/export" replace />} />
            
            {/* SEO Landing & Template Routes */}
            <Route path="/templates" element={<TemplatesIndex />} />
            <Route path="/templates/:templateId" element={<TemplateView />} />
            <Route path="/resume-templates" element={<Navigate to="/templates" replace />} />
            <Route path="/resume-templates/:id" element={<TemplateView />} />
            
            {/* Informational SEO Content Pages */}
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/resume-tips" element={<ResumeTipsIndex />} />
            <Route path="/resume-tips/:slug" element={<ArticleView />} />
            <Route path="/resume-examples" element={<ResumeExamplesIndex />} />
            <Route path="/resume-examples/:slug" element={<ResumeExampleView />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Catch-all redirect to homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </HelmetProvider>
  );
}
