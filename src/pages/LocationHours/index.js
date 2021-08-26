import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GoogleMapEmbed from './Map'

export default class LocationHours extends Component {
	render() {
		return (
			<div>
				<Navbar locationandhours />
				<h1 className='page-title navbar-margin'>Location and Hours</h1>
				<div className='flexbox-container-5'>
					<div className='leftSide'>
						<br></br>
						<div className='location'>
							<RoomIcon />
							10535 Greenwood Ave N
							<br></br>
							Seattle, WA 98133
						</div>
						<br></br>
						<div className='call'>
							<PhoneIcon />
							(206) 417-0482
						</div>
						<br></br>
						<div className='hours'>
							<ScheduleIcon />
							Monday through Saturday 
						</div>
						
					</div>
					<div className='rightSide'>
						<GoogleMapEmbed />
					</div>
				</div>
			</div>
		);
	}
}
