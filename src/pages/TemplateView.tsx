import React from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TemplatePreview from '../components/common/TemplatePreview';
import { INITIAL_PORTFOLIO_DATA, TemplateId } from '../types';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Layout, FileText, Sparkles, ChevronRight } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

interface TemplateDetail {
  id: TemplateId;
  name: string;
  title: string;
  description: string;
  tagline: string;
  whoItIsFor: string[];
  layoutCharacteristics: string[];
  customizationFeatures: string[];
  sampleSections: string[];
}

const TEMPLATE_DETAILS: Record<string, TemplateDetail> = {
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    title: 'Minimal Resume Template | BuildEasy',
    description: 'Create a clean, uncluttered minimal resume with BuildEasy. Focuses on typographic hierarchy, whitespace, and clear experience progression.',
    tagline: 'Clean, typography-focused editorial layout',
    whoItIsFor: [
      'Software Engineers & Tech Leads',
      'Product Managers & Strategy Leads',
      'UI/UX Designers & Researchers',
      'Data Scientists & Engineers'
    ],
    layoutCharacteristics: [
      'Generous negative space and margin ratios',
      'Single-column linear reading order for high clarity',
      'Distinct bold headings paired with body text',
      'Minimalist inline date and location markers'
    ],
    customizationFeatures: [
      'Inter, Arial, or Georgia font families',
      'Compact, Balanced, or Comfortable line spacing',
      'A4 and US Letter document page formats',
      'Dynamic section reordering and custom section additions'
    ],
    sampleSections: [
      'Professional Summary',
      'Work Experience',
      'Key Projects & Technologies',
      'Technical Skills',
      'Education & Honors'
    ]
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    title: 'Executive Resume Template | BuildEasy',
    description: 'Build an authoritative executive resume with BuildEasy. Designed for directors, VP level, and senior leadership roles.',
    tagline: 'Authoritative, refined structural layout for leadership',
    whoItIsFor: [
      'Vice Presidents & C-Suite Executives',
      'Directors & Department Heads',
      'Management Consultants & Advisory Leads',
      'Senior Project / Program Managers'
    ],
    layoutCharacteristics: [
      'Commanding header banner with distinguished typography',
      'Balanced distribution for multi-year career progression',
      'Prominent metrics and organizational impact callouts',
      'Structured section dividers for high scannability'
    ],
    customizationFeatures: [
      'Font choices ranging from clean sans-serifs to executive serifs',
      'Adjustable section spacing and density',
      'Full control over hidden or visible leadership sections',
      'Instant vector PDF output'
    ],
    sampleSections: [
      'Executive Profile',
      'Leadership & Work History',
      'Strategic Initiatives & Accomplishments',
      'Board & Advisory Roles',
      'Education & Credentials'
    ]
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    title: 'Modern Resume Template | BuildEasy',
    description: 'Design a sleek, contemporary modern resume with BuildEasy. Features structured side column framing alongside experience panels.',
    tagline: 'Contemporary two-column layout with sidebar framing',
    whoItIsFor: [
      'Product & Visual Designers',
      'Marketing & Growth Specialists',
      'Full-Stack & Frontend Developers',
      'Creative Directors & Content Strategists'
    ],
    layoutCharacteristics: [
      'Left-hand sidebar for contact details, skills, and links',
      'Right main column dedicated to narrative experience',
      'Visual hierarchy that guides the recruiter\'s eyes',
      'Clean card-like padding and modern borders'
    ],
    customizationFeatures: [
      'Custom accent color selection',
      'Font family and weight adjustments',
      'Reorderable main and sidebar content modules',
      'Vector PDF export'
    ],
    sampleSections: [
      'Contact & Social Links',
      'Core Competencies',
      'Professional Experience',
      'Featured Projects',
      'Education & Skills'
    ]
  },
  academic: {
    id: 'academic',
    name: 'Academic',
    title: 'Academic CV & Resume Template | BuildEasy',
    description: 'Build an academic CV or detailed resume with BuildEasy. Tailored for research grants, publications, and academic achievements.',
    tagline: 'Detailed, publication-friendly layout for scholars and researchers',
    whoItIsFor: [
      'Professors, Instructors & Lecturers',
      'Postdoctoral Researchers & PhD Candidates',
      'Medical Professionals & Scientists',
      'Fellowship & Grant Applicants'
    ],
    layoutCharacteristics: [
      'High-density text presentation without crowding',
      'Formal bibliographic citation formatting for publications',
      'Clear hierarchy for research grants, patents, and honors',
      'Standard academic serif or clean neutral font pairings'
    ],
    customizationFeatures: [
      'Georgia or Times font options',
      'Extended section support for publications & certifications',
      'A4 / US Letter paper format toggle',
      'PDF download'
    ],
    sampleSections: [
      'Academic Profile & Research Interests',
      'Academic Appointments',
      'Education & Dissertation',
      'Peer-Reviewed Publications',
      'Grants, Awards & Honors'
    ]
  },
  classic: {
    id: 'classic',
    name: 'Classic',
    title: 'Classic Resume Template | BuildEasy',
    description: 'Craft a traditional, timeless classic resume with BuildEasy. Perfect for legal, finance, corporate, and traditional industries.',
    tagline: 'Traditional, universally recognized serif layout',
    whoItIsFor: [
      'Lawyers & Legal Professionals',
      'Financial Analysts & Investment Bankers',
      'Accountants & Auditors',
      'Corporate Risk & Compliance Managers'
    ],
    layoutCharacteristics: [
      'Classic centered header typography',
      'Traditional horizontal section rule lines',
      'High contrast black and charcoal color scheme',
      'Time-tested font pairings for standard corporate acceptance'
    ],
    customizationFeatures: [
      'Adjustable line heights and margin spacing',
      'Custom section order',
      'Print-ready vector PDF'
    ],
    sampleSections: [
      'Professional Overview',
      'Work Experience',
      'Education & Degrees',
      'Certifications & Licenses',
      'Technical Skills & Languages'
    ]
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    title: 'Compact Resume Template | BuildEasy',
    description: 'Maximize space with the Compact resume template on BuildEasy. Fits comprehensive roles and skill sets neatly onto one page.',
    tagline: 'High-density one-page resume layout',
    whoItIsFor: [
      'Experienced Software Engineers',
      'Multi-disciplinary Professionals',
      'Career Changers with diverse roles',
      'Consultants with multiple client projects'
    ],
    layoutCharacteristics: [
      'Tightened vertical padding and compact margins',
      'Multi-column skill chips and bullet lists',
      'Efficient inline date and location alignment',
      'Zero wasted page space'
    ],
    customizationFeatures: [
      'Compact spacing mode',
      'Font scaling and line density tuning',
      'Section hiding / reordering',
      'Direct PDF download'
    ],
    sampleSections: [
      'Summary Statement',
      'Work Experience',
      'Projects & Impact',
      'Technical Skills',
      'Education'
    ]
  }
};

