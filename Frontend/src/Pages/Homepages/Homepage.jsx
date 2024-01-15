import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Cards } from "../Components/Cards/Cards";
import "./Homepage.css";
import { Navbar } from "../Components/Navbar/Navbar";
import { getRestaurant_API } from "../../api/RestaurantController";
import { ToastContainer, toast } from "react-toastify";

export const Homepage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
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

  useEffect(() => {
    getRestaurant_API().then((res) => {
      setRestaurants(res.data);
    });
    if (!localStorage.getItem("previoslyVisited")) {
      notify("Welcome to Tameshk application", "info");
      localStorage.setItem("previoslyVisited", "true");
    }
  }, []);

  const loginRoute = () => {
    <Navigate to={"/"} />;
  };

  const filteredRestaurants = restaurants.filter((res) =>
    res.restaurantName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <Navbar setSearch={setSearch} />
      <div className="home-content">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((res) => (
            <Cards
              logo={res.restaurantImage}
              name={res.restaurantName}
              type={res.restaurantType}
            />
          ))
        ) : (
          <p>No matching restaurants found.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
