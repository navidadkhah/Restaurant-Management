import React, { useState } from "react";
import Modal from "react-modal";
import "./AddRestaurantModal.css";
import { addRestaurant_API } from "../../../api/RestaurantController";

const AddRestaurantModal = ({ isOpen, onRequestClose }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantDesc, setRestaurantDesc] = useState("");
  const [restaurantType, setRestaurantType] = useState("");
  const [restaurantPhoto, setRestaurantPhoto] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restaurantData = {
      restaurantName: restaurantName,
      restaurantDescription: restaurantDesc,
      restaurantType: restaurantType,
      restaurantImage: restaurantPhoto,
    };
    try {
      await addRestaurant_API(restaurantData);
      console.log("success");
    } catch (error) {
      console.error(error);
    }
    console.log("Submitted data:", restaurantData);
    onRequestClose();
  };

  return (
    <Modal
      className="container"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2>Add Restaurant</h2>
      <form>
        <div className="inputs">
          <b>Restaurant Name</b>
          <label>
            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </label>
        </div>
        <br />
        <div className="inputs">
          <b>Description</b>
          <label>
            <textarea
              name="description"
              placeholder="Description"
              onChange={(e) => setRestaurantDesc(e.target.value)}
            />
          </label>
        </div>
        <br />
        <div className="inputs">
          <b>Type</b>
          <label>
            <input
              type="text"
              placeholder="Type"
              name="type"
              onChange={(e) => setRestaurantType(e.target.value)}
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
