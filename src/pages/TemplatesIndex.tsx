import React from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TemplatePreview from '../components/common/TemplatePreview';
import { INITIAL_PORTFOLIO_DATA, TemplateId } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

interface TemplateInfo {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  suitableFor: string;
}

const TEMPLATES: TemplateInfo[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Clean, typography-focused layout',
    description: 'Stripped of non-essential elements to emphasize your skills, accomplishments, and career progression with pure typographic hierarchy.',
    suitableFor: 'Software Engineers, Product Managers, Designers, Data Scientists'
  },
  {
    id: 'executive',
    name: 'Executive',
    tagline: 'Authoritative, refined structural design',
    description: 'Designed for senior leaders and directors. Features distinguished header accents and balanced column distribution for comprehensive experience histories.',
    suitableFor: 'VP / Directors, C-Suite Executives, Senior Managers, Consultants'
  },
  {
    id: 'modern',
    name: 'Modern',
    tagline: 'Contemporary layout with sidebar framing',
    description: 'Combines a structured sidebar with clean right-column narrative sections. Perfect for organizing skills, contact details, and certifications alongside experience.',
    suitableFor: 'Product Designers, Tech Leads, Marketers, Growth Specialists'
  },
  {
    id: 'academic',
    name: 'Academic',
    tagline: 'Detailed, publication-friendly layout',
    description: 'Optimized for high-density information including research grants, publications, academic appointments, and teaching histories.',
    suitableFor: 'Researchers, Professors, Postdocs, Medical Professionals, PhDs'
  },
  {
    id: 'classic',
    name: 'Classic',
    tagline: 'Traditional, universally recognized layout',
    description: 'Time-tested serif design that conveys prestige and reliability. Ideal for conservative corporate environments.',
    suitableFor: 'Lawyers, Financial Analysts, Accountants, Corporate Executives'
  },
  {
    id: 'compact',
    name: 'Compact',
    tagline: 'High-density one-page resume layout',
    description: 'Maximizes page real estate without sacrificing readability. Fits extensive roles and projects cleanly onto a single document page.',
    suitableFor: 'Experienced Engineers, Multi-Disciplinary Specialists, Career Changers'
  }
];

export default function TemplatesIndex() {
  const navigate = useNavigate();
  const { handleSelectTemplate } = useResume();
  const sampleData = INITIAL_PORTFOLIO_DATA;

  const handleUseTemplate = (id: string) => {
    handleSelectTemplate(id as TemplateId);
    navigate(`/builder/start?template=${id}`);
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title="Professional Resume Templates | BuildEasy"
        description="Choose from 6 professionally designed resume templates: Minimal, Executive, Modern, Academic, Classic, and Compact. Free to customize and export to PDF."
        canonicalUrl="/resume-templates"
      />

      <Header
        onNavigateHome={() => navigate('/')}
        onStartBuilder={() => navigate('/builder')}
        hasResumeData={false}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#F9FAFB] py-20 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-xs text-gray-500 mb-4 flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Resume Templates</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl text-[#111827] mb-6">
              Professional Resume Templates
            </h1>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Every template is built with editorial typography and balanced spacing. Choose a style below to view details or start building immediately.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="group border border-[#E5E7EB] rounded-2xl bg-white overflow-hidden hover:border-[#111111] hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Template Preview Box */}
                <div className="bg-[#F9FAFB] p-6 border-b border-[#E5E7EB] flex items-center justify-center aspect-[1/1.25] relative overflow-hidden">
                  <div className="w-full h-full shadow-sm border border-[#E5E7EB] rounded-sm bg-white overflow-hidden pointer-events-none group-hover:scale-[1.02] transition-transform duration-300">
                    <TemplatePreview
                      data={{ ...sampleData, templateId: tmpl.id }}
                      fitMode="contain"
                      safeArea={true}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-serif text-2xl text-[#111827] group-hover:text-black font-semibold">
                      {tmpl.name}
                    </h2>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                      PDF Ready
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-gray-500 mb-3">
                    {tmpl.tagline}
                  </p>

                  <p className="text-sm text-[#4B5563] leading-relaxed mb-6 flex-1">
                    {tmpl.description}
                  </p>

                  <div className="pt-4 border-t border-[#F3F4F6] flex flex-col gap-3">
                    <div className="text-[11px] text-gray-500">
                      <span className="font-semibold text-gray-700">Best for: </span>
                      {tmpl.suitableFor}
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Link
                        to={`/templates/${tmpl.id}`}
                        className="flex-1 py-2 px-3 border border-[#E5E7EB] rounded-md text-xs font-semibold text-[#111827] text-center hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleUseTemplate(tmpl.id)}
                        className="flex-1 py-2 px-3 bg-[#111111] text-white rounded-md text-xs font-semibold text-center hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
                      >
                        Use Template <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
