import React from 'react';
import { PortfolioData, TemplateId, FontId, SpacingId, PageSizeId } from '../../types';
import { TEMPLATE_LIST } from '../ChangeTemplateModal';
import { Check, Sparkles, Type, Sliders, FileSpreadsheet } from 'lucide-react';

interface DesignTabProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

const FONTS: { id: FontId; name: string; fontClass: string }[] = [
  { id: 'inter', name: 'Inter (Sans-serif)', fontClass: 'font-sans' },
  { id: 'helvetica', name: 'Helvetica / Arial', fontClass: 'font-sans' },
  { id: 'georgia', name: 'Georgia (Editorial Serif)', fontClass: 'font-serif' },
  { id: 'times', name: 'Times New Roman (Academic)', fontClass: 'font-serif' },
];

const ACCENT_COLORS = [
  '#111827', // Black / Slate
  '#2563EB', // Royal Blue
  '#059669', // Emerald
  '#7C3AED', // Violet
  '#DC2626', // Crimson
  '#D97706', // Amber
  '#4B5563', // Charcoal
];

export default function DesignTab({ data, onChange }: DesignTabProps) {
  const updateCustomization = (key: string, value: any) => {
    onChange({
      ...data,
      customization: {
        ...(data.customization || {
          font: 'inter',
          spacing: 'balanced',
          pageSize: 'letter',
          sectionOrder: ['summary', 'experience', 'education', 'projects', 'skills'],
          hiddenSections: [],
        }),
        [key]: value,
      },
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-8 bg-white">
      {/* 1. Template Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Resume Template
          </label>
          <span className="text-xs font-medium text-gray-500 capitalize">
            {data.templateId || 'Minimal'}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TEMPLATE_LIST.map((template) => {
            const isSelected = (data.templateId || 'minimal') === template.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => onChange({ ...data, templateId: template.id })}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#111827] bg-[#F9FAFB] ring-2 ring-black/5 shadow-xs font-bold text-[#111827]'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                }`}
              >
                <div className="h-14 bg-gray-100 rounded-md mb-2 p-1.5 flex flex-col gap-1 overflow-hidden opacity-80">
                  <div className="h-1.5 bg-gray-400 rounded w-1/2" />
                  <div className="h-1 bg-gray-300 rounded w-full" />
                  <div className="h-1 bg-gray-200 rounded w-3/4" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">{template.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Color Scheme */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
          Accent Color
        </label>
        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_COLORS.map((color) => {
            const isSelected = (data.accentColor || '#111827').toLowerCase() === color.toLowerCase();
            return (
              <button
                key={color}
                type="button"
                onClick={() => onChange({ ...data, accentColor: color })}
                style={{ backgroundColor: color }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                  isSelected ? 'ring-2 ring-offset-2 ring-black scale-110' : 'hover:scale-105'
                }`}
                title={color}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow-xs" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Typography Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5" /> Typography & Font Family
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {FONTS.map((f) => {
            const isSelected = (data.customization?.font || 'inter') === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => updateCustomization('font', f.id)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-[#111827] bg-[#F9FAFB] font-bold text-black ring-1 ring-black'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                } ${f.fontClass}`}
              >
                <span className="text-sm">{f.name}</span>
                {isSelected && <Check className="w-4 h-4 text-black shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Spacing & Margins */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5" /> Content Density & Spacing
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['compact', 'balanced', 'comfortable'] as SpacingId[]).map((sp) => {
            const isSelected = (data.customization?.spacing || 'balanced') === sp;
            return (
              <button
                key={sp}
                type="button"
                onClick={() => updateCustomization('spacing', sp)}
                className={`py-2 px-3 rounded-xl border text-center text-xs font-semibold capitalize transition-all ${
                  isSelected
                    ? 'border-[#111827] bg-[#111827] text-white shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                }`}
              >
                {sp}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Page Format */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
          Standard Page Format
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'letter', label: 'US Letter (8.5 × 11 in)' },
            { id: 'a4', label: 'A4 Standard (210 × 297 mm)' },
          ].map((fmt) => {
            const isSelected = (data.customization?.pageSize || 'letter') === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={() => updateCustomization('pageSize', fmt.id)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border-[#111827] bg-[#111827] text-white shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                }`}
              >
                {fmt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
