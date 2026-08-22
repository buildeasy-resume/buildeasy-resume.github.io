import React from 'react';

export interface SelectableCardProps {
  key?: React.Key;
  id?: string;
  selected?: boolean;
  onClick: () => void;
  badge?: string;
  badgeText?: string;
  thumbnail?: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  id,
  selected = false,
  onClick,
  badge,
  badgeText,
  thumbnail,
  icon,
  title,
  description,
  children,
  className = '',
}) => {
  const displayBadge = badge || badgeText;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      id={id}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`relative bg-white rounded-[14px] p-5 cursor-pointer flex flex-col justify-between transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-2 ${
        selected
          ? 'border-2 border-[#0F172A] shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
          : 'border border-[#E5E7EB] hover:border-[#CBD5E1] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
      } ${className}`}
    >
      {displayBadge && (
        <span className="absolute -top-3 left-5 px-2.5 py-0.5 bg-[#FCE7F3] text-[#BE185D] font-bold text-[10px] tracking-wider rounded-full uppercase border border-[#FBCFE8]">
          {displayBadge}
        </span>
      )}

      <div className="space-y-3">
        {thumbnail && (
          <div className="w-full h-44 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] p-1.5 overflow-hidden flex items-center justify-center">
            {thumbnail}
          </div>
        )}

        <div className="flex items-start gap-3">
          {icon && (
            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
              {icon}
            </div>
          )}
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#111827] leading-snug">{title}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">{description}</p>
          </div>
        </div>

        {children}
      </div>

      <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex justify-between items-center text-xs">
        <span className={`font-semibold ${selected ? 'text-[#0F172A]' : 'text-[#9CA3AF]'}`}>
          {selected ? '✓ Selected' : 'Click to select'}
        </span>
      </div>
    </div>
  );
};

export default SelectableCard;
