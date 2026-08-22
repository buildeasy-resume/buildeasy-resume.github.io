import React, { useState } from 'react';
import { PortfolioData } from '../../../types';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepPersonal({ data, onChange }: WizardStepProps) {
  const update = (key: keyof PortfolioData['basicInfo'], value: string) => {
    onChange({
      ...data,
      basicInfo: { ...data.basicInfo, [key]: value },
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Tell us about yourself</h2>
      <p className="text-gray-500 mb-8">Start with the basics. You can modify any details later.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Full Name *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g. Sahil Soni"
            value={data.basicInfo.name}
            onChange={(e) => update('name', e.target.value)}
          />
          {!data.basicInfo.name?.trim() && (
            <p className="text-[11px] text-amber-600 mt-1">Full name is recommended for resume headers.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Professional Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g. Senior Full Stack Engineer"
            value={data.basicInfo.tagline}
            onChange={(e) => update('tagline', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Email Address *</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g. sahil@example.com"
            value={data.basicInfo.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
          <input
            type="tel"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g. +1 (555) 019-2834"
            value={data.basicInfo.phone || ''}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700">Location / City, Country</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g. San Francisco, CA"
            value={data.basicInfo.location || ''}
            onChange={(e) => update('location', e.target.value)}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700">Professional Summary / Bio</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Results-driven software engineer with 5+ years of experience building high-throughput distributed systems and responsive web applications..."
            value={data.basicInfo.summary || ''}
            onChange={(e) => update('summary', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
