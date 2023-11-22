import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:8000/api" });

export const login_API = (formData) => API.post("/login/", formData);
export const signup_API = (formData) =>
  API.post("/signup/", formData, {
    headers: { "Content-Type": "application/json" },
  });
