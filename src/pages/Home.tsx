import React from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import ScreenHome from '../components/screens/ScreenHome';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { TemplateId } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const { hasResumeData, handleSelectTemplate } = useResume();

  const handleStartBuilder = (templateId?: string) => {
    if (templateId) {
      handleSelectTemplate(templateId as TemplateId);
      navigate(`/builder/start?template=${templateId}`);
    } else if (hasResumeData) {
      navigate('/builder');
    } else {
      navigate('/builder/start');
    }
  };

  const homeStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'BuildEasy',
      url: 'https://buildeasy-resume.github.io/',
      description: 'Free, privacy-focused online resume builder with professional editorial templates and instant PDF export.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'BuildEasy Resume Builder',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: 'Craft a professional resume in minutes with compact section editing, live real-time preview, and ATS-friendly PDF export.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO 
        title="BuildEasy — Free Resume Builder" 
        description="Craft a resume that reflects your professional caliber. High-end editorial design meets intuitive building, ensuring your career history stands out with clarity and confidence." 
        canonicalUrl="/"
        keywords={['free resume builder', 'online resume builder', 'resume maker', 'professional resume templates', 'ats resume builder', 'download resume pdf']}
        structuredData={homeStructuredData}
      />
      <Header />
      <main className="flex-1">
        <ScreenHome onStartBuilder={handleStartBuilder} hasResumeData={hasResumeData} />
      </main>
    </div>
  );
}
