import React, { Component } from 'react';
import './style.css';
// import UserContainer from './Components/UserContainer'
import Navbar from '../App/Components/Navbar'
import pic from './250472.jpg'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Welcome</h1>
        <br></br>
        <img src={pic} alt='firstpic'></img>
      </div>
    );
  }
}

export default App;
