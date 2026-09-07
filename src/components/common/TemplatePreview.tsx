import React, { useRef, useState, useEffect } from 'react';
import { PortfolioData } from '../../types';
import TemplateRenderer from '../TemplateRenderer';
import { ErrorBoundary } from '../ErrorBoundary';

interface TemplatePreviewProps {
  data: PortfolioData;
  className?: string;
  interactive?: boolean;
  fitMode?: 'width' | 'contain';
  safeArea?: boolean;
}

export default function TemplatePreview({
  data,
  className = '',
  interactive = false,
  fitMode = 'contain',
  safeArea = false,
}: TemplatePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const isA4 = data.customization?.pageSize?.toLowerCase() === 'a4';
  const effectivePageWidth = isA4 ? 794 : 816;
  const effectivePageHeight = isA4 ? 1123 : 1056; // A4: 794 * 1.4142 = ~1123; Letter: 816 * 1.2941 = ~1056

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) {
        setContainerSize({ width: w, height: h });
      }
    };

    updateSize();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          setContainerSize({ width: w, height: h });
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scaleX = containerSize.width > 0 ? containerSize.width / effectivePageWidth : 0.35;
  const scaleY = containerSize.height > 0 ? containerSize.height / effectivePageHeight : 0.35;

  const scale = fitMode === 'contain' ? Math.min(scaleX, scaleY) : scaleX;

  const renderedWidth = effectivePageWidth * scale;
  const renderedHeight = effectivePageHeight * scale;

  const leftOffset = Math.max(0, (containerSize.width - renderedWidth) / 2);
  const topOffset = Math.max(0, (containerSize.height - renderedHeight) / 2);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-white ${className}`}
    >
      <div
        className="absolute origin-top-left bg-white shadow-xs"
        style={{
          width: `${effectivePageWidth}px`,
          height: `${effectivePageHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          left: `${leftOffset}px`,
          top: `${topOffset}px`,
          pointerEvents: interactive ? 'auto' : 'none',
          padding: safeArea ? '3.5% 5%' : undefined,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <ErrorBoundary>
          <TemplateRenderer data={data} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
