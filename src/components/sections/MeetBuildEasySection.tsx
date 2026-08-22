import React from 'react';
import { ArrowLeft, LayoutTemplate, FileCode, Check } from 'lucide-react';
import TemplatePreview from '../common/TemplatePreview';
import CompactBuilderMockup from '../mockups/CompactBuilderMockup';
import { INITIAL_PORTFOLIO_DATA } from '../../types';

export default function MeetBuildEasySection() {
  const sampleData = INITIAL_PORTFOLIO_DATA;

  return (
    <section className="w-full bg-[#F7F8F9] py-32 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Intro */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs font-bold tracking-widest text-[#6B7280] uppercase mb-4">THE BUILDEASY EDITOR</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#111827] mb-6">Meet BuildEasy</h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
            Everything you need to shape a polished resume, without getting lost in the process.
          </p>
        </div>

        {/* Product Showcase Window */}
        <div className="w-full max-w-[1200px] rounded-[24px] border border-[#E5E7EB] bg-white shadow-sm overflow-hidden flex flex-col mx-auto transition-transform duration-500 ease-out hover:shadow-md mb-24">
          
          {/* Fake Browser/App Header */}
          <div className="h-12 bg-white flex items-center px-4 justify-between border-b border-[#E5E7EB]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            </div>
            <div className="bg-[#F3F4F6] rounded-md text-[11px] text-gray-500 px-6 py-1.5 font-medium tracking-wide">
              buildeasy.app/builder
            </div>
            <div className="w-16"></div> {/* Spacer for symmetry */}
          </div>

          {/* Fake Toolbar */}
          <div className="h-14 bg-white border-b border-[#E5E7EB] px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 font-medium">
                <ArrowLeft className="w-4 h-4" /> Home
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-200"></div>
              <span className="font-bold text-sm text-[#111827]">My Resume</span>
              <span className="text-xs font-medium text-emerald-700 inline-flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Saved
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3 text-sm font-medium text-gray-600 border-r border-gray-200 pr-4">
                <span>Undo</span>
                <span>Redo</span>
              </div>
              <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-semibold border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <LayoutTemplate className="w-4 h-4" />
                Templates
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-sm font-bold rounded-md hover:bg-gray-800 transition-colors">
                <FileCode className="w-4 h-4" />
                <span className="hidden sm:inline">Preview & Export</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </div>

          {/* Main App Area */}
          <div className="flex flex-col md:flex-row min-h-[500px] md:h-[650px]">
            {/* Left Builder Panel */}
            <div className="w-full md:w-[380px] border-b md:border-b-0 md:border-r border-[#E5E7EB] bg-white p-4 md:p-6 overflow-y-auto shrink-0 flex flex-col gap-4">
              <CompactBuilderMockup className="w-full max-w-full shadow-none border-none" activeSection="experience" showReorder={false} />
            </div>

            {/* Right Preview Panel */}
            <div className="flex-1 bg-[#F9FAFB] p-6 md:p-10 flex justify-center items-center overflow-hidden relative">
              <div className="absolute left-0 top-1/3 -translate-x-1/2 w-8 h-8 bg-white border border-[#E5E7EB] rounded-full shadow-sm flex items-center justify-center text-gray-400 z-10 hidden md:flex">
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </div>
              
              <div className="w-full max-w-[420px] aspect-[1/1.29] shadow-lg border border-[#E5E7EB] rounded-sm pointer-events-none bg-white">
                <TemplatePreview data={{...sampleData, templateId: 'minimal'}} fitMode="contain" safeArea={true} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Statements */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider text-gray-400 mb-2">01</span>
            <h4 className="font-bold text-[#111827] text-lg mb-2">Everything in one place</h4>
            <p className="text-[#4B5563] leading-relaxed">Keep experience, education, projects, and skills together.</p>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider text-gray-400 mb-2">02</span>
            <h4 className="font-bold text-[#111827] text-lg mb-2">Reorder your story</h4>
            <p className="text-[#4B5563] leading-relaxed">Move sections into the order that fits your resume.</p>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider text-gray-400 mb-2">03</span>
            <h4 className="font-bold text-[#111827] text-lg mb-2">See every change</h4>
            <p className="text-[#4B5563] leading-relaxed">Edit on the left. See the finished document update instantly.</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
