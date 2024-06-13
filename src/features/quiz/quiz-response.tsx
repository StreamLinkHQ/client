import { useParams } from "react-router-dom";
import AnswerForm from "./answer/answer-form";
import { useGetQuiz } from "./use-quiz";

const QuizResponse = () => {
  const { id } = useParams();
  // @ts-ignore comment
  const { data } = useGetQuiz("dvkb-122e-iz33");

  console.log(data);

  if (!data) {
    return;
  }
  return (
    <div>
      <AnswerForm questions={data?.questions} />
    </div>
  );
};

export default QuizResponse;
