import React from 'react';
import ReviewClimbingStyleCardSmall from '../scenes/finding-Partner/Wizard/reviewClimbingStyleCardSmall';
import psicobloc from "../../../styles/images/Deep Soloing.jpeg"
import iconboulder from "../../../styles/images/icon-boulder.png"
import climbingindoors from "../../../styles/images/indoors.png"
import quickdraw from "../../../styles/images/quickdraw.png"
import tradi from "../../../styles/images/tradi.png"
import boulderoutdoors from "../../../styles/images/boulderoutdoiors.png"
import { Avatar, Button, Box, Typography, Paper, Divider, Modal } from "@mui/material";
import UserProfileCardOthers from '../scenes/profileCard/profileCardOthers';
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const RequestCard = ({ request }) => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log("request is...", request)
    const timeMapping = {
        earlyMorning: 'Early Morning',
        morning: 'Morning',
        midday: 'Midday',
        afternoon: 'Afternoon',
        lateAfternoon: 'Late Afternoon',
        wholeDay: 'Whole Day',
    };

    const styleImages = {
        'Climb Indoors': climbingindoors,
        'Boulder Indoors': iconboulder,
        'Sports Climbing': quickdraw,
        'Traditional Climbing': tradi,
        'Deep water solo': psicobloc,
        'Boulder outdoors': boulderoutdoors,
    };

    return (
        
            <Paper sx={{ width: '50%', padding: 2, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative', '&:hover': { transform: 'scale(1.05)' } }} elevation={3}>

                <IconButton
                    aria-label="delete"

                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <DeleteIcon />
                </IconButton>
                <Box
                    sx={{
                        cursor: 'pointer',
                        padding: '5px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        borderRadius: '5px',
                        '&:hover': {
                            margin: '10px',
                            transition: '0.3s',
                            border: '2px solid #333',
                            borderRadius: '5px',
                            padding: '10px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                            transform: 'scale(1.1)',
                        },

                    }}
                    onClick={handleOpen}
                >
                    <Avatar
                        alt="User"
                        src={request.user.profile_picture}
                        sx={{
                            width: 150,
                            height: 150,
                            bgcolor: 'grey.300',
                            mb: 2,
                        }}
                    />
                    <Typography variant="h5" component="h2" style={{ marginTop: "20px" }}>
                        {request.user.name} {request.user.last_name}
                    </Typography>
                </Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
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
                                    transform: 'scale(1.1)', 
                                },
                            }}
                        >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                        <UserProfileCardOthers userId={request.user_id} />
                    </Box>
                </Modal>
                <Box sx={{ marginTop: 2 }}>
                    <Typography className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginY: 2 }} variant="h5" >📌 Wants to climb in: <span className="text-gray-700">{request.area}, {request.region} </span></Typography>
                    {request.selected_routes && request.selected_routes.length > 0 ? (
                        <>
                            <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }}>Selected Routes:</Typography>
                            <ul>
                                {request.selected_routes.map((routeString, index) => {
                                    try {
                                        // Parse the JSON string into an object
                                        const route = JSON.parse(routeString);
                                        return (
                                            <li key={index}>
                                                <Typography variant="body1">
                                                    • {route.name} ({route.route_style})
                                                </Typography>
                                            </li>
                                        );
                                    } catch (error) {
                                        console.error('Error parsing JSON string:', error);
                                        return null; // Return null or some fallback UI if parsing fails
                                    }
                                })}
                            </ul>
                        </>
                    ) : null}
                    <Divider />


                    <Typography variant="h5" sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }} className="text-green-900 ">⏳ 📅  The time that better fits :</Typography>
                    <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
                        {request.time_data.isCompletelyFlexible ? (
                            <Typography>Completely Flexible</Typography>
                        ) : request.time_data.startDate && request.time_data.endDate ? (
                            moment(request.time_data.startDate).isSame(moment(request.time_data.endDate), 'day') ? (
                                <Typography sx={{ fontWeight: 'fontWeightMedium', fontSize: '1.1rem', marginTop: 2 }} className="text-gray-700" >
                                    On: {moment(request.time_data.startDate).format('DD-MM-YYYY')} at {request.time_data.startTime}
                                </Typography>
                            ) : (
                                <Typography sx={{ fontWeight: 'fontWeightLight', fontSize: '1.1rem', marginTop: 2 }} className="text-gray-700" >
                                    I want to make a trip starting on : <span className='font-medium'>{moment(request.time_data.startDate).format('DD-MM-YYYY')}</span>  and finishing on : <span className='font-medium'>{moment(request.time_data.endDate).format('DD-MM-YYYY')}</span>
                                </Typography>
                            )
                        ) : (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                    request.time_data[day] && Array.isArray(request.time_data[day]) && request.time_data[day].length > 0 && (
                                        <Box sx={{ width: '30%', marginTop: 1 }}>
                                            <Typography className="text-gray-700" key={day}>
                                                <Typography component="span" variant="inherit" fontWeight="fontWeightMedium">
                                                    {day}:
                                                </Typography>
                                                {' '}
                                                {request.time_data[day].map(time => timeMapping[time]).join(', ')}
                                            </Typography>
                                        </Box>
                                    )
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Divider />

                    <Typography className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }} variant="h5" >🧗🏼 Style of climbing is:</Typography>
                    <Box sx={{ marginLeft: 2, marginBottom: 2 }}>

                        <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', flexWrap: 'wrap' }}>
                            {request.climbing_style.map(style => (
                                <ReviewClimbingStyleCardSmall
                                    key={style}
                                    image={styleImages[style]}
                                    text={style}
                                    isSelected={true}
                                    size="20px"
                                    disabled={true}
                                    style={{ margin: 1 }}
                                />

                            ))}
                        </div>
                    </Box>
                    <Divider />
                    <Box sx={{ marginTop: 2 }}>
                        {Object.values(request.material).some(value => value) && (
                            <>

                                <Typography variant="h5" className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }}>🛠️ 🧰 The climbing equipment {request.user.name} bring </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 2, marginBottom: 2 }}>
                                    {Object.entries(request.material).map(([item, value]) => (
                                        item !== 'Belay Device' && (
                                            <Box key={item} sx={{ width: '33.33%', padding: 1 }}>
                                                <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" key={item}>
                                                    • {item}: {value.amount && `x${value.amount}`}
                                                    {value.size && ` / Size - ${value.size}`}
                                                </Typography>
                                            </Box>
                                        )
                                    ))}
                                    {request.material['Belay Device'] && (
                                        <Box sx={{ width: '33.33%', padding: 1 }}>
                                            <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" >• Belay Device: {request.material['Belay Device']}</Typography>
                                        </Box>)}
                                </Box>
                                <Divider />
                            </>
                        )}
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        {Object.values(request.needed_material).some(value => value) && (
                            <>
                                <Typography variant="h5" className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }}> 🛠️ ♻️ The material {request.user.name} needs you to bring</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 2, marginBottom: 2 }}>
                                    {Object.entries(request.needed_material).map(([item, value]) => (
                                        item !== 'Belay Device' && (
                                            <Box key={item} sx={{ width: '33.33%', padding: 1 }}>
                                                <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" key={item}>
                                                    • {item}: {value.amount && `x${value.amount}`}
                                                    {value.size && `, Size - ${value.size}`}
                                                </Typography>
                                            </Box>
                                        )
                                    ))}
                                    {request.needed_material['Belay Device'] && (
                                        <Box sx={{ width: '33.33%', padding: 1 }}>
                                            <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" > • Belay Device: {request.needed_material['Belay Device']}</Typography>
                                        </Box>
                                    )}
                                </Box>
                                <Divider />
                            </>
                        )}
                    </Box>





                    <Typography variant="h5" className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }}>{request.user.name}'s message 📣 💬</Typography>
                    <Paper elevation={3} sx={{ padding: 2, marginTop: 1, marginBottom: 2, width: '100%' }}>

                        {request.message ? (
                            <Typography>{request.message}</Typography>
                        ) : (
                            <Typography sx={{ color: 'grey.500', fontStyle: 'italic' }}>No message provided.</Typography>
                        )}
                    </Paper>

                    <Divider />
                </Box>
            </Paper>

        
    );

};

export default RequestCard;