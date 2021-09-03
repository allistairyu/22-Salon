import React, { useState } from 'react'
import Navbar from '../App/Components/Navbar'
import UserContainer from '../App/Components/UserContainer'

export default function index() {

    const [username, setUsername] = useState()

    const submitLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({username: username}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!response.ok) {
				throw Error(response.statusText);
			}
			const json = await response.json()
            console.log(json.token)
            localStorage.setItem('token', json.token)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='navbar-margin'></div>
            <form onSubmit={submitLogin}>
                <label>
                    username: 
                    <input type='text' onChange={e => setUsername(e.target.value)} />
                </label>
                <br></br><br></br>
                <label>
                    password: 
                    <input type='password'/>
                </label>
                <br></br><br></br><br></br>
                <input type="submit" value="Submit" />
            </form>
            {/* <UserContainer /> */}
        </div>
    )
}
