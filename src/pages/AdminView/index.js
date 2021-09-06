import React, { useState } from 'react'
import Navbar from '../App/Components/Navbar'
import UserContainer from '../App/Components/UserContainer'
import Calendar from 'react-awesome-calendar';


//TODO: event calendar, delete appointment confirmation dialog, change hours,
//manually add appointments
export default function index() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const events = [{
        id: 1,
        color: '#fd3153',
        from: '2021-09-08T18:00:00+00:00',
        to: '2021-09-08T18:30:00+00:00',
        title: 'This is an event'
    }]

    const [loginRegister, toggleLoginRegister] = useState(true)
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
                body: JSON.stringify({username: username, password: password}),
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

    const switchLoginRegister = (e) => {
        e.preventDefault()
        toggleLoginRegister(loginRegister => !loginRegister)
    }

    return (
        <div>
            <Navbar />
            <div className='navbar-margin'></div>
            {loginRegister ? 'Log In' : 'Register' }
            <form onSubmit={loginRegister ? submitLogin : submitRegister}>
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
                <br></br>
                <button onClick={e => switchLoginRegister(e)}>{loginRegister ? 'Register Instead' : 'Log In Instead'}</button>

            </form>
            <UserContainer />
            <Calendar events={events} />
        </div>
    )
}
