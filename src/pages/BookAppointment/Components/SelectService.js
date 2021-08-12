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
                    Men's Haircut
                </button>
                <button name='womensHaircut' id={values.services.womensHaircut} onClick={handleClick} className='service'>
                    Women's Haircut
                </button>
                <button name='seniorKids' id={values.services.seniorKids} onClick={handleClick} className='service'>
                    Senior & Kids 11 and Under
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