import React, { useState } from "react";
import Modal from "react-modal";
import {
  addFood_API
} from "../../../api/RestaurantController";
import "./AddFoodModal.css";

const AddFoodModal = ({ isOpen, onRequestClose, restaurantName }) => {
  const [foodName, setFoodName] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodPhoto, setFoodPhoto] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foodData = {
      restaurantName: restaurantName,
      foodName: foodName,
      foodDescription: foodDesc,
      foodImage: foodPhoto,
      foodPrice: foodPrice,
    };

    // console.log(restaurantData.restaurantImage)
    try {
      await addFood_API(foodData);
      console.log("success");
    } catch (error) {
      console.error(error);
    }
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
      <h2>Add Food</h2>
      <form>
        <div className="inputs">
          <b>Food Name</b>
          <label>
            <input
              type="text"
              name="name"
              className="modal-input"
              placeholder="Food Name"
              onChange={(e) => setFoodName(e.target.value)}
            />
          </label>
        </div>
        <br />

        <div className="inputs">
          <b>Price</b>
          <label>
            <input
              type="number"
              placeholder="Price"
              className="modal-input"
              name="type"
              onChange={(e) => setFoodPrice(e.target.value)}
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
              onChange={(e) => setFoodDesc(e.target.value)}
            />
          </label>
        </div>
        <br />

        <div className="inputs">
          <b>Food Photo</b>
          <label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              className="modal-input"
              onChange={(e) => setFoodPhoto(e.target.files[0])}
            />
          </label>
        </div>
        <br />
        <button onClick={(e) => handleSubmit(e)}>Add Restaurant</button>
      </form>
    </Modal>
  );
};

export default AddFoodModal;
