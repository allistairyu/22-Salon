import React from 'react'
import '../style.css'

const SelectServiceTest = ({ nextStep, values, handleClick }) => {
    const Continue = e => {
        e.preventDefault();
        nextStep();
    }
    return (
        <form>
            <div>
                <button name='mensHaircut' id={values.services.mensHaircut} onClick={handleClick} className='service'>
                    Men's Haircut<br></br>
                    $15
                </button>
                <button name='womensHaircut' id={values.services.womensHaircut} onClick={handleClick} className='service'>
                    Women's Haircut<br></br>
                    $18
                </button>
                <button name='seniorKids' id={values.services.seniorKids} onClick={handleClick} className='service'>
                    Senior & Kids 11 and Under<br></br>
                    $10
                </button>
            </div>
            <button 
                onClick={ Continue }
                type="submit"
            >
                Next
            </button>
        </ form>
    )
}

export default SelectServiceTest