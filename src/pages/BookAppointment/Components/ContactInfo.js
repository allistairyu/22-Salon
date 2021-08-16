import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
// import ContactForm from './ContactForm'

export default function ContactInfo({ handlePhoneNumChange, handleChange, values}) {

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
                <MuiPhoneNumber defaultCountry={'us'} onChange={handlePhoneNumChange}/>
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
        </form>
    );
}