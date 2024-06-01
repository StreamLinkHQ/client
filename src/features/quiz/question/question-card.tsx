import { useState, useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";
import { QuizContext } from "../../../context";
import { DropDown } from "../../ui";
import { Question } from "../../../types";

type QuestionCardProps = {
  question: Question;
  id: number;
  currentIndex: number | undefined;
  setCurrentIndex: Function;
  editFunc: Function;
  setIsEditFunc: Function;
  setPreview: Function;
};

const QuestionCard = ({
  question,
  id,
  currentIndex,
  setCurrentIndex,
  editFunc,
  setIsEditFunc,
  setPreview,
}: QuestionCardProps) => {
  const alphabets = ["A", "B", "C", "D"];
  const [showMenu, setShowMenu] = useState(false);
  const { quizDetails, setQuizDetails } = useContext(QuizContext);
  const { questions, numberOfQuestions } = quizDetails;

  const edit = () => {
    editFunc(id);
    setIsEditFunc(true);
    setPreview(false);
  };

  const deleteFunc = () => {
    const newQuestions = questions.filter((_: any, i: number) => i !== id - 1);
    setQuizDetails({
      ...quizDetails,
      questions: newQuestions,
      numberOfQuestions: numberOfQuestions - 1,
    });
  };
  return (
    <div className="bg-[#343434] p-2.5 flex flex-row items-center justify-between rounded-lg text-[#959696] my-2">
      <div className="w-[90%]">
        <p className="truncate">{question?.question}</p>
        <div className="flex flex-row items-center text-sm mt-1 truncate text-[#7c7c7c]">
          <p className="">Options:</p>
          {question?.options.map((option: any, i: number) => (
            <p className="flex flex-row items-center mx-1" key={i}>
              ({alphabets[i]}) <span className="ml-0.5">{option}</span>
            </p>
          ))}
        </div>
        <p className="truncate text-sm font-semibold mt-1 capitalize">
          Correct option: {question?.answer}
        </p>
      </div>
      <BsThreeDotsVertical
        className="text-xl"
        onClick={() => {
          setShowMenu(true);
          setCurrentIndex(id);
        }}
      />
      {showMenu && currentIndex === id && (
        <DropDown styles="z-10 absolute p-2 rounded-md shadow bg-[#222] right-7">
          <div
            className="flex flex-row items-center text-yellow mb-1.5"
            onClick={edit}
          >
            <RiEdit2Fill className="text-xl mr-1" />
            <p className="text-sm">Edit</p>
          </div>
          <div
            className="flex flex-row items-center text-red-600"
            onClick={deleteFunc}
          >
            <RiDeleteBin6Fill className="text-xl mr-1" />
            <p className="text-sm">Delete</p>
          </div>
        </DropDown>
      )}
    </div>
  );
};

export default QuestionCard;
