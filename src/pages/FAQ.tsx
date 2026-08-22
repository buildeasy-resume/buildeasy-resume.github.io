import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Is BuildEasy free to use?',
    answer: 'Yes! BuildEasy is completely free to use. You can select any template, add your content, customize design options, and download your high-resolution vector PDF without hidden fees or account paywalls.'
  },
  {
    question: 'Can I export my resume as a PDF?',
    answer: 'Yes. BuildEasy exports print-ready vector PDF files. Hyperlinks, text selections, and precise layout margins are preserved during export.'
  },
  {
    question: 'Does BuildEasy support both A4 and US Letter paper sizes?',
    answer: 'Yes! You can switch between standard international A4 and North American US Letter paper dimensions in one click under the design settings.'
  },
  {
    question: 'Can I reorder or hide sections on my resume?',
    answer: 'Absolutely. The compact builder allows you to drag or toggle section visibility. You can reorder work experience, education, projects, skills, certifications, and custom sections to match your preferences.'
  },
  {
    question: 'Can I change templates after entering my data?',
    answer: 'Yes. Your data remains saved in your browser session, allowing you to instantly preview how your information looks across all 6 templates (Minimal, Modern, Executive, Academic, Classic, Compact) at any time.'
  },
  {
    question: 'Is my data saved automatically?',
    answer: 'Yes. BuildEasy automatically persists your draft changes locally in your browser storage. Your information stays private on your device.'
  },
  {
    question: 'Do I need to create an account or sign in?',
    answer: 'No registration or account sign-in is required to build and export your resume with BuildEasy.'
  },
  {
    question: 'Can I create custom sections?',
    answer: 'Yes! You can add custom sections for certifications, publications, volunteer experience, awards, or custom categories.'
  }
];

export default function FAQ() {
  const navigate = useNavigate();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title="Frequently Asked Questions (FAQ) | BuildEasy"
        description="Find answers to common questions about BuildEasy: free usage, PDF exports, A4 and US Letter support, section reordering, and privacy."
        canonicalUrl="/faq"
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
              <span className="text-gray-900 font-medium">FAQ</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl text-[#111827] mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Have questions about using BuildEasy? Here are the answers to the most common questions.
            </p>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#E5E7EB] rounded-xl overflow-hidden bg-white transition-colors"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left p-6 font-semibold text-base md:text-lg text-[#111827] flex justify-between items-center gap-4 hover:bg-[#F9FAFB] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-black' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-[#4B5563] leading-relaxed border-t border-[#F3F4F6] pt-4 bg-[#F9FAFB]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom CTA */}
            <div className="mt-12 p-8 bg-[#111111] text-white rounded-2xl text-center flex flex-col items-center">
              <h3 className="font-serif text-2xl mb-2">Ready to create your resume?</h3>
              <p className="text-xs text-gray-300 max-w-md mb-6">Start building now with live preview and free vector PDF export.</p>
              <Link
                to="/builder"
                className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
              >
                Launch Builder <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
