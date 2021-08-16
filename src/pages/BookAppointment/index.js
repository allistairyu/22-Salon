import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'
import ContactInfo from './Components/ContactInfo';
import SelectService from './Components/SelectService'
import ReviewReserve from './Components/ReviewReserve'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import validator from 'validator';
// import { Select } from '@material-ui/core';

export default class BookAppointment extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			step: 1,
			firstName: '',
			lastName: '',
			date: null,
			time: '',
			email: '',
			phoneNumber: '',
			errors: {},
			services: { mensHaircut: 'unselected', womensHaircut: 'unselected', seniorKids: 'unselected' }
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this)
		this.handleValidation = this.handleValidation.bind(this)
		this.selectServiceValidation = this.selectServiceValidation.bind(this)
		this.nextStep = this.nextStep.bind(this)
		this.prevStep = this.prevStep.bind(this)
		// this.handleDateChange = this.handleDateChange.bind(this)
	}

	prevStep() {
		const {step} = this.state;
		this.setState({ step: step - 1 })
	}

	nextStep() {
		this.setState((prevState) => ({ step: prevState.step + 1 }))
	}

	handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

	handleDateChange = date => {
		this.setState({
			date: date
		})
	}

	// showTimes = () => {
	// 	<button>
	// 		5:30
	// 	</button>
	// }

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

	handlePhoneNumChange(value) {
		this.setState({
			phoneNumber: value
		})
	}

	handleSubmit(event) {
        event.preventDefault();

		let databody = {
			'firstName': this.state.firstName,
			'lastName': this.state.lastName,
			'date': this.state.date,
			'time': this.state.time,
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

	// https://stackoverflow.com/questions/41296668/reactjs-form-input-validation
	handleValidation = () => {


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

		//Phone Number
		if (!validator.isMobilePhone(this.state.phoneNumber)) {
			formIsValid = false;
			errors['phoneNumber'] = 'phone number not valid'
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

	selectServiceValidation = () => {
		for (const service in this.state.services) {
			if (this.state.services[service] === 'selected') return true
		}
		return false
	}

	disableDates = date => {
		return date.getDay() === 0 || date <= new Date() || date >= new Date().setMonth(new Date().getMonth() + 3);
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
							handleClick={this.handleClick}
							values={values}
						/>
						<button onClick={() => this.selectServiceValidation() ? this.nextStep() : alert('yo pls select smth')}>
							Next
						</button>
					</div>
				);
			case 2:
				return (
					<div>
						<Navbar />
						<div className="page-intro"></div>
						<h1>Contact Information</h1>
						<ContactInfo 
							handleChange={this.handleChange}
							handleValidation={this.handleValidation}
							values={values}
							handlePhoneNumChange={this.handlePhoneNumChange}
						/>
						{/* https://stackoverflow.com/questions/49491569/disable-specific-days-in-material-ui-calendar-in-react */}
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								id="date-picker-inline"
								value={this.state.date}
								onChange={this.handleDateChange}
								label='Select a Date'
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
								shouldDisableDate={this.disableDates}
								autoOk={true}
							/>
						</MuiPickersUtilsProvider>
						<br></br>

						<button onClick={this.prevStep }>
							Back
						</button>
						<button onClick={() => this.handleValidation() ? this.nextStep() : alert('not valid')}>
							Next
						</button>
						
					</div>
				);
			case 3:
				return (
					<div>
						<Navbar />
						<div className="page-intro"></div>
						<h1>Review and Reserve</h1>
						<ReviewReserve 
							Back={this.prevStep}
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
