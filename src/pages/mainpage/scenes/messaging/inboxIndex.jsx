import React from "react"
import SideBar from "../global/SideBar"
import TopBar from "../global/Topbar"
import { useCheckAuthentication} from "../../../Website/Auth/auth"
import Inbox from "./inbox"
import { useState, useEffect } from "react";






const InboxIndex = () => {
  
  const { isAuthenticated, loginMessage } = useCheckAuthentication();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/show-profile`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setUserId(data.preferences.user_id); // Assuming the user object has a user_id property
      })
      .catch(err => {
        console.error("Error:", err);
      });
    }
  }, [isAuthenticated]);
  console.log("userid from index", userId)

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
          <Inbox userId={userId}  style={{ margin: 0, padding: 0 }} />
        </div>
      </div>
    </div>
  );
};

export default InboxIndex;