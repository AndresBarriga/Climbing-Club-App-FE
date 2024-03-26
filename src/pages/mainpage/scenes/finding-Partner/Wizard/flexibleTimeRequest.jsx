import React, { useState, useEffect } from 'react';
import { Checkbox, Table, TableBody, TableCell, Box, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

function FlexibleTimeRequest({ onUserInputChange }) {
const [isCompletelyFlexible, setIsCompletelyFlexible] = useState(false);



 const [monday, setMonday] = useState({
  earlyMorning: true,
  morning: false,
  midday: false,
  afternoon: false,
  lateAfternoon: false,
  wholeDay: false
 });
 const [tuesday, setTuesday] = useState({
  earlyMorning: false,
  morning: false,
  midday: false,
  afternoon: false,
  lateAfternoon: false,
  wholeDay: false
 });
 const [wednesday, setWednesday] = useState({
  earlyMorning: false,
  morning: false,
  midday: false,
  afternoon: false,
  lateAfternoon: false,
  wholeDay: false
 });
 const [thursday, setThursday] = useState({
  earlyMorning: false,
  morning: false,
  midday: false,
  afternoon: false,
  lateAfternoon: false,
  wholeDay: false
 });
 const [friday, setFriday] = useState({
  earlyMorning: false,
  morning: false,
  midday: false,
  afternoon: false,
  lateAfternoon: false,
  wholeDay: false
 });
 const [saturday, setSaturday] = useState({
  earlyMorning: false,
  morning: false,
  midday: false,
  afternoon: false,
  lateAfternoon: false,
  wholeDay: false
 });
 const [sunday, setSunday] = useState({
  earlyMorning: false,
  morning: false,
  midday: false,
  afternoon: false,
  lateAfternoon: false,
  wholeDay: false
 });

 const handleCheckboxChange = (day, time) => {
  switch(day) {
    case 'Monday':
      setMonday(prevState => ({...prevState, [time]: !prevState[time]}));
      break;
    case 'Tuesday':
      setTuesday(prevState => ({...prevState, [time]: !prevState[time]}));
      break;
    case 'Wednesday':
      setWednesday(prevState => ({...prevState, [time]: !prevState[time]}));
      break;
    case 'Thursday':
      setThursday(prevState => ({...prevState, [time]: !prevState[time]}));
      break;
    case 'Friday':
      setFriday(prevState => ({...prevState, [time]: !prevState[time]}));
      break;
    case 'Saturday':
      setSaturday(prevState => ({...prevState, [time]: !prevState[time]}));
      break;
    case 'Sunday':
      setSunday(prevState => ({...prevState, [time]: !prevState[time]}));
      break;
  }
 };



 useEffect(() => {
    let userInput;
    if (isCompletelyFlexible) {
      userInput = { isCompletelyFlexible: isCompletelyFlexible };
    } else {
      userInput = {
        Monday: Object.entries(monday).filter(([time, checked]) => checked).map(([time, checked]) => time),
        Tuesday: Object.entries(tuesday).filter(([time, checked]) => checked).map(([time, checked]) => time),
        Wednesday: Object.entries(wednesday).filter(([time, checked]) => checked).map(([time, checked]) => time),
        Thursday: Object.entries(thursday).filter(([time, checked]) => checked).map(([time, checked]) => time),
        Friday: Object.entries(friday).filter(([time, checked]) => checked).map(([time, checked]) => time),
        Saturday: Object.entries(saturday).filter(([time, checked]) => checked).map(([time, checked]) => time),
        Sunday: Object.entries(sunday).filter(([time, checked]) => checked).map(([time, checked]) => time),
      };
    }
    onUserInputChange(userInput);
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday, isCompletelyFlexible]);
  



 return (
  <Box >
    <Typography className="text-green-900 "variant="h6">Flexi-Time Request</Typography>
    <h4 className="text-sm sm:text-base text-gray-600 font-medium  sm:mx-4 mb-2 sm:py-2">Flexi time request <span className="text-green-700 font-bold">will remain active</span> until you choose to delete it. </h4>
    <Typography variant="body1" style={{ fontWeight: 500}} className="text-sm sm:text-lg text-green-800 sm:mx-4 mb-2 sm:py-2">
  I can climb any time: 
  <Checkbox checked={isCompletelyFlexible} onChange={() => setIsCompletelyFlexible(!isCompletelyFlexible)} />
</Typography>
{!isCompletelyFlexible && (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Monday</TableCell>
            <TableCell>Tuesday</TableCell>
            <TableCell>Wednesday</TableCell>
            <TableCell>Thursday</TableCell>
            <TableCell>Friday</TableCell>
            <TableCell>Saturday</TableCell>
            <TableCell>Sunday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
          <TableCell>
  <Typography variant="body2" style={{ fontWeight: 500, fontSize: '14px', color: 'grey.600', marginTop: '10px' }}>Early Morning (6-7am)</Typography>
  <Typography variant="body2" style={{ fontWeight: 500, fontSize: '14px', color: 'grey.800', marginTop: '10px' }}>Morning (9-10 am)</Typography>
  <Typography variant="body2" style={{ fontWeight: 500, fontSize: '14px', color: 'grey.800', marginTop: '10px' }}>Midday (12pm)</Typography>
  <Typography variant="body2" style={{ fontWeight: 500, fontSize: '14px', color: 'grey.800', marginTop: '10px' }}>Afternoon (15pm)</Typography>
  <Typography variant="body2" style={{ fontWeight: 500, fontSize: '14px', color: 'grey.800', marginTop: '10px' }}>Late Afternoon(18pm)</Typography>
  <Typography variant="body2" style={{ fontWeight: 500, fontSize: '14px', color: 'grey.800', marginTop: '10px' }}>Whole Day</Typography>
</TableCell>
            <TableCell>
              <Checkbox checked={monday.earlyMorning} onChange={() => handleCheckboxChange('Monday', 'earlyMorning')} />
              <Checkbox checked={monday.morning} onChange={() => handleCheckboxChange('Monday', 'morning')} />
              <Checkbox checked={monday.midday} onChange={() => handleCheckboxChange('Monday', 'midday')} />
              <Checkbox checked={monday.afternoon} onChange={() => handleCheckboxChange('Monday', 'afternoon')} />
              <Checkbox checked={monday.lateAfternoon} onChange={() => handleCheckboxChange('Monday', 'lateAfternoon')} />
              <Checkbox checked={monday.wholeDay} onChange={() => handleCheckboxChange('Monday', 'wholeDay')} />
            </TableCell>
            <TableCell>
             <Checkbox checked={tuesday.earlyMorning} onChange={() => handleCheckboxChange('Tuesday', 'earlyMorning')} />
             <Checkbox checked={tuesday.morning} onChange={() => handleCheckboxChange('Tuesday', 'morning')} />
             <Checkbox checked={tuesday.midday} onChange={() => handleCheckboxChange('Tuesday', 'midday')} />
             <Checkbox checked={tuesday.afternoon} onChange={() => handleCheckboxChange('Tuesday', 'afternoon')} />
             <Checkbox checked={tuesday.lateAfternoon} onChange={() => handleCheckboxChange('Tuesday', 'lateAfternoon')} />
             <Checkbox checked={tuesday.wholeDay} onChange={() => handleCheckboxChange('Tuesday', 'wholeDay')} />
           </TableCell>
           <TableCell>
             <Checkbox checked={wednesday.earlyMorning} onChange={() => handleCheckboxChange('Wednesday', 'earlyMorning')} />
             <Checkbox checked={wednesday.morning} onChange={() => handleCheckboxChange('Wednesday', 'morning')} />
             <Checkbox checked={wednesday.midday} onChange={() => handleCheckboxChange('Wednesday', 'midday')} />
             <Checkbox checked={wednesday.afternoon} onChange={() => handleCheckboxChange('Wednesday', 'afternoon')} />
             <Checkbox checked={wednesday.lateAfternoon} onChange={() => handleCheckboxChange('Wednesday', 'lateAfternoon')} />
             <Checkbox checked={wednesday.wholeDay} onChange={() => handleCheckboxChange('Wednesday', 'wholeDay')} />
           </TableCell>
           <TableCell>
             <Checkbox checked={thursday.earlyMorning} onChange={() => handleCheckboxChange('Thursday', 'earlyMorning')} />
             <Checkbox checked={thursday.morning} onChange={() => handleCheckboxChange('Thursday', 'morning')} />
             <Checkbox checked={thursday.midday} onChange={() => handleCheckboxChange('Thursday', 'midday')} />
             <Checkbox checked={thursday.afternoon} onChange={() => handleCheckboxChange('Thursday', 'afternoon')} />
             <Checkbox checked={thursday.lateAfternoon} onChange={() => handleCheckboxChange('Thursday', 'lateAfternoon')} />
             <Checkbox checked={thursday.wholeDay} onChange={() => handleCheckboxChange('Thursday', 'wholeDay')} />
           </TableCell>
           <TableCell>
             <Checkbox checked={friday.earlyMorning} onChange={() => handleCheckboxChange('Friday', 'earlyMorning')} />
             <Checkbox checked={friday.morning} onChange={() => handleCheckboxChange('Friday', 'morning')} />
             <Checkbox checked={friday.midday} onChange={() => handleCheckboxChange('Friday', 'midday')} />
             <Checkbox checked={friday.afternoon} onChange={() => handleCheckboxChange('Friday', 'afternoon')} />
             <Checkbox checked={friday.lateAfternoon} onChange={() => handleCheckboxChange('Friday', 'lateAfternoon')} />
             <Checkbox checked={friday.wholeDay} onChange={() => handleCheckboxChange('Friday', 'wholeDay')} />
           </TableCell>
           <TableCell>
             <Checkbox checked={saturday.earlyMorning} onChange={() => handleCheckboxChange('Saturday', 'earlyMorning')} />
             <Checkbox checked={saturday.morning} onChange={() => handleCheckboxChange('Saturday', 'morning')} />
             <Checkbox checked={saturday.midday} onChange={() => handleCheckboxChange('Saturday', 'midday')} />
             <Checkbox checked={saturday.afternoon} onChange={() => handleCheckboxChange('Saturday', 'afternoon')} />
             <Checkbox checked={saturday.lateAfternoon} onChange={() => handleCheckboxChange('Saturday', 'lateAfternoon')} />
             <Checkbox checked={saturday.wholeDay} onChange={() => handleCheckboxChange('Saturday', 'wholeDay')} />
           </TableCell>
           <TableCell>
             <Checkbox checked={sunday.earlyMorning} onChange={() => handleCheckboxChange('Sunday', 'earlyMorning')} />
             <Checkbox checked={sunday.morning} onChange={() => handleCheckboxChange('Sunday', 'morning')} />
             <Checkbox checked={sunday.midday} onChange={() => handleCheckboxChange('Sunday', 'midday')} />
             <Checkbox checked={sunday.afternoon} onChange={() => handleCheckboxChange('Sunday', 'afternoon')} />
             <Checkbox checked={sunday.lateAfternoon} onChange={() => handleCheckboxChange('Sunday', 'lateAfternoon')} />
             <Checkbox checked={sunday.wholeDay} onChange={() => handleCheckboxChange('Sunday', 'wholeDay')} />
           </TableCell>
         </TableRow>
       </TableBody>
     </Table>
     
   </TableContainer>
    )}
  </Box>
 );
}

export default FlexibleTimeRequest;
