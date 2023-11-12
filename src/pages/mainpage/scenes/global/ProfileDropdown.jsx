import { Box, Typography, Divider, Card, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import BillingIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import LogoutButton from "../../../../components/reusable/LogoutButton";

// COMPONENT Rendered within TopBar is a menu with option to navigate to profile
const ProfileDropdown = ({ setOpen }) => {
  return (
    <Card style={{ position: 'absolute', zIndex: 1, top: '100%', right: 0, width: '300px', marginTop: '10px' }}>
    <Box p={2}>
    <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">My Profile</Typography>
          <IconButton size="small" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      <Box mb="15px">
      <Divider style={{marginTop:10, marginBottom:5 }} />
        <Box display="flex" justifyContent="center" alignItems="center" >
        <div
              style={{ 
                width: "75px", 
                height: "75px", 
                borderRadius: "50%", 
                backgroundImage: "url('https://i.ibb.co/6BM48Gb/profile-picture.jpg')", 
                backgroundSize: "cover", 
                backgroundPosition: "center center", 
                cursor: "pointer", 
                transition: "transform 0.3s ease-in-out", 
                '&:hover': {
                  transform: "scale(1.1)"
                }
              }}
            />
        </Box>
        <Box textAlign="center">
          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Andrés Barriga
          </Typography>
          <Typography variant="body2">
            Passionate climber
          </Typography>
        </Box>
      </Box>
     
        <Box display="flex" alignItems="center" style={{marginTop:10, marginBottom:5 }}>
          <EditIcon />
          <Link to="/edit-profile"><Typography style={{marginLeft : 10 }}>Edit Profile</Typography></Link>
          
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" style={{marginTop : 10 , marginBottom:5}}>
          <ViewIcon />
          <Link to="/view-profile"><Typography style={{marginLeft : 10}} >View Profile</Typography></Link>
          
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" style={{marginTop : 10, marginBottom:5 }}>
          <BillingIcon />
          <Link to="/billing"><Typography style={{marginLeft : 10  }} >Billing</Typography></Link>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" style={{marginTop : 10 , marginBottom:5}}>
          <LogoutIcon />
          <LogoutButton />
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileDropdown;