import { Box } from "@mui/material";
import HeaderComp from "../../components/headerComp";
import { useCheckAuthentication, loginMessage } from "../../../Website/Auth/auth";
import SideBar from "../global/SideBar";
import TopBar from "../global/Topbar";
import UserProfileCard from "./profileCard";

//Component related to /view-profile page
const ViewProfile = () => {
    const { isAuthenticated, loginMessage } = useCheckAuthentication();
  
    if (!isAuthenticated) {
      return loginMessage;
    }
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <TopBar />
        <div style={{ display: 'flex', height: '100%' }}>
          <SideBar />
          <Box m="auto" p="20px" textAlign="center">
            <HeaderComp title="My Profile" subtitle="That's how other people see you" />
            <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", height: '100%' }}>
              <UserProfileCard />
            </div>
          </Box>
        </div>
      </div>
    );
  };
  
  export default ViewProfile;