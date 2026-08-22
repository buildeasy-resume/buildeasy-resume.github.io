import React, { useState } from 'react';
import { PortfolioData, EducationItem } from '../../../types';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepEducation({ data, onChange }: WizardStepProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<EducationItem>({ 
    id: crypto.randomUUID(),
    institution: '', 
    degree: '', 
    field: '', 
    startDate: '', 
    endDate: '',
    location: '',
  });
  const [error, setError] = useState('');

  const save = () => {
    if (!form.institution.trim()) {
      setError('Institution name is required.');
      return;
    }
    if (!form.degree.trim()) {
      setError('Degree is required.');
      return;
    }
    setError('');
    const newEntry: EducationItem = {
      ...form,
      id: form.id || crypto.randomUUID(),
    };
    onChange({ ...data, education: [...data.education, newEntry] });
    setIsAdding(false);
    setForm({ 
      id: crypto.randomUUID(),
      institution: '', 
      degree: '', 
      field: '', 
      startDate: '', 
      endDate: '',
      location: '',
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Where did you study?</h2>
      <p className="text-gray-500 mb-8">Add your educational background.</p>
      
      {isAdding ? (
        <div className="border border-gray-200 bg-gray-50 p-6 rounded-xl space-y-4">
          {error && <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200 font-medium">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Institution / School *</label>
              <input 
                className="w-full border border-gray-300 bg-white p-2.5 rounded-lg text-sm" 
                placeholder="e.g. Stanford University" 
                value={form.institution} 
                onChange={e => setForm({...form, institution: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Degree / Qualification *</label>
              <input 
                className="w-full border border-gray-300 bg-white p-2.5 rounded-lg text-sm" 
                placeholder="e.g. Bachelor of Science" 
                value={form.degree} 
                onChange={e => setForm({...form, degree: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Field of Study</label>
              <input 
                className="w-full border border-gray-300 bg-white p-2.5 rounded-lg text-sm" 
                placeholder="e.g. Computer Science" 
                value={form.field} 
                onChange={e => setForm({...form, field: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
              <input 
                className="w-full border border-gray-300 bg-white p-2.5 rounded-lg text-sm" 
                placeholder="e.g. Stanford, CA" 
                value={form.location || ''} 
                onChange={e => setForm({...form, location: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
              <input 
                className="w-full border border-gray-300 bg-white p-2.5 rounded-lg text-sm" 
                placeholder="e.g. Sep 2018" 
                value={form.startDate} 
                onChange={e => setForm({...form, startDate: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">End Date (or Expected)</label>
              <input 
                className="w-full border border-gray-300 bg-white p-2.5 rounded-lg text-sm" 
                placeholder="e.g. Jun 2022" 
                value={form.endDate} 
                onChange={e => setForm({...form, endDate: e.target.value})} 
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" className="bg-[#111827] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-black cursor-pointer" onClick={save}>
              Save Education
            </button>
            <button type="button" className="bg-white border border-gray-300 text-gray-700 text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => { setIsAdding(false); setError(''); }}>
              Cancel
            </button>
          </div>
        </div>
      ) : data.education.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center space-y-4">
          <p className="text-sm text-gray-500">No education added yet. You can add it now or skip to the next step.</p>
          <button type="button" className="bg-[#111827] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-black cursor-pointer" onClick={() => setIsAdding(true)}>
            + Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.education.map((edu, index) => (
            <div key={edu.id || index} className="border border-gray-200 bg-white p-4 rounded-xl flex justify-between items-center shadow-xs">
              <div>
                <h3 className="font-bold text-sm text-gray-900">{edu.institution}</h3>
                <p className="text-xs text-gray-600">{edu.degree} {edu.field ? `in ${edu.field}` : ''} {edu.startDate ? `(${edu.startDate} – ${edu.endDate || 'Present'})` : ''}</p>
              </div>
              <button type="button" className="text-xs font-semibold text-rose-600 hover:text-rose-700 p-1 cursor-pointer" onClick={() => onChange({...data, education: data.education.filter((_, i) => i !== index)})}>
                Delete
              </button>
            </div>
          ))}
          <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 block pt-2 cursor-pointer" onClick={() => setIsAdding(true)}>
            + Add another education
          </button>
        </div>
      )}
    </div>
  );
}
