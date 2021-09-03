import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'
import ContactInfo from './Components/ContactInfo';
import SelectService from './Components/SelectService'
import ReviewReserve from './Components/ReviewReserve'
import validator from 'validator';
import Button from '@material-ui/core/Button';
import Success from './Components/Success'
import SelectDateTime from './Components/SelectDateTime'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router';

const timeSlots = [
	'12:00 pm',
	'12:30 pm',
	'1:00 pm',
	'1:30 pm',
	'2:00 pm',
	'2:30 pm',
	'3:00 pm',
	'3:30 pm',
	'4:00 pm',
	'4:30 pm'
]

const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
const URL = '/' + ObjectId()

//TODO: IMPLEMENT COMPONENT LIFECYCLE STUFF???
//TODO: ADD ROUTER BLOCKING
//https://stackoverflow.com/questions/32841757/detecting-user-leaving-page-with-react-router

//TODO: figure out time slots if user selects multiple services
// https://material-ui.com/components/dialogs/

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
			services: [],
			errors: {},
			id: '',
			availableTimes: timeSlots
		}
		//TODO: STORE SERVICES IN GLOBAL VARIABLE
		this.servicesDict = {
			'mensHaircut': ["Men's Haircut", 15],
			'womensHaircut': ["Women's Haircut", 20],
			'seniorKids': ["Seniors & Kids 11 and Under", 12],
			'beardTrim': ["Beard Trim", 5],
			'permAndColor': ["Perm & Color Start", 60],
			'styleStart': ["Style Starting", 25]
		}
		
	}
	
	componentDidMount = async () => {
		await this.setState({
			id: ObjectId()
		}) 
		
	}

	prevStep = () => {
		this.setState((prevState) => ({ step: prevState.step - 1 }))
	}

	nextStep = () => {
		this.setState((prevState) => ({ step: prevState.step + 1 }))
	}

	handleChange = (event) => {
		
        this.setState({
            [event.target.name]: event.target.value
        });
		this.handleValidation(event.target.name, event.target.value)
    }

	checkReserved = async () => {
        
		try {
			const response = await fetch(`api/users/${this.state.date}`)
			if (!response.ok) {
				throw Error(response.statusText);
			}
			const reservedDates = await response.json()
			return reservedDates
		} catch (e) {
			console.log(e)
		}
		
    }

	filterTimes = (data) => {
		if (Object.keys(data).length === 0) return
		let takenTimes = []
		//https://stackoverflow.com/questions/1963102/what-does-the-jslint-error-body-of-a-for-in-should-be-wrapped-in-an-if-statemen
		for (const [index, user] in data) {
			takenTimes.push(data[index].time)
		}
		let availableTimesInstance = this.state.availableTimes
		this.setState({
			availableTimes: availableTimesInstance.filter(time => !takenTimes.includes(time))
		})
	}

	handleDateChange = async date => {
		date = String(date)
		date = date.slice(0, 15)
		if (this.state.date === date) return

		await this.setState({
			date: date,
			time: '',
			availableTimes: timeSlots
		})
		const reservedDates = await this.checkReserved()
		this.filterTimes(reservedDates)
	}

	handlePhoneNumChange = (value) => {
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
	handleClick = (name, value) => {
		if (name === 'services') {
			if (this.state.services.indexOf(value) !== -1) {
				let filteredArray = this.state.services
				filteredArray.splice(filteredArray.indexOf(value), 1)
				this.setState({
					services: filteredArray
				})
			} else {
				if (this.state.services.length === 2) return
				this.setState(prevState => ({
					services: [...prevState.services, value]
				}))
			}
		} else {
			if (this.state[name] === value) value = ''
			this.setState({
				[name]: value
			})
		}
    }

	handleSubmit = (event) => {
        event.preventDefault();
		
		let normalizedNumber = this.state.phoneNumber.slice(0,2)+this.state.phoneNumber.slice(4,7)+this.state.phoneNumber.slice(9,12)+this.state.phoneNumber.slice(13,17)
		let now = new Date();
		let databody = {
			'firstName': this.state.firstName,
			'lastName': this.state.lastName,
			'date': this.state.date,
			'time': this.state.time,
			'phoneNumber': normalizedNumber,
			'email': this.state.email,
			'services': this.state.services,
			'timestamp': now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
			'_id': this.state.id
		}

        fetch('/api/users', {
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
		return this.state.firstName && this.state.lastName && this.state.phoneNumber && this.state.email && this.state.date && this.state.time
	}

	selectServiceValidation = () => {
		return this.state.services.length > 0 ? true : false
	}

	disableDates = date => {
		return date.getDay() === 0 || date.getDay() === 6 || date <= new Date() || date >= new Date().setMonth(new Date().getMonth() + 3);
	}

	render() {
		const {step} = this.state
		const { firstName, lastName, date, time, email, phoneNumber, services, errors, id } = this.state;
		const values = { firstName, lastName, date, time, email, phoneNumber, services, errors, id }

		switch(step) {
			case 1:
				return (
					<div>
						<Navbar appointment />
						{/* <div className='navbar-margin'></div> */}
						<h1 className='page-title navbar-margin'>Book an Appointment</h1>
						<div className='small center'>Select up to 2 services</div>
						<br></br>
						<div className='flexbox-container'>
							<SelectService 
								handleClick={this.handleClick}
								values={values}
								className='flexbox-item flexbox-item-1'
								servicesDict={this.servicesDict}
							/>
						</div>
						<Button size='large' className='center button' onClick={() => this.selectServiceValidation() ? this.nextStep() : alert('Please Select an Option')}>
							Next
						</Button>
						
					</div>
				);
			case 2:
				return (
					<div>
						<Navbar appointment />
						<div className='navbar-margin'></div>
						<div className='flexbox-container contact-info'>
							<div className='leftSide'>
								<h3>Contact Information</h3>
								<ContactInfo 
									handleChange={this.handleChange}
									values={values}
									handlePhoneNumChange={this.handlePhoneNumChange}
								/>
								{/* https://stackoverflow.com/questions/49491569/disable-specific-days-in-material-ui-calendar-in-react */}

								<br></br><br></br>
								<h3>Choose Date and Time</h3>
								<div className='small'>Please call (206) 417-0482 for an appointment today</div>
								<SelectDateTime onChange={this.handleDateChange} value={this.state.date} disableDates={this.disableDates}/>
								<br></br>
								{this.state.date !== null &&
									<ButtonGroup>
										{
											(this.state.availableTimes !== undefined && this.state.availableTimes.length > 0) ?
												(
													this.state.availableTimes.map((time) => {
														return <Button key={time} size='small' onClick={() => this.handleClick('time', time)} 
															color={this.state.time === time ? 'secondary' : 'default'}>{time}</Button>
													})
												) :
												(
													<div>No available times for this date</div>
												)
										}
									</ButtonGroup>
								}
							<br></br><br></br><br></br>
							</div>
							<div className='rightSide'>
								<h3>Appointment Information</h3>
								<br></br>
								<ReviewReserve 
									servicesDict={this.servicesDict}
									values={values}
								/>
								<br></br>
								{/* TODO: incorporate validation handling */}
								{/* TODO: figure out if this should be Link or anchor tag */}
								{/* <a href={URL} > */}
									<Button style={{backgroundColor: "#b90d1f", color: 'white'}}
										onClick={(e) => this.checkErrors() ? this.handleSubmit(e) : (this.handleValidation('date', date), console.log('Invalid inputs: ' + JSON.stringify(this.state.errors)))}
										>
										Reserve
									</Button>
								{/* </a> */}
							</div>
						</div>
						<br></br>
						<Button size='large' className='center button' onClick={this.prevStep }>
							Back
						</Button>
					</div>
				);
			case 3:
				return (
					<div>
						<Success 
							values={values}
							prevStep={this.prevStep}
							servicesDict={this.servicesDict}
						/>
					</div>
				);
			default:
		}
	}
}