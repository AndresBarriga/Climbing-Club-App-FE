import React from "react"
import SideBar from "../global/SideBar"
import TopBar from "../global/Topbar"
import { useCheckAuthentication, loginMessage } from "../../../Website/Auth/auth"
import NotificationSettings from "./notificationSettings"
import HeaderComp from "../../components/headerComp"


const NotificationSettingsIndex = () => {

  const { isAuthenticated, loginMessage } = useCheckAuthentication();
  if (!isAuthenticated) {
    return loginMessage;
  }
return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <TopBar />
      
        <div style={{ display: 'flex',  height: '100vh' }}>
          <SideBar />
       
          <div className='custom-paper2' style={{ flex: 1, overflow: 'auto',padding:20  }}>
          <HeaderComp title="Notification Settings" subtitle="Define the notifications you want to receive" />
          <NotificationSettings />
          </div>
          
      </div>
    </div>
    )
}

export default NotificationSettingsIndex;