import React from 'react';
import { useMediaQuery } from 'react-responsive';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';



function ClimbingStyleCard({ image, text, onClick, isSelected }) {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });

    const cardStyle = {
        width: '30%',
        height: '300px',
        position: 'relative',
        margin: isSmallScreen ? '10px 0' : '10px',
        
    };

    const cardStyle2 = {
        border: isSelected ? '4px solid green' : 'none'
    };
    return (
        <div style={cardStyle} onClick={() => onClick(text)}>
          <Card style={cardStyle2}sx={{ maxWidth: 150 }}>
            <CardMedia
              sx={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={image}
                alt={text}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
              />
            </CardMedia>
            <CardContent>
              <Typography  variant="h6" >
                {text}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }

export default ClimbingStyleCard;