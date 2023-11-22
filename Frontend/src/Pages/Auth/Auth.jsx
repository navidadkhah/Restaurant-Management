import React, { useRef } from "react";
import { useState } from "react";
import { IoLogoSlack } from "react-icons/io";
import { login_API, signup_API } from "../../api/AuthController";
import "./Auth.css";
export const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const confirmRef = useRef();
  const [isMatch, setIsMatch] = useState(true);
  const [isFill, setisFill] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      let flag = true;

      for (let key in data) {
        if (data[key] === "") {
          setisFill(false);
          flag = false;
          break;
        }
      }
      if (flag) {
        setisFill(true);
        let regex = /^\d{11}$/;
        if (!regex.test(data.phoneNumber)) {
          setIsValidPhone(false);
        } else {
          setIsValidPhone(true);
        }
        if (data.password !== confirmRef.current.value) {
          setIsMatch(false);
        } else {
          setIsMatch(true);
        }
      }
      console.log(isFill);
      console.log(isFill);
      console.log(isValidPhone);
      if (isFill && isMatch && isValidPhone) {
        delete data.confirmPassword;
        console.log(data);
        signup_API(data);
      }
    } else {
      const loginData = { email: data.email, password: data.password };
      login_API(loginData);
    }
}; 


  const resetForm = () => {
    setData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      password: "",
    });
  };
  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <IoLogoSlack
          style={{ color: "var(--blue)", width: "4rem", height: "4rem" }}
        />
        <div className="Wbname">
          <h1>Restaurant</h1>
          <h6>Your faverute Restaurant app</h6>
        </div>
      </div>
      {/* right side */}
      <div className="right">
        <form className="infoForm">
          <h3>{isSignup ? "Sign up" : "Login"}</h3>
          {isSignup && (
            <div>
              <input
                type="text"
                placeholder="Name"
                className="infoInput"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
              />
            </div>
          )}
          {isSignup && (
            <div>
              <input
                type="text"
                className="infoInput"
                name="phoneNumber"
                placeholder="Phone number"
                onChange={handleChange}
                value={data.phoneNumber}
              />
            </div>
          )}
          <div>
            <input
              type="email"
              className="infoInput"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          {isSignup && (
            <div>
              <input
                type="text"
                className="infoInput"
                name="address"
                placeholder="address"
                onChange={handleChange}
                value={data.address}
              />
            </div>
          )}
          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignup && (
              <input
                type="password"
                ref={confirmRef}
                className="infoInput"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmPassword}
              />
            )}
          </div>
          {!isMatch && (
            <div>
              <p style={{ color: "red" }}>Passwords does not match!</p>
            </div>
          )}
          {!isFill && <p style={{ color: "red" }}>Please fill all fields!</p>}
          {!isValidPhone && (
            <p style={{ color: "red" }}>Invalid phone number!</p>
          )}
          <span
            onClick={() => {
              setIsSignup((prev) => !prev);
              resetForm();
            }}
            style={{ fontSize: "12px", cursor: "pointer" }}
          >
            {isSignup
              ? "Already have an account? Login."
              : "Don't have an account. Sign up."}
          </span>
          <button
            className="button"
            id="infoButton"
            type="submit"
            onClick={handleSubmit}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
