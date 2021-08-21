import React, { Component } from 'react'
import Navbar from '../App/Components/Navbar'
import UserContainer from '../App/Components/UserContainer'

export default class index extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className='page-intro'></div>
                <UserContainer />
            </div>
        )
    }
}
