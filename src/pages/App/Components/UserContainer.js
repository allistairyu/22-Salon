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

	//https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js
	handleClick(id) {
		return async function() {
			await fetch(`http://localhost:8999/api/users/${id}`, { method: 'DELETE' }).then(window.location.reload())
		}
	}

	render() {
		return (
			<div>
				{this.state.users.map((user) => (
					<div key={user._id}>
						<User firstName={user.firstName} lastName={user.lastName} date={user.date} time={user.time} 
							email={user.email} phoneNumber={user.phoneNumber} services={user.services} />

						<button onClick={this.handleClick(user._id)}>
							delete
						</button>
					</div>
				))}
				
			</div>
		);
	}
}
