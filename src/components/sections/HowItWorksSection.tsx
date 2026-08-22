import React from 'react';
import TemplateSelectorMockup from '../mockups/TemplateSelectorMockup';
import CompactBuilderMockup from '../mockups/CompactBuilderMockup';
import DesignControlsMockup from '../mockups/DesignControlsMockup';
import ExportMockup from '../mockups/ExportMockup';

interface HowItWorksSectionProps {
  className?: string;
  hideTopBorder?: boolean;
}

export default function HowItWorksSection({ className = '', hideTopBorder = false }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className={`w-full bg-white py-12 md:py-20 px-6 ${hideTopBorder ? '' : 'border-t border-[#E5E7EB]'} ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-bold tracking-widest text-[#6B7280] uppercase mb-3">HOW IT WORKS</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#111827]">Build your resume in six simple steps.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-16 w-full items-center">
          
          {/* Step 1 */}
          <div className="order-2 md:order-1 flex flex-col justify-center max-w-md mx-auto md:mx-0">
             <div className="flex items-center gap-3 mb-4">
               <span className="text-xs font-bold px-2 py-1 bg-[#F3F4F6] rounded-full text-[#4B5563]">01</span>
             </div>
             <h3 className="font-serif text-3xl text-[#111827] mb-4">Choose a template</h3>
             <p className="text-[#4B5563] leading-relaxed">
               Start with one of six professionally designed resume templates. Pick a style that fits your experience and industry.
             </p>
          </div>
          <div className="order-1 md:order-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 md:p-8 flex justify-center items-center overflow-hidden">
             <TemplateSelectorMockup />
          </div>

          {/* Step 2 */}
          <div className="order-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 md:p-8 flex justify-center items-center overflow-hidden">
            <CompactBuilderMockup activeSection="experience" showReorder={true} />
          </div>
          <div className="order-4 flex flex-col justify-center max-w-md mx-auto md:mx-0">
             <div className="flex items-center gap-3 mb-4">
               <span className="text-xs font-bold px-2 py-1 bg-[#F3F4F6] rounded-full text-[#4B5563]">02</span>
             </div>
             <h3 className="font-serif text-3xl text-[#111827] mb-4">Build your resume</h3>
             <p className="text-[#4B5563] leading-relaxed">
               Edit everything in one place. Expand sections when you need them and reorder them to fit your story.
             </p>
          </div>

          {/* Step 3 */}
          <div className="order-6 md:order-5 flex flex-col justify-center max-w-md mx-auto md:mx-0">
             <div className="flex items-center gap-3 mb-4">
               <span className="text-xs font-bold px-2 py-1 bg-[#F3F4F6] rounded-full text-[#4B5563]">03</span>
             </div>
             <h3 className="font-serif text-3xl text-[#111827] mb-4">Customize and preview</h3>
             <p className="text-[#4B5563] leading-relaxed">
               Adjust the design while your finished resume updates instantly.
             </p>
          </div>
          <div className="order-5 md:order-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 md:p-8 flex justify-center items-center overflow-hidden">
            <DesignControlsMockup />
          </div>
          
          {/* Step 4 */}
          <div className="order-7 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 md:p-8 flex justify-center items-center overflow-hidden">
            <ExportMockup />
          </div>
          <div className="order-8 flex flex-col justify-center max-w-md mx-auto md:mx-0">
             <div className="flex items-center gap-3 mb-4">
               <span className="text-xs font-bold px-2 py-1 bg-[#F3F4F6] rounded-full text-[#4B5563]">04</span>
             </div>
             <h3 className="font-serif text-3xl text-[#111827] mb-4">Download your resume</h3>
             <p className="text-[#4B5563] leading-relaxed">
               Review the final document and download your PDF.
             </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
