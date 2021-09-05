import React, { useState } from 'react'
import '../style.css'
import { Link } from 'react-router';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Button from '@material-ui/core/Button';

export default function Navbar(props) {

    const [showLinks, setShowLinks] = useState(false);

    const linkStyle = link => {
        let style = {
            height: '75%',
            width: '75%'
        }
        style = link ? Object.assign({color: '#b90d1f'}, style) : Object.assign({color: 'black'}, style)
        return style
    }
    //TODO: adjust media queries and spacing between links
    return (
        <div>
            <div className="Navbar">
                <div className="leftSide">
                    <Link to='/' className='logo'><h1 className='logo-1'>22 </h1><h1 className='logo-2'>SALON</h1></Link>
                </div>

                <div className="rightSide">
                    <div className='links' id={showLinks ? 'hidden' : ''}>
                        <Button component={Link} to={'/'} style={linkStyle(props.home)}>Home</Button>
                        <Button component={Link} to={'/appointment'} style={linkStyle(props.appointment)}>Book Appointment</Button>
                        {/* <Button component={Link} to={'/appointment'} style={props.appointment ? {color: '#b90d1f'} : {color: 'black'}}>Book an Appointment</Button> */}
                        <Button component={Link} to={'/services'} style={linkStyle(props.services)}>Services</Button>
                        <Button component={Link} to={'/locationandhours'} style={linkStyle(props.locationandhours)}>Location & Hours</Button>
                        <Button component={Link} to={'/about'} style={linkStyle(props.about)}>About</Button>
                    </div>
                    <MenuRoundedIcon color='primary' fontSize='large' onClick={() => setShowLinks(!showLinks)} className='MenuRoundedIcon'/>
                </div>
            </div>
            <div className="page-intro"></div>
        </div>
    )
}
