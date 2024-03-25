import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box } from "@mui/material";
import HeaderComp from "../../components/headerComp";
import UserProfileCard from "../profileCard/profileCard";
import MyActiveRequestDash from '../finding-Partner/ActiveRequests/myActiveRequestDash';
import MyFavLocations from "../MarkedLocations/myFavLocations";
import MyMarkedEvents from "../events/myMarkedEvents";
import SideBar from "../global/SideBar";
import TopBar from "../global/Topbar";
import AppHeader from '../../../../components/reusable/HeaderWebsite';
import Card from "../../../../components/reusable/card";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ClimbFriends from "../../../../styles/images/ClimbFriends.jpeg"
import ClimbFriends2 from "../../../../styles/images/Climbfriends2.jpeg"
import LocationsBeau from "../../../../styles/images/locationsBeau.jpeg"
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HikingIcon from '@mui/icons-material/Hiking';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyFavCardLocations from '../MarkedLocations/myFavCardLocations';
import MyCalendar from "../../../../components/reusable/calendar"


// Dashboard component
const Dashboard = () => {
  // State for authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [events, setEvents] = useState([]);
 const [requestInfo, setRequestInfo] = useState([]);

 console.log("events", events)

 const fetchRequestInfo = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getActiveRequest`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Request data:", data);
    return data; // Return the data instead of setting it directly
  } else {
    console.error('Failed to fetch request information');
    return []; // Return an empty array in case of an error
  }
};

useEffect(() => {
  const fetchData = async () => {
     const requests = await fetchRequestInfo();
     console.log('Requests data:', requests); // Move this line inside the fetchData function
     const generatedEvents = generateEvents(requests);
     setEvents(generatedEvents);
  };
 
  fetchData();
 }, []);



 const generateEvents = (requests) => {
  console.log('generateEvents function called');
  const events = [];
 
  requests.forEach(request => {
    const startDate = new Date(request.time_data.startDate);
    const endDate = new Date(request.time_data.endDate);
   
    // Debugging: Log the parsed dates to ensure they are correct
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Raw selected_routes data:", request.selected_routes);

// Check if request.selected_routes is an array and if it has elements
let selectedRoutes = request.selected_routes && request.selected_routes.length > 0 ? 
request.selected_routes.map(routeString => {
  try {
    // Parse the JSON string into an object
    return JSON.parse(routeString);
  } catch (error) {
    console.error('Error parsing JSON string:', error);
    return null; // Return null if parsing fails
  }
}).filter(route => route !== null) : []; // Filter out null values

// Check if there are any selected routes and if they are not null
let desc = selectedRoutes.length > 0 ? 
selectedRoutes.map(route => ` ${route.name}, it is a ${route.route_style}`).join('\n') :
"Request applies for the whole area";
   
    // Create an event for the entire day between the start and end dates
    events.push({
      title: `Climbing request ${request.uid} in ${request.area}, ${request.region}`,
       start: startDate,
       end: endDate,
       url: `http://localhost:3000/showActiveRequest/${request.uid}`,
       desc: `Climbing locations: ${desc}`, // Use the formatted description
    });
   
    // Debugging: Log the events array after each event is added
    console.log("Events:", events);
   });
   
   const validEvents = events.filter(event => !isNaN(event.start.getTime()) && !isNaN(event.end.getTime()));
   
   return validEvents;
 };

  useEffect(() => {
    // Parse the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Store the token in localStorage and redirect if needed
      localStorage.setItem('token', token);
    }
  }, []);

  // Effect hook for checking authentication status
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/check-auth`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((response) => {
        // If the response status is 200, the user is authenticated
        if (response.status === 200) {
          setIsAuthenticated(true); 
        }
      })
      .catch((error) => {
        // Log any errors
        console.error(error);
      });
  },  []);



  // If the user is not authenticated, show the message that they are not allowed to see the page, please login.
  if (!isAuthenticated) {
    return (
      <div className="modal-content">
        <AppHeader></AppHeader>
        <h2>Please Log in to see the page</h2>
        <p>This page is just for people who is signed in, please log in to continue.</p>
        <div className="my-6"></div>
        <Link to="/auth">
          <span
            className="mx-6 text-white rounded bg-green-800 text-sm font-medium hover:bg-white hover:text-green-800
    hover:border-green focus:outline-none focus:ring active:bg-green-800 sm:w-auto px-5 py-2.5 duration-300 border border-transparent hover:border-green-800"
            aria-label="Sign in"
          >
            Log in
          </span>
        </Link>
      </div>

    );
  }

 
    
      return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <TopBar />
          <div style={{ display: 'flex', height: '100vh' }}>
            <SideBar />
            <div className='custom-paper2' style={{ flex: 1, overflow: 'auto' }}>
              {/* Render the 4 cards at the top */}
              <Box ><HeaderComp title="DASHBOARD" subtitle="Welcome to your dashboard" /></Box>
              <Box display="flex" flexDirection="row" justifyContent="space-around" m="20px">
                <Card
                 title="Create Climbing Request"
                 description="Start a new climbing request"
                 link="/find-a-buddy"
        imageUrl={ClimbFriends}
        IconComponent={HikingIcon}
                />
                <Card
                 title="Join Others"
                 description="Find climbing partners"
                 link="/allRequests"
        imageUrl={ClimbFriends2}
        IconComponent={Diversity3Icon}
                />
                <Card
                 title="Check the Locations"
                 description="View climbing locations on a map"
                 link="//climbing-locations"
        imageUrl={LocationsBeau}
        IconComponent={LocationOnIcon}
                />
               
              </Box>
              {/* Other content */}
              <Box m="20px" display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row" justifyContent="space-around" m="20px" flexWrap="nowrap">
    <Box flex={1} m={2}>
      <MyActiveRequestDash />
    </Box>
    <Box flex={1} maxWidth="50%">
      <MyCalendar events={events} />
    </Box>
 </Box>
 <Box mt={2}>
    <MyFavCardLocations />
 </Box>
</Box>
            </div>
          </div>
        </div>
     );
    };
    
    export default Dashboard;
    