import React from 'react';
import { TabType } from '../FormBuilder';

interface StepProgressIndicatorProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  completedTabs?: string[];
}

export const BUILDER_STEPS: { id: TabType; label: string; stepNumber: number }[] = [
  { id: 'basic', label: 'Basic Info', stepNumber: 1 },
  { id: 'experience', label: 'Experience', stepNumber: 2 },
  { id: 'education', label: 'Education', stepNumber: 3 },
  { id: 'projects', label: 'Projects', stepNumber: 4 },
  { id: 'skills', label: 'Skills', stepNumber: 5 },
  { id: 'customSections', label: 'Additional', stepNumber: 6 },
];

export default function StepProgressIndicator({
  currentTab,
  onSelectTab,
}: StepProgressIndicatorProps) {
  const currentStepIndex = BUILDER_STEPS.findIndex(s => s.id === currentTab);
  const currentStep = BUILDER_STEPS[currentStepIndex] || BUILDER_STEPS[0];
  const progressPercent = Math.round(((Math.max(0, currentStepIndex) + 1) / BUILDER_STEPS.length) * 100);

  return (
    <div className="space-y-3 pb-3 border-b border-[#E5E7EB]">
      {/* Top summary row */}
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#111827]">
            Step {currentStep.stepNumber} of {BUILDER_STEPS.length}
          </span>
          <span className="text-[#9CA3AF]">•</span>
          <span className="font-semibold text-[#4B5563]">{currentStep.label}</span>
        </div>
        <span className="text-[11px] font-semibold text-[#6B7280]">
          {progressPercent}% Complete
        </span>
      </div>

      {/* Thin progress bar */}
      <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0F172A] transition-all duration-200 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Horizontal pill tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
        {BUILDER_STEPS.map((step, idx) => {
          const isActive = step.id === currentTab;
          const isPassed = idx < currentStepIndex;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectTab(step.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#111827] text-white'
                  : isPassed
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {step.stepNumber}. {step.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
