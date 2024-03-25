import React, { useState, useEffect } from 'react';
import psicobloc from '../../../../../styles/images/Deep Soloing.jpeg'
import iconboulder from "../../../../../styles/images/icon-boulder.png"
import climbingindoors from "../../../../../styles/images/indoors.png"
import quickdraw from "../../../../../styles/images/quickdraw.png"
import tradi from "../../../../../styles/images/tradi.png"
import boulderoutdoors from "../../../../../styles/images/boulderoutdoiors.png"
import ReviewClimbingStyleCardSmall from '../Wizard/reviewClimbingStyleCardSmall';
import { Avatar, Button, Box, Typography, Paper, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';





const RequestDetails = () => {

  const [user, setUser] = useState({})
  const { request: uid } = useParams();
  const [requestInfo, setRequestInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();


  function handleDelete(request) {
    setSelectedRequest(request);
    setShowModal(true);
  }
  

  function handleConfirmDelete() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/deleteRequest/${selectedRequest.uid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received from server:', data);
         // Close the modal
    setShowModal(false);
    // Show success dialog
    setShowSuccessDialog(true);
    // After 1 second, redirect to /dashboard and close the success dialog
    setTimeout(() => {
      navigate('/dashboard');
      setShowSuccessDialog(false);
    }, 1000);
  })
      .catch(err => {
        console.error("Error:", err);
      });
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/show-profile`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          throw new Error('Server response is not JSON');
        }
      })
      .then(data => {
        console.log('Data received from server:', data);
        setUser(data.user);

      })
      .catch(err => {
        console.error("Error:", err);
      });
  }, [uid]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getActiveRequest/${uid}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          throw new Error('Server response is not JSON');
        }
      })
      .then(data => {
        console.log('Data received for request:', data);
        setRequestInfo(data)
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setIsLoading(false);
      });
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }



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
    <>
      <Paper sx={{ width: '50%', padding: 2, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, position: 'relative' }} elevation={3}>

        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(requestInfo)}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <DeleteIcon />
        </IconButton>

        <Avatar
          alt="User"
          src={user.profile_picture}
          sx={{
            width: 150,
            height: 150,
            bgcolor: 'grey.300'
          }}
        />
        <Typography variant="h5" component="h2">
          {user.name} {user.last_name}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Typography className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginY: 2 }} variant="h5" >📌 Wants to climb in : <span className="text-gray-700">{requestInfo.area}, {requestInfo.region} </span></Typography>
          {requestInfo.selected_routes && requestInfo.selected_routes.length > 0 ? (
    <>
      <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }}>Selected Routes:</Typography>
      <ul>
        {requestInfo.selected_routes.map((routeString, index) => {
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


          <Typography variant="h5" sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }} className="text-green-900 ">⏳ 📅  The time that fits me best is </Typography>
          <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
            {requestInfo.time_data.isCompletelyFlexible ? (
              <Typography>Completely Flexible</Typography>
            ) : requestInfo.time_data.startDate && requestInfo.time_data.endDate ? (
              moment(requestInfo.time_data.startDate).isSame(moment(requestInfo.time_data.endDate), 'day') ? (
                <Typography sx={{ fontWeight: 'fontWeightMedium', fontSize: '1.1rem', marginTop: 2 }} className="text-gray-700" >
                  On: {moment(requestInfo.time_data.startDate).format('DD-MM-YYYY')} at {requestInfo.time_data.startTime}
                </Typography>
              ) : (
                <Typography sx={{ fontWeight: 'fontWeightLight', fontSize: '1.1rem', marginTop: 2 }} className="text-gray-700" >
                  I want to make a trip starting on : <span className='font-medium'>{moment(requestInfo.time_data.startDate).format('DD-MM-YYYY')}</span>  and finishing on : <span className='font-medium'>{moment(requestInfo.time_data.endDate).format('DD-MM-YYYY')}</span>
                </Typography>
              )
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  requestInfo.time_data[day] && Array.isArray(requestInfo.time_data[day]) && requestInfo.time_data[day].length > 0 && (
                    <Box sx={{ width: '30%', marginTop: 1 }}>
                      <Typography className="text-gray-700" key={day}>
                        <Typography component="span" variant="inherit" fontWeight="fontWeightMedium">
                          {day}:
                        </Typography>
                        {' '}
                        {requestInfo.time_data[day].map(time => timeMapping[time]).join(', ')}
                      </Typography>
                    </Box>
                  )
                ))}
              </Box>
            )}
          </Box>
          <Divider />

          <Typography className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }} variant="h5" >🧗🏼 I want to practice</Typography>
          <Box sx={{ marginLeft: 2, marginBottom: 2 }}>

            <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', flexWrap: 'wrap' }}>
              {requestInfo.climbing_style.map(style => (
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
 {requestInfo.material && Object.keys(requestInfo.material).length > 0 ? (
    <>
      <Typography variant="h5" className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }}>🛠️ 🧰 The climbing equipment I bring </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 2, marginBottom: 2 }}>
        {Object.entries(requestInfo.material).map(([item, value]) => (
          item !== 'Belay Device' && (
            <Box key={item} sx={{ width: '33.33%', padding: 1 }}>
              <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" key={item}>
                • {item}: {value.amount && `x${value.amount}`}
                {value.size && ` / Size - ${value.size}`}
              </Typography>
            </Box>
          )
        ))}
        {requestInfo.material['Belay Device'] && (
          <Box sx={{ width: '33.33%', padding: 1 }}>
            <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" >• Belay Device: {requestInfo.material['Belay Device']}</Typography>
          </Box>
        )}
      </Box>
      <Divider />
    </>
 ) : (
    <Typography variant="body1" className="text-gray-700" sx={{ marginTop: 2 }}>
      No climbing equipment will be brought.
    </Typography>
 )}
</Box>

          <Box sx={{ marginTop: 2 }}>
 {requestInfo.needed_material && Object.keys(requestInfo.needed_material).length > 0 ? (
    <>
      <Typography variant="h5" className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }}> 🛠️ ♻️ The material I need you to bring</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft: 2, marginBottom: 2 }}>
        {Object.entries(requestInfo.needed_material).map(([item, value]) => (
          item !== 'Belay Device' && (
            <Box key={item} sx={{ width: '33.33%', padding: 1 }}>
              <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" key={item}>
                • {item}: {value.amount && `x${value.amount}`}
                {value.size && `, Size - ${value.size}`}
              </Typography>
            </Box>
          )
        ))}
        {requestInfo.needed_material['Belay Device'] && (
          <Box sx={{ width: '33.33%', padding: 1 }}>
            <Typography sx={{ fontWeight: 'fontWeightMedium' }} className="text-gray-700" > • Belay Device: {requestInfo.needed_material['Belay Device']}</Typography>
          </Box>
        )}
      </Box>
      <Divider />
    </>
 ) : (
    <Typography variant="body1" className="text-gray-700" sx={{ marginTop: 2 }}>
      No additional material is needed for this request.
    </Typography>
 )}
</Box>




          <Typography variant="h5" className="text-green-900 " sx={{ fontWeight: 'fontWeightBold', marginTop: 2 }}>Message 📣 💬</Typography>
          <Paper elevation={3} sx={{ padding: 2, marginTop: 1, marginBottom: 2, width: '100%' }}>

            {requestInfo.message ? (
              <Typography>{requestInfo.message}</Typography>
            ) : (
              <Typography sx={{ color: 'grey.500', fontStyle: 'italic' }}>No message provided.</Typography>
            )}
          </Paper>

          <Divider />
        </Box>
      </Paper>
      <Dialog
    open={showModal}
    onClose={() => setShowModal(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
>
    <DialogTitle id="alert-dialog-title">{"Delete Request"}</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this request?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setShowModal(false)} color="primary">
            Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="primary" variant="contained" autoFocus>
            Delete
        </Button>
    </DialogActions>
</Dialog>
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Request Deleted"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your request was successfully deleted.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );

};

export default RequestDetails;