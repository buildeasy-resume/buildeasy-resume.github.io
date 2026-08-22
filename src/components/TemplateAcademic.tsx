import React from 'react';
import { PortfolioData } from '../types';
import { getSectionStyle, ResumeSection, EntryHeader, EntryBullets, renderSectionsByOrder } from './TemplateRenderer';
import { getNormalizedResumeContact } from '../lib/template-helpers';

interface TemplateProps {
  data: PortfolioData;
}

export default function TemplateAcademic({ data }: TemplateProps) {
  const { basicInfo, experience, education, projects, skills, skillCategories, achievements } = data;
  const displaySummary = basicInfo?.summary;
  const contact = getNormalizedResumeContact(data);

  const primaryContactItems: React.ReactNode[] = [];
  if (contact.location) primaryContactItems.push(<span key="loc">{contact.location}</span>);
  if (contact.phone) primaryContactItems.push(<span key="phone">{contact.phone}</span>);
  if (contact.email) {
    primaryContactItems.push(
      <a key="email" href={`mailto:${contact.email}`} className="text-gray-900 hover:underline">
        {contact.email}
      </a>
    );
  }
  if (contact.websiteUrl) {
    primaryContactItems.push(
      <a key="web" href={contact.websiteUrl} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
        {contact.websiteDisplay}
      </a>
    );
  }

  const sectionRenderers = {
    summary: () => displaySummary ? (
      <ResumeSection title="RESEARCH INTERESTS & SUMMARY" style={getSectionStyle('summary', data.customization)} titleClassName="text-[11pt] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1">
        <p className="text-[10pt] text-gray-800 leading-relaxed pt-1">{displaySummary}</p>
      </ResumeSection>
    ) : null,
    education: () => education.length > 0 ? (
      <ResumeSection title="EDUCATION" style={getSectionStyle('education', data.customization)} titleClassName="text-[11pt] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1">
        <div className="space-y-3.5 pt-1">
          {education.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <EntryHeader
                left={
                  <div>
                    <strong className="text-[10.5pt] text-gray-900">{edu.institution}</strong>
                    {edu.degree && <span className="text-[10pt] text-gray-800 font-serif"> — {edu.degree}</span>}
                    {edu.field && <span className="text-[10pt] text-gray-700 italic">, {edu.field}</span>}
                  </div>
                }
                right={`${edu.startDate} – ${edu.endDate}`}
                rightClassName="text-[9.5pt] text-gray-600 font-sans shrink-0 ml-2"
              />
              {edu.gpa && <p className="text-[9.5pt] text-gray-600 font-sans">GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-[9.5pt] text-gray-700 mt-0.5">{edu.description}</p>}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    experience: () => experience.length > 0 ? (
      <ResumeSection title="ACADEMIC & PROFESSIONAL APPOINTMENTS" style={getSectionStyle('experience', data.customization)} titleClassName="text-[11pt] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1">
        <div className="space-y-4 pt-1">
          {experience.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <EntryHeader
                left={
                  <div>
                    <strong className="text-[10.5pt] text-gray-900">{exp.role}</strong>
                    <span className="text-[10pt] text-gray-800 italic"> — {exp.org}</span>
                    {exp.location && <span className="text-gray-500 text-[9.5pt] ml-2 font-sans">({exp.location})</span>}
                  </div>
                }
                right={`${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`}
                rightClassName="text-[9.5pt] text-gray-600 font-sans shrink-0 ml-2"
              />
              {exp.bullets.length > 0 && <EntryBullets bullets={exp.bullets} className="list-disc list-outside ml-5 space-y-1 text-[9.5pt] text-gray-800 leading-relaxed mt-1" />}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    publications: () => data.publications && data.publications.length > 0 ? (
      <ResumeSection title="PUBLICATIONS & PREPRINTS" style={getSectionStyle('publications', data.customization)} titleClassName="text-[11pt] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1">
        <div className="space-y-2.5 pt-1">
          {data.publications.map((pub) => (
            <div key={pub.id} className="space-y-0.5 text-[10pt] text-gray-800">
              <EntryHeader left={<strong className="text-gray-900 font-serif">{pub.title}</strong>} right={pub.date} rightClassName="text-[9.5pt] text-gray-600 font-sans shrink-0 ml-2" />
              <div className="text-gray-700 text-[9.5pt] italic">{pub.subtitle}</div>
              {pub.description && <p className="text-gray-600 text-[9.5pt] pt-0.5">{pub.description}</p>}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    projects: () => projects.length > 0 ? (
      <ResumeSection title="RESEARCH PROJECTS & GRANTS" style={getSectionStyle('projects', data.customization)} titleClassName="text-[11pt] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1">
        <div className="space-y-3 pt-1">
          {projects.map((proj) => (
            <div key={proj.id} className="space-y-1">
              <EntryHeader
                left={
                  <div className="flex items-center gap-2">
                    <strong className="text-[10.5pt] text-gray-900">{proj.title}</strong>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[9pt] text-blue-800 hover:underline font-sans">
                        [Link]
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[9pt] text-gray-600 hover:underline font-sans">
                        [Repository]
                      </a>
                    )}
                  </div>
                }
              />
              {proj.description && <p className="text-[10pt] text-gray-800">{proj.description}</p>}
              {proj.tech.length > 0 && (
                <p className="text-[9pt] text-gray-600 font-sans">
                  Methodologies/Tools: {proj.tech.join(', ')}
                </p>
              )}
              {proj.bullets && proj.bullets.length > 0 && <EntryBullets bullets={proj.bullets} className="list-disc list-outside ml-5 space-y-1 text-[9.5pt] text-gray-800 leading-relaxed mt-1" />}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    achievements: () => achievements.length > 0 ? (
      <ResumeSection title="FELLOWSHIPS, HONORS & AWARDS" style={getSectionStyle('achievements', data.customization)} titleClassName="text-[11pt] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1">
        <div className="space-y-2 pt-1">
          {achievements.map((ach) => (
            <div key={ach.id} className="flex justify-between text-[10pt] text-gray-800">
              <span>
                <strong className="text-gray-900">{ach.title}</strong> — {ach.issuer}
              </span>
              <span className="text-gray-600 font-sans shrink-0">{ach.date}</span>
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    certifications: () => (
      <>
        {data.certifications && data.certifications.length > 0 && (
          <ResumeSection title="CERTIFICATIONS & LICENSURE" style={getSectionStyle('certifications', data.customization)} titleClassName="text-[11pt] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1">
            <div className="space-y-2 pt-1">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="space-y-0.5 text-[10pt] text-gray-800">
                  <EntryHeader left={<strong className="text-gray-900">{cert.title}</strong>} right={cert.date} rightClassName="text-[9.5pt] text-gray-600 font-sans shrink-0 ml-2" />
                  <div className="text-gray-700 text-[9.5pt] italic">{cert.subtitle}</div>
                  {cert.description && <p className="text-gray-600 text-[9.5pt] pt-0.5">{cert.description}</p>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections.map((cs) => (
          cs.items && cs.items.length > 0 && (
            <ResumeSection key={cs.id} title={cs.name ? cs.name.toUpperCase() : 'CUSTOM SECTION'} style={getSectionStyle('custom', data.customization)} titleClassName="text-[11pt] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1">
              <div className="space-y-2 pt-1">
                {cs.items.map((item) => (
                  <div key={item.id} className="space-y-0.5 text-[10pt] text-gray-800">
                    <EntryHeader left={<strong className="text-gray-900">{item.title}</strong>} right={item.date} rightClassName="text-[9.5pt] text-gray-600 font-sans shrink-0 ml-2" />
                    {item.subtitle && <div className="text-gray-700 text-[9.5pt] italic">{item.subtitle}</div>}
                    {item.description && <p className="text-gray-600 text-[9.5pt] pt-0.5">{item.description}</p>}
                  </div>
                ))}
              </div>
            </ResumeSection>
          )
        ))}
      </>
    ),
    skills: () => ((skills && skills.length > 0) || (skillCategories && skillCategories.length > 0)) ? (
      <ResumeSection title="TECHNICAL & METHODOLOGICAL SKILLS" style={getSectionStyle('skills', data.customization)} titleClassName="text-[11pt] font-bold uppercase tracking-wider text-gray-900 border-b-2 border-gray-900 pb-1">
        <div className="pt-1">
          {skillCategories && skillCategories.length > 0 ? (
            <div className="space-y-1 text-[10pt] text-gray-800">
              {skillCategories.map((cat) => (
                <div key={cat.id || cat.name}>
                  <strong className="text-gray-900 uppercase text-[9.5pt] tracking-wider font-sans">{cat.name}:</strong>{' '}
                  <span>{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[10pt] text-gray-800">{skills.join(' • ')}</p>
          )}
        </div>
      </ResumeSection>
    ) : null,
  };

  return (
    <div className="font-serif text-gray-900 leading-normal">
      {/* Header */}
      <header className="border-b-2 border-gray-900 pb-3 mb-6 text-center">
        <h1 className="text-[22pt] font-bold tracking-tight text-gray-900 uppercase">
          {basicInfo.name || 'YOUR NAME'}
        </h1>
        {basicInfo.tagline && (
          <p className="text-[11pt] italic text-gray-700 mt-1">
            {basicInfo.tagline}
          </p>
        )}

        {/* Row 1: Primary Contact */}
        {primaryContactItems.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-[9pt] text-gray-700 mt-2 font-sans">
            {primaryContactItems.map((item, index) => (
              <React.Fragment key={`primary-contact-${index}`}>
                {item}
                {index < primaryContactItems.length - 1 && <span className="text-gray-400">•</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Row 2: Normalized Social / Portfolio Links */}
        {contact.socialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[9pt] text-gray-900 font-semibold mt-1 font-sans">
            {contact.socialLinks.map((link, index) => (
              <React.Fragment key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {link.label}
                </a>
                {index < contact.socialLinks.length - 1 && <span className="text-gray-400 font-normal">•</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col gap-5">
        {renderSectionsByOrder(data, sectionRenderers)}
      </div>
    </div>
  );
}
