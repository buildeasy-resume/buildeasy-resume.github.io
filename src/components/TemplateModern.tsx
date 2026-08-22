import React from 'react';
import { PortfolioData } from '../types';
import { getSectionStyle, ResumeSection, EntryHeader, EntryBullets, renderSectionsByOrder } from './TemplateRenderer';
import { getNormalizedResumeContact } from '../lib/template-helpers';

interface TemplateProps {
  data: PortfolioData;
}

export default function TemplateModern({ data }: TemplateProps) {
  const { basicInfo, experience, education, projects, skills, skillCategories, achievements } = data;
  const themeColor = data.accentColor || '#2563eb';
  const displaySummary = basicInfo?.summary;
  const contact = getNormalizedResumeContact(data);

  const primaryContactItems: React.ReactNode[] = [];
  if (contact.location) primaryContactItems.push(<span key="loc">{contact.location}</span>);
  if (contact.phone) primaryContactItems.push(<span key="phone">{contact.phone}</span>);
  if (contact.email) {
    primaryContactItems.push(
      <a key="email" href={`mailto:${contact.email}`} className="hover:underline" style={{ color: themeColor }}>
        {contact.email}
      </a>
    );
  }
  if (contact.websiteUrl) {
    primaryContactItems.push(
      <a key="web" href={contact.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: themeColor }}>
        {contact.websiteDisplay}
      </a>
    );
  }

  const sectionRenderers = {
    summary: () => displaySummary ? (
      <ResumeSection title="Summary" themeColor={themeColor} style={getSectionStyle('summary', data.customization)}>
        <p className="text-[10pt] text-gray-800 leading-relaxed">{displaySummary}</p>
      </ResumeSection>
    ) : null,
    experience: () => experience.length > 0 ? (
      <ResumeSection title="Experience" themeColor={themeColor} style={getSectionStyle('experience', data.customization)}>
        <div className="space-y-5">
          {experience.map((exp) => (
            <div key={exp.id} className="space-y-1">
              <EntryHeader
                left={
                  <div>
                    <strong className="text-[11pt] text-gray-900">{exp.role}</strong>
                    <span className="text-[10.5pt] font-medium" style={{ color: themeColor }}> @ {exp.org}</span>
                    {exp.location && <span className="text-gray-500 text-[9.5pt] ml-2">({exp.location})</span>}
                  </div>
                }
                right={`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`}
              />
              {exp.bullets.length > 0 && <EntryBullets bullets={exp.bullets} />}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    education: () => education.length > 0 ? (
      <ResumeSection title="Education" themeColor={themeColor} style={getSectionStyle('education', data.customization)}>
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <EntryHeader
                left={
                  <div>
                    <strong className="text-[10.5pt] text-gray-900">{edu.institution}</strong>
                    {edu.degree && <span className="text-[10pt] text-gray-700"> — {edu.degree}</span>}
                    {edu.field && <span className="text-[10pt] text-gray-600"> in {edu.field}</span>}
                  </div>
                }
                right={`${edu.startDate} - ${edu.endDate}`}
              />
              {edu.gpa && <p className="text-[9.5pt] text-gray-600">GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-[9.5pt] text-gray-600 mt-0.5">{edu.description}</p>}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    projects: () => projects.length > 0 ? (
      <ResumeSection title="Projects" themeColor={themeColor} style={getSectionStyle('projects', data.customization)}>
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id} className="space-y-1">
              <EntryHeader
                left={
                  <div className="flex items-center gap-2">
                    <strong className="text-[10.5pt] text-gray-900">{proj.title}</strong>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[9.5pt] hover:underline font-medium" style={{ color: themeColor }}>
                        Live
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[9.5pt] text-gray-600 hover:underline">
                        Code
                      </a>
                    )}
                  </div>
                }
              />
              {proj.description && <p className="text-[10pt] text-gray-800">{proj.description}</p>}
              {proj.tech.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-[8.5pt] px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {proj.bullets && proj.bullets.length > 0 && <EntryBullets bullets={proj.bullets} />}
            </div>
          ))}
        </div>
      </ResumeSection>
    ) : null,
    skills: () => ((skills && skills.length > 0) || (skillCategories && skillCategories.length > 0)) ? (
      <ResumeSection title="Skills" themeColor={themeColor} style={getSectionStyle('skills', data.customization)}>
        {skillCategories && skillCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10pt] text-gray-800">
            {skillCategories.map((cat) => (
              <div key={cat.id || cat.name} className="bg-gray-50 p-2 rounded">
                <strong className="text-gray-900 block text-[9.5pt] mb-0.5">{cat.name}</strong>
                <span className="text-gray-700 text-[9pt]">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s, i) => (
              <span key={i} className="text-[9pt] px-2 py-0.5 bg-gray-100 text-gray-800 rounded font-medium">
                {s}
              </span>
            ))}
          </div>
        )}
      </ResumeSection>
    ) : null,
    certifications: () => (
      <>
        {data.certifications && data.certifications.length > 0 && (
          <ResumeSection title="Certifications" themeColor={themeColor} style={getSectionStyle('certifications', data.customization)}>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="space-y-0.5 text-[10pt] text-gray-800">
                  <EntryHeader left={<strong className="text-gray-900">{cert.title}</strong>} right={cert.date} />
                  <div className="text-gray-700 text-[9.5pt]">{cert.subtitle}</div>
                  {cert.description && <p className="text-gray-600 text-[9.5pt] pt-0.5">{cert.description}</p>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {achievements.length > 0 && (
          <ResumeSection title="Honors & Awards" themeColor={themeColor} style={getSectionStyle('achievements', data.customization)}>
            <div className="space-y-2">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex justify-between text-[10pt] text-gray-800">
                  <span>
                    <strong className="text-gray-900">{ach.title}</strong> — {ach.issuer}
                  </span>
                  <span className="text-gray-600 font-medium shrink-0">{ach.date}</span>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {data.publications && data.publications.length > 0 && (
          <ResumeSection title="Publications" themeColor={themeColor} style={getSectionStyle('publications', data.customization)}>
            <div className="space-y-2">
              {data.publications.map((pub) => (
                <div key={pub.id} className="space-y-0.5 text-[10pt] text-gray-800">
                  <EntryHeader left={<strong className="text-gray-900">{pub.title}</strong>} right={pub.date} />
                  <div className="text-gray-700 text-[9.5pt]">{pub.subtitle}</div>
                  {pub.description && <p className="text-gray-600 text-[9.5pt] pt-0.5">{pub.description}</p>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {data.customSections && data.customSections.length > 0 && data.customSections.map((cs) => (
          cs.items && cs.items.length > 0 && (
            <ResumeSection key={cs.id} title={cs.name || 'Custom Section'} themeColor={themeColor} style={getSectionStyle('custom', data.customization)}>
              <div className="space-y-2">
                {cs.items.map((item) => (
                  <div key={item.id} className="space-y-0.5 text-[10pt] text-gray-800">
                    <EntryHeader left={<strong className="text-gray-900">{item.title}</strong>} right={item.date} />
                    {item.subtitle && <div className="text-gray-700 text-[9.5pt]">{item.subtitle}</div>}
                    {item.description && <p className="text-gray-600 text-[9.5pt] pt-0.5">{item.description}</p>}
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
    <div className="font-sans text-gray-900 leading-normal">
      {/* Header */}
      <header className="border-b-2 pb-4 mb-6" style={{ borderColor: themeColor }}>
        <h1 className="text-[24pt] font-extrabold tracking-tight" style={{ color: themeColor }}>
          {basicInfo.name || 'YOUR NAME'}
        </h1>
        {basicInfo.tagline && (
          <p className="text-[12pt] text-gray-700 font-semibold mt-1">
            {basicInfo.tagline}
          </p>
        )}
        
        {/* Row 1: Primary Contact */}
        {primaryContactItems.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[9.5pt] text-gray-600 mt-2 font-medium">
            {primaryContactItems.map((item, index) => (
              <React.Fragment key={`primary-contact-${index}`}>
                {item}
                {index < primaryContactItems.length - 1 && <span className="text-gray-300">•</span>}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Row 2: Normalized Social / Portfolio Links */}
        {contact.socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9.5pt] font-semibold mt-1.5">
            {contact.socialLinks.map((link, index) => (
              <React.Fragment key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                  style={{ color: themeColor }}
                >
                  {link.label}
                </a>
                {index < contact.socialLinks.length - 1 && <span className="text-gray-300 font-normal">•</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col gap-6">
        {renderSectionsByOrder(data, sectionRenderers)}
      </div>
    </div>
  );
}
