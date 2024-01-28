import React, { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import "./OrderBag.css";
import { toast } from "react-toastify";
import { createOrder_API } from "../../api/OrderController";

export const OrderBag = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      calculateTotalPrice(JSON.parse(storedCart));
    }
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };
  const notify = (msg, type) => {
    if (type === "error") {
      toast.error(msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else if (type === "success") {
      toast.success(msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleOrder = () => {
    const orders = cart.map((food) => food.name).join(" ");
    let formData = new FormData();
    formData.append("userEmail", user.email);
    formData.append("userPhone", user.phoneNumber);
    formData.append("Price", totalPrice);
    formData.append("orders", orders);
    formData.append("restaurantName", cart[0].restaurant)
    try {
      console.log(formData)
      createOrder_API(formData)
      notify("Order created successfully", "success")
    } catch (error) {
      notify("Something goes wrong! try again", "error")
    }
  };

  return (
    <div>
      <Navbar />
      <div className="shop-card-content">
        <div className="shop-card-card">
          <h3>Restaurant: {cart.length > 0 ? cart[0].restaurant : "sample"}</h3>
          <p className="shop-card-line"></p>
          <div className="orders">
            {cart.length > 0 &&
              cart.map((food, index) => (
                <div key={index} className="shop-card-orders">
                  <span>Name: {food.name}</span>
                  <span>Price: {food.price}</span>
                </div>
              ))}
          </div>
          <p>Total Price: {totalPrice}</p>
          <button className="button-order-shopping-card" onClick={handleOrder}>
            Order Now!
          </button>
        </div>
      </div>
    </div>
  );
};
