import React, { useRef, useState } from "react";
import { IoLogoSlack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { login_API, signup_API } from "../../api/AuthController";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
export const Auth = ({ setUser }) => {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false);
  const confirmRef = useRef();
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
      let flag_is_valid_phone = true;
      let flag_is_pass_valid = true;
      let flag_is_email_valid = true;

      for (let key in data) {
        if (data[key] === "") {
          flag_is_fill = false;
          break;
        }
      }

      if (flag_is_fill) {
        let phone_regex = /^\d{11}$/;
        let regex_email = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if (!phone_regex.test(data.phoneNumber)) {
          flag_is_valid_phone = false;
          notify("Invalid phone number!", "error");
        } else {
          flag_is_valid_phone = true;
        }

        if (!regex_email.test(data.email)) {
          flag_is_email_valid = false;
          notify("Invalid Email Format!", "error");
        } else {
          flag_is_email_valid = true;
        }

        if (data.password !== confirmRef.current.value) {
          flag_is_pass_valid = false;
          notify("Passwords does not match!", "error");
        } else {
          flag_is_pass_valid = true;
        }
      } else {
        notify("Please fill all fields!", "error");
      }

      if (
        flag_is_fill &
        flag_is_valid_phone &
        flag_is_pass_valid &
        flag_is_email_valid
      ) {
        delete data.confirmPassword;
        console.log(data);
        try {
          const res = await signup_API(data);
          console.log("dd");
          notify("successfylly signup!", "success");
          setIsSignup(false);
        } catch (error) {
          if (error.response !== "undefined") {
            notify(error.response.data, "error");
          }
        }
      }
    } else {
       let flag_is_fill = true;
         if (data['email'] === "") {
           flag_is_fill = false;
         }
           if (data["password"] === "") {
             flag_is_fill = false;
           }
       
       if (!flag_is_fill) {
        notify("Please fill all fields!", "error");
       }
       if(flag_is_fill){
         const loginData = { email: data.email, password: data.password };
         try {
           const res = await login_API(loginData);
           localStorage.setItem("user-Token", JSON.stringify(res.data.token));
           localStorage.setItem("User", JSON.stringify(res.data.detail));
           notify("successfylly logged in!", "success");
           navigate('/home');
         } catch (error) {
          if (error.response!=="undefined"){
            notify(error.response.data, "error");
          } 
         }
       }
    }
  };

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
          <h1>Tameshk</h1>
          <h6>Your favorite Restaurant app</h6>
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

          <span
            onClick={() => {
              setIsSignup((prev) => !prev);
              resetForm();
            }}
            style={{ fontSize: "12px", cursor: "pointer" }}
            className="islogin-tab"
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
