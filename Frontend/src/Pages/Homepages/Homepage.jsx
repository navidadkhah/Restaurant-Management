import { React, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Cards } from "../Components/Cards/Cards";
import "./Homepage.css";
import { Navbar } from "../Components/Navbar/Navbar";
import { getRestauran_API } from "../../api/RestaurantController";
import Loader from "react-js-loader";

export const Homepage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestauran_API().then((res) => {
      setRestaurants(res.data);
    });
  }, []);

  const loginRoute = () => {
    <Navigate to={"/"} />;
  };
  return (
    <div className="home">
      <Navbar setRestaurants={setRestaurants} restaurants={restaurants} />
      <div className="home-content">
        {restaurants.length > 0 ? (
          restaurants.map((res) => (
            <Cards
              logo={res.restaurantImage}
              name={res.restaurantName}
              type={res.restaurantType}
            />
          ))
        ) : (
          <Loader
          className="loader-image"
            type="bubble-spin"
            bgColor={"#000000"}
            color={"#000000"}
            title={"Loading..."}
            size={100}
          />
        )}
      </div>
    </div>
  );
};
