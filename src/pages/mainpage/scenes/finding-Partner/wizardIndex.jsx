import { Stepper, Step, StepLabel, LinearProgress, Paper, Box } from '@mui/material';
import React, { useState, useCallback , useEffect } from "react";
import { Link } from 'react-router-dom';
import { DateAndTimeStep } from './Wizard/date&time.jsx';
import { EquipmentStep } from './Wizard/equiment.jsx';
import { CommentsStep } from './Wizard/comments.jsx';
import { LocationStep } from './Wizard/place.jsx';


// THIS COMPONENT IS THE PARENT OF THE WIZARD; will render the different pages and put together all info into a formulary that will be sent to DB

// ProfileWizard component
export function FindPartnerWizard() {
  // Steps for the profile wizard
  const steps = ['Location', 'Date and Time', 'Climbing Style and Equipment', 'Other comments'];
  // State for changing between pages
  const [activeStep, setActiveStep] = React.useState(0);
  // State for gathering info from formulary
  const [formData, setFormData] = React.useState({});
  // State for the success message after DB entry is created
  const [successMessage, setSuccessMessage] = useState(null);

  

  // Function to handle form data change
  const handleFormDataChange = useCallback((name, value) => {
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
    console.log(formData)
}, []);

useEffect(() => {
  console.log(formData);
}, [formData]);

  // Function to handle form submission to DB
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

  // Render the profile wizard
  return (
    <Box  maxWidth="1100px" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: { xs: 1, sm: 1, md: 2 } }}>

      {successMessage && <div className="modal">
        <div className="modal-content">
          <h2>{successMessage}</h2>
          <p> Your request have been made! Let's wait for a buddy to contact you</p>
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
      <Paper className="custom-paper2" sx={{ padding: '20px', width: { xs: '100%', md: '75%' } }} elevation={6}>
        <LinearProgress variant="determinate" value={(activeStep / (steps.length - 1)) * 100} />
        <Stepper activeStep={3}>
          {steps.map((label) => (
            <Step key={label}>

            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && <LocationStep setActiveStep={setActiveStep} formData={formData} onFormDataChange={handleFormDataChange} />}
        {activeStep === 1 && <DateAndTimeStep setActiveStep={setActiveStep} formData={formData} onFormDataChange={handleFormDataChange} />}
        {activeStep === 2 && <EquipmentStep setActiveStep={setActiveStep} formData={formData} onFormDataChange={handleFormDataChange} />}
        {activeStep === 3 && <CommentsStep setActiveStep={setActiveStep} formData={formData} onFormDataChange={handleFormDataChange} />}
      </Paper>
    </Box>
  );
}