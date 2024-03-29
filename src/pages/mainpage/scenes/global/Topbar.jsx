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
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Badge from '@mui/material/Badge';
import { useCheckAuthentication } from "../../../Website/Auth/auth";


// All pages within the app has a Topbar, this is displayed always on top and offer search, settings, profile , notifications.
const Topbar = () => {
    const [openNotifications, setOpenNotifications] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);


    const { isAuthenticated } = useCheckAuthentication();
    const [user, setUser] = useState({});

 useEffect(() => {
   if (isAuthenticated) {
     fetch(`${process.env.REACT_APP_BACKEND_URL}/show-profile`, {
       method: "GET",
       headers: {
         'Authorization': `Bearer ${localStorage.getItem('token')}`
       },
     })
       .then(res => {
         const contentType = res.headers.get("content-type");
         if (contentType && contentType.indexOf("application/json") !== -1) {
           return res.json();
         } else {
           throw new Error('Server response is not JSON');
         }
       })
       .then(data => {
         console.log('Data received from server:', data);
         setUser(data.user);
       })
       .catch(err => {
         console.error("Error:", err);
       });
   }
 }, [isAuthenticated]);


    console.log("notifications", notifications)


    useEffect(() => {
        const fetchNewMessages = async () => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/newMessages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setNewMessagesCount(data.newMessagesCount);
                })
                .catch(error => {
                    console.error('Error fetching new messages:', error);
                });
        };

        fetchNewMessages();
    }, []); // Add any dependencies here

    useEffect(() => {
        const fetchNewNotifications = async () => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getNotifications`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setNotifications(data);
                    setUnreadNotificationsCount(data.length);
                })
                .catch(error => {
                    console.error('Error fetching notifications:', error);
                });


        };
        fetchNewNotifications();
    }, []);

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
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search?term=${searchTerm}`);
            const results = await response.json();
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2} backgroundColor="#16422B">
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

                {searchResults.length > 0 && (
                    <Card style={{ position: 'absolute', zIndex: 10001, top: '100%', width: '300px', marginTop: '10px' }}>
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
                                            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searchNavigation/route-details/${result.name}`);
                                            const details = await response.json();
                                            url += `/${details.country}/${details.region}/${details.area}/${details.route}`;
                                        } else if (result.type === 'Area') {
                                            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searchNavigation/area-details/${result.name}`);
                                            const details = await response.json();
                                            url += `/${details.country}/${details.region}/${result.name}`;
                                        } else if (result.type === 'Region') {
                                            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searchNavigation/region-details/${result.name}`);
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
                    <Badge badgeContent={unreadNotificationsCount} color="error">
                        <NotificationsOutlinedIcon className="mx-1" style={{ color: "#f0f8c7" }} />
                    </Badge>
                </IconButton>

                <IconButton onClick={() => navigate('/inbox')}>
                    <Badge badgeContent={newMessagesCount} color="error">
                        <MailOutlineIcon className="mx-1" style={{ color: "#f0f8c7" }} />
                    </Badge>
                </IconButton>
                {openNotifications && <NotificationTop setOpen={setOpenNotifications} notifications={notifications} />}
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