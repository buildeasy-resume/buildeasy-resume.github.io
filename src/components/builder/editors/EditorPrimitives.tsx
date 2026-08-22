import React, { useState } from 'react';
import { ChevronRight, Copy, Trash2, GripVertical, AlertCircle, Plus } from 'lucide-react';

export interface FormFieldProps {
  label: string;
  required?: boolean;
  recommended?: boolean;
  error?: string;
  tooltip?: string;
  children: React.ReactNode;
}

export function FormField({ label, required, recommended, error, tooltip, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#374151] flex items-center gap-1">
          {label}
          {required && <span className="text-rose-500 font-black">*</span>}
          {recommended && <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">Recommended</span>}
        </label>
        {tooltip && <span className="text-[10px] text-gray-400">{tooltip}</span>}
      </div>
      {children}
      {error && (
        <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

export interface AccordionEntryProps {
  title: string;
  subtitle?: string;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  children: React.ReactNode;
}

export function AccordionEntry({
  title,
  subtitle,
  isExpanded,
  onToggle,
  onDelete,
  onDuplicate,
  children,
}: AccordionEntryProps) {
  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center justify-between p-4 cursor-pointer hover:bg-[#F9FAFB] transition-colors ${
          isExpanded ? 'bg-[#F9FAFB] border-b border-[#E5E7EB]' : ''
        }`}
        onClick={onToggle}
      >
        <div className="flex flex-col flex-1 min-w-0 pr-4">
          <span className="text-sm font-bold text-[#111827] truncate">{title}</span>
          {subtitle && <span className="text-[11px] text-[#6B7280] font-medium mt-0.5 truncate">{subtitle}</span>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {onDuplicate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              className="p-1.5 text-[#6B7280] hover:bg-white hover:text-[#111827] rounded-md transition-colors"
              title="Duplicate"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 text-[#6B7280] hover:bg-rose-50 hover:text-rose-600 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-[#E5E7EB] mx-1" />
          <ChevronRight className={`w-4 h-4 text-[#9CA3AF] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
      {isExpanded && <div className="bg-white">{children}</div>}
    </div>
  );
}

export interface SectionHeaderProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  addLabel?: string;
}

export function SectionHeader({ title, description, onAdd, addLabel = 'Add' }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-xl font-bold text-[#111827]">{title}</h2>
        {description && <p className="text-xs text-[#6B7280] mt-0.5">{description}</p>}
      </div>
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="text-xs font-bold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> {addLabel}
        </button>
      )}
    </div>
  );
}
