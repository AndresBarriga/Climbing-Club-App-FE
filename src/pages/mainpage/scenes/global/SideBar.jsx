import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, Avatar } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MapIcon from '@mui/icons-material/Map';
import SchoolIcon from '@mui/icons-material/School';
import { green, grey } from "@mui/material/colors";
import { useCheckAuthentication, loginMessage } from "../../../Website/Auth/auth";



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


  const [selected, setSelected] = useState("Dashboard");
  const [firstRender, setFirstRender] = useState(true);
  const { isAuthenticated } = useCheckAuthentication();
  const [user, setUser] = useState({});


  useEffect(() => {
    if (firstRender) {
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
            setFirstRender(false) // In order to avoid infinite renders

          })
          .catch(err => {
            console.error("Error:", err);
          });
      }
    }
    
  }, [isAuthenticated, firstRender]);

  return (

      <Box className="mySidebar"  
        sx={{
          "& .pro-sidebar": {
              
          },
          "& .pro-sidebar-inner": {
           
            background: `#739072 !important`,
            flexDirection: "column",
            
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
        <ProSidebar collapsed={true} > {/* Always collapsed */}
        <Menu iconShape="square" style={{ paddingBottom: '240%' }}>
            {/* Avatar */}
            <Box mb="25px" margin="3">
              <Box display="flex" justifyContent="center" alignItems="center" >
                <Link to="/dashboard">
                  <Avatar
                    alt="User"
                    src={user.profile_picture}
                    sx={{
                      width: 100, 
                      height: 100,
                      bgcolor: 'grey.300',
                      marginTop: '20px' 
                    }}
                  />
                </Link>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={grey}
                  fontWeight="bold"
                >
                  {user.name} {user.last_name}
                </Typography>
              </Box>
            </Box>
  

          <Box paddingLeft={ "10%"}>
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
              title="Create a climbing Request"
              to="/find-a-buddy"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Join other climbers"
              to="/allRequests"
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
            
        
          </Box>
          
        </Menu>
        <div style={{ flexGrow: 1 }} />
      </ProSidebar>
    </Box>

  );
};

export default SideBar;