import { useEffect, useState } from "react";
import Logo from "../../../images/logo.png";
import { Link, Navigate } from "react-router-dom";
import { UserProfile } from "../../UserProfile/UserProfile";

import "./Navbar.css";

export const Navbar = ({ restaurants, isSearch, setSearchRestaurants }) => {

  const [isChecked, setIsChecked] = useState(true);;
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if(searchValue ===''){
      isSearch(0)
    }else{
      isSearch(1)
    }
    const filteredItems = restaurants.filter((rs) => {
      if (
        rs.restaurantType.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        setSearchRestaurants(rs);
        console.log(rs)
      }
    });

    //keep filtered items in another state

    //     restaurants.filter(res =>{
    //       if(res.restaurantType.toLowerCase().includes(e.target.value.toLowerCase()))
    //       setRestaurants(res)
    //     }
    //       // console.log(res.restaurantType.toLowerCase().includes(e.target.value.toLowerCase()))
    //       // setRestaurants(res.restaurantType.toLowerCase().includes(e.target.value.toLowerCase()))
    // )
    // restaurants.filter((res) => {
    //   if (res.restaurantName.startsWith(e.target.value)) {
    //     setRestaurants(res);
    //     console.log(res)
    //   }
    // });
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    setUser(null);
  };
  return (
    <div className="navbar">
      <div className="navbar-img">
        <a href="/">
          <img src={Logo} alt="logo" />
        </a>
      </div>
      <ul className="navbar-ul">
        <i>
          <a href="/">Home</a>
        </i>
        {user && (
          <i>
            <a href="/profile">Profile</a>
          </i>
        )}
        <i>
          {user ? (
            <p onClick={handleLogout}>Logout</p>
          ) : (
            <a href="/auth">Login</a>
          )}
        </i>
        <i className="search"></i>
      </ul>
      <div className="container">
        <input
          className="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className={`mainbox ${isChecked ? "checked" : ""}`}>
          <div className="iconContainer">
            <svg
              viewBox="0 0 512 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="search_icon"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </div>
          <input
            className="search_input"
            placeholder="search"
            type="text"
            style={{ width: isChecked ? "0" : "170px" }}
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
    </div>
  );
};
