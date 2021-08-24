import React from 'react'
import MuiPhoneNumber from 'material-ui-phone-number';
import TextField from '@material-ui/core/TextField'
import '../style.css'
// import ContactForm from './ContactForm'

//TODO: make spacing/padding even between input fields

export default function ContactInfo({ handlePhoneNumChange, handleChange, values}) {

    return (
        <form autoComplete='off' >
            <TextField label="First Name" name='firstName' onChange={handleChange} error={values.errors.firstName} defaultValue={values.firstName} />
            <TextField label="Last Name" name='lastName' onChange={handleChange} error={values.errors.lastName} defaultValue={values.lastName} />
            <br></br><br></br>
            <MuiPhoneNumber className='phoneNum' defaultCountry='us' disableAreaCodes onChange={handlePhoneNumChange} error={values.errors.phoneNumber} value={values.phoneNumber} />
            <br></br><br></br>
            <TextField label="Email" name='email' onChange={handleChange} error={values.errors.email} defaultValue={values.email} />
        </form>
    );
}