import React, { useState, useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function FixTimeRequest({ onDateTimeChange }) {
 const [startDate, setStartDate] = useState(dayjs());
 const [endDate, setEndDate] = useState(dayjs());
 const [multipleDays, setMultipleDays] = useState(false);
 const [startTime, setStartTime] = useState('');
 const [dateTime, setDateTime] = useState({
   startDate: dayjs(),
   endDate: dayjs(),
   startTime: '',
 });

 useEffect(() => {
   onDateTimeChange({
     startDate: startDate,
     endDate: endDate,
     startTime: startTime,
   });
 }, [startDate, endDate, startTime]);

 return (
   <Box>
   <Typography className="text-green-900 "variant="h6">Fixed-Time Request
   </Typography>
   <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
   
   <h4 className="text-sm sm:text-base text-gray-600 font-medium  sm:mx-4 mb-2 sm:py-2"> Plan your climbing day down to the last detail. Whether it's a single day or a series of consecutive days for an adventurous trip, create a request for your needs. Your climbing agenda, your way.</h4>
   <Typography variant="body1">Select date:</Typography>
   <DatePicker label="Date" value={startDate} onChange={(newValue) => {
     setStartDate(newValue);
   }} renderInput={(params) => <TextField {...params} />} />
   {multipleDays && (
     <>
       <DatePicker label="End date" value={endDate} onChange={(newValue) => {
         setEndDate(newValue);
       }} renderInput={(params) => <TextField {...params} />} />
     </>
   )}
   {!multipleDays && (
     <>
       <Typography variant="body1">Time:</Typography>
       <TextField type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
     </>
   )}
<Button variant="contained" color="primary" onClick={() => {
  setMultipleDays(!multipleDays);
  if (!multipleDays) {
    setStartTime('');
  } else {
    setEndDate(null);
  }
}}>
  {multipleDays ? 'Single day' : 'Multiple days'}
</Button>
 </Box>
 </Box>
 );
}

export default FixTimeRequest;