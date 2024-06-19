import { useContext, useState, useEffect, useCallback } from "react";
import { QuizContext } from "../../../context";
import { QuestionFormData } from "../../../types";
import QuestionForm from "./question-form";
import QuizPreviewer from "../quiz-previewer";

const Questions = () => {
  const [num, setNum] = useState<number[]>([]);
  const { quizDetails } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [preview, setPreview] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { numberOfQuestions, questions } = quizDetails;

  const generateNumberOfQuestions = useCallback(() => {
    const quizQuestions = Array.from(
      { length: numberOfQuestions },
      (_, i) => i + 1
    );
    setNum(quizQuestions);
  }, [numberOfQuestions]);

  useEffect(() => {
    generateNumberOfQuestions();
  }, [numberOfQuestions]);

  const addQuestions = (data: QuestionFormData) => {
    const { question, optionA, optionB, optionC, optionD, answer } = data;
    const questionData = {
      question,
      answer,
      options: [optionA, optionB, optionC, optionD],
    };

    if (isEdit) {
      questions[currentQuestion - 1] = questionData;
    } else {
      questions.push(questionData);
    }

    if (currentQuestion === numberOfQuestions) {
      setPreview(true);
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <>
      {preview ? (
        <QuizPreviewer
          editFunc={setCurrentQuestion}
          setIsEditFunc={setIsEdit}
          setPreview={setPreview}
        />
      ) : (
        <div className="flex flex-col text-[#BFBFBF]">
          <p className="text-[#BFBFBF] text-2xl font-semibold mb-2.5">
            {isEdit ? "Edit" : "Set"} questions
          </p>
          <p className="my-1">Question No_{currentQuestion}</p>
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
                question={questions[currentQuestion - 1]}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Questions;
