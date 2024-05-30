import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type QuestionFormProps = {
  showForm: boolean;
  updateQuestionsFunc: Function;
}

export type FormData = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
}

const QuestionForm = ({ showForm, updateQuestionsFunc }: QuestionFormProps) => {
  const validation = yup.object().shape({
    question: yup.string().required("Please enter the Question"),
    optionA: yup.string().required("Please enter first option"),
    optionB: yup.string().required("Please enter second option"),
    optionC: yup.string().required("Please enter third option"),
    optionD: yup.string().required("Please enter fourth option"),
    answer: yup.string().required("Please enter the correct option"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const onSubmit = (values: FormData) => {
    updateQuestionsFunc(values)
  };
  return (
    <div className={`${showForm ? "block": "hidden"}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1.5">
          <p className="mb-1">Question</p>
          <input
            type="text"
            className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
            {...register("question")}
          />
          <p className="text-red-500 text-xs">{errors.question?.message}</p>
        </div>
       <div className="my-2">
        <p className="">Answers</p>
        <div className="flex flex-row justify-between items-center">
          <div className="w-[48%]">
          <input
            type="text"
            className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
            {...register("optionA")}
          />
          <p className="text-red-500 text-xs">{errors.optionA?.message}</p>
          </div>
          <div className="w-[48%]">
          <input
            type="text"
            className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
            {...register("optionB")}
          />
          <p className="text-red-500 text-xs">{errors.optionB?.message}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="w-[48%]">
          <input
            type="text"
            className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
            {...register("optionC")}
          />
          <p className="text-red-500 text-xs">{errors.optionC?.message}</p>
          </div>
          <div className="w-[48%]">
          <input
            type="text"
            className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
            {...register("optionD")}
          />
          <p className="text-red-500 text-xs">{errors.optionD?.message}</p>
          </div>
        </div>
       </div>
       <div className="mt-6">
          <p className="mb-1">Correct Answer</p>
          <input
            type="text"
            className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
            {...register("answer")}
          />
          <p className="text-red-500 text-xs">{errors.answer?.message}</p>
        </div>
        <button className="w-full bg-yellow text-black py-2 rounded-md text-lg mt-3.5">
          Next
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;