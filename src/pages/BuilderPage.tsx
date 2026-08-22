import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import ScreenBuilder from '../components/screens/ScreenBuilder';
import { useResume } from '../context/ResumeContext';

export default function BuilderPage() {
  const { data, setData } = useResume();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F9]">
      <SEO
        title="Resume Builder | BuildEasy"
        description="Edit your resume content, choose design preferences, and preview live in real-time."
        canonicalUrl="/builder"
      />
      <ScreenBuilder
        data={data}
        onChange={setData}
        onNextAtEnd={() => navigate('/builder/preview')}
        onBackAtStart={() => navigate('/')}
      />
    </div>
  );
}
