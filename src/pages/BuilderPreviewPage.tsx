import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import ScreenPreview from '../components/screens/ScreenPreview';
import { useResume } from '../context/ResumeContext';

export default function BuilderPreviewPage() {
  const { data, handleSelectTemplate } = useResume();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#E5E7EB]">
      <SEO
        title="Resume Preview | BuildEasy"
        description="Preview your finished resume layout and prepare for PDF export."
        canonicalUrl="/builder/preview"
      />
      <ScreenPreview
        data={data}
        onBackToEdit={() => navigate('/builder')}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
}
