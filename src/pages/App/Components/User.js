import React, {Component} from 'react';
import '../style.css'

export default class User extends Component {
	render() {
		return (
			<div className="user">
				<p className="name">First Name: {this.props.firstName}<br></br>Last Name: {this.props.lastName}
					<br></br>Date: {this.props.date}<br></br>Time: {this.props.time}<br></br>
					Phone Number: {this.props.phoneNumber}<br></br>Email: {this.props.email}<br></br>Services: {this.props.services}</p>
			</div>
		);
	}
}
