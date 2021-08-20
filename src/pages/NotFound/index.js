import React, {Component} from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'

export default class NotFound extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className="page-intro"></div>
				<h1>Error 404: Page Not Found</h1>
			</div>
		);
	}
}
