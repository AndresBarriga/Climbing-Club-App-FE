import { Stepper, Step, StepLabel, LinearProgress, Paper, Box } from '@mui/material';
import React, { useState, useCallback , useEffect } from "react";
import { Link } from 'react-router-dom';
import { DateAndTimeStep } from './Wizard/date&time.jsx';
import { EquipmentStep } from './Wizard/equiment.jsx';
import { CommentsStep } from './Wizard/comments.jsx';
import { LocationStep } from './Wizard/place.jsx';
import ReviewStep from './Wizard/review.jsx';
import moment from 'moment';
import { useLocation } from 'react-router-dom';


// THIS COMPONENT IS THE PARENT OF THE WIZARD; will render the different pages and put together all info into a formulary that will be sent to DB

// ProfileWizard component
export function FindPartnerWizard({ initialData }) {

  // Inside your FindPartnerWizard component
const location = useLocation();
const stateInitialData  = location.state?.initialData;

 // Use the initialData from the prop if it's provided, otherwise use the stateInitialData from the location state
 const effectiveInitialData = initialData || stateInitialData;

  // Steps for the profile wizard
  const steps = ['Location', 'Date and Time', 'Climbing Style and Equipment', 'Other comments', "Review"];
  // State for changing between pages
  const [activeStep, setActiveStep] = React.useState(effectiveInitialData ? 1 : 0);
  // State for gathering info from formulary
  const [formData, setFormData] = React.useState(effectiveInitialData || {});
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
    let expiration_date;
  
    if (formData.timeData.endDate) {
      // If there's an end date, use it as the expiration date
      expiration_date = formData.timeData.endDate.endOf('day').toISOString();
    } else if (formData.timeData.startDate) {
      // If there's no end date but there's a start date, use the start date as the expiration date
      expiration_date = formData.timeData.startDate.endOf('day').toISOString();
    } else if (formData.timeData.isCompletelyFlexible || Object.keys(formData.timeData).some(day => formData.timeData[day])) {
      // If there's no end date or start date but isCompletelyFlexible is true or there's a day, set the expiration date to 1 month after the current date
      expiration_date = moment().add(1, 'months').endOf('day').toISOString();
    }
    console.log(expiration_date)
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/create_request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        expiration_date
      })
    });
    if (response.ok) {
      setSuccessMessage("Your request have been made! Let's wait for a buddy to contact you! 📩 📬");
      setTimeout(() => setSuccessMessage(''), 2000);
      setTimeout(() => window.location.href = "/dashboard", 1500);
    } else {
      console.error('There was an error submitting the form');
    }
  };

  // Render the profile wizard
  return (
    <Box  maxWidth="1100px" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: { xs: 1, sm: 1, md: 2 } }}>
     {successMessage && <div className="modal">
      <div className="modal-content">
        <h2>Congratulations, {successMessage}!</h2>

        <div className="my-6"></div>

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
        {activeStep === 4 && <ReviewStep setActiveStep={setActiveStep} formData={formData} handleFormSubmit={handleFormSubmit}/>}
      </Paper>
    </Box>
  );
}