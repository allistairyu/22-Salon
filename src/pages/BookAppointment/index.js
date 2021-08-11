import React, { Component } from 'react';
import './style.css'
import RSUITEnavbar from '../App/Components/RSUITEnavbar'
import ContactInfo from './Components/ContactInfo';
import SelectService from './Components/SelectService'
import ReviewReserve from './Components/ReviewReserve'
import TestComponent from './Components/TestComponent'

export default class BookAppointment extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			step: 1,
			firstName: '',
			lastName: '',
			date: '',
			time: '',
			email: '',
			number: '',
			services: []
		}
	}

	prevStep = () => {
		const {step} = this.state;
		this.setState({ step: step - 1 })
	}

	nextStep = () => {
		const {step} = this.state;
		this.setState({ step: step + 1 })
	}

	handleChange = input => e => {
		this.setState({ [input]: e.target.value })
	}

	render() {
		const {step} = this.state
		const { firstName, lastName, date, time, email, number, services } = this.state;
		const values = { firstName, lastName, date, time, email, number, services }

		switch(step) {
			case 1:
				return (
					<div>
						<RSUITEnavbar />
						<h1>Select a Service</h1>
						<TestComponent
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							values={values}
						/>
					</div>
				);
			case 2:
				return (
					<div>
						<h1>Contact Information</h1>
						<ContactInfo 
							prevStep={this.prevStep}
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							values={values}
						/>
					</div>
				);
			case 3:
				return (
					<div>
						<h1>Review and Reserve</h1>
						<ReviewReserve 
							prevStep={this.prevStep}
							nextStep={this.nextStep}
							values={values}
						/>
					</div>
				);
			case 4:
				return (
					<h1>success</h1>
				);
			default:
			
		}
	}
}
