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
              Вы должны дважды произвести попарное сравнение (попарное ранжирование):
            </p>
            
            <ul className="space-y-2 pl-6">
              <li className="flex items-start">
                <Icon name="CheckCircle2" size={20} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                <span>Первый раз — по <strong>ценности</strong> (важности)</span>
              </li>
              <li className="flex items-start">
                <Icon name="CheckCircle2" size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                <span>Второй раз — по <strong>доступности</strong> (возможности)</span>
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
