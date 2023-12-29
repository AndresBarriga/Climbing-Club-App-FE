
import React, { useState } from 'react';
import { Box, TextField, Button, Divider } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';


export function SendAMessage({ user, requestUid , onClose}) {
    console.log("MY USER IS ::::",user)
    console.log("My request is : ",requestUid)
  

    const [message, setMessage] = React.useState('');
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); 
    
    const maxChars = 140;

    const submit = (event) => {
        const inputValue = event.target.value;
       
        // Check if the input value exceeds the maximum characters
        if (inputValue.length <= maxChars) {
            setMessage(inputValue);
            sendMessage(inputValue); 
          setIsMessageSent(true); // Set isMessageSent to true
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 6000); // Stop the confetti after 5 seconds
       
          // Set isMessageSent back to false after 1 second
          setTimeout(() => {
            setIsMessageSent(false);
            onClose(); // Close the component
          }, 6000);
        }
      };
     
       const sendMessage = (message) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/sendMessage/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            receiver_id: user.user_id,
            request_id: requestUid,
            content: message,
          }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Message sent:', data);
            // Handle the response
          })
          .catch(error => {
            console.error('Error sending message:', error);
          });
      };

      return (
        <Box sx={{ width: '100%' , height: '30vh'}}>
          {isMessageSent ? (
            <>
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
              />
              <h1 className=" text-base sm:text-xl text-green-900 font-extrabold  sm:mx-4 mb-2 sm:py-2">Your message was sent, wait for the other climber to answer you</h1>
              
            </>
          ) : (
            <>
              <h1 className=" text-base sm:text-xl text-green-900 font-extrabold  sm:mx-4 mb-2 sm:py-2">Send a message to {user.name} & connect to climb together!</h1>
              <Divider></Divider>
      
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 2,
                }}
              >
                <div style={{ width: '80%' }}>
                  <TextField
                    label="Share your message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    min={0}
                    multiline
                    rows={3}
                    sx={{ width: '100%', }}
                    InputProps={{
                      endAdornment: <p>{message.length}/{maxChars}</p>,
                      maxLength: maxChars,
                    }}
                  />
                </div>
              </Box>
      
              <Box display="flex" justifyContent="flex-end">
                <Button
                  endIcon={<MailOutlineIcon style={{ fontSize: '25px' }} />}
                  onClick={submit}
                  variant="contained"
                  className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
                  sx={{'&:hover': {
                    transform: 'scale(1.1)', // Slightly increase the size on hover
                  }}}
                >
                  Send
                </Button>
              </Box>
            </>
          )}
        </Box>
      );
}

