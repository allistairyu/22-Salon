import React, { useState, useEffect } from 'react'
import Navbar from '../App/Components/Navbar'
import UserContainer from '../App/Components/UserContainer'
import Calendar from 'react-awesome-calendar';
var moment = require('moment-timezone');

//TODO: event calendar, delete appointment confirmation dialog, change hours,
//manually add appointments
export default function index() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [events, setEvents] = useState([])

    // [{
    //     id: 1,
    //     color: '#fd3153',
    //     from: '2021-09-08T18:00:00+00:00',
    //     to: '2021-09-08T18:30:00+00:00',
    //     title: 'This is an event'
    // }]

    const [loginRegister, toggleLoginRegister] = useState(true)
    
    useEffect(async () => {
        let response = await fetch('/api/appointments')
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json()

        for (const [index, appointment] of json.entries()) {
            let dateTime = convertToISO(appointment.date, appointment.time)
            setEvents(events => [...events, {id: index, color: '#fd3153', from: dateTime, to: dateTime, title: appointment.firstName}])
        }
    }, [])
    //TODO: KEEP?
    // useEffect(() => {
    //     function checkUserData() {
    //         const item = localStorage.getItem('token')
        
    //         if (item) {
    //             return <UserContainer />
    //         }
    //     }
        
    //     window.addEventListener('storage', checkUserData)
        
    //     return () => {
    //         window.removeEventListener('storage', checkUserData)
    //     }
    // }, [])
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

    //TODO: add verifyToken?
    const renderAppointments = () => {
        if (localStorage.getItem('token')) return (
            <div>
                <Calendar events={events} />
                <UserContainer />
            </div>
        )
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
                {renderAppointments()}
                {/* <Calendar events={events} /> */}
            </div>
    )
}
