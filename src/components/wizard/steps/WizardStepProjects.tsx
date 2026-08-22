import React, { useState } from 'react';
import { PortfolioData, ProjectItem } from '../../../types';
import { Plus, Trash2, Edit2, Code, ExternalLink } from 'lucide-react';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function WizardStepProjects({ data, onChange }: WizardStepProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [techInput, setTechInput] = useState('');
  const [form, setForm] = useState<ProjectItem>({
    id: '',
    title: '',
    description: '',
    tech: [],
    link: '',
    githubUrl: '',
    bullets: [''],
  });

  const handleOpenAdd = () => {
    setForm({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      tech: [],
      link: '',
      githubUrl: '',
      bullets: [''],
    });
    setTechInput('');
    setEditIndex(null);
    setIsAdding(true);
  };

  const handleOpenEdit = (index: number) => {
    const p = data.projects[index];
    setForm(p);
    setTechInput(p.tech?.join(', ') || '');
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!form.title) return;
    const techArray = techInput.split(',').map(s => s.trim()).filter(Boolean);
    const itemToSave = { ...form, tech: techArray };

    if (editIndex !== null) {
      const updated = [...data.projects];
      updated[editIndex] = itemToSave;
      onChange({ ...data, projects: updated });
    } else {
      onChange({ ...data, projects: [...data.projects, itemToSave] });
    }
    setIsAdding(false);
    setEditIndex(null);
  };

  const handleDelete = (index: number) => {
    onChange({
      ...data,
      projects: data.projects.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold text-[#111827] mb-2">What have you built?</h2>
      <p className="text-gray-500 mb-8">Personal projects, open-source contributions, or key coursework highlights.</p>
      
      {isAdding ? (
        <div className="border border-[#E5E7EB] rounded-2xl p-6 space-y-4 bg-[#FAFAFA] shadow-xs">
          <h3 className="font-bold text-base text-[#111827]">
            {editIndex !== null ? 'Edit Project' : 'Add Project'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Project Title *</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. Real-time Collaboration Canvas"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none"
                placeholder="Briefly describe what this project does, the problem it solves, and impact..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Technologies Used (comma separated)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. React, TypeScript, Node.js, Tailwind CSS"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Live URL (Optional)</label>
                <input
                  type="url"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="https://myproject.com"
                  value={form.link || ''}
                  onChange={e => setForm({ ...form, link: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">GitHub URL (Optional)</label>
                <input
                  type="url"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="https://github.com/username/project"
                  value={form.githubUrl || ''}
                  onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="bg-[#111827] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-black transition-colors"
              onClick={handleSave}
            >
              Save Project
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
      ) : data.projects.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center bg-gray-50/50">
          <Code className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h3 className="font-bold text-gray-800 mb-1">No projects added yet</h3>
          <p className="text-gray-500 text-sm mb-5">Highlighting projects is a great way to show practical domain competence.</p>
          <button
            onClick={handleOpenAdd}
            className="bg-[#111827] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition-colors shadow-xs"
          >
            + Add Project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.projects.map((proj, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-xl flex justify-between items-center bg-white shadow-2xs hover:border-gray-300 transition-colors">
              <div className="space-y-0.5">
                <h3 className="font-bold text-sm text-[#111827]">{proj.title}</h3>
                {proj.tech && proj.tech.length > 0 && (
                  <p className="text-xs text-gray-500">{proj.tech.join(' • ')}</p>
                )}
                {proj.description && (
                  <p className="text-xs text-gray-600 line-clamp-1 mt-1">{proj.description}</p>
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
            <Plus className="w-4 h-4" /> Add Another Project
          </button>
        </div>
      )}
    </div>
  );
}
