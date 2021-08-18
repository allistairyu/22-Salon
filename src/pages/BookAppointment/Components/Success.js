import React from 'react'
import '../style.css'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

//TODO: make delete button be its own component?
export default function Success({values, prevStep}) {

    const handleClick = id => {
		return async function() {
			await fetch(`http://localhost:8999/api/users/${id}`, { method: 'DELETE' }).then(window.location.reload())
		}
	}

    const update = () => {
        prevStep()
        prevStep()
    }

    return (
        <div>
            <div>
                <span className='left'>
                    <Button onClick={update}>Edit Appointment</Button>
                </span>
                <span className='right'>
                    <Button onClick={handleClick(values.id)}>Cancel Appointment</Button>
                    <Dialog >
                        yo cancel
                    </Dialog>
                </span>
                <br></br>
            </div>
        </div>
    )
}
