import React from "react"
import SideBar from "../../global/SideBar"
import TopBar from "../../global/Topbar"
import { useCheckAuthentication, loginMessage } from "../../../../Website/Auth/auth"
import RequestDetails from "./showActiveRequest"
import { useParams } from 'react-router-dom';



const ActiveRequestIndex = () => {
  const { request } = useParams();
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
          <RequestDetails selectedRequest={request} />
          </div>
          
      </div>
    </div>
    )
}

export default ActiveRequestIndex;