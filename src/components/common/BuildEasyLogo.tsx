import React from 'react';

interface BuildEasyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isDark?: boolean;
}

export default function BuildEasyLogo({
  className = '',
  size = 'md',
  isDark = false,
}: BuildEasyLogoProps) {
  // Desktop target ~20px, Mobile target ~17px
  const sizeClasses = {
    sm: 'text-[16px] sm:text-[17px]',
    md: 'text-[17px] sm:text-[19px] md:text-[20px]',
    lg: 'text-[22px] sm:text-[24px]',
  }[size];

  const colorClass = isDark ? 'text-white' : 'text-[#111111]';

  return (
    <span
      className={`inline-flex items-baseline font-sans leading-none select-none tracking-[-0.5px] ${colorClass} ${sizeClasses} ${className}`}
      style={{ letterSpacing: '-0.5px' }}
    >
      <span className="font-normal sm:font-medium">Build</span>
      <span className="font-bold sm:font-extrabold tracking-[-0.5px]">Easy</span>
    </span>
  );
}
