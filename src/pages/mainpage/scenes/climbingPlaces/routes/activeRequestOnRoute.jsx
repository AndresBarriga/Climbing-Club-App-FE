import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Box, Typography, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import moment from "moment";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';
import UserProfileCardOthers from "../../profileCard/profileCardOthers";
import { useState, useEffect } from "react";
import { Modal } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { SendAMessage } from "../../finding-Partner/sendAMessage/sendAMessage";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




function ActiveRequestonRoute({ requests, handleStartRequest }) {

    const navigate = useNavigate()
    const [showAll, setShowAll] = useState(false);

    function handleNavigate(request) {
        navigate(`/showActiveRequest/${request.uid}`)
    }

    // State to hold the names of the users
    const [userNames, setUserNames] = useState({});
    const [birthdate, setBirthdate] = useState({});
    const [connectedUser, setConnectedUser] = useState(null);
    const [selectedRequestUid, setSelectedRequestUid] = useState(null);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const handleMessageModalClose = () => setIsMessageModalOpen(false);
    const handleMessageModalOpen = () => setIsMessageModalOpen(true);
    const [showConfetti, setShowConfetti]= useState(false);

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Function to fetch user details by user_id
    const fetchUserName = async (userId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/showOtherProfile/profileAndPreferences?userId=${userId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            return {
                name: data.user.name,
                lastName: data.user.last_name,
                user_id: userId,
                birthday: data.preferences.birthday
            };

        } catch (error) {
            console.error("Error fetching user name:", error);
        }
    };


    // Fetch user names when the component mounts or requests data changes
    useEffect(() => {
        const fetchUserNames = async () => {
            const names = {};
            const birthdates = {};
            for (const request of requests) {
                const userDetails = await fetchUserName(request.user_id);
                names[request.user_id] = userDetails;
                birthdates[request.user_id] = userDetails;
            }
            setUserNames(names)
            setBirthdate(birthdates);
        };

        if (requests.length > 0) {
            fetchUserNames();
        }
    }, [requests]);

    // Handler for when a user's name is clicked
    const handleUserNameClick = (userId) => {
        setSelectedUserId(userId);
        handleOpen();
    };

    //Conect with user on message icon click
    const connectCard = (request) => {
        // Assuming 'request' object contains 'user_id' and 'uid'
        const user = userNames[request.user_id];
        if (user) {
            setConnectedUser(user);
            setSelectedRequestUid(request.uid);
            setTimeout(1000); // Set timeout for the notification to disappear
            handleMessageModalOpen(false)
        } else {
            console.error('User details not found for request:', request);
        }
    };

    const onMessageSent = () => {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false); // Stop the confetti after 2 seconds
          setIsMessageModalOpen(false); // Close the modal
        }, 2000);
      };


    return (
        <>
            {/* Modal for sending message to user who made request: UserProfileCardOthers */}
            <Modal
                open={isMessageModalOpen}
                onClose={handleMessageModalClose}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleMessageModalClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                    <SendAMessage
  user={connectedUser}
  requestUid={selectedRequestUid}
  onMessageSent={onMessageSent} // Pass the new callback prop
  onClose={handleMessageModalClose} // Keep the onClose prop for the "X" icon
/>
                </Box>
            </Modal>
            {/* Modal for opening profile of user who made request: UserProfileCardOthers */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="user-profile-card-title"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '90vh', // Set a maximum height
                    overflow: 'auto' // Add a scrollbar if the content is too large
                }} >

                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            '&:hover': {
                                transform: 'scale(1.1)', // Slightly increase the size on hover
                            },
                        }}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>

                    {/* Conditionally render the UserProfileCardOthers component inside the Dialog */}
                    <UserProfileCardOthers userId={selectedUserId} birthday={birthdate[selectedUserId]} />
                </Box>
            </Modal>
            <Box>
                <Paper>
                    <Box m="20px">

                        <Typography variant="h6" className="font-bold text-green-900">Active for request {requests.name} 🔄 📋</Typography>

                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Climbing Style</TableCell>
                                    <TableCell>Material Needed</TableCell>
                                    <TableCell>You will climb with</TableCell>
                                    <TableCell>Message</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {requests.slice(0, showAll ? requests.length : 4).map((request, index) => {



                                    // Convert the startDate and endDate to moment objects
                                    const startDate = moment(request.time_data.startDate);
                                    const startTime = request.time_data.startTime;
                                    const endDate = moment(request.time_data.endDate);

                                    // Format the startDate and endDate
                                    const startDateStr = startDate.format('DD/MM/YYYY');
                                    const startDateStrWithTime = `${startDateStr} at ${startTime}`;

                                    const specificDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].filter(day => request.time_data[day] && request.time_data[day].length > 0);

                                    let dateDisplay = '';
                                    if (request.time_data.isCompletelyFlexible) {
                                        dateDisplay = 'Flexible';
                                    } else if (specificDays.length > 0) {
                                        dateDisplay = specificDays.slice(0, 3).join(', ') + (specificDays.length > 3 ? '... click for details' : '');
                                    } else if (startDate.isSame(endDate, 'day')) {
                                        dateDisplay = startDateStrWithTime;
                                    } else if (request.time_data.startDate && request.time_data.endDate) {
                                        dateDisplay = `${startDateStr} to ${endDate.format('DD/MM/YYYY')}`;
                                    } else {
                                        dateDisplay = startDateStrWithTime;
                                    }

                                    // Map over the needed_material object to create a list of materials
                                    const neededMaterialDisplay = Object.keys(request.needed_material).length === 0
                                        ? 'No material needed'
                                        : Object.entries(request.needed_material).map(([material, details]) => {
                                            return `${material}: ${details.amount || 'N/A'}`;
                                        }).join(', ');

                                    return (

                                        <TableRow sx={{
                                            '&:hover': {
                                                backgroundColor: '#9EC69B',
                                                cursor: 'pointer',
                                            },
                                        }}>
                                            <TableCell>{dateDisplay}</TableCell>
                                            <TableCell>{request.climbing_style.join(', ')}</TableCell>
                                            <TableCell>{neededMaterialDisplay}</TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                onClick={() => handleUserNameClick(request.user_id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {userNames[request.user_id]?.name} {userNames[request.user_id]?.lastName}
                                            </TableCell>
                                            <TableCell>{request.message}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => connectCard(request)}>
                                                    <MailOutlineIcon />
                                                </IconButton>

                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box display="flex" justifyContent="space-between" width="100%" padding={2} >


                        <Button
                            startIcon={showAll ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                            onClick={() => setShowAll(!showAll)}
                            disabled={requests.length <= 4}
                            style={{ color: requests.length > 4 ? 'black' : 'grey' }}
                        >
                            {showAll ? 'Click to see less' : 'Click to display all'}
                        </Button>

                        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={handleStartRequest}>Add new</Button>

                    </Box>
                </Paper>
            </Box>
        </>
    );

}

export default ActiveRequestonRoute;