export interface QuizData {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  category: Record<string, string>;
  thumbnail: string;
  questions: Array<{
    id: string;
    dimension?: string;
    text: Record<string, string>;
    answers: Array<{
      id: string;
      text: Record<string, string>;
      score: number | string;
    }>;
  }>;
  results: Record<string, {
    title: Record<string, string>;
    description: Record<string, string>;
    image: string;
    food?: Record<string, string>;
    emoji?: string;
    kvibeScore?: number;
  }>;
}

export interface QuizIndex {
  id: string;
  file: string;
}

function getQuizUrl(path: string): string {
  const base = import.meta.env.VITE_BASE_URL || import.meta.env.BASE_URL || '/';
  return new URL(path, window.location.origin + base).href;
}

export async function loadQuizIndex(): Promise<QuizIndex[]> {
  const url = getQuizUrl('quizzes/index.json');
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to load quiz index');
  }
  return response.json();
}

export async function loadQuiz(fileName: string): Promise<QuizData> {
  const url = getQuizUrl(`quizzes/${fileName}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load quiz: ${fileName}`);
  }
  return response.json();
}

export async function loadQuizById(quizId: string): Promise<QuizData> {
  const index = await loadQuizIndex();
  const quizInfo = index.find((q) => q.id === quizId);
  
  if (!quizInfo) {
    throw new Error(`Quiz not found: ${quizId}`);
  }
  
  return loadQuiz(quizInfo.file);
}

export async function loadAllQuizzes(): Promise<QuizData[]> {
  const index = await loadQuizIndex();
  const quizzes = await Promise.all(
    index.map((quizInfo) => loadQuiz(quizInfo.file))
  );
  return quizzes;
}
