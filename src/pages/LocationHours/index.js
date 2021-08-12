import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'

export default class LocationHours extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className="page-intro"></div>
				<h1>Location and Hours</h1>
			</div>
		);
	}
}
