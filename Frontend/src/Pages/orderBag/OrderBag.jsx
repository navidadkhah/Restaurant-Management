import React from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import "./OrderBag.css";

export const OrderBag = () => {
  return (
    <div>
      <Navbar />
      <div className="shop-card-content">
        <div className="shop-card-card">
          <h3>Restaurnant: sample</h3>
          <p className="shop-card-line"></p>
          <div className="shop-card-orders">
            <span>name: burger</span>
            <span>price:______________________________________40$</span>
          </div>
          <div className="shop-card-orders">
            <span>name: burger</span>
            <span>price:______________________________________30$</span>
          </div>
          <div className="shop-card-orders">
            <span>name: burger</span>
            <span>price:______________________________________25$</span>
          </div>
          <div className="shop-card-orders">
            <span>name: burger</span>
            <span>price:______________________________________2$</span>
          </div>
          <p className="shop-card-line-all-price"></p>
          <p className="all-prices">
            All Prices: ________________________________ 97$
          </p>
          <button className="button-order-shopping-card">Order Now!</button>
        </div>
      </div>
    </div>
  );
};
