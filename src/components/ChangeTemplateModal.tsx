import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PortfolioData, TemplateId, INITIAL_PORTFOLIO_DATA } from '../types';
import TemplatePreview from './common/TemplatePreview';
import PillButton from './common/PillButton';
import { X, Check, Sparkles, Plus, Palette } from 'lucide-react';

interface ChangeTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTemplateId: TemplateId;
  currentAccentColor?: string;
  onApplyTemplate: (templateId: TemplateId, accentColor?: string) => void;
  resumeData: PortfolioData;
  isFirstTime?: boolean;
}

// Curated brand-safe accent colors + grayscale option
export const ACCENT_SWATCHES = [
  { id: 'default', label: 'Default / Monochrome', value: undefined, isNone: true },
  { id: 'navy', label: 'Dark Navy', value: '#0F172A' },
  { id: 'slate', label: 'Slate Blue', value: '#334155' },
  { id: 'blue', label: 'Royal Blue', value: '#2563EB' },
  { id: 'teal', label: 'Deep Teal', value: '#0D9488' },
  { id: 'emerald', label: 'Forest Emerald', value: '#059669' },
  { id: 'purple', label: 'Imperial Purple', value: '#7C3AED' },
  { id: 'rose', label: 'Crimson Rose', value: '#BE185D' },
  { id: 'amber', label: 'Warm Amber', value: '#D97706' },
  { id: 'black', label: 'Solid Black', value: '#18181B' },
];

// List of templates that are strictly monochrome formats
export const MONOCHROME_TEMPLATES: TemplateId[] = ['minimal', 'classic', 'academic'];

// Templates metadata for the gallery with concise, single-line descriptions (<45 chars)
export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  isRecommended?: boolean;
  category: string;
}

export const TEMPLATE_LIST: TemplateInfo[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, text-first layout optimized for readability',
    isRecommended: true,
    category: 'Professional',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Corporate typography and clear experience hierarchy',
    isRecommended: true,
    category: 'Professional',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Subtle accents and modern typography',
    category: 'Modern',
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'CV format prioritizing education and research',
    category: 'Academic',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume with strong horizontal rules',
    category: 'Professional',
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'High-density format for single-page fit',
    category: 'Compact',
  },
];

