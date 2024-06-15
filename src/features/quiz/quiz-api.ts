import axios from "axios";
import { baseApi } from "../../config";
import { Quiz, QuizScore } from "../../types";

export const createQuiz = async (data: Quiz) => {
  try {
    const res = await axios.post(`${baseApi}/quiz`, data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getQuiz = async (data: string) => {
  try {
    const params = {
      meetingId: data,
    };
    const res = await axios.get(`${baseApi}/quiz`, { params });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuiz = async (data: QuizScore) => {
  console.log(data)
  try {
    const res = await axios.post(`${baseApi}/quiz/score`, data)
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);   
  }
}
