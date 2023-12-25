import axios from "axios";

const API_restaurant = axios.create({
    baseURL: "http://127.0.0.1:8000/dash/api/",
});

export const addRestaurant_API = async(formData) => {
    console.log(formData)

    // var data = new FormData();
    // data.append("restaurantName", formData.restaurantName);
    // data.append("restaurantDescription", formData.restaurantDescription);
    // data.append("restaurantType", formData.restaurantType);
    // data.append("restaurantImage", formData.restaurantImage);
    // console.log("s2", data.restaurantImage)

    const res = await API_restaurant.post("/CreateSiteAdmin/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
};

export const getRestauran_API = async() => {
    const res = await API_restaurant.get("/GetCreateSiteAdmin");
    return res;
};