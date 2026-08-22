import React, { useState } from 'react';
import { PortfolioData, ProjectItem } from '../../../types';
import { SectionHeader, AccordionEntry, FormField } from './EditorPrimitives';
import { SortableList, SortableItem } from './SortableList';
import { Plus, Trash2 } from 'lucide-react';

interface ProjectsEditorProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export default function ProjectsEditor({ data, onChange }: ProjectsEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(data.projects[0]?.id || null);

  const updateProjects = (newList: ProjectItem[]) => {
    onChange({
      ...data,
      projects: newList,
    });
  };

  const handleAdd = () => {
    const newId = crypto.randomUUID();
    const newItem: ProjectItem = {
      id: newId,
      title: '',
      description: '',
      tech: [],
      link: '',
      githubUrl: '',
      bullets: [''],
    };
    updateProjects([newItem, ...data.projects]);
    setExpandedId(newId);
  };

  const handleDelete = (id: string) => {
    updateProjects(data.projects.filter((p) => p.id !== id));
  };

  const handleDuplicate = (proj: ProjectItem, idx: number) => {
    const copy: ProjectItem = {
      ...proj,
      id: crypto.randomUUID(),
      title: proj.title ? `${proj.title} (Copy)` : 'Copy',
    };
    const updated = [...data.projects];
    updated.splice(idx + 1, 0, copy);
    updateProjects(updated);
    setExpandedId(copy.id);
  };

  const updateItem = (idx: number, patch: Partial<ProjectItem>) => {
    const updated = [...data.projects];
    updated[idx] = { ...updated[idx], ...patch };
    updateProjects(updated);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Technical & Portfolio Projects"
        description="Showcase standout personal projects, open source contributions, or portfolio work."
        onAdd={handleAdd}
        addLabel="Add Project"
      />

      {data.projects.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center space-y-3">
          <p className="text-sm text-gray-500">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-300 hover:bg-gray-100 rounded-md shadow-xs transition-colors cursor-pointer"
          >
            Add First Project
          </button>
        </div>
      ) : (
        <SortableList
          items={data.projects.map((p) => p.id!)}
          onReorder={(newOrder) => {
            const reordered = newOrder.map((id) => data.projects.find((p) => p.id === id)!);
            updateProjects(reordered);
          }}
        >
          {data.projects.map((proj, idx) => (
            <SortableItem key={proj.id} id={proj.id!} dragHandle>
              <AccordionEntry
                title={proj.title || 'New Project'}
                subtitle={proj.tech ? proj.tech.slice(0, 4).join(', ') : ''}
                isExpanded={expandedId === proj.id}
                onToggle={() => setExpandedId(expandedId === proj.id ? null : proj.id!)}
                onDelete={() => handleDelete(proj.id!)}
                onDuplicate={() => handleDuplicate(proj, idx)}
              >
                <div className="p-4 space-y-4">
                  <FormField label="Project Name" required>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateItem(idx, { title: e.target.value })}
                      placeholder="e.g. Real-time Collaborative Canvas"
                      className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </FormField>

                  <FormField label="Overview / Description">
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateItem(idx, { description: e.target.value })}
                      placeholder="High-performance vector editing engine built with WebAssembly, TypeScript, and WebGL with multiplayer cursor synchronisation..."
                      className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </FormField>

                  <FormField label="Technologies (comma separated)" tooltip="e.g. React, TypeScript, Rust">
                    <input
                      type="text"
                      value={proj.tech ? proj.tech.join(', ') : ''}
                      onChange={(e) => {
                        const tags = e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        updateItem(idx, { tech: tags });
                      }}
                      placeholder="React, TypeScript, Node.js, WebGL"
                      className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </FormField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Live Demo URL (Optional)">
                      <input
                        type="url"
                        value={proj.link || ''}
                        onChange={(e) => updateItem(idx, { link: e.target.value })}
                        placeholder="https://myproject.dev"
                        className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </FormField>

                    <FormField label="GitHub / Repo URL (Optional)">
                      <input
                        type="url"
                        value={proj.githubUrl || ''}
                        onChange={(e) => updateItem(idx, { githubUrl: e.target.value })}
                        placeholder="https://github.com/user/project"
                        className="w-full px-3 py-2 text-sm bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      />
                    </FormField>
                  </div>

                  {/* Highlights / Bullets */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <label className="text-xs font-bold text-[#374151]">Project Feature Bullets (Optional)</label>
                    <SortableList
                      items={(proj.bullets || []).map((_, bIdx) => `${proj.id}-b-${bIdx}`)}
                      onReorder={(newOrder) => {
                        const oldIndices = newOrder.map((idStr) => parseInt(idStr.split('-').pop()!));
                        const newBullets = oldIndices.map((i) => (proj.bullets || [])[i]);
                        updateItem(idx, { bullets: newBullets });
                      }}
                    >
                      {(proj.bullets || []).map((bullet, bIdx) => (
                        <SortableItem key={`${proj.id}-b-${bIdx}`} id={`${proj.id}-b-${bIdx}`} dragHandle>
                          <div className="flex p-1 pr-3 items-start gap-2 bg-white">
                            <textarea
                              value={bullet}
                              onChange={(e) => {
                                const newBullets = [...(proj.bullets || [])];
                                newBullets[bIdx] = e.target.value;
                                updateItem(idx, { bullets: newBullets });
                              }}
                              placeholder="Implemented CRDT conflict resolution algorithm supporting 100+ concurrent editors..."
                              className="flex-1 text-sm bg-transparent resize-none h-16 focus:outline-none py-1.5"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newBullets = (proj.bullets || []).filter((_, i) => i !== bIdx);
                                updateItem(idx, { bullets: newBullets });
                              }}
                              aria-label="Delete"
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
                        updateItem(idx, { bullets: [...(proj.bullets || []), ''] });
                      }}
                      className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 mt-2 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add feature bullet
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
