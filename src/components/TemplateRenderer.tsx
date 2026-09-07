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
  return {
    ...data,
    basicInfo: {
      ...data.basicInfo,
      website: data.basicInfo.website ? sanitizeUrl(data.basicInfo.website) : '',
      linkedin: data.basicInfo.linkedin ? sanitizeUrl(data.basicInfo.linkedin) : '',
      github: data.basicInfo.github ? sanitizeUrl(data.basicInfo.github) : '',
      portfolio: data.basicInfo.portfolio ? sanitizeUrl(data.basicInfo.portfolio) : '',
    },
    links: (data.links || []).map(l => ({
      ...l,
      url: l.url ? sanitizeUrl(l.url) : '',
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
