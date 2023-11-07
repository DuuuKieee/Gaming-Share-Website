import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    message: ''
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/test')
      .then(result => this.setState({ message: result.data.message }))
  }

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
  }
}

export default App;