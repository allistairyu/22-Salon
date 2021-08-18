import React, { Component } from 'react';
import './style.css';
// import UserContainer from './Components/UserContainer'
import Navbar from '../App/Components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="page-intro"></div>
          Home
      </div>
    );
  }
}

export default App;
