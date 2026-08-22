import React, { useState } from 'react';
import { PortfolioData, TemplateId, INITIAL_PORTFOLIO_DATA } from '../../types';
import { TEMPLATE_LIST } from '../ChangeTemplateModal';
import TemplatePreview from '../common/TemplatePreview';
import Footer from '../common/Footer';
import LottieAnimation from '../common/LottieAnimation';
import HowItWorksSection from '../sections/HowItWorksSection';
import MeetBuildEasySection from '../sections/MeetBuildEasySection';
import FeaturesSection from '../sections/FeaturesSection';
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
  const sampleData = INITIAL_PORTFOLIO_DATA;

  return (
    <div className="w-full bg-[#F7F8F9] flex flex-col items-center">
      
      {/* 1. Hero Section */}
      <section className="w-full max-w-[1440px] px-6 py-24 md:py-32 flex flex-col items-center text-center overflow-x-clip">
        <div className="relative inline-block w-full max-w-2xl lg:max-w-3xl">
          {/* Left Decorative Illustration (Game Controller) */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-28 lg:-left-32 xl:-left-44 2xl:-left-52 w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 pointer-events-none z-0 items-center justify-center">
            <LottieAnimation
              src="https://lottie.host/041ccc7b-50a0-4fbe-b08b-1e4209d942f1/ksXSV3jbpA.lottie"
              className="w-full h-full"
            />
          </div>

          {/* Right Decorative Illustration (Hand) - Scaled ~15-20% larger */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-28 lg:-right-32 xl:-right-44 2xl:-right-52 w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 pointer-events-none z-0 items-center justify-center">
            <LottieAnimation
              src="https://lottie.host/3b98004d-392d-422c-a2a1-2df5be91ed6d/1W8d4j3OUp.lottie"
              className="w-full h-full"
            />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-[#111827] mb-6 tracking-tight leading-[1.1] relative z-10">
            Your experience.<br />Beautifully presented.
          </h1>
        </div>
        <p className="text-lg md:text-xl text-[#4B5563] mb-10 leading-relaxed max-w-2xl">
          Craft a resume that reflects your professional caliber. High-end editorial design meets intuitive building, ensuring your career history stands out with clarity and confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 relative">
          <button
            onClick={() => onStartBuilder()}
            className="h-12 px-8 rounded-lg bg-[#111111] text-white font-semibold hover:bg-[#222222] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto relative z-10"
          >
            <span>{hasResumeData ? 'Go to Builder' : 'Create My Resume'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#templates"
            className="h-12 px-8 rounded-lg bg-white border border-[#E5E7EB] text-[#111827] font-semibold hover:bg-[#F9FAFB] transition-colors flex items-center justify-center w-full sm:w-auto relative z-10"
          >
            Explore Templates
          </a>
        </div>
        
        {/* Hero Image (Cascading resumes) */}
        <div className="relative w-full max-w-5xl h-[480px] md:h-[650px] flex justify-center items-center mt-8 pointer-events-none">
            <div className="absolute top-16 left-1/2 -translate-x-[112%] md:-translate-x-[120%] w-[240px] sm:w-[300px] md:w-[360px] aspect-[816/1056] transform -rotate-6 opacity-75 shadow-2xl rounded-xl overflow-hidden border border-gray-200 bg-white z-0">
              <TemplatePreview data={{...sampleData, templateId: 'modern'}} fitMode="contain" safeArea={true} className="w-full h-full" />
            </div>
            <div className="absolute top-16 left-1/2 translate-x-[12%] md:translate-x-[20%] w-[240px] sm:w-[300px] md:w-[360px] aspect-[816/1056] transform rotate-6 opacity-75 shadow-2xl rounded-xl overflow-hidden border border-gray-200 bg-white z-0">
              <TemplatePreview data={{...sampleData, templateId: 'executive'}} fitMode="contain" safeArea={true} className="w-full h-full" />
            </div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] aspect-[816/1056] shadow-2xl rounded-xl overflow-hidden border border-gray-300 bg-white">
              <TemplatePreview data={{...sampleData, templateId: 'minimal'}} fitMode="contain" safeArea={true} className="w-full h-full" />
            </div>
        </div>
      </section>

      {/* 2. How it works */}
      <HowItWorksSection />

      {/* 3. Meet BuildEasy */}
      <MeetBuildEasySection />

      {/* 4. Templates */}
      <section id="templates" className="w-full bg-white py-24 px-6 border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-between items-end w-full mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl text-[#111827] mb-4">Templates for every kind of career.</h2>
              <p className="text-lg text-[#4B5563]">
                Choose a professionally designed layout and make it your own. Switch anytime without losing data.
              </p>
            </div>
            <button 
              onClick={() => onStartBuilder('minimal')}
              className="text-[#111827] font-semibold border-b border-[#111827] pb-1 hover:text-[#4B5563] hover:border-[#4B5563] transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Start with Default (Minimal) <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATE_LIST.map((tpl) => (
              <div key={tpl.id} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#111111] hover:shadow-lg transition-all flex flex-col group cursor-pointer" onClick={() => onStartBuilder(tpl.id)}>
                <div className="bg-[#F9FAFB] p-8 flex justify-center border-b border-[#E5E7EB]">
                  <div className="w-full max-w-[220px] aspect-[1/1.29] rounded shadow-sm bg-white overflow-hidden pointer-events-none group-hover:scale-[1.02] transition-transform">
                    <TemplatePreview data={{...sampleData, templateId: tpl.id}} fitMode="contain" safeArea={true} className="w-full h-full" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#111827] text-lg">{tpl.name}</h3>
                      <span className="text-[10px] font-bold bg-[#F3F4F6] text-[#4B5563] px-2 py-1 rounded">{tpl.category || 'Professional'}</span>
                    </div>
                    <p className="text-sm text-[#6B7280] line-clamp-2">{tpl.description}</p>
                  </div>
                  <div className="mt-6 bg-[#F3F4F6] group-hover:bg-[#E5E7EB] text-[#111827] text-sm font-semibold py-2.5 rounded-lg flex justify-center items-center gap-2 transition-colors">
                    Use Template <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Features */}
      <FeaturesSection />

      {/* 7. CTA Banner */}
      <section className="w-full bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto bg-[#F4EBE3] rounded-3xl p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden shadow-sm">
          {/* Lottie Animation: Smooth document builder / presentation */}
          <div className="mb-8 w-28 h-28 sm:w-32 sm:h-32 relative flex items-center justify-center">
            <LottieAnimation
              src="https://lottie.host/b4b07c81-fde7-4633-b494-f68345f9825c/jNZkHulCOq.lottie"
              className="w-full h-full"
            />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#111827] mb-6 leading-tight max-w-xl">
            Build a resume you're proud to send.
          </h2>
          <p className="text-lg text-[#111827] opacity-80 mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands of professionals who have elevated their career presentation with our editorial design tools.
          </p>
          <button
            onClick={() => onStartBuilder()}
            className="px-8 py-3.5 rounded-lg bg-[#111111] text-white font-bold hover:bg-[#222222] transition-colors flex items-center gap-3 text-[15px]"
          >
            <span>{hasResumeData ? 'Go to Builder' : 'Create My Resume'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
