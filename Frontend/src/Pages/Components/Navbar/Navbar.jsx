import { useEffect, useState } from "react";
import Logo from "../../../images/OIG2.jpg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserProfile } from "../../UserProfile/UserProfile";
import { OrderBag } from "../../orderBag/OrderBag";
import "./Navbar.css";
import { Auth } from "../../Auth/Auth";
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = ({ setSearch, tmp }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")));
    if (tmp) {
      setCart(tmp);
    } else {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, [tmp]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const profileHandle = () => {
    <Navigate to={UserProfile} />;
  };

  const handleLogout = () => {
    localStorage.removeItem("user-Token");
    localStorage.removeItem("User");
    localStorage.removeItem("cart");
    setUser(null);
    navigate("/home");
  };

  const handleLogin = () => {
    <Navigate to={"/"} />;
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="navbar">
      <div className="navbar-img">
        <a href="/home">
          <img src={Logo} alt="logo" />
        </a>
      </div>
      <div className="nav-cont">
        <ul className="navbar-ul">
          <i>
            <a href="/home">Home</a>
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
              <a href="/">Login</a>
            )}
          </i>

          <i>
            <a
              href="/Shopping-cart"
              className="shopping-card"
              shop-item={cart.length}
            >
              <FaShoppingCart />
            </a>
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
              onChange={(e) => handleSearchChange(e)}
              style={{ width: isChecked ? "0" : "170px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
