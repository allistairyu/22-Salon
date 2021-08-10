import React, {useState} from 'react'
import { Navbar, Nav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { Link } from 'react-router';
import './navbar.css'
import logo from './seattle-seahawks-logo-transparent.png'
import ReorderIcon from '@material-ui/icons/Reorder';

export default function RSUITEnavbar() {

    const [showLinks, setShowLinks] = useState(false);

    return (
        <Navbar className='Navbar'>
			<Navbar.Header className='leftSide'>
                <h1>
                    <Link to='/'>
                        <img src={logo} alt='asdf'/>
                    </Link>
                </h1>
			</Navbar.Header>
			<Navbar.Body className='rightSide'>
			<Nav pullRight>
                <div className='thelinks' id={showLinks ? 'hidden' : ''}>
                    <Nav.Item><Link to='/'>Home</Link></Nav.Item>
                    <Nav.Item><Link to='/appointment'>Book an Appointment</Link></Nav.Item>
                    <Nav.Item><Link to='/services'>Services</Link></Nav.Item>
                    <Nav.Item><Link to='/locationandhours'>Location and Hours</Link></Nav.Item>
                    <Nav.Item><Link to='/about'>About</Link></Nav.Item>
                </div>
                <button onClick={() => setShowLinks(!showLinks)}><ReorderIcon /></button>
			</Nav>
			</Navbar.Body>
		</Navbar>
    )
}
