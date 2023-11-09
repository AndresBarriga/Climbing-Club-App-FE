import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


export function GenderForm({setActiveStep, forData, onFormDataChange }) {
    const [gender, setGender] = useState('');
    const [date, setDate] = useState(null);

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        onFormDataChange('gender', event.target.value)
    };

    const handleDateChange = (newDate) => {
        if (newDate instanceof dayjs) {
            const formattedDate = dayjs(newDate).format('YYYY-MM-DD'); 
            setDate(formattedDate)
            onFormDataChange('birthday', formattedDate);
        }
    };
    
    const handleNext = () => {
        // Validation check
        if (!gender) {
            alert('Please select a gender');
            return;
        }
        if (!date) {
            alert('Please select a Birthdate');
            return;
        }
        // If the validation check passes, proceed to the next step
        setActiveStep((prevStep) => prevStep + 1);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <h1 className=" text-base sm:text-xl text-green-900 font-extrabold  sm:mx-4 mb-2 sm:py-2">Let's get to know you better</h1>
            <h2 className=" text-base sm:text-lg  font-semibold text-gray-700  sm:mx-4 mb-2 sm:py-2">We're excited to learn more about you. Your gender and birthdate will help us tailor your climbing experience.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
 
            <p className=" text-sm sm:text-base font-bold text-gray-700 sm:mx-4 mb-2 sm:py-2">What is your gender?  <span style={{ fontSize: 30 }}>🧑‍🤝‍🧑</span>  </p>
            <FormControl component="fieldset">
            
                
                <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleGenderChange } >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
            <p className=" text-sm sm:text-base font-bold text-gray-700 sm:mx-4 mb-2 sm:py-2">When were you born? <span style={{ fontSize: 30 }}>🎂 🎁</span> </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
          label="Birthdate"
          value={dayjs(date)}
          onChange={(newDate) => handleDateChange(newDate)}
        />
        <p className=" text-xs sm:text-sm text-gray-700 vfont-extralight sm:mx-4 mb-2 sm:py-2">*Your profile shows your age, not your birthdate.</p>
            
            </LocalizationProvider>
            </div>
 
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Button variant="contained" color="primary" onClick={() => setActiveStep((prevStep) => prevStep - 1)}>Back</Button>
                <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
            </div>
        </Box>
    );
};