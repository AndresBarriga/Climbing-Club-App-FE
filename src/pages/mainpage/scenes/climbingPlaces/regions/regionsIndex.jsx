import React from "react"
import SideBar from "../../global/SideBar"
import TopBar from "../../global/Topbar"
import { useCheckAuthentication } from "../../../../Website/Auth/auth"
import Regions from "./regions.jsx"
import HeaderComp from "../../../components/headerComp"

const RegionsIndex = () => {
  const { isAuthenticated, loginMessage } = useCheckAuthentication();
  if (!isAuthenticated) {
    return loginMessage;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <TopBar />
        <div style={{ display: 'flex', height: '100vh' }}>
          <SideBar />
          
        <div className='custom-paper2' style={{ flex: 1, overflow: 'auto',padding:20  }}>
          <HeaderComp title="Zones / Region 🌎 📌" subtitle="Search climbing zones based on regions!" />
          <Regions />
        </div>
      </div>
      </div> 
  )
}

export default RegionsIndex;
