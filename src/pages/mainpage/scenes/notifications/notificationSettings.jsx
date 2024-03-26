import React, { useState, useEffect } from "react";
import { FormControlLabel, Button, Card, CardContent, Typography, Box, Switch } from "@mui/material";

const NotificationSettings = () => {
    const [checked, setChecked] = useState({
        favouritePlaces: true,
        friendsRequest: true,
        newLocation: true,
    });

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchNotificationSettings = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notificationSettings`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setChecked(data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchNotificationSettings();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notificationSettings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(checked)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSuccessMessage("Your preferences have been updated!");
            setTimeout(() => setSuccessMessage(''), 2000);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    const handleChange = (event) => {
        const key = event.target.name;
        
            setChecked((prevState) => ({
                ...prevState,
                [key]: event.target.checked,
            }));
        
    };

   

    return (
        <Box
            display="flex"
            justifyContent="center"
            bgcolor="background.default"
        >
        {successMessage && <div className="modal">
            <div className="modal-content">
                <h2>Congratulations!</h2>
                <p>{successMessage}</p>
                <div className="my-6"></div>
            </div>
        </div>}
            <Card sx={{ width: '80%' }}>
                <CardContent>
                    <form onSubmit={handleSubmit}
                    >
                        <Typography variant="h6" component="h3" className="font-bold text-green-900 ">
                            I want to receive notifications when:
                        </Typography>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={checked.favouritePlaces}
                                        onChange={handleChange}
                                        name="favouritePlaces"
                                        color="primary"
                                    />
                                }
                                label="Someone creates a request for my favourite places"
                            />
                        </Box>
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={checked.friendsRequest}
                                        onChange={handleChange}
                                        name="friendsRequest"
                                        color="primary"
                                    />
                                }
                                label="My friends create a climbing request"
                            />
                        </Box>
                    
                        <Box mb={2}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={checked.newLocation}
                                        onChange={handleChange}
                                        name="newLocation"
                                        color="primary"
                                    />
                                }
                                label="New location on my city "
                            />
                        </Box>
                      
                        <Button variant="contained" color="primary" type="submit">
                            Save Settings
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default NotificationSettings;