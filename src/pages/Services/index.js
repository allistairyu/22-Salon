import React, { Component } from 'react';
import './style.css'
import Navbar from '../App/Components/Navbar'
import Button from '@material-ui/core/Button'

export default class Services extends Component {
	constructor (props) {
		super(props)
		this.state = {
			category: 'hair', 
		}
	}

	servicesDict = {
		'mensHaircut': ["Men's Haircut", 15],
		'womensHaircut': ["Women's Haircut", 18],
		'seniorKids': ["Seniors & Kids 11 and Under", 10],
		'beardTrim': ["Beard Trim", 5],
		'permAndColor': ["Perm & Color Start", 60],
		'styleStart': ["Style Starting", 25],
		'shampoo': ["Shampoo Only", 5],
		'pedicure': ["Pedicure", 28],
		'manicure': ["Manicure", 15],
		'pediMani': ["Pedi Mani", 40],
		'fullSet': ["Full Set", 28],
		'fill': ["Fill", 18],
		'eyebrow': ["Eyebrow Wax", 10],
		'lips': ["Lips", 5],
		'chin': ["Chin", 8]
	}

	renderSwitch = (param) => {
		switch(param) {
			case 'hair':
				return (
					<div>
						<p>Men's Haircut</p><br></br>
						<p>Women's Haircut</p><br></br>
						<p>Seniors & Kids 11 and Under</p><br></br>
						<p>Perm & Color Start</p><br></br>
						<p>Style Starting</p><br></br>
						<p>Shampoo Only</p>
					</div>
				);
			case 'face':
				return (
					<div>
						<p>Beard Trim</p><br></br>
						<p>Eyebrow Wax</p><br></br>
						<p>Lips</p><br></br>
						<p>Chin</p>
					</div>
				);
			case 'other':
				return (
					<div>
						<p>Pedicure</p><br></br>
						<p>Manicure</p><br></br>
						<p>Mani-Pedi</p><br></br>
						<p>Full Set</p><br></br>
						<p>Fill</p>
					</div>
				);
			default:
				return 'hair';
		}
	}

	handleClick = (value) => {
		this.setState({
			category: value
		})
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className="page-intro"></div>
				<h1 className='page-title'>Services</h1>
				<div className='flexbox-container-3'>
					{/* TODO: MAKE SERVICES GLOBAL VARIABLE TO USE MAP HERE */}
					<div className='flexbox-column'>
						<Button size='large' className='services-button' color={this.state.category === 'hair' ? 'secondary' : 'default'}
							onClick={() => this.handleClick('hair')}>Hair</Button>
						<Button size='large' className='services-button' color={this.state.category === 'face' ? 'secondary' : 'default'}
							onClick={() => this.handleClick('face')}>Face</Button>
						<Button size='large' className='services-button' color={this.state.category === 'other' ? 'secondary' : 'default'}
							onClick={() => this.handleClick('other')}>Other</Button>
					</div>
					<hr></hr>
					<div className='in-between'></div>
					<div className='services'>
						{this.renderSwitch(this.state.category)}
					</div>
				</div>
			</div>
		);
	}
}
