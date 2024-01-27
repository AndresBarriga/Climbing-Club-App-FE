import React from "react"
import SideBar from "../global/SideBar"
import TopBar from "../global/Topbar"
import HeaderComp from "../../components/headerComp"
import RequestDetails from "./requestDetails"
import { useParams } from "react-router-dom"

const RequestDetailsIndex = () => {
    const { request_id } = useParams();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
      <div style={{ display: 'flex', height: '100vh' }}>
        <SideBar />

        <div className='custom-paper2' style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          <HeaderComp title="Climbing Request" subtitle="See more details or contact your future buddy" />
          <RequestDetails request_id={request_id}/>
        </div>

      </div>
    </div>
  )
}

export default RequestDetailsIndex;