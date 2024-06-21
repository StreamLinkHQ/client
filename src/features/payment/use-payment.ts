import { useMutation } from "@tanstack/react-query";
import { payParticipants } from "./payment-api";

export const usePayParticipants = () => {
  return useMutation({
    mutationFn: (data: any) => payParticipants(data),
  });
};
