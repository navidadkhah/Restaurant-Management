import React, { useEffect, useState } from "react";
import "../Cards/Cards.css";
import "../../..";


export const Cards = (props) => {

  // const [logoPath, setLogoPath] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    // const result = props.logo.replace("media", "backendImage");
    // console.log(result)
    // setImage("../../.." + result);

    const fetchImage = async () => {
      try {
        const imageSrc = props.logo.replace("media", "backendImage");
        const imageModule = await import("../../.." + imageSrc);
        setImage(require(imageModule.default));
        console.log(image)
      } catch (err) {
        console.error("Error during loading module: " + err);
      }
    };

    fetchImage();
  }, [props.logo]);
  return (
    <div className="card">
      <div className="card-image">{image && <img src={image} alt="img" />}</div>
      <div className="aa">
        <div className="card-title">
          <p>{props.name} </p>
        </div>
        <div className="card-title-description">
          <div className="cart-food-type">
            <p>{props.type} </p>
          </div>
          <div className="cart-restaurant-rate">
            {/* <Rate rate={3}></Rate> */}
          </div>
        </div>
      </div>
    </div>
  );
};
