import { useMutation } from "@tanstack/react-query";
import { createLiveStream, generateStreamToken } from "./livestream-api";
import {
  CreateStreamRequest,
  GenerateTokenRequest,
} from "../../types";

export const useCreateLivestream = () => {
  return useMutation({
    mutationFn: (data: CreateStreamRequest) => createLiveStream(data),
  });
};

export const useGenerateStreamToken = () => {
  return useMutation({
    mutationFn: (data: GenerateTokenRequest) => generateStreamToken(data),
  });
};
