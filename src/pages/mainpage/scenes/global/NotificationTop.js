import { Box, Typography, Divider, Card, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { format, differenceInMinutes } from 'date-fns';
import Badge from '@mui/material/Badge';
import { useEffect, useState } from "react";




// COMPONENT Rendered within TopBar is a menu with option to see the notifications

const NotificationTop = ({ setOpen, notifications }) => {
  // This is a placeholder for actual data
  console.log("notifications on component", notifications)
 
  const [showAll, setShowAll] = useState(false);
  
  const handleNotificationClick = async (notification) => {
    // Check if the notification is a placeholder
    if (notification.icon === null && notification.content === "No new notifications at the moment, keep reaching for new heights!") {
       // This is a placeholder, do nothing
       console.log('Placeholder clicked, no action taken.');
       return;
    }
   
    try {
       await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notificationRead/${notification.notification_id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}`
         },
         body: JSON.stringify({ read: true }),
       });
   
       // Redirect to the request details page
       window.location.href = `/request-details/${notification.request_id}`;
    } catch (error) {
       console.error('Failed to update notification status', error);
    }
   };

   const noNotificationsMessage = {
    icon: null, // Or any other appropriate icon
    content: "No new notifications at the moment, keep reaching for new heights!",
    created_at: new Date().toISOString(), // Current date and time
    // Add any other properties needed for the message
  };

  const combinedNotifications = notifications.length >  0 ? notifications : [noNotificationsMessage];
  

  const displayedNotifications = showAll ? combinedNotifications : combinedNotifications.slice(0,  3);

  

  return (
    <Card style={{ position: 'absolute', zIndex: 1, top: '100%', right: 70, width: '350px', marginTop: '10px' }}>
      <Box p={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Notifications</Typography>
          <IconButton size="small" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {displayedNotifications.map((notification, index) => (
          <Box 
            style={{marginTop: 10, padding: 5, cursor: 'pointer'}}
            key={index}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => handleNotificationClick(notification)}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {notification.icon}
              <Typography variant="body2" color="textSecondary">{notification.content}</Typography>
              <Typography variant="body2">{format(new Date(notification.created_at), 'hh:mm a')}</Typography>
            </Box>
            <Typography variant="caption" color="textSecondary">{differenceInMinutes(new Date(), new Date(notification.created_at))} min ago</Typography>
            <Divider />
          </Box>
        ))}
        {notifications.length > 3 && (
          <Typography 
            style={{marginTop: 10, cursor: 'pointer'}} 
            className="block w-full rounded bg-green-700 px-4 py-1 text-sm font-medium text-white shadow hover:bg-white hover:text-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto"

            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View Less' : 'View All'}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default NotificationTop;