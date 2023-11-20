import React from "react";
import { useState } from "react";
import { IoLogoSlack } from "react-icons/io";
import "./Auth.css";
export const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [data, setData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    Email: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      Email: "",
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
        <form className="infoForm" >
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

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          {isSignup && (
            <div>
              <input
                type="email"
                className="infoInput"
                name="Email"
                placeholder="E-mail"
                onChange={handleChange}
                value={data.Email}
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
                className="infoInput"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmPassword}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
            }}
          >
            * Confirm password doesn't match the password
          </span>
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
          >
            { isSignup ? "Sign Up" : "Login"}
          </button>
          <div></div>
        </form>
      </div>
    </div>
  );
};
