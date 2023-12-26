import { React, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Cards } from "../Components/Cards/Cards";
import "./Homepage.css";
import { Navbar } from "../Components/Navbar/Navbar";
import { getRestaurant_API } from "../../api/RestaurantController";

export const Homepage = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getRestaurant_API().then((res) => {
      setRestaurants(res.data);
      console.log(res.data);
    });
  }, []);
  const loginRoute = () => {
    <Navigate to={"/Auth"} />;
  };
  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        {restaurants.length > 0 &&
          restaurants.map((res) => (
            <Cards
              logo={res.restaurantImage}
              name={res.restaurantName}
              type={res.restaurantType}
            />
          ))}
      </div>
    </div>
  );
};
