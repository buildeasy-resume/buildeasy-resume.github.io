import React, { useState } from 'react';
import { PortfolioData } from '../../../types';
import { FormField } from './EditorPrimitives';
import { validateImageFile } from '../../../lib/utils';
import { Image as ImageIcon, Trash2, AlertCircle } from 'lucide-react';

interface BasicInfoEditorProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export default function BasicInfoEditor({ data, onChange }: BasicInfoEditorProps) {
  const [photoError, setPhotoError] = useState<string | null>(null);

  const updateBasic = (key: keyof PortfolioData['basicInfo'], value: string) => {
    onChange({
      ...data,
      basicInfo: {
        ...data.basicInfo,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E5E7EB] pb-3">
        <h2 className="text-xl font-bold text-[#111827]">Personal Information</h2>
        <p className="text-xs text-[#6B7280] mt-0.5">Your core contact and professional profile details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <FormField label="Full Name" required>
            <input
              type="text"
              value={data.basicInfo.name || ''}
              onChange={(e) => updateBasic('name', e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </FormField>
        </div>

        <div className="md:col-span-2">
          <FormField label="Professional Title" recommended tooltip="e.g. Senior Frontend Engineer">
            <input
              type="text"
              value={data.basicInfo.tagline || ''}
              onChange={(e) => updateBasic('tagline', e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </FormField>
        </div>

        <FormField label="Email" required>
          <input
            type="email"
            value={data.basicInfo.email || ''}
            onChange={(e) => updateBasic('email', e.target.value)}
            placeholder="jane@example.com"
            className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </FormField>

        <FormField label="Phone" recommended>
          <input
            type="tel"
            value={data.basicInfo.phone || ''}
            onChange={(e) => updateBasic('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </FormField>

        <div className="md:col-span-2">
          <FormField label="Location" recommended tooltip="City, State / Remote">
            <input
              type="text"
              value={data.basicInfo.location || ''}
              onChange={(e) => updateBasic('location', e.target.value)}
              placeholder="San Francisco, CA (or Remote)"
              className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </FormField>
        </div>

        <FormField label="Personal Website">
          <input
            type="url"
            value={data.basicInfo.website || ''}
            onChange={(e) => updateBasic('website', e.target.value)}
            placeholder="https://janedoe.dev"
            className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </FormField>

        <FormField label="LinkedIn Profile">
          <input
            type="url"
            value={data.basicInfo.linkedin || ''}
            onChange={(e) => updateBasic('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/janedoe"
            className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </FormField>

        <FormField label="GitHub Profile">
          <input
            type="url"
            value={data.basicInfo.github || ''}
            onChange={(e) => updateBasic('github', e.target.value)}
            placeholder="https://github.com/janedoe"
            className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </FormField>

        <FormField label="Portfolio URL">
          <input
            type="url"
            value={data.basicInfo.portfolio || ''}
            onChange={(e) => updateBasic('portfolio', e.target.value)}
            placeholder="https://myportfolio.com"
            className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </FormField>

        {/* Profile Photo Uploader */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-[#374151] flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-gray-500" /> Profile Photo (Optional)
          </label>
          <div className="flex items-center gap-4 p-4 border border-[#E5E7EB] rounded-xl bg-gray-50">
            {data.basicInfo.photo ? (
              <div className="relative group shrink-0">
                <img
                  src={data.basicInfo.photo}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    updateBasic('photo', '');
                    setPhotoError(null);
                  }}
                  className="absolute -top-1 -right-1 bg-rose-600 text-white rounded-full p-1 shadow-sm hover:bg-rose-700 transition-colors cursor-pointer"
                  title="Remove photo"
                >
                  <Trash2 aria-label="Delete" className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 shrink-0 font-bold border-2 border-white shadow-sm text-lg">
                {data.basicInfo.name ? data.basicInfo.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="flex-1 space-y-1">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setPhotoError(null);
                  const validation = validateImageFile(file);
                  if (!validation.isValid) {
                    setPhotoError(validation.error || 'Invalid image file.');
                    e.target.value = '';
                    return;
                  }
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    updateBasic('photo', reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }}
                className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#111827] file:text-white hover:file:bg-[#374151] file:cursor-pointer"
              />
              <p className="text-[10px] text-gray-500">Allowed formats: JPG, PNG, WebP (Max 5MB).</p>
              {photoError && (
                <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {photoError}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <FormField label="Professional Summary" recommended tooltip="3-5 sentences highlighting your background">
            <textarea
              value={data.basicInfo.summary || ''}
              onChange={(e) => updateBasic('summary', e.target.value)}
              placeholder="Proven software engineer with 5+ years of experience in distributed web services, frontend performance optimization, and developer tooling..."
              className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
