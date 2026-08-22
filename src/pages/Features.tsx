import React from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import FeaturesSection from '../components/sections/FeaturesSection';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Layers, Eye, Download, MoveVertical, LayoutGrid, CheckCircle2 } from 'lucide-react';

export default function Features() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title="BuildEasy Features — Compact Builder, Live Preview & Export"
        description="Explore BuildEasy features: compact section-based editing, drag-and-drop section reordering, real-time preview, A4 & Letter page format support, and vector PDF exports."
        canonicalUrl="/features"
      />

      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-[#F9FAFB] py-12 md:py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-xs text-gray-500 mb-4 flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Features</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl text-[#111827] mb-4">
              BuildEasy Features
            </h1>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Discover how BuildEasy combines compact section management, live side-by-side previews, and precision PDF export to craft high-impact resumes.
            </p>
          </div>
        </section>

        {/* Feature Section Showcase Component */}
        <FeaturesSection hideTopBorder={true} />

        {/* Deep Dive Grid */}
        <section className="py-20 px-6 bg-white border-t border-[#E5E7EB]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-center mb-16">
              Built for precision and speed
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-[#F9FAFB]">
                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-2">Compact Builder</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Expand only the section you're editing to keep your workspace clean and focused.
                </p>
              </div>

              <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-[#F9FAFB]">
                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <MoveVertical className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-2">Section Reordering</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Reorder sections with simple controls so your most impressive credentials appear first.
                </p>
              </div>

              <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-[#F9FAFB]">
                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-2">Instant Live Preview</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  See changes update side-by-side in real-time as you type, removing guesswork.
                </p>
              </div>

              <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-[#F9FAFB]">
                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-2">6 Editorial Templates</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Choose from Minimal, Executive, Modern, Academic, Classic, or Compact layouts.
                </p>
              </div>

              <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-[#F9FAFB]">
                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-2">A4 & US Letter Support</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Switch between international A4 and North American US Letter paper standards easily.
                </p>
              </div>

              <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-[#F9FAFB]">
                <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg mb-2">PDF Export</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Download high-resolution, print-ready vector PDF files with preserved formatting.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 bg-[#111111] text-white rounded-2xl p-10 text-center flex flex-col items-center">
              <h3 className="font-serif text-3xl mb-4">Try all features in the builder</h3>
              <p className="text-gray-300 max-w-xl mb-8 text-sm">
                Build your resume for free with instant live rendering and vector PDF export.
              </p>
              <Link
                to="/builder"
                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Create Your Resume <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
