import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { context } from '../../App';

function Dates() {
  const [user,setUser] = useContext(context)
  const [selectedDate, setSelectedDate] = useState({
    checkIn:new Date(),
    checkOut:new Date()
  });

  const handleCheckIn = (date) => {
    const setCheckIn = {...selectedDate};
    setCheckIn.checkIn = date;
    setSelectedDate(setCheckIn);
  };
  const handleCheckOut = (date) => {
    const setCheckOut = {...selectedDate};
    setCheckOut.checkOut = date;
    setSelectedDate(setCheckOut);
  };

  const handlePost = () => {
    const items = {name:user.displayName,email:user.email,checkIn:selectedDate.checkIn,checkOut:selectedDate.checkOut};
    fetch('http://localhost:3500/add',{
      method:'POST',
      body:JSON.stringify(items),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  }
  return (
    <div className="happy-booking">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check in date"
          value={selectedDate.checkIn}
          onChange={handleCheckIn}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check out date"
          value={selectedDate.checkOut}
          onChange={handleCheckOut}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    <Button onClick={handlePost} style={{margin:'auto',display:'block'}} variant="contained" color="primary">
      Book now
    </Button>
    </div>
  );
}

export default Dates;
