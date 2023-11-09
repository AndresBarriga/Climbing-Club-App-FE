import React, { useState } from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Button } from "@mui/material";

export function LocationForm({ setActiveStep, formData, onFormDataChange }) {
    const [address, setAddress] = useState("");

    const handleSelect = async value => {
        setAddress(value);
        onFormDataChange('location', value); // Save the selected location in the form data
    };

    const handleNext = () => {
        // Validation check
        if (!address) {
            alert('Please select a location');
            return;
        }
        // If the validation check passes, proceed to the next step
        setActiveStep((prevStep) => prevStep + 1);
    };

    return (
        <div>
            <h1 className=" text-base sm:text-lg text-green-900 font-extrabold  sm:mx-4 mb-2 sm:py-2">Welcome!  We're excited to have you on board. <span style={{ fontSize: 40 }}>🍃🏔️</span> </h1>
            <h2 className=" text-base sm:text-lg  font-semibold text-gray-700  sm:mx-4 mb-2 sm:py-2"> To help us offer you ressources or connect you with climbing enthusiasts in your area, could you tell us<span className="text-green-700 font-bold"> where you're based</span> or your preferred <span className="text-green-700 font-bold">climbing location?</span></h2>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
    <FmdGoodOutlinedIcon style={{ fontSize: 150 }} />
</div>
            
            <p className=" text-sm sm:text-base text-gray-700 italic font-light sm:mx-4 mb-2 sm:py-2">Simply type in the name of your city or climbing hub, and we'll do the rest. Let's get started by entering your location below:</p>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
                searchOptions={{ types: ['(cities)'] }}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input className="ml-4 custom-paper2 border-2 border-green-900 rounded"{...getInputProps({ 
    placeholder: "    Write your city...",
    onBlur: () => {
        if (address) {
            handleSelect(address);
        }
    }
})} />

                        <div>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map((suggestion, key) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style, key: suggestion.placeId })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}

