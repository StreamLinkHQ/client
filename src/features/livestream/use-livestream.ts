import { useMutation } from "@tanstack/react-query";
import { createLiveStream } from "./livestream-api";
import { CreateStreamRequest } from "../../types/livestream";

export const useCreateLivestream = () => {
  return useMutation({
    mutationFn: (data: CreateStreamRequest) => createLiveStream(data),
  });
};
