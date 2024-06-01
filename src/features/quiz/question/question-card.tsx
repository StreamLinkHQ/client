import { BsThreeDotsVertical } from "react-icons/bs";
import { DropDown } from "../../ui";
import { Question } from "../../../types";

type QuestionCardProps = {
  question: Question;
  showMenu: boolean;
  setShowMenu: Function;
};

const QuestionCard = ({ question, showMenu, setShowMenu }: QuestionCardProps) => {
  console.log(question);
  const alphabets = ["A", "B", "C", "D"];

  return (
    <div className="bg-[#343434] p-2.5 flex flex-row items-center justify-between rounded-lg text-[#959696] my-2">
      <div className="w-[90%]">
        <p className="truncate">{question?.question}</p>
        <div className="flex flex-row items-center text-sm mt-1 truncate text-[#7c7c7c]">
          <p className="">Options:</p>
          {question?.options.map((option: any, i: number) => (
            <p className="flex flex-row items-center mx-1">
              ({alphabets[i]}) <span className="ml-0.5">{option}</span>
            </p>
          ))}
        </div>
        <p className="truncate text-sm font-semibold mt-1 capitalize">
          Correct option: {question?.answer}
        </p>
      </div>
      <BsThreeDotsVertical className="text-xl" onClick={() => setShowMenu(true)}/>
      {/* {showMenu && <DropDown />} */}
    </div>
  );
};

export default QuestionCard;
