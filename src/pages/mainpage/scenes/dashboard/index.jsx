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



// Dashboard component
const Dashboard = () => {
  // State for authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

 


      const events = [
        {
          date: "2023-11-11",
          event: "Mountain Climbing",
          description: "Climbing the LiebenthalerGrund mountain",
          location: "Dresden, Germany",
        },
        {
          date: "2023-11-12",
          event: "Climbing Gym",
          description: "Workout at the Der Kegel climbing gym",
          location: "Berlin, Germany",
        },
        // add more events as needed...
      ];
    
      return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <TopBar />
          <div style={{ display: 'flex', height: '100vh' }}>
            <SideBar />
            <div className='custom-paper2' style={{ flex: 1, overflow: 'auto' }}>
              <Box m="20px" display="flex">
                <Box flex={3}>
                  <HeaderComp title="DASHBOARD" subtitle="Welcome to your dashboard" />
                  <MyActiveRequestDash />
                  <MyFavLocations></MyFavLocations>
                  <MyMarkedEvents events={events} />
                </Box>
                <Box flex={2} ml="20px">
                  <UserProfileCard />
                </Box>
              </Box>
            </div>
          </div>
        </div>
      );
};
    
    export default Dashboard;