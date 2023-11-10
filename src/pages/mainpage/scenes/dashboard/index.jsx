import { Box } from "@mui/material";
import HeaderComp from "../../components/headerComp";


const Dashboard = () => {
    return(
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
        <HeaderComp title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
        </Box>
    ) 
}

export default Dashboard;