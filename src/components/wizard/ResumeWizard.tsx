import React, { useState, useEffect } from 'react';
import { PortfolioData, TemplateId } from '../../types';
import WizardStepPersonal from './steps/WizardStepPersonal';
import WizardStepEducation from './steps/WizardStepEducation';
import WizardStepExperience from './steps/WizardStepExperience';
import WizardStepProjects from './steps/WizardStepProjects';
import WizardStepSkills from './steps/WizardStepSkills';
import WizardStepMore from './steps/WizardStepMore';
import WizardStepTemplate from './steps/WizardStepTemplate';
import BuildEasyLogo from '../common/BuildEasyLogo';
import { loadWizardDraft, persistWizardDraft, clearWizardDraft } from '../../lib/storage';
import { createBlankResume } from '../../lib/storage';
import { Check } from 'lucide-react';

const STEPS = [
  { name: 'Personal', id: 1 },
  { name: 'Education', id: 2 },
  { name: 'Experience', id: 3 },
  { name: 'Projects', id: 4 },
  { name: 'Skills', id: 5 },
  { name: 'More', id: 6 },
  { name: 'Template', id: 7 },
];

interface ResumeWizardProps {
  onComplete: (data: PortfolioData) => void;
  onExit: () => void;
  initialTemplateId?: TemplateId;
}

export default function ResumeWizard({ onComplete, onExit, initialTemplateId }: ResumeWizardProps) {
  const [data, setData] = useState<PortfolioData>(() => {
    const draft = loadWizardDraft();
    if (draft) {
      if (initialTemplateId) {
        draft.templateId = initialTemplateId;
      }
      return draft;
    }
    const blank = createBlankResume();
    if (initialTemplateId) {
      blank.templateId = initialTemplateId;
    }
    return blank;
  });

  const [step, setStep] = useState(1);
  const [validationWarning, setValidationWarning] = useState('');

  useEffect(() => {
    persistWizardDraft(data);
  }, [data]);

  const handleNext = () => {
    // Step validation checks
    if (step === 1) {
      if (!data.basicInfo?.name?.trim()) {
        setValidationWarning('Please provide your full name before continuing.');
        return;
      }
    }
    setValidationWarning('');

    if (step < STEPS.length) {
      setStep(step + 1);
    } else {
      clearWizardDraft();
      const defaultName = data.basicInfo.name ? `${data.basicInfo.name} — Resume` : 'My Resume';
      const finalData = {
        ...data,
        resumeName: data.resumeName === 'Untitled Resume' || !data.resumeName ? defaultName : data.resumeName,
      };
      onComplete(finalData);
    }
  };

  const handleBack = () => {
    setValidationWarning('');
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WizardStepPersonal data={data} onChange={setData} />;
      case 2:
        return <WizardStepEducation data={data} onChange={setData} />;
      case 3:
        return <WizardStepExperience data={data} onChange={setData} />;
      case 4:
        return <WizardStepProjects data={data} onChange={setData} />;
      case 5:
        return <WizardStepSkills data={data} onChange={setData} />;
      case 6:
        return <WizardStepMore data={data} onChange={setData} />;
      case 7:
        return <WizardStepTemplate data={data} onChange={setData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b px-8 py-4 flex justify-between items-center bg-white sticky top-0 z-10">
        <BuildEasyLogo size="md" />
        <button
          type="button"
          onClick={onExit}
          className="text-xs font-semibold text-gray-500 hover:text-black transition-colors cursor-pointer"
        >
          Save & Exit
        </button>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl w-full mx-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-8 flex-1">
        {/* Step Indicator Sidebar */}
        <div className="border-r pr-6 space-y-3 hidden md:block">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Steps</p>
          {STEPS.map((s) => {
            const isCompleted = step > s.id;
            const isCurrent = step === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  // Allow jumping to visited/completed steps
                  if (s.id <= step) {
                    setValidationWarning('');
                    setStep(s.id);
                  }
                }}
                className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                  isCurrent ? 'bg-gray-100 font-bold text-black' : isCompleted ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400 opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isCurrent
                      ? 'bg-black text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.id}
                </div>
                <span className="text-sm">{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="md:col-span-3 flex flex-col justify-between">
          <div>
            {validationWarning && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-lg">
                {validationWarning}
              </div>
            )}
            {renderStep()}
          </div>

          <div className="flex justify-between items-center mt-12 pt-6 border-t">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-2 rounded-lg border text-sm font-semibold transition-colors cursor-pointer ${
                step === 1 ? 'opacity-30 cursor-not-allowed border-gray-200' : 'hover:bg-gray-50 border-gray-300'
              }`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-black hover:bg-zinc-800 text-white px-8 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              {step === STEPS.length ? 'Open in Builder' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
