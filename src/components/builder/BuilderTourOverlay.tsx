import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowLeft, X, Check, HelpCircle } from 'lucide-react';

export interface TourStep {
  id: string;
  targetSelector: string;
  title: string;
  text: string;
  detail?: string;
  tabRequired?: 'content' | 'design' | 'preview';
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    targetSelector: '[data-tour="builder-main"]',
    title: 'Welcome to BuildEasy',
    text: 'Everything you need to build your resume is organized here. You can edit each section, rearrange the order, customize the design, and see the result live.',
    tabRequired: 'content',
  },
  {
    id: 'section-list',
    targetSelector: '[data-tour="section-list"]',
    title: 'Your resume, organized',
    text: 'Your resume sections live here. Personal Information, Experience, Education, Projects, Skills, and more are all in one place.',
    detail: 'Click a section to open it and edit its content.',
    tabRequired: 'content',
  },
  {
    id: 'reorder',
    targetSelector: '[data-tour="section-reorder"]',
    title: 'Put sections wherever you want',
    text: 'Drag a section or use the arrows to change its position. Example: Skills above Experience. The change immediately appears in the resume preview.',
    tabRequired: 'content',
  },
  {
    id: 'expand',
    targetSelector: '[data-tour="section-expand"]',
    title: 'Keep your workspace compact',
    text: 'Click a section to expand its editor. Collapse it again when you are done. This keeps the builder clean even when your resume has many sections.',
    tabRequired: 'content',
  },
  {
    id: 'live-preview',
    targetSelector: '[data-tour="live-preview"]',
    title: 'See every change instantly',
    text: 'Your resume updates as you edit it, so you can see exactly how your final document will look in real time.',
  },
  {
    id: 'templates',
    targetSelector: '[data-tour="template-switcher"]',
    title: 'Change your template anytime',
    text: 'Try any of the six BuildEasy templates without losing your resume content.',
  },
  {
    id: 'customize',
    targetSelector: '[data-tour="customize"]',
    title: 'Make it yours',
    text: 'Adjust your resume\'s typography, spacing, colors, page size, and other available design settings.',
    tabRequired: 'design',
  },
  {
    id: 'preview',
    targetSelector: '[data-tour="preview"]',
    title: 'Check the final resume',
    text: 'Open the full preview to review your resume before exporting it.',
  },
  {
    id: 'download',
    targetSelector: '[data-tour="download"], [data-tour-download="true"]',
    title: 'Download your resume',
    text: 'When you\'re ready, download your finished resume as a PDF.',
  },
];

export const TOUR_STORAGE_KEY = 'buildeasy_builder_tour_completed';

interface BuilderTourOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onTabChange?: (tab: 'content' | 'design' | 'preview') => void;
}

