import React, { useState } from 'react';
import { PortfolioData, createDefaultCustomization } from '../types';
import BasicInfoEditor from './builder/editors/BasicInfoEditor';
import ExperienceEditor from './builder/editors/ExperienceEditor';
import EducationEditor from './builder/editors/EducationEditor';
import ProjectsEditor from './builder/editors/ProjectsEditor';
import SkillsEditor from './builder/editors/SkillsEditor';
import AdditionalSectionsEditor from './builder/editors/AdditionalSectionsEditor';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Wrench, 
  Layers, 
  GripVertical,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'motion/react';

export type TabType = 
  | 'basic' 
  | 'experience' 
  | 'education' 
  | 'projects' 
  | 'skills' 
  | 'certifications'
  | 'customSections';

interface FormBuilderProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
}

interface SectionCardProps {
  id: string;
  title: string;
  icon: any;
  badge?: string;
  isCollapsed: boolean;
  isHidden: boolean;
  onToggleVisibility: () => void;
  onToggleCollapse: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  children: React.ReactNode;
}

function SectionCard({
  id,
  title,
  icon: Icon,
  badge,
  isCollapsed,
  isHidden,
  onToggleVisibility,
  onToggleCollapse,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  children,
}: SectionCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      id={`section-${id}`}
      className={`bg-white border rounded-2xl overflow-hidden shadow-xs transition-all ${
        isDragging 
          ? 'opacity-60 ring-2 ring-[#2563EB] shadow-lg' 
          : isHidden 
            ? 'border-dashed border-gray-300 bg-gray-50/60' 
            : 'border-[#E5E7EB] hover:border-gray-300'
      }`}
    >
      {/* Section Header */}
      <div 
        onClick={onToggleCollapse}
        className={`flex items-center justify-between px-5 py-4 transition-colors cursor-pointer select-none ${
          isHidden ? 'bg-gray-50/80 hover:bg-gray-100/60' : 'bg-white hover:bg-gray-50/80'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            data-tour="section-reorder"
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-700 p-1 rounded transition-colors"
            title={`Drag to reorder ${title} section`}
            aria-label={`Drag to reorder ${title} section`}
          >
            <GripVertical className="w-4 h-4" />
          </div>
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${
            isHidden ? 'bg-gray-100 border-gray-300 text-gray-400' : 'bg-white border-[#E5E7EB] text-[#111827]'
          }`}>
            <Icon className={`w-4 h-4 ${isHidden ? 'text-gray-400' : 'text-gray-800'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-serif font-bold leading-tight ${isHidden ? 'text-gray-500 line-through decoration-gray-400' : 'text-[#111827]'}`}>
                {title}
              </h3>
              {isHidden && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  Hidden
                </span>
              )}
            </div>
            {badge && <span className="text-xs text-gray-500 font-medium mt-0.5 block">{badge}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleVisibility}
            aria-label={isHidden ? `Show ${title} section on resume` : `Hide ${title} section from resume`}
            title={isHidden ? `Show ${title} section on resume` : `Hide ${title} section from resume`}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isHidden
                ? 'text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100'
                : 'text-gray-400 hover:text-black hover:bg-gray-100'
            }`}
          >
            {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <div className="w-px h-5 bg-gray-200 mx-0.5" />
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            aria-label={`Move ${title} section up`}
            title={`Move ${title} section up`}
            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            aria-label={`Move ${title} section down`}
            title={`Move ${title} section down`}
            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-gray-200 mx-0.5" />
          <button
            type="button"
            onClick={onToggleCollapse}
            data-tour="section-expand"
            aria-label={isCollapsed ? `Expand ${title} section` : `Collapse ${title} section`}
            title={isCollapsed ? `Expand ${title} section` : `Collapse ${title} section`}
            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition-colors cursor-pointer flex items-center"
          >
            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-90'}`} />
          </button>
        </div>
      </div>

      {/* Section Content */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DEFAULT_SECTIONS = ['basic', 'experience', 'education', 'projects', 'skills', 'certifications'];

const SECTION_METADATA: Record<string, { label: string; icon: any; render: (props: { data: PortfolioData; onChange: (d: PortfolioData) => void }) => React.ReactNode }> = {
  basic: {
    label: 'Personal Information & Summary',
    icon: User,
    render: ({ data, onChange }) => <BasicInfoEditor data={data} onChange={onChange} />,
  },
  experience: {
    label: 'Work Experience',
    icon: Briefcase,
    render: ({ data, onChange }) => <ExperienceEditor data={data} onChange={onChange} />,
  },
  education: {
    label: 'Education',
    icon: GraduationCap,
    render: ({ data, onChange }) => <EducationEditor data={data} onChange={onChange} />,
  },
  projects: {
    label: 'Projects',
    icon: FolderGit2,
    render: ({ data, onChange }) => <ProjectsEditor data={data} onChange={onChange} />,
  },
  skills: {
    label: 'Skills',
    icon: Wrench,
    render: ({ data, onChange }) => <SkillsEditor data={data} onChange={onChange} />,
  },
  certifications: {
    label: 'Certifications & Additional',
    icon: Layers,
    render: ({ data, onChange }) => <AdditionalSectionsEditor data={data} onChange={onChange} />,
  },
};

export default function FormBuilder({ data, onChange }: FormBuilderProps) {
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

  const hiddenSections = data.customization?.hiddenSections || [];

  const isSectionHidden = (sectionId: string): boolean => {
    if (sectionId === 'basic') {
      return hiddenSections.includes('basic') || hiddenSections.includes('summary');
    }
    return hiddenSections.includes(sectionId);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    const customization = data.customization || createDefaultCustomization();
    const currentHidden = customization.hiddenSections || [];
    const targetKeys = sectionId === 'basic' ? ['basic', 'summary'] : [sectionId];
    const isCurrentlyHidden = isSectionHidden(sectionId);

    let nextHidden: string[];
    if (isCurrentlyHidden) {
      nextHidden = currentHidden.filter((s) => !targetKeys.includes(s));
    } else {
      nextHidden = [...currentHidden.filter((s) => !targetKeys.includes(s)), ...targetKeys];
    }

    onChange({
      ...data,
      customization: {
        ...customization,
        hiddenSections: nextHidden,
      },
    });
  };

  const getSectionOrder = (): string[] => {
    const customOrder = data.customization?.sectionOrder;
    if (!customOrder || customOrder.length === 0) {
      return DEFAULT_SECTIONS;
    }
    const normalized = customOrder.map((s) => {
      if (s === 'summary') return 'basic';
      if (s === 'custom') return 'certifications';
      return s;
    });
    const missing = DEFAULT_SECTIONS.filter((s) => !normalized.includes(s));
    const combined = [...normalized.filter((s) => DEFAULT_SECTIONS.includes(s)), ...missing];
    if (!combined.includes('basic')) {
      combined.unshift('basic');
    }
    return Array.from(new Set(combined));
  };

  const sectionOrder = getSectionOrder();

  const updateSectionOrder = (newOrder: string[]) => {
    const customization = data.customization || createDefaultCustomization();
    onChange({
      ...data,
      customization: {
        ...customization,
        sectionOrder: newOrder,
      },
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id as string);
      const newIndex = sectionOrder.indexOf(over.id as string);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(sectionOrder, oldIndex, newIndex);
        updateSectionOrder(reordered);
      }
    }
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const order = [...sectionOrder];
    const temp = order[index];
    order[index] = order[index - 1];
    order[index - 1] = temp;
    updateSectionOrder(order);
  };

  const handleMoveDown = (index: number) => {
    if (index >= sectionOrder.length - 1) return;
    const order = [...sectionOrder];
    const temp = order[index];
    order[index] = order[index + 1];
    order[index + 1] = temp;
    updateSectionOrder(order);
  };

  const getBadgeText = (sectionId: string): string => {
    switch (sectionId) {
      case 'basic':
        return data.basicInfo.name ? 'Complete' : 'Add name & contact';
      case 'experience':
        return data.experience.length === 0 ? 'Not added' : `${data.experience.length} ${data.experience.length === 1 ? 'role' : 'roles'}`;
      case 'education':
        return data.education.length === 0 ? 'Not added' : `${data.education.length} ${data.education.length === 1 ? 'entry' : 'entries'}`;
      case 'projects':
        return data.projects.length === 0 ? 'Not added' : `${data.projects.length} ${data.projects.length === 1 ? 'project' : 'projects'}`;
      case 'skills':
        return data.skills.length === 0 ? 'Not added' : `${data.skills.length} ${data.skills.length === 1 ? 'skill' : 'skills'}`;
      case 'certifications': {
        const count = (data.certifications?.length || 0) + (data.achievements?.length || 0) + (data.publications?.length || 0);
        return count === 0 ? 'Not added' : `${count} ${count === 1 ? 'item' : 'items'}`;
      }
      default:
        return '';
    }
  };

  const toggleCollapse = (id: string) => {
    setExpandedSectionId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] relative overflow-hidden">
      {/* Quick Jump Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs border-b border-gray-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-xs shrink-0">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 mr-1">Jump to:</span>
        {sectionOrder.map((sectionId) => {
          const meta = SECTION_METADATA[sectionId];
          if (!meta) return null;
          const isHidden = isSectionHidden(sectionId);
          return (
            <button
              key={sectionId}
              type="button"
              onClick={() => {
                const el = document.getElementById(`section-${sectionId}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                isHidden
                  ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isHidden && <EyeOff className="w-3 h-3 text-amber-600 shrink-0" />}
              <span>{meta.label.split('&')[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Unified Scrollable Content Workspace */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 min-h-0">
        <div className="max-w-3xl mx-auto space-y-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sectionOrder}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6" data-tour="section-list">
                {sectionOrder.map((sectionId, idx) => {
                  const meta = SECTION_METADATA[sectionId];
                  if (!meta) return null;
                  const RenderComponent = meta.render;
                  return (
                    <SectionCard
                      key={sectionId}
                      id={sectionId}
                      title={meta.label}
                      icon={meta.icon}
                      badge={getBadgeText(sectionId)}
                      isCollapsed={expandedSectionId !== sectionId}
                      isHidden={isSectionHidden(sectionId)}
                      onToggleVisibility={() => toggleSectionVisibility(sectionId)}
                      onToggleCollapse={() => toggleCollapse(sectionId)}
                      onMoveUp={() => handleMoveUp(idx)}
                      onMoveDown={() => handleMoveDown(idx)}
                      isFirst={idx === 0}
                      isLast={idx === sectionOrder.length - 1}
                    >
                      <RenderComponent data={data} onChange={onChange} />
                    </SectionCard>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
