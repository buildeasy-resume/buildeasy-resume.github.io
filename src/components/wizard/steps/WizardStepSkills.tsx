import React, { useState } from 'react';
import { PortfolioData } from '../../../types';
import { Plus, X, Sparkles } from 'lucide-react';

interface WizardStepProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

const POPULAR_SKILLS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Python',
  'Node.js',
  'SQL',
  'Git',
  'Tailwind CSS',
  'Next.js',
  'GraphQL',
  'AWS',
  'Docker',
  'REST APIs',
  'Problem Solving',
  'Project Management',
  'Communication',
  'Leadership',
  'Figma',
];

export default function WizardStepSkills({ data, onChange }: WizardStepProps) {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (!data.skills.includes(trimmed)) {
      onChange({
        ...data,
        skills: [...data.skills, trimmed],
      });
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold text-[#111827] mb-2">What are your top skills?</h2>
      <p className="text-gray-500 mb-8">Add technical tools, frameworks, languages, or soft skills relevant to your target roles.</p>
      
      {/* Skill Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter (e.g. React, Python, Product Strategy)..."
          className="flex-1 border border-gray-300 rounded-xl p-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="button"
          onClick={() => addSkill(skillInput)}
          className="bg-[#111827] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-black transition-colors flex items-center gap-1 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Added Skills */}
      <div className="mb-8">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
          Your Selected Skills ({data.skills.length})
        </label>
        {data.skills.length === 0 ? (
          <p className="text-sm text-gray-400 italic bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
            No skills added yet. Type a skill above or click from suggestions below.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="bg-[#111827] text-white px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-2xs"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Skills */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick Add Suggestions
        </label>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SKILLS.filter((s) => !data.skills.includes(s)).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addSkill(suggestion)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 border border-gray-200"
            >
              <Plus className="w-3 h-3 text-gray-500" /> {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
