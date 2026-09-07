import React from 'react';
import { GripVertical, ChevronRight, ChevronDown, User, Briefcase, GraduationCap, FolderDot, Wrench, Award, FileText } from 'lucide-react';

interface MockupProps {
  className?: string;
  activeSection?: string;
  showReorder?: boolean;
}

export default function CompactBuilderMockup({ className = '', activeSection, showReorder }: MockupProps) {
  const sections = [
    { id: 'personal', title: 'Personal Information', icon: User, meta: 'Complete' },
    { id: 'experience', title: 'Work Experience', icon: Briefcase, meta: '2 roles', activeContent: true },
    { id: 'education', title: 'Education', icon: GraduationCap, meta: '1 entry' },
    { id: 'projects', title: 'Projects', icon: FolderDot, meta: '2 projects' },
    { id: 'skills', title: 'Skills', icon: Wrench, meta: '17 skills' },
    { id: 'certifications', title: 'Certifications & Additional', icon: Award, meta: '2 items' },
  ];

  return (
    <div className={`w-full bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col ${className}`}>
      <div className="h-10 bg-[#F9FAFB] border-b border-[#E5E7EB] px-3 flex items-center">
        <span className="text-[10px] font-bold tracking-widest text-[#6B7280] uppercase">CONTENT</span>
      </div>
      <div className="p-3 flex flex-col gap-2">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <div key={sec.id} className="flex flex-col">
              <div className={`border rounded-lg p-3 flex justify-between items-center transition-colors ${isActive ? 'border-[#111111] bg-[#111111] text-white shadow-sm' : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]'}`}>
                <div className="flex items-center gap-3">
                  <GripVertical className={`w-4 h-4 ${isActive ? 'text-gray-400' : 'text-gray-300'} ${!showReorder && !isActive ? 'hidden' : ''}`} />
                  <sec.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="text-sm font-medium">{sec.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  {!isActive && <span className="text-xs text-gray-500">{sec.meta}</span>}
                  {showReorder && !isActive ? (
                    <div className="flex flex-col gap-0.5 opacity-50">
                      <ChevronDown className="w-3 h-3 rotate-180" />
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  ) : isActive ? (
                    <ChevronDown className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
              {isActive && sec.activeContent && (
                <div className="mt-2 border border-[#E5E7EB] rounded-lg bg-white overflow-hidden text-sm ml-7">
                  <div className="p-2 border-b border-[#E5E7EB] font-semibold bg-[#F9FAFB]">Staff Software Engineer</div>
                  <div className="p-2 border-b border-[#E5E7EB] text-gray-600 text-xs">Linear Dynamics</div>
                  <div className="p-3 text-gray-500 text-xs leading-relaxed bg-[#F9FAFB]/50">
                    • Architected real-time collaboration canvas supporting 50k+ daily concurrent users...
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
