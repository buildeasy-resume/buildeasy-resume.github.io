import React, { useState, useMemo } from 'react';
import { TemplateId, TemplateCategory, INITIAL_PORTFOLIO_DATA, PortfolioData } from '../../types';
import SelectableCard from '../common/SelectableCard';
import PillButton from '../common/PillButton';
import TemplatePreview from '../common/TemplatePreview';
import { ArrowRight, ArrowLeft, Sparkles, Filter } from 'lucide-react';

interface ScreenTemplateSelectProps {
  selectedTemplate: TemplateId | null;
  onSelectTemplate: (templateId: TemplateId) => void;
  onContinue: () => void;
  onLoadSampleData?: () => void;
}

interface TemplateItem {
  id: TemplateId;
  title: string;
  category: 'professional' | 'modern' | 'academic' | 'compact';
  categoryLabel: string;
  badge?: string;
  description: string;
}

export default function ScreenTemplateSelect({
  selectedTemplate,
  onSelectTemplate,
  onContinue,
  onLoadSampleData,
}: ScreenTemplateSelectProps) {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');

  const categories: { id: TemplateCategory; label: string }[] = [
    { id: 'all', label: 'All Templates' },
    { id: 'professional', label: 'Professional' },
    { id: 'modern', label: 'Modern' },
    { id: 'academic', label: 'Academic' },
    { id: 'compact', label: 'Compact' },
  ];

  const templates: TemplateItem[] = [
    {
      id: 'minimal',
      title: 'Minimal',
      category: 'professional',
      categoryLabel: 'Professional',
      badge: 'POPULAR',
      description: 'Clean, text-first layout with high readability',
    },
    {
      id: 'executive',
      title: 'Executive',
      category: 'professional',
      categoryLabel: 'Professional',
      badge: 'LEADERSHIP',
      description: 'Corporate typography and clear experience hierarchy',
    },
    {
      id: 'modern',
      title: 'Modern',
      category: 'modern',
      categoryLabel: 'Modern',
      badge: 'CONTEMPORARY',
      description: 'Subtle accents and modern typography',
    },
    {
      id: 'academic',
      title: 'Academic',
      category: 'academic',
      categoryLabel: 'Academic',
      badge: 'EDUCATION 1ST',
      description: 'Education-forward CV ordering, dense research layout',
    },
    {
      id: 'classic',
      title: 'Classic',
      category: 'professional',
      categoryLabel: 'Professional',
      badge: 'TRADITIONAL',
      description: 'Traditional resume with strong horizontal rules',
    },
    {
      id: 'compact',
      title: 'Compact',
      category: 'compact',
      categoryLabel: 'Compact',
      badge: 'DENSE 1-PAGE',
      description: 'Tight spacing, reduced gaps, maximum content per page',
    }
  ];

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === 'all') return templates;
    return templates.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F5F7FA] px-4 py-8 md:py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Title and Intro */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#475569] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0F172A]" />
            <span>Step 1: Choose Your Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Select a Resume Template
          </h1>
          <p className="text-sm text-[#6B7280] max-w-2xl leading-relaxed">
            All 6 templates are 100% deterministic, professionally designed, and consume the exact same structured data. You can switch layouts at any time without losing your content.
          </p>
        </div>

        {/* Category Filter Tabs (Pill-style row) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 no-scrollbar select-none border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1 text-xs font-bold text-[#6B7280] mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? templates.length 
              : templates.filter(t => t.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full shrink-0 transition-all border ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-2xs'
                    : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F9FAFB] hover:text-[#111827]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
          {filteredTemplates.map((tpl) => {
            const previewData: PortfolioData = {
              ...INITIAL_PORTFOLIO_DATA,
              templateId: tpl.id,
            };

            return (
              <SelectableCard
                key={tpl.id}
                id={`template-card-${tpl.id}`}
                selected={selectedTemplate === tpl.id}
                onClick={() => onSelectTemplate(tpl.id)}
                title={tpl.title}
                badge={tpl.badge}
                description={tpl.description}
                thumbnail={
                  <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
                    <TemplatePreview
                      data={previewData}
                      fitMode="contain"
                      className="w-full h-full"
                    />
                  </div>
                }
              />
            );
          })}
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center gap-3">
          <PillButton
            variant="secondary"
            disabled={true}
            iconLeft={<ArrowLeft className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Back
          </PillButton>

          {onLoadSampleData && (
            <button
              type="button"
              onClick={onLoadSampleData}
              className="text-xs font-semibold text-[#6B7280] hover:text-[#111827] hover:underline"
            >
              Load Sample Profile
            </button>
          )}

          <PillButton
            variant="primary"
            disabled={!selectedTemplate}
            onClick={onContinue}
            iconRight={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Start Building
          </PillButton>
        </div>

      </div>
    </div>
  );
}
