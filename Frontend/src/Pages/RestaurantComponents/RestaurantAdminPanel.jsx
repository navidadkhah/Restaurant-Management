import React, { useState } from "react";
import { Table } from "../Components/Table/Table";
import { CardPanel } from "../Components/CardPanel/CardPanel";
import "./RestaurantAdminPanel.css";
import AddRestaurantModal from "../Components/AddRestaurantModal/AddRestaurantModal";

export const RestaurantAdminPanel = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

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

      <AddRestaurantModal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
      />
    </div>
  );
};
