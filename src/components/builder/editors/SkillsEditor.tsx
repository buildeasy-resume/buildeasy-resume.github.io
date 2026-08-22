import React, { useState } from 'react';
import { PortfolioData } from '../../../types';
import { SectionHeader } from './EditorPrimitives';
import { Plus, X, Sparkles, AlertCircle } from 'lucide-react';

interface SkillsEditorProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

const COMMON_SKILL_SUGGESTIONS = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Go', 'Tailwind CSS',
  'Next.js', 'REST API', 'GraphQL', 'Docker', 'PostgreSQL', 'MongoDB', 'AWS',
  'CI/CD', 'Git', 'Agile', 'System Design', 'Microservices', 'Jest'
];

export default function SkillsEditor({ data, onChange }: SkillsEditorProps) {
  const [skillInput, setSkillInput] = useState('');
  const skills = data.skills || [];

  const updateSkills = (newSkills: string[]) => {
    onChange({
      ...data,
      skills: newSkills,
    });
  };

  const handleAddSkill = (skillToAdd?: string) => {
    const raw = (skillToAdd || skillInput).trim();
    if (!raw) return;

    // Support comma separated pasting (e.g. "React, Node, GraphQL")
    const newItems = raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !skills.some((existing) => existing.toLowerCase() === s.toLowerCase()));

    if (newItems.length > 0) {
      updateSkills([...skills, ...newItems]);
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateSkills(skills.filter((s) => s !== skillToRemove));
  };

  const availableSuggestions = COMMON_SKILL_SUGGESTIONS.filter(
    (sug) => !skills.some((s) => s.toLowerCase() === sug.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Skills & Competencies"
        description="List technical proficiencies, frameworks, tools, and domain knowledge."
      />

      {/* Input Field */}
      <div className="flex gap-2">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkill();
            }
          }}
          placeholder="Add a skill or paste comma-separated list (e.g. React, TypeScript, Docker)..."
          className="flex-1 px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
        <button
          type="button"
          onClick={() => handleAddSkill()}
          className="px-4 py-2 bg-[#111827] hover:bg-[#374151] text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      {/* Current Active Skills Chips */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#374151] flex justify-between">
          <span>Active Resume Skills ({skills.length})</span>
          {skills.length < 5 && (
            <span className="text-[11px] text-amber-600 font-medium">Add at least 5 skills for optimal impact</span>
          )}
        </label>

        {skills.length === 0 ? (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-xs text-gray-500">No skills added yet. Type above or click suggestions below.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl min-h-[60px]">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 text-gray-800 text-xs font-semibold rounded-lg shadow-xs"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="p-0.5 text-gray-400 hover:text-rose-600 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Popular Suggestions */}
      {availableSuggestions.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <label className="text-xs font-bold text-[#4B5563] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular Recommendations (Click to add)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableSuggestions.slice(0, 14).map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => handleAddSkill(sug)}
                className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-gray-400" /> {sug}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
