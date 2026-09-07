import React from 'react';
import { PortfolioData, CustomizationSettings } from '../types';
import TemplateMinimal from './TemplateMinimal';
import TemplateExecutive from './TemplateExecutive';
import TemplateModern from './TemplateModern';
import TemplateClassic from './TemplateClassic';
import TemplateAcademic from './TemplateAcademic';
import TemplateCompact from './TemplateCompact';
import { sanitizeUrl } from '../lib/utils';
export { ResumeSection, EntryHeader, EntryBullets } from './common/ResumePrimitives';

interface TemplateRendererProps {
  data: PortfolioData;
}

export function isSectionHidden(sectionId: string, customization?: CustomizationSettings): boolean {
  const hidden = customization?.hiddenSections || [];
  if (hidden.includes(sectionId)) return true;
  if ((sectionId === 'summary' || sectionId === 'basic') && (hidden.includes('summary') || hidden.includes('basic'))) {
    return true;
  }
  if (hidden.includes('certifications') && ['achievements', 'publications', 'custom'].includes(sectionId)) {
    return true;
  }
  return false;
}

export function getSectionStyle(sectionId: string, customization?: CustomizationSettings): React.CSSProperties {
  if (isSectionHidden(sectionId, customization)) {
    return { display: 'none' };
  }
  return {};
}

function sanitizePortfolioData(data: PortfolioData): PortfolioData {
  if (!data) return data;
  const basicInfo = (data.basicInfo && typeof data.basicInfo === 'object') ? data.basicInfo : ({} as any);
  return {
    ...data,
    basicInfo: {
      ...basicInfo,
      name: typeof basicInfo.name === 'string' ? basicInfo.name : '',
      tagline: typeof basicInfo.tagline === 'string' ? basicInfo.tagline : '',
      email: typeof basicInfo.email === 'string' ? basicInfo.email : '',
      phone: typeof basicInfo.phone === 'string' ? basicInfo.phone : '',
      location: typeof basicInfo.location === 'string' ? basicInfo.location : '',
      summary: typeof basicInfo.summary === 'string' ? basicInfo.summary : '',
      website: typeof basicInfo.website === 'string' ? basicInfo.website : '',
      linkedin: typeof basicInfo.linkedin === 'string' ? basicInfo.linkedin : '',
      github: typeof basicInfo.github === 'string' ? basicInfo.github : '',
      portfolio: typeof basicInfo.portfolio === 'string' ? basicInfo.portfolio : '',
    },
    links: (data.links || []).map(l => ({
      ...l,
      url: typeof l.url === 'string' ? l.url : '',
    })),
    projects: (data.projects || []).map(p => ({
      ...p,
      link: p.link ? sanitizeUrl(p.link) : '',
      githubUrl: p.githubUrl ? sanitizeUrl(p.githubUrl) : '',
    })),
  };
}

export function renderSectionsByOrder(data: PortfolioData, sectionRenderers: Record<string, () => React.ReactNode>) {
  const defaultOrder = ['summary', 'experience', 'education', 'projects', 'skills', 'certifications'];
  const customOrder = data.customization?.sectionOrder;
  
  let order = defaultOrder;
  if (customOrder && customOrder.length > 0) {
    order = customOrder.map(s => (s === 'basic' ? 'summary' : s));
  }

  const allKeys = Object.keys(sectionRenderers);
  const fullOrder = [...order.filter(k => allKeys.includes(k)), ...allKeys.filter(k => !order.includes(k))];

  return fullOrder.map(sectionId => {
    if (isSectionHidden(sectionId, data.customization)) {
      return null;
    }
    const renderer = sectionRenderers[sectionId];
    if (!renderer) return null;
    const res = renderer();
    if (!res) return null;
    return <React.Fragment key={sectionId}>{res}</React.Fragment>;
  });
}

export default function TemplateRenderer({ data }: TemplateRendererProps) {
  const sanitizedData = sanitizePortfolioData(data);

  switch (sanitizedData.templateId) {
    case 'minimal':
      return <TemplateMinimal data={sanitizedData} />;
    case 'executive':
      return <TemplateExecutive data={sanitizedData} />;
    case 'modern':
      return <TemplateModern data={sanitizedData} />;
    case 'classic':
      return <TemplateClassic data={sanitizedData} />;
    case 'academic':
      return <TemplateAcademic data={sanitizedData} />;
    case 'compact':
      return <TemplateCompact data={sanitizedData} />;
    default:
      return <TemplateMinimal data={sanitizedData} />;
  }
}
