import { React, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Cards } from "../Components/Cards/Cards";
import "./Homepage.css";
import { Navbar } from "../Components/Navbar/Navbar";

export const Homepage = () => {
  useEffect(() => {}, []);
  const loginRoute = () => {
    <Navigate to={"/Auth"} />;
  };
  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
        <Cards></Cards>
      </div>
    </div>
  );
};
