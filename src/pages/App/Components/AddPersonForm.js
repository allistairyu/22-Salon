import React, {Component} from 'react';
import '../style.css';

export default class AddPersonForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", description: "" }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(event) {
        let dataBody = {
            name: this.state.name,
            desc: this.state.description
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataBody })
        };
        fetch('https://locahost:8999/api/users', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));


        this.setState({
            name: "",
            description: ""
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name: 
                    <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} required/>
                </label>
                <br></br>
                <label>
                    Description: 
                    <input name="description" type="text" value={this.state.description} onChange={this.handleInputChange}/>
                </label>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}