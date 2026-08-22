import React from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useNavigate, Link } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title="Privacy Policy | BuildEasy"
        description="BuildEasy Privacy Policy: We prioritize your data privacy. Learn how your resume information remains stored locally in your browser."
        canonicalUrl="/privacy"
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
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </nav>

          <h1 className="font-serif text-3xl md:text-4xl text-[#111827] mb-6">Privacy Policy</h1>
          <p className="text-xs text-gray-400 mb-8">Last updated: August 2026</p>

          <section className="space-y-6 text-sm text-[#4B5563] leading-relaxed">
            <h2 className="text-lg font-bold text-[#111827]">1. Local Browser Storage</h2>
            <p>
              BuildEasy operates on a client-first architecture. All resume content you type into the editor remains stored locally in your web browser session (`localStorage`). Your career history, contact information, and documents are not collected or sold.
            </p>

            <h2 className="text-lg font-bold text-[#111827]">2. No Account Lock-in</h2>
            <p>
              You do not need to register an account or log in to generate, customize, or export PDF resumes with BuildEasy.
            </p>

            <h2 className="text-lg font-bold text-[#111827]">3. PDF Generation</h2>
            <p>
              PDF exports are processed natively directly within your browser rendering engine to ensure total privacy and security.
            </p>

            <h2 className="text-lg font-bold text-[#111827]">4. Contact</h2>
            <p>
              If you have any questions regarding our privacy practices, please contact us via our <Link to="/contact" className="text-black underline">contact page</Link>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
