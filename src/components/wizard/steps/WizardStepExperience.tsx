import React, { useState } from 'react';
import { PortfolioData, ExperienceItem } from '../../../types';
import { Plus, Trash2, Edit2, Briefcase, Calendar } from 'lucide-react';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepExperience({ data, onChange }: WizardStepProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<ExperienceItem>({
    id: '',
    role: '',
    org: '',
    startDate: '',
    endDate: '',
    current: false,
    bullets: [''],
    location: '',
  });

  const handleOpenAdd = () => {
    setForm({
      id: crypto.randomUUID(),
      role: '',
      org: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
      location: '',
    });
    setEditIndex(null);
    setIsAdding(true);
  };

  const handleOpenEdit = (index: number) => {
    setForm(data.experience[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!form.role && !form.org) return;
    const cleanBullets = form.bullets.filter(b => b.trim().length > 0);
    const itemToSave = { ...form, bullets: cleanBullets.length > 0 ? cleanBullets : [''] };
    
    if (editIndex !== null) {
      const updated = [...data.experience];
      updated[editIndex] = itemToSave;
      onChange({ ...data, experience: updated });
    } else {
      onChange({ ...data, experience: [...data.experience, itemToSave] });
    }
    setIsAdding(false);
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold text-[#111827] mb-2">Where have you worked?</h2>
      <p className="text-gray-500 mb-8">Add jobs, internships, freelance positions, or volunteer experience.</p>
      
      {isAdding ? (
        <div className="border border-[#E5E7EB] rounded-2xl p-6 space-y-4 bg-[#FAFAFA] shadow-xs">
          <h3 className="font-bold text-base text-[#111827]">
            {editIndex !== null ? 'Edit Experience' : 'Add Experience'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Job Title *</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. Software Engineer"
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company / Organization *</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. Google or Freelance"
                value={form.org}
                onChange={e => setForm({ ...form, org: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. Jan 2022"
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">End Date</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  disabled={form.current}
                  className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100 disabled:text-gray-400"
                  placeholder={form.current ? 'Present' : 'e.g. Dec 2023'}
                  value={form.current ? 'Present' : form.endDate}
                  onChange={e => setForm({ ...form, endDate: e.target.value })}
                />
                <label className="flex items-center gap-1.5 text-xs text-gray-700 font-medium cursor-pointer whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={form.current || false}
                    onChange={e => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? '' : form.endDate })}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  Current
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Location (Optional)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. San Francisco, CA (or Remote)"
                value={form.location || ''}
                onChange={e => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Key Responsibilities & Achievements</label>
            {form.bullets.map((bullet, bIdx) => (
              <div key={bIdx} className="flex gap-2 mb-2">
                <textarea
                  rows={2}
                  className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="e.g. Designed and maintained scalable web applications with 99.9% uptime..."
                  value={bullet}
                  onChange={e => {
                    const newBullets = [...form.bullets];
                    newBullets[bIdx] = e.target.value;
                    setForm({ ...form, bullets: newBullets });
                  }}
                />
                {form.bullets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newBullets = form.bullets.filter((_, i) => i !== bIdx);
                      setForm({ ...form, bullets: newBullets });
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setForm({ ...form, bullets: [...form.bullets, ''] })}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add bullet point
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="bg-[#111827] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-black transition-colors"
              onClick={handleSave}
            >
              Save Experience
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
              onClick={() => {
                setIsAdding(false);
                setEditIndex(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : data.experience.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center bg-gray-50/50">
          <Briefcase className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">No experience added yet</h3>
          <p className="text-gray-500 text-sm mb-5">If you're a student or shifting careers, you can also skip this and add projects or skills.</p>
          <button
            onClick={handleOpenAdd}
            className="bg-[#111827] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-xs"
          >
            + Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.experience.map((exp, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-xl flex justify-between items-center bg-white shadow-2xs hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm text-[#111827]">{exp.role || 'Position'}</h3>
                <p className="text-xs text-gray-600 font-medium">{exp.org || 'Company'} {exp.startDate ? `• ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || ''}` : ''}</p>
                {exp.bullets?.length > 0 && exp.bullets[0] && (
                  <p className="text-xs text-gray-500 line-clamp-1 mt-1">{exp.bullets[0]}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenEdit(index)}
                  className="text-xs font-semibold text-gray-600 hover:text-black p-1.5 rounded hover:bg-gray-100 flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(index)}
                  className="text-xs font-semibold text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={handleOpenAdd}
            className="text-xs font-bold text-[#111827] border border-gray-300 hover:border-black rounded-lg px-4 py-2.5 flex items-center justify-center gap-1.5 w-full transition-colors mt-4"
          >
            <Plus className="w-4 h-4" /> Add Another Experience
          </button>
        </div>
      )}
    </div>
  );
}
