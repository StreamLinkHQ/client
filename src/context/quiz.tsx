import { createContext, useState } from "react";

type IntialQuizState = {
  quizDetails: any;
  setQuizDetails: Function;
};

const initialState = {
  quizDetails: {},
  setQuizDetails: () => {},
};

type QuizProps = {
  children: React.ReactElement;
};

export const QuizContext = createContext<IntialQuizState>(initialState);

export const QuizContextProvider = ({ children }: QuizProps) => {
  const [quizDetails, setQuizDetails] = useState({ questions: [] });
  console.log(quizDetails)
  return (
    <QuizContext.Provider value={{ quizDetails, setQuizDetails }}>
      {children}
    </QuizContext.Provider>
  );
};
