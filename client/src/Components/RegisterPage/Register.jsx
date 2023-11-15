import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import Popup from "reactjs-popup";

const Register = ({ userLogIn, setUserLogIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_repeat, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isSuccess, setSuccess] = useState(false);
  const openPopup = () => {
    setSuccess(true);
  };

  const closePopup = () => {
    setSuccess(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    
    fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_repeat,
          email,
        }),
      }).then((response) => {
        response.json();
        if(response.status===200)
        {
          //Open successful pop ups
          openPopup();
        }
      }).catch(error => {
        console.error(error);
      })
  };

  return (
    <div className="RegisterContainer">
      <div className="registerContent ">
        <form onSubmit={handleRegister} className="RegisterForm grid">
          <h1 className="Title">Create Your Account</h1>
          <div className="inputBox">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={password_repeat}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="inputBox">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="SubmitButton">
            Create Account
          </button>
          <div className="logInLink">
            <p>
              Already have an account? <a href="/log-in">Log In</a>
            </p>
          </div>
        </form>
      </div>
      {isSuccess && (
        <div className="successPopup">
          <div className="popup-content">
            <h1>Register Successful!</h1>
            <button class = "btn" onClick={() => {
              closePopup();
              // navigate back to /log-in
              navigate("/log-in");  
            }}>Back to Log in</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;