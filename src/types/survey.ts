export interface LifeValue {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const LIFE_VALUES: LifeValue[] = [
  { 
    id: 1, 
    title: 'Активная, деятельная жизнь', 
    description: 'Полнота и эмоциональная насыщенность жизни',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/7c09f59a-6c04-482c-8992-78d2cc71dd8f.jpg'
  },
  { 
    id: 2, 
    title: 'Здоровье', 
    description: 'Физическое и психологическое',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/12666ea1-f0df-4453-81e8-aefa9727d63f.jpg'
  },
  { 
    id: 3, 
    title: 'Интересная работа', 
    description: 'Профессиональная реализация',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/57e20575-b29a-48bf-a767-875467dca274.jpg'
  },
  { 
    id: 4, 
    title: 'Красота природы и искусства', 
    description: 'Переживание прекрасного',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/0e71ea95-c450-4ef2-be26-caea78671b4f.jpg'
  },
  { 
    id: 5, 
    title: 'Любовь', 
    description: 'Духовная и физическая близость',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/f123ed9c-b206-4ff8-8be0-d071ace62adb.jpg'
  },
  { 
    id: 6, 
    title: 'Материально обеспеченная жизнь', 
    description: 'Отсутствие материальных затруднений',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/c098f12b-7a87-4053-a649-074fed288c17.jpg'
  },
  { 
    id: 7, 
    title: 'Наличие хороших и верных друзей', 
    description: 'Социальные связи',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/e1058398-1db1-4fb1-8183-2edd0de4078d.jpg'
  },
  { 
    id: 8, 
    title: 'Уверенность в себе', 
    description: 'Свобода от внутренних противоречий, сомнений',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/cf9b25c8-dfea-4e65-a874-8ee9cc1965c3.jpg'
  },
  { 
    id: 9, 
    title: 'Познание', 
    description: 'Возможность расширения своего образования',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/b397acab-21ca-469f-8ed1-b708d22e85cb.jpg'
  },
  { 
    id: 10, 
    title: 'Свобода', 
    description: 'Свобода как независимость в поступках и действиях',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/5779a938-9c38-4f4b-b2ef-4bc5a308c847.jpg'
  },
  { 
    id: 11, 
    title: 'Счастливая семейная жизнь', 
    description: 'Гармония в семье',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/950cc66c-c72f-4d74-89d7-745fee2b78dc.jpg'
  },
  { 
    id: 12, 
    title: 'Творчество', 
    description: 'Возможность творческой деятельности',
    image: 'https://cdn.poehali.dev/projects/0cad356e-bea3-4d8f-b1d2-e0d67409133f/files/0c3bc766-ee7a-44c9-9b91-54ab9c86919c.jpg'
  },
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