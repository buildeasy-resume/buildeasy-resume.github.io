import React from 'react';
import { Link } from 'react-router-dom';
import BuildEasyLogo from './BuildEasyLogo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] shrink-0 select-none" id="site-footer">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-14 pb-8">
        
        {/* Top Footer Area */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
          
          {/* Left Column: Brand Statement */}
          <div className="max-w-[300px] flex flex-col gap-3">
            <Link to="/" aria-label="BuildEasy Home" className="inline-block">
              <BuildEasyLogo size="md" />
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Craft a resume that reflects your professional caliber. High-end editorial design meets intuitive building.
            </p>
          </div>

          {/* Right Section: Compact Links Grid (70-80% of width maximum on desktop) */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-12 md:gap-16 md:max-w-2xl">
            
            {/* Product Column */}
            <div className="min-w-[120px] flex flex-col gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-900 font-sans">Product</h4>
              <ul className="flex flex-col gap-2 text-xs text-gray-500">
                <li>
                  <Link to="/builder" className="hover:text-gray-900 transition-colors duration-150">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-gray-900 transition-colors duration-150">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="hover:text-gray-900 transition-colors duration-150">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="hover:text-gray-900 transition-colors duration-150">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="min-w-[120px] flex flex-col gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-900 font-sans">Resources</h4>
              <ul className="flex flex-col gap-2 text-xs text-gray-500">
                <li>
                  <Link to="/resume-tips" className="hover:text-gray-900 transition-colors duration-150">
                    Resume Tips
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-gray-900 transition-colors duration-150">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gray-900 transition-colors duration-150">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="min-w-[120px] flex flex-col gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-900 font-sans">Legal</h4>
              <ul className="flex flex-col gap-2 text-xs text-gray-500">
                <li>
                  <Link to="/privacy" className="hover:text-gray-900 transition-colors duration-150">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-gray-900 transition-colors duration-150">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Thin Divider Line */}
        <div className="h-px bg-gray-100 w-full mt-10 mb-5" />

        {/* Bottom Row Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-gray-400 font-sans">
          <span>© 2026 BuildEasy. All rights reserved.</span>
          <span className="sm:text-right">Designed with precision.</span>
        </div>

      </div>
    </footer>
  );
}
