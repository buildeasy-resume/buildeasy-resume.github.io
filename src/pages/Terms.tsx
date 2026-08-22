import React from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useNavigate, Link } from 'react-router-dom';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title="Terms of Service | BuildEasy"
        description="BuildEasy Terms of Service regarding usage of our resume builder and templates."
        canonicalUrl="/terms"
      />

      <Header
        onNavigateHome={() => navigate('/')}
        onStartBuilder={() => navigate('/builder')}
        hasResumeData={false}
      />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Terms of Service</span>
          </nav>

          <h1 className="font-serif text-3xl md:text-4xl text-[#111827] mb-6">Terms of Service</h1>
          <p className="text-xs text-gray-400 mb-8">Last updated: August 2026</p>

          <section className="space-y-6 text-sm text-[#4B5563] leading-relaxed">
            <h2 className="text-lg font-bold text-[#111827]">1. Acceptance of Terms</h2>
            <p>
              By accessing and using BuildEasy, you agree to comply with these Terms of Service. BuildEasy provides free tools for drafting, styling, and exporting resume documents.
            </p>

            <h2 className="text-lg font-bold text-[#111827]">2. User Content Responsibility</h2>
            <p>
              You retain full ownership and responsibility for all content, credentials, and text entered into BuildEasy documents.
            </p>

            <h2 className="text-lg font-bold text-[#111827]">3. Service Availability</h2>
            <p>
              BuildEasy is provided "as is" without warranty. We continuously maintain and improve our builder and export utilities.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
