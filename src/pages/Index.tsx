import { useState } from 'react';
import WelcomeScreen from '@/components/survey/WelcomeScreen';
import DemographicForm from '@/components/survey/DemographicForm';
import PairwiseComparison from '@/components/survey/PairwiseComparison';
import RankingScreen from '@/components/survey/RankingScreen';
import MatrixScreen from '@/components/survey/MatrixScreen';
import ResultsScreen from '@/components/survey/ResultsScreen';
import { SurveyData, ComparisonResult, MatrixScores } from '@/types/survey';

type SurveyStep = 'welcome' | 'demographic' | 'pairwise' | 'ranking-value' | 'ranking-access' | 'matrix-value' | 'matrix-access' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<SurveyStep>('welcome');
  const [surveyData, setSurveyData] = useState<SurveyData>({
    gender: '',
    age: 16,
  });
  const [pairwiseResults, setPairwiseResults] = useState<ComparisonResult[]>([]);
  const [rankingValueResults, setRankingValueResults] = useState<number[]>([]);
  const [rankingAccessResults, setRankingAccessResults] = useState<number[]>([]);
  const [matrixValueScores, setMatrixValueScores] = useState<MatrixScores>({});
  const [matrixAccessScores, setMatrixAccessScores] = useState<MatrixScores>({});

  const handleStartSurvey = () => {
    setCurrentStep('demographic');
  };

  const handleDemographicComplete = (data: Pick<SurveyData, 'gender' | 'age'>) => {
    setSurveyData({ ...surveyData, ...data });
    setCurrentStep('pairwise');
  };

  const handlePairwiseComplete = (results: ComparisonResult[]) => {
    setPairwiseResults(results);
    setCurrentStep('ranking-value');
  };

  const handleRankingValueComplete = (ranking: number[]) => {
    setRankingValueResults(ranking);
    setCurrentStep('ranking-access');
  };

  const handleRankingAccessComplete = (ranking: number[]) => {
    setRankingAccessResults(ranking);
    setCurrentStep('matrix-value');
  };

  const handleMatrixValueComplete = (scores: MatrixScores) => {
    setMatrixValueScores(scores);
    setCurrentStep('matrix-access');
  };

  const handleMatrixAccessComplete = (scores: MatrixScores) => {
    setMatrixAccessScores(scores);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setSurveyData({ gender: '', age: 16 });
    setPairwiseResults([]);
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
      {currentStep === 'pairwise' && <PairwiseComparison onComplete={handlePairwiseComplete} />}
      {currentStep === 'ranking-value' && <RankingScreen type="value" onComplete={handleRankingValueComplete} />}
      {currentStep === 'ranking-access' && <RankingScreen type="access" onComplete={handleRankingAccessComplete} />}
      {currentStep === 'matrix-value' && (
        <MatrixScreen 
          type="value" 
          onComplete={handleMatrixValueComplete}
        />
      )}
      {currentStep === 'matrix-access' && (
        <MatrixScreen 
          type="access" 
          onComplete={handleMatrixAccessComplete}
        />
      )}
      {currentStep === 'results' && (
        <ResultsScreen
          surveyData={surveyData}
          pairwiseResults={pairwiseResults}
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