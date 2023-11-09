import React, { useState } from "react";
import { redirect } from "react-router-dom";
import "./Register.scss";

const Register = ({ userLogIn, setUserLogIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_repeat, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/register", {
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
      });
      if (response.ok) {
        // Trong này sẽ redirect login

        
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error(error);
      // Handle the error if needed
    }
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
    </div>
  );
};

export default Register;