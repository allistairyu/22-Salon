import React, {Component} from 'react';
import '../style.css'
import User from './User'

export default class UserContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {appointments: []};
	}

	async componentDidMount() {
		try {
			const response = await fetch("api/appointments/")
			if (!response.ok) {
				throw Error(response.statusText);
			}
			const json = await response.json()
			this.setState({ appointments: json })
		} catch(error) {
			console.log(error)
		}
	}

	//https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js
	handleClick(id) {
		return async function() {
			await fetch(`/api/appointments/${id}`, { method: 'DELETE' }).then(window.location.reload())
		}
	}

	render() {
		return (
			<div>
				{this.state.appointments.map((appointment) => (
					<div key={appointment._id}>
						<User firstName={appointment.firstName} lastName={appointment.lastName} date={appointment.date} time={appointment.time} 
							email={appointment.email} phoneNumber={appointment.phoneNumber} services={appointment.services} />

						<button onClick={this.handleClick(appointment._id)}>
							delete
						</button>
					</div>
				))}
				
			</div>
		);
	}
}
