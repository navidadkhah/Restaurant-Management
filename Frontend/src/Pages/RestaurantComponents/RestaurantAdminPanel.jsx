import React, { useEffect, useState } from "react";
import AddFoodModal from "../Components/AddFoodModal/AddFoodModal";
import { CardPanel } from "../Components/CardPanel/CardPanel";
import { Table } from "../Components/Table/Table";
import "./RestaurantAdminPanel.css";
import { getRestaurantMenu_API } from "../../api/RestaurantController";

export const RestaurantAdminPanel = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [restaurantMenu, setRestaurantMenu] = useState();
  const [restaurantData, setRestaurantData] = useState();

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("res_admin"));
    setRestaurantData(item);
    try {
      console.log(restaurantData.restaurantName);
      getRestaurantMenu_API({
        restaurantName: restaurantData.restaurantName,
      }).then((res) => setRestaurantMenu(res.data));
      console.log("test");
      console.log(restaurantMenu);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const openAddModal = () => {
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

  return (
    <div className="admin-dash">
      <span className="admin-dash-title">Restaurant Admin Panel</span>
      <CardPanel title="Current Food count" number="20" />
      <div className="admin-lists">
        <div className="admin-list-button">
          <button onClick={openAddModal}>Add</button>
        </div>
        <Table />
      </div>

      <AddFoodModal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        restaurantName={restaurantData?.restaurantName}
      />
    </div>
  );
};
