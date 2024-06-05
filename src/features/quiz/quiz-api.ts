import axios from "axios";
import { baseApi } from "../../config";
import { Quiz } from "../../types";

export const createQuiz = async (data: Quiz) => {
  try {
    const res = await axios.post(`${baseApi}/quiz`, data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
