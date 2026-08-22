import React from 'react';
import { PortfolioData, TemplateId } from '../../../types';
import { TEMPLATE_LIST } from '../../ChangeTemplateModal';
import { Check } from 'lucide-react';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepTemplate({ data, onChange }: WizardStepProps) {
  const currentTemplate = data.templateId || 'minimal';

  const selectTemplate = (id: TemplateId) => {
    onChange({
      ...data,
      templateId: id,
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold text-[#111827] mb-2">Choose your design style</h2>
      <p className="text-gray-500 mb-8">Select a proven layout tailored for your industry. You can easily switch styles anytime.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {TEMPLATE_LIST.map((template) => {
          const isSelected = currentTemplate === template.id;
          return (
            <div
              key={template.id}
              onClick={() => selectTemplate(template.id)}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#111827] bg-white ring-2 ring-[#111827]/10 shadow-md scale-[1.02]'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs'
              }`}
            >
              {/* Minimal preview mockup */}
              <div className="h-36 bg-gray-50 rounded-lg border border-gray-100 p-3 mb-3 flex flex-col gap-2 overflow-hidden pointer-events-none">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="h-3 bg-gray-800 rounded w-1/3" />
                  <div className="h-2 bg-gray-300 rounded w-1/4" />
                </div>
                <div className="space-y-1 mt-1">
                  <div className="h-2 bg-gray-400 rounded w-1/2" />
                  <div className="h-1.5 bg-gray-200 rounded w-full" />
                  <div className="h-1.5 bg-gray-200 rounded w-5/6" />
                </div>
                <div className="space-y-1 mt-1">
                  <div className="h-2 bg-gray-400 rounded w-1/3" />
                  <div className="h-1.5 bg-gray-200 rounded w-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#111827]">{template.name}</h3>
                  <p className="text-[11px] text-gray-500 line-clamp-1">{template.description}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    isSelected ? 'bg-[#111827] text-white' : 'border border-gray-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
