import React, { useState } from 'react';
import { PortfolioData } from '../../types';
import PillButton from '../common/PillButton';
import { triggerAuthoritativePdfExport, downloadBackupJson, PdfExportResult } from '../../lib/exporter';
import { Check, FileText, Download, ArrowLeft, RotateCcw, Loader2, FileCode } from 'lucide-react';

interface ScreenExportConfirmationProps {
  data: PortfolioData;
  lastExportResult?: PdfExportResult;
  onEditAgain: () => void;
  onStartOver: () => void;
}

export default function ScreenExportConfirmation({
  data,
  lastExportResult,
  onEditAgain,
  onStartOver,
}: ScreenExportConfirmationProps) {
  const [isExportingAgain, setIsExportingAgain] = useState(false);

  const firstName = data.basicInfo?.firstName || data.basicInfo?.name?.split(' ')[0] || 'Resume';
  const lastName = data.basicInfo?.lastName || data.basicInfo?.name?.split(' ').slice(1).join(' ') || '';
  const cleanFirst = firstName.trim().replace(/[^a-zA-Z0-9]/g, '');
  const cleanLast = lastName.trim().replace(/[^a-zA-Z0-9]/g, '');
  const fileName = lastExportResult?.filename || (cleanFirst && cleanLast ? `${cleanFirst}_${cleanLast}_Resume.pdf` : 'BuildEasy_Resume.pdf');
  
  const pageSizeLabel = data.customization?.pageSize === 'a4' ? 'A4' : 'Letter';

  const handleDownloadAgain = async () => {
    setIsExportingAgain(true);
    try {
      await triggerAuthoritativePdfExport(data);
    } finally {
      setIsExportingAgain(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F5F7FA] py-12 px-4 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-[16px] border border-[#E5E7EB] p-8 shadow-xl text-center space-y-6">
        
        {/* Success Icon */}
        <div className="w-14 h-14 bg-[#F0FDF4] border border-[#DCFCE7] text-[#16A34A] rounded-full flex items-center justify-center mx-auto shadow-xs">
          <Check className="w-7 h-7 stroke-[2.5]" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">
            Your Resume is Ready!
          </h1>
          <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs mx-auto">
            Your document has been formatted for standard {pageSizeLabel} high-resolution print, vector typography, and professional submission.
          </p>
        </div>

        {/* File Details Card */}
        <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-4 text-left space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#111827] flex items-center justify-center text-white shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-xs text-[#111827] truncate font-mono">
                {fileName}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-[#6B7280] mt-0.5">
                <span>Format: <strong className="text-[#111827] font-semibold">Vector PDF</strong></span>
                <span>•</span>
                <span>Page: <strong className="text-[#111827] font-semibold">{pageSizeLabel}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="space-y-3 pt-2">
          <PillButton
            variant="primary"
            onClick={handleDownloadAgain}
            disabled={isExportingAgain}
            iconLeft={isExportingAgain ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            className="w-full text-xs py-3 justify-center cursor-pointer"
          >
            {isExportingAgain ? 'Preparing Document...' : 'Download PDF Document'}
          </PillButton>

          <PillButton
            variant="secondary"
            onClick={() => downloadBackupJson(data)}
            iconLeft={<FileCode className="w-4 h-4 text-slate-700" />}
            className="w-full text-xs py-2.5 justify-center bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-800 cursor-pointer"
          >
            Download JSON Data Backup
          </PillButton>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onEditAgain}
              className="flex-1 py-2 text-xs font-semibold text-[#4B5563] hover:text-[#111827] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Editing</span>
            </button>

            <div className="w-px h-4 bg-[#E5E7EB]" />

            <button
              type="button"
              onClick={onStartOver}
              className="flex-1 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start New</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
