type QuizHeaderProps = {
  quizDetails: any;
};

const QuizHeader = ({ quizDetails }: QuizHeaderProps) => {
  return (
    <div className="bg-[#343434] p-3.5 rounded-lg text-[#959696] my-1.5">
      <p className="text-xl">{quizDetails?.topic}</p>
      <p className="text-sm truncate">{quizDetails?.description}</p>
      <div className="flex flex-row items-center justify-between text-sm mt-2.5">
        <p className="text-[#F5AF76]">Prize tag: ${quizDetails?.reward}.00</p>
        <p>Duration: {quizDetails?.quizDuration} mins</p>
      </div>
    </div>
  );
};

export default QuizHeader;
