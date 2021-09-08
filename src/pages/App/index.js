import React, { Component } from 'react';
import './style.css';
import Navbar from '../App/Components/Navbar'
// TODO: get better picture
import pic from './22-Salon_street_view.png'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar home />  
        <div className='container'>
          <img src={pic} alt='placeholder-image'></img>
          <div className='image-text'>PLACEHOLDER IMAGE</div>
        </div>
        <div className='margin-top'>
          <StarIcon fontSize='large' />
          <StarIcon fontSize='large' />
          <StarIcon fontSize='large' />
          <StarIcon fontSize='large' />
          <StarHalfIcon fontSize='large' />
        </div>
        <div className='center'>
          on <a href='https://www.yelp.com/biz/22-salon-seattle?hrid=61ZneHVlrNjZ4z7L67Q5tw&rh_type=people&rh_ident=Kelli'>Yelp</a>
        </div>
        <div className='flexbox-container'>
          <div className='review left-review'>
            Kelli has over 18 years' experience in precision styling and it shows!  She is fast, intuitive and artful in her approach.
            <br></br>
            –Karen C.
          </div>
          <div className='review center-review'>
          Very precise, clean, and professional.
            <br></br>
            –Tori N.
          </div>
          <div className='review right-review'>
            I highly recommend getting your haircut here if you want an amazing cut without spending a fortune!
            <br></br>
            –Jenny N.
          </div>
        </div>
        <div className='footer margin-top'></div>
      </div>
    );
  }
}

export default App;
