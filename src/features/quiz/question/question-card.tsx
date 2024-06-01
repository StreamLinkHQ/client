import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";
import { DropDown } from "../../ui";
import { Question } from "../../../types";
import { useState } from "react";

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

  console.log({ id });

  const edit = () => {
    editFunc(id);
    setIsEditFunc(true);
    setPreview(false);
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
        <DropDown>
          <div
            className="flex flex-row items-center text-yellow mb-1.5"
            onClick={edit}
          >
            <RiEdit2Fill className="text-xl mr-1" />
            <p className="text-sm">Edit</p>
          </div>
          <div className="flex flex-row items-center text-red-600">
            <RiDeleteBin6Fill className="text-xl mr-1" />
            <p className="text-sm">Delete</p>
          </div>
        </DropDown>
      )}
    </div>
  );
};

export default QuestionCard;
