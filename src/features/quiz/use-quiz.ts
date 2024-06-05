import { useMutation } from "@tanstack/react-query";
import { createQuiz } from "./quiz-api";
import { Quiz } from "../../types";

export const useCreateQuiz = () => {
  return useMutation({
    mutationFn: (data: Quiz) => createQuiz(data),
  });
};
