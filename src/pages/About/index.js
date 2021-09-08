import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar';

//TODO: picture of Kelli, about section


export default class About extends Component {
	render() {
		return (
			<div>
				<Navbar about />
				<h1 className='navbar-margin'>this is an app by me~</h1>
			</div>
		);
	}
}
