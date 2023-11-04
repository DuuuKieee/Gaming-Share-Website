import React, { Component } from 'react';
// import SideBar from './Components/SideBar/SideBar';
// import HomePage from './Components/HomePage/Body/HomePage';
// import UserProfile from './Components/UserProfile/UserProfile';
// import LogIn from './Components/LogInPage/Login';
// import GamePage from './Components/GamePage/GamePage';
// import Register from './Components/RegisterPage/Register';
import './App.css';
import axios from 'axios';

/*Routing*/
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

class App extends Component {
  state = {
    message: ''
  };

  componentDidMount() {
    axios.get('/api/test')
      .then(result => this.setState({ message: result.data.message }))
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.message}</h1>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    )
  };
};

export default App;
