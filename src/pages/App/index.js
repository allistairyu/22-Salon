import React, { Component } from 'react';
import './style.css';
import UserContainer from './Components/UserContainer'
import RSUITEnavbar from '../App/Components/RSUITEnavbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <RSUITEnavbar />
        <p className="App-intro">
          Here is a list of people:
        </p>
        <UserContainer />
      </div>
    );
  }
}

export default App;
