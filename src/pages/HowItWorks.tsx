import React from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title="How to Build a Resume with BuildEasy — Step-by-Step Guide"
        description="Learn how to build a resume with BuildEasy: choose a template, add your content in compact sections, customize design & spacing, and export to PDF."
        canonicalUrl="/how-it-works"
      />

      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#F9FAFB] py-12 md:py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-xs text-gray-500 mb-4 flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">How It Works</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl text-[#111827] mb-4">
              How BuildEasy Works
            </h1>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Create a clean, professional resume in six straightforward steps. No complicated formatting rules or broken document margins.
            </p>
          </div>
        </section>

        {/* Core Steps Section */}
        <HowItWorksSection hideTopBorder={true} />

        {/* Detailed Breakdown */}
        <section className="py-20 px-6 bg-[#F9FAFB] border-t border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-center mb-12">The Step-by-Step Workflow</h2>

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Select a Template</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Browse our gallery of curated template styles (Minimal, Modern, Executive, Academic, Classic, Compact) and select the layout that matches your industry.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Enter Your Experience & Details</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Fill in your personal information, work history, education, projects, skills, and certifications using our clean, compact accordion editor.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Arrange Section Order</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Use simple controls to reorder sections so that your strongest achievements and credentials stand out near the top.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center shrink-0">4</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Customize Fonts, Spacing & Paper Size</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Fine-tune typography, section spacing density (Compact, Balanced, Comfortable), and page paper standard (A4 or US Letter).
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center shrink-0">5</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Instant Live Preview</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Watch every change render instantly in the side-by-side preview panel to ensure perfect document proportions.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center shrink-0">6</span>
                <div>
                  <h3 className="font-bold text-lg mb-1">Download Your PDF Resume</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Export a high-resolution PDF file ready to send to hiring managers or upload to application portals.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Start Building Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
