import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import ScreenBuilder from '../components/screens/ScreenBuilder';
import { useResume } from '../context/ResumeContext';

export default function BuilderPage() {
  const { data, setData } = useResume();
  const navigate = useNavigate();

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BuildEasy Online Resume Builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    description: 'Free, privacy-friendly online resume builder with live interactive preview, customizable typography and margin settings, and PDF export.',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F9]">
      <SEO
        title="Free Resume Builder — Craft Professional Resumes Online | BuildEasy"
        description="BuildEasy is a free, fast, and elegant resume builder. Edit in compact sections, preview live side-by-side, customize fonts & spacing, and export print-ready PDFs."
        canonicalUrl="/resume-builder"
        structuredData={appSchema}
        keywords={['free resume builder', 'online resume maker', 'best resume builder', 'instant pdf resume', 'ats compliant resume']}
      />
      <ScreenBuilder
        data={data}
        onChange={setData}
        onNextAtEnd={() => navigate('/resume-builder/preview')}
        onBackAtStart={() => navigate('/')}
      />
    </div>
  );
}
