import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import ScreenExportConfirmation from '../components/screens/ScreenExportConfirmation';
import { useResume } from '../context/ResumeContext';

export default function BuilderExportPage() {
  const { data, handleStartOverRequest } = useResume();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <SEO
        title="Your Resume is Ready | BuildEasy"
        description="Download your vector PDF resume and save JSON backups."
        canonicalUrl="/builder/export"
      />
      <ScreenExportConfirmation
        data={data}
        onEditAgain={() => navigate('/builder')}
        onStartOver={() => {
          handleStartOverRequest();
          navigate('/builder/start');
        }}
      />
    </div>
  );
}
