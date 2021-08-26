import React, { useState } from 'react'
import '../style.css'
import { Link } from 'react-router';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

export default function Navbar(props) {

    const [showLinks, setShowLinks] = useState(false);

    return (
        <div>
            <div className="Navbar">
                <div className="leftSide">
                    <Link to='/22-Salon/' className='logo'><h1 className='logo-1'>22 </h1><h1 className='logo-2'>SALON</h1></Link>
                </div>

                <div className="rightSide">
                    <div className='links' id={showLinks ? 'hidden' : ''}>
                        <Link to='/22-Salon/' style={props.home ? {color: '#b90d1f'} : {color: 'black'}} >Home</Link>
                        <Link to='/22-Salon/appointment' style={props.appointment ? {color: '#b90d1f'} : {color: 'black'}}>Book an Appointment</Link>
                        <Link to='/22-Salon/services' style={props.services ? {color: '#b90d1f'} : {color: 'black'}}>Services</Link>
                        <Link to='/22-Salon/locationandhours' style={props.locationandhours ? {color: '#b90d1f'} : {color: 'black'}}>Location and Hours</Link>
                        <Link to='/22-Salon/about' style={props.about ? {color: '#b90d1f'} : {color: 'black'}}>About</Link>
                    </div>
                    <MenuRoundedIcon color='primary' fontSize='large' onClick={() => setShowLinks(!showLinks)} className='MenuRoundedIcon'/>
                </div>
            </div>
            <div className="page-intro"></div>
        </div>
    )
}
