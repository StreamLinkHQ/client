import axios from "axios";
import { baseApi } from "../../config";

export const payWinners = async (data: any) => {
  try {
    const res = await axios.post(`${baseApi}/pay`, data);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
