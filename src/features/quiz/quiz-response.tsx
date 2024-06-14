import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AnswerForm from "./answer/answer-form";
import { useGetQuiz } from "./use-quiz";

const QuizResponse = () => {
  const { id } = useParams();
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState("playing");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // @ts-ignore comment
  const { data } = useGetQuiz("dvkb-122e-iz33");

  const [timeLimit, setTimeLimit] = useState(+data?.quizDuration * 60);
  const timeRef = useRef(timeLimit);
  const minutes = Math.floor(timeLimit / 60);
  const secondsLeft = timeLimit % 60;
  const seconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  console.log(data);
  console.log(score);

  const tick = () => {
    if (timeRef.current === 0) {
      setQuizState("finished");
      return;
    }
    timeRef.current--;
    setTimeLimit(timeRef.current);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRef.current === 0) {
        clearInterval(interval);
      }
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return;
  }
  return (
    <>
      {quizState === "playing" ? (
        <div>
          <div className="bg-[#343434] p-3.5 rounded-lg text-[#959696] my-1.5 shadow-xl">
            <p className="text-xl">{data?.title}</p>
            <p className="text-sm truncate">{data?.description}</p>
            <div className="flex flex-row items-center justify-between text-sm mt-2.5">
              <p className="text-[#F5AF76]">Prize tag: ${data?.reward}.00</p>
              <p className="text-white">
                Time left:{" "}
                <span className={`${timeLimit <= 90 ? "text-red-600" : ""}`}>
                  {minutes + ":" + seconds}
                </span>
              </p>
            </div>
            <p className="mt-1.5">
              Question {currentQuestion + 1} / {data?.questions.length}
            </p>
          </div>
          <AnswerForm
            questions={data?.questions}
            setScore={setScore}
            score={score}
            points={data?.pointsPerQuestion}
            setQuizState={setQuizState}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
      ) : (
        <div>
          <p>{score}</p>
        </div>
      )}
    </>
  );
};

export default QuizResponse;
