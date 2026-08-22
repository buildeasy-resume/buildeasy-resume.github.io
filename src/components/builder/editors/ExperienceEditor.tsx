import React, { useState } from 'react';
import { PortfolioData, ExperienceItem } from '../../../types';
import { SectionHeader, AccordionEntry, FormField } from './EditorPrimitives';
import { SortableList, SortableItem } from './SortableList';
import { Plus, Trash2 } from 'lucide-react';

interface ExperienceEditorProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export default function ExperienceEditor({ data, onChange }: ExperienceEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(data.experience[0]?.id || null);

  const updateExperience = (newList: ExperienceItem[]) => {
    onChange({
      ...data,
      experience: newList,
    });
  };

  const handleAdd = () => {
    const newId = crypto.randomUUID();
    const newItem: ExperienceItem = {
      id: newId,
      role: '',
      org: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      bullets: [''],
    };
    updateExperience([newItem, ...data.experience]);
    setExpandedId(newId);
  };

  const handleDelete = (id: string) => {
    updateExperience(data.experience.filter((e) => e.id !== id));
  };

  const handleDuplicate = (exp: ExperienceItem, idx: number) => {
    const copy: ExperienceItem = {
      ...exp,
      id: crypto.randomUUID(),
      role: exp.role ? `${exp.role} (Copy)` : 'Copy',
    };
    const updated = [...data.experience];
    updated.splice(idx + 1, 0, copy);
    updateExperience(updated);
    setExpandedId(copy.id);
  };

  const updateItem = (idx: number, patch: Partial<ExperienceItem>) => {
    const updated = [...data.experience];
    updated[idx] = { ...updated[idx], ...patch };
    updateExperience(updated);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Work Experience"
        description="Detail your previous employment, internships, and professional roles."
        onAdd={handleAdd}
        addLabel="Add Role"
      />

      {data.experience.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center space-y-3">
          <p className="text-sm text-gray-500">No work experience added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-300 hover:bg-gray-100 rounded-md shadow-xs transition-colors cursor-pointer"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <SortableList
          items={data.experience.map((e) => e.id!)}
          onReorder={(newOrder) => {
            const reordered = newOrder.map((id) => data.experience.find((e) => e.id === id)!);
            updateExperience(reordered);
          }}
        >
          {data.experience.map((exp, idx) => (
            <SortableItem key={exp.id} id={exp.id!} dragHandle>
              <AccordionEntry
                title={exp.role ? `${exp.role} at ${exp.org || 'Company'}` : 'New Experience Entry'}
                subtitle={exp.startDate ? `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || 'Present'}` : ''}
                isExpanded={expandedId === exp.id}
                onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id!)}
                onDelete={() => handleDelete(exp.id!)}
                onDuplicate={() => handleDuplicate(exp, idx)}
              >
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Job Title" required>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateItem(idx, { role: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </FormField>

                    <FormField label="Company / Organization" required>
                      <input
                        type="text"
                        value={exp.org}
                        onChange={(e) => updateItem(idx, { org: e.target.value })}
                        placeholder="e.g. Google, Stripe"
                        className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </FormField>

                    <FormField label="Start Date" required>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateItem(idx, { startDate: e.target.value })}
                        placeholder="e.g. Mar 2021"
                        className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </FormField>

                    <FormField label="End Date" required>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateItem(idx, { endDate: e.target.value })}
                          placeholder={exp.current ? 'Present' : 'e.g. Present, Dec 2023'}
                          disabled={exp.current}
                          className="flex-1 w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] disabled:opacity-50"
                        />
                        <label className="flex items-center gap-1.5 text-xs text-[#4B5563] cursor-pointer whitespace-nowrap select-none">
                          <input
                            type="checkbox"
                            checked={Boolean(exp.current)}
                            onChange={(e) => {
                              updateItem(idx, {
                                current: e.target.checked,
                                endDate: e.target.checked ? '' : exp.endDate,
                              });
                            }}
                            className="rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]"
                          />
                          Current
                        </label>
                      </div>
                    </FormField>

                    <div className="md:col-span-2">
                      <FormField label="Location (Optional)">
                        <input
                          type="text"
                          value={exp.location || ''}
                          onChange={(e) => updateItem(idx, { location: e.target.value })}
                          placeholder="e.g. San Francisco, CA (or Remote)"
                          className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                      </FormField>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <label className="text-xs font-bold text-[#374151] flex items-center justify-between">
                      <span>Bullet Points & Impact Highlights</span>
                      <span className="text-[11px] font-normal text-gray-400">Include metrics, technologies, and achievements</span>
                    </label>

                    <SortableList
                      items={(exp.bullets || []).map((_, bIdx) => `${exp.id}-b-${bIdx}`)}
                      onReorder={(newOrder) => {
                        const oldIndices = newOrder.map((idStr) => parseInt(idStr.split('-').pop()!));
                        const newBullets = oldIndices.map((i) => exp.bullets[i]);
                        updateItem(idx, { bullets: newBullets });
                      }}
                    >
                      {(exp.bullets || []).map((bullet, bIdx) => (
                        <SortableItem key={`${exp.id}-b-${bIdx}`} id={`${exp.id}-b-${bIdx}`} dragHandle>
                          <div className="flex p-1 pr-3 items-start gap-2 bg-white">
                            <textarea
                              value={bullet}
                              onChange={(e) => {
                                const newBullets = [...(exp.bullets || [])];
                                newBullets[bIdx] = e.target.value;
                                updateItem(idx, { bullets: newBullets });
                              }}
                              placeholder="Spearheaded migration to Next.js reducing first contentful paint by 35% across 2M daily active users..."
                              className="flex-1 text-sm bg-transparent resize-none h-16 focus:outline-none py-1.5"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newBullets = exp.bullets.filter((_, i) => i !== bIdx);
                                updateItem(idx, { bullets: newBullets });
                              }}
                              aria-label="Delete Bullet"
                              title="Delete Bullet"
                              className="mt-1.5 p-1.5 text-[#9CA3AF] hover:text-rose-500 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                            >
                              <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </SortableItem>
                      ))}
                    </SortableList>

                    <button
                      type="button"
                      onClick={() => {
                        updateItem(idx, { bullets: [...(exp.bullets || []), ''] });
                      }}
                      className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 mt-2 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add bullet point
                    </button>
                  </div>
                </div>
              </AccordionEntry>
            </SortableItem>
          ))}
        </SortableList>
      )}
    </div>
  );
}