export default function BuilderTourOverlay({
  isOpen,
  onClose,
  onTabChange,
}: BuilderTourOverlayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const currentStep = TOUR_STEPS[currentStepIndex];

  // Recalculate position for current step target
  const updateTargetPosition = useCallback(() => {
    if (!isOpen || !currentStep) return;

    if (currentStep.tabRequired && onTabChange) {
      onTabChange(currentStep.tabRequired);
    }

    const timer = setTimeout(() => {
      const el = document.querySelector(currentStep.targetSelector);
      if (el) {
        // Scroll into view if off screen
        const rect = el.getBoundingClientRect();
        const isOutOfView =
          rect.top < 0 ||
          rect.bottom > window.innerHeight ||
          rect.left < 0 ||
          rect.right > window.innerWidth;

        if (isOutOfView) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }

        // Re-measure after potential scroll
        setTimeout(() => {
          if (el) {
            setTargetRect(el.getBoundingClientRect());
          }
        }, 120);
      } else {
        // Fallback target: center of viewport
        setTargetRect(null);
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [isOpen, currentStepIndex, currentStep, onTabChange]);

  useEffect(() => {
    if (isOpen) {
      updateTargetPosition();
    }
  }, [isOpen, currentStepIndex, updateTargetPosition]);

  // Window resize & scroll listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (currentStep) {
        const el = document.querySelector(currentStep.targetSelector);
        if (el) {
          setTargetRect(el.getBoundingClientRect());
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isOpen, currentStep]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleSkip();
      } else if (e.key === 'ArrowRight') {
        if (currentStepIndex < TOUR_STEPS.length - 1) {
          e.preventDefault();
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentStepIndex > 0) {
          e.preventDefault();
          handleBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    try {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    } catch (err) {
      console.warn('Unable to write tour completion state to localStorage', err);
    }
    onClose();
  };

  const handleFinish = () => {
    try {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    } catch (err) {
      console.warn('Unable to write tour completion state to localStorage', err);
    }
    onClose();
  };

  // Calculate spotlight box coordinates
  const padding = 6;
  const spotlightStyle: React.CSSProperties = targetRect
    ? {
        top: Math.max(0, targetRect.top - padding),
        left: Math.max(0, targetRect.left - padding),
        width: targetRect.width + padding * 2,
        height: targetRect.height + padding * 2,
        borderRadius: 12,
        boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.65)',
      }
    : {
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.65)',
      };

  // Calculate smart popover position
  const getPopoverStyle = (): React.CSSProperties => {
    const popoverWidth = Math.min(window.innerWidth - 32, 350);
    const popoverHeight = 220; // Estimated max height

    if (!targetRect) {
      return {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: popoverWidth,
        zIndex: 9999,
      };
    }

    const spaceBelow = window.innerHeight - (targetRect.bottom + 16);
    const spaceAbove = targetRect.top - 16;
    const spaceRight = window.innerWidth - (targetRect.right + 16);

    let top = 0;
    let left = 0;

    // Desktop side placement if screen is wide and target is on left/right side
    if (window.innerWidth >= 1024 && (spaceRight >= popoverWidth || targetRect.left - 16 >= popoverWidth)) {
      if (spaceRight >= popoverWidth) {
        left = targetRect.right + 16;
        top = Math.max(16, targetRect.top + targetRect.height / 2 - popoverHeight / 2);
      } else {
        left = targetRect.left - popoverWidth - 16;
        top = Math.max(16, targetRect.top + targetRect.height / 2 - popoverHeight / 2);
      }
    } else {
      // Top or Bottom placement
      if (spaceBelow >= 200 || spaceBelow >= spaceAbove) {
        top = targetRect.bottom + 14;
      } else {
        top = targetRect.top - popoverHeight - 14;
      }

      // Center horizontally relative to target rect
      left = targetRect.left + targetRect.width / 2 - popoverWidth / 2;
    }

    // Clamp inside viewport boundaries
    top = Math.max(16, Math.min(top, window.innerHeight - popoverHeight - 16));
    left = Math.max(16, Math.min(left, window.innerWidth - popoverWidth - 16));

    return {
      position: 'fixed',
      top,
      left,
      width: popoverWidth,
      zIndex: 9999,
    };
  };

  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[9990] overflow-hidden pointer-events-auto select-none">
      {/* 1. Backdrop overlay with spotlight cutout */}
      <div
        className="fixed transition-all duration-300 ease-out border-2 border-white/90 pointer-events-none rounded-xl"
        style={spotlightStyle}
      />

      {/* Invisible backdrop click blocker to prevent editing while tour is open */}
      <div className="fixed inset-0 z-[9995] bg-transparent" />

      {/* 2. Tour Tooltip Popover Card */}
      <div
        ref={popoverRef}
        style={getPopoverStyle()}
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-[9999] transition-all duration-200 ease-out flex flex-col text-left"
        role="dialog"
        aria-labelledby="tour-step-title"
        aria-describedby="tour-step-text"
      >
        {/* Header row: title + step indicator + close button */}
        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-gray-700" />
              Builder Guide
            </span>
            <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
              {currentStepIndex + 1} of {TOUR_STEPS.length}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="text-xs text-gray-400 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            title="Close Guide (Esc)"
            aria-label="Close Guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Title & Description */}
        <h3 id="tour-step-title" className="text-base font-serif font-bold text-gray-900 leading-snug mb-1.5">
          {currentStep.title}
        </h3>
        
        <p id="tour-step-text" className="text-xs text-gray-600 leading-relaxed mb-2">
          {currentStep.text}
        </p>

        {currentStep.detail && (
          <p className="text-[11px] text-gray-500 font-medium italic bg-gray-50 p-2 rounded-lg border border-gray-100 mb-3">
            {currentStep.detail}
          </p>
        )}

        {/* Minimal Progress Dots */}
        <div className="flex items-center gap-1.5 my-3">
          {TOUR_STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStepIndex
                  ? 'w-6 bg-[#111827]'
                  : idx < currentStepIndex
                  ? 'w-1.5 bg-gray-400'
                  : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Footer controls: Back, Skip, Next / Finish */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
          <button
            type="button"
            onClick={handleSkip}
            className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Skip Tour
          </button>

          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="text-xs font-bold text-white bg-[#111827] hover:bg-black px-4 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
            >
              <span>{isLastStep ? 'Finish' : 'Next'}</span>
              {isLastStep ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
