import { useState } from "react";
import OptionCard from "./option-card";

type AnswerFormProps = {
  questions: any[];
};

const AnswerForm = ({ questions }: AnswerFormProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  return (
    <div>
      <p className="text-base">{questions[currentQuestion].text}</p>
      <div className="flex flex-col bg-[#343434] p-3.5 rounded-xl text-white my-1.5">
        {questions[currentQuestion].options.map((option: any, i: number) => (
          <OptionCard option={option} key={i} />
        ))}
      </div>
    </div>
  );
};

export default AnswerForm;
