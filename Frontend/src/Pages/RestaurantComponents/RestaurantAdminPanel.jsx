import React, { useEffect, useState } from "react";
import AddFoodModal from "../Components/AddFoodModal/AddFoodModal";
import { CardPanel } from "../Components/CardPanel/CardPanel";
import "./RestaurantAdminPanel.css";
import { getRestaurantMenu_API } from "../../api/RestaurantController";
import { useNavigate } from "react-router-dom";

export const RestaurantAdminPanel = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [restaurantMenu, setRestaurantMenu] = useState();
  const [restaurantData, setRestaurantData] = useState();
  const [info, setInfo] = useState({
    restaurantName: "",
    restaurantDescription: "",
    restaurantType: "",
    restaurantLocation: "",
    restaurantRate: "",
  });

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("res_Token"));
    setInfo({
      restaurantName: item.restaurantName,
      restaurantDescription: item.restaurantDescription,
      restaurantType: item.restaurantType,
      restaurantLocation: item.restaurantLocation,
      restaurantRate: item.restaurantRate,
    });

     setRestaurantData(item);
     getRestaurantMenu_API(
       JSON.parse(localStorage.getItem("res_Token")).restaurantName
     ).then((res) => {
       setRestaurantMenu(res.data);
       console.log(res.data);
     }).catch(error => {
        console.log(error.response.data)
      });
   

    
  }, []);

  const openAddModal = () => {
    console.log(restaurantMenu);
    setAddModalOpen(true);
    document.querySelectorAll(".admin-dash").forEach(function (el) {
      document.body.style.overflow = "hidden";
    });
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    document.querySelectorAll(".admin-dash").forEach(function (el) {
      document.body.style.overflow = "unset";
    });
  };

  const logouthandler = () => {
    localStorage.removeItem("res_Token");
    navigate("/home");
  };

  return (
    <div className="admin-dash">
      <span className="admin-dash-title">Restaurant Admin Panel</span>
      <CardPanel title="Current Food count" number={restaurantMenu?.length} />
      <div className="res-infos">
        <div className="res-info-cell">
          <p>restaurant name</p>
          <p>{info.restaurantName}</p>
        </div>
        <div className="res-info-cell">
          <p>restaurant location</p>
          <p>{info.restaurantLocation}</p>
        </div>
        <div className="res-info-cell">
          <p>restaurant type</p>
          <p>{info.restaurantType}</p>
        </div>
        <div className="res-info-cell">
          <p>restaurant description</p>
          <p>{info.restaurantDescription}</p>
        </div>
        <div className="res-info-cell">
          <p>restaurant rate</p>
          <p>{info.restaurantRate}</p>
        </div>
      </div>

      <div className="admin-lists">
        <div className="admin-list-button">
          <button onClick={openAddModal}>Add</button>
          <button onClick={logouthandler} className="admin-list-button-logout">
            Logout
          </button>
        </div>
        {restaurantMenu!=null ? (
          <table id="customers">
            <tr>
              <th>Name</th>
              <th>price</th>
              <th>Description</th>
            </tr>
            {restaurantMenu?.map((menuItem, index) => (
              <tr key={index}>
                <td>{menuItem.foodName}</td>
                <td>{menuItem.foodPrice}</td>
                <td>{menuItem.foodDescription}</td>
              </tr>
            ))}
          </table>
        ):(
          <p className="nothing-show">There is no food to show!</p>
        )}
      </div>

      <AddFoodModal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        restaurantName={restaurantData?.restaurantName}
      />
    </div>
  );
};
