import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'
import ContactInfo from './Components/ContactInfo';
import SelectService from './Components/SelectService'
import ReviewReserve from './Components/ReviewReserve'

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
			phoneNumber: '',
			services: { mensHaircut: 'unselected', womensHaircut: 'unselected', seniorKids: 'unselected' }
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	prevStep = () => {
		const {step} = this.state;
		this.setState({ step: step - 1 })
	}

	nextStep = () => {
		const {step} = this.state;
		this.setState({ step: step + 1 })
	}

	handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

	handleClick(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.id === 'selected' ? 'unselected' : 'selected';
        const name = target.name;
		
        this.setState({
            services: {
				...this.state.services,
				[name]: value,
			},
        })
    }

	handleSubmit(event) {
        event.preventDefault();
		let databody = {
			'firstName': this.state.firstName,
			'lastName': this.state.lastName,
			'phoneNumber': this.state.phoneNumber,
			'email': this.state.email,
			'services': this.state.services
		}
		alert(JSON.stringify(databody))
        return fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(this.nextStep())
    }

	render() {
		const {step} = this.state
		const { firstName, lastName, date, time, email, phoneNumber, services } = this.state;
		const values = { firstName, lastName, date, time, email, phoneNumber, services }

		switch(step) {
			case 1:
				return (
					<div>
						<Navbar />
						<div className="page-intro"></div>
						<h1 className='page-title'>Choose a Service</h1>
						<SelectService
							nextStep={this.nextStep}
							handleClick={this.handleClick}
							values={values}
						/>
					</div>
				);
			case 2:
				return (
					<div>
						<Navbar />
						<div className="page-intro"></div>
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
						<Navbar />
						<div className="page-intro"></div>
						<h1>Review and Reserve</h1>
						<ReviewReserve 
							prevStep={this.prevStep}
							nextStep={this.nextStep}
							handleSubmit={this.handleSubmit}
							values={values}
						/>
					</div>
				);
			case 4:
				return (
					<div>
						<Navbar />
						<div className="page-intro"></div>
						<h1>success</h1>
					</div>
				);
			default:
			
		}
	}
}
