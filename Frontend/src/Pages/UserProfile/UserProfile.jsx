import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar/Navbar";
import "./UserProfile.css";
import {
  getUserOrders_API,
  getUserReservations_API,
} from "../../api/OrderController";
import { OrdersTable } from "../Components/OrdersTable/OrdersTable";
import { ReservationTable } from "../Components/ReservationTable/ReservationTable";

export const UserProfile = () => {
  const [orders, setOrders] = useState();
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    var item = JSON.parse(localStorage.getItem("User"));
    setInfo({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      address: item.address,
    });

    try {
      getUserOrders_API(item.phoneNumber).then((res) => setOrders(res.data));
      getUserReservations_API(item.phoneNumber).then((res) =>
        setReservations(res.data)
      );
    } catch (error) {
      console.error("error in loading user: ", error);
    }
  }, []);
  console.log(reservations);
  return (
    <div>
      <Navbar />
      <div className="profile">
        <span className="span-info">Informations</span>
        <div className="prof-infos">
          <div className="profile-container prof-name">
            <span>First Name:</span>
            <span>{info.firstName}</span>
          </div>
          <div className="profile-container prof-name">
            <span>Last Name:</span>
            <span>{info.lastName}</span>
          </div>
          <div className="profile-container">
            <span>Email:</span>
            <span>{info.email}</span>
          </div>
          <div className="profile-container">
            <span>Phone Number:</span>
            <span>{info.phoneNumber}</span>
          </div>
          <div className="profile-container">
            <span>Address:</span>
            <span>{info.address}</span>
          </div>
        </div>
      </div>
      <div className="prof-orders">
        <span className="span-info">Orders</span>
        <OrdersTable orders={orders} />
      </div>
      <div className="prof-reserve">
        <span className="span-info">Reservations</span>
        <ReservationTable reservation={reservations} />
      </div>
    </div>
  );
};
