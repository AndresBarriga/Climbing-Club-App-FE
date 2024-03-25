import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography'; // Import Typography for text styling

const locales = {
 'en-US': enUS,
};

const localizer = dateFnsLocalizer({
 format,
 parse,
 startOfWeek,
 getDay,
 locales,
});

// Custom event component
const MyEvent = ({ event }) => (
 <span>
    <strong>{event.title}</strong>
    <p>{event.desc}</p>
    <RouterLink to={event.url} target="_blank" rel="noopener noreferrer">View Details</RouterLink>
 </span>
);

const MyCalendar = ({ events = [] }) => {
 const [selectedEvent, setSelectedEvent] = useState(null);
 const [open, setOpen] = useState(false);

 const handleSelectEvent = (event) => {
   setSelectedEvent(event);
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };

 return (
 <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      components={{
        event: MyEvent, 
      }}
      onSelectEvent={handleSelectEvent} 
    />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: '500px' }}>
        {selectedEvent && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <Typography variant="h6" component="div">
                {selectedEvent.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedEvent.desc}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
 component={RouterLink} 
 to={selectedEvent.url}
 variant="contained"
 startIcon={<AddCircleOutlineIcon />}
 className="block w-full rounded bg-green-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"
>  
 View details
</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
 </div>
 );
};

export default MyCalendar;