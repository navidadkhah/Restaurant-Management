import React, { useState } from "react";
import Modal from "react-modal";
import "./AddRestaurantModal.css";

const AddRestaurantModal = ({ isOpen, onRequestClose }) => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    type: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const inputValue = type === "file" ? e.target.files[0] : value;

    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission
    // You can access restaurantData to get the input values
    console.log("Submitted data:", restaurantData);
    // Close the modal after submission
    onRequestClose();
  };

  return (
    <Modal
      className="container"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2>Add Restaurant</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="inputs">
          <b>Restaurant Name</b>
          <label>
            <input
              type="text"
              name="name"
              placeholder="Restaurant Name"
              value={restaurantData.name}
              onChange={handleInputChange}
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
              value={restaurantData.description}
              onChange={handleInputChange}
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
              value={restaurantData.type}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </label>
        </div>
        <br />
        <button type="submit">Add Restaurant</button>
      </form>
    </Modal>
  );
};

export default AddRestaurantModal;
