import React from 'react';

interface FormFieldProps {
  label: string;
  badge?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({
  label,
  badge,
  error,
  helperText,
  required,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-[#374151] flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
        </label>
        {badge && (
          <span className="text-[10px] bg-[#FCE7F3] text-[#BE185D] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#FBCFE8]">
            {badge}
          </span>
        )}
      </div>

      {children}

      {error && (
        <p className="text-[11px] text-rose-600 font-medium">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-[11px] text-[#6B7280]">{helperText}</p>
      )}
    </div>
  );
}
