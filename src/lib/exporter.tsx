import React from 'react';
import { createRoot } from 'react-dom/client';
import { PortfolioData } from '../types';
import TemplateRenderer from '../components/TemplateRenderer';

export interface PdfExportResult {
  success: boolean;
  filename: string;
  error?: string;
}

/**
 * Cleanly generates a formatted document file name based on applicant name / document name.
 */
export function generateResumeFilename(data: PortfolioData): string {
  const customName = data.resumeName?.trim();
  if (customName) {
    return customName.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().replace(/\s+/g, '_') + '_Resume';
  }

  const name = (data.basicInfo?.name || '').trim();
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}_${parts[parts.length - 1]}_Resume`;
    }
    return `${parts[0]}_Resume`;
  }

  return 'BuildEasy_Resume';
}

/**
 * Single Authoritative PDF / Print Exporter
 * Retains 100% selectable vector typography, clickable hyperlinks, exact A4/Letter margins,
 * and handles browser popup blockers gracefully with clean user feedback.
 */
export async function triggerAuthoritativePdfExport(data: PortfolioData): Promise<PdfExportResult> {
  const filename = generateResumeFilename(data);
  const isA4 = data.customization?.pageSize?.toLowerCase() === 'a4';
  const pageSizeRule = isA4 ? 'A4 portrait' : 'letter portrait';

  // Attempt to open print helper window
  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    // Popup blocked by browser policy: Fallback to in-page print with prompt
    const originalTitle = document.title;
    document.title = filename;

    // Dispatch custom event to notify parent UI if needed
    const userConfirmed = window.confirm(
      'Your browser prevented opening the dedicated PDF export window. Would you like to use standard print preview instead?'
    );

    if (userConfirmed) {
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
      return { success: true, filename: `${filename}.pdf` };
    }

    return {
      success: false,
      filename: `${filename}.pdf`,
      error: 'Pop-up window was blocked. Please allow popups for BuildEasy to export high-fidelity PDFs.'
    };
  }

  try {
    printWindow.document.title = filename;

    // 1. Copy all application stylesheets
    document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
      printWindow.document.head.appendChild(node.cloneNode(true));
    });

    // 2. Add Google Fonts link for high quality typography
    const fontLink = printWindow.document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@400;500;600&display=swap';
    printWindow.document.head.appendChild(fontLink);

    // 3. Inject strict print & page-break CSS
    const styleReset = printWindow.document.createElement('style');
    styleReset.innerHTML = `
      @page {
        size: ${pageSizeRule};
        margin: 0;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0 !important;
        padding: 0 !important;
        background-color: #F3F4F6 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      #print-root {
        width: 100% !important;
      }
      .print-instruction-banner {
        background-color: #0F172A;
        color: white;
        padding: 12px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 999;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
      .print-btn-primary {
        background-color: #2563EB;
        color: white;
        border: none;
        padding: 8px 18px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: background-color 0.15s ease;
      }
      .print-btn-primary:hover {
        background-color: #1D4ED8;
      }
      .print-btn-secondary {
        background-color: #334155;
        color: #E2E8F0;
        border: none;
        padding: 8px 14px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: background-color 0.15s ease;
      }
      .print-btn-secondary:hover {
        background-color: #475569;
      }
      @media print {
        body {
          background-color: #FFFFFF !important;
        }
        .print-instruction-banner {
          display: none !important;
        }
        #print-root {
          padding: 0 !important;
          margin: 0 !important;
          background-color: #FFFFFF !important;
        }
        .resume-sheet-container {
          box-shadow: none !important;
          margin: 0 !important;
          border: none !important;
          width: 100% !important;
        }
        /* Strict semantic page-break rules */
        section, article, .resume-entry, .resume-block {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        h1, h2, h3, h4, .section-heading {
          break-after: avoid !important;
          page-break-after: avoid !important;
        }
        p, li {
          orphans: 2;
          widows: 2;
        }
      }
    `;
    printWindow.document.head.appendChild(styleReset);

    // 4. Render Layout & Banner
    const bodyContainer = printWindow.document.createElement('div');
    bodyContainer.className = 'min-h-screen bg-gray-100 flex flex-col';

    const banner = printWindow.document.createElement('div');
    banner.className = 'print-instruction-banner';
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 14px;">
        <span style="font-size: 24px;">📄</span>
        <div>
          <strong style="display: block; font-size: 14px; color: #FFFFFF;">Ready to Save or Print Your Resume</strong>
          <span style="font-size: 11px; color: #94A3B8; display: block; margin-top: 2px;">
            In the print dialog, select Destination: <strong>"Save as PDF"</strong> and ensure <strong>"Background graphics"</strong> is checked.
          </span>
        </div>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="print-btn-primary" onclick="window.print()">Save as PDF</button>
        <button class="print-btn-secondary" onclick="window.close()">Close</button>
      </div>
    `;
    bodyContainer.appendChild(banner);

    const printRoot = printWindow.document.createElement('div');
    printRoot.id = 'print-root';
    printRoot.className = 'flex-1 flex justify-center items-start py-8 px-4 bg-gray-100 print:bg-white print:py-0 print:px-0';

    const innerWrapper = printWindow.document.createElement('div');
    const widthClass = isA4 ? 'w-[794px]' : 'w-[816px]';
    innerWrapper.className = `resume-sheet-container ${widthClass} bg-white shadow-xl print:shadow-none border border-gray-200 print:border-none`;
    printRoot.appendChild(innerWrapper);
    bodyContainer.appendChild(printRoot);

    printWindow.document.body.appendChild(bodyContainer);

    // Render React TemplateRenderer into the new document
    const root = createRoot(innerWrapper);
    root.render(<TemplateRenderer data={data} />);

    // Trigger print dialog after DOM layout and webfonts hydrate
    setTimeout(() => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch (err) {
        console.warn('Auto-print invocation caught:', err);
      }
    }, 450);

    return { success: true, filename: `${filename}.pdf` };
  } catch (err: any) {
    return {
      success: false,
      filename: `${filename}.pdf`,
      error: err.message || 'Failed to export resume'
    };
  }
}

/**
 * Downloads a complete JSON backup of the user's resume data.
 */
export function downloadBackupJson(data: PortfolioData): void {
  const filename = generateResumeFilename(data);
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
