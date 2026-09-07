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

  const firstName = data.basicInfo?.firstName?.trim();
  const lastName = data.basicInfo?.lastName?.trim();
  
  if (firstName || lastName) {
    return `${firstName || ''}_${lastName || ''}_Resume`.replace(/^_+|_+$/g, '');
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

let isExportInProgress = false;

/**
 * Authoritative Browser Print-to-PDF Pipeline
 * Renders the resume into an isolated print document preserving real HTML text,
 * CSS geometry (A4/Letter), 15mm safe margins, and font stacks.
 * Generates genuine TEXT-BASED, selectable, searchable, ATS-friendly PDFs.
 */
export async function triggerAuthoritativePdfExport(data: PortfolioData): Promise<PdfExportResult> {
  const filename = generateResumeFilename(data);

  if (isExportInProgress) {
    return {
      success: false,
      filename: `${filename}.pdf`,
      error: 'An export is already in progress. Please complete or dismiss the current print dialog first.',
    };
  }
  isExportInProgress = true;

  const isA4 = data.customization?.pageSize?.toLowerCase() === 'a4';
  const pageSize = isA4 ? 'A4' : 'letter';

  // Remove any stale print frame if one exists
  const existingFrame = document.getElementById('buildeasy-print-frame');
  if (existingFrame) {
    try {
      existingFrame.remove();
    } catch {
      // Ignore
    }
  }

  // Create an isolated hidden iframe for printing
  const iframe = document.createElement('iframe');
  iframe.id = 'buildeasy-print-frame';
  iframe.setAttribute('aria-hidden', 'true');
  iframe.setAttribute('tabindex', '-1');
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = isA4 ? '210mm' : '216mm';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  iframe.style.zIndex = '-9999';

  document.body.appendChild(iframe);

  const printWindow = iframe.contentWindow;
  if (!printWindow) {
    isExportInProgress = false;
    if (iframe.parentNode) iframe.remove();
    return {
      success: false,
      filename: `${filename}.pdf`,
      error: 'Unable to initialize isolated print environment.'
    };
  }

  const printDoc = iframe.contentDocument || printWindow.document;

  try {
    // 1. Initialize isolated print document shell
    printDoc.open();
    printDoc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename}</title>
</head>
<body>
  <div id="print-root"></div>
</body>
</html>`);
    printDoc.close();

    // 2. Clone all stylesheets, Tailwind styles, and web font links from parent document
    const headElements = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"], style')
    );
    for (const el of headElements) {
      printDoc.head.appendChild(el.cloneNode(true));
    }

    // 3. Inject authoritative print CSS enforcing paper geometry and ATS pagination
    const printStyle = printDoc.createElement('style');
    printStyle.textContent = `
      @page {
        size: ${pageSize} portrait;
        margin: 0;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        color: #000000 !important;
        width: 100% !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      #print-root {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
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
      .resume-header {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
        break-after: avoid;
        page-break-after: avoid;
      }
      .resume-section {
        break-inside: auto;
        page-break-inside: auto;
      }
      .resume-entry {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
      .resume-bullets {
        break-inside: auto;
      }
    `;
    printDoc.head.appendChild(printStyle);

    // 4. Render the real resume template into the isolated print document
    const printRoot = printDoc.getElementById('print-root');
    if (!printRoot) {
      throw new Error('Print root element not found in isolated document.');
    }

    const root = createRoot(printRoot);
    root.render(<TemplateRenderer data={data} />);

    // 5. Explicitly wait for fonts in the actual print document to be ready with a fallback timeout
    try {
      if (printDoc.fonts) {
        await Promise.race([
          printDoc.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 1500)),
        ]);
      }
      if (document.fonts) {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 1000)),
        ]);
      }
    } catch {
      // Font loading failure fallback - proceed with system font stack
    }

    // 6. Wait for layout stabilization
    await new Promise((resolve) => setTimeout(resolve, 350));

    // 7. Update document titles so browsers default to the candidate resume name
    const originalHostTitle = document.title;
    document.title = filename;

    // Schedule cleanup of isolated document and restore host window title
    let cleanedUp = false;
    const cleanup = () => {
      if (cleanedUp) return;
      cleanedUp = true;
      isExportInProgress = false;
      document.title = originalHostTitle;
      setTimeout(() => {
        try {
          root.unmount();
          if (iframe.parentNode) {
            iframe.remove();
          }
        } catch {
          // Ignore unmount errors during teardown
        }
      }, 1000);
    };

    printWindow.addEventListener('afterprint', cleanup, { once: true });
    window.addEventListener('afterprint', cleanup, { once: true });
    setTimeout(cleanup, 60000);

    // 8. Safely trigger print with try-catch for sandbox/blocked print dialogs
    try {
      printWindow.focus();
      printWindow.print();
    } catch (printErr: any) {
      cleanup();
      return {
        success: false,
        filename: `${filename}.pdf`,
        error: printErr?.message || 'The browser blocked the print window. Please allow popups or printing in your browser settings.',
      };
    }

    return {
      success: true,
      filename: `${filename}.pdf`,
    };
  } catch (err: any) {
    isExportInProgress = false;
    console.error('Authoritative Print Export Error:', err);
    if (iframe.parentNode) {
      iframe.remove();
    }
    return {
      success: false,
      filename: `${filename}.pdf`,
      error: err.message || 'Failed to initialize browser print export. Please try again.'
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
