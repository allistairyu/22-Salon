import React, {Component} from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'

export default class NotFound extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<h1 className='navbar-margin'>Error 404: Page Not Found</h1>
			</div>
		);
	}
}
