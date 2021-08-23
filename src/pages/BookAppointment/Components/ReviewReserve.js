import React from 'react'
import '../style.css'

//TODO: add keyIndex
const ReviewReserve = ({ servicesDict, Back, values, handleSubmit }) => {
    let total = 0

    let services = values.services

    return (
        <div className='appointment-info'>
            {values.services.map((service) => {
                total += servicesDict[service][1]
                return (
                    <div>
                        <span className='left'>{servicesDict[service][0]}</span>
                        <span className='right'>{servicesDict[service][1]}</span>
                        <br></br>
                    </div>
                )
            })}

            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <span className='left'>Total</span>
            <span className='right'>${total}.00</span>
        </div>
    )
}

export default ReviewReserve