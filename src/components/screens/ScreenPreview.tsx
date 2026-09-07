import React from 'react';
import { PortfolioData, TemplateId } from '../../types';
import Footer from '../common/Footer';
import LivePreviewPane from '../common/LivePreviewPane';
import ChangeTemplateModal from '../ChangeTemplateModal';
import { useNavigate } from 'react-router-dom';
import { 
  Download, 
  ArrowLeft, 
  LayoutTemplate, 
  FileCode
} from 'lucide-react';
import { triggerAuthoritativePdfExport, downloadBackupJson } from '../../lib/exporter';

interface ScreenPreviewProps {
  data: PortfolioData;
  onBackToEdit: () => void;
  onSelectTemplate: (templateId: TemplateId, accentColor?: string) => void;
}

export default function ScreenPreview({ data, onBackToEdit, onSelectTemplate }: ScreenPreviewProps) {
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportError, setExportError] = React.useState<string | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleExportPdf = async () => {
    setIsExporting(true);
    setExportError(null);
    try {
      const res = await triggerAuthoritativePdfExport(data);
      if (res.success) {
        navigate('/builder/export');
      } else {
        setExportError(res.error || 'Failed to open print dialog. Please try again.');
      }
    } catch (err: any) {
      console.error('Export failed:', err);
      setExportError(err?.message || 'An unexpected error occurred during export.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#E5E7EB] overflow-y-auto">
      {exportError && (
        <div className="bg-rose-50 border-b border-rose-200 text-rose-800 px-4 py-3 text-xs font-medium flex items-center justify-between z-40">
          <span>{exportError}</span>
          <button
            type="button"
            onClick={() => setExportError(null)}
            className="text-rose-600 hover:text-rose-900 font-bold ml-4 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
      {/* 1. Header Toolbar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToEdit}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Editor</span>
          </button>

          <div className="h-4 w-px bg-gray-200 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">{data.resumeName || 'My Resume'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(true)}
            className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Change Template</span>
          </button>

          <button
            type="button"
            onClick={() => downloadBackupJson(data)}
            className="text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer hidden md:flex"
            title="Download full JSON backup of your resume"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Save JSON</span>
          </button>

          <button
            type="button"
            onClick={handleExportPdf}
            disabled={isExporting}
            data-tour="download"
            className="text-xs font-bold text-white bg-[#111827] hover:bg-[#27272a] px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Preparing Document...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Sheet Canvas Container */}
      <div className="flex-1 flex justify-center items-start py-8 md:py-12 px-4">
        <div className="w-full max-w-4xl flex justify-center pb-12">
          <LivePreviewPane data={data} className="w-full" />
        </div>
      </div>

      {/* 3. Global Single Footer */}
      <Footer />

      {/* Template Switcher Modal */}
      <ChangeTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        currentTemplateId={data.templateId}
        currentAccentColor={data.accentColor}
        resumeData={data}
        onApplyTemplate={(templateId, accentColor) => {
          onSelectTemplate(templateId, accentColor);
          setIsTemplateModalOpen(false);
        }}
      />
    </div>
  );
}
