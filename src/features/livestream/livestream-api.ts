import axios from "axios";
import { baseApi } from "../../config";
import { CreateStreamRequest } from "../../types/livestream";

export const createLiveStream = async (data: CreateStreamRequest) => {
  try {
    console.log("inside here", data);
    const res = await axios.post(`${baseApi}/livestream`, data);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
