import React from "react"
import SideBar from "../../global/SideBar"
import TopBar from "../../global/Topbar"
import { useCheckAuthentication} from "../../../../Website/Auth/auth"
import SeeRequests from "./seeRequest"




const SeeRequestIndex = () => {
  
  const { isAuthenticated, loginMessage } = useCheckAuthentication();
  if (!isAuthenticated) {
    return loginMessage;
  }
  return (
    <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100vh' }}>
      <TopBar />
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <SideBar style={{ margin: 0, padding: 0 }} />
        </div>
        <div className='custom-paper2' style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
          <SeeRequests style={{ margin: 0, padding: 0 }} />
        </div>
      </div>
    </div>
  );
};

export default SeeRequestIndex;