import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface DemographicFormProps {
  onComplete: (data: { gender: string; age: number }) => void;
}

const DemographicForm = ({ onComplete }: DemographicFormProps) => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState([18]);

  const handleSubmit = () => {
    if (gender) {
      onComplete({ gender, age: age[0] });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              О вас
            </h2>
            <p className="text-gray-600 mt-2">Эти данные помогут в анализе результатов</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-700">Пол</Label>
              <RadioGroup value={gender} onValueChange={setGender}>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors cursor-pointer">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="flex items-center cursor-pointer flex-1">
                      <Icon name="User" size={20} className="mr-2 text-blue-600" />
                      <span className="text-lg">Парень</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-purple-400 transition-colors cursor-pointer">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="flex items-center cursor-pointer flex-1">
                      <Icon name="User" size={20} className="mr-2 text-purple-600" />
                      <span className="text-lg">Девушка</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-700">
                Возраст: <span className="text-blue-600">{age[0]} лет</span>
              </Label>
              <Slider
                value={age}
                onValueChange={setAge}
                min={16}
                max={21}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>16 лет</span>
                <span>21 год</span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!gender}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg disabled:opacity-50"
          >
            Продолжить
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DemographicForm;
