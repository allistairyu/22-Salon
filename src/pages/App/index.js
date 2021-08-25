import React, { Component } from 'react';
import './style.css';
// import UserContainer from './Components/UserContainer'
import Navbar from '../App/Components/Navbar'
import pic from './22-Salon_street_view.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />  
        <img src={pic} alt='placeholder-image'></img>
      </div>
    );
  }
}

export default App;
