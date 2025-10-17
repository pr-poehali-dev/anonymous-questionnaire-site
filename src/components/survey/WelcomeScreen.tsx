import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-8 md:p-12 bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Icon name="Brain" size={40} className="text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Методика «Уровень соотношения ценности и доступности в различных жизненных сферах»
          </h1>
          
          <div className="text-left space-y-4 text-gray-700">
            <p className="text-lg">
              <span className="font-semibold">Инструкция:</span> Вам предлагаются 12 жизненных ценностей. 
              Тестирование состоит из 4 этапов:
            </p>
            
            <ul className="space-y-3 pl-6">
              <li className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm mr-3 mt-0.5 flex-shrink-0">
                  1
                </div>
                <span><strong>Ранжирование по важности</strong> — расположите все ценности в порядке их значимости</span>
              </li>
              <li className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-sm mr-3 mt-0.5 flex-shrink-0">
                  2
                </div>
                <span><strong>Попарное сравнение по привлекательности</strong> — выберите более важную ценность из каждой пары</span>
              </li>
              <li className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold text-sm mr-3 mt-0.5 flex-shrink-0">
                  3
                </div>
                <span><strong>Ранжирование по доступности</strong> — расположите ценности по степени их достижимости</span>
              </li>
              <li className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mr-3 mt-0.5 flex-shrink-0">
                  4
                </div>
                <span><strong>Попарное сравнение по достижимости</strong> — выберите более доступную ценность из каждой пары</span>
              </li>
            </ul>
            
            <p className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              В конце вы получите детальный анализ вашего внутреннего баланса между желаниями и возможностями.
            </p>
          </div>
          
          <Button 
            size="lg" 
            onClick={onStart}
            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg"
          >
            Начать тестирование
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeScreen;