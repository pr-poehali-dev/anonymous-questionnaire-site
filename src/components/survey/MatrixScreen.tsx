import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LIFE_VALUES, MatrixScores } from '@/types/survey';
import Icon from '@/components/ui/icon';

interface MatrixScreenProps {
  type: 'value' | 'access';
  onComplete: (scores: MatrixScores) => void;
}

const MATRIX_PAIRS = [
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
  [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 11], [10, 12],
  [1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [7, 10], [8, 11], [9, 12],
  [1, 5], [2, 6], [3, 7], [4, 8], [5, 9], [6, 10], [7, 11], [8, 12],
  [1, 6], [2, 7], [3, 8], [4, 9], [5, 10], [6, 11], [7, 12],
  [1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12],
  [1, 8], [2, 9], [3, 10], [4, 11], [5, 12],
  [1, 9], [2, 10], [3, 11], [4, 12],
  [1, 10], [2, 11], [3, 12],
  [1, 11], [2, 12],
  [1, 12],
];

const MatrixScreen = ({ type, onComplete }: MatrixScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<MatrixScores>({});

  const currentPair = MATRIX_PAIRS[currentIndex];
  const value1 = LIFE_VALUES.find(v => v.id === currentPair[0])!;
  const value2 = LIFE_VALUES.find(v => v.id === currentPair[1])!;
  const progress = ((currentIndex + 1) / MATRIX_PAIRS.length) * 100;

  const title = type === 'value' 
    ? 'Матрица 1: Сравните понятия-ценности на основе их большей значимости для Вас'
    : 'Матрица 2: Сравнительные понятия-ценности на основе их большей достижимости для Вас';

  const question = type === 'value'
    ? 'Что важнее для вас?'
    : 'Что доступнее для вас?';

  const handleChoice = (winnerId: number) => {
    const newScores = { ...scores };
    newScores[winnerId] = (newScores[winnerId] || 0) + 1;
    setScores(newScores);

    if (currentIndex < MATRIX_PAIRS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newScores);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full p-8 md:p-12 bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="font-semibold">{type === 'value' ? 'Этап 2' : 'Этап 3'}: {type === 'value' ? 'Ценность' : 'Доступность'}</span>
              <span>{currentIndex + 1} из {MATRIX_PAIRS.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              {question}
            </h2>
            <p className="text-gray-600">{title}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <button
              onClick={() => handleChoice(value1.id)}
              className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                type === 'value'
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 hover:border-blue-400'
                  : 'bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200 hover:border-green-400'
              }`}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="CheckCircle2" size={24} className={type === 'value' ? 'text-blue-600' : 'text-green-600'} />
              </div>
              <div className="space-y-3">
                <div className={`text-3xl font-bold ${type === 'value' ? 'text-blue-600' : 'text-green-600'}`}>
                  {value1.id}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{value1.title}</h3>
                <p className="text-gray-600">{value1.description}</p>
              </div>
            </button>

            <button
              onClick={() => handleChoice(value2.id)}
              className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                type === 'value'
                  ? 'bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-purple-200 hover:border-purple-400'
                  : 'bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 border-teal-200 hover:border-teal-400'
              }`}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="CheckCircle2" size={24} className={type === 'value' ? 'text-purple-600' : 'text-teal-600'} />
              </div>
              <div className="space-y-3">
                <div className={`text-3xl font-bold ${type === 'value' ? 'text-purple-600' : 'text-teal-600'}`}>
                  {value2.id}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{value2.title}</h3>
                <p className="text-gray-600">{value2.description}</p>
              </div>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MatrixScreen;
