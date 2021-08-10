import React, { Component } from 'react';
import './style.css'
import RSUITEnavbar from '../App/Components/RSUITEnavbar'
import ContactInfo from './Components/ContactInfo';

export default class BookAppointment extends Component {
	render() {
		return (
			<div>
				<RSUITEnavbar />
				<h1>Book an Appointment</h1>
				<div className='contactInfo'>
					Contact Information
					<ContactInfo />
				</div>
			</div>
			
		);
	}
}
