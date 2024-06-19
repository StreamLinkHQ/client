import { useState, useEffect } from "react";
import AnswerForm from "./answer/answer-form";

type QuizResponseProps = {
  data: any;
};

const QuizResponse = ({ data }: QuizResponseProps) => {
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState("playing");
  const current = Number(localStorage.getItem("currentQuestion")) || 0;
  const [currentQuestion, setCurrentQuestion] = useState<number>(current);

  const quizDuration = data?.quizDuration;

  const initialTime =
    Number(localStorage.getItem("timer")) || quizDuration * 60;
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  console.log(currentQuestion)
  console.log(data?.questions.length)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizState === "playing" && timeLeft !== null) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === null || prevTime <= 0) {
            clearInterval(interval);
            setQuizState("finished");
            localStorage.removeItem("timer");
            return 0;
          }
          return prevTime - 1;
        });

        localStorage.setItem("timer", JSON.stringify(timeLeft));
      }, 1000);
    }
    if(quizState !== "finished"){
      localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
    }
    return () => clearInterval(interval);
  }, [quizState, timeLeft]);

  const minutes = timeLeft !== null ? Math.floor(timeLeft / 60) : 0;
  const secondsLeft = timeLeft !== null ? timeLeft % 60 : 0;
  const formattedSeconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
  const totalScore = data?.pointsPerQuestion * data?.questions.length;

  return (
    <>
      {quizState === "playing" ? (
        <div>
          <div className="bg-[#343434] py-1.5 px-2.5 rounded-lg text-white my-1.5 shadow-xl">
            <p className="text-lg">{data?.title}</p>
            <p className="text-sm truncate">{data?.description}</p>
            <div className="flex flex-row items-center justify-between text-sm my-1.5">
              <p className="font-semibold text-white">
                Question {currentQuestion + 1} / {data?.questions.length}
              </p>
              {timeLeft !== null && (
                <p className="text-white">
                  Time left:{" "}
                  <span className={`${timeLeft <= 90 ? "text-red-600" : ""}`}>
                    {minutes}:{formattedSeconds}
                  </span>
                </p>
              )}
            </div>
          </div>
          <AnswerForm
            questions={data?.questions}
            setScore={setScore}
            score={score}
            points={data?.pointsPerQuestion}
            setQuizState={setQuizState}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            quizId={data?.id}
          />
        </div>
      ) : (
        <div className="text-white text-center">
          <p>You have submitted successfully</p>
          <p className="text-xl text-center">
            Score: {score} / {totalScore}
          </p>
        </div>
      )}
    </>
  );
};

export default QuizResponse;
