import React from 'react';
import { PortfolioData } from '../../types';
import TemplatePreview from './TemplatePreview';

interface ScaledResumePreviewProps {
  data: PortfolioData;
  className?: string;
  pageWidth?: number;
  aspectRatio?: number;
  interactive?: boolean;
}

export default function ScaledResumePreview({
  data,
  className = '',
  interactive = false,
}: ScaledResumePreviewProps) {
  return (
    <TemplatePreview
      data={data}
      className={className}
      interactive={interactive}
      fitMode="contain"
    />
  );
}
