import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BuildEasyLogo from './BuildEasyLogo';
import { useResume } from '../../context/ResumeContext';

interface HeaderProps {
  currentScreen?: string;
  activeBuilderTab?: string;
  onNavigateHome?: () => void;
  onStartBuilder?: () => void;
  onReset?: () => void;
  hasResumeData?: boolean;
}

export default function Header({
  onNavigateHome,
  onStartBuilder,
  hasResumeData: hasResumeDataProp,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const resumeContext = useResume();

  const hasResumeData = hasResumeDataProp !== undefined ? hasResumeDataProp : resumeContext.hasResumeData;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLogoClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate('/');
    }
  };

  const handleBuilderClick = () => {
    if (onStartBuilder) {
      onStartBuilder();
    } else if (hasResumeData) {
      navigate('/builder');
    } else {
      navigate('/builder/start');
    }
  };

  return (
    <div className="w-full sticky top-0 z-50 shrink-0 select-none bg-white">
      {/* Top subtle accent border */}
      <div className="h-[2px] w-full bg-[#222222]" />

      {/* Main Header Bar */}
      <header
        id="main-app-header"
        className="w-full h-[56px] sm:h-[60px] md:h-[64px] bg-white border-b border-[#E7E7E7] px-4 sm:px-6 md:px-8"
      >
        <div className="w-full max-w-[1440px] mx-auto h-full flex items-center justify-between">
          
          {/* LEFT: Typographic BuildEasy Logo */}
          <div className="flex items-center shrink-0">
            <button
              id="header-logo-btn"
              onClick={handleLogoClick}
              className="flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2 rounded py-1 px-1 -ml-1 text-left transition-opacity hover:opacity-90"
              aria-label="BuildEasy Home"
            >
              <BuildEasyLogo size="md" />
            </button>
          </div>

          {/* CENTER: Main Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <nav className="flex items-center gap-5 lg:gap-8" aria-label="Main Navigation">
              <Link
                to="/builder"
                className="text-[13.5px] lg:text-[14px] font-medium text-[#555B65] hover:text-[#111111] transition-colors duration-150"
              >
                Resume Builder
              </Link>
              <Link
                to="/templates"
                className="text-[13.5px] lg:text-[14px] font-medium text-[#555B65] hover:text-[#111111] transition-colors duration-150"
              >
                Templates
              </Link>
              <Link
                to="/how-it-works"
                className="text-[13.5px] lg:text-[14px] font-medium text-[#555B65] hover:text-[#111111] transition-colors duration-150"
              >
                How It Works
              </Link>
              <Link
                to="/features"
                className="text-[13.5px] lg:text-[14px] font-medium text-[#555B65] hover:text-[#111111] transition-colors duration-150"
              >
                Features
              </Link>
              <Link
                to="/resume-tips"
                className="text-[13.5px] lg:text-[14px] font-medium text-[#555B65] hover:text-[#111111] transition-colors duration-150"
              >
                Resume Tips
              </Link>
            </nav>
          </div>

          {/* RIGHT: Primary Action */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-3">
              <button
                id="header-create-resume-btn"
                onClick={handleBuilderClick}
                className="h-[40px] px-5 rounded-[7px] bg-[#111111] text-white text-[13.5px] lg:text-[14px] font-semibold hover:bg-[#242424] hover:-translate-y-px transition-all duration-150 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#111111] focus:ring-offset-2"
              >
                <span>{hasResumeData ? 'Go to Builder' : 'Create My Resume'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Actions: Hamburger Menu */}
            <div className="flex md:hidden items-center gap-2">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#111111] hover:bg-[#F3F4F6] active:bg-[#E5E7EB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#111111] cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#111111]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#111111]" />
                )}
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white border-b border-[#E5E7EB] px-6 py-6 flex flex-col gap-4 shadow-md animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="flex flex-col space-y-2">
            <Link
              to="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2.5 px-3 text-[16px] font-medium text-[#111827] hover:bg-gray-50 rounded-lg transition-colors"
            >
              Resume Builder
            </Link>
            <Link
              to="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2.5 px-3 text-[16px] font-medium text-[#111827] hover:bg-gray-50 rounded-lg transition-colors"
            >
              Templates
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2.5 px-3 text-[16px] font-medium text-[#111827] hover:bg-gray-50 rounded-lg transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2.5 px-3 text-[16px] font-medium text-[#111827] hover:bg-gray-50 rounded-lg transition-colors"
            >
              Features
            </Link>
            <Link
              to="/resume-tips"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-2.5 px-3 text-[16px] font-medium text-[#111827] hover:bg-gray-50 rounded-lg transition-colors"
            >
              Resume Tips
            </Link>
          </div>

          <div className="pt-3 border-t border-[#F3F4F6]">
            <button
              id="mobile-drawer-create-resume-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                handleBuilderClick();
              }}
              className="w-full h-[48px] rounded-[7px] bg-[#111111] text-white text-[15px] font-semibold hover:bg-[#242424] active:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{hasResumeData ? 'Go to Builder' : 'Create My Resume'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
