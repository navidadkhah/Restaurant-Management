import axios from "axios";

const API = axios.create({ baseURL: "http://127.0.0.1:8000" });

export const login = (formData) => API.post("/login", formData);
export const signup = (formData) => API.post("/signup", formData);
