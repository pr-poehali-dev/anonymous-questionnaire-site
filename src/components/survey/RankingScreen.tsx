import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LIFE_VALUES } from '@/types/survey';
import Icon from '@/components/ui/icon';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface RankingScreenProps {
  type: 'value' | 'access';
  onComplete: (ranking: number[]) => void;
}

interface SortableItemProps {
  id: number;
  index: number;
  title: string;
  description: string;
  image: string;
  type: 'value' | 'access';
}

const SortableItem = ({ id, index, title, description, image, type }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-move ${
        isDragging
          ? 'bg-white border-blue-500 shadow-2xl scale-105 opacity-50'
          : type === 'value'
          ? 'border-blue-200 hover:border-blue-400 hover:shadow-lg'
          : 'border-green-200 hover:border-green-400 hover:shadow-lg'
      }`}
    >
      <div className="flex items-center gap-4 bg-white">
        <div className="relative w-24 h-24 flex-shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/50" />
          <div className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-lg bg-white/90 shadow-sm">
            <span className={`text-sm font-bold ${type === 'value' ? 'text-blue-600' : 'text-green-600'}`}>
              {index + 1}
            </span>
          </div>
        </div>
        <div className="flex-1 py-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-500">#{id}</span>
            <h3 className="text-base font-bold text-gray-800">{title}</h3>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="pr-4">
          <Icon name="GripVertical" size={24} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

const RankingScreen = ({ type, onComplete }: RankingScreenProps) => {
  const [items, setItems] = useState(LIFE_VALUES.map(v => v.id));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(Number(active.id));
        const newIndex = items.indexOf(Number(over.id));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = () => {
    onComplete(items);
  };

  const title = type === 'value'
    ? 'Ранжирование по важности'
    : 'Ранжирование по доступности';

  const description = type === 'value'
    ? 'Расположите ценности в порядке убывания их важности для вас. Самая важная должна быть первой.'
    : 'Расположите ценности в порядке убывания их доступности для вас. Самая доступная должна быть первой.';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <Card className="max-w-4xl w-full p-8 md:p-12 bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="text-sm font-semibold text-gray-600 mb-2">
              {type === 'value' ? 'Этап 1' : 'Этап 3'}: {title}
            </div>
            <h2 className={`text-3xl font-bold ${type === 'value' ? 'text-blue-600' : 'text-purple-600'}`}>
              {title}
            </h2>
            <p className="text-gray-600 text-lg">{description}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-100 p-3 rounded-lg">
              <Icon name="Info" size={18} />
              <span>Перетаскивайте карточки для изменения порядка</span>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items.map(id => id.toString())} strategy={verticalListSortingStrategy}>
              <div className="space-y-3 mt-8">
                {items.map((id, index) => {
                  const value = LIFE_VALUES.find(v => v.id === id)!;
                  return (
                    <SortableItem
                      key={id}
                      id={id}
                      index={index}
                      title={value.title}
                      description={value.description}
                      image={value.image}
                      type={type}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>

          <Button
            size="lg"
            onClick={handleSubmit}
            className={`w-full text-white py-6 text-lg mt-8 ${
              type === 'value'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
            }`}
          >
            Продолжить
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RankingScreen;