import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
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
							<div className='text'>
								10535 Greenwood Ave N
								<br></br>
								Seattle, WA 98133
							</div>
						</div>
						<br></br>
						<div className='call'>
							<PhoneIcon />
							<div className='text'>
								(206) 417-0482
							</div>
						</div>
						<br></br>
						<div className='call'>
							<PhoneAndroidIcon />
							<div className='text'>
								(206) 778-1526
							</div>
						</div>
						<br></br>
						<div className='hours'>
							<ScheduleIcon />
							<div className='text'>
								Monday through Friday
								<br></br>
								12:00 PM to 5:00 PM
							</div>
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
