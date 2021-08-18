import React from 'react'

const ReviewReserve = ({ servicesDict, Back, values, handleSubmit }) => {

    return (
        <div>
            <div>
                {Object.keys(values.services).map(function(service) {
                    if (values.services[service] === 'selected') return <p>{servicesDict[service]}</p>
                })}
            </div>
            {/* <form onSubmit={handleSubmit}>
                <input type='submit' value="Submit" />
            </form> */}
        </div>
    )
}

export default ReviewReserve