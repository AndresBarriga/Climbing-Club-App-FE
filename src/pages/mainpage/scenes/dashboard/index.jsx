import { Box } from "@mui/material";
import HeaderComp from "../../components/headerComp";
import UserProfileCard from "../profileCard/profileCard";
import FpDashboard from "../finding-Partner/fpDashboard";
import MyMarkedLocations from "../MarkedLocations/myMarkedLocations";
import MyMarkedEvents from "../events/myMarkedEvents";
import React ,{ useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import SideBar from "../global/SideBar";
import TopBar from "../global/Topbar";
import { useCheckAuthentication, loginMessage } from "../../../Auth/auth";


const Dashboard = () => {
  const [user, setUser] = React.useState(null);
  const { isAuthenticated, loginMessage } = useCheckAuthentication();

  
  if (!isAuthenticated) {
    return loginMessage;
  }



  // ...
 
    const inquiries = [
        {
          date: "2023-11-11",
          place: "Place 1",
          comments: "Comment 1",
          handleDelete: () => {
            // handle deletion of the inquiry
          },
        },
        {
          date: "2023-11-12",
          place: "Place 2",
          comments: "Comment 2",
          handleDelete: () => {
            // handle deletion of the inquiry
          },
        },
        // add more inquiries as needed...
      ];

    const locations = [
        {
          place: "LiebenthalerGrund",
          location: "Dresden, Germany",
          type: "Mountain",
        },
        {
          place: "Der Kegel",
          location: "Berlin, Germany",
          type: "Climbing Gym",
        },
        // add more locations as needed...
      ];

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
 <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
   <TopBar />
   <div style={{ display: 'flex', height: '100%' }}>
     <SideBar />
     <div className='custom-paper2' style={{ flex: 1, overflow: 'auto' }}>
       <Box m="20px" display="flex">
         <Box flex={2}>
           <HeaderComp title="DASHBOARD" subtitle="Welcome to your dashboard" />
           <FpDashboard inquiries={inquiries} />
           <MyMarkedLocations locations={locations}/>
           <MyMarkedEvents events={events}/>
         </Box>
         <Box flex={3} ml="20px">
           <UserProfileCard />
         </Box>
       </Box>
     </div>
   </div>
 </div>
 );
};
    
    export default Dashboard;