import React, { useState } from "react";
import Modal from "react-modal";
import "./AddRestaurantModal.css";
import { addRestaurant_API } from "../../../api/RestaurantController";

const AddRestaurantModal = ({ isOpen, onRequestClose }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantDesc, setRestaurantDesc] = useState("");
  const [restaurantType, setRestaurantType] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [restaurantUsername, setRestaurantUsername] = useState("");
  const [restaurantPassword, setRestaurantPassword] = useState("");
  const [restaurantPhoto, setRestaurantPhoto] = useState();
  const restaurantRate = 5;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurantData = {
      restaurantName: restaurantName,
      restaurantDescription: restaurantDesc,
      restaurantType: restaurantType,
      restaurantLocation: restaurantLocation,
      restaurantUsername: restaurantUsername,
      restaurantPassword: restaurantPassword,
      restaurantImage: restaurantPhoto,
      restaurantRate: restaurantRate,
    };

    console.log(restaurantData);

    // console.log(restaurantData.restaurantImage)
    try {
      await addRestaurant_API(restaurantData);
      console.log("success");
    } catch (error) {
      console.error(error);
    }
    console.log("Submitted data:", restaurantData);
    onRequestClose();
  };

   const bg = {
     overlay: {
       background: "rgb(0,0,0,0.6)",

     },
   };

  return (
    <Modal
      className="container"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={bg}
    >
      <h2>Add Restaurant</h2>
      <form>
        <div className="inputs">
          <b>Restaurant Name</b>
          <label>
            <input
              type="text"
              name="name"
              className="modal-input"
              placeholder="Restaurant Name"
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </label>
        </div>
        <br />

        <div className="inputs">
          <b>Location</b>
          <label>
            <input
              type="text"
              placeholder="Location"
              className="modal-input"
              name="type"
              onChange={(e) => setRestaurantLocation(e.target.value)}
            />
          </label>
        </div>
        <div className="inputs">
          <b>Type</b>
          <label>
            <select
              name="type"
              className="modal-input commo-box"
              id=""
              onChange={(e) => setRestaurantType(e.target.value)}
            >
              <option value="default"></option>
              <option value="Fast-Food">fast-food</option>
              <option value="Persian">persian</option>
              <option value="Italian">Italian</option>
              <option value="Coffee-Shop">Coffee-shop</option>
            </select>
          </label>
        </div>
        <div className="inputs">
          <b>Admin username</b>
          <label>
            <input
              type="text"
              placeholder="username"
              className="modal-input"
              name="type"
              onChange={(e) => setRestaurantUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="inputs">
          <b>Admin password</b>
          <label>
            <input
              type="password"
              placeholder="password"
              className="modal-input"
              name="type"
              onChange={(e) => setRestaurantPassword(e.target.value)}
            />
          </label>
        </div>
        <div className="inputs">
          <b>Description</b>
          <label>
            <textarea
              name="description"
              placeholder="Description"
              className="modal-input"
              onChange={(e) => setRestaurantDesc(e.target.value)}
            />
          </label>
        </div>
        <br />

        <div className="inputs">
          <b>Restaurant Photo</b>
          <label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              className="modal-input"
              onChange={(e) => setRestaurantPhoto(e.target.files[0])}
            />
          </label>
        </div>
        <br />
        <button onClick={(e) => handleSubmit(e)}>Add Restaurant</button>
      </form>
    </Modal>
  );
};

export default AddRestaurantModal;
