import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantMenu_API } from "../../api/RestaurantController";
import FoodCard from "../Components/FoodCard/FoodCard";
import { Navbar } from "../Components/Navbar/Navbar";
import "./RestaurantPage.css";

const RestaurantPage = () => {
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const params = useParams();

  useEffect(() => {
    console.log(params.name);
    getRestaurantMenu_API(params.name)
      .then((res) => {
        setRestaurantMenu(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [params.name]);

  return (
    <div className="restaurant-page-container">
      <Navbar />
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
