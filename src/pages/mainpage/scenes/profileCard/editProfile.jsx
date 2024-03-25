import { Box } from "@mui/material";
import HeaderComp from "../../components/headerComp";
import { useCheckAuthentication, loginMessage } from "../../../Website/Auth/auth";
import SideBar from "../global/SideBar";
import TopBar from "../global/Topbar";
import EditProfileCard from "./editProfileCard";

//Component related to /view-profile page
const EditProfile = () => {
  const { isAuthenticated, loginMessage } = useCheckAuthentication();

  if (!isAuthenticated) {
    return loginMessage;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
      <div style={{ display: 'flex', height: '100vh' }}>
        <SideBar />
        <Box m="auto" p="20px" textAlign="center" sx={{ width: '100%' }}>
          <HeaderComp title="Edit Profile" subtitle="Add or change your profile information" />
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", height: '100%', width: '100%' }}>
            <EditProfileCard />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default EditProfile;