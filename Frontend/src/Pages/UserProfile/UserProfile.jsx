import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import './UserProfile.css'

export const UserProfile = () => {
    const [info, setInfo] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
    }); 
    useEffect(() => {
        var item = JSON.parse(localStorage.getItem("User"));
        setInfo({
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          phoneNumber: item.phoneNumber,
          address: item.address,
        });
    }, []);
  return (
    <div>
      <Navbar />
      <div className="profile">
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
  );
}
