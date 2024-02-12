import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import { FaUser, FaAngleDoubleLeft, FaAngleDoubleRight, FaTachometerAlt, FaGem, FaList, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { FaHouse, FaMapLocationDot  } from "react-icons/fa6";
import sidebarBg from '../../../../styles/images/barBgTest3.jpeg'
import '../../../../styles/sidebarStyles.scss'

const SideBar = () => {
 const [collapsed, setCollapsed] = useState(true);
 

 return (
   <ProSidebar
     image={sidebarBg}
     collapsed={collapsed}
     onToggle={() => setCollapsed(!collapsed)}
     breakPoint="md"
   >
     <SidebarHeader>
       <Menu iconShape="circle">
         {collapsed ? (
           <MenuItem
             icon={<FaAngleDoubleRight />}
             onClick={() => setCollapsed(!collapsed)}
           ></MenuItem>
         ) : (
           <MenuItem
             suffix={<FaAngleDoubleLeft />}
             onClick={() => setCollapsed(!collapsed)}
           >
             <div
               style={{
                padding: '9px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: 15,
                letterSpacing: '1px'
               }}
             >
               Menu
             </div>
           </MenuItem>
         )}
       </Menu>
     </SidebarHeader>
     <SidebarContent>
       <Menu iconShape="circle">
         <MenuItem
           icon={<FaHouse />}
           
         >
           Dashboard
           <Link to="/dashboard" />
         </MenuItem>
         <MenuItem icon={<FaMapLocationDot />}>
           Climbing Locations
           <Link to="/climbing-locations" />
         </MenuItem>
         <SubMenu
          
           title={'Find your buddy'}
           icon={<FaRegLaughWink />}
         >
            <MenuItem>
    <Link to="/find-a-buddy">Start your climbing request</Link>
 </MenuItem>
 <MenuItem>
    <Link to="/allRequests">Join Others</Link>
 </MenuItem>
         </SubMenu>
         <SubMenu
           prefix={<span className="badge gray">3</span>}
           title={'Pages'}
           icon={<FaHeart />}
         >
           <MenuItem>Education & Content</MenuItem>
           <MenuItem>Calendar</MenuItem>
           <MenuItem>FAQ Page</MenuItem>
         </SubMenu>
       </Menu>
     </SidebarContent>
     <SidebarFooter style={{ textAlign: 'center' }}>
 <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
  <Link
    className="sidebar-btn"
    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
    to="/profile"
  >
    <FaUser style={{ marginRight: '10px' }} />
    <span>My profile</span>
  </Link>
 </div>
</SidebarFooter>
   </ProSidebar>
 );
};

export default SideBar;