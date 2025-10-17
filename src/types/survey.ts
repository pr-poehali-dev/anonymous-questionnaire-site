export interface LifeValue {
  id: number;
  title: string;
  description: string;
}

export const LIFE_VALUES: LifeValue[] = [
  { id: 1, title: 'Активная, деятельная жизнь', description: 'Полнота и эмоциональная насыщенность жизни' },
  { id: 2, title: 'Здоровье', description: 'Физическое и психологическое' },
  { id: 3, title: 'Интересная работа', description: 'Профессиональная реализация' },
  { id: 4, title: 'Красота природы и искусства', description: 'Переживание прекрасного' },
  { id: 5, title: 'Любовь', description: 'Духовная и физическая близость' },
  { id: 6, title: 'Материально обеспеченная жизнь', description: 'Отсутствие материальных затруднений' },
  { id: 7, title: 'Наличие хороших и верных друзей', description: 'Социальные связи' },
  { id: 8, title: 'Уверенность в себе', description: 'Свобода от внутренних противоречий' },
  { id: 9, title: 'Познание', description: 'Возможность расширения образования' },
  { id: 10, title: 'Свобода', description: 'Независимость в поступках и действиях' },
  { id: 11, title: 'Счастливая семейная жизнь', description: 'Гармония в семье' },
  { id: 12, title: 'Творчество', description: 'Возможность творческой деятельности' },
];

export interface ComparisonResult {
  comparison: string;
  winner: number;
  loser: number;
}

export interface MatrixScores {
  [key: number]: number;
}

export interface SurveyData {
  gender: string;
  age: number;
}

export interface AnalysisResult {
  totalValue: number;
  totalAccess: number;
  difference: number;
  conflict: 'low' | 'medium' | 'high';
  topValues: LifeValue[];
  topAccessible: LifeValue[];
  mostConflicted: Array<{ value: LifeValue; valuScore: number; accessScore: number; diff: number }>;
}
