import { Card, CardContent, Divider, Box, TextField, Autocomplete, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { DatePicker } from '@mui/lab';
import React, { useState } from 'react';

const FindPartnerForm = () => {
    const [country, setCountry] = useState('');
    const [area, setArea] = useState('');
    const [route, setRoute] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState('');
    const [specificTime, setSpecificTime] = useState('');
    const [isFlexible, setIsFlexible] = useState(false);
    

    const countries = ['Country 1', 'Country 2', 'Country 3']; // Replace with actual country data
    const areas = ['Area 1', 'Area 2', 'Area 3']; // Replace with actual area data
    const routes = ['Route 1', 'Route 2', 'Route 3']; // Replace with actual route data
    const times = ['Morning', 'Afternoon', 'Evening', 'Specific time'];

    const handleTimeChange = (event) => {
        setTime(event.target.value);
        if (event.target.value !== 'Specific time') {
            setSpecificTime('');
        }
    };

    return (
        <Card sx={{ width: '100%', boxShadow: 20 }}>
            <CardContent>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <div style={{ flex: 1 }}>
                        <Typography marginBottom={2} variant="h6" component="h3" className="font-bold text-green-900 ">
                            Start by telling us where do you want to climb!
                        </Typography>
                    </div>
                    <div style={{ display: "flex", gap: "4rem" }}>
                        <Autocomplete
                            options={countries}
                            value={country}
                            onChange={(event, newValue) => {
                                setCountry(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Country" />}
                        />
                        <Autocomplete
                            options={areas}
                            value={area}
                            onChange={(event, newValue) => {
                                setArea(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Area" />}
                        />
                        <Autocomplete
                            options={routes}
                            value={route}
                            onChange={(event, newValue) => {
                                setRoute(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Route/Gym" />}
                        />
                    </div>
                    <Divider></Divider>
                    <Typography marginBottom={2} variant="h6" component="h3" className="font-bold text-green-900 ">
                        When are you finding a buddy to climb with?
                    </Typography>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <FormControl>
                        <InputLabel id="time-label">Time</InputLabel>
                        <Select
                            labelId="time-label"
                            id="time-select"
                            value={time}
                            label="Time"
                            onChange={handleTimeChange}
                        >
                            {times.map((timeOption, index) => (
                                <MenuItem key={index} value={timeOption}>{timeOption}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {time === 'Specific time' && (
                        <TextField
                            label="Specific Time"
                            value={specificTime}
                            onChange={(event) => setSpecificTime(event.target.value)}
                        />
                    )}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isFlexible}
                                onChange={(event) => setIsFlexible(event.target.checked)}
                                name="flexible"
                                color="primary"
                            />
                        }
                        label="I am flexible"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default FindPartnerForm;