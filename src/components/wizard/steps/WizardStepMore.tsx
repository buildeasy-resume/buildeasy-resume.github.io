import React from 'react';
import { PortfolioData } from '../../../types';
import { Check, Plus } from 'lucide-react';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

interface OptionalSection {
  id: string;
  name: string;
  desc: string;
}

const OPTIONAL_SECTIONS: OptionalSection[] = [
  { id: 'summary', name: 'Professional Summary', desc: 'A 2-3 sentence overview highlighting your core value proposition' },
  { id: 'certifications', name: 'Certifications', desc: 'AWS, Google Cloud, PMP, Scrums, or official industry certificates' },
  { id: 'achievements', name: 'Awards & Honors', desc: 'Hackathons, competitions, scholarships, or company recognitions' },
  { id: 'publications', name: 'Publications & Articles', desc: 'Academic papers, research works, Medium articles, or books' },
  { id: 'custom', name: 'Custom Section', desc: 'Any specialized category like Volunteering, Leadership, or Languages' },
];

export default function WizardStepMore({ data, onChange }: WizardStepProps) {
  const currentSections = data.customization?.sectionOrder || [];

  const toggleSection = (id: string) => {
    let newOrder = [...currentSections];
    if (newOrder.includes(id)) {
      newOrder = newOrder.filter((s) => s !== id);
    } else {
      newOrder.push(id);
    }
    onChange({
      ...data,
      customization: {
        ...data.customization!,
        sectionOrder: newOrder,
      },
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold text-[#111827] mb-2">Enhance your resume sections</h2>
      <p className="text-gray-500 mb-8">Select additional sections you'd like to include in your resume.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OPTIONAL_SECTIONS.map((sec) => {
          const isSelected = currentSections.includes(sec.id);
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => toggleSection(sec.id)}
              className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#111827] bg-[#F9FAFB] ring-1 ring-[#111827] shadow-xs'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-sm text-[#111827]">{sec.name}</h3>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isSelected ? 'bg-[#111827] text-white' : 'border border-gray-300 text-gray-400'
                  }`}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{sec.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
