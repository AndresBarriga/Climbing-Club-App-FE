// NewCard.jsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PublicIcon from '@mui/icons-material/Public';
import DirectionsIcon from '@mui/icons-material/Directions';
import LaunchIcon from '@mui/icons-material/Launch';
import mountain from "../../../../styles/images/routeDetails:mountain.jpeg"
import gym from "../../../../styles/images/routeDetails:Gym.jpeg"; 
import boulder from "../../../../styles/images/routeDetails:boulder.jpeg";



const CardLocations = ({ route, handleNavigate, handleDelete }) => {
    const backgroundImage = route.route_style === "Wall" ? mountain :
    route.route_style === "Gym" ? gym :
    (route.route_style === "Boulder" || route.route_style === "Urban Boulder") ? boulder :
    null;

    const iconStyle = {
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.1)',
          color: 'rgba(0, 0, 0, 0.87)', // Change the color to a darker shade on hover
        },
      };

      

 return (
    <Card sx={{ position: 'relative', maxWidth:200, cursor: 'pointer' }} onClick={() => handleNavigate(route)}>
        <CardMedia
          component="img"
          height="80"
          image={backgroundImage}
          alt={route.name}
          sx={{ position: 'relative' }}
        />
        <Box sx={{ position: 'relative', paddingTop: '14px' }}> {/* Container for text content */}
          
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {route.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {route.area}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Style: {route.route_style}
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                 Helpful Links
                </Typography>
                <IconButton onClick={(event) => { event.stopPropagation(); window.open(route.link_site, "_blank"); }} sx={iconStyle}>

                 <PublicIcon />
                </IconButton>
                <IconButton onClick={(event) => { event.stopPropagation(); window.open(route.link_maps, "_blank");}} sx={iconStyle}>

                 <DirectionsIcon />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                 Actions
                </Typography>
                <IconButton onClick={(event) => { event.stopPropagation(); handleNavigate(route); }} sx={iconStyle}>

                 <LaunchIcon />
                </IconButton>
                <IconButton onClick={(event) => { event.stopPropagation(); handleDelete(event, route);}} sx={iconStyle}>

                 <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Box>
      
    </Card>
 );
};

export default CardLocations 