export default function TemplateView() {
  const { id, templateId } = useParams<{ id?: string; templateId?: string }>();
  const navigate = useNavigate();
  const { handleSelectTemplate } = useResume();
  const sampleData = INITIAL_PORTFOLIO_DATA;

  const rawId = templateId || id;
  const currentId = (rawId && TEMPLATE_DETAILS[rawId]) ? rawId : 'minimal';
  const detail = TEMPLATE_DETAILS[currentId];

  const handleUseTemplate = () => {
    handleSelectTemplate(detail.id);
    navigate(`/builder/start?template=${detail.id}`);
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title={detail.title}
        description={detail.description}
        canonicalUrl={`/templates/${detail.id}`}
      />

      <Header />

      <main className="flex-1">
        {/* Breadcrumb Header */}
        <section className="bg-[#F9FAFB] py-12 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto">
            <nav className="text-xs text-gray-500 mb-4 flex items-center gap-2">
              <Link to="/" className="hover:text-black">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Link to="/templates" className="hover:text-black">Resume Templates</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900 font-semibold">{detail.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-[#111827] mb-2">
                  {detail.name} Resume Template
                </h1>
                <p className="text-base text-[#4B5563]">
                  {detail.tagline}
                </p>
              </div>

              <button
                onClick={handleUseTemplate}
                className="px-6 py-3 bg-[#111111] text-white text-sm font-semibold rounded-lg hover:bg-[#222222] transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
              >
                Use This Template <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
            
            {/* Left: Template Live Interactive Preview Component */}
            <div className="bg-[#F9FAFB] p-6 md:p-8 rounded-2xl border border-[#E5E7EB] flex items-center justify-center shadow-sm">
              <div className="w-full max-w-[500px] aspect-[1/1.29] bg-white border border-[#E5E7EB] rounded-sm shadow-md overflow-hidden">
                <TemplatePreview
                  data={{ ...sampleData, templateId: detail.id }}
                  fitMode="contain"
                  safeArea={true}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right: Template Details */}
            <div className="flex flex-col gap-8">
              
              {/* Overview */}
              <div>
                <h2 className="font-serif text-2xl text-[#111827] mb-3">Template Overview</h2>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {detail.description}
                </p>
              </div>

              {/* Who it is suitable for */}
              <div className="border-t border-[#E5E7EB] pt-6">
                <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider mb-4">Recommended For</h3>
                <ul className="space-y-2">
                  {detail.whoItIsFor.map((role, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#4B5563]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Layout Characteristics */}
              <div className="border-t border-[#E5E7EB] pt-6">
                <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider mb-4">Key Layout Traits</h3>
                <ul className="space-y-2">
                  {detail.layoutCharacteristics.map((trait, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#4B5563]">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Included Sections */}
              <div className="border-t border-[#E5E7EB] pt-6">
                <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider mb-4">Example Sections</h3>
                <div className="flex flex-wrap gap-2">
                  {detail.sampleSections.map((sec, idx) => (
                    <span key={idx} className="text-xs font-medium px-2.5 py-1 bg-[#F3F4F6] text-[#374151] rounded-md border border-[#E5E7EB]">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-[#111111] text-white p-6 rounded-xl flex flex-col gap-4">
                <div>
                  <h4 className="font-bold text-lg mb-1">Ready to use the {detail.name} template?</h4>
                  <p className="text-xs text-gray-300">Customize text, adjust spacing, and export to PDF instantly.</p>
                </div>
                <button
                  onClick={handleUseTemplate}
                  className="w-full py-3 bg-white text-black font-bold text-sm rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  Use This Template <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* Other Templates Selector */}
        <section className="py-16 px-6 bg-[#F9FAFB] border-t border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl text-[#111827] mb-8">Explore Other Templates</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.values(TEMPLATE_DETAILS)
                .filter(t => t.id !== detail.id)
                .map((t) => (
                  <Link
                    key={t.id}
                    to={`/templates/${t.id}`}
                    className="p-4 bg-white border border-[#E5E7EB] rounded-xl text-center hover:border-black transition-colors"
                  >
                    <div className="font-semibold text-sm text-[#111827] mb-1">{t.name}</div>
                    <div className="text-[10px] text-gray-500">View Template</div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
