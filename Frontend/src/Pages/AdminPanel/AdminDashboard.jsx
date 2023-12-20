import React from "react";
import { Table } from "../Components/Table/Table";
import { CardPanel } from "../Components/CardPanel/CardPanel";
import "./AdminDashboard.css";


export const AdminDashboard = () => {
  return (
    <div className="admin-dash">
      <span className="admin-dash-title">Website Admin Panel</span>
      <CardPanel title="Current Restaurants" number="20" />
      <div className="admin-lists">
        <div className="admin-list-button">
          <button>add</button>
        </div>
        <Table></Table>
      </div>
    </div>
  );
};
