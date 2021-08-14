import React from 'react'

const ReviewReserve = ({ Back, values, handleSubmit }) => {
    
    return (
        <div>
            <div>
                {values.firstName}
                <br></br>
                {values.lastName}
                <br></br>
                {values.phoneNumber}
                <br></br>
                {values.email}
                <br></br>
            </div>
            <button onClick={Back}>
                go back
            </button>
            <form onSubmit={handleSubmit}>
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}

export default ReviewReserve