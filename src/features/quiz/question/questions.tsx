import { useContext, useState, useEffect, useCallback } from "react";
import { QuizContext } from "../../../context";
import QuestionForm, { FormData } from "./question-form";
import QuizPreviewer from "../quiz-previewer";

const Questions = () => {
  const [num, setNum] = useState<number[]>([]);
  const { quizDetails } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [preview, setPreview] = useState(false);

  const { numberOfQuestions, questions } = quizDetails;
  console.log(num);

  const generateNumberOfQuestions = useCallback(() => {
    const quizQuestions = Array.from(
      { length: numberOfQuestions },
      (_, i) => i + 1
    );
    setNum(quizQuestions);
  }, []);

  useEffect(() => {
    generateNumberOfQuestions();
  }, []);

  const addQuestions = (data: FormData) => {
    if (currentQuestion === numberOfQuestions) {
      // submit
      console.log("last one");
      setPreview(true);
      return;
    }
    const { question, optionA, optionB, optionC, optionD, answer } = data;
    const questionData = {
      question,
      answer,
      options: [optionA, optionB, optionC, optionD],
    };
    questions.push(questionData);
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <>
      {preview ? (
        <QuizPreviewer />
      ) : (
        <div className="flex flex-col text-[#BFBFBF]">
          <p className="text-[#BFBFBF] text-2xl font-semibold">Set questions</p>
          <p className="mt-2.5">Question No_{currentQuestion}</p>
          <div className="flex flex-row mb-2.5">
            {num.map((n) => (
              <div
                className={`p-1 rounded-full w-[50%] mx-1 ${
                  currentQuestion >= n ? "bg-yellow" : "bg-white"
                }`}
                key={n}
              />
            ))}
          </div>
          <div>
            {num.map((n) => (
              <QuestionForm
                key={n}
                showForm={currentQuestion === n}
                updateQuestionsFunc={addQuestions}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Questions;
