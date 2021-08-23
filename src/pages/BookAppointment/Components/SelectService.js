import React from 'react'
import '../style.css'

const SelectService = ({ servicesDict, values, handleClick }) => {

    return (
        <div>
            <div className='Center'>
                <form>
                    <div className='flexbox-container-2'>
                        {/* TODO: FIX KEY ID THING */}
                        {Object.keys(servicesDict).map((service) => (
                            <div className='service' onClick={() => handleClick('services', service)}
                                id={values.services.indexOf(service) > -1 ? 'selected' : 'unselected'} >
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