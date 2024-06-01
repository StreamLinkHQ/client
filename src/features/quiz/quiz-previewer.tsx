import { useContext, useState } from "react";
import { QuizContext } from "../../context";
import QuestionCard from "./question/question-card";
import { DropDown } from "../ui";
import QuizHeader from "./quiz-header";

const QuizPreviewer = () => {
  const { quizDetails } = useContext(QuizContext);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="flex flex-col relative">
        <QuizHeader quizDetails={quizDetails} />
        {quizDetails.questions.map((question: any, i: number) => (
          <QuestionCard
            key={i}
            question={question}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        ))}
        <button className="w-full mx-auto bg-yellow text-black py-3 rounded-md mt-2">
          Proceed to Pay
        </button>
        {showMenu && <DropDown />}
      </div>
    </>
  );
};

export default QuizPreviewer;
