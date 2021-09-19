import React, { useState, useEffect } from 'react'
import Navbar from '../App/Components/Navbar'
import UserContainer from '../App/Components/UserContainer'
import Calendar from 'react-awesome-calendar';
import submitLogin from './Login'
import submitRegister from './Register'
var moment = require('moment-timezone');

//TODO: event calendar, delete appointment confirmation dialog, change hours,
//manually add appointments
export default function index() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [events, setEvents] = useState([])
    const [loginRegister, toggleLoginRegister] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    
    useEffect(() => {
        async function verifyToken() {
            let response = await fetch('/api/appointments')
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json()

            for (const [index, appointment] of json.entries()) {
                let dateTime = convertToISO(appointment.date, appointment.time)
                setEvents(events => [...events, {id: index, color: 'red', from: dateTime, to: dateTime, title: appointment.firstName}])
            }
            renderAppointments()
        }
        verifyToken()
    }, [])

    //TODO: make not sketchy, convert to local time?
    const convertToISO = (date, time) => {
        let ISOdate = new Date(date).toISOString()
        if (time.substring(time.length-2, time.length) === 'pm' && time.substring(0, 2) !== '12') {
            const colonIndex = time.indexOf(':')
            let hour = parseInt(time[0],10) + 12
            time = hour.toString() + ':' + time.substring(colonIndex + 1, colonIndex + 3)
        } else {
            time = time.substring(0,5)
        }
        ISOdate = ISOdate.substring(0, 11) + time + ':00.000z'
        return ISOdate
        // return moment.tz(ISOdate, "America/Los_Angeles").format()
    }

    const switchLoginRegister = (e) => {
        e.preventDefault()
        toggleLoginRegister(loginRegister => !loginRegister)
    }

    const renderAppointments = async () => {
        const token = localStorage.getItem('token')
        if (token && localStorage.getItem('username')) {
            try {
                let response = await fetch('/api/admin', {
                    headers: {username: localStorage.getItem('username'), token}
                })
                response = await response.json()
            } catch (e) {
                alert('invalid')
            }
            setLoggedIn(true)
        }
    }

    const logOut = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
            <div>
                <Navbar />
                <div className='navbar-margin'></div>
                {loggedIn ? 
                    <div>
                        <button onClick={logOut}>Log Out</button>
                        <Calendar events={events} />
                        <UserContainer />
                    </div> :
                    <div>
                        {loginRegister ? 'Log In' : 'Register'}
                        <form onSubmit={() => loginRegister ? submitLogin({username, password}, setLoggedIn) : submitRegister({username, password})}>
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
                    </div>
                }
            </div>
    )
}
