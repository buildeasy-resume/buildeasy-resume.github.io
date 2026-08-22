import React, { useState } from 'react';
import { PortfolioData, EducationItem } from '../../../types';
import { SectionHeader, AccordionEntry, FormField } from './EditorPrimitives';
import { SortableList, SortableItem } from './SortableList';

interface EducationEditorProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export default function EducationEditor({ data, onChange }: EducationEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(data.education[0]?.id || null);

  const updateEducation = (newList: EducationItem[]) => {
    onChange({
      ...data,
      education: newList,
    });
  };

  const handleAdd = () => {
    const newId = crypto.randomUUID();
    const newItem: EducationItem = {
      id: newId,
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      field: '',
      gpa: '',
      location: '',
    };
    updateEducation([newItem, ...data.education]);
    setExpandedId(newId);
  };

  const handleDelete = (id: string) => {
    updateEducation(data.education.filter((e) => e.id !== id));
  };

  const handleDuplicate = (edu: EducationItem, idx: number) => {
    const copy: EducationItem = {
      ...edu,
      id: crypto.randomUUID(),
      degree: edu.degree ? `${edu.degree} (Copy)` : 'Copy',
    };
    const updated = [...data.education];
    updated.splice(idx + 1, 0, copy);
    updateEducation(updated);
    setExpandedId(copy.id);
  };

  const updateItem = (idx: number, patch: Partial<EducationItem>) => {
    const updated = [...data.education];
    updated[idx] = { ...updated[idx], ...patch };
    updateEducation(updated);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Education"
        description="List degrees, certifications, coursework, and academic institutions."
        onAdd={handleAdd}
        addLabel="Add Education"
      />

      {data.education.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center space-y-3">
          <p className="text-sm text-gray-500">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-300 hover:bg-gray-100 rounded-md shadow-xs transition-colors cursor-pointer"
          >
            Add Academic Record
          </button>
        </div>
      ) : (
        <SortableList
          items={data.education.map((e) => e.id!)}
          onReorder={(newOrder) => {
            const reordered = newOrder.map((id) => data.education.find((e) => e.id === id)!);
            updateEducation(reordered);
          }}
        >
          {data.education.map((edu, idx) => (
            <SortableItem key={edu.id} id={edu.id!} dragHandle>
              <AccordionEntry
                title={edu.degree ? `${edu.degree} - ${edu.institution || 'University'}` : 'New Education Entry'}
                subtitle={edu.startDate ? `${edu.startDate} - ${edu.endDate || 'Present'}` : ''}
                isExpanded={expandedId === edu.id}
                onToggle={() => setExpandedId(expandedId === edu.id ? null : edu.id!)}
                onDelete={() => handleDelete(edu.id!)}
                onDuplicate={() => handleDuplicate(edu, idx)}
              >
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <FormField label="Institution / University" required>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateItem(idx, { institution: e.target.value })}
                          placeholder="e.g. Stanford University"
                          className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                      </FormField>
                    </div>

                    <div className="md:col-span-2">
                      <FormField label="Degree & Major / Field of Study" required>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateItem(idx, { degree: e.target.value })}
                          placeholder="e.g. B.S. in Computer Science"
                          className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                      </FormField>
                    </div>

                    <FormField label="Start Date">
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateItem(idx, { startDate: e.target.value })}
                        placeholder="e.g. Sep 2018"
                        className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </FormField>

                    <FormField label="End Date / Graduation">
                      <input
                        type="text"
                        value={edu.endDate || ''}
                        onChange={(e) => updateItem(idx, { endDate: e.target.value })}
                        placeholder="e.g. May 2022"
                        className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </FormField>

                    <div className="md:col-span-2">
                      <FormField label="GPA / Honors (Optional)">
                        <input
                          type="text"
                          value={edu.gpa || ''}
                          onChange={(e) => updateItem(idx, { gpa: e.target.value })}
                          placeholder="e.g. 3.9 GPA, Dean's List, Magna Cum Laude"
                          className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                      </FormField>
                    </div>

                    <div className="md:col-span-2">
                      <FormField label="Location (Optional)">
                        <input
                          type="text"
                          value={edu.location || ''}
                          onChange={(e) => updateItem(idx, { location: e.target.value })}
                          placeholder="e.g. Stanford, CA"
                          className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        />
                      </FormField>
                    </div>
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
