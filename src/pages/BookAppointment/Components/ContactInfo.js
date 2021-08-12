import React from 'react'
// import ContactForm from './ContactForm'

export default function ContactInfoTest({prevStep, nextStep, handleChange, values}) {

    const Continue = e => {
        e.preventDefault();
        nextStep();
    }

    const Back = e => {
        e.preventDefault();
        prevStep();
    }

    return (
        <form>
            <label>
                First Name:
                <input
                    name="firstName"
                    type="string"
                    defaultValue={values.firstName}
                    onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input
                    name="lastName"
                    type="string"
                    defaultValue={values.lastName}
                    onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone Number:
                <input
                    name="phoneNumber"
                    type="string"
                    defaultValue={values.phoneNumber}
                    onChange={handleChange} />
            </label>
            <label>
                Email Address:
                <input
                    name="email"
                    type="string"
                    defaultValue={values.email}
                    onChange={handleChange} />
            </label>
            <br />
            <button 
                onClick={ Back }
                type="submit"
            >
                
                Back
            </button>
            <button 
                onClick={ Continue }
                type="submit"
            >
                Next
            </button>
        </form>
    );
}