import { useState } from "react";
import Questions from "./question/questions";
import QuizDetailsForm from "./quiz-details-form";

const QuizForm = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="text-white">
      {step === 0 ? <QuizDetailsForm stepFunc={setStep} /> : <Questions />}
    </div>
  );
};

export default QuizForm;
