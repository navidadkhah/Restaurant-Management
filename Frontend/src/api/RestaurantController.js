import axios from "axios";

const API_restaurant = axios.create({
  baseURL: "http://127.0.0.1:8000/dash/api/",
});

export const addFood_API = async (formData) => {
  const res = await API_restaurant.post(createFood, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

export const addRestaurant_API = async (formData) => {
  console.log(formData);

  const res = await API_restaurant.post("/CreateSiteAdmin/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

export const getRestaurant_API = async () => {
  const res = await API_restaurant.get("/GetCreateSiteAdmin");
  return res;
};
