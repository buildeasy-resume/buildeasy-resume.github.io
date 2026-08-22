const fs = require('fs');

const code = `import React, { useState } from 'react';
import { PortfolioData, TemplateId, INITIAL_PORTFOLIO_DATA } from '../../types';
import { TEMPLATE_LIST } from '../ChangeTemplateModal';
import ScaledResumePreview from '../common/ScaledResumePreview';
import { 
  ArrowRight, 
  Layers, 
  Eye, 
  Download, 
  User, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck,
  FileText,
  Upload
} from 'lucide-react';

interface ScreenHomeProps {
  onStartBuilder: (templateId?: TemplateId) => void;
  hasResumeData?: boolean;
}

export default function ScreenHome({ onStartBuilder, hasResumeData }: ScreenHomeProps) {
  const [mockupActiveTab, setMockupActiveTab] = useState<'editor' | 'preview'>('preview');
  const sampleData = INITIAL_PORTFOLIO_DATA;

  return (
    <div className="w-full bg-[#F7F8F9] relative flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-5xl md:text-6xl text-[#111827] mb-6 tracking-tight">
          Craft your professional resume.
        </h1>
        <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
          Select a template and start building an elegant, ATS-friendly resume in minutes.
        </p>
        <button
          onClick={() => onStartBuilder('minimal')}
          className="px-8 py-3.5 rounded-lg bg-[#111111] text-white font-semibold hover:bg-[#222222] transition-colors flex items-center gap-2 mx-auto"
        >
          <span>{hasResumeData ? 'Go to Builder' : 'Create My Resume'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATE_LIST.map((tpl) => (
          <div key={tpl.id} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#111111] hover:shadow-lg transition-all flex flex-col group cursor-pointer" onClick={() => onStartBuilder(tpl.id)}>
            <div className="bg-[#F3F4F6] p-6 flex justify-center border-b border-[#E5E7EB]">
              <div className="w-full max-w-[200px] aspect-[1/1.32] rounded shadow-sm bg-white overflow-hidden pointer-events-none group-hover:scale-[1.02] transition-transform">
                <ScaledResumePreview data={{...sampleData, templateId: tpl.id}} pageWidth={816} className="w-full h-full" />
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#111827] text-lg mb-1">{tpl.name}</h3>
                <p className="text-sm text-[#6B7280]">{tpl.description}</p>
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold text-[#111827]">
                Use Template <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/screens/ScreenHome.tsx', code, 'utf-8');
console.log('Restored ScreenHome.tsx');
