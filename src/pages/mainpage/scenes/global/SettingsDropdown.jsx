import { Box, Typography, Divider, Card, IconButton } from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import AccountSettingsIcon from "@mui/icons-material/Settings";
import PrivacyCenterIcon from "@mui/icons-material/PrivacyTip";
import FeedbackIcon from "@mui/icons-material/Feedback";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

// COMPONENT Rendered within TopBar is a menu with option to navigate to settings
const SettingsDropdown = ({ setOpen }) => {
  return (
    <Card style={{ position: 'absolute', zIndex: 1, top: '100%', right: 0, width: '300px', marginTop: '10px' }}>
      <Box p={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Settings</Typography>
          <IconButton size="small" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center"  style={{marginTop:10, marginBottom:5 }}>
          <SupportIcon />
          <Link to="/support"><Typography style={{marginLeft : 10 }}>Support</Typography></Link>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center "  style={{marginTop:10, marginBottom:5 }}>
          <AccountSettingsIcon />
          <Link to="/account-settings"><Typography style={{marginLeft : 10 }}>Account Settings</Typography></Link>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center"  style={{marginTop:10, marginBottom:5 }}>
          <PrivacyCenterIcon />
          <Link to="/privacy-center"><Typography style={{marginLeft : 10 }} >Privacy Center</Typography></Link>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center"  style={{marginTop:10, marginBottom:5 }}>
          <FeedbackIcon />
          <Link to="/feedback"><Typography style={{marginLeft : 10 }}>Feedback</Typography></Link>
        </Box>
      </Box>
    </Card>
  );
};

export default SettingsDropdown;