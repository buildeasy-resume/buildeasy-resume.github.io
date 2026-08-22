import React from 'react';
import CompactBuilderMockup from '../mockups/CompactBuilderMockup';
import DesignControlsMockup from '../mockups/DesignControlsMockup';
import TemplatePreview from '../common/TemplatePreview';
import { INITIAL_PORTFOLIO_DATA } from '../../types';

interface FeaturesSectionProps {
  className?: string;
  hideTopBorder?: boolean;
}

export default function FeaturesSection({ className = '', hideTopBorder = false }: FeaturesSectionProps) {
  const sampleData = INITIAL_PORTFOLIO_DATA;

  return (
    <section id="features" className={`w-full bg-[#F7F8F9] py-12 md:py-20 px-6 ${hideTopBorder ? '' : 'border-t border-[#E5E7EB]'} ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Intro */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-bold tracking-widest text-[#6B7280] uppercase mb-3">BUILT FOR BETTER RESUMES</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#111827] mb-4">Everything you need.<br/>Nothing you don't.</h2>
          <p className="text-base md:text-lg text-[#4B5563] max-w-xl mx-auto leading-relaxed">
            Build, refine, and export your resume from one focused workspace.
          </p>
        </div>

        {/* Primary Feature */}
        <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 md:p-16 mb-6 flex flex-col md:flex-row items-center gap-8 md:gap-12 min-w-0">
          <div className="w-full md:w-1/2 flex flex-col min-w-0">
            <h3 className="font-serif text-3xl text-[#111827] mb-4">Build without the clutter</h3>
            <p className="text-[#4B5563] leading-relaxed text-lg">
              Keep every resume section in one compact workspace and expand only what you're editing.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center bg-[#F9FAFB] p-6 sm:p-8 rounded-xl border border-[#E5E7EB] min-w-0">
            <CompactBuilderMockup showReorder={true} className="max-w-sm" />
          </div>
        </div>

        {/* Secondary Features Row */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Card 1: Reorder your story */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col min-w-0">
            <h3 className="font-serif text-2xl text-[#111827] mb-3">Reorder your story</h3>
            <p className="text-[#4B5563] leading-relaxed mb-6 text-sm md:text-base">
              Move sections into the order that makes your experience read best.
            </p>
            <div className="flex-1 w-full bg-[#F9FAFB] p-5 sm:p-6 md:p-8 rounded-xl border border-[#E5E7EB] flex items-center justify-center min-w-0 overflow-hidden">
               <div className="w-full max-w-[520px] mx-auto min-w-0">
                 <CompactBuilderMockup className="w-full shadow-sm" showReorder={true} activeSection="projects" />
               </div>
            </div>
          </div>

          {/* Card 2: See it as you build */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col min-w-0">
            <h3 className="font-serif text-2xl text-[#111827] mb-3">See it as you build</h3>
            <p className="text-[#4B5563] leading-relaxed mb-6 text-sm md:text-base">
              Your resume updates alongside your edits, so formatting never becomes a guessing game.
            </p>
            <div className="flex-1 w-full bg-[#F9FAFB] p-5 sm:p-6 md:p-8 rounded-xl border border-[#E5E7EB] flex items-center justify-center min-w-0 overflow-hidden">
               <div className="w-full min-w-0 grid grid-cols-1 sm:grid-cols-[minmax(0,1.35fr)_minmax(120px,0.65fr)] gap-4 md:gap-6 items-center">
                 {/* Left: Design Controls */}
                 <div className="w-full min-w-0">
                   <DesignControlsMockup className="w-full shadow-sm" />
                 </div>
                 {/* Right: Resume Preview */}
                 <div className="w-full min-w-0 flex justify-center items-center">
                   <div className="w-[180px] sm:w-[200px] md:w-full max-w-[220px] aspect-[210/297] bg-white border border-[#E5E7EB] shadow-sm rounded-sm overflow-hidden pointer-events-none">
                     <TemplatePreview 
                       data={{...sampleData, templateId: 'modern'}} 
                       fitMode="contain" 
                       safeArea={true} 
                       className="w-full h-full" 
                     />
                   </div>
                 </div>
               </div>
            </div>
          </div>

        </div>

        {/* Feature List */}
        <div className="w-full max-w-4xl border-t border-[#E5E7EB] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <div className="flex gap-4 group">
              <span className="text-xs font-bold text-gray-400 mt-1">01</span>
              <div>
                <h4 className="font-bold text-[#111827] mb-1 group-hover:text-gray-600 transition-colors">Multiple templates</h4>
                <p className="text-sm text-[#4B5563]">Choose a layout that fits your experience.</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <span className="text-xs font-bold text-gray-400 mt-1">02</span>
              <div>
                <h4 className="font-bold text-[#111827] mb-1 group-hover:text-gray-600 transition-colors">A4 & Letter</h4>
                <p className="text-sm text-[#4B5563]">Build for the format you actually need.</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <span className="text-xs font-bold text-gray-400 mt-1">03</span>
              <div>
                <h4 className="font-bold text-[#111827] mb-1 group-hover:text-gray-600 transition-colors">PDF export</h4>
                <p className="text-sm text-[#4B5563]">Export your finished resume directly.</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <span className="text-xs font-bold text-gray-400 mt-1">04</span>
              <div>
                <h4 className="font-bold text-[#111827] mb-1 group-hover:text-gray-600 transition-colors">Autosave</h4>
                <p className="text-sm text-[#4B5563]">Your work stays available as you build.</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
