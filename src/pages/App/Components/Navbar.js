import React, {useState} from 'react'
import '../style.css'
import { Link } from 'react-router';
import logo from './seattle-seahawks-logo-transparent.png'
import ReorderIcon from '@material-ui/icons/Reorder';

export default function Navbar() {

    const [showLinks, setShowLinks] = useState(false);


    return (
        <div className="Navbar">
            <div className="leftSide">
                <div className='logo'>
                    <h1>
                        <img src={logo} alt='asdf'/>
                    </h1>
                </div>
            </div>

            <div className="rightSide">
                <div className='links' id={showLinks ? 'hidden' : ''}>
                    <Link to='/'>Home</Link>
                    <Link to='/appointment'>Book an Appointment</Link>
                    <Link to='/services'>Services</Link>
                    <Link to='/locationandhours'>Location and Hours</Link>
                    <Link to='/about'>About</Link>
                </div>
                <button onClick={() => setShowLinks(!showLinks)}><ReorderIcon /></button>
            </div>
        </div>
    )
}
