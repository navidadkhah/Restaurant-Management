import React, { useState } from "react";
import { Table } from "../Components/Table/Table";
import { CardPanel } from "../Components/CardPanel/CardPanel";
import "./AdminDashboard.css";
import AddRestaurantModal from "../Components/AddRestaurantModal/AddRestaurantModal";

export const AdminDashboard = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <div className="admin-dash">
      <span className="admin-dash-title">Website Admin Panel</span>
      <CardPanel title="Current Restaurants" number="20" />
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
