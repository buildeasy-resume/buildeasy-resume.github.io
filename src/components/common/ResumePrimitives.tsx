import React from 'react';

export const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string; themeColor?: string; titleClassName?: string; style?: React.CSSProperties }> = ({ title, children, className = '', themeColor = '#111827', titleClassName = 'text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1', style }) => (
  <section className={`space-y-2 ${className}`} style={style}>
    <h2 className={titleClassName} style={{ color: themeColor }}>
      {title}
    </h2>
    <div className="pt-1">{children}</div>
  </section>
);

export const EntryHeader = ({ left, right, rightClassName = 'text-[9.5pt] text-gray-500 font-medium shrink-0 ml-2 bg-gray-50 px-2 py-0.5 rounded' }: { left: React.ReactNode; right?: React.ReactNode; rightClassName?: string }) => (
  <div className="flex justify-between items-baseline">
    {left}
    {right && <span className={rightClassName}>{right}</span>}
  </div>
);

export const EntryBullets = ({ bullets, className = "list-disc list-outside ml-5 space-y-1.5 text-[10pt] text-gray-700 leading-relaxed mt-1" }: { bullets: string[], className?: string }) => (
  <ul className={className}>
    {bullets.map((bullet, idx) => (
      <li key={`bullet-${bullet.slice(0, 30).trim()}-${idx}`}>{bullet}</li>
    ))}
  </ul>
);
