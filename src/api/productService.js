import axios from "axios";
import { BASE_URL } from "../constants/common";

export const addProduct = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/products`, data);
    return response.data;
  } catch (error) {
    alert("Error adding product");
  }
};

export const sellProducts = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/sell-products`, data);
    return response.data;
  } catch (error) {
    alert("Error selling products");
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products`);
    return response.data;
  } catch (error) {
    alert("Error fetching products");
  }
};
export const getSoldProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/sold-products`);
    return response.data;
  } catch (error) {
    alert("Error fetching products");
  }
};
