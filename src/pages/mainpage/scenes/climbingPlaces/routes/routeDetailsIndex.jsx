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
  
        <div style={{ display: 'flex', height: '100vh' }}>
          <SideBar />
         
          <div className='custom-paper2'style={{ flex: 1, overflow: 'auto',padding:20  }}>
          <HeaderComp title="Your Selected Route  🌎 📌" subtitle={`${routeName} located in ${area}, ${region}, ${country}`} />
          <RouteDetails />
          </div>
          
      </div>
    </div>
    )
}

export default RoutesDetailsIndex;