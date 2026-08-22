import React from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MeetBuildEasySection from '../components/sections/MeetBuildEasySection';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Sparkles, Sliders, Layout, ShieldCheck } from 'lucide-react';

export default function ResumeBuilder() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title="Free Resume Builder — Craft Professional Resumes Online | BuildEasy"
        description="BuildEasy is a free, fast, and elegant resume builder. Edit in compact sections, preview live side-by-side, customize fonts & spacing, and export high-res vector PDFs."
        canonicalUrl="/resume-builder"
      />

      <Header />

      <main className="flex-1">
        {/* Main Product Hero */}
        <section className="bg-gradient-to-b from-[#F9FAFB] to-white py-24 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] text-white text-xs font-semibold rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Free & No Signup Required
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#111827] mb-6 leading-tight">
              The Free Resume Builder <br className="hidden sm:inline" /> Built for Modern Careers
            </h1>
            <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed mb-8">
              Craft a clean, professional resume in minutes. Edit in compact sections, see updates rendered live, and export a high-res PDF.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/builder"
                className="w-full sm:w-auto px-8 py-4 bg-[#111111] text-white font-semibold rounded-lg hover:bg-[#222222] transition-colors flex items-center justify-center gap-2 text-base shadow-sm"
              >
                Create Your Resume <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/templates"
                className="w-full sm:w-auto px-6 py-4 bg-white border border-[#E5E7EB] text-[#111827] font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-base"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <MeetBuildEasySection />

        {/* Core Capabilities */}
        <section className="py-20 px-6 bg-white border-t border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] text-center mb-16">
              Why Professionals Choose BuildEasy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                <FileText className="w-8 h-8 text-[#111827] mb-4" />
                <h3 className="font-bold text-lg mb-2">Compact Section Editing</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Focus on one section at a time without overwhelming clutter. Expand work experience, education, or skills whenever needed.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                <Sliders className="w-8 h-8 text-[#111827] mb-4" />
                <h3 className="font-bold text-lg mb-2">Drag & Drop Section Ordering</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Arrange your content dynamically. Position projects or summary blocks where they make the most impact.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                <Layout className="w-8 h-8 text-[#111827] mb-4" />
                <h3 className="font-bold text-lg mb-2">6 Professional Templates</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Switch between Minimal, Modern, Executive, Academic, Classic, and Compact template styles in one click.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                <CheckCircle2 className="w-8 h-8 text-[#111827] mb-4" />
                <h3 className="font-bold text-lg mb-2">Paper Standard Control</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Full native support for both international A4 and US Letter document paper standards.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                <ShieldCheck className="w-8 h-8 text-[#111827] mb-4" />
                <h3 className="font-bold text-lg mb-2">Local Autosave & Privacy</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Your resume data stays saved safely in your browser session. No tracking, no forced lock-ins.
                </p>
              </div>

              <div className="p-6 border border-[#E5E7EB] rounded-xl bg-[#F9FAFB]">
                <ArrowRight className="w-8 h-8 text-[#111827] mb-4" />
                <h3 className="font-bold text-lg mb-2">High-Res Vector PDF</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Export crisp, perfectly aligned vector PDFs with working hyperlinks and exact print margins.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#222222] transition-colors"
              >
                Launch Resume Builder <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
