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

//TODO: IMPLEMENT COMPONENT LIFECYCLE STUFF???

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
			services: { mensHaircut: 'unselected', womensHaircut: 'unselected', seniorKids: 'unselected', beardTrim: 'unselected',
						permAndColor: 'unselected', styleStart: 'unselected', shampoo: 'unselected', pedicure: 'unselected',
						manicure: 'unselected', pediMani: 'unselected', fullSet: 'unselected', fill: 'unselected', eyebrow: 'unselected',
						lips: 'unselected', chin: 'unselected' },
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

		//TODO: store prices somewhere else
		//TODO: STORE SERVICES IN GLOBAL VARIABLE
		this.servicesDict = {
			'mensHaircut': "Men's Haircut \n $15",
			'womensHaircut': `Women's Haircut \n$18`,
			'seniorKids': `Seniors & Kids 11 and Under \n$10`,
			'beardTrim': `Beard Trim \n$5`,
			'permAndColor': `Perm & Color Start \n$60+`,
			'styleStart': `Style Starting \n$25`,
			'shampoo': `Shampoo Only \n$5`,
			'pedicure': `Pedicure \n$28`,
			'manicure': `Manicure \n$15`,
			'pediMani': `Pedi Mani \n$40`,
			'fullSet': `Full Set \n$28`,
			'fill': `Fill \n$18`,
			'eyebrow': `Eyebrow Wax \n$10`,
			'lips': `Lips \n$5`,
			'chin': `Chin \n$8`
		}
		
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
        const name = target.getAttribute('name');

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
						<div className='flexbox-container'>
							<SelectService 
								handleClick={this.handleClick}
								values={values}
								className='flexbox-item flexbox-item-1'
								servicesDict={this.servicesDict}
							/>
						</div>
						{/* TODO: MOVE NEXT BUTTON TO BOTTOM... POSSIBLY FLEX-DIRECTION: COLUMN */}
						<Button className='button flexbox-item-2' onClick={() => this.selectServiceValidation() ? this.nextStep() : alert('Please Select an Option')}>
							Next
						</Button>
						
					</div>
				);
			case 2:
				return (
					<div>
						<Navbar />
						<div className="page-intro"></div>
						<h1 className='page-title'>Contact Information</h1>
						<div className='flexbox-container contact-info'>
							<div className='leftSide'>
								<ContactInfo 
									handleChange={this.handleChange}
									values={values}
									handlePhoneNumChange={this.handlePhoneNumChange}
								/>
								{/* TODO: MOVE TO PREVIOUS FORM? */}
								{/* TODO: make it so today can't be selected? */}
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
										// error={this.state.errors[date]===''} // TODO: WHY ISN'T THIS WORKING
									/>
								</MuiPickersUtilsProvider>
							</div>
							<div className='rightSide'>
								Appointment Information
								<ReviewReserve 
									servicesDict={this.servicesDict}
									values={values}
								/>
							</div>
						</div>
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
							servicesDict={this.servicesDict}
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
