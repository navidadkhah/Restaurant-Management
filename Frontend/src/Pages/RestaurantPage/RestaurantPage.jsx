import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantMenu_API } from "../../api/RestaurantController";
import { getRestaurantDetail_API } from "../../api/RestaurantController";
import FoodCard from "../Components/FoodCard/FoodCard";
import { Navbar } from "../Components/Navbar/Navbar";
import "./RestaurantPage.css";

const RestaurantPage = () => {
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [restaurantDetail, setRestaurantDetailu] = useState();
  const params = useParams();

  useEffect(() => {
    console.log(params.name);
    getRestaurantMenu_API(params.name)
      .then((res) => {
        setRestaurantMenu(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
     getRestaurantDetail_API(params.name)
       .then((res) => {
        setRestaurantDetailu(res.data[0]);
        console.log(res.data[0].restaurantRate);
       })
       .catch((error) => {
         console.log(error.data);
       });
  }, [params.name]);

  return (
    <div className="restaurant-page-container">
      <Navbar />
      <div className="restaurant-details">
        <div className="restaurant-details-class">
          <p>Name:</p>
          <p>{restaurantDetail?.restaurantName}</p>
        </div>
        <div className="restaurant-details-class">
          <p>Location:</p>
          <p>{restaurantDetail?.restaurantLocation}</p>
        </div>
        <div className="restaurant-details-class">
          <p>Description:</p>
          <p>{restaurantDetail?.restaurantDescription}</p>
        </div>
        <div className="restaurant-details-class">
          <p>Rate:</p>
          <p>{restaurantDetail?.restaurantRate}</p>
        </div>
      </div>

      <div className="food-cards">
        {restaurantMenu.length > 0 ? (
          restaurantMenu.map((item) => (
            <FoodCard
              key={item.id}
              name={item.foodName}
              desc={item.foodDescription}
              logo={item.foodImage}
              price={item.foodPrice}
            />
          ))
        ) : (
          <p className="no-search">there is no food</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;
