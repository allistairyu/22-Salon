import React from 'react'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

export default function SelectDateTime({onChange, value, disableDates}) {

    // const [value, onChange] = useState(new Date());
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
                    autoOk
                    // error={this.state.errors[date]===''} // TODO: WHY ISN'T THIS WORKING
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}