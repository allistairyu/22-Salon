import React, { Component } from 'react'
// import ContactForm from './ContactForm'

export default class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert(`first name is ${this.state.firstName} last name is ${this.state.lastName} phone number is ${this.state.phoneNumber}
            email address is ${this.state.email}`);
        // TODO: 
        let databody = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'number': this.state.phoneNumber,
            'email': this.state.email
        }
        return fetch('http://localhost:8999/api/users', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(data => console.log(data))
        // TODO: 
        // event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    First Name:
                    <input
                        name="firstName"
                        type="string"
                        value={this.state.firstName}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Last Name: 
                    <input
                    name="lastName"
                    type="string"
                    value={this.state.lastName}
                    onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Phone Number: 
                    <input
                    name="phoneNumber"
                    type="string"
                    value={this.state.phoneNumber}
                    onChange={this.handleInputChange} />
                </label>
                <label>
                    Email Address: 
                    <input
                    name="email"
                    type="string"
                    value={this.state.email}
                    onChange={this.handleInputChange} />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}