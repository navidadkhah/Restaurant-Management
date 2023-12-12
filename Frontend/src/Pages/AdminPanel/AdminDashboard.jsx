import React from "react";
import "./AdminDashboard.css";

export const AdminDashboard = () => {
  return (
    <div className="admin-dash">
      <div className="admin-block">
        <span>Current Restaurants:</span>
        <span>20</span>
      </div>
      <div className="admin-lists">
        <div className="admin-list-buttons">
          <button>add</button>
          {/* <button></button> */}
        </div>
        <ul>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </ul>
      </div>
    </div>
  );
};
