import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rate } from "../Rate/Rate";

import "../Cards/Cards.css";

export const Cards = (props) => {
  const [img, setImg] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const result = props.logo.replace("/media/", "");
    console.log(result);
    setImg(result);
  }, [props.logo]);

  const navigateToRestaurantPage = () => {
    navigate(`/restaurant/${props.name}`);
  };

  return (
    <div className="res-card" onClick={navigateToRestaurantPage}>
      <div className="card-image">
        <img src={`/assets/backendImage/${img}`} alt="img" />
      </div>
      <div className="aa">
        <div className="card-title">
          <p>{props.name} </p>
        </div>
        <div className="card-title-description">
          <div className="cart-food-type">
            <p>{props.type} </p>
          </div>
          <Rate rate={props.rate} />
        </div>
      </div>
    </div>
  );
};
