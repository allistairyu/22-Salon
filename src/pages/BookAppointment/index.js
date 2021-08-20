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

const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

//TODO: IMPLEMENT COMPONENT LIFECYCLE STUFF???
//TODO: ADD ROUTER BLOCKING https://stackoverflow.com/questions/32841757/detecting-user-leaving-page-with-react-router
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
			services: { mensHaircut: 'unselected', womensHaircut: 'unselected', seniorKids: 'unselected', beardTrim: 'unselected',
						permAndColor: 'unselected', styleStart: 'unselected', shampoo: 'unselected', pedicure: 'unselected',
						manicure: 'unselected', pediMani: 'unselected', fullSet: 'unselected', fill: 'unselected', eyebrow: 'unselected',
						lips: 'unselected', chin: 'unselected' },
			errors: { firstName: '', lastName: '', phoneNumber: '', email: '' },
			id: ''
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
			'mensHaircut': ["Men's Haircut", 15],
			'womensHaircut': ["Women's Haircut", 18],
			'seniorKids': ["Seniors & Kids 11 and Under", 10],
			'beardTrim': ["Beard Trim", 5],
			'permAndColor': ["Perm & Color Start", 60],
			'styleStart': ["Style Starting", 25],
			'shampoo': ["Shampoo Only", 5],
			'pedicure': ["Pedicure", 28],
			'manicure': ["Manicure", 15],
			'pediMani': ["Pedi Mani", 40],
			'fullSet': ["Full Set", 28],
			'fill': ["Fill", 18],
			'eyebrow': ["Eyebrow Wax", 10],
			'lips': ["Lips", 5],
			'chin': ["Chin", 8]
		}
		
	}
	
	 componentDidMount = async () => {
		console.log('generate')
		await this.setState({
			id: ObjectId()
		}) 
		
	}

	prevStep() {
		this.setState((prevState) => ({ step: prevState.step - 1 }))
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

	checkReserved = async (date) => {
        const response = await fetch(`api/users/${this.state.date}`)
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const reservedDates = await response.json()
		console.log(JSON.stringify(reservedDates))
    }

	handleDateChange = async date => {
		date = String(date)
		date = date.slice(0, 15)

		await this.setState({
			date: date
		})
		this.checkReserved()
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
		
		let now = new Date();
		let databody = {
			'firstName': this.state.firstName,
			'lastName': this.state.lastName,
			'date': this.state.date,
			'time': this.state.time,
			'phoneNumber': this.state.phoneNumber,
			'email': this.state.email,
			'services': this.state.services,
			'timestamp': now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
			'_id': this.state.id
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
		const { firstName, lastName, date, time, email, phoneNumber, services, errors, id } = this.state;
		const values = { firstName, lastName, date, time, email, phoneNumber, services, errors, id }

		switch(step) {
			case 1:
				return (
					<div>
						<Navbar />
						<div className="page-intro"></div>
						<h1 className='page-title'>Book an Appointment</h1>
						<div className='flexbox-container'>
							<SelectService 
								handleClick={this.handleClick}
								values={values}
								className='flexbox-item flexbox-item-1'
								servicesDict={this.servicesDict}
							/>
						</div>
						{/* TODO: MOVE NEXT BUTTON TO BOTTOM... POSSIBLY FLEX-DIRECTION: COLUMN */}
						{/* TODO: WHY IS BUTTON SO LONG */}
						<Button size='large' className='center button' onClick={() => this.selectServiceValidation() ? this.nextStep() : alert('Please Select an Option')}>
							Next
						</Button>
						
					</div>
				);
			case 2:
				return (
					<div>
						<Navbar />
						<div className="page-intro"></div>
						<div className='flexbox-container contact-info'>
							<div className='leftSide'>
								<h3>Contact Information</h3>
								<ContactInfo 
									handleChange={this.handleChange}
									values={values}
									handlePhoneNumChange={this.handlePhoneNumChange}
								/>
								{/* TODO: MOVE TO PREVIOUS FORM? */}
								{/* TODO: make it so today can't be selected? */}
								{/* https://stackoverflow.com/questions/49491569/disable-specific-days-in-material-ui-calendar-in-react */}
								
								<br></br>
								<br></br>
								<h3>Choose Date and Time</h3>
								<SelectDateTime onChange={this.handleDateChange} value={this.state.date} disableDates={this.disableDates}/>
								

							</div>
							<div className='rightSide'>
								<h3>Appointment Information</h3>
								<br></br>
								<ReviewReserve 
									servicesDict={this.servicesDict}
									values={values}
								/>
								<br></br>
								<Button style={{backgroundColor: "#b90d1f", color: 'white'}}
									onClick={(e) => this.checkErrors() ? this.handleSubmit(e) : (this.handleValidation('date', date), alert('Invalid inputs: ', JSON.stringify(this.state.errors)))}>
									Reserve
								</Button>
							</div>
						</div>
						<br></br>
						<Button size='large' className='center button' onClick={this.prevStep }>
							Back
						</Button>
						{/* <Button onClick={() => alert(this.checkErrors())}> */}
						
					</div>
				);
			case 3:
				return (
					<div>
						<Navbar />
						<div className="page-intro"></div>
						<h1>success</h1>
						<Success 
							values={values}
							prevStep={this.prevStep}
						/>
					</div>
				);
			default:
			
		}
	}
}
