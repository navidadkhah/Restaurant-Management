import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar';
import { Cards } from '../Components/Cards/Cards';
import "./RestaurantMenu.css";

export const RestaurantAdminPanel = () => {
  return (
    <div>
      <Navbar />
      <div className="res-panel">
        <Cards name="burger" type="fast-food" />
        <Cards name="burger" type="fast-food" />
        <Cards name="burger" type="fast-food" />
        <Cards name="burger" type="fast-food" />
        <Cards name="burger" type="fast-food" />
        <Cards name="burger" type="fast-food" />
        <Cards name="burger" type="fast-food" />
        <Cards name="burger" type="fast-food" />
      </div>
    </div>
  );
}
