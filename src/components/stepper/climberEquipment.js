import React, { useState , useEffect} from 'react';
import { Box, Chip, Button , Divider} from '@mui/material';

export function ClimberEquipmentForm({ setActiveStep, formData, onFormDataChange, onSubmit }) {
    const [climberType, setClimberType] = useState('');
    const [belayerDevice, setBelayerDevice] = useState('');
    const [material, setMaterial] = useState([]);

    const handleClimberTypeChange = (type) => {
        setClimberType(type);
        onFormDataChange('climberType', type);
    };

    const handleBelayerDeviceChange = (type) => {
        setBelayerDevice(type);
        onFormDataChange('belayerDevice', type);
    };

    useEffect(() => {
        onFormDataChange('material', material);
    }, [material, onFormDataChange]);

    const handleMaterialChange = (item) => {
        if (material.includes(item)) {
            setMaterial(material.filter(i => i !== item));
        } else {
            setMaterial([...material, item]);
        }
    };

    const handleSubmit = () => {
        // Perform validation checks here
        if (!climberType) {
            alert('Please select a Climber Type');
            return;
        } if (!belayerDevice) {
            alert('Please select a prefered belayer Device');
            return;
        }
        // If all checks pass, submit the form
        onSubmit(formData);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <h1 className=" text-base sm:text-xl text-green-900 font-extrabold  sm:mx-4 mb-2 sm:py-2">Let's Perfect Your Climbing Profile</h1>
            <h2 className=" text-base sm:text-lg  font-semibold text-gray-700  sm:mx-4 mb-2 sm:py-2"> We're almost there! Fine-tune your climbing profile to find like-minded climbers who share your passion and style</h2>
           <Divider></Divider>
           <h2 className=" text-sm sm:text-lg text-green-700 font-extrabold  sm:mx-4 mb-2 sm:py-2">Tell us your climbing style </h2>
            <h2 className=" text-sm sm:text-base  font-semibold text-gray-700  sm:mx-4 mb-2 sm:py-2"> Climbing it's a journey, and it's unique for every climber. Let us in on your climbing spirit. <span className='text-green-700 font-extrabold'>choosing the style </span> that best defines your adventure. </h2>
           
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
                <Chip
                    label="Quiet Enjoyer"
                    clickable
                    color={climberType === "Quiet Enjoyer" ? "primary" : "default"}
                    onClick={() => handleClimberTypeChange("Quiet Enjoyer")}
                />
                <Chip
                    label="Occasional Pusher of Limits"
                    clickable
                    color={climberType === "Occasional Pusher of Limits" ? "primary" : "default"}
                    onClick={() => handleClimberTypeChange("Occasional Pusher of Limits")}
                />
                <Chip
                    label="Always Pushing Limits"
                    clickable
                    color={climberType === "Always Pushing Limits" ? "primary" : "default"}
                    onClick={() => handleClimberTypeChange("Always Pushing Limits")}
                />
                
                
            </Box>
            <div className='mt-4'>
            <Divider></Divider>
            <h2 className=" text-sm sm:text-lg text-green-700 font-extrabold  sm:mx-4 mb-2 sm:py-2">Select Your Preferred Belay Device</h2> 
            <h2 className=" text-sm sm:text-base  font-semibold text-gray-700  sm:mx-4 mb-2 sm:py-2"> Your climbing, your choice. Pick the belay device that matches your style, experience, and comfort level. Your belay buddy is waiting. What's your pick?</h2>
              
            <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
            <Divider></Divider>  <Chip
                    label="Assisted-Braking Belay Devices"
                    clickable
                    color={belayerDevice === "Assisted-Braking Belay Devices" ? "primary" : "default"}
                    onClick={() => handleBelayerDeviceChange("Assisted-Braking Belay Devices")}
                />
                  <Chip
                    label="Tubular belay Devices"
                    clickable
                    color={belayerDevice === "Tubular belay Devices" ? "primary" : "default"}
                    onClick={() => handleBelayerDeviceChange("Tubular belay Devices")}
                />
                  <Chip
                    label="Guide Plate Belay Devices"
                    clickable
                    color={belayerDevice === "Guide Plate Belay Devices" ? "primary" : "default"}
                    onClick={() => handleBelayerDeviceChange("Guide Plate Belay Devices")}
                />
                  <Chip
                    label="Figure 8 Belay Device"
                    clickable
                    color={belayerDevice === "Figure 8 Belay Device" ? "primary" : "default"}
                    onClick={() => handleBelayerDeviceChange("Figure 8 Belay Device")}
                />
                </Box>
                </div>

                <div className='mt-4'>
    <Divider></Divider>
    <h2 className=" text-sm sm:text-lg text-green-700 font-extrabold  sm:mx-4 mb-2 sm:py-2">Climbing Together: Share Your Gear and Conquer the Heights</h2> 
    <h2 className=" text-sm sm:text-base  font-semibold text-gray-700  sm:mx-4 mb-2 sm:py-2"> Embrace the spirit of sharing and connect with fellow climbers to enhance your climbing experience. Share your gear and explore new routes together!</h2>
    {[
        ["Harness", "Belay Device", "Carabiners", "Safety Line"],
        ["Quickdraws", "Helmets", "Rope","Slings",],
        ["Webbing", "Cams", "Nuts", "Crash pad"]
    ].map((rowItems, rowIndex) => (
        <Box key={rowIndex} sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', listStyle: 'none', padding: 0, marginTop: 2}}>
            {rowItems.map(item => (
                <Chip
                    key={item}
                    label={item}
                    clickable
                    color={material.includes(item) ? "primary" : "default"}
                    onClick={() => handleMaterialChange(item)}
                />
            ))}
        </Box>
    ))}
</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Button variant="contained" color="primary" onClick={() => setActiveStep((prevStep) => prevStep - 1)}>Back</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </div>
        </Box>
    );
}

