import React, { useState } from "react";
import { updateRate_API } from "../../api/RestaurantController";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./Rating.css";

export const Rating = () => {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);

  const handleSubmit = ()=>{
      updateRate_API(localStorage.getItem("res-name"),rating)
        .then((res) => {
            notify('Thanks for rating', 'success')
        })
        .catch((error) => {
          console.log(error.response.data);
        });
        localStorage.removeItem('res-name')
        navigate('/home')
  }

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

  const handleRatingChange = (value) => {
    setRating(value);;
    const paragraph = document.getElementById("myParagraph");
    if( value===1){
    paragraph.textContent = value + " star";
    }else{
    paragraph.textContent = value + " stars";
    }

  };
  const getStarColor = (starValue) => {
    return starValue <= rating ? "#FFD700" : "#000";
  };


  return (
    <div>
      <p className="title-rate">rate the {localStorage.getItem("res-name")}</p>
      <div className="rating">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <label key={starValue}>
              <input
                type="radio"
                name="rating"
                value={starValue}
                checked={starValue === rating}
                onChange={() => handleRatingChange(starValue)}
              />
              <svg
                className="star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={{ stroke: getStarColor(starValue) }}
              >
                <path d="M12 2l3.09 6.31L22 9.31l-5 4.09 1.18 7.19L12 18.77l-6.18 3.72 1.18-7.19-5-4.09 6.91-1.31L12 2z" />
              </svg>
            </label>
          );
        })}
      </div>
      <p id="myParagraph">0 star</p>
      <button className="submit-rate" onClick={handleSubmit}>
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};
