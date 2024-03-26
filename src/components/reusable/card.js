import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

export default function ActionAreaCard({ title, description, link, imageUrl, IconComponent }) {
 return (
    <Card sx={{ position: 'relative', maxWidth: 345 }}>
      <CardActionArea component={Link} to={link}>
        <CardMedia
          component="img"
          height="100"
          image={imageUrl}
          alt={title}
          sx={{ position: 'relative' }}
        />
        
        <Box sx={{ position: 'relative', paddingTop: '14px' }}> 
          
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <IconButton
            aria-label={`${title} icon`}
            sx={{
              position: 'absolute',
              top: 50, 
              left: '80%', 
              transform: 'translateX(-50%)', 
              color: 'black',
              fontSize: '48px',
            }}
          >
            <IconComponent style={{ width: '45px', height: '45px' }} /> 
          </IconButton>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
 );
}