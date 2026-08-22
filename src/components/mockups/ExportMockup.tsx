import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ExportMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full max-w-sm bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-4 flex flex-col gap-4 ${className}`}>
      <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-3">
        <span className="font-semibold text-sm text-[#111827]">Preview & Export</span>
      </div>
      <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
        <div className="w-10 h-10 bg-white border border-[#E5E7EB] rounded flex items-center justify-center text-[#111827] font-bold text-xs shadow-sm">PDF</div>
        <div className="flex-1">
          <div className="font-semibold text-sm text-[#111827]">My_Resume.pdf</div>
          <div className="text-[10px] text-[#6B7280]">A4 Document • High-res print</div>
        </div>
        <div className="text-emerald-600"><CheckCircle2 className="w-5 h-5" /></div>
      </div>
      <button className="w-full bg-[#111111] text-white rounded-lg py-3.5 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#222222] transition-colors">
        Download PDF <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
