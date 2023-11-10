import { Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationTop from "./NotificationTop";
import ProfileDropdown from "./ProfileDropdown";
import SettingsDropdown from "./SettingsDropdown";

const Topbar = () => {
    const [openNotifications, setOpenNotifications] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    const handleToggleNotifications = () => {
        setOpenNotifications((prevOpen) => !prevOpen);
        setOpenProfile(false);
        setOpenSettings(false);
    };

    const handleToggleProfile = () => {
        setOpenProfile((prevOpen) => !prevOpen);
        setOpenNotifications(false);
        setOpenSettings(false);
    };

    const handleToggleSettings = () => {
        setOpenSettings((prevOpen) => !prevOpen);
        setOpenNotifications(false);
        setOpenProfile(false);
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2} backgroundColor="#4F6F52">
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor="#f9f9f5"
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            
            {/* ICONS */}
            <Box display="flex" style={{ marginRight: 50, padding: 0, position: 'relative' }}>
                <IconButton onClick={handleToggleNotifications} >
                    <NotificationsOutlinedIcon className="mx-1" style={{ color: "#f0f8c7" }} />
                </IconButton>
                {openNotifications && <NotificationTop  setOpen={setOpenNotifications} />}
                <IconButton onClick={handleToggleSettings}>
                    <SettingsOutlinedIcon className="mx-1" style={{ color: "#f0f8c7" }} />
                </IconButton>
                {openSettings && <SettingsDropdown setOpen={setOpenSettings} />}
                <IconButton onClick={handleToggleProfile}>
                    <PersonOutlinedIcon className="mx-1"  style={{ color: "#f0f8c7" }} />
                </IconButton>
                {openProfile && <ProfileDropdown setOpen={setOpenProfile} />}
            </Box>
        </Box>
    );
};

export default Topbar;