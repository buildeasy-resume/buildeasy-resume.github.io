import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface PillButtonProps {
  variant?: ButtonVariant;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
}

export default function PillButton({
  variant = 'primary',
  iconLeft,
  iconRight,
  children,
  disabled = false,
  className = '',
  onClick,
  title,
  type = 'button',
  id,
}: PillButtonProps) {
  let baseStyles = "inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold rounded-full px-6 py-2.5 transition-all duration-150 ease-in-out select-none focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:ring-offset-2";

  if (disabled) {
    baseStyles += " bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed border border-transparent shadow-none";
  } else if (variant === 'primary') {
    baseStyles += " bg-[#0F172A] hover:bg-[#1E293B] active:bg-[#020617] text-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]";
  } else if (variant === 'secondary') {
    baseStyles += " bg-white hover:bg-[#F9FAFB] active:bg-[#F3F4F6] text-[#4B5563] hover:text-[#111827] border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
  } else if (variant === 'ghost') {
    baseStyles += " bg-transparent hover:bg-slate-100 text-[#4B5563] hover:text-[#111827]";
  }

  return (
    <button
      id={id}
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
