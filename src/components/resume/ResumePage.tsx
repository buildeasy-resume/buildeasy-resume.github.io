import React from 'react';
import { PageSizeId, SpacingId } from '../../types';

interface ResumePageProps {
  children: React.ReactNode;
  pageSize?: PageSizeId;
  spacing?: SpacingId;
  accentColor?: string;
  font?: string;
}

/**
 * ResumePage serves as the physical authoritative shell for all resume templates.
 * Enforces exact physical dimensions (A4/Letter), safe margins (15mm), 
 * and consistent typography scaling across preview and export.
 */
const ResumePage: React.FC<ResumePageProps> = ({ 
  children, 
  pageSize = 'letter',
  spacing = 'balanced',
  accentColor = '#111827',
  font = 'inter'
}) => {
  const isA4 = pageSize.toLowerCase() === 'a4';
  
  // Physical dimensions in mm as requested
  const dimensions = isA4 
    ? { width: '210mm', minHeight: '297mm' } 
    : { width: '216mm', minHeight: '279mm' };

  // Spacing-based vertical gaps between sections
  const spacingClasses = {
    compact: 'gap-y-4',
    balanced: 'gap-y-6',
    comfortable: 'gap-y-8'
  };

  // Font mappings
  const FONT_STACKS: Record<string, string> = {
    inter: "'Inter', system-ui, -apple-system, sans-serif",
    arial: "Arial, Helvetica, sans-serif",
    helvetica: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    georgia: "Georgia, serif",
    times: "'Times New Roman', Times, serif",
  };

  const fontStack = FONT_STACKS[font] || FONT_STACKS.inter;

  return (
    <div 
      id="resume-document"
      className={`bg-white shadow-md print:shadow-none mx-auto overflow-hidden relative resume-document ${isA4 ? 'a4' : 'letter'}`}
      style={{
        width: dimensions.width,
        minHeight: dimensions.minHeight,
        padding: '15mm', // Authoritative 15mm safe margin
        boxSizing: 'border-box',
        fontFamily: fontStack
      }}
    >
      <div className={`flex flex-col h-full ${spacingClasses[spacing]}`}>
        {children}
      </div>
      
      {/* Structural Styles for Pagination and Print Fidelity */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: ${isA4 ? 'A4' : 'letter'} portrait;
            margin: 0;
          }
          .resume-document {
            width: 100% !important;
            min-height: 100% !important;
            height: auto !important;
            padding: 15mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
        
        /* Controlled Page Breaks */
        .resume-section {
          break-inside: auto;
          page-break-inside: auto;
        }
        
        .resume-entry {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        .resume-header {
          break-after: avoid;
          page-break-after: avoid;
          break-inside: avoid;
          page-break-inside: avoid;
        }

        /* Bullet alignment */
        .resume-bullets {
          margin-left: 5mm !important;
          padding-left: 0 !important;
          list-style: none !important;
        }

        .resume-bullets li {
          padding-left: 5mm !important; /* Spacing for the bullet dot */
          text-indent: 0 !important;
          overflow-wrap: break-word;
          position: relative;
        }

        .resume-bullets li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #9CA3AF; /* gray-400 */
          font-weight: bold;
        }
      `}} />
    </div>
  );
};

export default ResumePage;
