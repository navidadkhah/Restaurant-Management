import React from "react";
import "./AdminDashboard.css";
import { Table } from "../Components/Table/Table";
import { CardPanel } from "../Components/CardPanel/CardPanel";

export const AdminDashboard = () => {
  return (
    <div className="admin-dash">
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
