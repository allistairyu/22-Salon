import React, { Component } from 'react'
import '../style.css'

export default class SelectService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensHaircut: 'unselected',
            womensHaircut: 'unselected',
            seniorKids: 'unselected'
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.id === 'selected' ? 'unselected' : 'selected';
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    
    render() {
        return (
            <form>
                <div>
                    <button name='mensHaircut' id={this.state.mensHaircut} onClick={this.handleClick} className='service'>
                        Men's Haircut
                    </button>
                    <button name='womensHaircut' id={this.state.womensHaircut} onClick={this.handleClick} className='service'>
                        Women's Haircut
                    </button>
                    <button name='seniorKids' id={this.state.seniorKids} onClick={this.handleClick} className='service'>
                        Senior & Kids 11 and Under
                    </button>
                </div>
            </ form>
        )
    }
}
