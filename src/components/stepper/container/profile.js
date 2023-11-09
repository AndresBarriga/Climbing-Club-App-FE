import { Stepper, Step, StepLabel,LinearProgress , Paper, Box } from '@mui/material';
import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { LocationForm } from '../location.js';
import { GenderForm } from '../gender.js';
import { ClimbingStyleForm } from '../climbingStyle.js';
import { ClimberEquipmentForm } from '../climberEquipment.js';



export function ProfileWizard() {
    const steps = ['Location', 'Gender & Age', 'Climbing Style', 'Climber Equipment'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [formData, setFormData] = React.useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    


    function handleFormDataChange(name, value) {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
        console.log(formData)
       }


       const handleFormSubmit = async (formData) => {
        console.log(formData)
        const response = await fetch("http://localhost:3001/initial-preferences", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        });
    
        if (response.ok) {
          setSuccessMessage("Your initial preferences are set up!");

            
        } else {
            alert('There was an error submitting the form');
        }
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: { xs: 1, sm: 2, md: 3 } }}>
    
    {successMessage && <div className="modal">
      <div className="modal-content">
        <h2>{successMessage}</h2>
        <p> Everything is ready for you to use the app.</p>
        <div className="my-6"></div>
        <Link to="/dashboard">
  <span
    className="mx-6 text-white rounded bg-green-800 text-sm font-medium hover:bg-white hover:text-green-800 hover:border-green focus:outline-none focus:ring active:bg-green-800 sm:w-auto px-5 py-2.5 duration-300 border border-transparent hover:border-green-800"
    aria-label="Next"
  >
    To my Dashboard
  </span>
</Link>
      </div>
    </div>}
    <Paper className="custom-paper2" sx={{ padding: '20px', width: { xs: '100%', md: '60%' } }} elevation={6}>
        <LinearProgress variant="determinate" value={(activeStep / (steps.length - 1)) * 100} />
        <Stepper activeStep={3}>
          {steps.map((label) => (
            <Step key={label}>
             
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && <LocationForm setActiveStep={setActiveStep} formData={formData} onFormDataChange={handleFormDataChange}  />}
   {activeStep === 1 && <GenderForm setActiveStep={setActiveStep} formData={formData} onFormDataChange={handleFormDataChange} />}
   {activeStep === 2 && <ClimbingStyleForm  setActiveStep={setActiveStep} formData={formData} onFormDataChange={handleFormDataChange}/>}
   {activeStep === 3 && <ClimberEquipmentForm setActiveStep={setActiveStep} formData={formData} onFormDataChange={handleFormDataChange} onSubmit={handleFormSubmit} />}
   </Paper>
   </Box>
    );
   }



