import React from "react"
import SideBar from "../../global/SideBar"
import TopBar from "../../global/Topbar"
import { useCheckAuthentication, loginMessage } from "../../../../Website/Auth/auth"
import RouteDetails from "./routesDetails"
import HeaderComp from "../../../components/headerComp"
import { useParams } from 'react-router-dom';


const RoutesDetailsIndex = () => {
   const { country, region, area, routeName } = useParams();

  const { isAuthenticated, loginMessage } = useCheckAuthentication();
  if (!isAuthenticated) {
    return loginMessage;
  }
return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <TopBar />
        <div style={{ display: 'flex', margin:0}}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <SideBar />
          </div>
          <div className='custom-paper2' style={{ display: 'flex', flex: 1  , flexDirection: "column", padding:20 }}>
          <HeaderComp title="Your Selected Route 🌎 📌" subtitle={`${routeName} located in ${area}, ${region}, ${country}`} />
          <RouteDetails />
          </div>
          
      </div>
    </div>
    )
}

export default RoutesDetailsIndex;