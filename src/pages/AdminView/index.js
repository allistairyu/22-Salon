import React, { useState } from 'react'
import Navbar from '../App/Components/Navbar'
import UserContainer from '../App/Components/UserContainer'

export default function index() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const submitLogin = () => {
        fetch('/api/login', {
            method: 'POST',
            body: {username, password}
        })
        localStorage.setItem('token', 'asdf')
    }

    return (
        <div>
            <Navbar />
            <div className='navbar-margin'></div>
            <form>
                <label>
                    username: 
                    <input type='text' onChange={e => setUsername(e.target.value)} />
                </label>
                <br></br><br></br>
                <label>
                    password: 
                    <input type='text' onChange={e => setPassword(e.target.value)} />
                </label>
                <br></br><br></br><br></br>
                <button type='submit' onClick={submitLogin}>
                    submit
                </button>
            </form>
            {/* <UserContainer /> */}
        </div>
    )
}
