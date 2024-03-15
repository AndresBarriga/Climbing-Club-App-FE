import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Select, MenuItem, TextField, Grid } from '@mui/material';
import ClimbingStyleCardSmall from './climbingStyleCardSmall';
import psicobloc from '../../../../../styles/images/Deep Soloing.jpeg'
import iconboulder from "../../../../../styles/images/icon-boulder.png"
import climbingindoors from "../../../../../styles/images/indoors.png"
import quickdraw from "../../../../../styles/images/quickdraw.png"
import tradi from "../../../../../styles/images/tradi.png"
import boulderoutdoors from "../../../../../styles/images/boulderoutdoiors.png"

//Last Step of the wizard component, get information about climbing style, belay device and climbing equipment

export function EquipmentStep({ setActiveStep, formData, onFormDataChange, onSubmit }) {
    // State for climber type, belayer device, and material
   
    const [material, setMaterial] = useState([]);
    const [neededMaterial, setNeededMaterial] = useState([]);
    const [climbingStyle, setClimbingStyle] = useState([]);
    const [showError,setShowError] = useState("");

    const equipmentOptions = {
        'Climb Indoors': ['Harness', 'Belay Device', 'Rope', 'Helmet', 'Quickdraws'],
        'Boulder Indoors': [],
        'Deep water solo': [],
        'Sports Climbing': ['Harness', 'Belay Device', 'Rope', 'Helmet', 'Carabiners', 'Safety line', 'Quickdraws', 'Slings'],
        'Traditional Climbing': ['Harness', 'Belay Device', 'Rope', 'Helmet', 'Carabiners', 'Safety line', 'Quickdraws', 'Slings', 'Webbing', 'Cams', 'Nuts', 'Crash pad'],
        'Boulder outdoors': ['Crash pad']
    };

    const uniqueEquipment = [...new Set(climbingStyle.map(style => equipmentOptions[style]).flat())];
    const inputStyle = {
        width: '100px', // adjust as needed
        margin: '0 10px'
    };

    const handleCardClick = (text) => {
        setClimbingStyle(prevStyles => {
          let newStyles;
          if (prevStyles.includes(text)) {
            // If the text is already in the array, remove it
            newStyles = prevStyles.filter(style => style !== text);
      
            // Also remove the corresponding equipment from material and neededMaterial
            // if it's not included in any of the remaining selected styles
            equipmentOptions[text].forEach(item => {
              if (!newStyles.some(style => equipmentOptions[style].includes(item))) {
                setMaterial(prevMaterial => {
                  const { [item]: _, ...newMaterial } = prevMaterial;
                  return newMaterial;
                });
                setNeededMaterial(prevNeededMaterial => {
                  const { [item]: _, ...newNeededMaterial } = prevNeededMaterial;
                  return newNeededMaterial;
                });
              }
            });
          } else {
            // If the text is not in the array, add it
            newStyles = [...prevStyles, text];
          }
          onFormDataChange('climbingStyle', newStyles);
          return newStyles;
        });
      };


    // Effect hook for updating material in form data, needed because otherwise last selection is not sent properly.
    useEffect(() => {
        onFormDataChange('material', material);
        onFormDataChange('neededMaterial', neededMaterial);
        console.log('material:', material);
console.log('neededMaterial:', neededMaterial);
    }, [material,neededMaterial, onFormDataChange]);

    const handleMaterialChange = (item, key, value) => {
        setMaterial(prevMaterial => {
            if (item === 'Harness') {
                return { ...prevMaterial, [item]: { ...prevMaterial[item], [key]: value } };
            } else if (item === 'Belay Device') {
                // For 'Belay Device', store the string value directly
                return { ...prevMaterial, [item]: value };
            } else {
                return { ...prevMaterial, [item]: { amount: value } };
            }
        });
    };
    
    const handleNeededMaterialChange = (item, key, value) => {
        setNeededMaterial(prevNeededMaterial => {
            if (item === 'Harness') {
                return { ...prevNeededMaterial, [item]: { ...prevNeededMaterial[item], [key]: value } };
            } else if (item === 'Belay Device') {
                // For 'Belay Device', store the string value directly
                return { ...prevNeededMaterial, [item]: value };
            } else {
                return { ...prevNeededMaterial, [item]: { amount: value } };
            }
        });
    };
    
    // Function to handle form submission
    const handleNext = () => {
        if(climbingStyle.length === 0) {
            setShowError(true);
            return;
        }
        setActiveStep((prevStep) => prevStep + 1);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <h1 className=" text-base sm:text-xl text-green-900 font-extrabold  sm:mx-4 mb-2 sm:py-2">Last Details 📝✨</h1>

            <h2 className=" text-sm sm:text-lg text-green-700 font-extrabold  sm:mx-4 mb-2 sm:py-2">Select the type of climb you want to do 🧗‍♂️🎨</h2>

            <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'space-around', listStyle: 'none', padding: 0, marginBottom: 7 }}>
                <div className='ml-10' style={{ display: 'flex', justifyContent: 'space-between' }}> <ClimbingStyleCardSmall image={climbingindoors} text="Climb Indoors" onClick={handleCardClick} isSelected={climbingStyle.includes("Climb Indoors")} size="20px" />
                    <ClimbingStyleCardSmall image={iconboulder} text="Boulder Indoors" onClick={handleCardClick} isSelected={climbingStyle.includes("Boulder Indoors")} />
                    <ClimbingStyleCardSmall image={quickdraw} text="Sports Climbing" onClick={handleCardClick} isSelected={climbingStyle.includes("Sports Climbing")} />
                    <ClimbingStyleCardSmall image={tradi} text="Traditional Climbing" onClick={handleCardClick} isSelected={climbingStyle.includes("Traditional Climbing")} />
                    <ClimbingStyleCardSmall image={psicobloc} text="Deep water solo" onClick={handleCardClick} isSelected={climbingStyle.includes("Deep water solo")} />
                    <ClimbingStyleCardSmall image={boulderoutdoors} text="Boulder outdoors" onClick={handleCardClick} isSelected={climbingStyle.includes("Boulder outdoors")} />
                </div>
                

            </Box>
            {showError && <Typography color="error">Please select a climbing style!!</Typography>}
            {climbingStyle.length > 0 && climbingStyle.every(style => ['Boulder Indoors', 'Deep water solo'].includes(style)) && (
 <Typography variant="body1" color="textSecondary">
    No material is needed for {climbingStyle.join(', ')}.
 </Typography>
)}
            <Divider></Divider>
            <h2 className=" text-sm sm:text-lg text-green-700 font-extrabold  sm:mx-4 mb-2 sm:py-2">Select your Available Gear 🎒🧗‍♀️</h2>
           
            <Grid container spacing={2}>
                {uniqueEquipment.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <Typography style={{ width: '80px' }}>{item}</Typography>
                            {item === 'Harness' && (
                                <>
                                    <TextField
                                        type="number"
                                        label="Amount"
                                        style={inputStyle}
                                        value={material[item]?.amount || ''}
                                        onChange={(event) => handleMaterialChange(item, 'amount', event.target.value)}
                                        min={0}
                                    />
                                    <Select
                                    label="Size"
                                    sx={{ minWidth: '60px' }}
                                        value={material[item]?.size || ''}
                                        onChange={(event) => handleMaterialChange(item, 'size', event.target.value)}
                                    >
                                        <MenuItem value="s">S</MenuItem>
                                        <MenuItem value="m">M</MenuItem>
                                        <MenuItem value="l">L</MenuItem>
                                    </Select>
                                </>
                            )}
                            {item === 'Belay Device' && (
                                <TextField
                                    label="Type of belay device"
                                    placeholder="GriGri"
                                    style={inputStyle}
                                    value={material[item] || ''}
                                    onChange={(event) => handleMaterialChange(item, 'amount', event.target.value)}
                                    min={0}
                                />
                            )}
                            {['Carabiners', 'Safety line', 'Quickdraws', 'Helmet', 'Slings', 'Webbing', 'Cams', 'Nuts', 'Crash pad'].includes(item) && (
                                <TextField
                                    type="number"
                                    label="Amount"
                                    style={inputStyle}
                                    value={material[item]?.amount || ''}
                                    onChange={(event) => handleMaterialChange(item, 'amount', event.target.value)}
                                    min={0}
                                />
                            )}
                            {item === 'Rope' && (
                                <TextField
                                    type="number"
                                    placeholder="60m"
                                    label="Length "
                                    style={inputStyle}
                                    value={material[item]?.amount || ''}
                                    min={0}
                                    onChange={(event) => handleMaterialChange(item,'amount', event.target.value)}
                                />
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Divider></Divider>
            <h2 className=" text-sm sm:text-lg text-green-700 font-extrabold  sm:mx-4 mb-2 sm:py-2">Select the Needed Gear 🛠️🤔</h2>


            <Grid container spacing={2}>
                {uniqueEquipment.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <Typography style={{ width: '80px' }}>{item}</Typography>
                            {item === 'Harness' && (
                                <>
                                    <TextField
                                        type="number"
                                        label="Amount"
                                        style={inputStyle}
                                        min={0}
                                        value={neededMaterial[item]?.amount || ''}
                                        onChange={(event) => handleNeededMaterialChange(item, 'amount', event.target.value)}
                                    />
                                    <Select
                                        value={neededMaterial[item]?.size || ''}
                                        onChange={(event) => handleNeededMaterialChange(item, 'size', event.target.value)}
                                    >
                                        <MenuItem value="s">S</MenuItem>
                                        <MenuItem value="m">M</MenuItem>
                                        <MenuItem value="l">L</MenuItem>
                                    </Select>
                                </>
                            )}
                             {item === 'Belay Device' && (
                                <TextField
                                    label="Type"
                                    style={inputStyle}
                                    value={neededMaterial[item] || ''}
                                    onChange={(event) => handleNeededMaterialChange(item, 'amount', event.target.value)}
                                    min={0}
                                />
                            )}
                            {['Carabiners', 'Safety line', 'Quickdraws', 'Helmet', 'Slings', 'Webbing', 'Cams', 'Nuts', 'Crash pad'].includes(item) && (
                                <TextField
                                    type="number"
                                    label="Amount"
                                    style={inputStyle}
                                    min={0}
                                    value={neededMaterial[item]?.amount || ''}
                                    onChange={(event) => handleNeededMaterialChange(item, 'amount',event.target.value)}
                                />
                            )}
                            {item === 'Rope' && (
                                <TextField
                                    type="number"
                                    label="Length "
                                    placeholder="60m"
                                    style={inputStyle}
                                    min={0}
                                    value={neededMaterial[item]?.amount || ''}
                                    onChange={(event) => handleNeededMaterialChange(item, 'amount',event.target.value)}
                                />
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <Button variant="contained" color="primary" onClick={() => setActiveStep((prevStep) => prevStep - 1)}>Back</Button>
                <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
            </div>
        </Box>
    );
}
