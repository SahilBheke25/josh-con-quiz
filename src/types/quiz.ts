export interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
}

export interface QuizState {
  questions: Question[];
  currentAnswers: Record<number, string>;
  score: number;
  showResult: boolean;
}

export type EmailCheckResponse = {
  status: 'not_registered' | 'attempted' | 'not_attempted';
};
