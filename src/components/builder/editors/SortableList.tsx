import React from 'react';
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
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: React.ReactNode;
  dragHandle?: boolean;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children, dragHandle = false }) => {
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
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`relative bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm ${isDragging ? 'opacity-50 ring-2 ring-[#2563EB]' : ''}`}>
      {dragHandle ? (
        <div className="flex">
          <div {...attributes} {...listeners} className="w-8 flex items-center justify-center bg-[#F9FAFB] border-r border-[#E5E7EB] cursor-grab hover:bg-[#E5E7EB] shrink-0 text-[#9CA3AF]">
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      ) : (
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          {children}
        </div>
      )}
    </div>
  );
}

interface SortableListProps {
  items: string[];
  onReorder: (newItems: string[]) => void;
  children: React.ReactNode;
}

export function SortableList({ items, onReorder, children }: SortableListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {children}
        </div>
      </SortableContext>
    </DndContext>
  );
}
