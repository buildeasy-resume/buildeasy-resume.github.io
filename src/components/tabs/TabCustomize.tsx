import React, { useState } from 'react';
import { PortfolioData, CustomizationSettings, FontId, SpacingId, PageSizeId } from '../../types';
import { DEFAULT_CUSTOMIZATION } from '../../types';
import { Settings, RefreshCw, Layout, Type, Palette, Minimize, FileText, GripVertical, Eye, EyeOff } from 'lucide-react';
import PillButton from '../common/PillButton';

interface TabCustomizeProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

const FONTS: { id: FontId; label: string; family: string }[] = [
  { id: 'inter', label: 'Inter', family: 'Inter, sans-serif' },
  { id: 'arial', label: 'Arial', family: 'Arial, sans-serif' },
  { id: 'helvetica', label: 'Helvetica', family: 'Helvetica, sans-serif' },
  { id: 'georgia', label: 'Georgia', family: 'Georgia, serif' },
  { id: 'times', label: 'Times New Roman', family: '"Times New Roman", serif' },
];

const COLORS = [
  { id: 'blue', label: 'BuildEasy Blue', hex: '#2563EB' },
  { id: 'navy', label: 'Navy', hex: '#0F172A' },
  { id: 'forest', label: 'Forest', hex: '#059669' },
  { id: 'black', label: 'Black', hex: '#18181B' },
  { id: 'slate', label: 'Slate', hex: '#475569' },
];

const SPACINGS: { id: SpacingId; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'comfortable', label: 'Comfortable' },
];

const PAGE_SIZES: { id: PageSizeId; label: string }[] = [
  { id: 'letter', label: 'US Letter' },
  { id: 'a4', label: 'A4' },
];

export const SECTION_NAMES: Record<string, string> = {
  summary: 'Professional Summary',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  skills: 'Technical Skills',
  achievements: 'Honors & Awards',
};

export default function TabCustomize({ data, onChange }: TabCustomizeProps) {
  const custom = data.customization || DEFAULT_CUSTOMIZATION;

  const updateSettings = (updates: Partial<CustomizationSettings>) => {
    onChange({
      ...data,
      customization: {
        ...custom,
        ...updates
      }
    });
  };

  const handleReset = () => {
    onChange({
      ...data,
      customization: DEFAULT_CUSTOMIZATION,
      accentColor: '#2563EB'
    });
  };

  const toggleSectionVisibility = (section: string) => {
    const hidden = custom.hiddenSections || [];
    if (hidden.includes(section)) {
      updateSettings({ hiddenSections: hidden.filter(s => s !== section) });
    } else {
      updateSettings({ hiddenSections: [...hidden, section] });
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const order = [...(custom.sectionOrder || DEFAULT_CUSTOMIZATION.sectionOrder)];
    if (direction === 'up' && index > 0) {
      const temp = order[index - 1];
      order[index - 1] = order[index];
      order[index] = temp;
      updateSettings({ sectionOrder: order });
    } else if (direction === 'down' && index < order.length - 1) {
      const temp = order[index + 1];
      order[index + 1] = order[index];
      order[index] = temp;
      updateSettings({ sectionOrder: order });
    }
  };

  const order = custom.sectionOrder || DEFAULT_CUSTOMIZATION.sectionOrder;
  const hidden = custom.hiddenSections || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#0F172A]">Appearance & Layout</h2>
          <p className="text-xs text-[#64748B] mt-1">Customize typography, colors, and structure.</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-5">
        {/* Font Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#334155] flex items-center gap-1.5">
            <Type className="w-4 h-4 text-[#64748B]" /> Font Family
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {FONTS.map(f => (
              <button
                key={f.id}
                onClick={() => updateSettings({ font: f.id })}
                className={`py-2 px-3 text-sm rounded-lg border transition-all \${custom.font === f.id ? 'border-[#0F172A] bg-[#0F172A] text-white' : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#CBD5E1]'}`}
                style={{ fontFamily: f.family }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#334155] flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-[#64748B]" /> Accent Color
          </label>
          <div className="flex items-center gap-3">
            {COLORS.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  onChange({ ...data, accentColor: c.hex });
                }}
                className={`w-8 h-8 rounded-full border-2 transition-transform \${data.accentColor === c.hex || (!data.accentColor && c.id === 'blue') ? 'border-[#0F172A] scale-110' : 'border-transparent hover:scale-105'}`}
                style={{ backgroundColor: c.hex }}
                title={c.label}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Spacing */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#334155] flex items-center gap-1.5">
              <Minimize className="w-4 h-4 text-[#64748B]" /> Spacing
            </label>
            <div className="flex rounded-lg overflow-hidden border border-[#E2E8F0] p-0.5 bg-[#F8FAFC]">
              {SPACINGS.map(s => (
                <button
                  key={s.id}
                  onClick={() => updateSettings({ spacing: s.id })}
                  className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors \${custom.spacing === s.id ? 'bg-white shadow-sm border border-[#E2E8F0] text-[#0F172A]' : 'text-[#64748B] hover:text-[#334155]'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Page Size */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#334155] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#64748B]" /> Page Size
            </label>
            <div className="flex rounded-lg overflow-hidden border border-[#E2E8F0] p-0.5 bg-[#F8FAFC]">
              {PAGE_SIZES.map(s => (
                <button
                  key={s.id}
                  onClick={() => updateSettings({ pageSize: s.id })}
                  className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-colors \${custom.pageSize === s.id ? 'bg-white shadow-sm border border-[#E2E8F0] text-[#0F172A]' : 'text-[#64748B] hover:text-[#334155]'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section Order & Visibility */}
        <div className="space-y-3 pt-2 border-t border-[#E5E7EB]">
          <label className="text-xs font-bold text-[#334155] flex items-center gap-1.5">
            <Layout className="w-4 h-4 text-[#64748B]" /> Section Order & Visibility
          </label>
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden divide-y divide-[#F1F5F9]">
            {order.map((section, idx) => {
              const isHidden = hidden.includes(section);
              return (
                <div key={section} className={`flex items-center justify-between p-2.5 transition-colors ${isHidden ? 'bg-[#F8FAFC] opacity-60' : ''}`}>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-0.5 mr-1">
                      <button 
                        onClick={() => moveSection(idx, 'up')}
                        disabled={idx === 0}
                        className="text-[#94A3B8] hover:text-[#0F172A] disabled:opacity-30 disabled:hover:text-[#94A3B8]"
                      >
                        <GripVertical className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => moveSection(idx, 'down')}
                        disabled={idx === order.length - 1}
                        className="text-[#94A3B8] hover:text-[#0F172A] disabled:opacity-30 disabled:hover:text-[#94A3B8]"
                      >
                        <GripVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-[#334155]">
                      {SECTION_NAMES[section] || section}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSectionVisibility(section)}
                    className="p-1.5 rounded-md hover:bg-[#F1F5F9] text-[#64748B] transition-colors"
                  >
                    {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
