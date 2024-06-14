// @ts-nocheck
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Option from "./option";

type AnswerFormProps = {
  questions: any[];
  setScore: Function;
  setQuizState: Function;
  setCurrentQuestion: Function;
  score: number;
  points: number;
  currentQuestion: number;
};

const AnswerForm = ({
  questions,
  setScore,
  score,
  points,
  setQuizState,
  currentQuestion,
  setCurrentQuestion,
}: AnswerFormProps) => {

  const [optionChosen, setOptionChosen] = useState({});

  const next = () => {
    if (Object.values(optionChosen).length === 0) {
      toast.error(`Please, select an option to continue.`);
      return;
    }
    if (optionChosen.isCorrect === true) {
      setScore(score + +points);
    }
    setOptionChosen({});
    if (currentQuestion === questions.length - 1) {
      // finish quiz
      console.log("done");
      setQuizState("finished");
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  return (
    <>
      <div className="mt-2 w-full">
        <p className="text-base font my-2.5">{questions[currentQuestion].text}</p>
        <div className="flex flex-col bg-[#343434] p-3.5 rounded-xl text-white my-1.5">
          {questions[currentQuestion].options.map((option: any, i: number) => (
            <Option
              option={option}
              key={i}
              setOption={setOptionChosen}
              active={optionChosen?.text === option.text}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-full bg-yellow text-black py-2 rounded-md text-lg mt-3.5"
        >
          {currentQuestion === questions.length - 1 ? "Finish" : " Next"}
        </button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default AnswerForm;
