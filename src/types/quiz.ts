export type QuestionFormData = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
};

export type Question = {
  question: string;
  options: any;
  answer: string;
};

export type Quiz = {
  title: string;
  questions: Question[];
  description?: string;
  quizDuration: number;
  reward: number;
  pointsPerQuestion: number;
}

export type QuizScore = {
  score: number;
  userId: string;
  quizId: number
}