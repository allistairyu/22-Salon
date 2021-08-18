import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'
import ContactInfo from './Components/ContactInfo';
import SelectService from './Components/SelectService'
import ReviewReserve from './Components/ReviewReserve'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import validator from 'validator';
import Button from '@material-ui/core/Button';
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
			services: { mensHaircut: 'unselected', womensHaircut: 'unselected', seniorKids: 'unselected' },
			errors: { firstName: '', lastName: '', phoneNumber: '', email: '' }
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this)
		this.handleValidation = this.handleValidation.bind(this)
		this.selectServiceValidation = this.selectServiceValidation.bind(this)
		this.checkErrors = this.checkErrors.bind(this)
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
		
        this.setState({
            [event.target.name]: event.target.value
        });
		this.handleValidation(event.target.name, event.target.value)
    }

	handleDateChange = date => {
		this.setState({
			date: date
		})
	}

	handlePhoneNumChange(value) {
		let errors = {...this.state.errors}
		if (!validator.isMobilePhone(value)) {
			errors.phoneNumber = 'invalid phone number'
			this.setState({
				errors: errors
			})
		} else {
			errors.phoneNumber = ''
			this.setState({
				errors: errors
			})
		}
		this.setState({
			phoneNumber: value
		})
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
	handleValidation = (name, value) => {
		let errors = this.state.errors;
		//Name
		if(!value){
			errors[name] = "Cannot be empty";
		} else {
			errors[name] = '';
		}
		if (name === 'firstName' || name === 'lastName') {
			if(typeof value !== "undefined"){
				if(!value.match(/^[a-zA-Z]+$/)){
					errors[name] = "Only letters";
				} else {
					errors[name] = ''
				}    
			}
		} else if (name === 'email') {
			if (!validator.isEmail(value)) {
				errors['email'] = 'Invalid Email'
			} else {
				errors['email'] = ''
			}   
		}
		this.setState({errors: errors})
	}

	checkErrors = () => {
		for (const error in this.state.errors) {
			if (this.state.errors[error] !== '') {
				return false
			}
		}
		return this.state.firstName && this.state.lastName && this.state.phoneNumber && this.state.email && this.state.date
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
		const { firstName, lastName, date, time, email, phoneNumber, services, errors } = this.state;
		const values = { firstName, lastName, date, time, email, phoneNumber, services, errors }

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
						<Button onClick={() => this.selectServiceValidation() ? this.nextStep() : alert('yo pls select smth')}>
							Next
						</Button>
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
								error={this.state.errors[date]===''} // TODO: WHY ISN'T THIS WORKING
							/>
						</MuiPickersUtilsProvider>
						<br></br>

						<Button onClick={this.prevStep }>
							Back
						</Button>
						{/* <Button onClick={() => alert(this.checkErrors())}> */}
						<Button onClick={() => this.checkErrors() ? this.nextStep() : (this.handleValidation('date', date), alert('Invalid inputs'))}>
							Next
						</Button>
						
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
