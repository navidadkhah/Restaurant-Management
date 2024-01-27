import React, { useEffect, useState } from "react";
import { Table } from "../Components/Table/Table";
import { CardPanel } from "../Components/CardPanel/CardPanel";
import "./AdminDashboard.css";
import AddRestaurantModal from "../Components/AddRestaurantModal/AddRestaurantModal";
import { getRestaurant_API } from "../../api/RestaurantController";
import { useNavigate } from "react-router-dom";


export const AdminDashboard = () => {
  const navigate = useNavigate()
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState();

  useEffect(() => {
    getRestaurant_API().then((res) => {
      setRestaurants(res.data);
    });
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

    const logouthandler = () => {
     localStorage.removeItem('web-Token')
     navigate('/home');
    };

  return (
    <div className="admin-dash">
      <span className="admin-dash-title">Website Admin Panel</span>
      <CardPanel title="Current Restaurants" number={restaurants?.length} />
      <div className="admin-lists">
        <div className="admin-list-button">
          <button onClick={openAddModal}>Add</button>
          <button onClick={logouthandler} className="admin-list-button-logout">
            Logout
          </button>
        </div>
        <Table restaurants={restaurants} />
      </div>

      <AddRestaurantModal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
      />
    </div>
  );
};
