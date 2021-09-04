import React, { useState } from 'react'
import Navbar from '../App/Components/Navbar'
import UserContainer from '../App/Components/UserContainer'
import bcrypt from 'bcryptjs'

export default function index() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [registerUsername, setRegisterUsername] = useState()
    const [registerPassword, setRegisterPassword] = useState()
    const SALT_WORK_FACTOR = 10;

    const submitLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({username: username, password: password}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.status === 204) {
                alert('bad credentials')
                return
            }
			const json = await response.json()
            localStorage.setItem('token', json.token)
            localStorage.setItem('username', json.username)
        } catch (e) {
            console.log(e)
        }
    }
    const submitRegister = async () => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({username: registerUsername, password: registerPassword}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!response.ok) {
				throw Error(response.statusText);
			}
			const json = await response.json()
            localStorage.setItem('token', json.token)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='navbar-margin'></div>
            Log In
            <form onSubmit={submitLogin}>
                <label>
                    username: 
                    <input type='text' onChange={e => setUsername(e.target.value)} />
                </label>
                <br></br><br></br>
                <label>
                    password: 
                    <input type='password' onChange={e => setPassword(e.target.value)} />
                </label>
                <br></br><br></br>
                <input type="submit" value="Submit" />
            </form>
            <br></br>
            Register
            <form onSubmit={submitRegister}>
                <label>
                    username: 
                    <input type='text' onChange={e => setRegisterUsername(e.target.value)} />
                </label>
                <br></br><br></br>
                <label>
                    password: 
                    <input type='password' onChange={e => setRegisterPassword(e.target.value)} />
                </label>
                <br></br><br></br>
                <input type="submit" value="Submit" />
            </form>
            {/* <UserContainer /> */}
        </div>
    )
}