export default function ChangeTemplateModal({
  isOpen,
  onClose,
  currentTemplateId,
  currentAccentColor,
  onApplyTemplate,
  resumeData,
  isFirstTime = false,
}: ChangeTemplateModalProps) {
  // Staged choices in modal before confirming
  const [stagedTemplateId, setStagedTemplateId] = useState<TemplateId>(currentTemplateId);
  const [stagedAccentColor, setStagedAccentColor] = useState<string | undefined>(currentAccentColor);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customHex, setCustomHex] = useState(currentAccentColor || '#2563EB');

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sync staged state whenever modal opens or props change
  useEffect(() => {
    if (isOpen) {
      setStagedTemplateId(currentTemplateId);
      setStagedAccentColor(currentAccentColor);
      if (currentAccentColor) {
        setCustomHex(currentAccentColor);
      }
      // Auto-focus on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }
  }, [isOpen, currentTemplateId, currentAccentColor]);

  // Handle Escape key to dismiss & prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Check if current staged template supports color accents
  const supportsTheming = useMemo(() => {
    return !MONOCHROME_TEMPLATES.includes(stagedTemplateId);
  }, [stagedTemplateId]);

  // Ensure preview and thumbnails always have rich sample data to render complete, beautiful documents
  const sampleBaseData = useMemo<PortfolioData>(() => {
    const hasUserData = Boolean(
      resumeData.basicInfo.name?.trim() ||
      resumeData.basicInfo.firstName?.trim() ||
      resumeData.experience.length > 0
    );

    if (hasUserData) {
      return {
        ...INITIAL_PORTFOLIO_DATA,
        ...resumeData,
        basicInfo: {
          ...INITIAL_PORTFOLIO_DATA.basicInfo,
          ...resumeData.basicInfo,
        },
        links: resumeData.links.length > 0 ? resumeData.links : INITIAL_PORTFOLIO_DATA.links,
        experience: resumeData.experience.length > 0 ? resumeData.experience : INITIAL_PORTFOLIO_DATA.experience,
        education: resumeData.education.length > 0 ? resumeData.education : INITIAL_PORTFOLIO_DATA.education,
        projects: resumeData.projects.length > 0 ? resumeData.projects : INITIAL_PORTFOLIO_DATA.projects,
        skills: resumeData.skills.length > 0 ? resumeData.skills : INITIAL_PORTFOLIO_DATA.skills,
        achievements: resumeData.achievements.length > 0 ? resumeData.achievements : INITIAL_PORTFOLIO_DATA.achievements,
      };
    }
    return INITIAL_PORTFOLIO_DATA;
  }, [resumeData]);

  // Active preview data object with staged template and color
  const previewData = useMemo<PortfolioData>(() => {
    return {
      ...sampleBaseData,
      templateId: stagedTemplateId,
      accentColor: supportsTheming ? stagedAccentColor : undefined,
    };
  }, [sampleBaseData, stagedTemplateId, stagedAccentColor, supportsTheming]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onApplyTemplate(
      stagedTemplateId,
      supportsTheming ? stagedAccentColor : undefined
    );
    onClose();
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomHex(val);
    setStagedAccentColor(val);
  };

  return (
    <div
      id="change-template-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/65 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-template-modal-title"
    >
      {/* Modal Main Window */}
      <div
        ref={modalRef}
        className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl w-full max-w-6xl h-[92vh] max-h-[850px] flex flex-col overflow-hidden text-[#111827] select-none"
      >
        {/* Modal Header */}
        <header className="h-14 px-5 sm:px-6 border-b border-[#E5E7EB] flex items-center justify-between shrink-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <h2
              id="change-template-modal-title"
              className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight"
            >
              Change Template
            </h2>
            <span className="hidden sm:inline-block text-xs text-[#6B7280] font-medium">
              Choose an architecture and accent color for your resume
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#0F172A] hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: Live Scaled Preview (~40% width on desktop) */}
          <div className="w-full md:w-[42%] lg:w-[40%] h-44 sm:h-56 md:h-auto shrink-0 bg-[#F8FAFC] border-b md:border-b-0 md:border-r border-[#E5E7EB] flex flex-col items-center justify-start p-2.5 sm:p-4 overflow-hidden relative">
            <div className="w-full flex items-center justify-between mb-2.5 px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                <span>Selected Live Preview</span>
              </span>
              <span className="text-[11px] font-semibold text-[#111827] uppercase tracking-wider">
                {stagedTemplateId}
              </span>
            </div>

            {/* Page Preview Container */}
            <div className="flex-1 w-full flex items-center justify-center overflow-hidden p-3 bg-white rounded-xl border border-[#CBD5E1] shadow-inner relative">
              <TemplatePreview
                data={previewData}
                fitMode="contain"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right Column: Color Swatches + 2-Column Template Grid (~60% width on desktop) */}
          <div className="w-full md:w-[58%] lg:w-[60%] flex flex-col h-full bg-[#FAFAFA] overflow-hidden">
            
            {/* Sticky Color Picker Row */}
            <div className="p-4 sm:px-6 sm:py-3.5 bg-white border-b border-[#E5E7EB] shrink-0 z-10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#64748B]" />
                  <span className="text-xs font-bold text-[#0F172A]">Choose color</span>
                </div>
                {!supportsTheming && (
                  <span className="text-[11px] font-medium text-[#94A3B8] italic">
                    Monochrome template (color accents disabled)
                  </span>
                )}
              </div>

              {/* Swatches List */}
              <div className={`flex flex-wrap items-center gap-2 pt-0.5 ${!supportsTheming ? 'opacity-40 pointer-events-none' : ''}`}>
                {ACCENT_SWATCHES.map((swatch) => {
                  const isSelected = stagedAccentColor === swatch.value;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setStagedAccentColor(swatch.value)}
                      title={swatch.label}
                      disabled={!supportsTheming}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-1 relative ${
                        isSelected
                          ? 'ring-2 ring-[#0F172A] ring-offset-2 scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: swatch.value || '#FFFFFF',
                        border: swatch.isNone ? '1.5px dashed #94A3B8' : '1px solid rgba(0,0,0,0.12)',
                      }}
                    >
                      {swatch.isNone && (
                        <div className="w-full h-[1.5px] bg-red-400 rotate-45" />
                      )}
                      {isSelected && !swatch.isNone && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow-sm stroke-[3]" />
                      )}
                    </button>
                  );
                })}

                {/* Custom Color Input Toggle */}
                <div className="relative flex items-center">
                  <label
                    title="Custom Accent Color"
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#CBD5E1] bg-white flex items-center justify-center text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer transition-all hover:scale-105 ${
                      showCustomPicker || (stagedAccentColor && !ACCENT_SWATCHES.some(s => s.value === stagedAccentColor))
                        ? 'ring-2 ring-[#0F172A] ring-offset-2'
                        : ''
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <input
                      type="color"
                      value={customHex}
                      onChange={handleCustomColorChange}
                      disabled={!supportsTheming}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Scrollable 2-Column Template Grid with Uniform Dimensions */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TEMPLATE_LIST.map((tpl) => {
                  const isSelected = stagedTemplateId === tpl.id;
                  
                  // Always render a complete template thumbnail using rich sample data
                  const cardPreviewData: PortfolioData = {
                    ...sampleBaseData,
                    templateId: tpl.id,
                    accentColor: MONOCHROME_TEMPLATES.includes(tpl.id) ? undefined : (stagedAccentColor || undefined),
                  };

                  return (
                    <div
                      key={tpl.id}
                      role="button"
                      tabIndex={0}
                      id={`template-thumb-${tpl.id}`}
                      onClick={() => setStagedTemplateId(tpl.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setStagedTemplateId(tpl.id);
                        }
                      }}
                      className={`group relative bg-white rounded-xl overflow-hidden text-left transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0F172A] flex flex-col hover:-translate-y-0.5 ${
                        isSelected
                          ? 'border-2 border-[#0F172A] shadow-md ring-2 ring-[#0F172A]'
                          : 'border border-[#E5E7EB] hover:border-[#94A3B8] shadow-2xs hover:shadow-xs'
                      }`}
                    >
                      {/* Live Thumbnail Component Frame - Uniform Fixed Height (h-44) */}
                      <div className="w-full h-44 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-start justify-center overflow-hidden relative p-1.5">

                        {/* Selected overlay checkmark in consistent top-right position */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 z-20 bg-[#0F172A] text-white p-1 rounded-full shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}

                        {/* Miniature Template Instance */}
                        <div className="w-full h-full overflow-hidden flex items-center justify-center">
                          <TemplatePreview
                            data={cardPreviewData}
                            fitMode="contain"
                            className="w-full h-full"
                          />
                        </div>
                      </div>

                      {/* Card Info Footer - Fixed Height Block for Aligned Grid Rows */}
                      <div className="p-3 bg-white flex flex-col justify-between h-[68px]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0F172A]">
                            {tpl.name}
                          </span>
                          <span className="text-[10px] font-semibold text-[#64748B]">
                            {tpl.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6B7280] truncate mt-0.5" title={tpl.description}>
                          {tpl.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <footer className="h-16 px-5 sm:px-6 bg-white border-t border-[#E5E7EB] flex items-center justify-between shrink-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] px-3 py-2 rounded-full hover:bg-[#F3F4F6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <PillButton
              id="confirm-template-btn"
              variant="primary"
              onClick={handleConfirm}
              className="text-xs py-2 px-6 shadow-sm"
            >
              {isFirstTime ? 'Next' : 'Use this template'}
            </PillButton>
          </div>
        </footer>

      </div>
    </div>
  );
}
