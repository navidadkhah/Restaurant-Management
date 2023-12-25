import React, { useEffect } from "react";
import "../Cards/Cards.css";
import Logo from "../../../images/logo.png";
import { Bottun } from "../Bottun/Bottun";
import { Rate } from "../Rate/Rate";
import logo1 from "../../../../../Backend/media/restaurantImages/portrait-modern-man.jpg"
export const Cards = (props) => {
  useEffect(() => {
    console.log(`../../../../../Backend${props.logo}`);
  }, []);
  return (
    <div className="card">
      <div className="card-image">
        <img src={logo1} alt="image" />
      </div>
      <div className="aa">
        <div className="card-title">
          <p>{props.name} </p>
        </div>
        <div className="card-title-description">
          <div className="cart-food-type">
            <p>{props.type} </p>
          </div>
          <div className="cart-restaurant-rate">
            <Rate rate={3}></Rate>
          </div>
        </div>
      </div>
    </div>
  );
};
