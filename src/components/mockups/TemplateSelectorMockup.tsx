import React from 'react';
import TemplatePreview from '../common/TemplatePreview';
import { INITIAL_PORTFOLIO_DATA } from '../../types';

export default function TemplateSelectorMockup({ className = '' }: { className?: string }) {
  const sampleData = INITIAL_PORTFOLIO_DATA;
  
  return (
    <div className={`w-full max-w-sm bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-4 flex flex-col gap-4 ${className}`}>
      <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
        <span className="font-semibold text-sm text-[#111827]">Select Template</span>
        <span className="text-xs font-medium text-[#6B7280]">6 styles</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="border-2 border-[#111111] rounded-lg p-1.5 bg-[#F9FAFB] relative shadow-sm">
          <div className="absolute top-2 right-2 w-4 h-4 bg-[#111111] rounded-full flex items-center justify-center z-10">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div className="w-full aspect-[1/1.29] rounded border border-[#E5E7EB] bg-white overflow-hidden pointer-events-none mb-2">
            <TemplatePreview data={{...sampleData, templateId: 'minimal'}} fitMode="contain" safeArea={true} className="w-full h-full" />
          </div>
          <div className="text-center text-xs font-semibold text-[#111827]">Minimal</div>
        </div>
        <div className="border border-[#E5E7EB] rounded-lg p-1.5 hover:border-[#D1D5DB] transition-colors cursor-pointer">
          <div className="w-full aspect-[1/1.29] rounded border border-[#E5E7EB] bg-white overflow-hidden pointer-events-none mb-2">
            <TemplatePreview data={{...sampleData, templateId: 'executive'}} fitMode="contain" safeArea={true} className="w-full h-full" />
          </div>
          <div className="text-center text-xs font-medium text-[#4B5563]">Executive</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-[#E5E7EB] rounded-lg p-1.5 hover:border-[#D1D5DB] transition-colors cursor-pointer">
          <div className="w-full aspect-[1/1.29] rounded border border-[#E5E7EB] bg-white overflow-hidden pointer-events-none mb-2">
            <TemplatePreview data={{...sampleData, templateId: 'modern'}} fitMode="contain" safeArea={true} className="w-full h-full" />
          </div>
          <div className="text-center text-xs font-medium text-[#4B5563]">Modern</div>
        </div>
        <div className="border border-[#E5E7EB] rounded-lg p-1.5 hover:border-[#D1D5DB] transition-colors cursor-pointer">
          <div className="w-full aspect-[1/1.29] rounded border border-[#E5E7EB] bg-white overflow-hidden pointer-events-none mb-2">
            <TemplatePreview data={{...sampleData, templateId: 'academic'}} fitMode="contain" safeArea={true} className="w-full h-full" />
          </div>
          <div className="text-center text-xs font-medium text-[#4B5563]">Academic</div>
        </div>
      </div>
    </div>
  );
}
