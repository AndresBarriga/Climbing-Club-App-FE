import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import ClimbingStyleCard from './climbingStyleCard';
import psicobloc from "../../styles/images/logos/Deep Soloing.jpeg"
import iconboulder from "../../styles/images/logos/icon-boulder.png"
import climbingindoors from "../../styles/images/logos/indoors.png"
import quickdraw from "../../styles/images/logos/quickdraw.png"
import tradi from "../../styles/images/logos/tradi.png"
import boulderoutdoors from "../../styles/images/logos/boulderoutdoiors.png"


export function ClimbingStyleForm({ setActiveStep, formData, onFormDataChange }) {
    const [climbingStyle, setClimbingStyle] = useState([]);



    
    const handleCardClick = (text) => {
        setClimbingStyle(prevStyles => {
            let newStyles;
            if (prevStyles.includes(text)) {
                // If the text is already in the array, remove it
                newStyles = prevStyles.filter(style => style !== text);
            } else {
                // If the text is not in the array, add it
                newStyles = [...prevStyles, text];
            }
            onFormDataChange('climbingStyle', newStyles);
            return newStyles;
        });
    };
    const handleNext = () => {
        // Validation check
        if (!climbingStyle) {
            alert('Please select a Climbing Style');
            return;
        }
        // If the validation check passes, proceed to the next step
        setActiveStep((prevStep) => prevStep + 1);
    };



    return (
        <Box sx={{ width: '100%' }}>
        <div>
        <h1 className=" text-base sm:text-xl text-green-900 font-extrabold  sm:mx-4 mb-2 sm:py-2">Unleash Your Climbing Style, Embrace Your Vertical Adventure </h1>
        <h2 className=" text-base sm:text-lg  font-semibold text-gray-700  sm:mx-4 mb-2 sm:py-2"> We want to know which (or whichs) <span className='text-green-700 font-extrabold'>climbing style(s) resonates with you. </span>Your choice will help us curate the perfect <span className='text-green-700 font-extrabold'>climbing experience just for you.</span></h2>
            <div className='ml-10' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            <ClimbingStyleCard image={climbingindoors} text="Climb Indoors" onClick={handleCardClick}  isSelected={climbingStyle.includes("Climb Indoors")}/>
            <ClimbingStyleCard image={iconboulder} text="Boulder Indoors" onClick={handleCardClick} isSelected={climbingStyle.includes("Boulder Indoors")} />  
            <ClimbingStyleCard image={quickdraw} text="Sports Climbing" onClick={handleCardClick}  isSelected={climbingStyle.includes("Sports Climbing")}/>
            <ClimbingStyleCard image={tradi} text="Traditional Climbing" onClick={handleCardClick} isSelected={climbingStyle.includes("Traditional Climbing")}/>
            <ClimbingStyleCard image={psicobloc} text="Deep water solo" onClick={handleCardClick} isSelected={climbingStyle.includes("Deep water solo")}/>
            <ClimbingStyleCard image={boulderoutdoors} text="Boulder outdoors" onClick={handleCardClick} isSelected={climbingStyle.includes("Boulder outdoors")}/>
            </div>
            <h2 className=" text-base sm:text-lg  text-gray-700  sm:mx-4 mb-2 sm:py-2"> Choose the climbing style that defines your adventure spirit.  <span className='text-green-700 font-semibold'> We're here to guide you on your vertical journey.</span></h2>

            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Button variant="contained" color="primary" onClick={() => setActiveStep((prevStep) => prevStep - 1)}>Back</Button>
                <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
            </div>
            
        </div>
        </Box>
    
    );
}