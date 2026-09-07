import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { RESUME_EXAMPLES } from '../data/examples';
import { ArrowRight, BookOpen, CheckCircle2, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export default function ResumeExamplesIndex() {
  const navigate = useNavigate();
  const { hasResumeData } = useResume();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Resume Examples', url: '/resume-examples' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title="Professional Resume Examples by Role & Industry (2026) | BuildEasy"
        description="Explore field-tested resume examples for Software Engineers, Frontend Developers, College Students, and Freshers. Complete with recommended layouts, skills, and bullet point formulas."
        canonicalUrl="/resume-examples"
        breadcrumbs={breadcrumbs}
        keywords={['resume examples', 'software engineer resume example', 'student resume example', 'fresher resume example', 'frontend developer resume example', 'professional resume samples']}
      />

      <Header
        onNavigateHome={() => navigate('/')}
        onStartBuilder={() => navigate('/builder')}
        hasResumeData={hasResumeData}
      />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="bg-[#F9FAFB] py-14 md:py-18 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-xs text-gray-500 mb-4 flex items-center justify-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900 font-semibold">Resume Examples</span>
            </nav>

            <span className="text-xs font-bold tracking-widest uppercase text-gray-700 bg-gray-200/80 px-3 py-1 rounded-full mb-4 inline-block">
              Role Guides & Real Examples
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111827] mb-4 leading-tight">
              Professional Resume Examples
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Explore high-impact resume examples tailored to your career stage. Each guide includes recommended section structures, proven bullet point formulas, key skills, and sample resumes you can build in BuildEasy.
            </p>
          </div>
        </section>

        {/* Examples Grid */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {RESUME_EXAMPLES.map((example) => (
                <div
                  key={example.slug}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 hover:border-gray-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                        {example.experienceLevel}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        Recommended: {example.recommendedTemplateName}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl text-[#111827] mb-3 leading-snug">
                      <Link to={`/resume-examples/${example.slug}`} className="hover:underline">
                        {example.role} Resume Example
                      </Link>
                    </h2>

                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {example.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                        Key Skills Included:
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {example.keySkills.hard.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-gray-50 border border-gray-200 text-gray-700 px-2 py-0.5 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/resume-examples/${example.slug}`}
                      className="text-xs font-bold text-[#111827] hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                    >
                      View Full Example & Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to action section */}
        <section className="bg-[#F9FAFB] py-16 px-6 border-t border-[#E5E7EB]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111827] mb-4">
              Ready to create your resume?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-xl mx-auto">
              Build your resume using our free editorial templates. Customize fonts, spacing, and page formats with real-time live preview.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/builder"
                className="w-full sm:w-auto px-6 py-3 bg-[#111111] text-white text-sm font-semibold rounded-lg hover:bg-[#222222] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Start Free Resume Builder <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/templates"
                className="w-full sm:w-auto px-6 py-3 bg-white border border-[#E5E7EB] text-[#111827] text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Browse All Templates
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
