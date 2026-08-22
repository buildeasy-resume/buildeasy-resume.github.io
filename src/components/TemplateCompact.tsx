import React from 'react';
import { PortfolioData } from '../types';
import { getSectionStyle, ResumeSection, EntryHeader, EntryBullets, renderSectionsByOrder } from './TemplateRenderer';
import { getNormalizedResumeContact } from '../lib/template-helpers';

interface TemplateProps {
  data: PortfolioData;
}

export default function TemplateCompact({ data }: TemplateProps) {
  const { basicInfo, experience, education, projects, skills, skillCategories, achievements } = data;
  const displaySummary = basicInfo?.summary;
  const contact = getNormalizedResumeContact(data);

  const primaryContactItems: React.ReactNode[] = [];
  if (contact.location) primaryContactItems.push(<span key="loc">{contact.location}</span>);
  if (contact.phone) primaryContactItems.push(<span key="phone">{contact.phone}</span>);
  if (contact.email) {
    primaryContactItems.push(
      <a key="email" href={`mailto:${contact.email}`} className="text-gray-800 hover:underline">
        {contact.email}
      </a>
    );
  }
  if (contact.websiteUrl) {
    primaryContactItems.push(
      <a key="web" href={contact.websiteUrl} target="_blank" rel="noreferrer" className="text-gray-800 hover:underline">
        {contact.websiteDisplay}
      </a>
    );
  }

  const sectionRenderers = {
    summary: () => displaySummary ? (
      <ResumeSection title="PROFILE SUMMARY" style={getSectionStyle('summary', data.customization)} titleClassName="text-[9.5pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
        <p className="text-[8.5pt] text-gray-800 leading-snug">{displaySummary}</p>
      </ResumeSection>
    ) : null,
    experience: () => experience.length > 0 ? (
      <ResumeSection title="EXPERIENCE" style={getSectionStyle('experience', data.customization)} titleClassName="text-[9.5pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
        <div className="space-y-2">
          {experience.map((exp) => (
            <div key={exp.id} className="space-y-0.5">
              <EntryHeader
                left={
                  <div>
                    <strong className="text-[9.5pt] text-gray-900">{exp.role}</strong>
                    <span className="text-[9pt] text-gray-700">, {exp.org}</span>
                    {exp.location && <span className="text-gray-500 text-[8.5pt] ml-1.5">({exp.location})</span>}
                  </div>
                }
                right={`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`}
                rightClassName="text-[8.5pt] text-gray-600 font-medium shrink-0 ml-2"
              />
              {exp.bullets.length > 0 && <EntryBullets bullets={exp.bullets} className="list-disc list-outside ml-4 space-y-0.5 text-[8.5pt] text-gray-800 leading-snug" />}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    education: () => education.length > 0 ? (
      <ResumeSection title="EDUCATION" style={getSectionStyle('education', data.customization)} titleClassName="text-[9.5pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
        <div className="space-y-1.5">
          {education.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <EntryHeader
                left={
                  <div>
                    <strong className="text-[9.5pt] text-gray-900">{edu.institution}</strong>
                    {edu.degree && <span className="text-[9pt] text-gray-700"> — {edu.degree}</span>}
                    {edu.field && <span className="text-[8.5pt] text-gray-600"> ({edu.field})</span>}
                  </div>
                }
                right={`${edu.startDate} - ${edu.endDate}`}
                rightClassName="text-[8.5pt] text-gray-600 font-medium shrink-0 ml-2"
              />
              {edu.gpa && <p className="text-[8.5pt] text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    projects: () => projects.length > 0 ? (
      <ResumeSection title="PROJECTS" style={getSectionStyle('projects', data.customization)} titleClassName="text-[9.5pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
        <div className="space-y-1.5">
          {projects.map((proj) => (
            <div key={proj.id} className="space-y-0.5">
              <EntryHeader
                left={
                  <div className="flex items-center gap-1.5">
                    <strong className="text-[9.5pt] text-gray-900">{proj.title}</strong>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[8pt] text-blue-600 hover:underline">
                        Demo
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[8pt] text-gray-600 hover:underline">
                        Code
                      </a>
                    )}
                  </div>
                }
              />
              {proj.description && <p className="text-[8.5pt] text-gray-800 leading-snug">{proj.description}</p>}
              {proj.bullets && proj.bullets.length > 0 && <EntryBullets bullets={proj.bullets} className="list-disc list-outside ml-4 space-y-0.5 text-[8.5pt] text-gray-800 leading-snug" />}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    skills: () => ((skills && skills.length > 0) || (skillCategories && skillCategories.length > 0)) ? (
      <ResumeSection title="SKILLS" style={getSectionStyle('skills', data.customization)} titleClassName="text-[9.5pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
        {skillCategories && skillCategories.length > 0 ? (
          <div className="space-y-1 text-[8.5pt] text-gray-800">
            {skillCategories.map((cat) => (
              <div key={cat.id || cat.name}>
                <strong className="text-gray-900">{cat.name}:</strong>{' '}
                <span className="text-gray-700">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[8.5pt] text-gray-800 leading-snug">{skills.join(' • ')}</p>
        )}
      </ResumeSection>
    ) : null,
    certifications: () => (
      <>
        {data.certifications && data.certifications.length > 0 && (
          <ResumeSection title="CERTIFICATIONS" style={getSectionStyle('certifications', data.customization)} titleClassName="text-[9.5pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
            <div className="space-y-1">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between text-[8.5pt] text-gray-800">
                  <span>
                    <strong className="text-gray-900">{cert.title}</strong> — {cert.subtitle}
                  </span>
                  <span className="text-gray-600 shrink-0 ml-2">{cert.date}</span>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {achievements.length > 0 && (
          <ResumeSection title="AWARDS" style={getSectionStyle('achievements', data.customization)} titleClassName="text-[9.5pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
            <div className="space-y-1">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex justify-between text-[8.5pt] text-gray-800">
                  <span>
                    <strong className="text-gray-900">{ach.title}</strong> — {ach.issuer}
                  </span>
                  <span className="text-gray-600 shrink-0 ml-2">{ach.date}</span>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {data.publications && data.publications.length > 0 && (
          <ResumeSection title="PUBLICATIONS" style={getSectionStyle('publications', data.customization)} titleClassName="text-[9.5pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
            <div className="space-y-1">
              {data.publications.map((pub) => (
                <div key={pub.id} className="flex justify-between text-[8.5pt] text-gray-800">
                  <span>
                    <strong className="text-gray-900">{pub.title}</strong> — {pub.subtitle}
                  </span>
                  <span className="text-gray-600 shrink-0 ml-2">{pub.date}</span>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections.map((cs) => (
          cs.items && cs.items.length > 0 && (
            <ResumeSection key={cs.id} title={cs.name ? cs.name.toUpperCase() : 'CUSTOM SECTION'} style={getSectionStyle('custom', data.customization)} titleClassName="text-[9.5pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-0.5 mb-1">
              <div className="space-y-1">
                {cs.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-[8.5pt] text-gray-800">
                    <span>
                      <strong className="text-gray-900">{item.title}</strong> — {item.subtitle}
                    </span>
                    <span className="text-gray-600 shrink-0 ml-2">{item.date}</span>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )
        ))}
      </>
    ),
  };

  return (
    <div className="font-sans text-gray-900 leading-tight text-[9pt]">
      {/* Header */}
      <header className="border-b border-gray-400 pb-2 mb-3">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h1 className="text-[18pt] font-black tracking-tight text-gray-900 uppercase">
              {basicInfo.name || 'YOUR NAME'}
            </h1>
            {basicInfo.tagline && (
              <p className="text-[9.5pt] text-gray-700 font-semibold tracking-wide">
                {basicInfo.tagline}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-0.5 text-[8.5pt] text-gray-600 font-medium">
            {primaryContactItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                {primaryContactItems.map((item, index) => (
                  <React.Fragment key={`primary-contact-${index}`}>
                    {item}
                    {index < primaryContactItems.length - 1 && <span className="text-gray-400">|</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            {contact.socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-gray-800 font-semibold">
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
                    {index < contact.socialLinks.length - 1 && <span className="text-gray-400 font-normal">|</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area - ultra high density layout */}
      <div className="flex flex-col gap-3">
        {renderSectionsByOrder(data, sectionRenderers)}
      </div>
    </div>
  );
}
