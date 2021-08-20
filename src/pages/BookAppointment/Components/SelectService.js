import React from 'react'
import '../style.css'
// import keyIndex from 'react-key-index'

const SelectService = ({ servicesDict, values, handleClick }) => {
    
    //TODO: CONVERT TO MATERIAL UI BUTTONS
    //TODO: make max num of services 3

    return (
        <div>
            <div className='Center'>
                <form>
                    <div className='flexbox-container-2'>
                        {/* TODO: FIX KEY ID THING */}
                        {Object.keys(values.services).map((service) => (
                            <div className='service' key={service.id} name={service} onClick={(e) => handleClick(e)} id={values.services[service]}>
                                <button className='service button'>
                                    {servicesDict[service][0]}
                                    <br>
                                    </br>
                                    {"$" + servicesDict[service][1]}
                                </button>
                            </div>
                        ))}
                    </div>
                </ form>
            </div>
        </div>
    )
}

export default SelectService