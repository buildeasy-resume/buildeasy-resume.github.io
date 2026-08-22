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
  isFullView = false,
}: LivePreviewPaneProps) {
  const safeAccentColor = validateHexColor(data.accentColor, '#111827');
  const isA4 = data.customization?.pageSize?.toLowerCase() === 'a4';
  const spacing = data.customization?.spacing || 'balanced';

  // Base page dimensions: Standard letter is 8.5in (~816px at 96dpi), A4 is 210mm (~794px).
  // A standard desktop container width of 800px gives accurate 1:1 paper simulation.
  const widthStyle = isFullView ? 'w-[840px] max-w-full' : 'w-[794px] max-w-full';

  return (
    <div className={`w-full flex justify-center items-start ${className}`}>
      <div
        className={`bg-white rounded-md border border-[#D1D5DB] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-200 p-8 sm:p-10 md:p-12 ${widthStyle}`}
        style={{
          '--color-accent': safeAccentColor,
          lineHeight: spacing === 'compact' ? 1.35 : spacing === 'comfortable' ? 1.65 : 1.5,
          minHeight: isA4 ? '1123px' : '1056px',
        } as React.CSSProperties}
      >
        <ErrorBoundary>
          <TemplateRenderer data={data} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
