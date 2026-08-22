import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Clock, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb,
  BookOpen,
  Share2,
  Tag
} from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getArticleBySlug, getRelatedArticles, getPrevAndNextArticles } from '../data/articles';

export default function ArticleView() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/resume-tips" replace />;
  }

  const canonicalUrl = `https://buildeasy.app/resume-tips/${article.slug}`;
  const relatedArticles = getRelatedArticles(article.slug, 3);
  const { prevArticle, nextArticle } = getPrevAndNextArticles(article.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: '2026-08-01',
    dateModified: '2026-08-18',
    author: {
      '@type': 'Organization',
      name: 'BuildEasy Editorial Team',
      url: 'https://buildeasy.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BuildEasy',
      url: 'https://buildeasy.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://buildeasy.app/favicon.ico',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

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
        item: 'https://buildeasy.app/resume-tips',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#111827]">
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {article.keywords && <meta name="keywords" content={article.keywords.join(', ')} />}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Article Header Hero */}
        <section className="bg-[#F9FAFB] py-12 md:py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-[780px] mx-auto">
            {/* Breadcrumb Nav */}
            <nav className="text-xs text-gray-500 mb-6 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <span>/</span>
              <Link to="/resume-tips" className="hover:text-black transition-colors">Resume Tips</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate max-w-[280px] sm:max-w-md">{article.title}</span>
            </nav>

            <span className="text-xs font-bold tracking-widest uppercase text-[#111827] bg-[#E5E7EB] px-3 py-1 rounded-full mb-4 inline-block">
              {article.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111827] mb-4 leading-[1.15] tracking-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6">
              {article.subtitle}
            </p>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#6B7280] pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {article.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Published {article.publishedAt}
                </span>
              </div>

              {/* Tags List */}
              {article.tags && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3 h-3 text-gray-400" />
                  {article.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] font-medium text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Banner Placeholder */}
        <div className="max-w-[780px] mx-auto px-6 -mt-6">
          <div className="w-full h-40 bg-[#111827] rounded-2xl border border-gray-800 shadow-sm flex items-center justify-between p-6 text-white relative overflow-hidden">
            <div className="z-10 space-y-1 max-w-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">BuildEasy Career Advice</p>
              <p className="font-serif text-xl font-bold">{article.title}</p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs text-white shrink-0 z-10">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>

        {/* Article Main Content Body */}
        <article className="py-12 md:py-16 px-6 max-w-[780px] mx-auto text-[#111827] space-y-10 leading-relaxed">
          {article.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              {sec.h2 && (
                <h2 className="font-serif text-2xl md:text-3xl text-[#111827] pt-4 mb-2 tracking-tight border-b border-gray-100 pb-2">
                  {sec.h2}
                </h2>
              )}

              {sec.h3 && (
                <h3 className="font-bold text-lg md:text-xl text-[#111827] pt-2">
                  {sec.h3}
                </h3>
              )}

              {sec.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="text-base md:text-[17px] text-[#374151] leading-[1.7]">
                  {p}
                </p>
              ))}

              {sec.listItems && (
                <ul className="space-y-2.5 my-4 pl-2">
                  {sec.listItems.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2.5 text-base md:text-[16px] text-[#374151]">
                      <CheckCircle2 className="w-4 h-4 text-[#111827] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.orderedListItems && (
                <ol className="space-y-2.5 my-4 pl-2 list-decimal list-inside text-base md:text-[16px] text-[#374151]">
                  {sec.orderedListItems.map((item, oIdx) => (
                    <li key={oIdx} className="leading-relaxed">
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              )}

              {sec.exampleBox && (
                <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-5 my-6 space-y-3 shadow-2xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                    {sec.exampleBox.title}
                  </h4>
                  {sec.exampleBox.before && (
                    <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-lg text-xs md:text-sm text-rose-950 font-mono">
                      {sec.exampleBox.before}
                    </div>
                  )}
                  {sec.exampleBox.after && (
                    <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs md:text-sm text-emerald-950 font-mono">
                      {sec.exampleBox.after}
                    </div>
                  )}
                </div>
              )}

              {sec.callout && (
                <div className={`rounded-xl p-5 my-6 border text-sm flex gap-3.5 shadow-2xs ${
                  sec.callout.type === 'warning' 
                    ? 'bg-amber-50/80 border-amber-200 text-amber-950' 
                    : sec.callout.type === 'tip'
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-blue-50/80 border-blue-200 text-blue-950'
                }`}>
                  {sec.callout.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  ) : (
                    <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold text-sm mb-1">{sec.callout.title}</p>
                    <p className="text-xs md:text-sm leading-relaxed">{sec.callout.text}</p>
                  </div>
                </div>
              )}

              {sec.internalLink && (
                <p className="text-base text-[#374151] pt-2">
                  {sec.internalLink.text}
                  <Link
                    to={sec.internalLink.url}
                    className="font-bold text-[#111827] underline underline-offset-4 hover:text-black transition-colors"
                  >
                    {sec.internalLink.anchorText}
                  </Link>
                  .
                </p>
              )}
            </div>
          ))}

          {/* In-Article Builder CTA */}
          <div className="mt-14 pt-10 border-t border-[#E5E7EB]">
            <div className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-8 text-center space-y-4 shadow-2xs">
              <h3 className="font-serif text-2xl text-[#111827]">Ready to put these tips into practice?</h3>
              <p className="text-sm md:text-base text-[#4B5563] max-w-lg mx-auto leading-relaxed">
                Build your resume with BuildEasy and see your formatting, bullet points, and section ordering rendered in real time.
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
          </div>

          {/* Previous & Next Article Navigation Bar */}
          <div className="pt-10 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                to={`/resume-tips/${prevArticle.slug}`}
                className="group p-4 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#111827] transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Previous Article</span>
                </div>
                <span className="font-serif text-sm font-bold text-[#111827] group-hover:underline line-clamp-1">
                  {prevArticle.title}
                </span>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link
                to={`/resume-tips/${nextArticle.slug}`}
                className="group p-4 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#111827] transition-all flex flex-col justify-between text-right"
              >
                <div className="flex items-center justify-end gap-1.5 text-xs text-gray-500 mb-1">
                  <span>Next Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="font-serif text-sm font-bold text-[#111827] group-hover:underline line-clamp-1">
                  {nextArticle.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </article>

        {/* Related Resume Guides */}
        {relatedArticles.length > 0 && (
          <section className="py-16 px-6 bg-[#F9FAFB] border-t border-[#E5E7EB]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs font-bold tracking-widest text-[#6B7280] uppercase mb-2">FURTHER READING</p>
                <h2 className="font-serif text-3xl text-[#111827]">Related Resume Guides</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/resume-tips/${rel.slug}`}
                    className="group bg-white rounded-xl border border-[#E5E7EB] p-6 hover:border-[#111827] transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                        <span className="font-semibold text-[10px] uppercase text-[#111827] bg-[#F3F4F6] px-2 py-0.5 rounded-full">
                          {rel.category}
                        </span>
                        <span>{rel.readTime}</span>
                      </div>
                      <h3 className="font-serif text-lg text-[#111827] group-hover:text-black mb-2 leading-snug">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                        {rel.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#F3F4F6] flex items-center justify-between text-xs font-semibold text-[#111827]">
                      <span>Read guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
