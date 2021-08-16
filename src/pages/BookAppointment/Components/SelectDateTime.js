import DatePicker from 'react-date-picker'
import React from 'react'

export default class SelectDateTime extends React.Component {

    // const [value, onChange] = useState(new Date());

    render() {
        return (
            <div>
                <DatePicker selected={this.props.dateValue} onChange={date => this.props.handleDateChange(date)} />
            </div>
        )
    }
}