import { useMutation, useQuery } from "@tanstack/react-query";
import { createQuiz, getQuiz, updateQuiz, getQuizScores } from "./quiz-api";
import { Quiz, QuizScore } from "../../types";

export const useCreateQuiz = () => {
  return useMutation({
    mutationFn: (data: Quiz) => createQuiz(data),
  });
};

export const useGetQuiz = (meetingId: string | undefined) => {
  if (!meetingId) {
    return;
  }
  return useQuery({
    queryKey: ["quiz", meetingId],
    queryFn: async () => {
      const data = await getQuiz(meetingId);
      return data;
    },
  });
};

export const useUpdateQuiz = () => {
  return useMutation({
    mutationFn: (data: QuizScore) => updateQuiz(data),
  });
};

export const useGetQuizScores = (meetingId: string | undefined) => {
  if (!meetingId) {
    return;
  }
  return useQuery({
    queryKey: ["score", meetingId],
    queryFn: async () => {
      const data = await getQuizScores(meetingId);
      return data;
    },
  });
};
