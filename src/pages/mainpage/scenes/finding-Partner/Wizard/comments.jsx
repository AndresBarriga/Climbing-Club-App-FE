import React, { useState } from 'react';
import { Box, TextField, Button, Divider } from '@mui/material';
//Last Step of the wizard component, get information about climbing style, belay device and climbing equipment

export function CommentsStep({ setActiveStep, formData, onFormDataChange, onSubmit }) {
    // State for climber type, belayer device, and material
  

    const [message, setMessage] = React.useState('');
    const maxChars = 140;

    const handleNext = (event) => {
        const inputValue = event.target.value;

        // Check if the input value exceeds the maximum characters
        if (inputValue.length <= maxChars) {
            setMessage(inputValue);
        }
        onFormDataChange('message', message);
        setActiveStep((prevStep) => prevStep + 1);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <h1 className=" text-base sm:text-xl text-green-900 font-extrabold  sm:mx-4 mb-2 sm:py-2">Do you want to share a message?</h1>
            <h2 className=" text-base sm:text-lg  font-semibold text-gray-700  sm:mx-4 mb-2 sm:py-2"> Your message will be shown to people when showing your request.</h2>
            <Divider></Divider>
            <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
    }}
>
            <div style={{ width: '80%' }}>
            <TextField
    label="Share your message"
    value={message}
    onChange={(event) => setMessage(event.target.value)}
    min={0}
    multiline
    rows={3}  // Adjust the number of rows as needed
    sx={{ width: '100%', }}
    InputProps={{
        endAdornment: <p>{message.length}/{maxChars}</p>,
        maxLength: maxChars,
    }}
/>
    </div>
    </Box>



            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Button variant="contained" color="primary" onClick={() => setActiveStep((prevStep) => prevStep - 1)}>Back</Button>
                <Button variant="contained" color="primary" onClick={handleNext}>Review request</Button>
            </div>
        </Box>
    );
}

