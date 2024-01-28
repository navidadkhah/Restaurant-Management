import axios from "axios";

const API_restaurant = axios.create({
  baseURL: "http://127.0.0.1:8000/order/api/",
});

export const createOrder_API = async (formData) => {
  const res = await API_restaurant.post("/CreateOrders/", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const getUserOrders_API = async (phoneNumber) => {
  const res = await API_restaurant.get(`/Orders/users/${phoneNumber}`);
  return res;
};

export const getRestaurantOrders_API = async (restaurantName) => {
    const res = await API_restaurant.get(`/Orders/restaurants/${restaurantName}`);
    return res;
  };