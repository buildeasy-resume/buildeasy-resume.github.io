import React from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getResumeExampleBySlug, RESUME_EXAMPLES } from '../data/examples';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  Layout, 
  Wrench, 
  BookOpen, 
  Check, 
  X,
  Layers
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export default function ResumeExampleView() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { handleSelectTemplate, hasResumeData } = useResume();

  const example = slug ? getResumeExampleBySlug(slug) : undefined;

  if (!example) {
    return <Navigate to="/resume-examples" replace />;
  }

  const canonicalUrl = `/resume-examples/${example.slug}`;
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Resume Examples', url: '/resume-examples' },
    { name: `${example.role} Example`, url: canonicalUrl },
  ];

  const handleUseTemplate = () => {
    handleSelectTemplate(example.recommendedTemplate);
    navigate(`/builder/start?template=${example.recommendedTemplate}`);
  };

  const otherExamples = RESUME_EXAMPLES.filter((e) => e.slug !== example.slug);

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: example.title,
    description: example.description,
    author: {
      '@type': 'Organization',
      name: 'BuildEasy Editorial Team',
      url: 'https://buildeasy-resume.github.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BuildEasy',
      url: 'https://buildeasy-resume.github.io',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://buildeasy-resume.github.io${canonicalUrl}`,
    },
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
      <SEO
        title={example.metaTitle}
        description={example.description}
        canonicalUrl={canonicalUrl}
        breadcrumbs={breadcrumbs}
        structuredData={articleStructuredData}
        keywords={[
          `${example.role.toLowerCase()} resume example`,
          `${example.role.toLowerCase()} resume format`,
          `${example.role.toLowerCase()} resume template`,
          `${example.role.toLowerCase()} skills resume`,
          'resume bullet points',
          'resume writing guide'
        ]}
      />

      <Header
        onNavigateHome={() => navigate('/')}
        onStartBuilder={() => navigate('/builder')}
        hasResumeData={hasResumeData}
      />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-[#F9FAFB] py-12 md:py-16 px-6 border-b border-[#E5E7EB]">
          <div className="max-w-4xl mx-auto">
            <nav className="text-xs text-gray-500 mb-6 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <Link to="/resume-examples" className="hover:text-black transition-colors">Resume Examples</Link>
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900 font-semibold">{example.role}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                {example.experienceLevel}
              </span>
              <span className="text-xs text-gray-500">
                Recommended Template: <span className="font-semibold text-gray-800">{example.recommendedTemplateName}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111827] mb-4 leading-tight">
              {example.title}
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-8 max-w-3xl">
              {example.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleUseTemplate}
                className="px-6 py-3 bg-[#111111] text-white text-sm font-semibold rounded-lg hover:bg-[#222222] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                Use {example.recommendedTemplateName} Template for This Resume <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/builder"
                className="px-6 py-3 bg-white border border-[#E5E7EB] text-[#111827] text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Open Free Resume Builder
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* 1. Recommended Structure */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                <Layout className="w-4 h-4 text-gray-700" />
                <span>Architecture</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111827] mb-4">
                1. Recommended Resume Structure for {example.role}s
              </h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {example.recommendedStructure.rationale}
              </p>

              <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Optimal Section Ordering:
                </h3>
                <ol className="space-y-2">
                  {example.recommendedStructure.order.map((sec, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-800">
                      <span className="w-6 h-6 rounded-full bg-white border border-gray-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{sec}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* 2. Professional Summary Guidance */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                <FileText className="w-4 h-4 text-gray-700" />
                <span>Summary Writing</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111827] mb-4">
                2. Professional Summary Guidance
              </h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {example.summaryGuidance.overview}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Good example */}
                <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
                    <Check className="w-4 h-4" /> High-Impact Example (Recommended)
                  </div>
                  <p className="text-xs text-emerald-950 leading-relaxed font-mono">
                    "{example.summaryGuidance.goodExample}"
                  </p>
                </div>

                {/* Bad example */}
                <div className="p-5 rounded-xl bg-rose-50/70 border border-rose-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-800 mb-2">
                    <X className="w-4 h-4" /> Weak Example (Avoid)
                  </div>
                  <p className="text-xs text-rose-950 leading-relaxed font-mono">
                    "{example.summaryGuidance.badExample}"
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                  Key Rules for {example.role} Summaries:
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {example.summaryGuidance.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. Essential Skills Matrix */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                <Wrench className="w-4 h-4 text-gray-700" />
                <span>Skills & Keywords</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111827] mb-4">
                3. Key Skills to Highlight on a {example.role} Resume
              </h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Organize your skills cleanly into technical proficiencies, soft skills, and industry tooling to pass ATS scanners and recruiter reviews.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-white border border-[#E5E7EB]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                    Technical & Hard Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {example.keySkills.hard.map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E5E7EB]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                    Soft & Leadership Skills
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {example.keySkills.soft.map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#E5E7EB]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                    Tools & Platforms
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {example.keySkills.tools.map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. High-Impact Bullet Points */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                <Sparkles className="w-4 h-4 text-gray-700" />
                <span>Action-Driven Bullets</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111827] mb-4">
                4. High-Impact Experience Bullet Points
              </h2>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Use the formula: <span className="font-semibold text-gray-900">Action Verb + Context / Problem + Quantifiable Metric</span>.
              </p>

              <div className="space-y-4">
                {example.bulletPointExamples.map((group, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                      {group.category}
                    </h4>
                    <ul className="space-y-2">
                      {group.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-800 shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Common Mistakes to Avoid */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Pitfalls & Corrections</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111827] mb-4">
                5. Common Mistakes on {example.role} Resumes
              </h2>

              <div className="space-y-4">
                {example.commonMistakes.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-white border border-[#E5E7EB] space-y-2">
                    <div className="text-xs font-bold text-rose-700 flex items-start gap-2">
                      <span className="shrink-0 font-bold">Mistake:</span>
                      <span>{item.mistake}</span>
                    </div>
                    <div className="text-xs font-semibold text-emerald-800 flex items-start gap-2 pt-1 border-t border-gray-100">
                      <span className="shrink-0 font-bold">Correction:</span>
                      <span>{item.correction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Complete Sample Resume Preview Box */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                <BookOpen className="w-4 h-4 text-gray-700" />
                <span>Full Sample</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#111827] mb-4">
                6. Complete {example.role} Resume Sample
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Below is a full example illustrating clean typography, section hierarchy, and metric-focused accomplishments:
              </p>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm font-sans space-y-6">
                {/* Header */}
                <div className="border-b border-gray-200 pb-5">
                  <h3 className="font-serif text-2xl font-bold text-gray-900">{example.sampleResume.fullName}</h3>
                  <p className="text-sm text-gray-700 font-medium">{example.sampleResume.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {example.sampleResume.location} • {example.sampleResume.email} • {example.sampleResume.linkedin}
                    {example.sampleResume.github && ` • ${example.sampleResume.github}`}
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1.5">Professional Summary</h4>
                  <p className="text-xs text-gray-700 leading-relaxed">{example.sampleResume.summary}</p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1.5">Core Competencies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {example.sampleResume.skills.map((skill) => (
                      <span key={skill} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">Work Experience</h4>
                  <div className="space-y-4">
                    {example.sampleResume.experience.map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-bold text-gray-900">{exp.role} — {exp.company}</span>
                          <span className="text-xs text-gray-500">{exp.date}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-gray-700 pl-4 list-disc">
                          {exp.highlights.map((h, hIdx) => (
                            <li key={hIdx}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {example.sampleResume.projects && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">Featured Projects</h4>
                    <div className="space-y-3">
                      {example.sampleResume.projects.map((proj, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-gray-900">{proj.name} ({proj.technologies})</span>
                            <span className="text-xs text-gray-500">{proj.date}</span>
                          </div>
                          <ul className="space-y-1 text-xs text-gray-700 pl-4 list-disc">
                            {proj.highlights.map((h, hIdx) => (
                              <li key={hIdx}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">Education</h4>
                  {example.sampleResume.education.map((edu, idx) => (
                    <div key={idx} className="text-xs text-gray-700">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{edu.degree}</span>
                        <span className="font-normal text-gray-500">{edu.date}</span>
                      </div>
                      <p className="text-gray-600">{edu.school}, {edu.location} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner */}
              <div className="mt-8 bg-gray-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-serif text-xl font-bold mb-1">
                    Build your {example.role} resume now
                  </h3>
                  <p className="text-xs text-gray-300">
                    Use our {example.recommendedTemplateName} template to export your resume to PDF in minutes.
                  </p>
                </div>
                <button
                  onClick={handleUseTemplate}
                  className="px-6 py-3 bg-white text-gray-900 text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  Start with {example.recommendedTemplateName} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Other Examples Navigation */}
            <div className="pt-12 border-t border-[#E5E7EB]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                Explore Other Resume Examples
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherExamples.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/resume-examples/${item.slug}`}
                    className="p-4 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-gray-500">{item.experienceLevel}</span>
                      <h4 className="font-serif text-base font-bold text-gray-900 mt-1">{item.role}</h4>
                    </div>
                    <span className="text-xs text-blue-600 font-semibold mt-3 flex items-center gap-1">
                      Read Guide <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
