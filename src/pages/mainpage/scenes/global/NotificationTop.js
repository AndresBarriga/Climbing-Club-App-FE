import { Box, Typography, Divider, Card, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { format, differenceInMinutes } from 'date-fns';

const NotificationTop = ({ setOpen }) => {
  // This is a placeholder for your actual data
  const notifications = [
    { icon: <NotificationsIcon />, text: "Notification 1", timestamp: new Date() },
    { icon: <NotificationsIcon />, text: "Notification 2", timestamp: new Date() },
  ];

  return (
    <Card style={{ position: 'absolute', zIndex: 1, top: '100%', right: 70, width: '300px', marginTop: '10px' }}>
      <Box p={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Notifications</Typography>
          <IconButton size="small" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {notifications.map((notification, index) => (
          <Box style={{marginTop : 10 }} key={index}>
             <Box display="flex" justifyContent="space-between" alignItems="center">
            {notification.icon}
            <Typography>{notification.text}</Typography>
            <Typography>{format(notification.timestamp, 'hh:mm a')}</Typography>
            </Box>
            <Typography color="textSecondary">{differenceInMinutes(new Date(), notification.timestamp)} min ago</Typography>
            <Divider />
          </Box>
        ))}
        <Typography style={{marginTop : 10 }} color="primary">View All</Typography>
      </Box>
    </Card>
  );
};

export default NotificationTop;