import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MapIcon from '@mui/icons-material/Map';
import SchoolIcon from '@mui/icons-material/School';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { green, grey } from "@mui/material/colors";



// Item component for the sidebar
const Item = ({ title, to, icon, selected, setSelected }) => {
 
    return (
        <Link to={to}>
          <MenuItem
            active={selected === title}
            style={{
              color: grey,
            }}
            onClick={() => setSelected(title)}
            icon={icon}
          >
            <Typography>{title}</Typography>
          </MenuItem>
        </Link>
      );
    };


// Every page in the app has a Sidebar
// Side component helps the user to navigate thorugh the website.

const SideBar = () => {
  // State for sidebar collapse and selected item
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (

    <Box className="mySidebar"  
      sx={{
        height: '100vh !important',
        "& .pro-sidebar": {
            height: '100vh !important',
          },
        "& .pro-sidebar-inner": {
          background: `#739072 !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#B6BA45 !important",
        },
        "& .pro-menu-item.active": {
          color: "#E0E399 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "0px 0 20px 0",
              color: grey,
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" className="font-bold" style={{ color: 'black' }}> 
                  My Profile     
                </Typography>
                <IconButton className="mx-6"onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center" >
                <img
                  alt="profile-user"
                  width="150px"
                  height="80px"
                  src="https://i.ibb.co/6BM48Gb/profile-picture.jpg"
                  style={{ cursor: "pointer", borderRadius: "50%", transition: "transform 0.3s ease-in-out", 
                  '&:hover': {
                    transform: "scale(1.1)"}
                }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={grey}
                  fontWeight="bold"
                >
                  Andrés Barriga
                </Typography>
                <Typography variant="h5" color={green}>
                  Passionate climber
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={grey}
              sx={{ m: "15px 0 5px 20px" }}
            >

              Features
            </Typography>
            <Item
              title="Climbing Locations"
              to="/climbing-locations"
              icon={<MapIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Find a Climbing Partner"
              to="/find-parter"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Events"
              to="/events"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
<Divider style={{ height: '2px', backgroundColor: '#373737' }} />
            <Typography
              variant="h6"
              color={grey}
              sx={{ m: "15px 0 5px 20px" }}
            >
             PAGES
            </Typography>
            <Item
              title="Education & Content"
              to="/education-content"
              icon={<SchoolIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && <div style={{ height:100, background: '#739072' }} />}
             {isCollapsed && <div style={{ height:350, background: '#739072' }} />}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>

  );
};

export default SideBar;