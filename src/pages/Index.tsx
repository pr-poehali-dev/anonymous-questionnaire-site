import { useState } from 'react';
import WelcomeScreen from '@/components/survey/WelcomeScreen';
import DemographicForm from '@/components/survey/DemographicForm';
import MatrixScreen from '@/components/survey/MatrixScreen';
import RankingScreen from '@/components/survey/RankingScreen';
import ResultsScreen from '@/components/survey/ResultsScreen';
import { SurveyData, MatrixScores } from '@/types/survey';

type SurveyStep = 'welcome' | 'demographic' | 'matrix-value' | 'matrix-access' | 'ranking-value' | 'ranking-access' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<SurveyStep>('welcome');
  const [surveyData, setSurveyData] = useState<SurveyData>({
    gender: '',
    age: 16,
  });

  const [rankingValueResults, setRankingValueResults] = useState<number[]>([]);
  const [rankingAccessResults, setRankingAccessResults] = useState<number[]>([]);
  const [matrixValueScores, setMatrixValueScores] = useState<MatrixScores>({});
  const [matrixAccessScores, setMatrixAccessScores] = useState<MatrixScores>({});

  const handleStartSurvey = () => {
    setCurrentStep('demographic');
  };

  const handleDemographicComplete = (data: Pick<SurveyData, 'gender' | 'age'>) => {
    setSurveyData({ ...surveyData, ...data });
    setCurrentStep('matrix-value');
  };



  const handleRankingValueComplete = (ranking: number[]) => {
    setRankingValueResults(ranking);
    setCurrentStep('ranking-access');
  };

  const handleRankingAccessComplete = (ranking: number[]) => {
    setRankingAccessResults(ranking);
    setCurrentStep('matrix-access');
  };

  const handleMatrixValueComplete = (scores: MatrixScores) => {
    setMatrixValueScores(scores);
    setCurrentStep('ranking-value');
  };

  const handleMatrixAccessComplete = (scores: MatrixScores) => {
    setMatrixAccessScores(scores);
    setCurrentStep('ranking-access');
  };

  const handleRankingAccessComplete2 = (ranking: number[]) => {
    setRankingAccessResults(ranking);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setSurveyData({ gender: '', age: 16 });
    setRankingValueResults([]);
    setRankingAccessResults([]);
    setMatrixValueScores({});
    setMatrixAccessScores({});
    setCurrentStep('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {currentStep === 'welcome' && <WelcomeScreen onStart={handleStartSurvey} />}
      {currentStep === 'demographic' && <DemographicForm onComplete={handleDemographicComplete} />}
      {currentStep === 'matrix-value' && (
        <MatrixScreen 
          type="value" 
          onComplete={handleMatrixValueComplete}
        />
      )}
      {currentStep === 'ranking-value' && <RankingScreen type="value" onComplete={handleRankingValueComplete} />}
      {currentStep === 'matrix-access' && (
        <MatrixScreen 
          type="access" 
          onComplete={handleMatrixAccessComplete}
        />
      )}
      {currentStep === 'ranking-access' && <RankingScreen type="access" onComplete={handleRankingAccessComplete2} />}
      {currentStep === 'results' && (
        <ResultsScreen
          surveyData={surveyData}
          rankingValueResults={rankingValueResults}
          rankingAccessResults={rankingAccessResults}
          matrixValueScores={matrixValueScores}
          matrixAccessScores={matrixAccessScores}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;