import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useSendBalance } from "@dynamic-labs/sdk-react-core";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { QuizContext } from "../../context";
import { getCurrentSolRate } from "../../utils";
import QuestionCard from "./question/question-card";
import QuizHeader from "./quiz-header";
import { useCreateQuiz } from "./use-quiz";
import { Question } from "../../types";

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
  const { quizDetails, setQuizDetails } = useContext(QuizContext);
  const [current, setCurrent] = useState<number>();
  const { id } = useParams();
  const {
    numberOfQuestions,
    reward,
    questions,
    topic,
    description,
    quizDuration,
    pointsPerQuestion,
  } = quizDetails;
  const alphabets = ["A", "B", "C", "D"];
  const createQuiz = useCreateQuiz();

  const { open } = useSendBalance();

  const newQuestions = questions.map((question: Question) => ({
    text: question.question,
    options: question.options.map((option: string, i: number) => ({
      text: option,
      isCorrect: alphabets[i] === question.answer.toUpperCase(),
    })),
  }));

  const newQuiz = {
    title: topic,
    description,
    reward,
    quizDuration,
    pointsPerQuestion,
    questions: newQuestions,
    liveStreamId: id,
  };
  const addNewQuestion = () => {
    setQuizDetails({
      ...quizDetails,
      numberOfQuestions: numberOfQuestions + 1,
    });
    editFunc(numberOfQuestions + 1);
    setPreview(false);
  };

  const debitWallet = async () => {
    try {
      const WalletAddress = "FdDuxXHQgo58DQvytK2S89hTAqmMnS1d8HGHt9LTyq6r";
      const rate = await getCurrentSolRate("usd");
      const percent = (reward / 100) * 10;
      const total = reward + percent;

      const amountToDebit = total / rate;
      const paymentAmount = Number(amountToDebit) * LAMPORTS_PER_SOL;

      if (WalletAddress === undefined) {
        console.log("Undefined");
        return;
      }

      const amount = BigInt(Math.floor(paymentAmount));

      const tx = await open({
        recipientAddress: new PublicKey(WalletAddress).toBase58(),
        value: amount,
      });
      createQuiz.mutate(newQuiz);
      return tx;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

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
        <button
          className="w-[50%] ml-auto border border-yellow text-yellow py-2 rounded-md my-2"
          onClick={addNewQuestion}
        >
          Add Question
        </button>
        <button
          className="w-full mx-auto bg-yellow text-black py-3 rounded-md mt-2"
          onClick={debitWallet}
        >
          Proceed to Pay
        </button>
      </div>
    </>
  );
};

export default QuizPreviewer;
