import axios from "axios";

const API_auth = axios.create({ baseURL: "http://127.0.0.1:8000/auth/api/" });

export const login_API = (formData) => API_auth.post("/login/", formData);
export const signup_API = async(formData) => {
    await API_auth.post("/signup/", formData, {
            headers: { "Content-Type": "application/json" },
        })
        // .then(function(response) {
        //     console.log(response.status)
        //     return response.stringify()
        // })
        // .catch(function(error) {
        //     return (error.response)
        // });
}