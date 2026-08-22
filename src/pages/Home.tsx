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

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO 
        title="BuildEasy — Free Resume Builder" 
        description="Craft a resume that reflects your professional caliber. High-end editorial design meets intuitive building, ensuring your career history stands out with clarity and confidence." 
        canonicalUrl="/"
      />
      <Header />
      <main className="flex-1">
        <ScreenHome onStartBuilder={handleStartBuilder} hasResumeData={hasResumeData} />
      </main>
    </div>
  );
}
