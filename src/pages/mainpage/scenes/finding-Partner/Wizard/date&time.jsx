import React, { useState, useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import FlexibleTimeRequest from './flexibleTimeRequest';
import FixTimeRequest from './fixTimeRequest';
import dayjs from 'dayjs';
import WarningIcon from '@mui/icons-material/Warning';

export function DateAndTimeStep({ setActiveStep, forData, onFormDataChange }) {

    const [userInput, setUserInput] = useState({});
    const [timeRequestType, setTimeRequestType] = useState('');
    const [showError, setShowError] = useState(false);
    const [timeData, setTimeData] = useState({});

    const handleTimeRequestChange = (event) => {
        setTimeRequestType(event.target.value);
    };

    const [dateTime, setDateTime] = useState({
        startDate: dayjs(),
        endDate: dayjs(),
        startTime: '',
    });

    useEffect(() => {
        if (timeRequestType === 'Flexible') {
            setTimeData(userInput);
        } else if (timeRequestType === 'Fix') {
            setTimeData(dateTime);
        }
    }, [userInput, dateTime, timeRequestType]);

    const handleNext = () => {
        if (!timeRequestType) {
            setShowError(true);
            return;
        }
        onFormDataChange('timeData', timeData); // pass timeData to parent
        setActiveStep((prevStep) => prevStep + 1);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <h1 className=" text-base sm:text-xl text-green-900 font-extrabold sm:mx-4 mb-2 sm:py-2">Step 2: Time to Climb! 🕰️</h1>
            <h2 className=" text-base sm:text-lg font-semibold text-gray-700 sm:mx-4 mb-2 sm:py-2">Tell us about your availability ⏱️✨</h2>


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => setTimeRequestType('Flexible')}>Flexi-Time Request</Button>
                <Button variant="contained" color="primary" onClick={() => setTimeRequestType('Fix')}>Fixed-Time Request</Button>
            </div>
            <h4 className="text-sm sm:text-base text-gray-600 font-medium  sm:mx-4 mb-2 sm:py-2">Choose between specific dates or hours that fits your regularly</h4>
            {timeRequestType === 'Flexible' ? <FlexibleTimeRequest onUserInputChange={setUserInput} /> : null}
            {timeRequestType === 'Fix' ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}><FixTimeRequest onDateTimeChange={setDateTime} /></LocalizationProvider>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                {/* Display the Avatar with the selected image or the placeholder */}

                <Button variant="contained" color="primary" onClick={() => setActiveStep((prevStep) => prevStep - 1)}>Back</Button>
                {showError &&
                    <Box display="flex" alignItems="center" justifyContent="center" style={{ color: 'red', marginTop: '10px' }}>
                        <WarningIcon style={{ marginRight: '5px' }} />
                        <Typography variant="body1">Please SELECT A TIME for your climbing request!</Typography>
                    </Box>
                }
                <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
            </div>
        </Box>

    );
}