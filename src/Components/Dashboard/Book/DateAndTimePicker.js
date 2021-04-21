import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const DateAndTimePicker = ({handleEventDate, handleEventTime, selectedDate}) => {
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container
                direction="column"
                justify="center"
                alignItems="flex-start" >
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Select Event Date"
                    format="MM/dd/yyyy"
                    value={selectedDate.date}
                    onChange={handleEventDate}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Select Event time"
                    value={selectedDate.time}
                    onChange={handleEventTime}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
export default DateAndTimePicker;