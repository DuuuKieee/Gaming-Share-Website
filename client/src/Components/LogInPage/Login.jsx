import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LogIn = ({ userLogIn, setUserLogIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  if (Cookies.get("token")) Cookies.remove('token');
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      console.log(data.token);

      if (response.status === 200) {
        Cookies.set('token', data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };


 
  return (
    <div className="LogInContainer">
      <div className="loginContent">
        <form onSubmit={handleLogin} className="LoginForm grid">
              <h1 className="Title">Log In</h1>
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
              <button className="SubmitButton" type="submit">
                Log In
              </button>

          <div className="RegisterLink">
            <p>
              Don't have an account?
              <a href="/Register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;