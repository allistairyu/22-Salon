import React from 'react'
import '../style.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Navbar from '../../App/Components/Navbar'

//TODO: make delete button be its own component?
export default function Success({values, prevStep, servicesDict}) {

    const deleteByID = id => {
		return async function() {
			await fetch(`http://localhost:8999/api/users/${id}`, { method: 'DELETE' }).then(window.location.reload())
		}
	}

    const update = () => {
        prevStep()
        prevStep()
    }

    const plural = () => {
        return values.services.length > 1 ? 'Services:' : 'Service:'
    }

    return (
        <div>
            <Navbar />
            <h1>success</h1>
            <div className='flexbox-container appointment-details leftSide'>
                <h3>Appointment Details</h3>
                <br></br><br></br>
                {plural()}
                <br></br>
                {values.services.map((service) => {
                    return (
                        <div>
                            {servicesDict[service][0]}
                            <br></br>
                        </div>
                    )
                })}
                <br></br>
                <br></br>
                Time: <br></br>
                {values.date + ' at ' + values.time}

                <br></br>
                <br></br>
                Shop: <br></br>
                10535 Greenwood Ave N <br></br>
                Seattle, WA 98133

                <Button className='edit-cancel' size='large' onClick={update}>Edit Appointment</Button>
                <Button className='edit-cancel' size='large' onClick={() => deleteByID(values.id)}>Cancel Appointment</Button>
                <Dialog >
                    yo cancel
                </Dialog>

            </div>
            {/* right side */}
            <div className='flexbox-container center'>
                {/* TODO: google map embed */}
                <br></br>
            </div>
        </div>
    )
}
