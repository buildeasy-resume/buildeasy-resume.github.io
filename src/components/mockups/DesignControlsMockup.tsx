import React from 'react';

export default function DesignControlsMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-4 flex flex-col gap-4 ${className}`}>
      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-3">
        <span className="font-semibold text-sm text-[#111827]">Design & Layout</span>
        <span className="text-[11px] font-semibold tracking-wider text-[#4B5563] uppercase inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          LIVE PREVIEW
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="border border-[#E5E7EB] rounded-lg p-3 bg-[#F9FAFB]">
          <div className="text-xs text-[#6B7280] mb-2 font-medium uppercase tracking-wider">Typography</div>
          <div className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded p-2">
            <span className="font-semibold text-sm font-serif">Merriweather</span>
            <span className="text-xs text-gray-400">Serif</span>
          </div>
        </div>
        <div className="border border-[#E5E7EB] rounded-lg p-3 bg-[#F9FAFB]">
          <div className="text-xs text-[#6B7280] mb-2 font-medium uppercase tracking-wider">Spacing</div>
          <div className="flex gap-2">
            <div className="flex-1 bg-white border border-[#E5E7EB] rounded p-1.5 text-center text-xs text-gray-500">Compact</div>
            <div className="flex-1 bg-[#111111] text-white border border-[#111111] rounded p-1.5 text-center text-xs font-medium">Balanced</div>
            <div className="flex-1 bg-white border border-[#E5E7EB] rounded p-1.5 text-center text-xs text-gray-500">Spacious</div>
          </div>
        </div>
        <div className="border border-[#E5E7EB] rounded-lg p-3 bg-[#F9FAFB]">
          <div className="text-xs text-[#6B7280] mb-2 font-medium uppercase tracking-wider">Document</div>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#111111] text-white border border-[#111111] rounded p-1.5 text-center text-xs font-medium">A4</div>
            <div className="flex-1 bg-white border border-[#E5E7EB] rounded p-1.5 text-center text-xs text-gray-500">US Letter</div>
          </div>
        </div>
      </div>
    </div>
  );
}
