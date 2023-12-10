import { Box, IconButton, List, ListItem, ListItemText, Card } from "@mui/material";
import { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationTop from "./NotificationTop";
import ProfileDropdown from "./ProfileDropdown";
import SettingsDropdown from "./SettingsDropdown";
import { useNavigate } from "react-router-dom";


// All pages within the app has a Topbar, this is displayed always on top and offer search, settings, profile , notifications.
const Topbar = () => {
    const [openNotifications, setOpenNotifications] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const timeoutId = setTimeout(fetchSearchResults, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Function to handle notifications toggle
    const handleToggleNotifications = () => {
        setOpenNotifications((prevOpen) => !prevOpen);
        setOpenProfile(false);
        setOpenSettings(false);
    };
    // Function to handle profile toggle
    const handleToggleProfile = () => {
        setOpenProfile((prevOpen) => !prevOpen);
        setOpenNotifications(false);
        setOpenSettings(false);
    };

    // Function to handle settings toggle
    const handleToggleSettings = () => {
        setOpenSettings((prevOpen) => !prevOpen);
        setOpenNotifications(false);
        setOpenProfile(false);
    };

    const fetchSearchResults = async () => {
        if (searchTerm.length >= 3) {
            const response = await fetch(`http://localhost:3001/search?term=${searchTerm}`);
            const results = await response.json();
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2} backgroundColor="#4F6F52">
            {/* SEARCH BAR */}
         <Box position="relative">
                <Box
                    display="flex"
                    backgroundColor="#f9f9f5"
                    borderRadius="3px"
                     
                >
                    <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Search"
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                    </IconButton>
                    </Box>
                {/* SEARCH RESULTS */}
                {/* SEARCH RESULTS */}
        {searchResults.length > 0 && (
            <Card style={{ position: 'absolute', zIndex: 1, top: '100%', width: '300px', marginTop: '10px' }}>
                <List>
                    {searchResults.map((result, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#9EC69B',
                                    cursor: 'pointer',
                                },
                            }}
                            onClick={async () => {
                                let url = '/climbing-locations';
                                if (result.type === 'Route') {
                                  const response = await fetch(`http://localhost:3001/searchNavigation/route-details/${result.name}`);
                                  const details = await response.json();
                                  url += `/${details.country}/${details.region}/${details.area}/${details.route}`;
                                } else if (result.type === 'Area') {
                                  const response = await fetch(`http://localhost:3001/searchNavigation/area-details/${result.name}`);
                                  const details = await response.json();
                                  url += `/${details.country}/${details.region}/${result.name}`;
                                } else if (result.type === 'Region') {
                                  const response = await fetch(`http://localhost:3001/searchNavigation/region-details/${result.name}`);
                                  const details = await response.json();
                                  url += `/${details.country}/${result.name}`;
                                } else if (result.type === 'Country') {
                                  url += `/${result.name}`;
                                }
                                navigate(url);
                              }}
                        >
                            <ListItemText primary={`${result.name} (${result.type})`} />
                        </ListItem>
                    ))}
                </List>
            </Card>
        )}
    </Box>
            {/* ICONS */}
            <Box display="flex" style={{ marginRight: 50, padding: 0, position: 'relative' }}>
                <IconButton onClick={handleToggleNotifications} >
                    <NotificationsOutlinedIcon className="mx-1" style={{ color: "#f0f8c7" }} />
                </IconButton>
                {openNotifications && <NotificationTop setOpen={setOpenNotifications} />}
                <IconButton onClick={handleToggleSettings}>
                    <SettingsOutlinedIcon className="mx-1" style={{ color: "#f0f8c7" }} />
                </IconButton>
                {openSettings && <SettingsDropdown setOpen={setOpenSettings} />}
                <IconButton onClick={handleToggleProfile}>
                    <PersonOutlinedIcon className="mx-1" style={{ color: "#f0f8c7" }} />
                </IconButton>
                {openProfile && <ProfileDropdown setOpen={setOpenProfile} />}
            </Box>
        </Box>
    );
};

export default Topbar;