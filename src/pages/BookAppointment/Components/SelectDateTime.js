import React from 'react'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const availableTimes = [
    '11:00 am',
    '11:30 am',
    '12:00 pm',
    '12:30 pm',
    '1:00 pm',
    '1:30 pm',
    '2:00 pm',
    '2:30 pm',
    '3:00 pm',
    '3:30 pm',
    '4:00 pm',
    '4:30 pm',
    '5:00 pm',
    '5:30 pm',
]

export default function SelectDateTime({onChange, value, disableDates}) {

    // const [value, onChange] = useState(new Date());

    // TODO: IMPLEMENT FILTER
    // availableTimes.filter()

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={value}
                    onChange={onChange}
                    label='Select a Date'
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    shouldDisableDate={disableDates}
                    autoOk={true}
                    // error={this.state.errors[date]===''} // TODO: WHY ISN'T THIS WORKING
                />
            </MuiPickersUtilsProvider>
            <br></br>
            <br></br>
            <br></br>

            <ButtonGroup>
                {
                    (availableTimes !== undefined && availableTimes.length > 0) ?
                        (
                            availableTimes.map((time) => {
                                return <Button>{time}</Button>
                            })
                        ) :
                        (
                            <div>No available times for this date</div>
                        )
                }
            </ButtonGroup>
        </div>
    )
}