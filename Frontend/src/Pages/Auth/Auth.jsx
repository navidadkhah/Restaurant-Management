import React, { useRef } from "react";
import { useState } from "react";
import { IoLogoSlack } from "react-icons/io";
import { login_API, signup_API } from "../../api/AuthController";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "./Auth.css";
export const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const confirmRef = useRef();
  const [isMatch, setIsMatch] = useState(true);
  const [isFill, setisFill] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [loginError, setLoginError] = useState();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      let flag_is_fill = true;
      let flag_is_valid_phone = true
      let flag_is_pass_valid = true
      let flag_is_email_valid = true
     
      for (let key in data) {
        if (data[key] === "") {
          setisFill(false);
          flag_is_fill = false;
          break;
        }
      }

      if (flag_is_fill) {
        setisFill(true);
        let phone_regex = /^\d{11}$/;
        let regex_email = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        if (!phone_regex.test(data.phoneNumber)) {
          setIsValidPhone(false);
          flag_is_valid_phone = false;
          notify('Invalid phone number!', "error")
        } else {
          setIsValidPhone(true);
          flag_is_valid_phone = true;
        }


        if (!regex_email.test(data.email)) {
          setIsValidEmail(false);
          flag_is_email_valid = false;
          notify('Invalid Email Format!', "error")
        } else {
          setIsValidEmail(true);
          flag_is_email_valid = true;
        }
   
        if (data.password !== confirmRef.current.value) {
          setIsMatch(false);
          flag_is_pass_valid = false;
          notify('Passwords does not match!', "error")
        } else {
          setIsMatch(true);
          flag_is_pass_valid = true;
        }
      }
      else{
        setisFill(false); 
        notify('Please fill all fields!', "error")
      }
  
      if (flag_is_fill & flag_is_valid_phone & flag_is_pass_valid & flag_is_email_valid) {
        delete data.confirmPassword;
        console.log(data);
        try {
           await signup_API(data);
          setLoginError(null);
          notify("User created successfylly", "success")
        } catch (error) {
          notify(error.response.data, "error")
          setLoginError(error.response.data);
        }
      }
    } else {
      const loginData = { email: data.email, password: data.password };
      try {
        await login_API(loginData);
        setLoginError(null);
      } catch (error) {
        setLoginError(error.response.data);
      }
    }
  };

  const notify = (msg, type) => {
    if (type==="error"){
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
    }
    else if (type === "success"){
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
  }

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
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
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
      <ToastContainer />
    </div>
    
  );
};
