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
  options: string[];
  answer: string;
};
