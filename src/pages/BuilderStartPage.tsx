import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import ResumeWizard from '../components/wizard/ResumeWizard';
import { useResume } from '../context/ResumeContext';
import { TemplateId } from '../types';

const VALID_TEMPLATES: TemplateId[] = ['minimal', 'executive', 'modern', 'academic', 'classic', 'compact'];

export default function BuilderStartPage() {
  const { data, setData } = useResume();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get('template') as TemplateId | null;

  useEffect(() => {
    if (templateParam && VALID_TEMPLATES.includes(templateParam)) {
      if (data.templateId !== templateParam) {
        setData((prev) => ({ ...prev, templateId: templateParam }));
      }
    }
  }, [templateParam, setData, data.templateId]);

  const initialTemplateId = (templateParam && VALID_TEMPLATES.includes(templateParam))
    ? templateParam
    : data.templateId || 'minimal';

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F9]">
      <SEO
        title="Create New Resume | BuildEasy"
        description="Step-by-step wizard to build your professional resume in minutes."
        canonicalUrl="/builder/start"
      />
      <ResumeWizard
        initialTemplateId={initialTemplateId}
        onComplete={(finalData) => {
          setData(finalData);
          navigate('/builder');
        }}
        onExit={() => navigate('/')}
      />
    </div>
  );
}
