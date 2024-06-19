import axios from "axios";
import { baseApi } from "../../config";
import { CreateStreamRequest, GenerateTokenRequest } from "../../types";

export const createLiveStream = async (data: CreateStreamRequest) => {
  try {
    const res = await axios.post(`${baseApi}/livestream`, data);
    console.log(res)
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const generateStreamToken = async (data: GenerateTokenRequest) => {
  try {
    const res = await axios.post(`${baseApi}/livestream/token`, data);
    return res.data
  } catch (error) {
    console.log(error)
  }
}