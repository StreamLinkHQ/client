import { useContext, useState } from "react";
import { QuizContext } from "../../context";
import QuestionCard from "./question/question-card";
import QuizHeader from "./quiz-header";

type QuizPreviewerProps = {
  editFunc: Function;
  setIsEditFunc: Function;
  setPreview: Function;
};

const QuizPreviewer = ({
  editFunc,
  setIsEditFunc,
  setPreview,
}: QuizPreviewerProps) => {
  const { quizDetails } = useContext(QuizContext);
  const [current, setCurrent] = useState<number>();

  return (
    <>
      <div className="flex flex-col relative">
        <QuizHeader quizDetails={quizDetails} />
        {quizDetails.questions.map((question: any, i: number) => (
          <QuestionCard
            key={i}
            question={question}
            id={i + 1}
            setCurrentIndex={setCurrent}
            currentIndex={current}
            editFunc={editFunc}
            setIsEditFunc={setIsEditFunc}
            setPreview={setPreview}
          />
        ))}
        <button className="w-full mx-auto bg-yellow text-black py-3 rounded-md mt-2">
          Proceed to Pay
        </button>
      </div>
    </>
  );
};

export default QuizPreviewer;
