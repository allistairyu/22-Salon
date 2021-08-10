import React, { Component } from 'react';
import './style.css'
import RSUITEnavbar from '../App/Components/RSUITEnavbar'
import ContactInfo from './Components/ContactInfo';
import SelectService from './Components/SelectService'

export default class BookAppointment extends Component {
	render() {
		return (
			<div>
				<RSUITEnavbar />
				<h1>Book an Appointment</h1>
				<SelectService />
				<div className='contactInfo'>
					Contact Information
					<ContactInfo />
				</div>
			</div>

		);
	}
}
