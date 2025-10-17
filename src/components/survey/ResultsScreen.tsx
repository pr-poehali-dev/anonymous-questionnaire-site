import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SurveyData, LifeValue, ComparisonResult, MatrixScores, LIFE_VALUES } from '@/types/survey';
import Icon from '@/components/ui/icon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ResultsScreenProps {
  surveyData: SurveyData;
  pairwiseResults: ComparisonResult[];
  rankingValueResults: number[];
  rankingAccessResults: number[];
  matrixValueScores: MatrixScores;
  matrixAccessScores: MatrixScores;
  onRestart: () => void;
}

const ResultsScreen = ({
  surveyData,
  rankingValueResults,
  rankingAccessResults,
  matrixValueScores,
  matrixAccessScores,
  onRestart,
}: ResultsScreenProps) => {
  const calculateAnalysis = () => {
    const differences: Array<{ value: LifeValue; valueScore: number; accessScore: number; diff: number }> = [];
    let totalValueScore = 0;
    let totalAccessScore = 0;

    LIFE_VALUES.forEach(value => {
      const valueScore = matrixValueScores[value.id] || 0;
      const accessScore = matrixAccessScores[value.id] || 0;
      const diff = Math.abs(valueScore - accessScore);
      
      totalValueScore += valueScore;
      totalAccessScore += accessScore;
      
      differences.push({
        value,
        valueScore,
        accessScore,
        diff,
      });
    });

    const totalDifference = differences.reduce((sum, item) => sum + item.diff, 0);
    
    let conflict: 'low' | 'medium' | 'high' = 'low';
    if (totalDifference > 40) conflict = 'high';
    else if (totalDifference > 20) conflict = 'medium';

    differences.sort((a, b) => b.diff - a.diff);
    const mostConflicted = differences.slice(0, 5);

    const sortedByValue = [...differences].sort((a, b) => b.valueScore - a.valueScore);
    const topValues = sortedByValue.slice(0, 5).map(d => d.value);

    const sortedByAccess = [...differences].sort((a, b) => b.accessScore - a.accessScore);
    const topAccessible = sortedByAccess.slice(0, 5).map(d => d.value);

    return {
      totalValue: totalValueScore,
      totalAccess: totalAccessScore,
      difference: totalDifference,
      conflict,
      topValues,
      topAccessible,
      mostConflicted,
      allScores: differences,
    };
  };

  const analysis = calculateAnalysis();

  const chartData = analysis.allScores.map(item => ({
    name: `${item.value.id}`,
    fullName: item.value.title.length > 20 ? item.value.title.substring(0, 20) + '...' : item.value.title,
    ценность: item.valueScore,
    доступность: item.accessScore,
  }));

  const radarData = analysis.allScores.map(item => ({
    subject: `${item.value.id}`,
    ценность: item.valueScore,
    доступность: item.accessScore,
  }));

  const getConflictColor = () => {
    if (analysis.conflict === 'high') return 'text-red-600';
    if (analysis.conflict === 'medium') return 'text-yellow-600';
    return 'text-green-600';
  };

  const getConflictText = () => {
    if (analysis.conflict === 'high') return 'Высокий уровень внутреннего конфликта';
    if (analysis.conflict === 'medium') return 'Средний уровень внутреннего конфликта';
    return 'Низкий уровень внутреннего конфликта';
  };

  const getConflictDescription = () => {
    if (analysis.conflict === 'high') {
      return 'Большая разница между желаниями и возможностями может вызывать стресс и неудовлетворенность. Рекомендуется пересмотреть приоритеты или найти пути к реализации важных ценностей.';
    }
    if (analysis.conflict === 'medium') {
      return 'Присутствует некоторое расхождение между желаемым и доступным. Стоит обратить внимание на наиболее конфликтные области.';
    }
    return 'Ваши желания хорошо соответствуют вашим возможностям. Вы находитесь в гармоничном состоянии.';
  };

  return (
    <div className="min-h-screen p-4 py-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Результаты анализа
              </h1>
              <p className="text-gray-600 mt-2">
                Участник: {surveyData.gender === 'male' ? 'Мужчина' : 'Женщина'}, {surveyData.age} лет
              </p>
            </div>
            <Button onClick={onRestart} variant="outline" size="lg">
              <Icon name="RotateCcw" size={20} className="mr-2" />
              Пройти заново
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Общая ценность</h3>
                <Icon name="Star" size={24} className="text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600">{analysis.totalValue}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Общая доступность</h3>
                <Icon name="CheckCircle2" size={24} className="text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{analysis.totalAccess}</p>
            </Card>

            <Card className={`p-6 bg-gradient-to-br ${
              analysis.conflict === 'high' ? 'from-red-50 to-red-100 border-red-200' :
              analysis.conflict === 'medium' ? 'from-yellow-50 to-yellow-100 border-yellow-200' :
              'from-green-50 to-green-100 border-green-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Уровень конфликта</h3>
                <Icon name="Activity" size={24} className={getConflictColor()} />
              </div>
              <p className={`text-3xl font-bold ${getConflictColor()}`}>{analysis.difference}</p>
            </Card>
          </div>

          <Card className="p-6 mb-8 border-2 border-gray-200">
            <h3 className={`text-2xl font-bold mb-3 ${getConflictColor()}`}>
              {getConflictText()}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {getConflictDescription()}
            </p>
          </Card>
        </Card>

        <Tabs defaultValue="rankings" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="rankings">Ранжирование</TabsTrigger>
            <TabsTrigger value="charts">Графики</TabsTrigger>
            <TabsTrigger value="top">Топ ценностей</TabsTrigger>
            <TabsTrigger value="conflicts">Конфликты</TabsTrigger>
            <TabsTrigger value="detailed">Детально</TabsTrigger>
          </TabsList>

          <TabsContent value="rankings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-8 bg-white/80 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-blue-600 flex items-center">
                  <Icon name="Award" size={28} className="mr-2" />
                  Ранжирование по важности
                </h3>
                <div className="space-y-3">
                  {rankingValueResults.map((id, index) => {
                    const value = LIFE_VALUES.find(v => v.id === id)!;
                    return (
                      <div key={id} className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white font-bold shadow-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-gray-500">#{value.id}</span>
                            <h4 className="font-semibold text-gray-800">{value.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{value.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-8 bg-white/80 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-green-600 flex items-center">
                  <Icon name="Target" size={28} className="mr-2" />
                  Ранжирование по доступности
                </h3>
                <div className="space-y-3">
                  {rankingAccessResults.map((id, index) => {
                    const value = LIFE_VALUES.find(v => v.id === id)!;
                    return (
                      <div key={id} className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-600 text-white font-bold shadow-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-gray-500">#{value.id}</span>
                            <h4 className="font-semibold text-gray-800">{value.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{value.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Сравнительный анализ</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={({ payload }) => {
                    if (payload && payload.length > 0) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-4 border rounded-lg shadow-lg">
                          <p className="font-semibold">{data.fullName}</p>
                          <p className="text-blue-600">Ценность: {data.ценность}</p>
                          <p className="text-green-600">Доступность: {data.доступность}</p>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Legend />
                  <Bar dataKey="ценность" fill="#3b82f6" />
                  <Bar dataKey="доступность" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Радар анализ</h3>
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Ценность" dataKey="ценность" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="Доступность" dataKey="доступность" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="top" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-8 bg-white/80 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-blue-600 flex items-center">
                  <Icon name="Star" size={28} className="mr-2" />
                  Топ-5 ценностей
                </h3>
                <div className="space-y-4">
                  {analysis.topValues.map((value, index) => (
                    <div key={value.id} className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600 w-8">{index + 1}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{value.title}</h4>
                        <p className="text-sm text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 bg-white/80 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-green-600 flex items-center">
                  <Icon name="CheckCircle2" size={28} className="mr-2" />
                  Топ-5 доступных
                </h3>
                <div className="space-y-4">
                  {analysis.topAccessible.map((value, index) => (
                    <div key={value.id} className="flex items-start space-x-4 p-4 rounded-lg bg-green-50 border border-green-200">
                      <div className="text-2xl font-bold text-green-600 w-8">{index + 1}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{value.title}</h4>
                        <p className="text-sm text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conflicts">
            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-red-600 flex items-center">
                <Icon name="AlertTriangle" size={28} className="mr-2" />
                Зоны наибольшего конфликта
              </h3>
              <p className="text-gray-600 mb-6">
                Эти области показывают наибольшее расхождение между важностью и доступностью
              </p>
              <div className="space-y-4">
                {analysis.mostConflicted.map((item, index) => (
                  <div key={item.value.id} className="p-6 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl font-bold text-red-600">{index + 1}</span>
                          <h4 className="font-bold text-xl text-gray-800">{item.value.title}</h4>
                        </div>
                        <p className="text-gray-600 mb-4">{item.value.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-3xl font-bold text-red-600">{item.diff}</div>
                        <div className="text-sm text-gray-500">разница</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Ценность</div>
                        <Progress value={(item.valueScore / 11) * 100} className="h-3 bg-blue-100" />
                        <div className="text-sm font-semibold text-blue-600 mt-1">{item.valueScore} баллов</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Доступность</div>
                        <Progress value={(item.accessScore / 11) * 100} className="h-3 bg-green-100" />
                        <div className="text-sm font-semibold text-green-600 mt-1">{item.accessScore} баллов</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="detailed">
            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Детальная таблица результатов</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left p-3 font-bold">№</th>
                      <th className="text-left p-3 font-bold">Ценность</th>
                      <th className="text-center p-3 font-bold text-blue-600">Важность</th>
                      <th className="text-center p-3 font-bold text-green-600">Доступность</th>
                      <th className="text-center p-3 font-bold text-red-600">Разница</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.allScores.map((item) => (
                      <tr key={item.value.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-semibold text-gray-600">{item.value.id}</td>
                        <td className="p-3">
                          <div className="font-semibold text-gray-800">{item.value.title}</div>
                          <div className="text-sm text-gray-600">{item.value.description}</div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                            {item.valueScore}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                            {item.accessScore}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className={`inline-block px-3 py-1 rounded-full font-semibold ${
                            item.diff > 5 ? 'bg-red-100 text-red-700' :
                            item.diff > 2 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {item.diff}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResultsScreen;