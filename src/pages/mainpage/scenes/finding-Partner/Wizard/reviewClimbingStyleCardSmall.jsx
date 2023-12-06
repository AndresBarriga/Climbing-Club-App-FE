import React from 'react';
import { useMediaQuery } from 'react-responsive';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


//Each of the cards presentent on the parent component are created here (ClimbingStyle.js)
function ReviewClimbingStyleCardSmall({ image, text, onClick, isSelected }) {
    // Screen responsivenbess
    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
    
    const cardStyle = {
        flex: '1 0 auto', // make the width flexible
        height: '100px',
        maxWidth: '30%', // set a maximum width
        margin: isSmallScreen ? '10px 0' : '10px', 
    }
  


    return (
        <div style={cardStyle}>
          <Card sx={{ maxWidth: 75 }}>
            <CardMedia
              sx={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={image}
                alt={text}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
              />
            </CardMedia>
            <CardContent style={{ padding: 1 }}>
              <Typography  variant="body2" >
                {text}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }



export default ReviewClimbingStyleCardSmall;