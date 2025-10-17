import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LIFE_VALUES, ComparisonResult } from '@/types/survey';
import Icon from '@/components/ui/icon';

interface PairwiseComparisonProps {
  onComplete: (results: ComparisonResult[]) => void;
}

const generatePairs = () => {
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < LIFE_VALUES.length; i++) {
    for (let j = i + 1; j < LIFE_VALUES.length; j++) {
      pairs.push([i, j]);
    }
  }
  return pairs;
};

const PairwiseComparison = ({ onComplete }: PairwiseComparisonProps) => {
  const [pairs] = useState(generatePairs());
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [results, setResults] = useState<ComparisonResult[]>([]);

  const currentPair = pairs[currentPairIndex];
  const value1 = LIFE_VALUES[currentPair[0]];
  const value2 = LIFE_VALUES[currentPair[1]];
  const progress = ((currentPairIndex + 1) / pairs.length) * 100;

  const handleChoice = (winnerId: number, loserId: number) => {
    const newResult: ComparisonResult = {
      comparison: `${winnerId} vs ${loserId}`,
      winner: winnerId,
      loser: loserId,
    };
    
    const newResults = [...results, newResult];
    setResults(newResults);

    if (currentPairIndex < pairs.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else {
      onComplete(newResults);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full p-8 md:p-12 bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="font-semibold">Этап 1: Сравнение по важности</span>
              <span>{currentPairIndex + 1} из {pairs.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              Что для вас важнее?
            </h2>
            <p className="text-gray-600">Выберите ту ценность, которая имеет большее значение лично для вас</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <button
              onClick={() => handleChoice(value1.id, value2.id)}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="CheckCircle2" size={24} className="text-blue-600" />
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-blue-600">{value1.id}</div>
                <h3 className="text-xl font-semibold text-gray-800">{value1.title}</h3>
                <p className="text-gray-600">{value1.description}</p>
              </div>
            </button>

            <button
              onClick={() => handleChoice(value2.id, value1.id)}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="CheckCircle2" size={24} className="text-purple-600" />
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-purple-600">{value2.id}</div>
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

export default PairwiseComparison;
