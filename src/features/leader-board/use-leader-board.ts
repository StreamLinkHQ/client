import { useMutation } from "@tanstack/react-query";
import { payWinners } from "./leader-board-api";

export const usePayWinners = () => {
  return useMutation({
    mutationFn: (data: any) => payWinners(data),
  });
};
