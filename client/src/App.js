import React, { Component, useState } from 'react';
import './App.css';
import SideBar from './Components/SideBar/SideBar';
import HomePage from './Components/HomePage/Body/HomePage';
import UserProfile from './Components/UserProfile/UserProfile';
import LogIn from './Components/LogInPage/Login';
import GamePage from './Components/GamePage/GamePage';
import Register from './Components/RegisterPage/Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:8000/api/test")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }
  callRegister() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "example@gmail.com", username: 'example', password: "123123123aA@", password_repeat: "123123123aA@" }) // Thay đổi đối tượng body thành dữ liệu bạn muốn gửi đi
    };
    fetch("http://localhost:8000/api/register", requestOptions)
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    // this.callRegister();
  }

  render() {
    return (
      <div className='container'>

        <BrowserRouter>
          <Routes>
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/Register" element={<Register />} />
            {/*{userLogIn ? <Navigate to="/" /> : (<LogIn userLogIn={userLogIn} setUserLogIn={setUserLogIn} />)} />*/}
            <Route path="/" element={(
              <div className='container'>
                <SideBar />
                <HomePage />
              </div>
            )} />
            {/*{userLogIn ? (<SideBar />,<HomePage />) : <Navigate to="/log-in" />} /> */}
            <Route path="/User-Profile" element={(
              <div className='container'>
                {(
                  <>
                    <SideBar />
                    <UserProfile />
                  </>
                ) 
                }
              </div>
            )} />
            <Route path="/:gameName" element={(
              <div className='container'>
                <SideBar />
                <GamePage />
              </div>
            )} />
          </Routes>
        </BrowserRouter>

      </div>
    )
  }
}

export default App;