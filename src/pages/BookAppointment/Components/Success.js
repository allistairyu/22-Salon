import React, { useState, useEffect } from 'react'
import '../style.css'
import Button from '@material-ui/core/Button';
import Navbar from '../../App/Components/Navbar'
import CancelDialog from './CancelDialog'
import Map from '../../LocationHours/Map'
import BookAppointment from '../index.js'
import { hashHistory } from 'react-router';


const servicesDict = {
    'mensHaircut': ["Men's Haircut", 15],
    'womensHaircut': ["Women's Haircut", 20],
    'seniorKids': ["Seniors & Kids 11 and Under", 12],
    'beardTrim': ["Beard Trim", 5],
    'permAndColor': ["Perm & Color Start", 60],
    'styleStart': ["Style Starting", 25]
}

//TODO: make delete button be its own component?
export default class Success extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            cancelDialog: false,
            appointmentDetails: {},
            firstName: '',
            lastName: '',
            services: [],
            date: '',
            time: '',
            cancelDialog: false
        }
    }

    //TODO: route to different page instead of reload?
    deleteByID = async id => {
		await fetch(`/api/appointments/${id}`, { method: 'DELETE' })
	}

    handleClickOpen = () => {
        this.setState({cancelDialog: true})
    };

    handleClose = (yesNo) => {
        this.setState({cancelDialog: false})
        if (yesNo) this.deleteByID(this.state.id)
        hashHistory.push('/')
    };

    editAppointment = () => {
        hashHistory.push({
            pathname: '/appointment/',
            state: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                services: this.state.services,
                date: this.state.date,
                time: this.state.time,
                id: this.state.id,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email
            }})
    }

    async componentDidMount() {
        console.log(this.props.params.id)
        const response = await fetch(`api/appointments/${this.props.params.id}`, {
            headers: {"content-type": "application/json"}
        })
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json()
        this.setState({ appointmentDetails: json[0] })
        const s = this.state.appointmentDetails.services[0]
        // TODO: find better way of doing this
        let servicesArray = []
        if(s.includes('","')) {
            servicesArray = s.split('","')
            servicesArray[0] = servicesArray[0].slice(2)
            servicesArray[1] = servicesArray[1].slice(0, -2)
        } else {
            servicesArray.push(s.slice(2, -2))
        }
        this.setState({
            firstName: this.state.appointmentDetails.firstName,
            lastName: this.state.appointmentDetails.lastName,
            services: servicesArray,
            date: this.state.appointmentDetails.date,
            time: this.state.appointmentDetails.time,
            id: this.state.appointmentDetails._id,
            email: this.state.appointmentDetails.email,
            phoneNumber: this.state.appointmentDetails.phoneNumber
        })
	}

    render() {
        return (
            <div>
                <Navbar appointment />
                <h1 className='page-title navbar-margin'>Success</h1>
                <div className="flexbox-container-5">
                    <div className='leftSide success'>
                        <h3>Appointment Details</h3>
                        <br></br><br></br>
                        {this.state.services.length > 1 ? 'Services:' : 'Service:'}
                        <br></br>
                        {this.state.services.map((service) => {
                            return (
                                <div key={service}>
                                    {servicesDict[service][0]}
                                    <br></br>
                                </div>
                            )
                        })}
                        <br></br>
                        Time: <br></br>
                        {this.state.date + ' at ' + this.state.time}

                        <br></br>
                        <br></br>
                        Shop: <br></br>
                        10535 Greenwood Ave N <br></br>
                        Seattle, WA 98133
                        {/* <Link to={'/appointment/' + values.id}>click this to go to id</Link> */}
                        {/* TODO: EDIT BUTTON */}
                        <Button className='edit-cancel' size='large' onClick={this.editAppointment} >Edit Appointment</Button>
                        <Button className='edit-cancel' size='large' onClick={this.handleClickOpen}>Cancel Appointment</Button>
                        <CancelDialog cancelDialog={this.state.cancelDialog} handleClose={this.handleClose} />
                        
                    </div>
                    {/* right side */}
                    <div className='rightSide'>
                        <Map />
                        <br></br>
                    </div>
                </div>
            </div>
        )
    }
}
