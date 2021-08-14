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
			errors: {},
			services: { mensHaircut: 'unselected', womensHaircut: 'unselected', seniorKids: 'unselected' }
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleValidation = this.handleValidation.bind(this)
		this.Continue = this.Continue.bind(this)
		this.Back = this.Back.bind(this)
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

	Continue = e => {
        e.preventDefault();
		if (this.handleValidation()) {
			alert('form submitted')
		} else {
			alert('form has errors')
		} 	
        this.nextStep();
    }

	Back = e => {
        e.preventDefault();
        this.prevStep();
    }


	// https://stackoverflow.com/questions/41296668/reactjs-form-input-validation
	handleValidation() {

		let errors = {};
		let formIsValid = true;

		//Name
		if(!this.state.firstName || !this.state.lastName){
			formIsValid = false;
			errors["name"] = "Cannot be empty";
		}
	
		if(typeof this.state.firstName !== "undefined" || typeof this.state.lastName !== "undefined"){
			if(!this.state.firstName.match(/^[a-zA-Z]+$/) || !this.state.lastName.match(/^[a-zA-Z]+$/)){
				formIsValid = false;
				errors["name"] = "Only letters";
			}        
		}
	
		//Email
		if(!this.state.email){
			formIsValid = false;
			errors["email"] = "Cannot be empty";
		}
	
		if(typeof this.state.email !== "undefined"){
			let lastAtPos = this.state.email.lastIndexOf('@');
			let lastDotPos = this.state.email.lastIndexOf('.');

			if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
				formIsValid = false;
				errors["email"] = "Email is not valid";
			}
		}  

		this.setState({errors: errors});
		return formIsValid;

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
							Continue={this.Continue}
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
							Continue={this.Continue}
							Back={this.Back}
							handleChange={this.handleChange}
							handleValidation={this.handleValidation}
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
							Back={this.Back}
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
