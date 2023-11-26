import axios from "axios";
import { BASE_URL } from "../constants/common";

const userService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default userService;
