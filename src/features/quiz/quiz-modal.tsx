import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { QuizContextProvider } from "../../context";
import { Modal } from "../ui";
import QuizForm from "./quiz-form";

type QuizModalProps = {
  setShowModal: Function;
};

const QuizModal = ({ setShowModal }: QuizModalProps) => {
  const [step, setStep] = useState(0);
  const [generateQuiz, setGenerateQuiz] = useState("");
  return (
    <QuizContextProvider>
      <Modal bgColor="bg-modal-black">
        <>
          <div className="bg-[#222] w-full absolute bottom-0 p-5 text-white rounded-t-3xl max-h-[85%] overflow-y-auto">
            <div
              className="bg-black rounded-full ml-auto w-[25px] h-[25px] p-1 flex flex-col items-center cursor-pointer mb-4"
              onClick={() => setShowModal("")}
            >
              <IoMdClose className="text-yellow text-lg cursor-pointer" />
            </div>
            {step === 0 && (
              <div className="flex flex-col">
                <button
                  className="border text-yellow border-yellow text-lg w-full rounded-md my-1 p-1.5"
                  onClick={() => {
                    setStep(1);
                    setGenerateQuiz("ai");
                  }}
                >
                  Generate with AI
                </button>
                <button
                  className="border text-yellow border-yellow text-lg w-full rounded-md my-1 p-1.5"
                  onClick={() => {
                    setStep(1);
                    setGenerateQuiz("write");
                  }}
                >
                  Write Quiz
                </button>
              </div>
            )}
            {step === 1 && generateQuiz === "write" && <QuizForm />}
          </div>
        </>
      </Modal>
    </QuizContextProvider>
  );
};

export default QuizModal;
