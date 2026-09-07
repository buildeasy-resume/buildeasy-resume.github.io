import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, TemplateId, createBlankResume } from '../types';
import { loadPersistedResume, persistResumeData, clearAllStorage } from '../lib/storage';
import ConfirmModal from '../components/common/ConfirmModal';

interface ResumeContextType {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  hasResumeData: boolean;
  handleSelectTemplate: (templateId: TemplateId, accentColor?: string) => void;
  handleStartOverRequest: () => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(() => loadPersistedResume());
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Autosave resume data
  useEffect(() => {
    persistResumeData(data);
  }, [data]);

  const hasResumeData = Boolean(
    (data.experience && data.experience.length > 0) ||
    (data.education && data.education.length > 0) ||
    (data.skills && data.skills.length > 0) ||
    Boolean(data.basicInfo?.name?.trim())
  );

  const handleSelectTemplate = (templateId: TemplateId, accentColor?: string) => {
    setData((prev) => ({
      ...prev,
      templateId,
      ...(accentColor !== undefined ? { accentColor } : {}),
    }));
  };

  const handleStartOverRequest = () => {
    setIsResetConfirmOpen(true);
  };

  const resetResume = () => {
    clearAllStorage();
    setData(createBlankResume());
  };

  return (
    <ResumeContext.Provider
      value={{
        data,
        setData,
        hasResumeData,
        handleSelectTemplate,
        handleStartOverRequest,
        resetResume,
      }}
    >
      {children}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={() => {
          resetResume();
          setIsResetConfirmOpen(false);
        }}
        title="Start a new resume?"
        message="Your current resume will be cleared. This action cannot be undone."
        confirmText="Start New Resume"
        cancelText="Cancel"
        variant="danger"
      />
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
