import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock, Calendar, Search, X, Tag, FileText, Sparkles, BookOpen } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { ARTICLES, ARTICLE_CATEGORIES, searchArticles } from '../data/articles';

// Visual Card Top Header Component for professional article placeholders
function ArticleCardBanner({ category, pattern }: { category: string; pattern?: string }) {
  const isDark = pattern === 'technical' || pattern === 'corporate';
  
  return (
    <div className={`w-full h-32 rounded-t-xl overflow-hidden relative border-b border-[#E5E7EB] flex items-center justify-between p-5 ${
      isDark ? 'bg-[#111827] text-white' : 'bg-[#F8FAFC] text-[#111827]'
    }`}>
      <div className="z-10 space-y-1 max-w-[80%]">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
          isDark ? 'bg-white/10 text-gray-300 border border-white/10' : 'bg-gray-200/70 text-gray-700'
        }`}>
          {category}
        </span>
        <div className="flex items-center gap-1.5 text-xs font-serif font-semibold pt-1 opacity-90 truncate">
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span>BuildEasy Editorial Guide</span>
        </div>
      </div>

      {/* Subtle Geometric Background Pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none flex items-center justify-end pr-4">
        <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-current fill-none" strokeWidth="1.5">
          <circle cx="50" cy="50" r="40" />
          <path d="M10 50 H90 M50 10 V90" />
          <rect x="25" y="25" width="50" height="50" rx="4" />
        </svg>
      </div>
    </div>
  );
}

export default function ResumeTipsIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const canonicalUrl = 'https://buildeasy.app/resume-tips';

  const filteredArticles = useMemo(() => {
    return searchArticles(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://buildeasy.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resume Tips',
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#111827]">
      <Helmet>
        <title>Resume Writing Tips & Advice | BuildEasy</title>
        <meta
          name="description"
          content="Comprehensive guides on writing, formatting, ATS optimization, bullet point formulas, and resume strategies to land more job interviews in 2026."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Resume Writing Tips & Advice | BuildEasy" />
        <meta
          property="og:description"
          content="Comprehensive guides on writing, formatting, ATS optimization, bullet point formulas, and resume strategies to land more job interviews in 2026."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#F9FAFB] py-12 md:py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <nav className="text-xs text-gray-500 mb-2 flex items-center justify-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Resume Tips</span>
            </nav>

            <h1 className="font-serif text-4xl md:text-5xl text-[#111827] tracking-tight">
              Resume Writing Tips & Career Advice
            </h1>
            <p className="text-base md:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              20 actionable, recruiter-vetted guides to help you build an ATS-friendly resume, write compelling achievements, and win more interviews.
            </p>

            {/* Search Input Box */}
            <div className="pt-4 max-w-xl mx-auto relative">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic, or keyword (e.g., ATS, bullets, freshers)..."
                  className="w-full h-12 pl-11 pr-10 rounded-xl border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#111111] shadow-2xs transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1 text-gray-400 hover:text-black transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="bg-white border-b border-[#E5E7EB] py-4 px-6 sticky top-[58px] sm:top-[60px] md:top-[64px] z-40 shadow-2xs">
          <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 shrink-0 mr-2">
              Topic:
            </span>
            {ARTICLE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#111827] text-white shadow-2xs'
                      : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] hover:text-[#111827]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Article Grid Section */}
        <section className="py-12 md:py-16 px-6 max-w-6xl mx-auto">
          {/* Status Counter */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E7EB]">
            <span className="text-xs font-semibold text-[#6B7280]">
              Showing <strong className="text-[#111827] font-bold">{filteredArticles.length}</strong> of {ARTICLES.length} guides
            </span>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Reset filters
              </button>
            )}
          </div>

          {/* Grid Layout */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="group bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#111827] transition-all duration-200 flex flex-col justify-between hover:shadow-md overflow-hidden"
                >
                  <div>
                    {/* Visual Card Header Placeholder */}
                    <ArticleCardBanner category={article.category} pattern={article.headerPattern} />

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{article.readTime}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-gray-500">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {article.publishedAt}
                        </span>
                      </div>

                      <h2 className="font-serif text-xl font-bold text-[#111827] group-hover:text-black mb-3 leading-snug">
                        <Link to={`/resume-tips/${article.slug}`} className="focus:outline-none hover:underline">
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed mb-4 line-clamp-3">
                        {article.subtitle}
                      </p>

                      {/* Article Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {article.tags.slice(0, 3).map((tag, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-medium bg-[#F3F4F6] text-gray-600 px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#F3F4F6] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#6B7280]">
                      Resume Guide
                    </span>

                    <Link
                      to={`/resume-tips/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111827] group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-8">
              <FileText className="w-10 h-10 text-gray-400 mx-auto" />
              <h3 className="font-serif text-xl text-[#111827]">No articles matched your search</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Try searching for different keywords like "ATS", "summary", "skills", or "experience".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors cursor-pointer"
              >
                Show All 20 Articles
              </button>
            </div>
          )}
        </section>

        {/* Builder Bottom CTA */}
        <section className="py-16 px-6 bg-[#F9FAFB] border-t border-[#E5E7EB] text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">BUILDEASY RESUME BUILDER</p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#111827]">Ready to put these tips into practice?</h2>
            <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">
              Build your resume with BuildEasy and see your formatting, bullet points, and section layout rendered live in real time.
            </p>
            <div className="pt-2">
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-[7px] bg-[#111111] text-white text-sm font-semibold hover:bg-[#242424] transition-all duration-150"
              >
                <span>Create Your Resume</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
