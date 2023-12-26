import React, { useState } from "react";
import { IoLogoSlack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { restaurantAdminLogin_API } from "../../api/RestaurantController";
import "./RestaurantAdminLogin.css";
export const RestaurantAdminLogin = () => {
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState();
  const [data, setData] = useState({
    restaurantUsername: "",
    restaurantPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.username === "" || data.password === "") {
      notify("please fill all fields!", "error");
    } else {
      const loginData = {
        restaurantUsername: data.restaurantUsername,
        restaurantPassword: data.restaurantPassword,
      };
      try {
        const res = restaurantAdminLogin_API(loginData).then((res) => {
          setRestaurantData(res.data.detail);
          localStorage.setItem("res_admin", JSON.stringify(res.data.detail));
        });
        notify("successfylly logged in!", "success");
        // navigate("/restaurant-admin-panel");
      } catch (error) {
        console.log(error.response.data)
        notify(error.response.data, "error");
      }
    }
  };

  const notify = (msg, type) => {
    if (type === "error") {
      toast.error(msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else if (type === "success") {
      toast.success(msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <IoLogoSlack
          style={{ color: "var(--blue)", width: "4rem", height: "4rem" }}
        />
        <div className="Wbname">
          <h1>Restaurant</h1>
          <h6>Your favorite Restaurant app</h6>
        </div>
      </div>
      {/* right side */}
      <div className="right">
        <form className="infoForm">
          <h3>{"Restaurant Admin Login"}</h3>
          <div>
            <input
              type="text"
              className="infoInput"
              name="restaurantUsername"
              placeholder="Username"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              name="restaurantPassword"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
          </div>

          <button
            className="button"
            id="infoButton"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
