import React from 'react';

export const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string; themeColor?: string; titleClassName?: string; style?: React.CSSProperties }> = ({ title, children, className = '', themeColor = '#111827', titleClassName = 'text-[11pt] font-bold uppercase tracking-wider border-b border-gray-200 pb-1', style }) => (
  <section className={`resume-section space-y-2 ${className}`} style={style}>
    <h2 className={titleClassName} style={{ color: themeColor }}>
      {title}
    </h2>
    <div className="pt-1">{children}</div>
  </section>
);

export const EntryHeader = ({ left, right, rightClassName = 'text-[9.5pt] text-gray-500 font-medium shrink-0 bg-gray-50 px-2 py-0.5 rounded' }: { left: React.ReactNode; right?: React.ReactNode; rightClassName?: string }) => (
  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 items-baseline mb-1">
    <div className="min-w-0 break-words overflow-wrap-anywhere">
      {left}
    </div>
    {right && <div className={`${rightClassName} whitespace-nowrap`}>{right}</div>}
  </div>
);

export const EntryBullets = ({ bullets, className = "resume-bullets space-y-1.5 text-[10pt] text-gray-700 leading-relaxed mt-1" }: { bullets: string[], className?: string }) => {
  const activeBullets = (bullets || []).filter((b) => typeof b === 'string' && b.trim().length > 0);
  if (activeBullets.length === 0) return null;
  return (
    <ul className={className}>
      {activeBullets.map((bullet, idx) => (
        <li key={`bullet-${idx}-${bullet.slice(0, 20).trim()}`} className="break-words">
          {bullet}
        </li>
      ))}
    </ul>
  );
};
