import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LIFE_VALUES, LifeValue } from '@/types/survey';
import Icon from '@/components/ui/icon';

interface RankingScreenProps {
  onComplete: (ranking: LifeValue[]) => void;
}

const RankingScreen = ({ onComplete }: RankingScreenProps) => {
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setSelectedValues(prev => {
      if (prev.includes(id)) {
        return prev.filter(v => v !== id);
      } else if (prev.length < 2) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (selectedValues.length === 2) {
      const ranking = LIFE_VALUES.filter(v => selectedValues.includes(v.id));
      onComplete(ranking);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-5xl w-full p-8 md:p-12 bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Выберите самые важные
            </h2>
            <p className="text-gray-600 text-lg">
              Выберите из двух ценностей ту, которая для Вас наиболее важна
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Icon name="Info" size={16} />
              <span>Выбрано: {selectedValues.length} из 2</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {LIFE_VALUES.map((value) => {
              const isSelected = selectedValues.includes(value.id);
              const canSelect = selectedValues.length < 2 || isSelected;

              return (
                <button
                  key={value.id}
                  onClick={() => canSelect && handleToggle(value.id)}
                  disabled={!canSelect}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-100 to-purple-100 border-blue-500 shadow-lg scale-105'
                      : canSelect
                      ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                      : 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`text-2xl font-bold ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>
                      {value.id}
                    </div>
                    {isSelected && (
                      <Icon name="CheckCircle2" size={24} className="text-blue-600" />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </button>
              );
            })}
          </div>

          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={selectedValues.length !== 2}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg disabled:opacity-50 mt-8"
          >
            Продолжить к оценке
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RankingScreen;
