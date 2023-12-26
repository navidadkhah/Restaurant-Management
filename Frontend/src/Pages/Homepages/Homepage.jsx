import { React, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Cards } from "../Components/Cards/Cards";
import "./Homepage.css";
import { Navbar } from "../Components/Navbar/Navbar";
import { getRestauran_API } from "../../api/RestaurantController";
import Loader from "react-js-loader";
import { ToastContainer, toast } from "react-toastify";


export const Homepage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestauran_API().then((res) => {
      setRestaurants(res.data);
    });
    if(!localStorage.getItem('previoslyVisited')){
      notify("Welcome to Tameshk application", "info");
      localStorage.setItem("previoslyVisited", 'true');
    }
  }, []);

   const notify = (msg, type) => {
     if (type === "info") {
       toast.info(msg, {
         position: "top-left",
         autoClose: 3000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: false,
         progress: undefined,
         theme: "light",
       });
     } 
   };


  const loginRoute = () => {
    <Navigate to={"/"} />;
  };
  return (
    <div className="home">
<<<<<<< HEAD
      <Navbar restaurants={restaurants} setRestaurants={setRestaurants} />
=======
      <Navbar setRestaurants={setRestaurants} restaurants={restaurants} />
>>>>>>> 3299d8e0016820fbf476828161a6ee7c07056871
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
      <ToastContainer />
    </div>
  );
};
