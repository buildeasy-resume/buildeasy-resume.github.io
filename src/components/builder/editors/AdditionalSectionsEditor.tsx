import React, { useState } from 'react';
import { PortfolioData, CustomSectionItem, AchievementItem } from '../../../types';
import { FormField } from './EditorPrimitives';
import { Plus, Trash2, Award, BookOpen, Trophy, PlusCircle } from 'lucide-react';

interface AdditionalSectionsEditorProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

export default function AdditionalSectionsEditor({ data, onChange }: AdditionalSectionsEditorProps) {
  const [activeSubTab, setActiveSubTab] = useState<'certifications' | 'achievements' | 'publications' | 'custom'>('certifications');

  // 1. Certifications
  const handleAddCert = () => {
    const newCert: CustomSectionItem = {
      id: crypto.randomUUID(),
      title: '',
      subtitle: '',
      date: '',
      description: '',
    };
    onChange({
      ...data,
      certifications: [...(data.certifications || []), newCert],
    });
  };

  const handleUpdateCert = (idx: number, patch: Partial<CustomSectionItem>) => {
    const updated = [...(data.certifications || [])];
    updated[idx] = { ...updated[idx], ...patch };
    onChange({ ...data, certifications: updated });
  };

  const handleDeleteCert = (id: string) => {
    onChange({
      ...data,
      certifications: (data.certifications || []).filter((c) => c.id !== id),
    });
  };

  // 2. Achievements
  const handleAddAchievement = () => {
    const newAch: AchievementItem = {
      id: crypto.randomUUID(),
      title: '',
      issuer: '',
      date: '',
    };
    onChange({
      ...data,
      achievements: [...(data.achievements || []), newAch],
    });
  };

  const handleUpdateAchievement = (idx: number, patch: Partial<AchievementItem>) => {
    const updated = [...(data.achievements || [])];
    updated[idx] = { ...updated[idx], ...patch };
    onChange({ ...data, achievements: updated });
  };

  const handleDeleteAchievement = (id: string) => {
    onChange({
      ...data,
      achievements: (data.achievements || []).filter((a) => a.id !== id),
    });
  };

  // 3. Publications
  const handleAddPublication = () => {
    const newPub: CustomSectionItem = {
      id: crypto.randomUUID(),
      title: '',
      subtitle: '',
      date: '',
      description: '',
    };
    onChange({
      ...data,
      publications: [...(data.publications || []), newPub],
    });
  };

  const handleUpdatePublication = (idx: number, patch: Partial<CustomSectionItem>) => {
    const updated = [...(data.publications || [])];
    updated[idx] = { ...updated[idx], ...patch };
    onChange({ ...data, publications: updated });
  };

  const handleDeletePublication = (id: string) => {
    onChange({
      ...data,
      publications: (data.publications || []).filter((p) => p.id !== id),
    });
  };

  // 4. Custom Sections
  const handleAddCustomSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      name: 'Custom Section',
      items: [
        {
          id: crypto.randomUUID(),
          title: '',
          subtitle: '',
          date: '',
          description: '',
        },
      ],
    };
    onChange({
      ...data,
      customSections: [...(data.customSections || []), newSection],
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E5E7EB] pb-3">
        <h2 className="text-xl font-bold text-[#111827]">Additional Sections</h2>
        <p className="text-xs text-[#6B7280] mt-0.5">Add certifications, awards, publications, or custom sections.</p>
      </div>

      {/* Sub-navigation bar */}
      <div className="flex border-b border-gray-200 overflow-x-auto gap-2">
        <button
          type="button"
          onClick={() => setActiveSubTab('certifications')}
          className={`pb-2.5 px-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeSubTab === 'certifications'
              ? 'border-[#111827] text-[#111827]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Certifications ({(data.certifications || []).length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('achievements')}
          className={`pb-2.5 px-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeSubTab === 'achievements'
              ? 'border-[#111827] text-[#111827]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          Awards & Honors ({(data.achievements || []).length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('publications')}
          className={`pb-2.5 px-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeSubTab === 'publications'
              ? 'border-[#111827] text-[#111827]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Publications ({(data.publications || []).length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('custom')}
          className={`pb-2.5 px-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeSubTab === 'custom'
              ? 'border-[#111827] text-[#111827]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Custom Sections ({(data.customSections || []).length})
        </button>
      </div>

      {/* 1. CERTIFICATIONS TAB */}
      {activeSubTab === 'certifications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-700">Certifications & Licenses</span>
            <button
              type="button"
              onClick={handleAddCert}
              className="text-xs font-semibold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Certification
            </button>
          </div>

          {(data.certifications || []).length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center text-xs text-gray-500">
              No certifications added yet. (e.g. AWS Certified Solutions Architect)
            </div>
          ) : (
            <div className="space-y-3">
              {(data.certifications || []).map((cert, idx) => (
                <div key={cert.id || idx} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-800">Certificate #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCert(cert.id!)}
                      className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField label="Certification Name" required>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => handleUpdateCert(idx, { title: e.target.value })}
                        placeholder="e.g. AWS Certified Solutions Architect"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md"
                      />
                    </FormField>
                    <FormField label="Issuing Body / Organization">
                      <input
                        type="text"
                        value={cert.subtitle || ''}
                        onChange={(e) => handleUpdateCert(idx, { subtitle: e.target.value })}
                        placeholder="e.g. Amazon Web Services"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md"
                      />
                    </FormField>
                    <FormField label="Issue Date / Expiry">
                      <input
                        type="text"
                        value={cert.date || ''}
                        onChange={(e) => handleUpdateCert(idx, { date: e.target.value })}
                        placeholder="e.g. Nov 2023"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md"
                      />
                    </FormField>
                    <FormField label="Credential ID / URL (Optional)">
                      <input
                        type="text"
                        value={cert.description || ''}
                        onChange={(e) => handleUpdateCert(idx, { description: e.target.value })}
                        placeholder="e.g. Credential #12345"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md"
                      />
                    </FormField>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. ACHIEVEMENTS & HONORS */}
      {activeSubTab === 'achievements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-700">Honors, Awards & Competitions</span>
            <button
              type="button"
              onClick={handleAddAchievement}
              className="text-xs font-semibold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Award
            </button>
          </div>

          {(data.achievements || []).length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center text-xs text-gray-500">
              No awards or honors added yet. (e.g. 1st Place National Hackathon)
            </div>
          ) : (
            <div className="space-y-3">
              {(data.achievements || []).map((ach, idx) => (
                <div key={ach.id || idx} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-800">Honor #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteAchievement(ach.id!)}
                      className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField label="Award Title" required>
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => handleUpdateAchievement(idx, { title: e.target.value })}
                        placeholder="e.g. 1st Place National Hackathon"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md"
                      />
                    </FormField>
                    <FormField label="Grantor / Organization">
                      <input
                        type="text"
                        value={ach.issuer || ''}
                        onChange={(e) => handleUpdateAchievement(idx, { issuer: e.target.value })}
                        placeholder="e.g. TechCrunch Disrupt"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md"
                      />
                    </FormField>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. PUBLICATIONS */}
      {activeSubTab === 'publications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-700">Academic & Technical Publications</span>
            <button
              type="button"
              onClick={handleAddPublication}
              className="text-xs font-semibold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Publication
            </button>
          </div>

          {(data.publications || []).length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center text-xs text-gray-500">
              No publications listed yet.
            </div>
          ) : (
            <div className="space-y-3">
              {(data.publications || []).map((pub, idx) => (
                <div key={pub.id || idx} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-800">Publication #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeletePublication(pub.id!)}
                      className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField label="Paper / Article Title" required>
                      <input
                        type="text"
                        value={pub.title}
                        onChange={(e) => handleUpdatePublication(idx, { title: e.target.value })}
                        placeholder="e.g. Distributed Consensus in Modern Edge Networks"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md"
                      />
                    </FormField>
                    <FormField label="Journal / Conference">
                      <input
                        type="text"
                        value={pub.subtitle || ''}
                        onChange={(e) => handleUpdatePublication(idx, { subtitle: e.target.value })}
                        placeholder="e.g. IEEE Transactions on Cloud Computing"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md"
                      />
                    </FormField>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. CUSTOM SECTIONS */}
      {activeSubTab === 'custom' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-700">User Defined Custom Sections</span>
            <button
              type="button"
              onClick={handleAddCustomSection}
              className="text-xs font-semibold text-white bg-[#111827] hover:bg-[#374151] px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Custom Section
            </button>
          </div>

          {(data.customSections || []).length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center text-xs text-gray-500">
              No custom sections created. Add custom sections like "Volunteer Work", "Languages", or "Speaking Engagements".
            </div>
          ) : (
            <div className="space-y-4">
              {(data.customSections || []).map((section, sIdx) => (
                <div key={section.id || sIdx} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) => {
                        const updated = [...(data.customSections || [])];
                        updated[sIdx] = { ...updated[sIdx], name: e.target.value };
                        onChange({ ...data, customSections: updated });
                      }}
                      className="font-bold text-sm bg-white border border-gray-300 rounded px-2 py-1"
                      placeholder="Section Name (e.g. Languages)"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onChange({
                          ...data,
                          customSections: (data.customSections || []).filter((_, i) => i !== sIdx),
                        });
                      }}
                      className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 aria-label="Delete" className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Section items */}
                  <div className="space-y-2">
                    {(section.items || []).map((item, itIdx) => (
                      <div key={item.id || itIdx} className="flex gap-2 items-center bg-white p-2 rounded-md border border-gray-200">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...(data.customSections || [])];
                            const updatedItems = [...(updated[sIdx].items || [])];
                            updatedItems[itIdx] = { ...updatedItems[itIdx], title: e.target.value };
                            updated[sIdx] = { ...updated[sIdx], items: updatedItems };
                            onChange({ ...data, customSections: updated });
                          }}
                          placeholder="Title / Name (e.g. Spanish)"
                          className="flex-1 text-xs border border-gray-300 rounded px-2 py-1"
                        />
                        <input
                          type="text"
                          value={item.subtitle || ''}
                          onChange={(e) => {
                            const updated = [...(data.customSections || [])];
                            const updatedItems = [...(updated[sIdx].items || [])];
                            updatedItems[itIdx] = { ...updatedItems[itIdx], subtitle: e.target.value };
                            updated[sIdx] = { ...updated[sIdx], items: updatedItems };
                            onChange({ ...data, customSections: updated });
                          }}
                          placeholder="Proficiency / Details (e.g. Native / Bilingual)"
                          className="flex-1 text-xs border border-gray-300 rounded px-2 py-1"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(data.customSections || [])];
                            const updatedItems = (updated[sIdx].items || []).filter((_, i) => i !== itIdx);
                            updated[sIdx] = { ...updated[sIdx], items: updatedItems };
                            onChange({ ...data, customSections: updated });
                          }}
                          className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 aria-label="Delete" className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...(data.customSections || [])];
                        const updatedItems = [
                          ...(updated[sIdx].items || []),
                          { id: crypto.randomUUID(), title: '', subtitle: '', date: '', description: '' },
                        ];
                        updated[sIdx] = { ...updated[sIdx], items: updatedItems };
                        onChange({ ...data, customSections: updated });
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
