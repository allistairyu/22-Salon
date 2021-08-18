import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import TextField from '@material-ui/core/TextField'
// import ContactForm from './ContactForm'

export default function ContactInfo({ handlePhoneNumChange, handleChange, values}) {

    return (
        <form autoComplete='off'>
            <label>
                <TextField label="First Name" name='firstName' onChange={handleChange} error={values.errors.firstName} defaultValue={values.firstName} />
            </label>
            <label>
                <TextField label="Last Name" name='lastName' onChange={handleChange} error={values.errors.lastName} defaultValue={values.lastName} />
            </label>
            <br />
            <label>
                <MuiPhoneNumber defaultCountry='us' disableAreaCodes onChange={handlePhoneNumChange} error={values.errors.phoneNumber} defaultValue={values.phoneNumber} />
            </label>
            <label>
                <TextField label="Email" name='email' onChange={handleChange} error={values.errors.email} defaultValue={values.email} />
            </label>
        </form>
    );
}