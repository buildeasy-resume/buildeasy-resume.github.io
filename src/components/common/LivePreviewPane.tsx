import React from 'react';
import { PortfolioData } from '../../types';
import TemplateRenderer from '../TemplateRenderer';
import { ErrorBoundary } from '../ErrorBoundary';
import { validateHexColor } from '../../lib/utils';

interface LivePreviewPaneProps {
  data: PortfolioData;
  className?: string;
  isFullView?: boolean;
}

export default function LivePreviewPane({
  data,
  className = '',
}: LivePreviewPaneProps) {
  const isA4 = data.customization?.pageSize?.toLowerCase() === 'a4';

  return (
    <div className={`flex justify-center items-start ${className}`}>
      <div
        className="w-full h-auto flex justify-center"
        style={{
          width: isA4 ? '210mm' : '216mm',
          maxWidth: '100%',
        }}
      >
        <ErrorBoundary>
          <TemplateRenderer data={data} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
