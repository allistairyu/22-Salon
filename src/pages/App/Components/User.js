import React, {Component} from 'react';
import '../style.css'

export default class User extends Component {
	render() {
		return (
			<div className="user">
				<p className="name">{this.props.firstName}, {this.props.lastName}, {this.props.date}, {this.props.time}, 
					{this.props.number}, {this.props.email}</p>
			</div>
		);
	}
}
