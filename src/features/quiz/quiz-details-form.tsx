import { useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { QuizContext } from "../../context";

type FormData = {
  topic: string;
  description?: string;
  reward: number;
  numberOfQuestions: number;
  quizDuration: number;
};

type QuizDetailsFormProps = {
  stepFunc: Function;
};

const QuizDetailsForm = ({ stepFunc }: QuizDetailsFormProps) => {
  const { quizDetails, setQuizDetails } = useContext(QuizContext);

  const validation = yup.object().shape({
    topic: yup.string().required("Please, name your quiz"),
    description: yup.string(),
    reward: yup.number().required("Please, enter reward amount in USDC"),
    numberOfQuestions: yup.number().required("Please, enter number of questions"),
    quizDuration: yup.number().required("Please, duration in minutes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const onSubmit = (values: FormData) => {
    setQuizDetails({ ...quizDetails, ...values });
    stepFunc((prev: number) => prev + 1);
  };

  return (
    <div>
      <p className="text-center text-xl mb-3.5">Create quiz</p>
      <form
        className="w-[94%] mx-auto flex flex-col lg:w-[35%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="">
          <p className="mb-1">Topic</p>
          <input
            type="text"
            className="border w-full border-border-ash p-1.5 rounded-md focus:outline-none text-white my-1 bg-[#222]"
            {...register("topic")}
          />
          <p className="text-red-500 text-xs">{errors.topic?.message}</p>
        </div>
        <div className="">
          <p className="mb-1">Description</p>
          <input
            type="text"
            className="border w-full border-border-ash p-3.5 rounded-md focus:outline-none text-white my-1 bg-[#222]"
            {...register("description")}
          />
          <p className="text-red-500 text-xs">{errors.description?.message}</p>
        </div>
        <div className="">
          <p className="mb-1">Reward</p>
          <input
            type="text"
            className="border w-full border-border-ash p-1.5 rounded-md focus:outline-none text-white my-1 bg-[#222]"
            {...register("reward")}
          />
          <p className="text-red-500 text-xs">{errors.reward?.message}</p>
        </div>
        <div className="mt-2.5">
          <p className="mb-1">Number of questions</p>
          <input
            type="text"
            className="border w-full border-border-ash p-1.5 rounded-md focus:outline-none text-white my-1 bg-[#222]"
            {...register("numberOfQuestions")}
          />
          <p className="text-red-500 text-xs">
            {errors.numberOfQuestions?.message}
          </p>
        </div>
        <div className="my-2 bg-[#222]">
          <p className="mb-1">Quiz duration</p>
          <input
            type="text"
            className="border w-full border-border-ash p-1.5 rounded-md focus:outline-none text-white my-1 bg-[#222]"
            {...register("quizDuration")}
          />
          <p className="text-red-500 text-xs">{errors.quizDuration?.message}</p>
        </div>
        <button className="w-full bg-yellow text-black py-2 rounded-md text-lg">
          Next
        </button>
      </form>
    </div>
  );
};

export default QuizDetailsForm;
