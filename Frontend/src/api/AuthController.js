import axios from "axios";

const API_auth = axios.create({ baseURL: "http://127.0.0.1:8000/auth/api/" });

export const signup_API = async(formData) => {
    const res = await API_auth.post("/signup/", formData, {
        headers: { "Content-Type": "application/json" },
    });
    return res
}
export const login_API = (formData) => {
    const res = API_auth.post("/login/", formData)
    return res
}