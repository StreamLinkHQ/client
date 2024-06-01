import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { QuestionFormData } from "../../../types";

type QuestionFormProps = {
  showForm: boolean;
  updateQuestionsFunc: Function;
};

const QuestionForm = ({ showForm, updateQuestionsFunc }: QuestionFormProps) => {
  const validation = yup.object().shape({
    question: yup.string().required("Please enter the Question"),
    optionA: yup.string().required("Please enter first option"),
    optionB: yup.string().required("Please enter second option"),
    optionC: yup.string().required("Please enter third option"),
    optionD: yup.string().required("Please enter fourth option"),
    answer: yup
      .string()
      .required("Please enter the correct option")
      .max(1)
      .matches(
        /[a-dA-D]/,
        "Please, you can only enter letters between a and d"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const onSubmit = (values: QuestionFormData) => {
    updateQuestionsFunc(values);
  };
  return (
    <div className={`${showForm ? "block" : "hidden"}`}>
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
              
              <div className="flex flex-row items-center">
              <p className="mr-1 text-sm">A</p>
              <input
                type="text"
                className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
                {...register("optionA")}
              />
              </div>
              <p className="text-red-500 text-xs">{errors.optionA?.message}</p>
            </div>
            <div className="w-[48%]">
            <div className="flex flex-row items-center">
              <p className="mr-1 text-sm">B</p>
              <input
                type="text"
                className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
                {...register("optionB")}
              />
              </div>
              <p className="text-red-500 text-xs">{errors.optionB?.message}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="w-[48%]">
            <div className="flex flex-row items-center">
              <p className="mr-1 text-sm">C</p>
              <input
                type="text"
                className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
                {...register("optionC")}
              />
              </div>
              <p className="text-red-500 text-xs">{errors.optionC?.message}</p>
            </div>
            <div className="w-[48%]">
            <div className="flex flex-row items-center">
              <p className="mr-1 text-sm">D</p>
              <input
                type="text"
                className="border w-full border-border-ash p-2.5 rounded-lg focus:outline-none text-white my-1 bg-[#222]"
                {...register("optionD")}
              />
              </div>
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
