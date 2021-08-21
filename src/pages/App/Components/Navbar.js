import React, { useState } from 'react'
import '../style.css'
import { Link } from 'react-router';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

export default function Navbar() {

    const [showLinks, setShowLinks] = useState(false);


    return (
        <div className="Navbar">
            <div className="leftSide">
                <Link to='/' className='logo'><h1 className='logo-1'>22 </h1><h1 className='logo-2'>SALON</h1></Link>
            </div>

            <div className="rightSide">
                <div className='links' id={showLinks ? 'hidden' : ''}>
                    <Link to='/'>Home</Link>
                    <Link to='/appointment'>Book an Appointment</Link>
                    <Link to='/services'>Services</Link>
                    <Link to='/locationandhours'>Location and Hours</Link>
                    <Link to='/about'>About</Link>
                </div>
                <MenuRoundedIcon color='primary' fontSize='large' onClick={() => setShowLinks(!showLinks)} className='MenuRoundedIcon'/>
            </div>
        </div>
    )
}
