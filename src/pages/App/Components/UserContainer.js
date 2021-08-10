import React, {Component} from 'react';
import '../style.css'
import User from './User'

export default class UserContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {users: []};
	}

	async componentDidMount() {
		try {
			const response = await fetch("api/users/")
			if (!response.ok) {
				throw Error(response.statusText);
			}
			const json = await response.json()
			this.setState({ users: json })
		} catch(error) {
			console.log(error)
		}
	}

	render() {
		return (
			<div>
				{this.state.users.map((user) => (
					<User key={user._id} firstName={user.firstName} lastName={user.lastName} date={user.date} time={user.time} 
						email={user.email} number={user.number}/>
				))}
			</div>
		);
	}
}
