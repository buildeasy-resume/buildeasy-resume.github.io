import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title="Contact Us | BuildEasy"
        description="Have questions or feedback about BuildEasy? Get in touch with our team."
        canonicalUrl="/contact"
      />

      <Header
        onNavigateHome={() => navigate('/')}
        onStartBuilder={() => navigate('/builder')}
        hasResumeData={false}
      />

      <main className="flex-1">
        <section className="bg-[#F9FAFB] py-20 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-xs text-gray-500 mb-4 flex items-center justify-center gap-2">
              <Link to="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Contact</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl text-[#111827] mb-6">
              Contact BuildEasy
            </h1>
            <p className="text-lg text-[#4B5563] max-w-xl mx-auto leading-relaxed">
              We value your feedback. Let us know if you have questions, template suggestions, or feature requests.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <div className="max-w-xl mx-auto border border-[#E5E7EB] rounded-2xl p-8 bg-white shadow-sm">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl font-bold mb-2">Message Sent</h2>
                <p className="text-sm text-[#4B5563] mb-6">Thank you for reaching out. We appreciate your message.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-[#111111] text-white text-xs font-semibold rounded-md hover:bg-gray-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-black"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-black"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-black"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#111111] text-white font-semibold text-sm rounded-lg hover:bg-[#222222] transition-colors flex items-center justify-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
