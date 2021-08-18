import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'

export default class Services extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className="page-intro"></div>
				<h3>Services</h3>
			</div>
		);
	}
}
