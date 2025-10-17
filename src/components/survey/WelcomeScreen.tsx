import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { LIFE_VALUES } from '@/types/survey';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="relative h-64 overflow-hidden">
          <img 
            src="https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/320ba1b6-2b1c-4499-b0f2-7760aa50afd0.jpg" 
            alt="Life values" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-purple-900/70 to-purple-900/90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50">
              <Icon name="Brain" size={40} className="text-white" />
            </div>
          </div>
        </div>
        <div className="p-8 md:p-12 space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
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

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Icon name="List" size={24} className="mr-2 text-purple-600" />
              12 жизненных ценностей для оценки:
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {LIFE_VALUES.map((value) => (
                <div key={value.id} className="flex items-start space-x-3 bg-white/70 p-3 rounded-lg">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={value.image} alt={value.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-purple-600">#{value.id}</span>
                      <h4 className="text-sm font-semibold text-gray-800 truncate">{value.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
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